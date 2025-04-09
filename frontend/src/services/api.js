// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mini-project-college.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Add this if using cookies
});

// Add response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - check credentials or session');
    }
    return Promise.reject(error);
  }
);

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
// ... other API calls
