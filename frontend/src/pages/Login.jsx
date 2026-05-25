import { useState } from 'react';
import { adminApi } from '../api/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await adminApi.login(email, password);
      if (user.error) {
        setError(user.error);
      } else {
        onLogin(user);
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Gestion des<br />Interventions<br />Techniques</h1>
        <p>Plateforme centralisée pour la gestion, le suivi et l'optimisation des interventions techniques.</p>
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>Bienvenue</h2>
          <p className="subtitle">Connectez-vous pour continuer</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
