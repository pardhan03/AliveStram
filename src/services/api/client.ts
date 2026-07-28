import axios, { AxiosInstance } from 'axios';
import { PEXELS_API_KEY } from '../../config/pexels';

/**
 * Factory function to create custom Axios instances for different base URLs / microservices
 */
export const createApiClient = (baseURL: string, customTimeout: number = 15000): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: customTimeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Platform': 'react-native',
    },
  });

  return instance;
};

// Default Primary API Client for App Backend
export const apiClient = createApiClient('https://api.alivestream.com/v1');

// Configured Pexels API Client
export const pexelsApiClient = createApiClient('https://api.pexels.com/v1');

// Automatically attach PEXELS_API_KEY to all pexelsApiClient requests
pexelsApiClient.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = PEXELS_API_KEY;
  }
  return config;
});

export default apiClient;
