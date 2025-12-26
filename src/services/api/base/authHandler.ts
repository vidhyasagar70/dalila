/**
 * Authentication Handler ,Manages authentication tokens and user sessions
 */

export const UNAUTHORIZED_EVENT = "unauthorized_access";

// Get authentication token from cookies or localStorage
export const getAuthToken = (): string => {
  // First try to get from cookies
  const cookieToken = getAuthTokenFromCookies();
  if (cookieToken) {
    return cookieToken;
  }

  // Fallback to localStorage
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    return token || "";
  }
  
  return "";
};

// Get auth token from cookies
export const getAuthTokenFromCookies = (): string => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("authToken=")
    );
    if (authCookie) {
      return authCookie.split("=")[1];
    }
  }
  return "";
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return token !== null && token !== undefined && token.trim() !== "";
};

// Set authentication token in localStorage and cookies
export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    // Set in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("authTokenTimestamp", Date.now().toString());
    
    // Also set in cookies for consistent access (readable by frontend)
    document.cookie = `authToken=${token}; path=/; max-age=86400; SameSite=Lax`;
  }
};

// Remove authentication token and clear session
export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenTimestamp");
    localStorage.removeItem("user");
    
    // Clear cookies
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
};

// Handle unauthorized access - dispatch event and clear auth
export const handleUnauthorized = (): void => {
  console.log("Handling unauthorized access...");
  removeAuthToken();

  // Dispatch custom event for unauthorized access
  if (typeof window !== "undefined") {
    const unauthorizedEvent = new CustomEvent(UNAUTHORIZED_EVENT);
    window.dispatchEvent(unauthorizedEvent);
  }
};

// Get current user from storage
export const getCurrentUser = (): Record<string, unknown> | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
  }
  return null;
};

// Set current user in storage
export const setCurrentUser = (user: Record<string, unknown>): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
    
    // Also set in cookies for SSR
    const cookieUser = encodeURIComponent(JSON.stringify(user));
    document.cookie = `user=${cookieUser}; path=/; max-age=86400; SameSite=Lax`;
  }
};


