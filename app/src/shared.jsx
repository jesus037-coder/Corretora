/* Shared utilities and components used across tabs */

export const MES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
export const PAL = ['#3ddc84', '#4da6ff', '#b388ff', '#f25c5c', '#ffb347', '#40c4ff', '#a5d6a7', '#ef9a9a'];

export function M(v) {
  return (+(v) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

export function KpiCard({ label, value, hint, bad, valCls }) {
  return (
    <div className={`kpi anim${bad ? ' bad' : ''}`}>
      <div className="kpi-lbl">{label}</div>
      <div className={`kpi-val val${valCls ? ' ' + valCls : ''}`}>{value}</div>
      {hint && <div className="kpi-hint val">{hint}</div>}
    </div>
  );
}
