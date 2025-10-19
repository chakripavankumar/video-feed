import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL,
  withCredentials: true, // crucial: cookies(httpOnly) sent to server
});

// Request interceptor (optional): attach client-side headers if needed
api.interceptors.request.use((cfg) => {
  // e.g. add custom header
  // cfg.headers['x-client'] = 'food-frontend';
  return cfg;
});

// Response interceptor: handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) return Promise.reject(error);
    if (error.response.status === 401) {
      // browser navigation — redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;