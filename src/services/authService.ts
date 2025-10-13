import api from "./api";
import { AxiosError } from "axios";

interface LoginRequest {
  UserName: string;
  Password: string;
}

interface LoginResponse {
  loginResult?: {
    MESSAGE?: string;
    STATUS?: string;
    TOKEN?: string;
    [key: string]: unknown;
  };
  Token?: string;
  token?: string;
  Message?: string;
  message?: string;
  Status?: string;
  status?: string;
  Data?: {
    Token?: string;
    token?: string;
    [key: string]: unknown;
  };
  data?: {
    Token?: string;
    token?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface ApiErrorResponse {
  Message?: string;
  Error?: string;
  loginResult?: {
    MESSAGE?: string;
  };
}

class AuthService {
  /**
   * Set cookie (works in browser)
   */
  private setCookie(name: string, value: string, days: number = 7): void {
    if (typeof window !== "undefined") {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }
  }

  /**
   * Get cookie value
   */
  private getCookie(name: string): string | null {
    if (typeof window !== "undefined") {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
      }
    }
    return null;
  }

  /**
   * Remove cookie
   */
  private removeCookie(name: string): void {
    if (typeof window !== "undefined") {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  }

  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Make GET request with query parameters
      const response = await api.get<LoginResponse>("/login", {
        params: {
          UserName: credentials.UserName,
          Password: credentials.Password,
        },
      });

      console.log("Full API Response:", response.data);

      // Check for token in various possible formats
      const token =
        response.data.loginResult?.TOKEN ||
        response.data.Token ||
        response.data.token ||
        response.data.Data?.Token ||
        response.data.Data?.token ||
        response.data.data?.Token ||
        response.data.data?.token;

      // Check for success message
      const message =
        response.data.loginResult?.MESSAGE ||
        response.data.Message ||
        response.data.message;

      const status =
        response.data.loginResult?.STATUS ||
        response.data.Status ||
        response.data.status;

      console.log("Extracted values:", { token, message, status });

      // Store token if found (both in localStorage and cookie)
      if (token && typeof window !== "undefined") {
        localStorage.setItem("dalilaAuthToken", token);
        this.setCookie("dalilaAuthToken", token, 7); // Cookie expires in 7 days
        console.log("✅ Token stored successfully in localStorage and cookie");
      } else if (!token && message?.includes("Token generated successfully")) {
        console.warn("⚠️ Token generated but not found in expected fields");
        console.log("Full response for debugging:", JSON.stringify(response.data, null, 2));
      } else if (!token) {
        console.warn("⚠️ No token found in response");
      }

      return response.data;
    } catch (error: unknown) {
      console.error("❌ Login API Error:", error);

      if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data as ApiErrorResponse;
        const errorMessage =
          errorData.loginResult?.MESSAGE ||
          errorData.Message ||
          errorData.Error ||
          "Login failed. Please check your credentials.";

        throw new Error(errorMessage);
      }

      throw new Error("An unexpected error occurred during login. Please try again.");
    }
  }

  /**
   * Logout user and clear stored data
   */
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dalilaAuthToken");
      localStorage.removeItem("dalilaRememberedEmail");
      this.removeCookie("dalilaAuthToken");
      console.log("🚪 User logged out successfully");
      window.location.href = "/";
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      // Check both localStorage and cookie
      const localToken = localStorage.getItem("dalilaAuthToken");
      const cookieToken = this.getCookie("dalilaAuthToken");
      return !!(localToken || cookieToken);
    }
    return false;
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dalilaAuthToken") || this.getCookie("dalilaAuthToken");
    }
    return null;
  }
}

export const authService = new AuthService();
export type { LoginRequest, LoginResponse, ApiErrorResponse };