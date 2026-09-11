import React, { useState, useMemo, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { M } from '../shared.jsx';

export default function CalculadoraTab({ latest, chartColors }) {
  const { gc, tc } = chartColors;
  const [capital, setCapital] = useState(Math.round((latest?.mercado || 0) * 100) / 100);
  const [aporte, setAporte] = useState(0);
  const [taxa, setTaxa] = useState(Math.round((latest?.dy || 0) * 100) / 100);
  const [meses, setMeses] = useState(120);
  const [tipoTaxa, setTipoTaxa] = useState('anual');

  useEffect(() => {
    setCapital(Math.round((latest?.mercado || 0) * 100) / 100);
    setTaxa(Math.round((latest?.dy || 0) * 100) / 100);
  }, [latest?.mercado, latest?.dy]);

  const calc = useMemo(() => {
    const tMes = tipoTaxa === 'anual' ? Math.pow(1 + taxa / 100, 1 / 12) - 1 : taxa / 100;
    const tAnual = (Math.pow(1 + tMes, 12) - 1) * 100;
    let saldo = capital, totalAportado = capital, totalJuros = 0;
    const tblAnos = [];
    let jurosAno = 0, aporteAno = 0;

    for (let i = 1; i <= meses; i++) {
      const juros = saldo * tMes;
      totalJuros += juros; jurosAno += juros;
      saldo = saldo + juros + aporte;
      if (i > 1) { totalAportado += aporte; aporteAno += aporte; }
      if (i % 12 === 0 || i === meses) {
        tblAnos.push({ ano: Math.ceil(i / 12), mes: i, saldo, totalAportado, jurosAno, aporteAno, rendaMes: saldo * tMes });
        jurosAno = 0; aporteAno = 0;
      }
    }

    const totalFinal = saldo;
    const rendaMensalFinal = totalFinal * tMes;
    const retorno = totalAportado > 0 ? (totalFinal / totalAportado - 1) * 100 : 0;
    const multiplicador = totalAportado > 0 ? totalFinal / totalAportado : 1;

    // Chart data
    const lbls = [], vSaldo = [], vAport = [], vJuros = [];
    let s = capital, ta = capital, tj = 0;
    const step = Math.max(1, Math.round(meses / 36));
    for (let i = 1; i <= meses; i++) {
      const j = s * tMes; tj += j; s = s + j + aporte;
      if (i > 1) ta += aporte;
      if (i % step === 0 || i === meses) { lbls.push(i >= 12 ? Math.round(i / 12) + 'a' : i + 'm'); vSaldo.push(+s.toFixed(2)); vAport.push(+ta.toFixed(2)); vJuros.push(+tj.toFixed(2)); }
    }

    return { tMes, tAnual, totalFinal, totalAportado, totalJuros, rendaMensalFinal, retorno, multiplicador, tblAnos, chartData: { lbls, vSaldo, vAport, vJuros } };
  }, [capital, aporte, taxa, meses, tipoTaxa]);

  const semDados = capital === 0 && aporte === 0;
  const equiv = tipoTaxa === 'anual' ? `≈ ${(calc.tMes * 100).toFixed(4)}% a.m.` : `≈ ${calc.tAnual.toFixed(2)}% a.a.`;
  const anosH = Math.floor(meses / 12), mR = meses % 12;

  const chartData = {
    labels: calc.chartData.lbls,
    datasets: [
      { label: 'Montante', data: calc.chartData.vSaldo, borderColor: '#3ddc84', backgroundColor: 'rgba(61,220,132,.08)', fill: true, tension: .35, pointRadius: 0, borderWidth: 2.5 },
      { label: 'Total Investido', data: calc.chartData.vAport, borderColor: '#4da6ff', backgroundColor: 'rgba(77,166,255,.05)', fill: true, tension: .35, pointRadius: 0, borderWidth: 1.5, borderDash: [5, 4] },
      { label: 'Juros Acumulados', data: calc.chartData.vJuros, borderColor: '#ffb347', fill: false, tension: .35, pointRadius: 0, borderWidth: 1.5, borderDash: [2, 4] },
    ],
  };

  return (
    <>
      <div className="sec-head"><h3>Calculadora de Juros Compostos</h3><span className="tag">independente do ano selecionado</span></div>
      <div className="calc-wrap">
        <div className="calc-card open">
          <div className="calc-card-head">
            <div className="calc-card-title"><span style={{ color: 'var(--accent)' }}>⚙</span><span>Parâmetros da Simulação</span></div>
            <svg className="calc-card-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="calc-card-body" style={{ maxHeight: 600 }}>
            <div className="calc-card-inner">
              <div className="calc-field">
                <label>Capital Inicial (R$)</label>
                <input type="number" min="0" value={capital} onChange={(e) => setCapital(parseFloat(e.target.value) || 0)} />
                {latest?.mercado > 0 && <span className="calc-hint">Carteira atual real: {M(latest.mercado)}</span>}
              </div>
              <div className="calc-field">
                <label>Aporte Mensal (R$)</label>
                <input type="number" min="0" value={aporte} onChange={(e) => setAporte(parseFloat(e.target.value) || 0)} />
              </div>
              <div className="calc-field">
                <label>Taxa de Juros (%)</label>
                <input type="number" min="0" step="0.01" value={taxa} onChange={(e) => setTaxa(parseFloat(e.target.value) || 0)} />
                {latest?.dy > 0 && <span className="calc-hint">DY {latest?.dyLabel || 'mês atual'} real: {latest.dy.toFixed(2)}%</span>}
              </div>
              <div className="calc-field">
                <label>Período (meses)</label>
                <input type="number" min="1" value={meses} onChange={(e) => setMeses(parseInt(e.target.value) || 0)} />
                <span className="calc-hint">{anosH > 0 ? anosH + ' ano' + (anosH > 1 ? 's' : '') + (mR > 0 ? ' e ' + mR + 'm' : '') : mR + 'm'}</span>
              </div>
              <div className="calc-toggle-row">
                <label>Tipo de taxa</label>
                <div className="calc-toggle">
                  <button className={tipoTaxa === 'mensal' ? 'on' : ''} onClick={() => setTipoTaxa('mensal')}>Mensal</button>
                  <button className={tipoTaxa === 'anual' ? 'on' : ''} onClick={() => setTipoTaxa('anual')}>Anual</button>
                </div>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.65rem', color: 'var(--muted)' }}>{equiv}</span>
              </div>
            </div>
          </div>
        </div>

        {!semDados && (
          <>
            <div className="calc-kpi-grid">
              <div className="calc-kpi hi"><div className="calc-kpi-lbl">Montante Final</div><div className="calc-kpi-val g">{M(calc.totalFinal)}</div></div>
              <div className="calc-kpi"><div className="calc-kpi-lbl">Total Investido</div><div className="calc-kpi-val">{M(calc.totalAportado)}</div><div className="calc-kpi-sub">capital + aportes</div></div>
              <div className="calc-kpi"><div className="calc-kpi-lbl">Juros Acumulados</div><div className="calc-kpi-val">{M(calc.totalJuros)}</div><div className="calc-kpi-sub">dinheiro trabalhando</div></div>
              <div className="calc-kpi"><div className="calc-kpi-lbl">Renda Mensal Final</div><div className="calc-kpi-val">{M(calc.rendaMensalFinal)}</div><div className="calc-kpi-sub">no {meses}° mês</div></div>
              <div className="calc-kpi"><div className="calc-kpi-lbl">Taxa Anual Equiv.</div><div className="calc-kpi-val">{calc.tAnual.toFixed(2)}%</div><div className="calc-kpi-sub">juros sobre juros</div></div>
              <div className="calc-kpi"><div className="calc-kpi-lbl">Multiplicador</div><div className="calc-kpi-val">{calc.multiplicador.toFixed(2)}×</div><div className="calc-kpi-sub">{calc.retorno.toFixed(1)}% de retorno</div></div>
            </div>
            <div className="chart-box">
              <div className="chart-ttl">Evolução Patrimonial Projetada</div>
              <div style={{ height: 260 }}>
                <Line data={chartData} options={{
                  responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { labels: { color: tc, font: { size: 11 }, boxWidth: 14 } }, tooltip: { callbacks: { label: (ct) => ct.dataset.label + ': ' + M(ct.parsed.y) } } },
                  scales: { x: { grid: { color: gc }, ticks: { color: tc, maxTicksLimit: 14 } }, y: { grid: { color: gc }, ticks: { color: tc, callback: (v) => M(v) } } },
                }} />
              </div>
            </div>
            <div className="chart-box">
              <div className="chart-ttl">Projeção Ano a Ano</div>
              <div className="calc-tbl-wrap">
                <table className="calc-tbl">
                  <thead><tr><th>Ano</th><th>Mês</th><th>Aportes no Ano</th><th>Juros no Ano</th><th>Total Investido</th><th>Montante</th><th>Renda Mensal</th></tr></thead>
                  <tbody>
                    {calc.tblAnos.map((r, i) => (
                      <tr key={i}><td>{r.ano}°</td><td>{r.mes}</td><td>{M(r.aporteAno)}</td><td className="g">{M(r.jurosAno)}</td><td>{M(r.totalAportado)}</td><td style={{ fontWeight: 600 }}>{M(r.saldo)}</td><td className="g">{M(r.rendaMes)}</td></tr>
                    ))}
                  </tbody>
                  <tfoot><tr><td colSpan={2}>TOTAL</td><td>{M(calc.totalAportado - capital)}</td><td>{M(calc.totalJuros)}</td><td>{M(calc.totalAportado)}</td><td>{M(calc.totalFinal)}</td><td>{M(calc.rendaMensalFinal)}</td></tr></tfoot>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
