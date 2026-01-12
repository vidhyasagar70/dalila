/**
 * Authentication Service
 * Handles user authentication operations
 */

import apiClient from "../base/apiClient";
import { setAuthToken, setCurrentUser, removeAuthToken } from "../base/authHandler";
import { handleApiError } from "../base/errorHandler";
import type { ApiResponse } from "../types/api.types";
import type { User, LoginCredentials, RegistrationData, AuthResponse } from "../types/user.types";

// User login
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    console.log("Login request initiated");
    const response = await apiClient.post<AuthResponse>("/api/users/login", credentials);

    console.log("Login API Response:", response.data);

    if (response.data.success && response.data.data) {
      const { token, user } = response.data.data;

      // Store token
      if (token) {
        console.log("Storing auth token");
        setAuthToken(token);
      }

      // Store user
      if (user) {
        console.log("Storing user data");
        setCurrentUser(user);
        // Note: authToken cookie is now set by setAuthToken() above
      }

      // Fetch complete profile
      if (token) {
        try {
          const profileResponse = await apiClient.get<ApiResponse<{ user: User }>>(
            "/api/users/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (profileResponse.data.success && profileResponse.data.data?.user) {
            const profileUser = profileResponse.data.data.user;
            setCurrentUser(profileUser);

            if (typeof document !== "undefined") {
              const cookieUser = encodeURIComponent(JSON.stringify(profileUser));
              document.cookie = `user=${cookieUser}; path=/; max-age=86400; SameSite=Lax`;
            }
          }
        } catch (profileError) {
          console.warn("Could not fetch profile (not critical):", profileError);
        }
      }
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

// User registration
export const register = async (data: RegistrationData): Promise<ApiResponse<{ user: User }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ user: User }>>(
      "/api/users/register",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// User logout
export const logout = async (): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/users/logout",
      {}
    );
    removeAuthToken();
    return response.data;
  } catch (error) {
    // Always remove auth token even if API call fails
    removeAuthToken();
    throw error;
  }
};

// Send OTP to email
export const sendOtp = async (email: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/users/otp",
      { email }
    );
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

// Verify OTP
export const verifyOtp = async (data: {
  email: string;
  otp: string;
}): Promise<ApiResponse<{ message: string }>> => {
  try {
    console.log("Sending OTP verification request:", data);

    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/users/verify-otp",
      {
        email: data.email.trim(),
        otp: data.otp.trim(),
      }
    );

    console.log("OTP verification response:", response.data);
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    const apiError = handleApiError(error);
    
    // Provide more specific error messages
    if (apiError.status === 500) {
      throw new Error(
        "Server error occurred. The OTP may be incorrect, expired, or there's a database issue. Please try requesting a new OTP."
      );
    }
    if (apiError.status === 400) {
      throw new Error("Invalid request. Please check your email and OTP.");
    }
    if (apiError.status === 404) {
      throw new Error("User or OTP not found. Please register again or request a new OTP.");
    }
    
    throw new Error(apiError.message || "OTP verification failed");
  }
};

// Update password
export const updatePassword = async (data: {
  email: string;
  newPassword: string;
  otp: string;
}): Promise<ApiResponse<{ message: string; user?: User }>> => {
  try {
    const response = await apiClient.put<ApiResponse<{ message: string; user?: User }>>(
      "/api/users/update-password",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Update password error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to update password");
  }
};


