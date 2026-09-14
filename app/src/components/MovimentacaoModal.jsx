import React, { useState } from 'react';
import { createMovimentacao, updateMovimentacao } from '../api.js';

export default function MovimentacaoModal({ mode, movimentacao, cliente, isAdmin, onClose, onSaved }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState({
    cliente: movimentacao?.cliente || (cliente === '__ZE__' ? '' : cliente) || '',
    ticker: movimentacao?.ticker || '',
    segmento: movimentacao?.segmento || '',
    cv: movimentacao?.cv || 'Compra',
    quantidade: movimentacao?.quantidade || '',
    preco: movimentacao?.preco || '',
    total: movimentacao?.total || '',
    data: movimentacao?.data ? new Date(movimentacao.data).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.ticker || !form.quantidade || !form.data) {
      setError('Ticker, quantidade e data são obrigatórios.');
      return;
    }
    setSaving(true);
    try {
      const qtd = parseFloat(form.quantidade);
      const preco = parseFloat(form.preco) || 0;
      const payload = {
        ticker: form.ticker.toUpperCase(),
        segmento: form.segmento,
        cv: form.cv,
        quantidade: qtd,
        preco,
        total: parseFloat(form.total) || (qtd * preco),
        data: form.data,
      };
      if (!isEdit) payload.cliente = form.cliente || undefined;
      if (isEdit) await updateMovimentacao(movimentacao.id, payload);
      else await createMovimentacao(payload);
      onSaved();
    } catch (err) {
      setError(err.message || 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{isEdit ? 'Editar Lançamento' : 'Novo Lançamento'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {error && <div className="modal-err show">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="modal-grid">
            <div className="modal-field full">
              <label>Cliente</label>
              <input value={form.cliente} onChange={e => set('cliente', e.target.value)} disabled={isEdit || !isAdmin} placeholder={isAdmin ? 'Nome do cliente' : ''} />
            </div>
            <div className="modal-field">
              <label>Ticker</label>
              <input value={form.ticker} onChange={e => set('ticker', e.target.value)} placeholder="Ex: PETR4" />
            </div>
            <div className="modal-field">
              <label>Segmento</label>
              <input value={form.segmento} onChange={e => set('segmento', e.target.value)} placeholder="Ex: Ações" />
            </div>
            <div className="modal-field">
              <label>Operação</label>
              <select value={form.cv} onChange={e => set('cv', e.target.value)}>
                <option value="Compra">Compra</option>
                <option value="Venda">Venda</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Data</label>
              <input type="date" value={form.data} onChange={e => set('data', e.target.value)} />
            </div>
            <div className="modal-field">
              <label>Quantidade</label>
              <input type="number" step="any" value={form.quantidade} onChange={e => set('quantidade', e.target.value)} placeholder="0" />
            </div>
            <div className="modal-field">
              <label>Preço Unit.</label>
              <input type="number" step="any" value={form.preco} onChange={e => set('preco', e.target.value)} placeholder="0,00" />
            </div>
            <div className="modal-field full">
              <label>Total (vazio = Qtd × Preço)</label>
              <input type="number" step="any" value={form.total} onChange={e => set('total', e.target.value)} placeholder="Auto" />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-btn cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="modal-btn save" disabled={saving}>{saving ? 'Salvando…' : 'Salvar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
