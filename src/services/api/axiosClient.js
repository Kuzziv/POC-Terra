// services/api/axiosClient.js
import axios from 'axios';

// Create an Axios instance with the base URL pointing to your Django API
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adjust this to your Django backend's API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the Authorization token automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('Request:', config);

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
