import pool from './db.js';

const SHEETS = {
  CL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=42982816&single=true&output=csv',
  PA: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=1605208368&single=true&output=csv',
  DI: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=948257245&single=true&output=csv',
  AT: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=713165597&single=true&output=csv',
  MT: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=1743696611&single=true&output=csv',
};

/* ── CSV utils (ported from index.html) ── */
function parseCSV(t) {
  const rows = [];
  const lines = t.split('\n');
  for (const line of lines) {
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

async function main() {
  const bcrypt = (await import('bcryptjs')).default;

  console.log('🗄️  Creating tables…');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      nome TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      telefone TEXT,
      autorizacao_whatsapp BOOLEAN DEFAULT false,
      tipo_usuario TEXT DEFAULT 'autonomo',
      interesse_assessoria BOOLEAN DEFAULT false
    );
    CREATE TABLE IF NOT EXISTS ativos (
      id SERIAL PRIMARY KEY,
      ticker TEXT NOT NULL,
      segmento TEXT NOT NULL,
      area TEXT,
      valor NUMERIC,
      preco_justo NUMERIC,
      variacao TEXT,
      cnpj TEXT
    );
    CREATE TABLE IF NOT EXISTS movimentacoes (
      id SERIAL PRIMARY KEY,
      cliente TEXT NOT NULL,
      ticker TEXT NOT NULL,
      segmento TEXT NOT NULL,
      cv TEXT NOT NULL,
      quantidade NUMERIC NOT NULL,
      preco NUMERIC NOT NULL,
      total NUMERIC NOT NULL,
      data DATE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS proventos (
      id SERIAL PRIMARY KEY,
      ticker TEXT NOT NULL,
      segmento TEXT NOT NULL,
      data_com DATE,
      data_pag DATE,
      tipo TEXT,
      valor_unit NUMERIC NOT NULL
    );
    CREATE TABLE IF NOT EXISTS metas (
      id SERIAL PRIMARY KEY,
      cliente TEXT NOT NULL,
      tipo TEXT NOT NULL,
      valor NUMERIC NOT NULL,
      aporte NUMERIC DEFAULT 0,
      juros NUMERIC DEFAULT 1,
      ref_id TEXT,
      data TIMESTAMPTZ DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS limites_segmento (
      id SERIAL PRIMARY KEY,
      segmento TEXT UNIQUE NOT NULL,
      pct NUMERIC NOT NULL DEFAULT 0
    );
  `);

  /* ── Check if users already exist (stop depending on Sheets for clients) ── */
  const { rows: userCount } = await pool.query('SELECT COUNT(*) FROM users');
  const usersExist = parseInt(userCount[0].count) > 0;

  if (usersExist) {
    console.log('👥 Users already exist — skipping Sheets fetch for clients (data is local now).');
  }

  /* ── Check if metas already exist (stop depending on Sheets for metas) ── */
  const { rows: metasCount } = await pool.query('SELECT COUNT(*) FROM metas');
  const metasExist = parseInt(metasCount[0].count) > 0;

  if (metasExist) {
    console.log('🎯 Metas already exist — skipping Sheets fetch for metas (data is local now).');
  }

  /* ── Check if movimentacoes already exist (stop depending on Sheets for movimentacoes) ── */
  const { rows: movsCount } = await pool.query('SELECT COUNT(*) FROM movimentacoes');
  const movsExist = parseInt(movsCount[0].count) > 0;

  if (movsExist) {
    console.log('💰 Movimentacoes already exist — skipping Sheets fetch for movimentacoes (data is local now).');
  }

  console.log('📡 Fetching Google Sheets…');
  const fetches = [SHEETS.DI, SHEETS.AT].map(fetchCSV);
  if (!usersExist) fetches.unshift(fetchCSV(SHEETS.CL));
  if (!movsExist) fetches.unshift(fetchCSV(SHEETS.PA));
  if (!metasExist) fetches.push(fetchCSV(SHEETS.MT));
  const sheets = await Promise.all(fetches);

  let cl = null, pa = null, mt = null;
  let idx = 0;
  if (!usersExist) { cl = sheets[idx++]; }
  if (!movsExist) { pa = sheets[idx++]; }
  const di = sheets[idx++];
  const at = sheets[idx++];
  if (!metasExist) { mt = sheets[idx++]; }
  const skipped = [usersExist ? 'CL' : null, movsExist ? 'PA' : null, metasExist ? 'MT' : null].filter(Boolean).join(', ');
  console.log(`   ${skipped ? skipped + '=skipped ' : ''}DI=${di.length} AT=${at.length}${movsExist ? '' : ` PA=${pa.length}`}${metasExist ? '' : ` MT=${mt.length}`} rows`);

  console.log('🧹 Truncating tables (preserving users, metas and movimentacoes)…');
  await pool.query('TRUNCATE ativos, proventos RESTART IDENTITY CASCADE');

  /* ── Users (from CL) — only on first boot ── */
  if (!usersExist) {
    console.log('👥 Seeding users (first boot)…');
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
        'INSERT INTO users (email, senha, nome, role) VALUES ($1, $2, $3, $4)',
        [email, hash, nome || email, role]
      );
    }
  }

  /* ── Ativos (from AT) ── */
  console.log('📈 Seeding ativos…');
  for (let i = 1; i < at.length; i++) {
    const row = at[i];
    const segmento = (row[0] || '').trim();
    const area = (row[1] || '').trim();
    const ticker = (row[2] || '').trim().toUpperCase();
    const valor = n(row[3]);
    const precoJusto = n(row[4]);
    const variacao = (row[5] || '').trim();
    const cnpj = (row[6] || '').trim();
    if (!ticker) continue;
    await pool.query(
      'INSERT INTO ativos (ticker, segmento, area, valor, preco_justo, variacao, cnpj) VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [ticker, segmento, area, valor, precoJusto, variacao, cnpj]
    );
  }

  /* ── Movimentações (from PA) — only seed on first boot ── */
  if (movsExist) {
    console.log('💰 Movimentacoes preservadas no banco local.');
  } else if (pa) {
    console.log('💰 Seeding movimentacoes (first boot)…');
    let movCount = 0;
    for (let i = 1; i < pa.length; i++) {
      const row = pa[i];
      const cliente = (row[0] || '').trim();
      const ticker = (row[1] || '').trim().toUpperCase();
      const segmento = (row[2] || '').trim();
      const cv = (row[3] || '').trim();
      const qtd = n(row[4]);
      const preco = n(row[5]);
      const total = n(row[6]);
      const d = dt(row[7]);
      if (!cliente || !ticker || !d) continue;
      await pool.query(
        'INSERT INTO movimentacoes (cliente, ticker, segmento, cv, quantidade, preco, total, data) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
        [cliente, ticker, segmento, cv, qtd, preco, total, d]
      );
      movCount++;
    }
    console.log(`   ${movCount} movimentacoes inseridas`);
  }

  /* ── Proventos (from DI) ── */
  console.log('💵 Seeding proventos…');
  let provCount = 0;
  for (let i = 1; i < di.length; i++) {
    const row = di[i];
    const ticker = (row[0] || '').trim().toUpperCase();
    const segmento = (row[1] || 'OUTROS').trim();
    const dCom = dt(row[2]);
    const dPag = dt(row[3]);
    const tipo = (row[4] || '').trim();
    const vu = n(row[5]);
    if (!ticker) continue;
    await pool.query(
      'INSERT INTO proventos (ticker, segmento, data_com, data_pag, tipo, valor_unit) VALUES ($1,$2,$3,$4,$5,$6)',
      [ticker, segmento, dCom, dPag, tipo, vu]
    );
    provCount++;
  }
  console.log(`   ${provCount} proventos inseridos`);

  /* ── Metas (from MT) — only seed on first boot ── */
  if (metasExist) {
    console.log('🎯 Metas preservadas no banco local.');
  } else if (mt) {
    console.log('🎯 Seeding metas (first boot)…');
    for (let i = 1; i < mt.length; i++) {
      const row = mt[i];
      const cliente = (row[0] || '').trim();
      const tipo = (row[1] || '').trim();
      const valor = n(row[2]);
      const aporte = n(row[3]);
      const juros = parseFloat((row[4] || '1').toString().replace(',', '.')) || 1;
      const refId = (row[5] || '').trim();
      const d = dt(row[6]);
      if (!cliente || !tipo) continue;
      await pool.query(
        'INSERT INTO metas (cliente, tipo, valor, aporte, juros, ref_id, data) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [cliente, tipo, valor, aporte, juros, refId, d]
      );
    }
  }

  console.log('✅ Seed completo!');
  await pool.end();
}

main().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
