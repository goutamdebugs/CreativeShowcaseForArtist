import axios from 'axios';

// Load environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const APP_NAME = import.meta.env.VITE_APP_NAME || 'Creative Showcase';
const DEBUG_MODE = import.meta.env.VITE_ENABLE_DEBUG === 'true';

// Log environment info in development
if (DEBUG_MODE) {
  console.log(` ${APP_NAME} Frontend`);
  console.log(` API Base URL: ${API_URL}`);
  console.log(` Debug Mode: ${DEBUG_MODE}`);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in debug mode
    if (DEBUG_MODE) {
      console.log(` Request: ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    }
    
    return config;
  },
  (error) => {
    console.error(' Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in debug mode
    if (DEBUG_MODE) {
      console.log(`Response: ${response.status} ${response.config.url}`, response.data);
    }
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    
    // Log error in debug mode
    if (DEBUG_MODE) {
      console.error(' API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: message
      });
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(message);
  }
);

export default api;