import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Interventions from './pages/Interventions';
import Techniciens from './pages/Techniciens';
import Affectations from './pages/Affectations';
import TechnicienDashboard from './pages/TechnicienDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  const isAdmin = user?.role === 'ADMIN';
  const isTechnicien = user?.role === 'TECHNICIEN';

  return (
    <Router>
      {user ? (
        <div className="app-layout">
          <Sidebar user={user} onLogout={handleLogout} />
          <main className="main-content">
            <Routes>
              {isAdmin && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/interventions" element={<Interventions isAdmin />} />
                  <Route path="/techniciens" element={<Techniciens />} />
                  <Route path="/affectations" element={<Affectations />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
              {isTechnicien && (
                <>
                  <Route path="/mes-interventions" element={<TechnicienDashboard user={user} />} />
                  <Route path="/interventions" element={<Interventions isAdmin={false} />} />
                  <Route path="*" element={<Navigate to="/mes-interventions" />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
