import api from './api';

export const imageService = {
  // ইমেজ আপলোড
  uploadImage: async (formData) => {
    return await api.post('/images/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // সব ইমেজ আনা (পেজিনেশন সহ)
  getAllImages: async (page = 1, limit = 20) => {
    return await api.get('/images', { params: { page, limit } });
  },

  // নির্দিষ্ট ইউজারের আইডি দিয়ে ইমেজ আনা
  getUserImages: async (userId) => {
    return await api.get(`/images/user/${userId}`);
  },

  // ইউজারনেম দিয়ে ইমেজ আনা (সার্চ বা প্রোফাইল পেজের জন্য)
  getImagesByUsername: async (username) => {
    return await api.get(`/images/username/${username}`);
  },

  // একটি নির্দিষ্ট ইমেজের ডিটেইলস
  getImage: async (id) => {
    return await api.get(`/images/${id}`);
  },

  // ইমেজ ডিলিট করা
  deleteImage: async (id) => {
    return await api.delete(`/images/${id}`);
  },

  // লাইক দেওয়া
  likeImage: async (id) => {
    return await api.post(`/images/${id}/like`);
  }
};