import pool from './db.js';

const SHEETS = {
  CL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=42982816&single=true&output=csv',
  PA: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=1605208368&single=true&output=csv',
  DI: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=948257245&single=true&output=csv',
  AT: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=713165597&single=true&output=csv',
  MT: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=1743696611&single=true&output=csv',
};

function parseCSV(t) {
  const rows = [];
  for (const line of t.split('\n')) {
    if (!line.trim()) continue;
    const cols = [];
    let cur = '', q = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') { q = !q; continue; }
      if (c === ',' && !q) { cols.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    cols.push(cur.trim());
    rows.push(cols);
  }
  return rows;
}

function n(v) {
  if (v === null || v === undefined || v === '') return 0;
  if (typeof v === 'number') return v;
  const x = parseFloat(v.toString().replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
  return isNaN(x) ? 0 : x;
}

function dt(s) {
  if (!s) return null;
  s = s.toString().trim();
  if (s.includes('/')) {
    const p = s.split('/');
    if (p.length === 3) return new Date(+p[2], +p[1] - 1, +p[0]);
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

async function fetchCSV(url) {
  const res = await fetch(url);
  return parseCSV(await res.text());
}

let syncing = false;

export async function syncData() {
  if (syncing) { console.log('🔄 [Sync] Already running, skipping…'); return; }
  syncing = true;
  try {
    console.log('🔄 [Sync] Fetching Google Sheets…');
    const [cl, pa, di, at] = await Promise.all(
      [SHEETS.CL, SHEETS.PA, SHEETS.DI, SHEETS.AT].map(fetchCSV)
    );

    const bcrypt = (await import('bcryptjs')).default;

    /* ── Upsert users (from CL) ── */
    for (let i = 1; i < cl.length; i++) {
      const row = cl[i];
      const email = (row[1] || '').trim().toLowerCase();
      const senha = (row[2] || '').trim();
      const nome = (row[3] || '').trim();
      const status = (row[5] || '').trim().toUpperCase();
      if (!email || !senha) continue;
      const role = status === 'ADMIN' ? 'admin' : status === 'DEMO' ? 'demo' : 'user';
      const hash = await bcrypt.hash(senha, 10);
      await pool.query(
        'INSERT INTO users (email, senha, nome, role) VALUES ($1,$2,$3,$4) ON CONFLICT (email) DO UPDATE SET senha=$2, nome=$3, role=$4',
        [email, hash, nome || email, role]
      );
    }

    /* ── Ativos: clear + re-insert ── */
    await pool.query('DELETE FROM ativos');
    for (let i = 1; i < at.length; i++) {
      const row = at[i];
      const ticker = (row[2] || '').trim().toUpperCase();
      if (!ticker) continue;
      await pool.query(
        'INSERT INTO ativos (ticker, segmento, area, valor, preco_justo, variacao, cnpj) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [ticker, (row[0] || '').trim(), (row[1] || '').trim(), n(row[3]), n(row[4]), (row[5] || '').trim(), (row[6] || '').trim()]
      );
    }

    /* ── Proventos: clear + re-insert ── */
    await pool.query('DELETE FROM proventos');
    for (let i = 1; i < di.length; i++) {
      const row = di[i];
      const ticker = (row[0] || '').trim().toUpperCase();
      if (!ticker) continue;
      await pool.query(
        'INSERT INTO proventos (ticker, segmento, data_com, data_pag, tipo, valor_unit) VALUES ($1,$2,$3,$4,$5,$6)',
        [ticker, (row[1] || 'OUTROS').trim(), dt(row[2]), dt(row[3]), (row[4] || '').trim(), n(row[5])]
      );
    }

    /* ── Movimentações: insert only new (preserve user-added) ── */
    const { rows: existing } = await pool.query('SELECT cliente, ticker, data, cv, quantidade, preco, total FROM movimentacoes');
    const existingKeys = new Set(existing.map(r => {
      const dStr = r.data instanceof Date ? r.data.toISOString().split('T')[0] : String(r.data).split('T')[0];
      return `${r.cliente}|${r.ticker}|${dStr}|${r.cv}|${r.quantidade}|${r.preco}|${r.total}`;
    }));
    let newCount = 0;
    for (let i = 1; i < pa.length; i++) {
      const row = pa[i];
      const cliente = (row[0] || '').trim();
      const ticker = (row[1] || '').trim().toUpperCase();
      const d = dt(row[7]);
      if (!cliente || !ticker || !d) continue;
      const cv = (row[3] || '').trim();
      const qtd = n(row[4]);
      const preco = n(row[5]);
      const total = n(row[6]);
      const key = `${cliente}|${ticker}|${d.toISOString().split('T')[0]}|${cv}|${qtd}|${preco}|${total}`;
      if (!existingKeys.has(key)) {
        await pool.query(
          'INSERT INTO movimentacoes (cliente, ticker, segmento, cv, quantidade, preco, total, data) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
          [cliente, ticker, (row[2] || '').trim(), cv, qtd, preco, total, d]
        );
        newCount++;
      }
    }

    console.log(`✅ [Sync] Done — Users: ${cl.length - 1}, Ativos: ${at.length - 1}, Proventos: ${di.length - 1}, New movs: ${newCount}`);
  } catch (e) {
    console.error('❌ [Sync] Failed:', e.message);
  } finally {
    syncing = false;
  }
}

export const SYNC_INTERVAL = 30 * 60 * 1000; // 30 minutes
