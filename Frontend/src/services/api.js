import axios from 'axios';

// Create central Axios instance pointing to the Express server API v1
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://deepitlabs.onrender.com/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor: Automatically intercept outgoing requests
// and attach the JWT token from localStorage if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
