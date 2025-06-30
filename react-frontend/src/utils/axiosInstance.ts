import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(import.meta.env.VITE_API_BASE_URL)
// Lista de endpoints que no requieren autenticación
const publicEndpoints = [
  '/auth/login',
  '/auth/register'
];

// Interceptor de solicitud
api.interceptors.request.use((config) => {
  // Verificar si el endpoint es público
  const isPublicEndpoint = publicEndpoints.some(endpoint => 
    config.url?.endsWith(endpoint)
  );

  if (!isPublicEndpoint) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Redirigir al login si no hay token
      window.location.href = '/';
      return Promise.reject(new Error('No authentication token found'));
    }
  }
  return config;
});

// Interceptor de respuesta (mantenemos el mismo)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;