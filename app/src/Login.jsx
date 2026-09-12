import React, { useState } from 'react';
import { login } from './api.js';

export default function Login({ onLogin, onGoRegister, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e?.preventDefault();
    setError('');
    if (!email || !senha) { setError('Preencha todos os campos.'); return; }
    setLoading(true);
    try {
      const { token, user } = await login(email, senha);
      onLogin(token, user);
    } catch (err) {
      setError(err.message || 'Erro ao conectar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-screen">
      <div className="login-wrap">
        <div className="login-logo">
          <h1>Corretora do <em>Zé</em></h1>
          <p>Investment Dashboard</p>
        </div>
        <form className="login-card" onSubmit={submit}>
          <h2>Acesso Restrito</h2>
          <p className="sub">Insira suas credenciais para continuar</p>
          <div className="field">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" autoComplete="email" />
          </div>
          <div className="field">
            <label>Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
          {error && <div className="login-err">{error}</div>}
          <button type="button" className="btn-link-esqueci" onClick={onForgotPassword}>Esqueci minha senha</button>
          <button type="button" className="btn-voltar" onClick={onGoRegister}>Não tem conta? Cadastre-se</button>
        </form>
      </div>
    </div>
  );
}
