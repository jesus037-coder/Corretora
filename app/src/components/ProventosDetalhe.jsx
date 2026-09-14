import React, { useState, useMemo, useEffect } from 'react';
import { MES, M } from '../shared.jsx';
import { fetchProventosDetalhe } from '../api.js';

export default function ProventosDetalhe({ ano, cliente, prefetched }) {
  const [provData, setProvData] = useState(prefetched || null);
  const [loading, setLoading] = useState(!prefetched);
  const [filtroMes, setFiltroMes] = useState('todos');
  const [filtroAno, setFiltroAno] = useState('todos');
  const [filtroTicker, setFiltroTicker] = useState('todos');

  const isTodos = ano === 0;

  useEffect(() => {
    if (prefetched) { setProvData(prefetched); setLoading(false); return; }
    setLoading(true);
    fetchProventosDetalhe(ano, cliente)
      .then((r) => setProvData(r))
      .catch(() => setProvData(null))
      .finally(() => setLoading(false));
  }, [ano, cliente, prefetched]);

  // Reset filters when year changes
  useEffect(() => {
    setFiltroMes('todos');
    setFiltroAno('todos');
    setFiltroTicker('todos');
  }, [ano, cliente]);

  const proventos = provData?.proventos || [];
  const mesesDisponiveis = provData?.mesesDisponiveis || [];
  const tickersDisponiveis = provData?.tickersDisponiveis || [];

  // Available years (for "todos os anos" mode)
  const anosDisponiveis = useMemo(() => {
    if (!isTodos) return [];
    return [...new Set(mesesDisponiveis.map(m => m.ano))].sort();
  }, [mesesDisponiveis, isTodos]);

  // Filtered proventos
  const filtrados = useMemo(() => {
    return proventos.filter((p) => {
      if (filtroMes !== 'todos' && p.mes !== parseInt(filtroMes)) return false;
      if (isTodos && filtroAno !== 'todos' && p.anoRef !== parseInt(filtroAno)) return false;
      if (filtroTicker !== 'todos' && p.ticker !== filtroTicker) return false;
      return true;
    });
  }, [proventos, filtroMes, filtroAno, filtroTicker, isTodos]);

  // Default to current month on first load
  useEffect(() => {
    if (proventos.length && filtroMes === 'todos' && filtroTicker === 'todos' && filtroAno === 'todos') {
      const hoje = new Date();
      const temMesAtual = proventos.some(p => p.mes === hoje.getMonth() && (!isTodos || p.anoRef === hoje.getFullYear()));
      if (temMesAtual) {
        setFiltroMes(String(hoje.getMonth()));
        if (isTodos) setFiltroAno(String(hoje.getFullYear()));
      }
    }
  }, [proventos, isTodos, filtroMes, filtroAno, filtroTicker]);

  const totalFiltrado = filtrados.reduce((s, p) => s + p.valor_total, 0);

  const fmtData = (d) => {
    if (!d) return '—';
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('pt-BR');
  };

  return (
    <>
      <div className="sec-head" style={{ marginTop: 24 }}>
        <h3>Proventos a Receber</h3>
        <span className="tag">{filtrados.length} {filtrados.length === 1 ? 'lançamento' : 'lançamentos'} · {M(totalFiltrado)}</span>
      </div>

      {/* Filtros */}
      <div className="prov-filtros">
        {isTodos && (
          <select className="prov-filter-select" value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)}>
            <option value="todos">Todos os anos</option>
            {anosDisponiveis.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        )}
        <select className="prov-filter-select" value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}>
          <option value="todos">Todos os meses</option>
          {isTodos
            ? mesesDisponiveis
                .filter(m => filtroAno === 'todos' || m.ano === parseInt(filtroAno))
                .map((m, i) => <option key={i} value={m.mes}>{MES[m.mes]}/{String(m.ano).slice(2)}</option>)
            : MES.map((m, i) => <option key={i} value={i}>{m}</option>)
          }
        </select>
        <select className="prov-filter-select" value={filtroTicker} onChange={(e) => setFiltroTicker(e.target.value)}>
          <option value="todos">Todos os ativos</option>
          {tickersDisponiveis.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Tabela */}
      <div className="tbl-wrap">
        {loading ? (
          <div className="empty" style={{ padding: 32 }}><p>Carregando…</p></div>
        ) : filtrados.length === 0 ? (
          <div className="empty" style={{ padding: 32 }}><p>Nenhum provento encontrado para o filtro selecionado.</p></div>
        ) : (
          <div className="tbl-scroll">
            <table className="prov-detalhe-tbl">
              <thead>
                <tr>
                  <th className="td-l">Ativo</th>
                  <th>Segmento</th>
                  <th>Tipo</th>
                  <th>Data Com</th>
                  <th>Data Pag</th>
                  <th>Cotas</th>
                  <th>Valor/Cota</th>
                  <th>Receber/Cota</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p, i) => (
                  <tr key={i}>
                    <td className="td-l" style={{ fontWeight: 600 }}>{p.ticker}</td>
                    <td>{p.segmento}</td>
                    <td>{p.tipo || '—'}</td>
                    <td>{fmtData(p.data_com)}</td>
                    <td>{fmtData(p.data_pag)}</td>
                    <td>{p.cotas.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</td>
                    <td>{M(p.valor_cota)}</td>
                    <td>{M(p.valor_receber)}</td>
                    <td className="g" style={{ fontWeight: 600 }}>{M(p.valor_total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="td-l" colSpan={8} style={{ textAlign: 'right' }}>TOTAL</td>
                  <td className="g" style={{ fontWeight: 700 }}>{M(totalFiltrado)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
