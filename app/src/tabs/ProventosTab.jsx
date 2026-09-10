import React, { useState, useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { MES, M, PAL, KpiCard } from '../shared.jsx';

export default function ProventosTab({ data, ano, chartColors }) {
  const { gc, tc } = chartColors;
  const kpis = data?.kpis || {};
  const provData = data?.proventosMensais?.data || Array(12).fill(0);
  const provSeg = data?.proventosPorSegmento || { labels: [], data: [] };
  const detalhe = data?.proventosDetalhe || {};
  const segNames = Object.keys(detalhe);

  const [selectedSeg, setSelectedSeg] = useState(null);
  const [openSegs, setOpenSegs] = useState({});
  const [detailMonth, setDetailMonth] = useState(null);

  // KPIs
  const hoje = new Date();
  const mesAtual = ano < hoje.getFullYear() ? 11 : hoje.getMonth();
  let provUltMes = 0, mesUlt = mesAtual;
  for (let i = mesAtual; i >= 0; i--) { if (provData[i] > 0) { provUltMes = provData[i]; mesUlt = i; break; } }
  const dyUltMes = kpis.valorMercado > 0 ? (provUltMes / kpis.valorMercado) * 100 : 0;
  const dyAno = kpis.valorMercado > 0 ? (kpis.proventos / kpis.valorMercado) * 100 : 0;
  const roi = kpis.valorAplicado > 0 ? (kpis.lpT / kpis.valorAplicado) * 100 : 0;

  // Monthly proventos per segment
  const segMensal = useMemo(() => {
    const map = {};
    for (const sg of segNames) {
      const monthly = Array(12).fill(0);
      detalhe[sg].forEach(at => at.m.forEach((m, i) => { monthly[i] = Math.round((monthly[i] + m.s) * 100) / 100; }));
      map[sg] = monthly;
    }
    return map;
  }, [detalhe, segNames]);

  // Per-ativo annual totals within a segment
  const segAtivosTotals = useMemo(() => {
    const map = {};
    for (const sg of segNames) {
      map[sg] = detalhe[sg].map(at => ({
        tk: at.tk,
        total: at.m.reduce((s, m) => s + m.s, 0),
      })).filter(a => a.total > 0).sort((a, b) => b.total - a.total);
    }
    return map;
  }, [detalhe, segNames]);

  // Bar chart: selected segment or total
  const segIdx = selectedSeg ? segNames.indexOf(selectedSeg) : -1;
  const barColor = segIdx >= 0 ? PAL[segIdx % PAL.length] : null;
  const barChart = {
    labels: MES,
    datasets: [{
      label: selectedSeg || 'Proventos',
      data: selectedSeg ? (segMensal[selectedSeg] || Array(12).fill(0)) : provData,
      backgroundColor: barColor ? barColor + 'aa' : 'rgba(61,220,132,.65)',
      borderRadius: 4,
    }],
  };

  // Doughnut: expanded segment → per-ativo; else → per-segment totals
  const expandedSeg = segNames.find(s => openSegs['pv-' + s.replace(/\W+/g, '-')]);
  let dLabels, dData, dColors;
  if (expandedSeg && segAtivosTotals[expandedSeg]?.length > 0) {
    dLabels = segAtivosTotals[expandedSeg].map(a => a.tk);
    dData = segAtivosTotals[expandedSeg].map(a => a.total);
    dColors = PAL.slice(0, dLabels.length);
  } else {
    dLabels = provSeg.labels;
    dData = provSeg.data;
    dColors = PAL.slice(0, dLabels.length);
  }
  const doughnutChart = { labels: dLabels, datasets: [{ data: dData, backgroundColor: dColors, borderColor: 'transparent', hoverOffset: 5 }] };

  const chartOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => M(c.parsed.y ?? c.parsed) } } },
    scales: { x: { grid: { color: gc }, ticks: { color: tc } }, y: { grid: { color: gc }, ticks: { color: tc, callback: (v) => M(v) } } },
  };
  const doughnutOpts = {
    responsive: true, maintainAspectRatio: false, cutout: '65%',
    plugins: { legend: { position: 'right', labels: { color: tc, font: { size: 11 }, boxWidth: 10 } }, tooltip: { callbacks: { label: (c) => `${c.label}: ${M(c.parsed)}` } } },
  };

  const toggleSeg = (sg) => {
    const sid = 'pv-' + sg.replace(/\W+/g, '-');
    const isNowOpen = !openSegs[sid];
    setOpenSegs({ [sid]: isNowOpen });
    setSelectedSeg(isNowOpen ? sg : null);
  };

  return (
    <>
      <div className="kpi-row">
        <KpiCard label={`Proventos ${MES[mesUlt]}`} value={M(provUltMes)} hint="último mês com rendimento" valCls="g" />
        <KpiCard label={`Proventos ${ano}`} value={M(kpis.proventos)} hint="acumulado no ano" valCls="g" />
        <KpiCard label={`DY Mês (${MES[mesUlt]})`} value={dyUltMes.toFixed(2) + '%'} hint="dividend yield mensal" valCls={dyUltMes > 0 ? 'g' : ''} />
        <KpiCard label={`DY Ano ${ano}`} value={dyAno.toFixed(2) + '%'} hint="dividend yield anual" valCls={dyAno > 0 ? 'g' : ''} />
        <KpiCard label="ROI Carteira" value={roi.toFixed(2) + '%'} hint={M(kpis.lpT)} bad={roi < 0} valCls={roi >= 0 ? 'g' : 'r'} />
      </div>
      <div className="sec-head">
        <h3>Proventos Recebidos</h3>
        <span className="tag">{selectedSeg ? selectedSeg : 'todos os segmentos'} · {ano}</span>
      </div>
      <div className="chart-duo">
        <div className="chart-box" style={{ marginBottom: 0 }}>
          <div className="chart-ttl">{selectedSeg ? `${selectedSeg} — Mensal` : 'Distribuição Mensal (R$)'}</div>
          <div style={{ height: 190 }}><Bar data={barChart} options={chartOpts} /></div>
        </div>
        <div className="chart-box" style={{ marginBottom: 0 }}>
          <div className="chart-ttl">{expandedSeg ? `${expandedSeg} — Por Ativo` : 'Por Segmento'}</div>
          <div style={{ height: 190 }}>
            {dLabels.length > 0 ? (
              <Doughnut data={doughnutChart} options={doughnutOpts} />
            ) : <div className="empty" style={{ padding: 40 }}><p>Sem proventos.</p></div>}
          </div>
        </div>
      </div>
      {/* Proventos table */}
      <div className="tbl-wrap">
        <div className="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}></th>
                {MES.map((m, i) => (
                  <th key={m} className="month-hdr" onClick={() => setDetailMonth(detailMonth === i ? null : i)}>
                    {m}{detailMonth === i ? ' ▾' : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {segNames.map((sg) => {
                const sid = 'pv-' + sg.replace(/\W+/g, '-');
                const isOpen = openSegs[sid];
                const segIdx2 = segNames.indexOf(sg);
                const segColor = PAL[segIdx2 % PAL.length];
                return (
                  <React.Fragment key={sg}>
                    <tr className="seg-hdr" onClick={() => toggleSeg(sg)}>
                      <td colSpan={13} style={{ borderLeft: `3px solid ${segColor}` }}>
                        {isOpen ? '▾' : '▸'} {sg}
                      </td>
                    </tr>
                    {detalhe[sg].map((at) => (
                      <tr key={at.tk} className={isOpen ? '' : 'hide'}>
                        <td className="td-l" style={{ paddingLeft: 28 }}>{at.tk}</td>
                        {at.m.map((m, i) => (
                          <td key={i}>
                            {m.s > 0 ? (
                              <div className="pc">
                                <div className="pu">R$ {m.u}</div>
                                {detailMonth === i && <>
                                  <div className="pe">{m.q} cotas</div>
                                  <div className="pt">{M(m.s)}</div>
                                </>}
                              </div>
                            ) : '—'}
                          </td>
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
