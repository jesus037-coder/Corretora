import React, { useState, useEffect, useRef } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend, Filler,
} from 'chart.js';
import { fetchDashboard, fetchClientes, fetchAnos } from './api.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

const MES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const PAL = ['#3ddc84', '#4da6ff', '#b388ff', '#f25c5c', '#ffb347', '#40c4ff', '#a5d6a7', '#ef9a9a'];

function M(v) {
  return (+(v) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

function KpiCard({ label, value, hint, bad, valCls }) {
  return (
    <div className={`kpi anim${bad ? ' bad' : ''}`}>
      <div className="kpi-lbl">{label}</div>
      <div className={`kpi-val val${valCls ? ' ' + valCls : ''}`}>{value}</div>
      {hint && <div className="kpi-hint val">{hint}</div>}
    </div>
  );
}

function SegmentCard({ seg, idx }) {
  const [open, setOpen] = useState(false);
  const color = PAL[idx % PAL.length];
  return (
    <div className={`sc${open ? ' open' : ''}`}>
      <div className="sc-stripe" style={{ background: color }} />
      <div className="sc-head" onClick={() => setOpen(!open)}>
        <div className="sc-icon" style={{ color }}>
          {seg.nome.slice(0, 4).toUpperCase()}
        </div>
        <div className="sc-kpis">
          <div className="sc-kpi">
            <span className="sc-kpi-lbl">APLICADO</span>
            <span className="sc-kpi-val">{M(seg.aplicado)}</span>
          </div>
          <div className="sc-kpi">
            <span className="sc-kpi-lbl">MERCADO</span>
            <span className="sc-kpi-val g">{M(seg.mercado)}</span>
          </div>
          <div className="sc-kpi">
            <span className="sc-kpi-lbl">L / P</span>
            <span className={`sc-kpi-val ${seg.lp >= 0 ? 'g' : 'r'}`}>{M(seg.lp)}</span>
          </div>
          <div className="sc-kpi">
            <span className="sc-kpi-lbl">ATIVOS</span>
            <span className="sc-kpi-val m">{seg.ativos.length}</span>
          </div>
        </div>
        <div className="sc-arr">›</div>
      </div>
      {open && (
        <div className="sc-body">
          <table className="sc-tbl">
            <thead>
              <tr>
                <th>Ativo</th><th>Qtd</th><th>PM</th><th>Preço</th>
                <th>Aplicado</th><th>Mercado</th><th>L/P</th><th>%</th>
              </tr>
            </thead>
            <tbody>
              {seg.ativos.map((a) => (
                <tr key={a.ticker}>
                  <td>{a.ticker}</td>
                  <td>{a.qtd}</td>
                  <td>{M(a.pm)}</td>
                  <td>{M(a.preco)}</td>
                  <td>{M(a.aplicado)}</td>
                  <td>{M(a.mercado)}</td>
                  <td className={a.lp >= 0 ? 'g' : 'r'}>{M(a.lp)}</td>
                  <td className={a.lpPct >= 0 ? 'g' : 'r'}>{a.lpPct.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ user, onLogout }) {
  const [ano, setAno] = useState(new Date().getFullYear());
  const [anos, setAnos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteSel, setClienteSel] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark');
  const [sidebarOff, setSidebarOff] = useState(false);

  const isAdmin = user.role === 'admin' || user.role === 'demo';

  // Load anos + clientes
  useEffect(() => {
    fetchAnos().then((r) => setAnos(r.anos)).catch(() => {});
    if (isAdmin) {
      fetchClientes().then((r) => {
        setClientes(r.clientes);
        setClienteSel('__ZE__');
      }).catch(() => {});
    } else {
      setClienteSel(user.nome);
    }
  }, []);

  // Load dashboard when ano/cliente changes
  useEffect(() => {
    if (!clienteSel) return;
    setLoading(true);
    setError('');
    fetchDashboard(ano, clienteSel)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [ano, clienteSel]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const kpis = data?.kpis || {};
  const evolucao = data?.evolucao || { labels: [], data: [] };
  const provMensais = data?.proventosMensais || { labels: MES, data: Array(12).fill(0) };
  const provSeg = data?.proventosPorSegmento || { labels: [], data: [] };

  const chartGridColor = theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)';
  const chartTickColor = theme === 'light' ? '#4a6b55' : '#7a9480';

  const evolChart = {
    labels: evolucao.labels,
    datasets: [{
      label: 'Patrimônio Total',
      data: evolucao.data,
      borderColor: '#3ddc84',
      backgroundColor: 'rgba(61,220,132,.07)',
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointBackgroundColor: '#3ddc84',
      pointBorderColor: 'transparent',
      borderWidth: 2,
    }],
  };

  const barChart = {
    labels: provMensais.labels,
    datasets: [{
      label: 'Proventos',
      data: provMensais.data,
      backgroundColor: 'rgba(61,220,132,.65)',
      borderRadius: 4,
    }],
  };

  const doughnutChart = {
    labels: provSeg.labels,
    datasets: [{
      data: provSeg.data,
      backgroundColor: PAL.slice(0, provSeg.labels.length),
      borderColor: 'transparent',
      hoverOffset: 5,
    }],
  };

  const chartOpts = (extra = {}) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (c) => M(c.parsed.y ?? c.parsed) } },
    },
    scales: {
      x: { grid: { color: chartGridColor }, ticks: { color: chartTickColor } },
      y: { grid: { color: chartGridColor }, ticks: { color: chartTickColor, callback: (v) => M(v) } },
    },
    ...extra,
  });

  const roleLabel = user.role === 'admin' ? 'Administrador' : user.role === 'demo' ? 'Conta Demo' : user.nome;

  return (
    <div id="app" className="on">
      <aside className={`sidebar${sidebarOff ? ' off' : ''}`} id="sidebar">
        <div className="sb-top">
          <div className="sb-brand">Corretora do <em>Zé</em></div>
          <div className="sb-role">{roleLabel}</div>
        </div>
        <div className="sb-ano">
          <label>Ano de referência</label>
          <select value={ano} onChange={(e) => setAno(parseInt(e.target.value))}>
            {anos.length === 0 && <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>}
            {anos.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <nav className="nav-list">
          {isAdmin && (
            <>
              <div className={`nav-item nav-ze${clienteSel === '__ZE__' ? ' on' : ''}`} onClick={() => setClienteSel('__ZE__')}>
                <span className="nav-dot" style={{ background: 'var(--orange)' }} />⭐ Corretora — Zé
              </div>
              <div style={{ height: '1px', background: 'var(--border)', margin: '6px 16px' }} />
              {clientes.filter((c) => c !== '__ZE__').map((c) => (
                <div key={c} className={`nav-item${clienteSel === c ? ' on' : ''}`} onClick={() => setClienteSel(c)}>
                  <span className="nav-dot" />{c}
                </div>
              ))}
            </>
          )}
          {!isAdmin && (
            <div className="nav-item on">
              <span className="nav-dot" style={{ background: 'var(--accent)' }} />{user.nome}
            </div>
          )}
        </nav>
        <div className="sb-foot">
          <button className="btn-out" onClick={onLogout}>↩ Sair</button>
        </div>
      </aside>

      <div className="main-col">
        <div className="topbar">
          <button className="btn-hamburger" onClick={() => setSidebarOff(!sidebarOff)}>☰</button>
          <div className="topbar-title">
            {clienteSel === '__ZE__' ? '⭐ Corretora — Zé' : clienteSel || 'Dashboard'}
          </div>
          <div className="topbar-actions">
            <div className="topbar-meta">Ano {ano}</div>
            <button className="tb-btn icon-btn" title="Tema claro / escuro" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>
        </div>
        <div className="content">
          {loading && <div className="empty"><div className="ico">⏳</div><p>Carregando…</p></div>}
          {error && <div className="empty"><div className="ico">⚠️</div><p>{error}</p></div>}
          {!loading && !error && data && (
            <>
              {/* KPIs */}
              <div className="kpi-row">
                <KpiCard label="Valor Aplicado" value={M(kpis.valorAplicado)} />
                <KpiCard label="Valor de Mercado" value={M(kpis.valorMercado)} valCls="g" />
                <KpiCard label="L / P Total" value={M(kpis.lp)} valCls={kpis.lp >= 0 ? 'g' : 'r'} />
                <KpiCard label={`Proventos ${ano}`} value={M(kpis.proventos)} valCls="g" />
                <KpiCard
                  label="Rentabilidade"
                  value={M(kpis.lpT)}
                  hint={`${kpis.rentabilidade >= 0 ? '▲' : '▼'} ${Math.abs(kpis.rentabilidade || 0).toFixed(2)}%`}
                  bad={kpis.lpT < 0}
                  valCls={kpis.lpT >= 0 ? 'g' : 'r'}
                />
              </div>

              {/* Evolução */}
              <div className="sec-head">
                <h3>Evolução do Patrimônio</h3>
                <span className="tag">mensal {ano}</span>
              </div>
              <div className="chart-box">
                <div className="chart-ttl">Patrimônio Total Investido — {ano}</div>
                <div style={{ height: 220 }}>
                  <Line data={evolChart} options={chartOpts()} />
                </div>
              </div>

              {/* Proventos charts */}
              <div className="sec-head">
                <h3>Proventos Recebidos</h3>
                <span className="tag">ano {ano}</span>
              </div>
              <div className="chart-duo">
                <div className="chart-box" style={{ marginBottom: 0 }}>
                  <div className="chart-ttl">Distribuição Mensal (R$)</div>
                  <div style={{ height: 190 }}>
                    <Bar data={barChart} options={chartOpts()} />
                  </div>
                </div>
                <div className="chart-box" style={{ marginBottom: 0 }}>
                  <div className="chart-ttl">Por Segmento</div>
                  <div style={{ height: 190 }}>
                    {provSeg.labels.length > 0 ? (
                      <Doughnut data={doughnutChart} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '65%',
                        plugins: {
                          legend: { position: 'right', labels: { color: chartTickColor, font: { size: 11 }, boxWidth: 10 } },
                          tooltip: { callbacks: { label: (c) => `${c.label}: ${M(c.parsed)}` } },
                        },
                      }} />
                    ) : <div className="empty" style={{ padding: 40 }}><p>Sem proventos.</p></div>}
                  </div>
                </div>
              </div>

              {/* Segment cards */}
              <div className="sec-head">
                <h3>Consolidação de Carteira</h3>
                <span className="tag">{data.nAtivos} ativos · {data.nSegmentos} segmentos</span>
              </div>
              <div className="seg-stack">
                {data.segmentos.map((seg, i) => (
                  <SegmentCard key={seg.nome} seg={seg} idx={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
