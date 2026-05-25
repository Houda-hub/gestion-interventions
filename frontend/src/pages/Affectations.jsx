import { useEffect, useState } from 'react';
import { affectationApi, interventionApi, technicienApi } from '../api/api';

export default function Affectations() {
  const [affectations, setAffectations] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ technicienId: '', interventionId: '' });
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [affectData, interData, techData] = await Promise.all([
        affectationApi.getAll(),
        interventionApi.getAll(),
        technicienApi.getAll(),
      ]);
      setAffectations(affectData);
      setInterventions(interData);
      setTechniciens(techData);
    } catch (err) { console.error('Erreur chargement', err); }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await affectationApi.assign(parseInt(formData.technicienId), parseInt(formData.interventionId));
      setFormData({ technicienId: '', interventionId: '' });
      setShowForm(false);
      loadData();
    } catch (err) { alert('Erreur lors de l\'assignation'); }
  };

  const handleUpdateStatus = async (techId, interId, newStatus) => {
    try {
      await affectationApi.updateStatus(techId, interId, newStatus);
      loadData();
    } catch (err) { console.error('Erreur update', err); }
  };

  const handleDelete = async (techId, interId) => {
    if (window.confirm('Supprimer cette affectation ?')) {
      try { await affectationApi.delete(techId, interId); loadData(); }
      catch (err) { console.error('Erreur suppression', err); }
    }
  };

  const filtered = statusFilter ? affectations.filter((a) => a.status === statusFilter) : affectations;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Affectations</h2>
          <p>{affectations.length} affectation{affectations.length > 1 ? 's' : ''} au total</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Assigner
        </button>
      </div>

      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Tous les status</option>
          <option value="ASSIGNE">Assigné</option>
          <option value="EN_COURS">En cours</option>
          <option value="TERMINE">Terminé</option>
        </select>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nouvelle affectation</h3>
            <form onSubmit={handleAssign}>
              <div className="form-group">
                <label>Technicien</label>
                <select value={formData.technicienId} onChange={(e) => setFormData({ ...formData, technicienId: e.target.value })} required>
                  <option value="">Sélectionner</option>
                  {techniciens.map((tech) => (
                    <option key={tech.id} value={tech.id}>{tech.name} — {tech.specialit}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Intervention</label>
                <select value={formData.interventionId} onChange={(e) => setFormData({ ...formData, interventionId: e.target.value })} required>
                  <option value="">Sélectionner</option>
                  {interventions.map((inter) => (
                    <option key={inter.id} value={inter.id}>{inter.titre} — {inter.status}</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary">Assigner</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="no-data">
          <div className="icon">◇</div>
          <p>Aucune affectation trouvée</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map((aff) => (
            <div className="card" key={`${aff.id?.id_technicien || 'T'}-${aff.id?.id_intervention || 'I'}`}>
              <div className="card-header">
                <div>
                  <div className="card-title">{aff.interventionTitre || `Intervention ${aff.id?.id_intervention || '?'}`}</div>
                  <div className="card-meta">Assigné à {aff.technicienName || `Technicien ${aff.id?.id_technicien || '?'}`}</div>
                </div>
                <span className={`status-badge status-${aff.status?.toLowerCase()}`}>{aff.status}</span>
              </div>
              <div className="card-body">
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Date : {aff.dateAffectation ? new Date(aff.dateAffectation).toLocaleDateString('fr-FR') : '—'}
                </p>
              </div>
              <div className="card-footer">
                <select
                  value={aff.status}
                  onChange={(e) => handleUpdateStatus(aff.id.id_technicien, aff.id.id_intervention, e.target.value)}
                  className="status-select"
                >
                  <option value="ASSIGNE">Assigné</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="TERMINE">Terminé</option>
                </select>
                <button className="btn-delete" onClick={() => handleDelete(aff.id.id_technicien, aff.id.id_intervention)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
