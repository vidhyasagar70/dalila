import axios, { type AxiosInstance, type AxiosResponse } from "axios";

// Create custom axios instance for Dalila application
const api: AxiosInstance = axios.create({
    baseURL: "/api/hrc", 
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("dalilaAuthToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Handle unauthorized access (only in browser)
            if (typeof window !== "undefined") {
                localStorage.removeItem("dalilaAuthToken");
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            }
        }
        if (error.response?.status === 500) {
            // Handle server errors
            console.error("Server error:", error.response?.data);
        }
        return Promise.reject(error);
    }
);

export default api;