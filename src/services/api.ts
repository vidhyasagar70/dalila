// services/api.ts
import axios, { type AxiosInstance, type AxiosResponse } from "axios";

// Create custom axios instance for Dalila application
const api: AxiosInstance = axios.create({
    baseURL: "/api/hrc", 
    timeout: 15000, 
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Check if we're in browser environment
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("dalilaAuthToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        
        // Log request for debugging (remove in production)
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log successful response (remove in production)
        console.log(`✅ API Response: ${response.config.url} - Status: ${response.status}`);
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            console.warn("Unauthorized access - Redirecting to login");
            
            // Handle unauthorized access (only in browser)
            if (typeof window !== "undefined") {
                // Clear all auth data
                localStorage.removeItem("dalilaAuthToken");
                localStorage.removeItem("dalilaUser");
                
                // Clear cookies
                document.cookie = "dalilaAuthToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
                
                // Redirect to login if not already there
                if (window.location.pathname !== "/login") {
                    const currentPath = window.location.pathname;
                    window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
                }
            }
        }
        
        if (error.response?.status === 403) {
            console.error("Forbidden: Insufficient permissions");
        }
        
        if (error.response?.status === 500) {
            console.error("Server error:", error.response?.data);
        }
        
        if (error.code === 'ECONNABORTED') {
            console.error("Request timeout");
        }
        
        return Promise.reject(error);
    }
);

export default api;