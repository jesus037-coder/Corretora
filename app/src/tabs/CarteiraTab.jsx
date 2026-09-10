import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { M, PAL, KpiCard } from '../shared.jsx';

function SegmentCard({ seg, idx }) {
  const [open, setOpen] = useState(false);
  const color = PAL[idx % PAL.length];
  return (
    <div className={`sc${open ? ' open' : ''}`}>
      <div className="sc-stripe" style={{ background: color }} />
      <div className="sc-head" onClick={() => setOpen(!open)}>
        <div className="sc-icon" style={{ color }}>{seg.nome.slice(0, 4).toUpperCase()}</div>
        <div className="sc-kpis">
          <div className="sc-kpi"><span className="sc-kpi-lbl">APLICADO</span><span className="sc-kpi-val">{M(seg.aplicado)}</span></div>
          <div className="sc-kpi"><span className="sc-kpi-lbl">MERCADO</span><span className="sc-kpi-val g">{M(seg.mercado)}</span></div>
          <div className="sc-kpi"><span className="sc-kpi-lbl">L / P</span><span className={`sc-kpi-val ${seg.lp >= 0 ? 'g' : 'r'}`}>{M(seg.lp)}</span></div>
          <div className="sc-kpi"><span className="sc-kpi-lbl">ATIVOS</span><span className="sc-kpi-val m">{seg.ativos.length}</span></div>
        </div>
        <div className="sc-arr">›</div>
      </div>
      {open && (
        <div className="sc-body">
          <table className="sc-tbl">
            <thead><tr><th>Ativo</th><th>Qtd</th><th>PM</th><th>Preço</th><th>Aplicado</th><th>Mercado</th><th>L/P</th><th>%</th></tr></thead>
            <tbody>
              {seg.ativos.map((a) => (
                <tr key={a.ticker}>
                  <td>{a.ticker}</td><td>{a.qtd}</td><td>{M(a.pm)}</td><td>{M(a.preco)}</td>
                  <td>{M(a.aplicado)}</td><td>{M(a.mercado)}</td>
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

export default function CarteiraTab({ data, ano, chartColors }) {
  const { gc, tc } = chartColors;
  const kpis = data?.kpis || {};

  const evolChart = {
    labels: data?.evolucao?.labels || [],
    datasets: [{
      label: 'Patrimônio Total', data: data?.evolucao?.data || [],
      borderColor: '#3ddc84', backgroundColor: 'rgba(61,220,132,.07)',
      fill: true, tension: 0.35, pointRadius: 4, pointBackgroundColor: '#3ddc84', borderWidth: 2,
    }],
  };

  const barChart = {
    labels: data?.proventosMensais?.labels || [],
    datasets: [{ label: 'Proventos', data: data?.proventosMensais?.data || [], backgroundColor: 'rgba(61,220,132,.65)', borderRadius: 4 }],
  };

  const provSeg = data?.proventosPorSegmento || { labels: [], data: [] };
  const doughnutChart = {
    labels: provSeg.labels,
    datasets: [{ data: provSeg.data, backgroundColor: PAL.slice(0, provSeg.labels.length), borderColor: 'transparent', hoverOffset: 5 }],
  };

  const chartOpts = (extra = {}) => ({
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => M(c.parsed.y ?? c.parsed) } } },
    scales: { x: { grid: { color: gc }, ticks: { color: tc } }, y: { grid: { color: gc }, ticks: { color: tc, callback: (v) => M(v) } } },
    ...extra,
  });

  return (
    <>
      <div className="kpi-row">
        <KpiCard label="Valor Aplicado" value={M(kpis.valorAplicado)} />
        <KpiCard label="Valor de Mercado" value={M(kpis.valorMercado)} valCls="g" />
        <KpiCard label="L / P Total" value={M(kpis.lp)} valCls={kpis.lp >= 0 ? 'g' : 'r'} />
        <KpiCard label={`Proventos ${ano}`} value={M(kpis.proventos)} valCls="g" />
        <KpiCard label="Rentabilidade" value={M(kpis.lpT)} hint={`${kpis.rentabilidade >= 0 ? '▲' : '▼'} ${Math.abs(kpis.rentabilidade || 0).toFixed(2)}%`} bad={kpis.lpT < 0} valCls={kpis.lpT >= 0 ? 'g' : 'r'} />
      </div>
      <div className="sec-head"><h3>Evolução do Patrimônio</h3><span className="tag">mensal {ano}</span></div>
      <div className="chart-box">
        <div className="chart-ttl">Patrimônio Total Investido — {ano}</div>
        <div style={{ height: 220 }}><Line data={evolChart} options={chartOpts()} /></div>
      </div>
      <div className="sec-head"><h3>Proventos Recebidos</h3><span className="tag">ano {ano}</span></div>
      <div className="chart-duo">
        <div className="chart-box" style={{ marginBottom: 0 }}>
          <div className="chart-ttl">Distribuição Mensal (R$)</div>
          <div style={{ height: 190 }}><Bar data={barChart} options={chartOpts()} /></div>
        </div>
        <div className="chart-box" style={{ marginBottom: 0 }}>
          <div className="chart-ttl">Por Segmento</div>
          <div style={{ height: 190 }}>
            {provSeg.labels.length > 0 ? (
              <Doughnut data={doughnutChart} options={{ responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'right', labels: { color: tc, font: { size: 11 }, boxWidth: 10 } }, tooltip: { callbacks: { label: (c) => `${c.label}: ${M(c.parsed)}` } } } }} />
            ) : <div className="empty" style={{ padding: 40 }}><p>Sem proventos.</p></div>}
          </div>
        </div>
      </div>
      <div className="sec-head"><h3>Consolidação de Carteira</h3><span className="tag">{data?.nAtivos || 0} ativos · {data?.nSegmentos || 0} segmentos</span></div>
      <div className="seg-stack">
        {(data?.segmentos || []).map((seg, i) => <SegmentCard key={seg.nome} seg={seg} idx={i} />)}
      </div>
    </>
  );
}
