import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { MES, M, PAL, KpiCard } from '../shared.jsx';

export default function ProventosTab({ data, ano, chartColors }) {
  const { gc, tc } = chartColors;
  const kpis = data?.kpis || {};
  const provData = data?.proventosMensais?.data || Array(12).fill(0);
  const provSeg = data?.proventosPorSegmento || { labels: [], data: [] };
  const detalhe = data?.proventosDetalhe || {};

  // Find last month with proventos
  const hoje = new Date();
  const mesAtual = ano < hoje.getFullYear() ? 11 : hoje.getMonth();
  let provUltMes = 0, mesUlt = mesAtual;
  for (let i = mesAtual; i >= 0; i--) { if (provData[i] > 0) { provUltMes = provData[i]; mesUlt = i; break; } }
  const dyUltMes = kpis.valorMercado > 0 ? (provUltMes / kpis.valorMercado) * 100 : 0;
  const dyAno = kpis.valorMercado > 0 ? (kpis.proventos / kpis.valorMercado) * 100 : 0;
  const roi = kpis.valorAplicado > 0 ? (kpis.lpT / kpis.valorAplicado) * 100 : 0;

  const barChart = {
    labels: MES,
    datasets: [{ label: 'Proventos', data: provData, backgroundColor: 'rgba(61,220,132,.65)', borderRadius: 4 }],
  };
  const doughnutChart = {
    labels: provSeg.labels,
    datasets: [{ data: provSeg.data, backgroundColor: PAL.slice(0, provSeg.labels.length), borderColor: 'transparent', hoverOffset: 5 }],
  };
  const chartOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => M(c.parsed.y ?? c.parsed) } } },
    scales: { x: { grid: { color: gc }, ticks: { color: tc } }, y: { grid: { color: gc }, ticks: { color: tc, callback: (v) => M(v) } } },
  };

  const [openSegs, setOpenSegs] = useState({});

  return (
    <>
      <div className="kpi-row">
        <KpiCard label={`Proventos ${MES[mesUlt]}`} value={M(provUltMes)} hint="último mês com rendimento" valCls="g" />
        <KpiCard label={`Proventos ${ano}`} value={M(kpis.proventos)} hint="acumulado no ano" valCls="g" />
        <KpiCard label={`DY Mês (${MES[mesUlt]})`} value={dyUltMes.toFixed(2) + '%'} hint="dividend yield mensal" valCls={dyUltMes > 0 ? 'g' : ''} />
        <KpiCard label={`DY Ano ${ano}`} value={dyAno.toFixed(2) + '%'} hint="dividend yield anual" valCls={dyAno > 0 ? 'g' : ''} />
        <KpiCard label="ROI Carteira" value={roi.toFixed(2) + '%'} hint={M(kpis.lpT)} bad={roi < 0} valCls={roi >= 0 ? 'g' : 'r'} />
      </div>
      <div className="sec-head"><h3>Proventos Recebidos</h3><span className="tag">ano {ano}</span></div>
      <div className="chart-duo">
        <div className="chart-box" style={{ marginBottom: 0 }}>
          <div className="chart-ttl">Distribuição Mensal (R$)</div>
          <div style={{ height: 190 }}><Bar data={barChart} options={chartOpts} /></div>
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
      {/* Proventos table */}
      <div className="tbl-wrap">
        <div className="tbl-scroll">
          <table>
            <thead>
              <tr><th style={{ textAlign: 'left' }}></th>{MES.map((m) => <th key={m}>{m}</th>)}</tr>
            </thead>
            <tbody>
              {Object.keys(detalhe).map((sg) => {
                const sid = 'pv-' + sg.replace(/\W+/g, '-');
                const isOpen = openSegs[sid];
                return (
                  <React.Fragment key={sg}>
                    <tr className="seg-hdr" onClick={() => setOpenSegs({ ...openSegs, [sid]: !isOpen })}>
                      <td colSpan={13}>{isOpen ? '▾' : '▸'} {sg}</td>
                    </tr>
                    {detalhe[sg].map((at) => (
                      <tr key={at.tk} className={isOpen ? '' : 'hide'}>
                        <td className="td-l" style={{ paddingLeft: 28 }}>{at.tk}</td>
                        {at.m.map((m, i) => (
                          <td key={i}><div className="pc"><div className="pu">{m.s > 0 ? 'R$ ' + m.u : '—'}</div>{m.q > 0 && <div className="pe">{m.q} cotas</div>}{m.s > 0 && <div className="pt">{M(m.s)}</div>}</div></td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
            <tfoot>
              <tr><td className="td-l">TOTAL</td>{provData.map((t, i) => <td key={i}>{M(t)}</td>)}</tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
