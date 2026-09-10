import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { M, PAL, KpiCard } from '../shared.jsx';

const COLS = [
  { key: 'ticker',   label: 'Ativo',       type: 'text' },
  { key: 'qtd',      label: 'QTD',         type: 'num'  },
  { key: 'pm',       label: 'PM',          type: 'num'  },
  { key: 'aplicado', label: 'Vl Aplicado', type: 'num'  },
  { key: 'preco',    label: 'Preço',       type: 'num',  colored: true },
  { key: 'variacao', label: 'VAR%',       type: 'var'  },
  { key: 'lp',       label: 'L/P',         type: 'num'  },
  { key: 'pctCart',  label: '% Cart.',    type: 'num'  },
  { key: 'ideal',    label: 'Ideal',       type: 'num'  },
];

function sortVal(a, col) {
  if (col === 'variacao') return parseFloat(String(a.variacao || '0').replace(/[^\d.-]/g, '')) || 0;
  if (col === 'pctCart')  return a.pctCart;
  return a[col];
}

function SegmentCard({ seg, idx, totMkt, evolLabels, evolSegData, chartColors }) {
  const [open, setOpen] = useState(false);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const color = PAL[idx % PAL.length];
  const { gc, tc } = chartColors;

  const sortedAtivos = useMemo(() => {
    const withPct = seg.ativos.map(a => ({ ...a, pctCart: totMkt > 0 ? (a.mercado / totMkt) * 100 : 0 }));
    if (!sortCol) return withPct;
    return [...withPct].sort((a, b) => {
      const va = sortVal(a, sortCol), vb = sortVal(b, sortCol);
      if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortDir === 'asc' ? va - vb : vb - va;
    });
  }, [seg.ativos, sortCol, sortDir, totMkt]);

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const segEvol = evolSegData?.[seg.nome] || [];
  const evolChart = {
    labels: evolLabels || [],
    datasets: [{
      label: seg.nome, data: segEvol,
      borderColor: color, backgroundColor: color + '15',
      fill: true, tension: 0.35, pointRadius: 3, pointBackgroundColor: color, borderWidth: 2,
    }],
  };

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
          <div className="sc-chart" style={{ height: 150, marginBottom: 14 }}>
            <div className="chart-ttl" style={{ marginBottom: 6, fontSize: '.72rem' }}>Evolução — {seg.nome}</div>
            <Line data={evolChart} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => M(c.parsed.y) } } },
              scales: { x: { grid: { color: gc }, ticks: { color: tc, font: { size: 9 } } }, y: { grid: { color: gc }, ticks: { color: tc, font: { size: 9 }, callback: (v) => M(v) } } },
            }} />
          </div>
          <div className="sc-tbl-wrap">
            <table className="sc-tbl">
              <thead>
                <tr>
                  {COLS.map(c => (
                    <th key={c.key} onClick={() => toggleSort(c.key)} className={`th-sort${sortCol === c.key ? ' sort-active' : ''}`}>
                      {c.label}<span className="sort-ico">{sortCol === c.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedAtivos.map(a => {
                  const varNum = parseFloat(String(a.variacao || '0').replace(/[^\d.-]/g, '')) || 0;
                  return (
                    <tr key={a.ticker}>
                      <td className="td-l">{a.ticker}</td>
                      <td>{a.qtd}</td>
                      <td>{M(a.pm)}</td>
                      <td>{M(a.aplicado)}</td>
                      <td style={{ color, fontWeight: 600 }}>{M(a.preco)}</td>
                      <td className={varNum >= 0 ? 'g' : 'r'}>{a.variacao || '—'}</td>
                      <td className={a.lp >= 0 ? 'g' : 'r'}>{M(a.lp)}</td>
                      <td>{a.pctCart.toFixed(1)}%</td>
                      <td>{a.ideal > 0 ? M(a.ideal) : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CarteiraTab({ data, ano, chartColors }) {
  const { gc, tc } = chartColors;
  const kpis = data?.kpis || {};
  const totMkt = kpis.valorMercado || 0;

  const evolChart = {
    labels: data?.evolucao?.labels || [],
    datasets: [{
      label: 'Patrimônio Total', data: data?.evolucao?.data || [],
      borderColor: '#3ddc84', backgroundColor: 'rgba(61,220,132,.07)',
      fill: true, tension: 0.35, pointRadius: 4, pointBackgroundColor: '#3ddc84', borderWidth: 2,
    }],
  };

  const chartOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => M(c.parsed.y) } } },
    scales: { x: { grid: { color: gc }, ticks: { color: tc } }, y: { grid: { color: gc }, ticks: { color: tc, callback: (v) => M(v) } } },
  };

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
        <div style={{ height: 220 }}><Line data={evolChart} options={chartOpts} /></div>
      </div>
      <div className="sec-head"><h3>Consolidação de Carteira</h3><span className="tag">{data?.nAtivos || 0} ativos · {data?.nSegmentos || 0} segmentos</span></div>
      <div className="seg-stack">
        {(data?.segmentos || []).map((seg, i) => (
          <SegmentCard key={seg.nome} seg={seg} idx={i} totMkt={totMkt}
            evolLabels={data?.evolucaoPorSegmento?.labels}
            evolSegData={data?.evolucaoPorSegmento?.data}
            chartColors={chartColors} />
        ))}
      </div>
    </>
  );
}
