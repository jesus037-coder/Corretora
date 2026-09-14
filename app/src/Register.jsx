import React, { useState } from 'react';
import { register } from './api.js';

function maskPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validPhone(v) {
  const d = v.replace(/\D/g, '');
  return d.length === 10 || d.length === 11;
}

export default function Register({ onRegister, onBack }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [autorizacaoWpp, setAutorizacaoWpp] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e?.preventDefault();
    setError('');
    if (!nome.trim()) { setError('Informe seu nome.'); return; }
    if (!sobrenome.trim()) { setError('Informe seu sobrenome.'); return; }
    if (!email.trim()) { setError('Informe seu e-mail.'); return; }
    if (!senha) { setError('Crie uma senha.'); return; }
    if (!validPhone(telefone)) { setError('Telefone inválido. Use DDD + número.'); return; }
    if (!autorizacaoWpp) { setError('É necessário autorizar o contato via WhatsApp.'); return; }
    if (!tipoUsuario) { setError('Selecione como deseja usar a plataforma.'); return; }
    setLoading(true);
    try {
      const { token, user } = await register({
        email, senha, nome: `${nome.trim()} ${sobrenome.trim()}`, telefone,
        autorizacao_whatsapp: autorizacaoWpp,
        tipo_usuario: tipoUsuario,
      });
      onRegister(token, user);
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-screen">
      <div className="login-wrap" style={{ maxWidth: 480 }}>
        <div className="login-logo">
          <h1>Corretora do <em>Zé</em></h1>
          <p>Criar Conta</p>
        </div>
        <form className="login-card" onSubmit={submit}>
          <h2>Cadastro</h2>
          <p className="sub">Preencha os dados para começar</p>
          <div className="field-row" style={{ display: 'flex', gap: 12 }}>
            <div className="field" style={{ flex: 1 }}>
              <label>Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>Sobrenome</label>
              <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} placeholder="Seu sobrenome" />
            </div>
          </div>
          <div className="field">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" autoComplete="email" />
          </div>
          <div className="field">
            <label>Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
          </div>
          <div className="field">
            <label>Telefone (WhatsApp)</label>
            <input type="tel" value={telefone} onChange={(e) => setTelefone(maskPhone(e.target.value))} placeholder="(11) 98888-7777" />
          </div>
          <div className="field">
            <label>Como deseja usar a plataforma?</label>
            <div className="tipo-user-row">
              <button
                type="button"
                className={`tipo-user-btn${tipoUsuario === 'assessorado' ? ' on' : ''}`}
                onClick={() => setTipoUsuario('assessorado')}
              >
                <span className="tipo-user-ico">🤝</span>
                <span className="tipo-user-ttl">Quero acompanhamento com assessor</span>
                <span className="tipo-user-desc">Um assessor entrará em contato pelo WhatsApp</span>
              </button>
              <button
                type="button"
                className={`tipo-user-btn${tipoUsuario === 'autonomo' ? ' on' : ''}`}
                onClick={() => setTipoUsuario('autonomo')}
              >
                <span className="tipo-user-ico">🧭</span>
                <span className="tipo-user-ttl">Quero usar de forma independente</span>
                <span className="tipo-user-desc">Acesso livre com glossário e ajudas no painel</span>
              </button>
            </div>
          </div>
          <label className="wpp-check">
            <input type="checkbox" checked={autorizacaoWpp} onChange={(e) => setAutorizacaoWpp(e.target.checked)} />
            <span>Autorizo o uso do meu telefone (WhatsApp) para contato sobre investimentos e atualizações da plataforma.</span>
          </label>
          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? 'Cadastrando…' : 'Criar Conta'}
          </button>
          {error && <div className="login-err">{error}</div>}
          <button type="button" className="btn-voltar" onClick={onBack}>← Voltar para o login</button>
        </form>
      </div>
    </div>
  );
}
