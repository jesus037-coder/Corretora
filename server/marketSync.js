import pool from './db.js';

const BRAPI_BASE = 'https://brapi.dev/api/quote';
const BATCH_SIZE = 1; // free plan allows 1 ticker per request
const MARKET_SYNC_INTERVAL = 15 * 60 * 1000; // 15 minutes

let syncing = false;

async function fetchBatch(tickers, token) {
  const url = `${BRAPI_BASE}/${tickers.join(',')}?token=${token}&range=1d&interval=1d`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Brapi HTTP ${res.status}`);
  const json = await res.json();
  return json.results || [];
}

export async function syncMarketData() {
  const token = process.env.BRAPI_API_KEY;
  if (!token) {
    console.log('📈 [MarketSync] BRAPI_API_KEY not set, skipping.');
    return;
  }
  if (syncing) { console.log('📈 [MarketSync] Already running, skipping…'); return; }
  syncing = true;
  try {
    const { rows } = await pool.query('SELECT id, ticker FROM ativos ORDER BY ticker');
    if (!rows.length) { console.log('📈 [MarketSync] No ativos to update.'); return; }

    console.log(`📈 [MarketSync] Updating ${rows.length} ativos from Brapi…`);
    let updated = 0, failed = 0;

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);
      const tickers = batch.map(r => r.ticker);
      try {
        const results = await fetchBatch(tickers, token);
        for (const r of results) {
          const price = r.regularMarketPrice;
          if (price == null) continue;
          await pool.query(
            'UPDATE ativos SET valor=$1 WHERE ticker=$2',
            [price, r.symbol]
          );
          updated++;
        }
      } catch (e) {
        failed += batch.length;
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
