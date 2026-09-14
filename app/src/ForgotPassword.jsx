import React, { useState } from 'react';
import { forgotPassword, resetPassword } from './api.js';

export default function ForgotPassword({ onBack }) {
  const [step, setStep] = useState('email'); // 'email' | 'reset'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const sendCode = async (e) => {
    e?.preventDefault();
    setError(''); setInfo('');
    if (!email.trim()) { setError('Informe seu e-mail.'); return; }
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setInfo(res.code
        ? `Código gerado: ${res.code}. Use-o para redefinir sua senha. (Em produção, será enviado por WhatsApp/e-mail.)`
        : 'Se o e-mail estiver cadastrado, você receberá um código de recuperação.'
      );
      setStep('reset');
    } catch (err) {
      setError(err.message || 'Erro ao solicitar recuperação.');
    } finally {
      setLoading(false);
    }
  };

  const doReset = async (e) => {
    e?.preventDefault();
    setError(''); setInfo('');
    if (!code.trim()) { setError('Informe o código recebido.'); return; }
    if (!senha) { setError('Digite a nova senha.'); return; }
    if (senha !== confirmSenha) { setError('As senhas não coincidem.'); return; }
    setLoading(true);
    try {
      await resetPassword(email, code, senha);
      setInfo('Senha redefinida com sucesso! Você já pode fazer login.');
      setTimeout(() => onBack(), 1500);
    } catch (err) {
      setError(err.message || 'Erro ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-screen">
      <div className="login-wrap" style={{ maxWidth: 420 }}>
        <div className="login-logo">
          <h1>Corretora do <em>Zé</em></h1>
          <p>Recuperação de Senha</p>
        </div>
        <form className="login-card" onSubmit={step === 'email' ? sendCode : doReset}>
          <h2>{step === 'email' ? 'Esqueci minha senha' : 'Redefinir senha'}</h2>
          <p className="sub">
            {step === 'email'
              ? 'Informe seu e-mail para receber o código de recuperação'
              : 'Digite o código recebido e sua nova senha'}
          </p>
          <div className="field">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              disabled={step === 'reset'}
            />
          </div>
          {step === 'reset' && (
            <>
              <div className="field">
                <label>Código de recuperação</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.1rem' }}
                />
              </div>
              <div className="field">
                <label>Nova senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              <div className="field">
                <label>Confirme a nova senha</label>
                <input
                  type="password"
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            </>
          )}
          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? 'Aguarde…' : step === 'email' ? 'Enviar código' : 'Redefinir senha'}
          </button>
          {info && <div className="login-info">{info}</div>}
          {error && <div className="login-err">{error}</div>}
          <button type="button" className="btn-voltar" onClick={onBack}>← Voltar para o login</button>
        </form>
      </div>
    </div>
  );
}
