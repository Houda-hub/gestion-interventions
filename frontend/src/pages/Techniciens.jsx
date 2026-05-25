import { useEffect, useState } from 'react';
import { technicienApi } from '../api/api';

export default function Techniciens() {
  const [techniciens, setTechniciens] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ name: '', specialite: '', email: '' });
  const [formData, setFormData] = useState({ name: '', email: '', password: '', specialit: '' });

  useEffect(() => { loadTechniciens(); }, []);

  const loadTechniciens = async () => {
    try {
      const data = await technicienApi.getAll();
      setTechniciens(data);
    } catch (err) { console.error('Erreur chargement', err); }
  };

  const handleSearch = async () => {
    try {
      const data = await technicienApi.search(filters);
      setTechniciens(data);
    } catch (err) { console.error('Erreur recherche', err); }
  };

  const handleResetFilters = () => {
    setFilters({ name: '', specialite: '', email: '' });
    loadTechniciens();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await technicienApi.update(editing, formData);
      } else {
        await technicienApi.create(formData);
      }
      setFormData({ name: '', email: '', password: '', specialit: '' });
      setShowForm(false);
      setEditing(null);
      loadTechniciens();
    } catch (err) { console.error('Erreur save', err); }
  };

  const handleEdit = (tech) => {
    setFormData({ name: tech.name, email: tech.email, password: '', specialit: tech.specialit || '' });
    setEditing(tech.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce technicien ?')) {
      try { await technicienApi.delete(id); loadTechniciens(); }
      catch (err) { console.error('Erreur suppression', err); }
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Techniciens</h2>
          <p>{techniciens.length} technicien{techniciens.length > 1 ? 's' : ''} enregistré{techniciens.length > 1 ? 's' : ''}</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditing(null); setFormData({ name: '', email: '', password: '', specialit: '' }); }}>
          + Nouveau technicien
        </button>
      </div>

      <div className="filters">
        <input type="text" placeholder="Nom..." value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
        <input type="text" placeholder="Spécialité..." value={filters.specialite} onChange={(e) => setFilters({ ...filters, specialite: e.target.value })} />
        <input type="email" placeholder="Email..." value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
        <button className="btn-secondary" onClick={handleSearch}>Rechercher</button>
        <button className="btn-secondary" onClick={handleResetFilters}>Réinitialiser</button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editing ? 'Modifier' : 'Nouveau'} technicien</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={!editing} placeholder={editing ? 'Laisser vide pour ne pas changer' : ''} />
              </div>
              <div className="form-group">
                <label>Spécialité</label>
                <input type="text" value={formData.specialit} onChange={(e) => setFormData({ ...formData, specialit: e.target.value })} required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary">{editing ? 'Modifier' : 'Créer'}</button>
                <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {techniciens.length === 0 ? (
        <div className="no-data">
          <div className="icon">◇</div>
          <p>Aucun technicien trouvé</p>
        </div>
      ) : (
        <div className="cards-grid">
          {techniciens.map((tech) => (
            <div className="card" key={tech.id}>
              <div className="card-header">
                <div>
                  <div className="card-title">{tech.name}</div>
                  <div className="card-meta">{tech.email}</div>
                </div>
              </div>
              <div className="card-body">
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }}></span>
                  {tech.specialit}
                </p>
              </div>
              <div className="card-footer">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Technicien</span>
                <div className="actions">
                  <button className="btn-edit" onClick={() => handleEdit(tech)}>Modifier</button>
                  <button className="btn-delete" onClick={() => handleDelete(tech.id)}>Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
