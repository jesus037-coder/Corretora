import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from './db.js';
import { syncData, SYNC_INTERVAL } from './sync.js';
import { syncMarketData, MARKET_SYNC_INTERVAL } from './marketSync.js';

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

/* ── Build month list (12 months for a year, all months for "Todos") ── */
function buildMonthList(movs, provRows, ano) {
  if (ano !== 0) return MES.map((m, i) => ({ year: ano, month: i, label: m }));
  let minYr = Infinity, minMo = Infinity, maxYr = -Infinity, maxMo = -Infinity;
  for (const mv of movs) {
    const d = new Date(mv.data), yr = d.getFullYear(), mo = d.getMonth();
    if (yr < minYr || (yr === minYr && mo < minMo)) { minYr = yr; minMo = mo; }
    if (yr > maxYr || (yr === maxYr && mo > maxMo)) { maxYr = yr; maxMo = mo; }
  }
  for (const row of provRows) {
    const dRef = row.data_pag ? new Date(row.data_pag) : (row.data_com ? new Date(row.data_com) : null);
    if (!dRef) continue;
    const yr = dRef.getFullYear(), mo = dRef.getMonth();
    if (yr < minYr || (yr === minYr && mo < minMo)) { minYr = yr; minMo = mo; }
    if (yr > maxYr || (yr === maxYr && mo > maxMo)) { maxYr = yr; maxMo = mo; }
  }
  if (minYr === Infinity) return MES.map((m, i) => ({ year: new Date().getFullYear(), month: i, label: m }));
  const months = [];
  let yr = minYr, mo = minMo;
  while (yr < maxYr || (yr === maxYr && mo <= maxMo)) {
    months.push({ year: yr, month: mo, label: MES[mo] + '/' + String(yr).slice(2) });
    mo++; if (mo > 11) { mo = 0; yr++; }
  }
  return months;
}

/* ── Build proventos por cliente/ano (ported from buildProv) ── */
function buildProv(movs, provRows, ano, monthList) {
  // ann: { ticker: { monthIndex: { v, dCom, seg } } }
  const ann = {};
  for (const row of provRows) {
    const dCom = row.data_com;
    const dPag = row.data_pag;
    const dRef = dPag || dCom;
    if (!dRef) continue;
    const dRefDate = new Date(dRef);
    const yr = dRefDate.getFullYear(), mo = dRefDate.getMonth();
    const mi = monthList.findIndex(m => m.year === yr && m.month === mo);
    if (mi < 0) continue;
    const seg = (row.segmento || 'OUTROS').toUpperCase();
    const tipo = (row.tipo || '').toUpperCase();
    const vu = parseFloat(row.valor_unit) || 0;
    let f = 1;
    const segUp = seg;
    if (segUp.includes('ETF')) f = 0.85;
    else if (segUp.includes('BDR') || tipo.includes('EXTERIOR')) f = 0.70;
    else if (tipo.includes('JCP') || tipo.includes('JSCP')) f = 0.85;
    const vl = Math.round(vu * f * 100) / 100;
    if (!ann[row.ticker]) ann[row.ticker] = {};
    if (!ann[row.ticker][mi]) ann[row.ticker][mi] = { v: 0, dCom: dCom ? new Date(dCom) : null, seg };
    ann[row.ticker][mi].v = Math.round((ann[row.ticker][mi].v + vl) * 100) / 100;
  }

  const tks = [...new Set(movs.map((m) => m.ticker))];
  const segs = {};
  const tot = Array(monthList.length).fill(0);

  for (const tk of tks) {
    const meses = [];
    let segA = '';
    for (let m = 0; m < monthList.length; m++) {
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
    const anoRaw = parseInt(req.query.ano);
    const ano = isNaN(anoRaw) ? new Date().getFullYear() : anoRaw;
    const isTodos = ano === 0;
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
    const ativosRes = await pool.query('SELECT ticker, segmento, valor, preco_justo, variacao FROM ativos');
    const precos = {};
    const segMap = {};
    const ativoInfo = {};
    for (const row of ativosRes.rows) {
      precos[row.ticker] = parseFloat(row.valor) || 0;
      if (row.segmento) segMap[row.ticker] = row.segmento;
      ativoInfo[row.ticker] = { ideal: parseFloat(row.preco_justo) || 0, variacao: row.variacao || '' };
    }

    // Fetch movimentações for this client
    let movsQuery = 'SELECT cliente, ticker, segmento, cv, quantidade, preco, total, data FROM movimentacoes WHERE 1=1';
    const movsParams = [];
    if (!isTodos) { movsQuery += ' AND EXTRACT(YEAR FROM data) <= $' + (movsParams.length + 1); movsParams.push(ano); }
    if (clienteFilter) { movsQuery += ' AND cliente = $' + (movsParams.length + 1); movsParams.push(clienteFilter); }
    movsQuery += ' ORDER BY data ASC';
    const movsRes = await pool.query(movsQuery, movsParams);
    const movs = movsRes.rows.map((r) => ({
      ...r,
      quantidade: parseFloat(r.quantidade),
      preco: parseFloat(r.preco),
      total: parseFloat(r.total),
    }));

    // Fetch proventos
    let provQuery, provParams;
    if (isTodos) {
      provQuery = 'SELECT ticker, segmento, data_com, data_pag, tipo, valor_unit FROM proventos';
      provParams = [];
    } else {
      provQuery = 'SELECT ticker, segmento, data_com, data_pag, tipo, valor_unit FROM proventos WHERE EXTRACT(YEAR FROM COALESCE(data_pag, data_com)) = $1';
      provParams = [ano];
    }
    const provRes = await pool.query(provQuery, provParams);
    const provRows = provRes.rows.map((r) => ({
      ...r,
      valor_unit: parseFloat(r.valor_unit),
    }));

    // Build month list (12 months for a specific year, all months for "Todos")
    const monthList = buildMonthList(movs, provRows, ano);

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
          const info = ativoInfo[tk] || {};
          ativos.push({
            ticker: tk,
            qtd: Math.round(it.q * 100) / 100,
            aplicado: it.apl,
            mercado: mkt,
            pm: it.q > 0 ? it.apl / it.q : 0,
            preco: precos[tk] || 0,
            lp: mkt - it.apl,
            lpPct: it.apl > 0 ? ((mkt - it.apl) / it.apl) * 100 : 0,
            ideal: info.ideal || 0,
            variacao: info.variacao || '',
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

    const pv = buildProv(movs, provRows, ano, monthList);
    const totProv = pv.tot.reduce((a, b) => a + b, 0);
    const lp = totMkt - totApl;
    const lpT = lp + totProv;
    const rent = totApl > 0 ? (lpT / totApl) * 100 : 0;

    // Evolução mensal
    const nMonths = monthList.length;
    const evolArr = Array(nMonths).fill(0);
    for (const mv of movs) {
      const d = new Date(mv.data);
      if (!isTodos && d.getFullYear() > ano) continue;
      const aj = isCompra(mv.cv) ? mv.total : -mv.total;
      const yr = d.getFullYear(), ms = d.getMonth();
      let mi = monthList.findIndex(m => m.year === yr && m.month === ms);
      if (mi < 0) {
        const first = monthList[0];
        if (yr < first.year || (yr === first.year && ms < first.month)) mi = 0;
        else continue;
      }
      for (let m = mi; m < nMonths; m++) evolArr[m] += aj;
    }

    // Trim evolution to current month
    const hoje = new Date();
    const ml = isTodos ? nMonths - 1 : (ano < hoje.getFullYear() ? 11 : hoje.getMonth());

    // Evolução por segmento (cumulative applied value per segment per month)
    const evolPorSeg = {};
    for (const mv of movs) {
      const d = new Date(mv.data);
      if (!isTodos && d.getFullYear() > ano) continue;
      const aj = isCompra(mv.cv) ? mv.total : -mv.total;
      const yr = d.getFullYear(), ms = d.getMonth();
      const s = mv.segmento || 'OUTROS';
      if (!evolPorSeg[s]) evolPorSeg[s] = Array(nMonths).fill(0);
      let mi = monthList.findIndex(m => m.year === yr && m.month === ms);
      if (mi < 0) {
        const first = monthList[0];
        if (yr < first.year || (yr === first.year && ms < first.month)) mi = 0;
        else continue;
      }
      for (let m = mi; m < nMonths; m++) evolPorSeg[s][m] += aj;
    }
    const evolPorSegTrimmed = {};
    for (const s of Object.keys(evolPorSeg)) evolPorSegTrimmed[s] = evolPorSeg[s].slice(0, ml + 1);

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
        labels: monthList.slice(0, ml + 1).map(m => m.label),
        data: evolArr.slice(0, ml + 1),
      },
      proventosMensais: {
        labels: monthList.map(m => m.label),
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
      evolucaoPorSegmento: {
        labels: monthList.slice(0, ml + 1).map(m => m.label),
        data: evolPorSegTrimmed,
      },
    });
  } catch (e) {
    console.error('Dashboard error:', e);
    res.status(500).json({ error: 'Erro ao calcular dashboard.' });
  }
});

/* ── Name normalization (remove accents, case-insensitive, collapse spaces) ── */
function normalizeName(name) {
  return (name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

/* ── DIRPF helpers (ported from index.html) ── */
function classificarTipoProvento(seg, tipo) {
  seg = (seg || '').toUpperCase();
  tipo = (tipo || '').toUpperCase();
  if (seg.includes('FII') || seg.includes('FUNDO IMOBILI') || seg.includes('FIAGRO')) return 'RENDIMENTO_ISENTO';
  if (seg.includes('ETF')) return 'ETF';
  if (tipo.includes('JCP') || tipo.includes('JSCP')) return 'JSCP';
  if (tipo.includes('DIVIDEND')) return 'DIVIDENDO';
  return 'OUTROS';
}

function getBensCategory(ticker, segmento) {
  const tk = (ticker || '').toUpperCase();
  const seg = (segmento || '').toUpperCase();
  if (/34$/.test(tk)) return { grupo: '04', codigo: '04', label: 'BDR — Brazilian Depositary Receipt' };
  if (seg.includes('FII') || seg.includes('FUNDO IMOBILI')) return { grupo: '07', codigo: '03', label: 'Fundo de Investimento Imobiliário (FII)' };
  if (seg.includes('FIAGRO')) return { grupo: '07', codigo: '02', label: 'Fiagro' };
  if (seg.includes('ETF')) return { grupo: '07', codigo: '06', label: 'ETF — Fundo de Índice' };
  if (/(3|4|5|11)$/.test(tk)) return { grupo: '03', codigo: '01', label: 'Ações' };
  return { grupo: '99', codigo: '99', label: 'Outros bens e direitos' };
}

function getRendimentosCategory(ticker, segmento, tipoProvento) {
  const seg = (segmento || '').toUpperCase();
  const tipo = (tipoProvento || '').toUpperCase();
  const isFII = seg.includes('FII') || seg.includes('FUNDO IMOBILI') || seg.includes('FIAGRO');
  const isETF = seg.includes('ETF');
  if (isFII) return { secao: 'ISENTOS', codigo: '99', label: 'Rendimentos isentos e não tributáveis — Outros' };
  if (isETF) return { secao: 'EXCLUSIVA', codigo: '11', label: 'Tributação exclusiva — Participações nos lucros e resultados' };
  if (tipo === 'DIVIDENDO') return { secao: 'ISENTOS', codigo: '09', label: 'Rendimentos isentos — Lucros e dividendos' };
  if (tipo === 'JSCP') return { secao: 'EXCLUSIVA', codigo: '10', label: 'Tributação exclusiva — Juros sobre capital próprio' };
  return { secao: 'EXCLUSIVA', codigo: '99', label: 'Tributação exclusiva — Outros' };
}

/* ── GET /api/metas?cliente= ── */
app.get('/api/metas', auth, async (req, res) => {
  try {
    const cliente = req.query.cliente || req.user.nome;
    const { rows } = await pool.query('SELECT * FROM metas WHERE cliente = $1 ORDER BY data ASC', [cliente]);
    res.json({ metas: rows.map((r) => ({ ...r, valor: parseFloat(r.valor), aporte: parseFloat(r.aporte), juros: parseFloat(r.juros) })) });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar metas.' });
  }
});

/* ── POST /api/metas ── */
app.post('/api/metas', auth, async (req, res) => {
  try {
    const { cliente, tipo, valor, aporte, juros } = req.body;
    if (!tipo || !valor || valor <= 0) return res.status(400).json({ error: 'Tipo e valor são obrigatórios.' });
    const cli = cliente || req.user.nome;
    const { rows } = await pool.query(
      'INSERT INTO metas (cliente, tipo, valor, aporte, juros) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [cli, tipo, valor, aporte || 0, juros != null ? juros : 1]
    );
    res.json({ meta: { ...rows[0], valor: parseFloat(rows[0].valor), aporte: parseFloat(rows[0].aporte), juros: parseFloat(rows[0].juros) } });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao salvar meta.' });
  }
});

/* ── GET /api/dirpf?ano=&cliente= ── */
app.get('/api/dirpf', auth, async (req, res) => {
  try {
    const ano = parseInt(req.query.ano) || new Date().getFullYear();
    let clienteFilter = null;
    if (req.user.role === 'admin' || req.user.role === 'demo') {
      clienteFilter = req.query.cliente === '__ZE__' || !req.query.cliente ? null : req.query.cliente;
    } else {
      clienteFilter = req.user.nome;
    }

    // Ativos for CNPJ + segmento mapping
    const ativosRes = await pool.query('SELECT ticker, segmento, cnpj FROM ativos');
    const infoAtivos = {};
    const segMap = {};
    for (const row of ativosRes.rows) {
      infoAtivos[row.ticker] = { cnpj: row.cnpj || '—' };
      if (row.segmento) segMap[row.ticker] = row.segmento;
    }

    // Movimentações up to 31/12/ano
    let movsQuery = 'SELECT * FROM movimentacoes WHERE data <= $1';
    const movsParams = [`${ano}-12-31`];
    if (clienteFilter) { movsQuery += ' AND cliente = $2'; movsParams.push(clienteFilter); }
    movsQuery += ' ORDER BY data ASC';
    const movsRes = await pool.query(movsQuery, movsParams);
    const movs = movsRes.rows.map((r) => ({ ...r, quantidade: parseFloat(r.quantidade), preco: parseFloat(r.preco), total: parseFloat(r.total) }));

    // Position at 31/12/ano
    const pos = {};
    for (const mv of movs) {
      const tk = mv.ticker;
      if (!pos[tk]) pos[tk] = { q: 0, custo: 0 };
      const p = pos[tk];
      if (isCompra(mv.cv)) { p.custo += mv.total; p.q += mv.quantidade; }
      else { const pm = p.q > 0 ? p.custo / p.q : 0; p.q -= mv.quantidade; p.custo = p.q > 0.0001 ? p.q * pm : 0; if (p.q < 0.0001) { p.q = 0; p.custo = 0; } }
    }

    // Bens agrupados por código Receita
    const gruposBens = {};
    let totBens = 0;
    for (const tk of Object.keys(pos).filter((t) => pos[t].q > 0.0001).sort()) {
      const cat = getBensCategory(tk, segMap[tk]);
      const key = cat.grupo + '|' + cat.codigo;
      if (!gruposBens[key]) gruposBens[key] = { grupo: cat.grupo, codigo: cat.codigo, label: cat.label, itens: [] };
      const info = infoAtivos[tk] || {};
      const qtd = pos[tk].q, custo = pos[tk].custo, pm = qtd > 0 ? custo / qtd : 0;
      totBens += custo;
      gruposBens[key].itens.push({
        tk, cnpj: info.cnpj || '—', custo, qtd, pm,
        texto: `Em 31/12/${ano}, possuía ${qtd.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ativo(s) de ${tk} (CNPJ: ${info.cnpj || 'não informado'}), adquirido(s) a custo médio de R$ ${pm.toFixed(2)}, totalizando R$ ${custo.toFixed(2)}.`,
      });
    }

    // Rendimentos por natureza
    const provRes = await pool.query('SELECT * FROM proventos WHERE EXTRACT(YEAR FROM COALESCE(data_pag, data_com)) = $1', [ano]);
    const rendMap = {};
    for (const row of provRes.rows) {
      const tk = row.ticker;
      const seg = row.segmento || 'OUTROS';
      const dCom = row.data_com ? new Date(row.data_com) : null;
      if (!dCom) continue;
      let qd = 0;
      for (const mv of movs) {
        if (mv.ticker !== tk) continue;
        const dm = new Date(mv.data);
        if (dm <= dCom) { qd += isCompra(mv.cv) ? mv.quantidade : -mv.quantidade; }
      }
      if (qd <= 0) continue;
      const vu = parseFloat(row.valor_unit) || 0;
      const segUp = seg.toUpperCase(), tipoUp = (row.tipo || '').toUpperCase();
      let f = 1;
      if (segUp.includes('ETF')) f = 0.85;
      else if (segUp.includes('BDR') || tipoUp.includes('EXTERIOR')) f = 0.70;
      else if (tipoUp.includes('JCP') || tipoUp.includes('JSCP')) f = 0.85;
      const valor = Math.round(qd * vu * f * 100) / 100;
      const classe = classificarTipoProvento(seg, row.tipo);
      const key = tk + '|' + classe;
      if (!rendMap[key]) rendMap[key] = { tk, seg, classe, valor: 0 };
      rendMap[key].valor = Math.round((rendMap[key].valor + valor) * 100) / 100;
    }

    const isentos = {}, exclusiva = {};
    let totIsento = 0, totExclusiva = 0;
    for (const k of Object.keys(rendMap)) {
      const it = rendMap[k];
      if (it.valor <= 0) continue;
      const cat = getRendimentosCategory(it.tk, it.seg, it.classe);
      const isI = cat.secao === 'ISENTOS';
      const bucket = isI ? isentos : exclusiva;
      if (!bucket[cat.codigo]) bucket[cat.codigo] = { label: cat.label, itens: [] };
      if (isI) totIsento += it.valor; else totExclusiva += it.valor;
      const info = infoAtivos[it.tk] || {};
      const texto = isI
        ? `Rendimentos recebidos a título de Dividendos, pagos por ${it.tk} (CNPJ: ${info.cnpj || 'não informado'}), no ano-calendário de ${ano}.`
        : `Rendimentos pagos por ${it.tk} (CNPJ: ${info.cnpj || 'não informado'}), com imposto retido na fonte, no ano-calendário de ${ano}.`;
      bucket[cat.codigo].itens.push({ tk: it.tk, cnpj: info.cnpj || '—', valor: it.valor, texto });
    }

    res.json({
      bens: Object.values(gruposBens),
      rendimentos: { isentos: Object.values(isentos), exclusiva: Object.values(exclusiva) },
      totais: { bens: totBens, isentos: totIsento, exclusiva: totExclusiva },
    });
  } catch (e) {
    console.error('DIRPF error:', e);
    res.status(500).json({ error: 'Erro ao gerar DIRPF.' });
  }
});

/* ── GET /api/compras-vendas?ano=&cliente= ── */
app.get('/api/compras-vendas', auth, async (req, res) => {
  try {
    const anoRaw = parseInt(req.query.ano);
    const ano = isNaN(anoRaw) ? new Date().getFullYear() : anoRaw;
    const isTodos = ano === 0;
    let clienteFilter = null;
    if (req.user.role === 'admin' || req.user.role === 'demo') {
      clienteFilter = req.query.cliente === '__ZE__' || !req.query.cliente ? null : req.query.cliente;
    } else {
      clienteFilter = req.user.nome;
    }

    let movsQuery = 'SELECT * FROM movimentacoes WHERE 1=1';
    const movsParams = [];
    if (!isTodos) { movsQuery += ' AND EXTRACT(YEAR FROM data) = $' + (movsParams.length + 1); movsParams.push(ano); }
    if (clienteFilter) { movsQuery += ' AND cliente = $' + (movsParams.length + 1); movsParams.push(clienteFilter); }
    movsQuery += ' ORDER BY data DESC';
    const movsRes = await pool.query(movsQuery, movsParams);
    const movs = movsRes.rows.map((r) => ({ ...r, quantidade: parseFloat(r.quantidade), preco: parseFloat(r.preco), total: parseFloat(r.total) }));

    let labels, investido, vendido;
    let totInv = 0, totVen = 0;
    if (isTodos) {
      const years = [...new Set(movs.map(mv => new Date(mv.data).getFullYear()))].sort();
      labels = years.map(String);
      investido = years.map(() => 0); vendido = years.map(() => 0);
      for (const mv of movs) {
        const yi = years.indexOf(new Date(mv.data).getFullYear());
        if (isCompra(mv.cv)) { investido[yi] += mv.total; totInv += mv.total; }
        else { vendido[yi] += mv.total; totVen += mv.total; }
      }
    } else {
      labels = MES;
      investido = Array(12).fill(0); vendido = Array(12).fill(0);
      for (const mv of movs) {
        const m = new Date(mv.data).getMonth();
        if (isCompra(mv.cv)) { investido[m] += mv.total; totInv += mv.total; }
        else { vendido[m] += mv.total; totVen += mv.total; }
      }
    }

    res.json({
      labels, investido, vendido,
      kpis: { totalInvestido: totInv, totalVendido: totVen, saldo: totInv - totVen },
      lancamentos: movs.map((mv) => ({
        id: mv.id, data: mv.data, cliente: mv.cliente, ticker: mv.ticker,
        segmento: mv.segmento, cv: mv.cv, quantidade: mv.quantidade,
        preco: mv.preco, total: mv.total,
      })),
    });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar compras e vendas.' });
  }
});

/* ── POST /api/movimentacoes ── */
app.post('/api/movimentacoes', auth, async (req, res) => {
  try {
    const { cliente, ticker, segmento, cv, quantidade, preco, total, data } = req.body;
    if (!ticker || !quantidade || !data) return res.status(400).json({ error: 'Ticker, quantidade e data são obrigatórios.' });
    const cli = cliente || req.user.nome;
    const tot = total || (quantidade * preco);
    const { rows } = await pool.query(
      'INSERT INTO movimentacoes (cliente, ticker, segmento, cv, quantidade, preco, total, data) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [cli, ticker.toUpperCase(), segmento || 'Outros', cv || 'Compra', quantidade, preco, tot, data]
    );
    res.json({ movimentacao: rows[0] });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao criar movimentação.' });
  }
});

/* ── PUT /api/movimentacoes/:id ── */
app.put('/api/movimentacoes/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { ticker, segmento, cv, quantidade, preco, total, data } = req.body;
    const { rows } = await pool.query(
      'UPDATE movimentacoes SET ticker=$1, segmento=$2, cv=$3, quantidade=$4, preco=$5, total=$6, data=$7 WHERE id=$8 RETURNING *',
      [ticker?.toUpperCase() || null, segmento, cv, quantidade, preco, total || (quantidade * preco), data, id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Lançamento não encontrado.' });
    res.json({ movimentacao: rows[0] });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao editar movimentação.' });
  }
});

/* ── POST /api/sync (manual trigger) ── */
app.post('/api/sync', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'demo') return res.status(403).json({ error: 'Apenas administradores.' });
  try { await syncData(); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ error: 'Erro ao sincronizar.' }); }
});

const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API rodando em :${PORT}`);
  // Auto-sync from Google Sheets on startup (delayed) and periodically
  setTimeout(() => syncData(), 10000);
  setInterval(() => syncData(), SYNC_INTERVAL);
  // Auto-sync market prices from Brapi on startup (delayed) and periodically
  setTimeout(() => syncMarketData(), 15000);
  setInterval(() => syncMarketData(), MARKET_SYNC_INTERVAL);
  console.log(`🔄 Sheet sync every ${SYNC_INTERVAL / 60000} min | Market sync every ${MARKET_SYNC_INTERVAL / 60000} min`);
});
