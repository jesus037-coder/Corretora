import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend, Filler,
} from 'chart.js';
import { fetchDashboard, fetchClientes, fetchAnos } from './api.js';
import { MES } from './shared.jsx';
import CarteiraTab from './tabs/CarteiraTab.jsx';
import ProventosTab from './tabs/ProventosTab.jsx';
import MetasTab from './tabs/MetasTab.jsx';
import CalculadoraTab from './tabs/CalculadoraTab.jsx';
import DirpfTab from './tabs/DirpfTab.jsx';
import ComprasVendasTab from './tabs/ComprasVendasTab.jsx';
import MovimentacaoModal from './components/MovimentacaoModal.jsx';
import Glossario from './components/Glossario.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

const TABS = [
  { id: 'carteira', label: 'Carteira', icon: '▦' },
  { id: 'proventos', label: 'Proventos', icon: '📈' },
  { id: 'metas', label: 'Metas', icon: '🎯' },
  { id: 'calc', label: 'Calculadora', icon: '⚙' },
  { id: 'dirpf', label: 'DIRPF', icon: '📋' },
  { id: 'comprasvendas', label: 'Compras e Vendas', icon: '⇅' },
];

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
  const [aba, setAba] = useState('carteira');
  const [movModal, setMovModal] = useState(null); // null | { mode: 'create'|'edit', mov: null|{...} }
  const [refreshKey, setRefreshKey] = useState(0);

  const isAdmin = user.role === 'admin' || user.role === 'demo';
  const isAutonomo = user.tipo_usuario === 'autonomo';

  useEffect(() => {
    fetchAnos().then((r) => setAnos(r.anos)).catch(() => {});
    if (isAdmin) {
      fetchClientes().then((r) => { setClientes(r.clientes); setClienteSel('__ZE__'); }).catch(() => {});
    } else {
      setClienteSel(user.nome);
    }
  }, []);

  useEffect(() => {
    if (!clienteSel) return;
    setLoading(true); setError('');
    fetchDashboard(ano, clienteSel)
      .then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [ano, clienteSel, refreshKey]);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  const chartColors = useMemo(() => {
    const light = theme === 'light';
    return { gc: light ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)', tc: light ? '#4a6b55' : '#7a9480' };
  }, [theme]);

  // Compute latest data for metas/calculadora
  const latest = useMemo(() => {
    const provData = data?.proventosMensais?.data || [];
    const provLabels = data?.proventosMensais?.labels || [];
    const mercado = Math.round((data?.kpis?.valorMercado || 0) * 100) / 100;
    const isTodos = data?.ano === 0;

    let rendUlt = 0;
    if (isTodos && provLabels.length) {
      // "Todos os anos": sum proventos of the last year for annual DY
      const lastYear = provLabels[provLabels.length - 1].split('/')[1];
      rendUlt = provData.reduce((sum, val, i) => {
        const yr = provLabels[i]?.split('/')[1];
        return yr === lastYear ? sum + val : sum;
      }, 0);
    } else {
      // Specific year: current year → DY of current month; past year → DY of December
      const selAno = data?.ano;
      const now = new Date();
      if (selAno === now.getFullYear()) {
        rendUlt = provData[now.getMonth()] || 0;
      } else {
        rendUlt = provData[11] || 0;
      }
    }
    const dy = mercado > 0 ? (rendUlt / mercado) * 100 : 0;
    let dyLabel = 'mês atual';
    if (isTodos) dyLabel = 'último ano';
    else if (data?.ano !== new Date().getFullYear()) dyLabel = 'dezembro';
    return { mercado, rendUlt, dy, isTodos, dyLabel };
  }, [data]);

  const roleLabel = user.role === 'admin' ? 'Administrador' : user.role === 'demo' ? 'Conta Demo' : user.nome;
  const clienteForTabs = clienteSel === '__ZE__' ? '__ZE__' : clienteSel;

  return (
    <div id="app" className="on">
      <aside className={`sidebar${sidebarOff ? ' off' : ''}`} id="sidebar">
        <div className="sb-top">
          <div className="sb-brand">Corretora do <em>Zé</em></div>
          <div className="sb-role">{roleLabel}</div>
          {user.tipo_usuario && (
            <div className="sb-profile">
              <span className={`sb-profile-tag ${user.tipo_usuario}`}>
                {user.tipo_usuario === 'assessorado' ? '🤝 Assessorado' : '🧭 Autônomo'}
              </span>
            </div>
          )}
        </div>
        <div className="sb-ano">
          <label>Ano de referência</label>
          <select value={ano} onChange={(e) => setAno(parseInt(e.target.value))}>
            <option value={0}>Todos os anos</option>
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
            <div className="nav-item on"><span className="nav-dot" style={{ background: 'var(--accent)' }} />{user.nome}</div>
          )}
        </nav>
        <div className="sb-foot">
          <button className="btn-out" onClick={onLogout}>↩ Sair</button>
        </div>
      </aside>

      <div className="main-col">
        <div className="topbar">
          <button className="btn-hamburger" onClick={() => setSidebarOff(!sidebarOff)}>☰</button>
          <div className="topbar-title">{clienteSel === '__ZE__' ? '⭐ Corretora — Zé' : clienteSel || 'Dashboard'}</div>
          <div className="topbar-actions">
            <div className="topbar-meta">{ano === 0 ? 'Todos os anos' : 'Ano ' + ano}</div>
            <button className="tb-btn" title="Novo lançamento" onClick={() => setMovModal({ mode: 'create', mov: null })}>
              + Lançamento
            </button>
            <button className="tb-btn icon-btn" title="Tema claro / escuro" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>
        </div>
        <div className="content">
          {/* Tabs bar */}
          <div className="tabs-bar">
            {TABS.map((t) => (
              <button key={t.id} className={`tab-btn${aba === t.id ? ' tab-on' : ''}`} onClick={() => setAba(t.id)}>
                <span style={{ fontSize: '14px' }}>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          {loading && <div className="empty"><div className="ico">⏳</div><p>Carregando…</p></div>}
          {error && <div className="empty"><div className="ico">⚠️</div><p>{error}</p></div>}
          {!loading && !error && data && aba === 'carteira' && <CarteiraTab data={data} ano={ano} chartColors={chartColors} onRefresh={() => setRefreshKey(k => k + 1)} isAutonomo={isAutonomo} />}
          {!loading && !error && data && aba === 'proventos' && <ProventosTab data={data} ano={ano} chartColors={chartColors} />}
          {!loading && !error && aba === 'metas' && <MetasTab cliente={clienteForTabs} latest={latest} isDemo={user.role === 'demo'} />}
          {!loading && !error && aba === 'calc' && <CalculadoraTab latest={latest} chartColors={chartColors} />}
          {!loading && !error && aba === 'dirpf' && <DirpfTab ano={ano === 0 ? (anos.length > 0 ? Math.max(...anos) : new Date().getFullYear()) : ano} cliente={clienteForTabs} theme={theme} />}
          {!loading && !error && aba === 'comprasvendas' && <ComprasVendasTab ano={ano} cliente={clienteForTabs} chartColors={chartColors} refreshKey={refreshKey} onEditMov={(mv) => setMovModal({ mode: 'edit', mov: mv })} />}
          {isAutonomo && <Glossario />}
        </div>
      </div>
      {movModal && (
        <MovimentacaoModal
          mode={movModal.mode}
          movimentacao={movModal.mov}
          cliente={clienteSel}
          isAdmin={isAdmin}
          onClose={() => setMovModal(null)}
          onSaved={() => { setMovModal(null); setRefreshKey(k => k + 1); }}
        />
      )}
    </div>
  );
}
