import api from './api';

export const userService = {
  // 
  getUserByUsername: async (username) => {
    return await api.get(`/auth/username/${username}`);
  },

  // 
  updateUser: async (userData) => {
    return await api.put('/auth/profile', userData);
  },

  // 
  searchUsers: async (query) => {
    return await api.get('/auth/search', { params: { q: query } });
  },

  // 
  getAllArtists: async () => {
    return await api.get('/auth/users');
  }
};