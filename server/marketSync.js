import pool from './db.js';

const BRAPI_BASE = 'https://brapi.dev/api/quote';
const BATCH_SIZE = 1; // free plan allows 1 ticker per request
const MARKET_SYNC_INTERVAL = 15 * 60 * 1000; // 15 minutes
const BINANCE_BASE = 'https://data-api.binance.vision/api/v3/ticker/price';

let syncing = false;

async function fetchBatch(tickers, token) {
  const url = `${BRAPI_BASE}/${tickers.join(',')}?token=${token}&range=1d&interval=1d`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Brapi HTTP ${res.status}`);
  const json = await res.json();
  return json.results || [];
}

// Ticker → CoinGecko coin ID mapping (fallback when Binance is geo-blocked)
const COINGECKO_IDS = {
  BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana', XRP: 'ripple',
  ADA: 'cardano', DOT: 'polkadot', LINK: 'chainlink', AVAX: 'avalanche-2',
  MATIC: 'matic-network', BNB: 'binancecoin', DOGE: 'dogecoin',
  USDT: 'tether', USDC: 'usd-coin', LTC: 'litecoin', ATOM: 'cosmos',
};

async function fetchCryptoFromBinance(tickers) {
  // Binance uses pairs like BTCUSDT, ETHUSDT, etc.
  const symbols = tickers.map((t) => `${t}USDT`);
  const url = `${BINANCE_BASE}?symbols=${encodeURIComponent(JSON.stringify(symbols))}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance HTTP ${res.status}`);
  const json = await res.json();
  return json.map((item) => ({
    symbol: item.symbol.replace('USDT', ''),
    regularMarketPrice: parseFloat(item.price),
  }));
}

async function fetchCryptoFromCoinGecko(tickers) {
  const ids = tickers.map((t) => COINGECKO_IDS[t] || t.toLowerCase()).filter(Boolean);
  if (!ids.length) return [];
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);
  const json = await res.json();
  // Reverse map: coin ID → ticker
  const idToTicker = {};
  for (const t of tickers) { const id = COINGECKO_IDS[t] || t.toLowerCase(); idToTicker[id] = t; }
  return Object.entries(json).map(([id, data]) => ({
    symbol: idToTicker[id] || id.toUpperCase(),
    regularMarketPrice: data.usd,
  }));
}

export async function syncMarketData() {
  const token = process.env.BRAPI_API_KEY;
  if (syncing) { console.log('📈 [MarketSync] Already running, skipping…'); return; }
  syncing = true;
  try {
    const { rows } = await pool.query('SELECT id, ticker, segmento FROM ativos ORDER BY ticker');
    if (!rows.length) { console.log('📈 [MarketSync] No ativos to update.'); return; }

    // Split crypto vs non-crypto
    const cryptoRows = rows.filter((r) => (r.segmento || '').toUpperCase().includes('CRIPTO'));
    const brapiRows = rows.filter((r) => !cryptoRows.includes(r));

    let updated = 0, failed = 0;

    // ── Fetch crypto from Binance (fallback: CoinGecko) ──
    if (cryptoRows.length) {
      const cryptoTickers = cryptoRows.map((r) => r.ticker);
      console.log(`📈 [MarketSync] Updating ${cryptoRows.length} crypto from Binance…`);
      try {
        const results = await fetchCryptoFromBinance(cryptoTickers);
        for (const r of results) {
          if (r.regularMarketPrice == null) continue;
          await pool.query('UPDATE ativos SET valor=$1 WHERE ticker=$2', [r.regularMarketPrice, r.symbol]);
          updated++;
        }
      } catch (e) {
        console.log(`📈 [MarketSync] Binance failed (${e.message}), falling back to CoinGecko…`);
        try {
          const results = await fetchCryptoFromCoinGecko(cryptoTickers);
          for (const r of results) {
            if (r.regularMarketPrice == null) continue;
            await pool.query('UPDATE ativos SET valor=$1 WHERE ticker=$2', [r.regularMarketPrice, r.symbol]);
            updated++;
          }
        } catch (e2) {
          console.error(`📈 [MarketSync] CoinGecko error: ${e2.message}`);
          failed += cryptoRows.length;
        }
      }
    }

    // ── Fetch non-crypto from Brapi ──
    if (brapiRows.length) {
      console.log(`📈 [MarketSync] Updating ${brapiRows.length} ativos from Brapi…`);
      if (!token) {
        console.log('📈 [MarketSync] BRAPI_API_KEY not set, skipping Brapi.');
        failed += brapiRows.length;
      } else {
        for (let i = 0; i < brapiRows.length; i += BATCH_SIZE) {
          const batch = brapiRows.slice(i, i + BATCH_SIZE);
          const tickers = batch.map((r) => r.ticker);
          try {
            const results = await fetchBatch(tickers, token);
            for (const r of results) {
              const price = r.regularMarketPrice;
              if (price == null) continue;
              await pool.query('UPDATE ativos SET valor=$1 WHERE ticker=$2', [price, r.symbol]);
              updated++;
            }
          } catch (e) {
            failed += batch.length;
          }
        }
      }
    }

    console.log(`✅ [MarketSync] Done — ${updated} updated, ${failed} failed.`);
  } catch (e) {
    console.error('❌ [MarketSync] Failed:', e.message);
  } finally {
    syncing = false;
  }
}

export { MARKET_SYNC_INTERVAL };
