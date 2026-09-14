import React, { useState, useEffect } from 'react';
import { fetchProfile, updateProfilePassword, updateProfile, fetchAdminUsers, updateAdminUserType } from '../api.js';

export default function ContaTab({ user, onProfileUpdate }) {
  const isAdmin = user.role === 'admin' || user.role === 'demo';
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Password form
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  // WhatsApp toggle
  const [wppLoading, setWppLoading] = useState(false);
  const [wppMsg, setWppMsg] = useState('');

  // Edit profile form
  const [editing, setEditing] = useState(false);
  const [editEmail, setEditEmail] = useState('');
  const [editTelefone, setEditTelefone] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editMsg, setEditMsg] = useState('');
  const [editErr, setEditErr] = useState('');

  const startEdit = () => {
    setEditEmail(profile.email);
    setEditTelefone(profile.telefone || '');
    setEditMsg(''); setEditErr('');
    setEditing(true);
  };

  const salvarEdicao = async () => {
    setEditMsg(''); setEditErr('');
    if (!editEmail.trim()) { setEditErr('O e-mail não pode ficar vazio.'); return; }
    setEditLoading(true);
    try {
      await updateProfile({ email: editEmail, telefone: editTelefone });
      const updated = { ...profile, email: editEmail.trim().toLowerCase(), telefone: editTelefone.trim() };
      setProfile(updated);
      setEditing(false);
      setEditMsg('Dados atualizados com sucesso!');
      if (onProfileUpdate) onProfileUpdate(updated);
    } catch (e) {
      setEditErr(e.message);
    } finally {
      setEditLoading(false);
    }
  };

  // Admin users
  const [users, setUsers] = useState(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userUpdating, setUserUpdating] = useState(null);

  useEffect(() => {
    fetchProfile()
      .then((p) => { setProfile(p); setError(''); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    if (isAdmin) {
      setUsersLoading(true);
      fetchAdminUsers()
        .then(setUsers)
        .catch(() => setUsers(null))
        .finally(() => setUsersLoading(false));
    }
  }, []);

  const trocarSenha = async () => {
    setPwMsg(''); setPwErr('');
    if (novaSenha.length < 4) { setPwErr('A nova senha deve ter ao menos 4 caracteres.'); return; }
    if (novaSenha !== confSenha) { setPwErr('As senhas não conferem.'); return; }
    setPwLoading(true);
    try {
      await updateProfilePassword(senhaAtual || null, novaSenha);
      setPwMsg('Senha alterada com sucesso!');
      setSenhaAtual(''); setNovaSenha(''); setConfSenha('');
    } catch (e) {
      setPwErr(e.message);
    } finally {
      setPwLoading(false);
    }
  };

  const toggleWpp = async () => {
    setWppMsg(''); setWppLoading(true);
    try {
      const novoValor = !profile.autorizacao_whatsapp;
      await updateProfile({ autorizacao_whatsapp: novoValor });
      setProfile({ ...profile, autorizacao_whatsapp: novoValor });
      setWppMsg(novoValor ? 'Autorização de WhatsApp ativada.' : 'Autorização de WhatsApp desativada.');
    } catch (e) {
      setWppMsg(e.message);
    } finally {
      setWppLoading(false);
    }
  };

  const alterarTipoUsuario = async (id, tipo) => {
    setUserUpdating(id);
    try {
      await updateAdminUserType(id, tipo);
      setUsers(users.map(u => u.id === id ? { ...u, tipo_usuario: tipo } : u));
    } catch (e) {
      setError(e.message);
    } finally {
      setUserUpdating(null);
    }
  };

  if (loading) return <div className="empty"><div className="ico">⏳</div><p>Carregando…</p></div>;
  if (error) return <div className="empty"><div className="ico">⚠️</div><p>{error}</p></div>;
  if (!profile) return null;

  return (
    <>
      {/* Meus dados */}
      <div className="sec-head">
        <h3>Meus Dados</h3>
        {!editing && (
          <button className="btn-lancar-meta" onClick={startEdit} style={{ margin: 0, cursor: 'pointer' }}>✏️ Editar</button>
        )}
      </div>
      {editing ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 22, marginBottom: 22 }}>
          <div style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: 14 }}>
            🔒 O nome não pode ser alterado pois identifica sua carteira.
          </div>
          <div className="meta-form-row" style={{ marginBottom: 14 }}>
            <div className="meta-field">
              <label>E-mail</label>
              <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} placeholder="seu@email.com" />
            </div>
            <div className="meta-field">
              <label>Telefone</label>
              <input type="tel" value={editTelefone} onChange={e => setEditTelefone(e.target.value)} placeholder="(11) 99999-9999" />
            </div>
          </div>
          {editErr && <div className="meta-msg err">{editErr}</div>}
          {editMsg && <div className="meta-msg ok">{editMsg}</div>}
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button className="btn-salvar-meta" onClick={salvarEdicao} disabled={editLoading} style={{ maxWidth: 150 }}>
              {editLoading ? 'Salvando...' : 'Salvar'}
            </button>
            <button className="btn-lancar-meta cancelar" onClick={() => setEditing(false)} style={{ margin: 0, cursor: 'pointer' }}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          {editMsg && <div className="meta-msg ok" style={{ marginBottom: 14 }}>{editMsg}</div>}
          <div className="tbl-wrap" style={{ marginBottom: 22 }}>
            <div className="tbl-scroll">
              <table className="prov-detalhe-tbl">
                <tbody>
                  <tr>
                    <td className="td-l" style={{ fontWeight: 700 }}>Nome</td>
                    <td style={{ textAlign: 'left' }}>{profile.nome}</td>
                  </tr>
                  <tr>
                    <td className="td-l" style={{ fontWeight: 700 }}>E-mail</td>
                    <td style={{ textAlign: 'left' }}>{profile.email}</td>
                  </tr>
                  <tr>
                    <td className="td-l" style={{ fontWeight: 700 }}>Tipo de Conta</td>
                    <td style={{ textAlign: 'left' }}>
                      <span className={`sb-profile-tag ${profile.tipo_usuario}`}>
                        {profile.tipo_usuario === 'assessorado' ? '🤝 Assessorado' : '🧭 Autônomo'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-l" style={{ fontWeight: 700 }}>Telefone</td>
                    <td style={{ textAlign: 'left' }}>{profile.telefone || '—'}</td>
                  </tr>
                  <tr>
                    <td className="td-l" style={{ fontWeight: 700 }}>Contato WhatsApp</td>
                    <td style={{ textAlign: 'left' }}>
                      <span style={{ color: profile.autorizacao_whatsapp ? 'var(--accent)' : 'var(--red)', fontWeight: 600 }}>
                        {profile.autorizacao_whatsapp ? '✓ Autorizado' : '✗ Não autorizado'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* WhatsApp toggle */}
      <div className="calc-card" style={{ marginBottom: 16 }}>
        <div className="calc-card-head" style={{ cursor: 'default' }}>
          <div className="calc-card-title">Autorização de Contato WhatsApp</div>
          <button
            className={`btn-lancar-meta ${profile.autorizacao_whatsapp ? 'cancelar' : ''}`}
            onClick={toggleWpp}
            disabled={wppLoading}
            style={{ margin: 0, cursor: wppLoading ? 'not-allowed' : 'pointer', opacity: wppLoading ? 0.5 : 1 }}
          >
            {wppLoading ? '...' : profile.autorizacao_whatsapp ? 'Desativar' : 'Ativar'}
          </button>
        </div>
        {wppMsg && (
          <div style={{ padding: '0 20px 16px', fontSize: '.78rem', color: wppMsg.includes('Erro') || wppMsg.includes('desativada') ? 'var(--red)' : 'var(--accent)' }}>
            {wppMsg}
          </div>
        )}
      </div>

      {/* Trocar senha */}
      <div className="sec-head"><h3>Trocar Senha</h3></div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 22, marginBottom: 22 }}>
        <div className="meta-form-row" style={{ marginBottom: 14 }}>
          <div className="meta-field">
            <label>Senha Atual</label>
            <input type="password" value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} placeholder="Deixe em branco se não quiser validar" />
          </div>
          <div className="meta-field">
            <label>Nova Senha</label>
            <input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} placeholder="Mínimo 4 caracteres" />
          </div>
        </div>
        <div className="meta-form-row" style={{ marginBottom: 14 }}>
          <div className="meta-field">
            <label>Confirmar Nova Senha</label>
            <input type="password" value={confSenha} onChange={e => setConfSenha(e.target.value)} placeholder="Repita a nova senha" />
          </div>
        </div>
        {pwErr && <div className="meta-msg err">{pwErr}</div>}
        {pwMsg && <div className="meta-msg ok">{pwMsg}</div>}
        <button className="btn-salvar-meta" onClick={trocarSenha} disabled={pwLoading} style={{ maxWidth: 200, marginTop: 14 }}>
          {pwLoading ? 'Alterando...' : 'Alterar Senha'}
        </button>
      </div>

      {/* Admin: lista de usuários */}
      {isAdmin && (
        <>
          <div className="sec-head"><h3>Usuários</h3><span className="tag">{users?.length || 0} cadastrados</span></div>
          {usersLoading ? (
            <div className="empty" style={{ padding: 32 }}><p>Carregando usuários…</p></div>
          ) : users && users.length > 0 ? (
            <div className="tbl-wrap">
              <div className="tbl-scroll">
                <table className="prov-detalhe-tbl">
                  <thead>
                    <tr>
                      <th className="td-l">Nome</th>
                      <th>E-mail</th>
                      <th>Tipo de Conta</th>
                      <th>WhatsApp</th>
                      <th>Telefone</th>
                      <th>Alterar Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td className="td-l" style={{ fontWeight: 600 }}>{u.nome}</td>
                        <td style={{ textAlign: 'left' }}>{u.email}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`sb-profile-tag ${u.tipo_usuario}`}>
                            {u.tipo_usuario === 'assessorado' ? '🤝 Assessorado' : '🧭 Autônomo'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ color: u.autorizacao_whatsapp ? 'var(--accent)' : 'var(--red)', fontWeight: 600 }}>
                            {u.autorizacao_whatsapp ? '✓ Sim' : '✗ Não'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {u.autorizacao_whatsapp ? (u.telefone || '—') : '—'}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <select
                            className="prov-filter-select"
                            value={u.tipo_usuario || 'autonomo'}
                            disabled={userUpdating === u.id}
                            onChange={e => alterarTipoUsuario(u.id, e.target.value)}
                            style={{ fontSize: '.72rem', padding: '5px 8px' }}
                          >
                            <option value="autonomo">🧭 Autônomo</option>
                            <option value="assessorado">🤝 Assessorado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="empty" style={{ padding: 32 }}><p>Nenhum usuário encontrado.</p></div>
          )}
        </>
      )}
    </>
  );
}
