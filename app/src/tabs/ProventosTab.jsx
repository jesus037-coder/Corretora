import React, { useState, useMemo, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { MES, M, PAL, KpiCard } from '../shared.jsx';
import ProventosDetalhe from '../components/ProventosDetalhe.jsx';
import { fetchProventosDetalhe } from '../api.js';

export default function ProventosTab({ data, ano, chartColors, cliente }) {
  const { gc, tc } = chartColors;
  const kpis = data?.kpis || {};
  const provLabels = data?.proventosMensais?.labels || MES;
  const provData = data?.proventosMensais?.data || Array(provLabels.length).fill(0);
  const provSeg = data?.proventosPorSegmento || { labels: [], data: [] };
  const detalhe = data?.proventosDetalhe || {};
  const segNames = Object.keys(detalhe);
  const nMonths = provLabels.length;
  const isTodos = ano === 0;
  const [viewMode, setViewMode] = useState('meses');

  const [selectedSeg, setSelectedSeg] = useState(null);
  const [openSegs, setOpenSegs] = useState({});
  const [detailMonth, setDetailMonth] = useState(null);

  // Fetch detailed proventos for received/pending chart coloring
  const [provDetalhe, setProvDetalhe] = useState(null);
  useEffect(() => {
    fetchProventosDetalhe(ano, cliente)
      .then(setProvDetalhe)
      .catch(() => setProvDetalhe(null));
  }, [ano, cliente]);

  // KPIs
  const hoje = new Date();
  const mesAtual = isTodos ? nMonths - 1 : (ano < hoje.getFullYear() ? nMonths - 1 : hoje.getMonth());
  let provUltMes = 0, mesUlt = mesAtual;
  for (let i = mesAtual; i >= 0; i--) { if (provData[i] > 0) { provUltMes = provData[i]; mesUlt = i; break; } }
  const dyUltMes = kpis.valorMercado > 0 ? (provUltMes / kpis.valorMercado) * 100 : 0;
  const dyAno = kpis.valorMercado > 0 ? (kpis.proventos / kpis.valorMercado) * 100 : 0;
  const roi = kpis.valorAplicado > 0 ? (kpis.lpT / kpis.valorAplicado) * 100 : 0;
  const periodoLabel = isTodos ? 'Todos' : ano;

  // Monthly proventos per segment
  const segMensal = useMemo(() => {
    const map = {};
    for (const sg of segNames) {
      const monthly = Array(nMonths).fill(0);
      detalhe[sg].forEach(at => at.m.forEach((m, i) => { monthly[i] = Math.round((monthly[i] + m.s) * 100) / 100; }));
      map[sg] = monthly;
    }
    return map;
  }, [detalhe, segNames, nMonths]);

  // Per-ativo totals within a segment
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

  // Yearly table data for "Todos"
  const yearlyData = useMemo(() => {
    if (!isTodos) return null;
    const years = [...new Set(provLabels.map(l => {
      const parts = l.split('/');
      return parts.length === 2 ? 2000 + parseInt(parts[1]) : null;
    }).filter(Boolean))].sort();

    const segYearly = {};
    for (const sg of segNames) {
      segYearly[sg] = detalhe[sg].map(at => {
        const yearly = years.map(() => 0);
        at.m.forEach((m, i) => {
          const parts = provLabels[i].split('/');
          if (parts.length !== 2) return;
          const yi = years.indexOf(2000 + parseInt(parts[1]));
          if (yi >= 0) yearly[yi] = Math.round((yearly[yi] + m.s) * 100) / 100;
        });
        return { tk: at.tk, yearly, total: Math.round(yearly.reduce((s, v) => s + v, 0) * 100) / 100 };
      }).filter(a => a.total > 0);
    }

    const yearTotals = years.map(() => 0);
    for (const sg of segNames) {
      for (const at of segYearly[sg]) {
        at.yearly.forEach((v, yi) => { yearTotals[yi] = Math.round((yearTotals[yi] + v) * 100) / 100; });
      }
    }
    const grandTotal = Math.round(yearTotals.reduce((s, v) => s + v, 0) * 100) / 100;
    return { years, segYearly, yearTotals, grandTotal };
  }, [isTodos, provLabels, detalhe, segNames]);

  // Parse labels for year/month info (for chart view modes)
  const provInfo = isTodos ? provLabels.map(l => {
    const parts = l.split('/');
    if (parts.length === 2) return { year: 2000 + parseInt(parts[1]), month: MES.indexOf(parts[0]) };
    return null;
  }) : null;

  // Compute received/pending per month and year for chart coloring
  const barStatusMap = useMemo(() => {
    if (!provDetalhe?.proventos) return null;
    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999);
    let provs = provDetalhe.proventos;
    if (selectedSeg) provs = provs.filter(p => p.segmento === selectedSeg);

    const monthMap = {}, yearMap = {};
    provs.forEach(p => {
      const isReceived = p.data_pag && new Date(p.data_pag + 'T23:59:59') <= hoje;
      const mk = p.anoRef + '-' + p.mes;
      if (!monthMap[mk]) monthMap[mk] = { received: 0, pending: 0 };
      if (!yearMap[p.anoRef]) yearMap[p.anoRef] = { received: 0, pending: 0 };
      if (isReceived) {
        monthMap[mk].received = Math.round((monthMap[mk].received + p.valor_total) * 100) / 100;
        yearMap[p.anoRef].received = Math.round((yearMap[p.anoRef].received + p.valor_total) * 100) / 100;
      } else {
        monthMap[mk].pending = Math.round((monthMap[mk].pending + p.valor_total) * 100) / 100;
        yearMap[p.anoRef].pending = Math.round((yearMap[p.anoRef].pending + p.valor_total) * 100) / 100;
      }
    });
    return { monthMap, yearMap };
  }, [provDetalhe, selectedSeg]);

  // Bar chart: selected segment or total, with view mode
  const segIdx = selectedSeg ? segNames.indexOf(selectedSeg) : -1;
  const barColor = segIdx >= 0 ? PAL[segIdx % PAL.length] : null;
  const rawBarData = selectedSeg ? (segMensal[selectedSeg] || Array(nMonths).fill(0)) : provData;

  let barLabels, barDatasets;
  if (isTodos && viewMode === 'anos') {
    const years = [...new Set(provInfo.filter(Boolean).map(e => e.year))].sort();
    barLabels = years.map(String);
    const anosData = years.map(yr => Math.round(provInfo.reduce((s, e, i) => e && e.year === yr ? s + rawBarData[i] : s, 0) * 100) / 100);
    barDatasets = [{ label: selectedSeg || 'Proventos', data: anosData, backgroundColor: barColor ? barColor + 'aa' : 'rgba(61,220,132,.65)', borderRadius: 4 }];
  } else if (isTodos && viewMode === 'ano') {
    barLabels = MES;
    const years = [...new Set(provInfo.filter(Boolean).map(e => e.year))].sort();
    barDatasets = years.map((yr, yi) => {
      const color = PAL[yi % PAL.length];
      const monthlyData = Array(12).fill(0);
      provInfo.forEach((e, i) => {
        if (e && e.year === yr) monthlyData[e.month] = Math.round((monthlyData[e.month] + rawBarData[i]) * 100) / 100;
      });
      return { label: String(yr), data: monthlyData, backgroundColor: color + 'aa', borderRadius: 4 };
    });
  } else {
    barLabels = provLabels;
    barDatasets = [{ label: selectedSeg || 'Proventos', data: rawBarData, backgroundColor: barColor ? barColor + 'aa' : 'rgba(61,220,132,.65)', borderRadius: 4 }];
  }

  const barChart = { labels: barLabels, datasets: barDatasets };

  // Apply received/pending coloring to bars
  if (barStatusMap) {
    barDatasets.forEach((ds, dsIdx) => {
      const baseColor = (isTodos && viewMode === 'ano') ? PAL[dsIdx % PAL.length] : (barColor || '#3ddc84');
      ds.backgroundColor = ds.data.map((val, i) => {
        if (!val) return 'transparent';
        let s;
        if (isTodos && viewMode === 'ano') {
          const yr = parseInt(ds.label);
          s = barStatusMap.monthMap[yr + '-' + i] || { received: 0, pending: 0 };
        } else if (isTodos && viewMode === 'anos') {
          const years = [...new Set(provInfo.filter(Boolean).map(e => e.year))].sort();
          s = barStatusMap.yearMap[years[i]] || { received: 0, pending: 0 };
        } else if (isTodos) {
          const info = provInfo[i];
          s = info ? (barStatusMap.monthMap[info.year + '-' + info.month] || { received: 0, pending: 0 }) : { received: 0, pending: 0 };
        } else {
          s = barStatusMap.monthMap[ano + '-' + i] || { received: 0, pending: 0 };
        }
        if (s.received === 0 && s.pending === 0) return baseColor + 'aa';
        if (s.pending === 0) return baseColor + 'cc';
        if (s.received === 0) return baseColor + '33';
        return baseColor + '66';
      });
    });
  }

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

  const showLegend = isTodos && viewMode === 'ano';
  const chartOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: showLegend, labels: { color: tc, font: { size: 11 } } }, tooltip: { callbacks: { label: (c) => {
      if (!barStatusMap) return M(c.parsed.y ?? c.parsed);
      const i = c.dataIndex;
      let s;
      if (isTodos && viewMode === 'ano') {
        const yr = parseInt(c.dataset.label);
        s = barStatusMap.monthMap[yr + '-' + i] || { received: 0, pending: 0 };
      } else if (isTodos && viewMode === 'anos') {
        const years = [...new Set(provInfo.filter(Boolean).map(e => e.year))].sort();
        s = barStatusMap.yearMap[years[i]] || { received: 0, pending: 0 };
      } else if (isTodos) {
        const info = provInfo[i];
        s = info ? (barStatusMap.monthMap[info.year + '-' + info.month] || { received: 0, pending: 0 }) : { received: 0, pending: 0 };
      } else {
        s = barStatusMap.monthMap[ano + '-' + i] || { received: 0, pending: 0 };
      }
      const total = Math.round((s.received + s.pending) * 100) / 100;
      return [`Recebido: ${M(s.received)}`, `A Receber: ${M(s.pending)}`, `Total: ${M(total)}`];
    } } } },
    scales: { x: { grid: { color: gc }, ticks: { color: tc, font: { size: (!isTodos || viewMode === 'meses') && nMonths > 12 ? 9 : 11 } } }, y: { grid: { color: gc }, ticks: { color: tc, callback: (v) => M(v) } } },
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
        <KpiCard label={`Proventos ${provLabels[mesUlt] || ''}`} value={M(provUltMes)} hint="último mês com rendimento" valCls="g" />
        <KpiCard label={`Proventos ${periodoLabel}`} value={M(kpis.proventos)} hint={isTodos ? "acumulado total" : "acumulado no ano"} valCls="g" />
        <KpiCard label={`DY Mês (${provLabels[mesUlt] || ''})`} value={dyUltMes.toFixed(2) + '%'} hint="dividend yield mensal" valCls={dyUltMes > 0 ? 'g' : ''} />
        <KpiCard label={`DY ${periodoLabel}`} value={dyAno.toFixed(2) + '%'} hint={isTodos ? "dividend yield total" : "dividend yield anual"} valCls={dyAno > 0 ? 'g' : ''} />
        <KpiCard label="ROI Carteira" value={roi.toFixed(2) + '%'} hint={M(kpis.lpT)} bad={roi < 0} valCls={roi >= 0 ? 'g' : 'r'} />
      </div>
      <div className="sec-head">
        <h3>Proventos Recebidos</h3>
        <span className="tag">{selectedSeg ? selectedSeg : 'todos os segmentos'} · {periodoLabel}</span>
        {isTodos && (
          <div className="view-toggle" style={{ marginLeft: 'auto' }}>
            <button className={viewMode === 'meses' ? 'on' : ''} onClick={() => setViewMode('meses')}>Meses</button>
            <button className={viewMode === 'anos' ? 'on' : ''} onClick={() => setViewMode('anos')}>Anos</button>
            <button className={viewMode === 'ano' ? 'on' : ''} onClick={() => setViewMode('ano')}>Por ano</button>
          </div>
        )}
      </div>
      <div className="chart-duo">
        <div className="chart-box" style={{ marginBottom: 0 }}>
          <div className="chart-ttl">{selectedSeg ? `${selectedSeg} — Mensal` : 'Distribuição Mensal (R$)'} <span className="bar-legend"><span className="bl-recebido">■</span> Recebido <span className="bl-pendente">▢</span> A Receber</span></div>
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
            {isTodos && yearlyData ? (
              <>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}></th>
                    {yearlyData.years.map(yr => <th key={yr}>{yr}</th>)}
                    <th className="total-col">Total</th>
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
                          <td colSpan={yearlyData.years.length + 2} style={{ borderLeft: `3px solid ${segColor}` }}>
                            {isOpen ? '▾' : '▸'} {sg}
                          </td>
                        </tr>
                        {yearlyData.segYearly[sg].map((at) => (
                          <tr key={at.tk} className={isOpen ? '' : 'hide'}>
                            <td className="td-l" style={{ paddingLeft: 28 }}>{at.tk}</td>
                            {at.yearly.map((v, yi) => <td key={yi}>{v > 0 ? M(v) : '—'}</td>)}
                            <td className="total-col">{M(at.total)}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="td-l">TOTAL</td>
                    {yearlyData.yearTotals.map((t, i) => <td key={i}>{M(t)}</td>)}
                    <td className="total-col">{M(yearlyData.grandTotal)}</td>
                  </tr>
                </tfoot>
              </>
            ) : (
              <>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}></th>
                    {provLabels.map((m, i) => (
                      <th key={i} className="month-hdr" onClick={() => setDetailMonth(detailMonth === i ? null : i)}>
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
                          <td colSpan={nMonths + 1} style={{ borderLeft: `3px solid ${segColor}` }}>
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
              </>
            )}
          </table>
        </div>
      </div>
      <ProventosDetalhe ano={ano} cliente={cliente} prefetched={provDetalhe} />
    </>
  );
}
