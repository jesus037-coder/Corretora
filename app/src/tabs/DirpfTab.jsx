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

function ItemLinha({ texto }) {
  return (
    <div style={{ padding: '14px 18px', borderBottom: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.6 }}>{texto}</div>
        <CopyButton text={texto} />
      </div>
    </div>
  );
}

function GrupoRetratil({ header, itens, itemValorKey, cor, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  return (
    <div style={{ marginBottom: 8, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '12px 16px', background: 'var(--panel)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, userSelect: 'none' }}
      >
        <span style={{ fontSize: '.7rem', transition: 'transform .15s', transform: open ? 'rotate(90deg)' : 'none', color: 'var(--muted)' }}>▶</span>
        {header}
      </div>
      {open && itens.map((it, ii) => (
        <div key={ii} style={{ borderTop: '1px solid var(--border)' }}>
          <div style={{ padding: '10px 18px 0', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {pill(it.tk, cor)}
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>CNPJ {it.cnpj}</span>
            <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 14 }}>{M(it[itemValorKey])}</span>
          </div>
          <ItemLinha texto={it.texto} />
        </div>
      ))}
    </div>
  );
}

function SecaoDirpf({ cor, titulo, total, children, emptyMsg }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="chart-box" style={{ marginBottom: 20 }}>
      <div
        onClick={() => setOpen(o => !o)}
        className="chart-ttl"
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', fontSize: '1.05rem', fontWeight: 700, borderBottom: open ? '2px solid ' + cor + '44' : 'none', paddingBottom: 12 }}
      >
        <span style={{ fontSize: '.75rem', transition: 'transform .15s', transform: open ? 'rotate(90deg)' : 'none', color: 'var(--muted)' }}>▶</span>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: cor, boxShadow: `0 0 6px ${cor}88` }} />
        {titulo}
        <span style={{ marginLeft: 'auto', fontSize: '.9rem', color: cor, fontWeight: 700 }}>{M(total)}</span>
      </div>
      {open && (children || <div className="empty" style={{ padding: 30 }}><p>{emptyMsg}</p></div>)}
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
      <SecaoDirpf cor={corBens} titulo="Bens e Direitos" total={data.totais.bens} emptyMsg={`Nenhum bem encontrado para ${ano}.`}>
        {data.bens.length > 0 && data.bens.map((grupo, gi) => (
          <GrupoRetratil
            key={gi}
            cor={corBens}
            itemValorKey="custo"
            header={`Grupo ${grupo.grupo} · Código ${grupo.codigo} — ${grupo.label}`}
            itens={grupo.itens}
          />
        ))}
      </SecaoDirpf>

      {/* Rendimentos Isentos */}
      <SecaoDirpf cor={corIsento} titulo="Rendimentos Isentos" total={data.totais.isentos} emptyMsg="Nenhum rendimento isento encontrado.">
        {data.rendimentos.isentos.length > 0 && data.rendimentos.isentos.map((cat, ci) => (
          <GrupoRetratil
            key={ci}
            cor={corIsento}
            itemValorKey="valor"
            header={`Código ${cat.label.match(/— (.+)/)?.[1] || cat.label}`}
            itens={cat.itens}
          />
        ))}
      </SecaoDirpf>

      {/* Rendimentos Tributação Exclusiva */}
      <SecaoDirpf cor={corExclusiva} titulo="Tributação Exclusiva" total={data.totais.exclusiva} emptyMsg="Nenhum rendimento com tributação exclusiva encontrado.">
        {data.rendimentos.exclusiva.length > 0 && data.rendimentos.exclusiva.map((cat, ci) => (
          <GrupoRetratil
            key={ci}
            cor={corExclusiva}
            itemValorKey="valor"
            header={`Código ${cat.label.match(/— (.+)/)?.[1] || cat.label}`}
            itens={cat.itens}
          />
        ))}
      </SecaoDirpf>
    </>
  );
}
