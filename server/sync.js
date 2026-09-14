import pool from './db.js';

let syncing = false;

export async function syncData() {
  if (syncing) { console.log('🔄 [Sync] Already running, skipping…'); return; }
  syncing = true;
  try {
    console.log('🔄 [Sync] Running local sync…');
    // All data is now managed locally — no Google Sheets dependency.
    // Fallback: create ativos entries for tickers in movimentacoes that don't exist yet.
    const { rowCount } = await pool.query(`
      INSERT INTO ativos (ticker, segmento, valor, preco_justo, variacao, cnpj)
      SELECT DISTINCT m.ticker, m.segmento, 0, 0, '', ''
      FROM movimentacoes m
      LEFT JOIN ativos a ON a.ticker = m.ticker
      WHERE a.ticker IS NULL
      ON CONFLICT DO NOTHING
    `);
    console.log(`✅ [Sync] Done — created ${rowCount || 0} missing ativo(s) from local movimentacoes`);
  } catch (e) {
    console.error('❌ [Sync] Failed:', e.message);
  } finally {
    syncing = false;
  }
}

export const SYNC_INTERVAL = 30 * 60 * 1000; // 30 minutes
