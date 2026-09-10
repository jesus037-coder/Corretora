import React, { useState, useEffect } from 'react';
import { M } from '../shared.jsx';
import { fetchDirpf } from '../api.js';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button className="copy-ghost" onClick={copy}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M2 8V2a1 1 0 0 1 1-1h6" stroke="currentColor" strokeWidth="1.2" /></svg>
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  );
}

function pill(texto, cor) {
  return <span style={{ background: cor + '1a', color: cor, fontWeight: 700, fontSize: 11, letterSpacing: '.3px', padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{texto}</span>;
}

function ItemLinha({ header, texto, valor, isLast, cor }) {
  return (
    <div style={{ padding: '14px 18px', borderBottom: isLast ? 'none' : '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>{header}</div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.6 }}>{texto}</div>
        <CopyButton text={texto} />
      </div>
    </div>
  );
}

export default function DirpfTab({ ano, cliente, theme }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cliente || ano === 'TODOS') return;
    setLoading(true);
    setError('');
    fetchDirpf(ano, cliente).then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [ano, cliente]);

  if (ano === 'TODOS') return <div className="empty"><div className="ico">📋</div><p>Selecione um ano específico para gerar a declaração de IR.</p></div>;
  if (loading) return <div className="empty"><div className="ico">⏳</div><p>Gerando declaração…</p></div>;
  if (error) return <div className="empty"><div className="ico">⚠️</div><p>{error}</p></div>;
  if (!data) return null;

  const corBens = '#3ddc84';
  const corExclusiva = '#e8a54c';
  const corIsento = '#3ddc84';

  return (
    <>
      <div className="sec-head"><h3>DIRPF — Declaração de Imposto de Renda {ano}</h3><span className="tag">passo a passo</span></div>

      {/* Bens e Direitos */}
      <div className="chart-box" style={{ marginBottom: 20 }}>
        <div className="chart-ttl" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: corBens }} />
          Bens e Direitos — Total: {M(data.totais.bens)}
        </div>
        {data.bens.map((grupo, gi) => (
          <div key={gi} style={{ marginBottom: 16, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: 'var(--panel)', fontWeight: 600, fontSize: '.85rem' }}>
              Grupo {grupo.grupo} · Código {grupo.codigo} — {grupo.label}
            </div>
            {grupo.itens.map((it, ii) => (
              <ItemLinha
                key={ii}
                isLast={ii === grupo.itens.length - 1}
                cor={corBens}
                header={<>{pill(it.tk, corBens)}<span style={{ fontSize: 12, color: 'var(--muted)' }}>CNPJ {it.cnpj}</span><span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 14 }}>{M(it.custo)}</span></>}
                texto={it.texto}
              />
            ))}
          </div>
        ))}
        {data.bens.length === 0 && <div className="empty" style={{ padding: 30 }}><p>Nenhum bem encontrado para {ano}.</p></div>}
      </div>

      {/* Rendimentos Isentos */}
      <div className="chart-box" style={{ marginBottom: 20 }}>
        <div className="chart-ttl" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: corIsento }} />
          Rendimentos Isentos — Total: {M(data.totais.isentos)}
        </div>
        {data.rendimentos.isentos.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 16, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: 'var(--panel)', fontWeight: 600, fontSize: '.85rem' }}>
              Código {cat.label.match(/— (.+)/)?.[1] || cat.label}
            </div>
            {cat.itens.map((it, ii) => (
              <ItemLinha
                key={ii}
                isLast={ii === cat.itens.length - 1}
                cor={corIsento}
                header={<>{pill(it.tk, corIsento)}<span style={{ fontSize: 12, color: 'var(--muted)' }}>CNPJ {it.cnpj}</span><span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 14 }}>{M(it.valor)}</span></>}
                texto={it.texto}
              />
            ))}
          </div>
        ))}
        {data.rendimentos.isentos.length === 0 && <div className="empty" style={{ padding: 30 }}><p>Nenhum rendimento isento encontrado.</p></div>}
      </div>

      {/* Rendimentos Tributação Exclusiva */}
      <div className="chart-box" style={{ marginBottom: 20 }}>
        <div className="chart-ttl" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: corExclusiva }} />
          Tributação Exclusiva — Total: {M(data.totais.exclusiva)}
        </div>
        {data.rendimentos.exclusiva.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 16, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: 'var(--panel)', fontWeight: 600, fontSize: '.85rem' }}>
              Código {cat.label.match(/— (.+)/)?.[1] || cat.label}
            </div>
            {cat.itens.map((it, ii) => (
              <ItemLinha
                key={ii}
                isLast={ii === cat.itens.length - 1}
                cor={corExclusiva}
                header={<>{pill(it.tk, corExclusiva)}<span style={{ fontSize: 12, color: 'var(--muted)' }}>CNPJ {it.cnpj}</span><span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 14 }}>{M(it.valor)}</span></>}
                texto={it.texto}
              />
            ))}
          </div>
        ))}
        {data.rendimentos.exclusiva.length === 0 && <div className="empty" style={{ padding: 30 }}><p>Nenhum rendimento com tributação exclusiva encontrado.</p></div>}
      </div>
    </>
  );
}
