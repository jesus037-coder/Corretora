import React, { useState, useEffect, useCallback } from 'react';
import { M, KpiCard } from '../shared.jsx';
import { fetchMetas, createMeta } from '../api.js';

function fmtTempo(meses) {
  if (!meses || meses <= 0) return '—';
  if (meses > 600) return 'mais de 50 anos';
  const anos = Math.floor(meses / 12), ms = meses % 12;
  let s = '';
  if (anos > 0) s += anos + ' ano' + (anos > 1 ? 's' : '');
  if (anos > 0 && ms > 0) s += ' e ';
  if (ms > 0) s += ms + ' mês' + (ms > 1 ? 'es' : '');
  return s;
}

function calcTempoMeses(atual, alvo, aporte, rent) {
  if (atual >= alvo) return 0;
  if (rent <= 0 && aporte <= 0) return null;
  let saldo = atual, meses = 0;
  while (saldo < alvo && meses < 600) { saldo = saldo * (1 + rent / 100) + aporte; meses++; }
  return meses >= 600 ? null : meses;
}

function MetaCard({ tipo, alvo, totMkt, rendUlt, aporte, rent, gid }) {
  const atual = tipo === 'Renda' ? rendUlt : totMkt;
  const pct = alvo > 0 ? Math.min((atual / alvo) * 100, 999) : 0;
  const pctDisp = Math.min(pct, 100);
  const falta = Math.max(alvo - atual, 0);
  const atingida = alvo > 0 && pct >= 100;
  const tempoMeses = tipo === 'Patrimônio' && alvo > 0 && !atingida ? calcTempoMeses(totMkt, alvo, aporte, rent) : null;

  return (
    <div className={`meta-card${atingida ? ' atingida' : ''}`} data-meta-id={gid}>
      <div className="meta-card-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className="meta-card-tipo">{tipo}</span>
          <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.1rem', color: 'var(--muted)' }}>
            {tipo === 'Renda' ? 'Renda Mensal vs. Meta' : 'Patrimônio vs. Meta'}
          </span>
        </div>
        <span className="meta-card-pct">{alvo > 0 ? pct.toFixed(1) + '%' : '—'}</span>
      </div>
      {atingida && <div className="meta-card-badge-sucesso">🎉 Meta atingida!</div>}
      <div className="meta-bar-bg">
        <div className={`meta-bar-fill${atingida ? ' atingida' : ''}`} style={{ width: (alvo > 0 ? pctDisp : 0) + '%' }} />
      </div>
      <div className="meta-card-vals" style={{ gridTemplateColumns: `repeat(${tipo === 'Patrimônio' ? 4 : 3}, 1fr)` }}>
        <div className="meta-val-item"><span className="meta-val-lbl">{tipo === 'Renda' ? 'Última Renda' : 'Patrimônio Atual'}</span><span className="meta-val-num g">{M(atual)}</span></div>
        <div className="meta-val-item"><span className="meta-val-lbl">Meta</span><span className="meta-val-num">{M(alvo)}</span></div>
        <div className="meta-val-item"><span className="meta-val-lbl">Faltam</span><span className={`meta-val-num${atingida ? ' g' : ' r'}`}>{alvo > 0 ? (atingida ? '✓ Atingida!' : M(falta)) : '—'}</span></div>
        {tipo === 'Patrimônio' && (
          <div className="meta-val-item"><span className="meta-val-lbl">Tempo Estimado</span><span className="meta-val-num" style={{ color: 'var(--accent)' }}>{atingida ? '✓ Atingida!' : (tempoMeses != null ? fmtTempo(tempoMeses) : 'Indeterminado')}</span></div>
        )}
      </div>
      {tipo === 'Patrimônio' && !atingida && aporte >= 0 && (
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '.62rem', color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
          Projeção: aporte de {M(aporte)}/mês · rentabilidade de {rent.toFixed(2)}% a.m.
        </div>
      )}
    </div>
  );
}

export default function MetasTab({ cliente, latest, isDemo }) {
  const [metas, setMetas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [tipo, setTipo] = useState('Patrimônio');
  const [valor, setValor] = useState(0);
  const [aporte, setAporte] = useState(0);
  const [rent, setRent] = useState(1);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [saving, setSaving] = useState(false);

  const loadMetas = useCallback(() => {
    fetchMetas(cliente).then((r) => setMetas(r.metas)).catch(() => {});
  }, [cliente]);

  useEffect(() => { loadMetas(); }, [loadMetas]);

  const save = async () => {
    if (!valor || valor <= 0) { setMsg({ text: 'Informe um valor alvo válido.', type: 'err' }); return; }
    setSaving(true);
    setMsg({ text: '', type: '' });
    try {
      await createMeta({ cliente, tipo, valor, aporte, juros: rent });
      setMsg({ text: '✓ Meta salva com sucesso!', type: 'ok' });
      loadMetas();
      setValor(0); setAporte(0); setRent(1);
    } catch (e) {
      setMsg({ text: e.message, type: 'err' });
    } finally {
      setSaving(false);
    }
  };

  const previewAlvo = valor || 0;
  const showPreview = previewAlvo > 0;

  return (
    <>
      <div className="sec-head" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h3>Metas</h3>
          <span className="tag">{metas.length ? metas.length + ' meta' + (metas.length > 1 ? 's' : '') : 'sem meta'}</span>
        </div>
        <button className={`btn-lancar-meta${showForm ? ' cancelar' : ''}`} onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancelar Lançamento' : '🎯 Lançar Nova Meta'}{isDemo ? ' <span class="demo-tag">DEMO</span>' : ''}
        </button>
      </div>
      {showForm && (
        <div className="meta-form-panel aberto">
          {isDemo && <div className="modal-demo-warning" style={{ display: 'block' }}>⚠️ Versão demo — metas lançadas aqui são apenas simuladas.</div>}
          <div className="meta-form-row">
            <div className="meta-field">
              <label>Tipo de Meta</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="Patrimônio">Patrimônio</option>
                <option value="Renda">Renda Mensal</option>
              </select>
            </div>
            <div className="meta-field">
              <label>Valor Alvo (R$)</label>
              <input type="number" min="0" step="100" value={valor} onChange={(e) => setValor(parseFloat(e.target.value) || 0)} />
              <span className="meta-hint">Defina um valor e clique em salvar</span>
            </div>
          </div>
          <div className="meta-form-row" style={{ display: tipo === 'Patrimônio' ? '' : 'none' }}>
            <div className="meta-field">
              <label>Aporte Mensal (R$)</label>
              <input type="number" min="0" step="100" value={aporte} onChange={(e) => setAporte(parseFloat(e.target.value) || 0)} />
              <span className="meta-hint">Quanto você investe por mês</span>
            </div>
            <div className="meta-field">
              <label>Rentabilidade Mensal Esperada (%)</label>
              <input type="number" min="0" step="0.01" value={rent} onChange={(e) => setRent(parseFloat(e.target.value) || 1)} />
              <span className="meta-hint">Ex: 1.00 para 1% ao mês</span>
            </div>
          </div>
          {showPreview && (
            <div className="meta-draft-wrap">
              <span className="meta-draft-lbl">Pré-visualização</span>
              <MetaCard tipo={tipo} alvo={previewAlvo} totMkt={latest.mercado} rendUlt={latest.rendUlt} aporte={aporte} rent={rent} gid="draft" />
            </div>
          )}
          <button className="btn-salvar-meta" onClick={save} disabled={saving}>{saving ? 'Salvando…' : '💾 Salvar Nova Meta'}</button>
          {msg.text && <div className={`meta-msg ${msg.type}`}>{msg.text}</div>}
        </div>
      )}
      <div className="meta-objetivos">
        {metas.length > 0 ? (
          metas.map((g) => <MetaCard key={g.id} tipo={g.tipo} alvo={parseFloat(g.valor)} totMkt={latest.mercado} rendUlt={latest.rendUlt} aporte={parseFloat(g.aporte)} rent={parseFloat(g.juros)} gid={g.id} />)
        ) : (
          <div className="meta-empty-card">
            <div style={{ fontSize: '2rem', opacity: .25 }}>🎯</div>
            <p>Nenhuma meta definida ainda.<br />Clique em <strong>Lançar Nova Meta</strong> para começar.</p>
          </div>
        )}
      </div>
    </>
  );
}
