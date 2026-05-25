import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const isAdmin = user?.role === 'ADMIN';
  const isTechnicien = user?.role === 'TECHNICIEN';

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Gestion Interventions</h1>
      </div>
      <ul className="nav-links">
        {isAdmin && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/interventions">Interventions</Link></li>
            <li><Link to="/techniciens">Techniciens</Link></li>
            <li><Link to="/affectations">Affectations</Link></li>
          </>
        )}
        {isTechnicien && (
          <li><Link to="/mes-interventions">Mes Interventions</Link></li>
        )}
      </ul>
      <div className="nav-user">
        <span>{user?.role}: {user?.name}</span>
        <button onClick={onLogout} className="btn-logout">Déconnexion</button>
      </div>
    </nav>
  );
}
