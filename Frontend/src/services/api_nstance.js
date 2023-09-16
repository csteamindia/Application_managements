import axios from 'axios';

const BASE_URL = 'http://localhost:8800/api/v1'
const heads = { 'Content-Type': 'application/json' }

if(!localStorage.getItem('accessToken')){
  heads.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
}

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: heads
});

// Request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Add logic to handle response errors, e.g., token expiration
    return Promise.reject(error);
  }
);

export default AxiosInstance;
