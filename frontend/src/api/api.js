const API_URL = 'http://localhost:8081/api';

export const api = {
  async get(url) {
    const res = await fetch(`${API_URL}${url}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async post(url, data) {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async put(url, data) {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async delete(url) {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async postForm(url, params) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}${url}?${query}`, {
      method: 'POST',
    });
    return res.json();
  },

  async getWithParams(url, params) {
    const query = new URLSearchParams(params).toString();
    return this.get(query ? `${url}?${query}` : url);
  },

  async deleteWithParams(url, params) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}${url}?${query}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async putWithParams(url, params) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}${url}?${query}`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
};

export const adminApi = {
  signup: (data) => api.post('/admin/signup', data),
  login: (email, password) => api.postForm('/admin/login', { email, password }),
  getAll: () => api.get('/admin'),
  getById: (id) => api.get(`/admin/${id}`),
  update: (id, data) => api.put(`/admin/${id}`, data),
  delete: (id) => api.delete(`/admin/${id}`),
};

export const interventionApi = {
  getAll: () => api.get('/interventions'),
  getById: (id) => api.get(`/interventions/${id}`),
  create: (data) => api.post('/interventions', data),
  update: (id, data) => api.put(`/interventions/${id}`, data),
  delete: (id) => api.delete(`/interventions/${id}`),
  search: (params) => api.getWithParams('/interventions/search', params),
  getByStatus: (status) => api.get(`/interventions/status/${status}`),
  getByAdminId: (adminId) => api.get(`/interventions/admin/${adminId}`),
};

export const technicienApi = {
  getAll: () => api.get('/techniciens'),
  getById: (id) => api.get(`/techniciens/${id}`),
  create: (data) => api.post('/techniciens', data),
  update: (id, data) => api.put(`/techniciens/${id}`, data),
  delete: (id) => api.delete(`/techniciens/${id}`),
  search: (params) => api.getWithParams('/techniciens/search', params),
  searchByName: (name) => api.get(`/techniciens/search/name?name=${encodeURIComponent(name)}`),
};

export const affectationApi = {
  getAll: () => api.get('/affectations'),
  getByInterventionId: (id) => api.get(`/affectations/intervention/${id}`),
  getByTechnicienId: (id) => api.get(`/affectations/technicien/${id}`),
  getByStatus: (status) => api.get(`/affectations/status/${status}`),
  assign: (technicienId, interventionId) =>
    api.postForm('/affectations/assign', { technicienId, interventionId }),
  updateStatus: (technicienId, interventionId, newStatus) =>
    api.putWithParams('/affectations/status', { technicienId, interventionId, newStatus }),
  delete: (technicienId, interventionId) =>
    api.deleteWithParams('/affectations', { technicienId, interventionId }),
};
