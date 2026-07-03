import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Normalizes every failure into a plain Error with a human-readable message,
// so calling code never has to dig through error.response.data itself.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong while talking to the server';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
