//allow all your frontend components to call backend APIs easily
import axios from 'axios';

// Allow overriding backend URL in development via REACT_APP_API_URL
const API_BASE = (process.env.REACT_APP_API_URL as string) || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Add token automatically to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // store JWT here
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Helpful: log failed requests with details for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const cfg = error.config || {};
      const method = (cfg.method || '').toUpperCase();
      const rawUrl = cfg.url || '';
      const url = cfg.baseURL ? `${cfg.baseURL}${rawUrl}` : rawUrl || 'unknown';
      const status = error.response?.status;
      const respData = error.response?.data;
      // Distinguish network errors (no response)
      if (!error.response) {
        console.error('API network error. Backend may be down or unreachable:', { method, url, message: error.message });
      } else {
        console.error('API request failed:', { method, url, message: error.message, status, response: respData });
      }
    } catch (e) {
      console.error('Failed to log API error', e);
    }
    return Promise.reject(error);
  }
);

// Quick health check at startup so users see a clear message if backend is down
(async () => {
  try {
    const res = await api.get('/health');
    console.info('Backend health:', res.data);
  } catch (err: any) {
    console.error('Backend health check failed. Is the backend running on', API_BASE, '?', err?.message || err);
  }
})();
