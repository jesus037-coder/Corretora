import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { MES, M, KpiCard } from '../shared.jsx';
import { fetchComprasVendas } from '../api.js';

export default function ComprasVendasTab({ ano, cliente, chartColors }) {
  const { gc, tc } = chartColors;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cliente) return;
    setLoading(true);
    setError('');
    fetchComprasVendas(ano, cliente).then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [ano, cliente]);

  if (loading) return <div className="empty"><div className="ico">⏳</div><p>Carregando…</p></div>;
  if (error) return <div className="empty"><div className="ico">⚠️</div><p>{error}</p></div>;
  if (!data) return null;

  const kpis = data.kpis || {};

  const chartData = {
    labels: MES,
    datasets: [
      { label: 'Investido', data: data.investido, backgroundColor: 'rgba(61,220,132,.65)', borderRadius: 5 },
      { label: 'Vendido', data: data.vendido, backgroundColor: 'rgba(242,92,92,.65)', borderRadius: 5 },
    ],
  };

  const lancs = data.lancamentos || [];

  return (
    <>
      <div className="kpi-row">
        <KpiCard label="Total Investido" value={M(kpis.totalInvestido)} hint="compras no período" valCls="g" />
        <KpiCard label="Total Vendido" value={M(kpis.totalVendido)} hint="vendas no período" valCls="r" />
        <KpiCard label="Saldo (Investido − Vendido)" value={M(kpis.saldo)} />
      </div>
      <div className="sec-head"><h3>Investido × Vendido</h3><span className="tag">mensal {ano}</span></div>
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
      <div className="tbl-wrap">
        <div className="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Data</th><th style={{ textAlign: 'left' }}>Cliente</th>
                <th style={{ textAlign: 'left' }}>Ativo</th><th style={{ textAlign: 'left' }}>Segmento/Tipo</th>
                <th>Operação</th><th>Quantidade</th><th>Preço Unit.</th><th>Total</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lancs.length === 0 && <tr><td colSpan={9} style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px 0' }}>Nenhum lançamento encontrado.</td></tr>}
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
                    <td><span style={{ color: 'var(--muted)', fontSize: '.65rem' }}>—</span></td>
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
