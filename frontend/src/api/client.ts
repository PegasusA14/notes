import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const apiClient = axios.create({
    baseURL: 'http://localhost:5024', // Standard backend dev port, adjust if backend runs on different port
});

// Request interceptor to attach token
apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            // Optionally trigger login modal if needed, but App layer can watch token state
        }
        return Promise.reject(error);
    }
);
