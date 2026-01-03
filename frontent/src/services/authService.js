import api from './api';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  },

  getProfile: async () => {
    return await api.get('/auth/profile');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};