import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 responses (unauthorized)
// Note: We only clean up the token here, redirects are handled by components
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Don't redirect here - let components handle navigation
    }
    return Promise.reject(error);
  }
);

export default api;
