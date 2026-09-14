import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { MES, M, KpiCard } from '../shared.jsx';
import { fetchComprasVendas } from '../api.js';

export default function ComprasVendasTab({ ano, cliente, chartColors, refreshKey, onEditMov }) {
  const { gc, tc } = chartColors;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filters
  const [fAtivo, setFAtivo] = useState('');
  const [fOperacao, setFOperacao] = useState('');
  const [fDataDe, setFDataDe] = useState('');
  const [fDataAte, setFDataAte] = useState('');
  const [fMes, setFMes] = useState('');
  const [fAno, setFAno] = useState('');

  useEffect(() => {
    if (!cliente) return;
    setLoading(true);
    setError('');
    fetchComprasVendas(ano, cliente).then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [ano, cliente, refreshKey]);

  if (loading) return <div className="empty"><div className="ico">⏳</div><p>Carregando…</p></div>;
  if (error) return <div className="empty"><div className="ico">⚠️</div><p>{error}</p></div>;
  if (!data) return null;

  const kpis = data.kpis || {};

  const chartLabels = data.labels || MES;
  const chartData = {
    labels: chartLabels,
    datasets: [
      { label: 'Investido', data: data.investido, backgroundColor: 'rgba(61,220,132,.65)', borderRadius: 5 },
      { label: 'Vendido', data: data.vendido, backgroundColor: 'rgba(242,92,92,.65)', borderRadius: 5 },
    ],
  };

  const lancsRaw = data.lancamentos || [];

  // Unique tickers for filter dropdown
  const tickers = [...new Set(lancsRaw.map(l => l.ticker))].sort();

  // Available years (from lançamentos dates) for year filter when ano=0
  const anosDisponiveis = ano === 0
    ? [...new Set(lancsRaw.map(l => new Date(l.data).getFullYear()))].sort((a, b) => b - a)
    : [];

  // Apply filters
  const lancs = lancsRaw.filter((mv) => {
    if (fAtivo && mv.ticker !== fAtivo) return false;
    if (fOperacao) {
      const isCompra = mv.cv === 'Compra' || mv.cv === 'C';
      if (fOperacao === 'Compra' && !isCompra) return false;
      if (fOperacao === 'Venda' && isCompra) return false;
    }
    const d = new Date(mv.data);
    if (fMes && d.getMonth() !== parseInt(fMes)) return false;
    if (fAno && d.getFullYear() !== parseInt(fAno)) return false;
    if (fDataDe) {
      const dtDe = new Date(fDataDe + 'T00:00:00');
      if (d < dtDe) return false;
    }
    if (fDataAte) {
      const dtAte = new Date(fDataAte + 'T23:59:59');
      if (d > dtAte) return false;
    }
    return true;
  });

  const limparFiltros = () => {
    setFAtivo(''); setFOperacao(''); setFDataDe(''); setFDataAte(''); setFMes(''); setFAno('');
  };
  const temFiltro = fAtivo || fOperacao || fDataDe || fDataAte || fMes || fAno;

  return (
    <>
      <div className="kpi-row">
        <KpiCard label="Total Investido" value={M(kpis.totalInvestido)} hint="compras no período" valCls="g" />
        <KpiCard label="Total Vendido" value={M(kpis.totalVendido)} hint="vendas no período" valCls="r" />
        <KpiCard label="Saldo (Investido − Vendido)" value={M(kpis.saldo)} />
      </div>
      <div className="sec-head"><h3>Investido × Vendido</h3><span className="tag">{ano === 0 ? 'todos os anos' : 'mensal ' + ano}</span></div>
      <div className="chart-box">
        <div style={{ height: 240 }}>
          <Bar data={chartData} options={{
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { labels: { color: tc } }, tooltip: { callbacks: { label: (ct) => ct.dataset.label + ': ' + M(ct.parsed.y) } } },
            scales: { x: { grid: { color: gc }, ticks: { color: tc } }, y: { grid: { color: gc }, ticks: { color: tc, callback: (v) => M(v) } } },
          }} />
        </div>
      </div>
      <div className="sec-head"><h3>Lançamentos</h3><span className="tag">{lancs.length} registro{lancs.length !== 1 ? 's' : ''}</span></div>
      <div className="lanc-filtros">
        <div className="lanc-filter">
          <label>Ativo</label>
          <select value={fAtivo} onChange={e => setFAtivo(e.target.value)}>
            <option value="">Todos</option>
            {tickers.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="lanc-filter">
          <label>Operação</label>
          <select value={fOperacao} onChange={e => setFOperacao(e.target.value)}>
            <option value="">Todas</option>
            <option value="Compra">Compra</option>
            <option value="Venda">Venda</option>
          </select>
        </div>
        <div className="lanc-filter">
          <label>Mês</label>
          <select value={fMes} onChange={e => setFMes(e.target.value)}>
            <option value="">Todos</option>
            {MES.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
        </div>
        {ano === 0 && (
          <div className="lanc-filter">
            <label>Ano</label>
            <select value={fAno} onChange={e => setFAno(e.target.value)}>
              <option value="">Todos</option>
              {anosDisponiveis.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        )}
        <div className="lanc-filter">
          <label>Data de</label>
          <input type="date" value={fDataDe} onChange={e => setFDataDe(e.target.value)} />
        </div>
        <div className="lanc-filter">
          <label>Data até</label>
          <input type="date" value={fDataAte} onChange={e => setFDataAte(e.target.value)} />
        </div>
        {temFiltro && <button className="lanc-filter-clear" onClick={limparFiltros}>Limpar</button>}
      </div>
      <div className="tbl-wrap">
        <div className="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Data</th><th style={{ textAlign: 'left' }}>Cliente</th>
                <th style={{ textAlign: 'left' }}>Ativo</th><th style={{ textAlign: 'left' }}>Segmento/Tipo</th>
                <th>Operação</th><th>Quantidade</th><th>Preço Unit.</th><th>Total</th><th></th>
              </tr>
            </thead>
            <tbody>
              {lancs.length === 0 && <tr><td colSpan={9} style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px 0' }}>Nenhum lançamento encontrado. Use "+ Lançamento" na barra superior para adicionar.</td></tr>}
              {lancs.map((mv) => {
                const d = new Date(mv.data);
                const dataFmt = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
                const corCV = mv.cv === 'Compra' || mv.cv === 'C' ? 'var(--accent)' : 'var(--red)';
                return (
                  <tr key={mv.id}>
                    <td className="td-l">{dataFmt}</td>
                    <td className="td-l">{mv.cliente}</td>
                    <td className="td-l" style={{ fontWeight: 700 }}>{mv.ticker}</td>
                    <td className="td-l">{mv.segmento}</td>
                    <td style={{ color: corCV, fontWeight: 600 }}>{mv.cv}</td>
                    <td>{(mv.quantidade || 0).toLocaleString('pt-BR', { maximumFractionDigits: 4 })}</td>
                    <td>{M(mv.preco || 0)}</td>
                    <td style={{ fontWeight: 600 }}>{M(mv.total || 0)}</td>
                    <td><button className="btn-edit" onClick={() => onEditMov(mv)}>Editar</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
