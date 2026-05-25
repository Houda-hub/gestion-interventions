import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ user, onLogout }) {
  const isAdmin = user?.role === 'ADMIN';
  const isTechnicien = user?.role === 'TECHNICIEN';
  const location = useLocation();

  const navLinks = isAdmin
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: '◆' },
        { to: '/interventions', label: 'Interventions', icon: '⬡' },
        { to: '/techniciens', label: 'Techniciens', icon: '⬢' },
        { to: '/affectations', label: 'Affectations', icon: '⬣' },
      ]
    : [
        { to: '/mes-interventions', label: 'Mes Interventions', icon: '⬡' },
        { to: '/interventions', label: 'Toutes les Interventions', icon: '⬢' },
      ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>Gestion Interventions</h1>
        <span>Plateforme de suivi</span>
      </div>

      <ul className="sidebar-nav">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={location.pathname === link.to ? 'active' : ''}>
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-role">{user?.role}</div>
          <div className="user-name">{user?.name}</div>
        </div>
        <button onClick={onLogout} className="btn-logout">Déconnexion</button>
      </div>
    </aside>
  );
}
