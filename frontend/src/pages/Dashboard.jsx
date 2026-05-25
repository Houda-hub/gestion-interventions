import { useEffect, useState } from 'react';
import { interventionApi, technicienApi, affectationApi } from '../api/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    interventions: 0,
    techniciens: 0,
    affectations: 0,
    enAttente: 0,
    terminees: 0,
  });
  const [recentInterventions, setRecentInterventions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [interventions, techniciens, affectations] = await Promise.all([
        interventionApi.getAll(),
        technicienApi.getAll(),
        affectationApi.getAll(),
      ]);
      setStats({
        interventions: interventions.length,
        techniciens: techniciens.length,
        affectations: affectations.length,
        enAttente: interventions.filter((i) => i.status === 'EN_ATTENTE').length,
        terminees: interventions.filter((i) => i.status === 'TERMINE').length,
      });
      setRecentInterventions(interventions.slice(-5).reverse());
    } catch (err) {
      console.error('Erreur chargement dashboard', err);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'var(--success)';
    if (progress >= 50) return 'var(--accent)';
    if (progress >= 25) return 'var(--info)';
    return 'var(--border)';
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Tableau de bord</h2>
          <p>Vue d'ensemble de vos interventions</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Interventions</div>
          <div className="stat-value">{stats.interventions}</div>
          <div className="stat-sub">Total créé</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Techniciens</div>
          <div className="stat-value">{stats.techniciens}</div>
          <div className="stat-sub">Actifs</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Terminées</div>
          <div className="stat-value">{stats.terminees}</div>
          <div className="stat-sub">Complétées</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">En attente</div>
          <div className="stat-value">{stats.enAttente}</div>
          <div className="stat-sub">À assigner</div>
        </div>
      </div>

      <div className="recent-section">
        <h3>Dernières interventions</h3>
        {recentInterventions.length === 0 ? (
          <div className="no-data">
            <div className="icon">◇</div>
            <p>Aucune intervention pour le moment</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
                <th>Progression</th>
              </tr>
            </thead>
            <tbody>
              {recentInterventions.map((inter) => (
                <tr key={inter.id}>
                  <td style={{ fontWeight: 600 }}>{inter.titre}</td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {inter.description}
                  </td>
                  <td>{inter.dateIntervention ? new Date(inter.dateIntervention).toLocaleDateString('fr-FR') : '—'}</td>
                  <td>
                    <span className={`status-badge status-${inter.status?.toLowerCase()}`}>
                      {inter.status || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="progress-bar-container" style={{ width: 100, height: 6, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
                        <div className="progress-bar" style={{ width: `${inter.progress || 0}%`, height: '100%', background: getProgressColor(inter.progress || 0), borderRadius: 999, transition: 'width 0.4s ease' }}></div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{Math.round(inter.progress || 0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
