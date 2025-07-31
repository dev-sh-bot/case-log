// Real API service
import { API_URL } from './constants';

// Helper function for making API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API functions
export const api = {
  // GET /manager-list - returns id and name
  async getManagerList() {
    return await apiRequest('manager-list');
  },

  // GET /managers - returns full manager data
  async getManagers(queryParams = '') {
    const endpoint = queryParams ? `managers?${queryParams}` : 'managers';
    return await apiRequest(endpoint);
  },

  // GET /technicians - returns full technician data
  async getTechnicians(queryParams = '') {
    const endpoint = queryParams ? `technicians?${queryParams}` : 'technicians';
    return await apiRequest(endpoint);
  },

  // POST /managers - create new manager
  async createManager(managerData) {
    return await apiRequest('manager', {
      method: 'POST',
      body: JSON.stringify(managerData),
    });
  },

  // POST /technicians - create new technician
  async createTechnician(technicianData) {
    return await apiRequest('technician', {
      method: 'POST',
      body: JSON.stringify(technicianData),
    });
  },

  // Authentication endpoints
  async login(credentials) {
    return await apiRequest('admin/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async logout() {
    return await apiRequest('auth/logout', {
      method: 'POST',
    });
  },
};

export default api;