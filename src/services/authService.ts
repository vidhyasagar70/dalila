// services/authService.ts
import api from "./api";
import { AxiosError } from "axios";

// Interfaces
interface LoginRequest {
  UserName: string;
  Password: string;
}

interface UserData {
  id?: string;
  username?: string;
  email?: string;
  role?: string;
  status?: string;
  [key: string]: unknown;
}

interface LoginResponse {
  loginResult?: {
    MESSAGE?: string;
    STATUS?: string;
    TOKEN?: string;
    USER?: UserData;
    [key: string]: unknown;
  };
  Token?: string;
  token?: string;
  Message?: string;
  message?: string;
  Status?: string;
  status?: string;
  User?: UserData;
  user?: UserData;
  Data?: {
    Token?: string;
    token?: string;
    User?: UserData;
    user?: UserData;
    [key: string]: unknown;
  };
  data?: {
    Token?: string;
    token?: string;
    User?: UserData;
    user?: UserData;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface ApiErrorResponse {
  Message?: string;
  Error?: string;
  error?: string;
  message?: string;
  loginResult?: {
    MESSAGE?: string;
    ERROR?: string;
  };
}

class AuthService {
  private readonly TOKEN_KEY = "dalilaAuthToken";
  private readonly USER_KEY = "dalilaUser";
  private readonly REMEMBER_KEY = "dalilaRememberedEmail";
  private readonly COOKIE_EXPIRY_DAYS = 7;

  /**
   * Set cookie with secure options
   */
  private setCookie(name: string, value: string, days: number = this.COOKIE_EXPIRY_DAYS): void {
    if (typeof window !== "undefined") {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      
      // Use Secure flag in production (requires HTTPS)
      const isProduction = process.env.NODE_ENV === 'production';
      const secureFlag = isProduction ? 'Secure;' : '';
      
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;${secureFlag}`;
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
   * Store authentication data securely
   */
  private storeAuthData(token: string, user?: UserData): void {
    if (typeof window !== "undefined") {
      // Store token in both localStorage and cookie
      localStorage.setItem(this.TOKEN_KEY, token);
      this.setCookie(this.TOKEN_KEY, token, this.COOKIE_EXPIRY_DAYS);

      // Store user data if available
      if (user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      }

      console.log("Authentication data stored successfully");
    }
  }

  /**
   * Clear all authentication data
   */
  private clearAuthData(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      this.removeCookie(this.TOKEN_KEY);
      console.log("Authentication data cleared");
    }
  }

  /**
   * Extract token from various response formats
   */
  private extractToken(response: LoginResponse): string | null {
    return (
      response.loginResult?.TOKEN ||
      response.Token ||
      response.token ||
      response.Data?.Token ||
      response.Data?.token ||
      response.data?.Token ||
      response.data?.token ||
      null
    );
  }

  /**
   * Extract user data from response
   */
  private extractUser(response: LoginResponse): UserData | null {
    return (
      response.loginResult?.USER ||
      response.User ||
      response.user ||
      response.Data?.User ||
      response.Data?.user ||
      response.data?.User ||
      response.data?.user ||
      null
    );
  }

  /**
   * Extract message from response
   */
  private extractMessage(response: LoginResponse): string {
    return (
      response.loginResult?.MESSAGE ||
      response.Message ||
      response.message ||
      "Success"
    );
  }

  /**
   * Extract status from response
   */
  private extractStatus(response: LoginResponse): string {
    return (
      response.loginResult?.STATUS ||
      response.Status ||
      response.status ||
      ""
    );
  }

  /**
   * Check if login was successful
   */
  private isLoginSuccessful(response: LoginResponse, token: string | null): boolean {
    const message = this.extractMessage(response);
    const status = this.extractStatus(response);

    return !!(
      token ||
      message.toLowerCase().includes("token generated") ||
      message.toLowerCase().includes("login successful") ||
      message.toLowerCase().includes("success") ||
      status.toLowerCase() === "success"
    );
  }

  /**
   * Login user with credentials
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log("Attempting login for:", credentials.UserName);

      // Make GET request with query parameters (as per your API structure)
      const response = await api.get<LoginResponse>("/login", {
        params: {
          UserName: credentials.UserName,
          Password: credentials.Password,
        },
      });

      console.log("Login API Response received");

      // Extract data from response
      const token = this.extractToken(response.data);
      const user = this.extractUser(response.data);
      const message = this.extractMessage(response.data);
      const status = this.extractStatus(response.data);

      console.log(" Extracted:", { 
        hasToken: !!token, 
        hasUser: !!user, 
        message, 
        status 
      });

      // Check if login was successful
      if (this.isLoginSuccessful(response.data, token)) {
        if (token) {
          this.storeAuthData(token, user || undefined);
        } else {
          console.warn("Login successful but no token found");
          console.log("Full response:", JSON.stringify(response.data, null, 2));
        }
      } else {
        throw new Error(message || "Login failed");
      }

      return response.data;
    } catch (error: unknown) {
      console.error("Login Error:", error);

      // Handle Axios errors
      if (error instanceof AxiosError) {
        if (error.response) {
          const errorData = error.response.data as ApiErrorResponse;
          const errorMessage =
            errorData.loginResult?.MESSAGE ||
            errorData.loginResult?.ERROR ||
            errorData.Message ||
            errorData.message ||
            errorData.Error ||
            errorData.error ||
            "Login failed. Please check your credentials.";

          throw new Error(errorMessage);
        } else if (error.request) {
          throw new Error("No response from server. Please check your connection.");
        }
      }

      // Handle generic errors
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("An unexpected error occurred during login. Please try again.");
    }
  }

  /**
   * Logout user and clear stored data
   */
  logout(): void {
    console.log("Logging out user");
    
    if (typeof window !== "undefined") {
      // Clear authentication data
      this.clearAuthData();
      
      // Keep remembered email if exists
      // localStorage.removeItem(this.REMEMBER_KEY); // Uncomment to clear on logout
      
      // Redirect to login
      window.location.href = "/login";
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem(this.TOKEN_KEY);
      const cookieToken = this.getCookie(this.TOKEN_KEY);
      const isAuth = !!(localToken || cookieToken);
      
      console.log(" Auth check:", isAuth);
      return isAuth;
    }
    return false;
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY) || this.getCookie(this.TOKEN_KEY);
    }
    return null;
  }

  /**
   * Get stored user data
   */
  getUser(): UserData | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(this.USER_KEY);
      if (userStr) {
        try {
          return JSON.parse(userStr) as UserData;
        } catch (error) {
          console.error("Error parsing user data:", error);
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Save remembered email
   */
  setRememberedEmail(email: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.REMEMBER_KEY, email);
    }
  }

  /**
   * Get remembered email
   */
  getRememberedEmail(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.REMEMBER_KEY);
    }
    return null;
  }

  /**
   * Clear remembered email
   */
  clearRememberedEmail(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.REMEMBER_KEY);
    }
  }

  /**
   * Refresh token (if your API supports it)
   */
  async refreshToken(): Promise<boolean> {
    try {
      const response = await api.post<LoginResponse>("/refresh-token");
      const token = this.extractToken(response.data);
      
      if (token) {
        this.storeAuthData(token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  }
}

export const authService = new AuthService();
export type { LoginRequest, LoginResponse, ApiErrorResponse, UserData };