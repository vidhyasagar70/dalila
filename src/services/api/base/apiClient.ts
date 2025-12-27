/**
 * API Client Configuration , Centralized Axios instance with interceptors
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAuthToken, handleUnauthorized } from "./authHandler";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://dalila-inventory-service-dev.caratlogic.com";

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // 30 second timeout
});

// Export API URL for other services
export { API_URL };

// Type for axios config with auth
interface AuthAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Request interceptor - Adds auth token to all requests
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handles auth errors globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const config = error.config as AuthAxiosRequestConfig;
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !config?._retry) {
      console.error("Unauthorized access detected");
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default apiClient;


