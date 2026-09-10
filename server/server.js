import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from './db.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'corretora-do-ze-dev-jwt-2026';
const MES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

/* ── Auth middleware ── */
function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Token ausente' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

function isCompra(cv) {
  const s = (cv || '').toString().trim().toUpperCase();
  return s === 'C' || s === 'COMPRA';
}

/* ── POST /api/auth/login ── */
app.post('/api/auth/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: 'Preencha todos os campos.' });
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email.trim().toLowerCase()]);
    if (!rows.length) return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    const user = rows[0];
    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    const token = jwt.sign({ id: user.id, email: user.email, nome: user.nome, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, nome: user.nome, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao conectar.' });
  }
});

/* ── GET /api/clientes ── (list clients for sidebar) ── */
app.get('/api/clientes', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT DISTINCT cliente FROM movimentacoes ORDER BY cliente');
    const clientes = rows.map((r) => r.cliente);
    res.json({ clientes, role: req.user.role });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
});

/* ── GET /api/anos ── */
app.get('/api/anos', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT DISTINCT EXTRACT(YEAR FROM data)::int AS ano FROM movimentacoes ORDER BY ano');
    res.json({ anos: rows.map((r) => r.ano) });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar anos.' });
  }
});

/* ── Consolidar carteira (PM correto, ordenado por data) ── */
function consolidar(movs, precos) {
  const seg = {};
  for (const mv of movs) {
    const s = mv.segmento || 'OUTROS';
    const tk = mv.ticker;
    if (!seg[s]) seg[s] = {};
    if (!seg[s][tk]) seg[s][tk] = { q: 0, apl: 0 };
    const p = seg[s][tk];
    if (isCompra(mv.cv)) {
      p.apl += mv.total;
      p.q += mv.quantidade;
    } else {
      const pm = p.q > 0 ? p.apl / p.q : 0;
      p.q -= mv.quantidade;
      p.apl = p.q > 0.0001 ? p.q * pm : 0;
      if (p.q < 0.0001) { p.q = 0; p.apl = 0; }
    }
  }
  return seg;
}

/* ── Build proventos por cliente/ano (ported from buildProv) ── */
function buildProv(movs, provRows, ano) {
  // ann: { ticker: { mes: { v, dCom, seg } } }
  const ann = {};
  for (const row of provRows) {
    const dCom = row.data_com;
    const dPag = row.data_pag;
    const dRef = dPag || dCom;
    if (!dRef) continue;
    const dRefDate = new Date(dRef);
    if (dRefDate.getFullYear() !== ano) continue;
    const seg = (row.segmento || 'OUTROS').toUpperCase();
    const tipo = (row.tipo || '').toUpperCase();
    const vu = parseFloat(row.valor_unit) || 0;
    let f = 1;
    const segUp = seg;
    if (segUp.includes('ETF')) f = 0.85;
    else if (segUp.includes('BDR') || tipo.includes('EXTERIOR')) f = 0.70;
    else if (tipo.includes('JCP') || tipo.includes('JSCP')) f = 0.85;
    const vl = Math.round(vu * f * 100) / 100;
    const mes = dRefDate.getMonth();
    if (!ann[row.ticker]) ann[row.ticker] = {};
    if (!ann[row.ticker][mes]) ann[row.ticker][mes] = { v: 0, dCom: dCom ? new Date(dCom) : null, seg };
    ann[row.ticker][mes].v = Math.round((ann[row.ticker][mes].v + vl) * 100) / 100;
  }

  const tks = [...new Set(movs.map((m) => m.ticker))];
  const segs = {};
  const tot = Array(12).fill(0);

  for (const tk of tks) {
    const meses = [];
    let segA = '';
    for (let m = 0; m < 12; m++) {
      const info = ann[tk] && ann[tk][m] ? ann[tk][m] : null;
      let qd = 0, sub = 0;
      if (info) {
        segA = info.seg;
        for (const mv of movs) {
          if (mv.ticker !== tk) continue;
          const dm = new Date(mv.data);
          if (info.dCom && dm <= info.dCom) {
            const q = parseFloat(mv.quantidade) || 0;
            qd += isCompra(mv.cv) ? q : -q;
          }
        }
        if (qd < 0) qd = 0;
        if (qd > 0) {
          sub = Math.round(qd * info.v * 100) / 100;
          tot[m] = Math.round((tot[m] + sub) * 100) / 100;
        }
      }
      meses.push({ q: qd, u: info ? info.v.toFixed(2) : '0.00', s: sub });
    }
    if (meses.some((x) => x.s > 0)) {
      const sg = segA || 'OUTROS';
      if (!segs[sg]) segs[sg] = [];
      segs[sg].push({ tk, m: meses });
    }
  }
  return { segs, tot };
}

/* ── GET /api/dashboard?ano=&cliente= ── */
app.get('/api/dashboard', auth, async (req, res) => {
  try {
    const ano = parseInt(req.query.ano) || new Date().getFullYear();
    const requestedCliente = req.query.cliente;

    // Determine which client's data to show
    let clienteFilter = null;
    if (req.user.role === 'admin' || req.user.role === 'demo') {
      // Admin/demo can see any client or all consolidated
      clienteFilter = requestedCliente === '__ZE__' || !requestedCliente ? null : requestedCliente;
    } else {
      // Regular user: only their own data
      clienteFilter = req.user.nome;
    }

    // Fetch ativos (for current prices)
    const ativosRes = await pool.query('SELECT ticker, segmento, valor FROM ativos');
    const precos = {};
    const segMap = {};
    for (const row of ativosRes.rows) {
      precos[row.ticker] = parseFloat(row.valor) || 0;
      if (row.segmento) segMap[row.ticker] = row.segmento;
    }

    // Fetch movimentações for this client (up to and including the year)
    let movsQuery = 'SELECT cliente, ticker, segmento, cv, quantidade, preco, total, data FROM movimentacoes WHERE EXTRACT(YEAR FROM data) <= $1';
    const movsParams = [ano];
    if (clienteFilter) {
      movsQuery += ' AND cliente = $2';
      movsParams.push(clienteFilter);
    }
    movsQuery += ' ORDER BY data ASC';
    const movsRes = await pool.query(movsQuery, movsParams);
    const movs = movsRes.rows.map((r) => ({
      ...r,
      quantidade: parseFloat(r.quantidade),
      preco: parseFloat(r.preco),
      total: parseFloat(r.total),
    }));

    // Fetch proventos for this year
    const provRes = await pool.query('SELECT ticker, segmento, data_com, data_pag, tipo, valor_unit FROM proventos WHERE EXTRACT(YEAR FROM COALESCE(data_pag, data_com)) = $1', [ano]);
    const provRows = provRes.rows.map((r) => ({
      ...r,
      valor_unit: parseFloat(r.valor_unit),
    }));

    // Consolidar carteira
    const seg = consolidar(movs, precos);

    // Calculate KPIs
    let totApl = 0, totMkt = 0, nAt = 0;
    const segmentos = [];
    for (const s of Object.keys(seg)) {
      const ativos = [];
      for (const tk of Object.keys(seg[s])) {
        const it = seg[s][tk];
        if (it.q > 0.0001) {
          const mkt = it.q * (precos[tk] || 0);
          totApl += it.apl;
          totMkt += mkt;
          nAt++;
          ativos.push({
            ticker: tk,
            qtd: Math.round(it.q * 100) / 100,
            aplicado: it.apl,
            mercado: mkt,
            pm: it.q > 0 ? it.apl / it.q : 0,
            preco: precos[tk] || 0,
            lp: mkt - it.apl,
            lpPct: it.apl > 0 ? ((mkt - it.apl) / it.apl) * 100 : 0,
          });
        }
      }
      if (ativos.length) {
        const segApl = ativos.reduce((a, x) => a + x.aplicado, 0);
        const segMkt = ativos.reduce((a, x) => a + x.mercado, 0);
        segmentos.push({
          nome: s,
          ativos: ativos.sort((a, b) => b.mercado - a.mercado),
          aplicado: segApl,
          mercado: segMkt,
          lp: segMkt - segApl,
        });
      }
    }
    segmentos.sort((a, b) => b.mercado - a.mercado);

    const pv = buildProv(movs, provRows, ano);
    const totProv = pv.tot.reduce((a, b) => a + b, 0);
    const lp = totMkt - totApl;
    const lpT = lp + totProv;
    const rent = totApl > 0 ? (lpT / totApl) * 100 : 0;

    // Evolução mensal
    const evolArr = Array(12).fill(0);
    for (const mv of movs) {
      const d = new Date(mv.data);
      if (d.getFullYear() > ano) continue;
      const aj = isCompra(mv.cv) ? mv.total : -mv.total;
      const yr = d.getFullYear();
      const ms = d.getMonth();
      const mStart = yr < ano ? 0 : ms;
      for (let m = mStart; m < 12; m++) evolArr[m] += aj;
    }

    // Trim evolution to current month
    const hoje = new Date();
    const ml = ano < hoje.getFullYear() ? 11 : hoje.getMonth();

    // Proventos por segmento (for doughnut)
    const segLabels = Object.keys(pv.segs);
    const segValues = segLabels.map((s) =>
      pv.segs[s].reduce((a, at) => a + at.m.reduce((x, m) => x + m.s, 0), 0)
    );

    res.json({
      ano,
      cliente: clienteFilter || '__ZE__',
      kpis: {
        valorAplicado: totApl,
        valorMercado: totMkt,
        lp,
        proventos: totProv,
        lpT,
        rentabilidade: rent,
      },
      evolucao: {
        labels: MES.slice(0, ml + 1),
        data: evolArr.slice(0, ml + 1),
      },
      proventosMensais: {
        labels: MES,
        data: pv.tot,
      },
      proventosPorSegmento: {
        labels: segLabels,
        data: segValues,
      },
      segmentos,
      nAtivos: nAt,
      nSegmentos: segmentos.length,
      proventosDetalhe: pv.segs,
    });
  } catch (e) {
    console.error('Dashboard error:', e);
    res.status(500).json({ error: 'Erro ao calcular dashboard.' });
  }
});

const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 API rodando em :${PORT}`));
