// Real API service using axios
import axios from 'axios';
import { API_URL } from './constants';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
      config.headers.Accept = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API request failed:', error);
    throw error;
  }
);

// API functions
export const api = {
  // GET /admin/manager-list - returns id and name
  async getManagerList() {
    return await apiClient.get('admin/managers-list');
  },

  // GET /admin/managers - returns full manager data
  async getManagers(queryParams = '') {
    const endpoint = queryParams ? `admin/managers?${queryParams}` : 'admin/managers';
    return await apiClient.get(endpoint);
  },

  // GET /admin/technicians - returns full technician data
  async getTechnicians(queryParams = '') {
    const endpoint = queryParams ? `admin/technicians?${queryParams}` : 'admin/technicians';
    return await apiClient.get(endpoint);
  },

  // POST /admin/managers - create new manager
  async createManager(managerData) {
    return await apiClient.post('admin/managers', managerData);
  },

  // POST /admin/technicians - create new technician
  async createTechnician(technicianData) {
    return await apiClient.post('admin/technicians', technicianData);
  },

  // PUT /admin/managers/:id - update manager
  async updateManager(id, managerData) {
    return await apiClient.put(`admin/managers/${id}`, managerData);
  },

  // PUT /admin/technicians/:id - update technician
  async updateTechnician(id, technicianData) {
    return await apiClient.put(`admin/technicians/${id}`, technicianData);
  },

  // DELETE /admin/managers/:id - delete manager
  async deleteManager(id) {
    return await apiClient.delete(`admin/managers/${id}`);
  },

  // DELETE /admin/technicians/:id - delete technician
  async deleteTechnician(id) {
    return await apiClient.delete(`admin/technicians/${id}`);
  },

  // Authentication endpoints
  async login(credentials) {
    return await apiClient.post('admin/signin', credentials);
  },

  // Dashboard data
  async getDashboardData() {
    return await apiClient.get('admin/dashboard');
  },

  // Settings
  async getSettings() {
    return await apiClient.get('admin/settings');
  },

  async updateSettings(settingsData) {
    return await apiClient.put('admin/settings', settingsData);
  },
};

export default api;