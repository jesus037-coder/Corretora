import React, { useState, useCallback } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import Dashboard from './Dashboard.jsx';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleLogin = useCallback((token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowRegister(false);
    setShowForgot(false);
    setUser(null);
  }, []);

  if (!user) {
    if (showForgot) return <ForgotPassword onBack={() => setShowForgot(false)} />;
    return showRegister
      ? <Register onRegister={handleLogin} onBack={() => setShowRegister(false)} />
      : <Login onLogin={handleLogin} onGoRegister={() => setShowRegister(true)} onForgotPassword={() => setShowForgot(true)} />;
  }
  return <Dashboard user={user} onLogout={handleLogout} />;
}
