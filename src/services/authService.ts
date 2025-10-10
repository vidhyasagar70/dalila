import api from "./api";

// Interfaces for Dalila authentication
interface LoginRequest {
    UserName: string;
    Password: string;
}

interface LoginResponse {
    Token?: string;
    token?: string;  // lowercase variant
    Message?: string;
    message?: string;  // lowercase variant
    Status?: string;
    status?: string;  // lowercase variant
    UserData?: any;
    [key: string]: any;  // Allow any other fields
}

interface ApiErrorResponse {
    Message?: string;
    Error?: string;
}

class AuthService {
    /**
     * Login user with email and password
     * Calls the HRC Diamonds API login endpoint
     */
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await api.get<LoginResponse>("/login", {
                params: {
                    UserName: credentials.UserName,
                    Password: credentials.Password,
                },
            });

            console.log("Full API Response:", response.data);

            // Check for token in various possible formats
            const token = response.data.Token || 
                         response.data.token || 
                         response.data.Data?.Token ||
                         response.data.data?.token;

            // Store token if found
            if (token) {
                localStorage.setItem("dalilaAuthToken", token);
                console.log("Token stored successfully:", token);
            } else {
                console.warn("No token found in response:", response.data);
            }

            return response.data;
        } catch (error: any) {
            console.error("Login API Error:", error);
            
            if (error.response) {
                const errorData = error.response.data as ApiErrorResponse;
                throw new Error(
                    errorData.Message ||
                    errorData.Error ||
                    "Login failed. Please check your credentials."
                );
            }
            throw new Error("An unexpected error occurred during login. Please try again.");
        }
    }

    /**
     * Logout user and clear stored data
     */
    logout(): void {
        localStorage.removeItem("dalilaAuthToken");
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem("dalilaAuthToken");
    }

    /**
     * Get stored auth token
     */
    getToken(): string | null {
        return localStorage.getItem("dalilaAuthToken");
    }
}

export const authService = new AuthService();
export type { LoginRequest, LoginResponse, ApiErrorResponse };