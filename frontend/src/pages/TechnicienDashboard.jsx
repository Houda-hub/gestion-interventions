import { useEffect, useState } from 'react';
import { affectationApi } from '../api/api';

export default function TechnicienDashboard({ user }) {
  const [myAffectations, setMyAffectations] = useState([]);

  useEffect(() => {
    if (user?.id) loadMyAffectations();
  }, [user]);

  const loadMyAffectations = async () => {
    try {
      const data = await affectationApi.getByTechnicienId(user.id);
      setMyAffectations(data);
    } catch (err) { console.error('Erreur chargement', err); }
  };

  const handleUpdateStatus = async (techId, interId, newStatus) => {
    try {
      await affectationApi.updateStatus(techId, interId, newStatus);
      loadMyAffectations();
    } catch (err) { console.error('Erreur update', err); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Mes Interventions</h2>
          <p>{myAffectations.length} intervention{myAffectations.length > 1 ? 's' : ''} assignée{myAffectations.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      {myAffectations.length === 0 ? (
        <div className="no-data">
          <div className="icon">◇</div>
          <p>Aucune intervention assignée pour le moment</p>
        </div>
      ) : (
        <div className="cards-grid">
          {myAffectations.map((aff) => (
            <div className="card" key={`${aff.id?.id_technicien || 'T'}-${aff.id?.id_intervention || 'I'}`}>
              <div className="card-header">
                <div>
                  <div className="card-title">{aff.interventionTitre || `Intervention ${aff.id?.id_intervention || '?'}`}</div>
                  <div className="card-meta">
                    {aff.dateAffectation ? new Date(aff.dateAffectation).toLocaleDateString('fr-FR') : ''}
                  </div>
                </div>
                <span className={`status-badge status-${aff.status?.toLowerCase()}`}>{aff.status}</span>
              </div>
              <div className="card-footer">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Mettre à jour :</span>
                <select
                  value={aff.status}
                  onChange={(e) => handleUpdateStatus(aff.id.id_technicien, aff.id.id_intervention, e.target.value)}
                  className="status-select"
                >
                  <option value="ASSIGNE">Assigné</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="TERMINE">Terminé</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
