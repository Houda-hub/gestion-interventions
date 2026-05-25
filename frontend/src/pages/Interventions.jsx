import { useEffect, useState } from 'react';
import { interventionApi } from '../api/api';

export default function Interventions({ isAdmin }) {
  const [interventions, setInterventions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ titre: '', status: '', dateDebut: '', dateFin: '' });
  const [formData, setFormData] = useState({ titre: '', description: '', dateIntervention: '', status: 'EN_ATTENTE' });

  useEffect(() => { loadInterventions(); }, []);

  const loadInterventions = async () => {
    try {
      const data = await interventionApi.getAll();
      setInterventions(data);
    } catch (err) { console.error('Erreur chargement', err); }
  };

  const handleSearch = async () => {
    try {
      const params = {};
      if (filters.titre) params.titre = filters.titre;
      if (filters.status) params.status = filters.status;
      if (filters.dateDebut) params.dateDebut = filters.dateDebut;
      if (filters.dateFin) params.dateFin = filters.dateFin;
      const data = await interventionApi.search(params);
      setInterventions(data);
    } catch (err) { console.error('Erreur recherche', err); }
  };

  const handleResetFilters = () => {
    setFilters({ titre: '', status: '', dateDebut: '', dateFin: '' });
    loadInterventions();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await interventionApi.update(editing, formData);
      } else {
        await interventionApi.create(formData);
      }
      setFormData({ titre: '', description: '', dateIntervention: '', status: 'EN_ATTENTE' });
      setShowForm(false);
      setEditing(null);
      loadInterventions();
    } catch (err) { console.error('Erreur save', err); }
  };

  const handleEdit = (inter) => {
    setFormData({
      titre: inter.titre,
      description: inter.description,
      dateIntervention: inter.dateIntervention ? new Date(inter.dateIntervention).toISOString().split('T')[0] : '',
      status: inter.status,
    });
    setEditing(inter.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette intervention ?')) {
      try { await interventionApi.delete(id); loadInterventions(); }
      catch (err) { console.error('Erreur suppression', err); }
    }
  };

  const getProgressColor = (p) => {
    if (p >= 75) return 'var(--success)';
    if (p >= 50) return 'var(--accent)';
    if (p >= 25) return 'var(--info)';
    return 'var(--border)';
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Interventions</h2>
          <p>{interventions.length} intervention{interventions.length > 1 ? 's' : ''} au total</p>
        </div>
        {isAdmin && (
          <button className="btn-primary" onClick={() => { setShowForm(true); setEditing(null); setFormData({ titre: '', description: '', dateIntervention: '', status: 'EN_ATTENTE' }); }}>
            + Nouvelle intervention
          </button>
        )}
      </div>

      <div className="filters">
        <input type="text" placeholder="Rechercher..." value={filters.titre} onChange={(e) => setFilters({ ...filters, titre: e.target.value })} />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">Tous les status</option>
          <option value="EN_ATTENTE">En attente</option>
          <option value="ASSIGNE">Assignée</option>
          <option value="EN_COURS">En cours</option>
          <option value="TERMINE">Terminée</option>
        </select>
        <input type="date" value={filters.dateDebut} onChange={(e) => setFilters({ ...filters, dateDebut: e.target.value })} />
        <input type="date" value={filters.dateFin} onChange={(e) => setFilters({ ...filters, dateFin: e.target.value })} />
        <button className="btn-secondary" onClick={handleSearch}>Rechercher</button>
        <button className="btn-secondary" onClick={handleResetFilters}>Réinitialiser</button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editing ? 'Modifier' : 'Nouvelle'} intervention</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Titre</label>
                <input type="text" value={formData.titre} onChange={(e) => setFormData({ ...formData, titre: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={formData.dateIntervention} onChange={(e) => setFormData({ ...formData, dateIntervention: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="ASSIGNE">Assignée</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="TERMINE">Terminée</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary">{editing ? 'Modifier' : 'Créer'}</button>
                <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {interventions.length === 0 ? (
        <div className="no-data">
          <div className="icon">◇</div>
          <p>Aucune intervention trouvée</p>
        </div>
      ) : (
        <div className="cards-grid">
          {interventions.map((inter) => (
            <div className="card" key={inter.id}>
              <div className="card-header">
                <div>
                  <div className="card-title">{inter.titre}</div>
                  <div className="card-meta">{inter.dateIntervention ? new Date(inter.dateIntervention).toLocaleDateString('fr-FR') : 'Date non définie'}</div>
                </div>
                <span className={`status-badge status-${inter.status?.toLowerCase()}`}>{inter.status}</span>
              </div>
              <div className="card-body">
                <p>{inter.description}</p>
              </div>
              <div className="card-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 60, height: 6, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${inter.progress || 0}%`, height: '100%', background: getProgressColor(inter.progress || 0), borderRadius: 999, transition: 'width 0.4s ease' }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{Math.round(inter.progress || 0)}%</span>
                </div>
                {isAdmin && (
                  <div className="actions">
                    <button className="btn-edit" onClick={() => handleEdit(inter)}>Modifier</button>
                    <button className="btn-delete" onClick={() => handleDelete(inter.id)}>Supprimer</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
