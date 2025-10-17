import axios, { AxiosInstance, AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dalila-inventory-service-dev.caratlogic.com";

export const UNAUTHORIZED_EVENT = "unauthorized_access";

// Interfaces
interface FetchParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: Record<string, string | number | boolean>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  userId?: string;

  field?: string;
  searchTerm?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  error?: string;
}

interface PaginationData<T> {
  diamonds?: T[];
  users?: T[];
  quotations?: T[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface FilterOptions {
  colors: string[];
  clarities: string[];
  cuts: string[];
  polishGrades: string[];
  symmetryGrades: string[];
  fluorescenceTypes: string[];
  labs: string[];
  shapes: string[];
  locations: string[];
  stages: string[];
  netRateRange: {
    min: number;
    max: number;
  };
  rapPriceRange: {
    min: number;
    max: number;
  };
  caratRange: {
    min: number;
    max: number;
  };
}

const getAuthToken = (): string => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("authToken");
    return token || "";
  }
  return "";
};

const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return token !== null && token !== undefined && token.trim() !== "";
};

const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("authToken", token);
  }
};

const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("authToken");
  }
};

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Clearing token and redirecting...");
      removeAuthToken();
      
      // Dispatch custom event for unauthorized access
      if (typeof window !== 'undefined') {
        const unauthorizedEvent = new CustomEvent(UNAUTHORIZED_EVENT);
        window.dispatchEvent(unauthorizedEvent);
      }
    }
    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  // GET with query parameters
 get: async <T>(endpoint: string, params: FetchParams = {}): Promise<ApiResponse<T> | null> => {
  try {
    // Skip token check for public endpoints
    const publicEndpoints = ['/health', '/api/diamonds/filter-options', '/api/diamonds/all', '/api/diamonds/search', '/api/diamonds'];
    const isPublicEndpoint = publicEndpoints.some(pub => endpoint.includes(pub));
    
    if (!isPublicEndpoint) {
      const token = getAuthToken();
      if (!token || token.trim() === "") {
        console.error("Unauthorized. Please log in.");
        if (typeof window !== 'undefined') {
          const unauthorizedEvent = new CustomEvent(UNAUTHORIZED_EVENT);
          window.dispatchEvent(unauthorizedEvent);
        }
        return null;
      }
    }

    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([filterKey, filterValue]) => {
            if (filterValue !== undefined && filterValue !== null && filterValue !== "") {
              queryParams.append(filterKey, String(filterValue));
            }
          });
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const url = queryParams.toString() ? `${endpoint}?${queryParams.toString()}` : endpoint;
    console.log("API Request URL:", url); // For debugging
    
    const response = await apiClient.get<ApiResponse<T>>(url);
    return response.data;
  } catch (error) {
    console.error("GET Error:", error);
    return null;
  }
},

  // GET by ID
  getById: async <T>(endpoint: string, id: string | number): Promise<ApiResponse<T> | null> => {
    try {
      const token = getAuthToken();
      if (!token || token.trim() === "") {
        console.error("Unauthorized. Please log in.");
        if (typeof window !== 'undefined') {
          const unauthorizedEvent = new CustomEvent(UNAUTHORIZED_EVENT);
          window.dispatchEvent(unauthorizedEvent);
        }
        return null;
      }

      const response = await apiClient.get<ApiResponse<T>>(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("GET by ID Error:", error);
      return null;
    }
  },

  // POST
  post: async <T>(endpoint: string, data: object): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error: any) {
      console.error("POST Error:", error);
      if (error.response?.data) {
        throw new Error(error.response.data.error || error.response.data.message || "Request failed");
      }
      throw error;
    }
  },

  // PUT
  put: async <T>(endpoint: string, id: string, data: object): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<ApiResponse<T>>(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error("PUT Error:", error);
      if (error.response?.data) {
        throw new Error(error.response.data.error || error.response.data.message || "Request failed");
      }
      throw error;
    }
  },

  // PATCH
  patch: async <T>(endpoint: string, id: string, data: object): Promise<ApiResponse<T> | null> => {
    try {
      const response = await apiClient.patch<ApiResponse<T>>(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("PATCH Error:", error);
      return null;
    }
  },

  // DELETE
  delete: async (endpoint: string, id: string): Promise<ApiResponse<any> | null> => {
    try {
      const response = await apiClient.delete<ApiResponse<any>>(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("DELETE Error:", error);
      return null;
    }
  },
};

// Diamond API endpoints
export const diamondApi = {
  // Get all diamonds with pagination
  getAll: (params?: FetchParams) => api.get<PaginationData<any>>("/api/diamonds", params),

  // Get all diamonds without pagination
  getAllNoPagination: () => api.get<{ diamonds: any[] }>("/api/diamonds/all"),

 search: (filters: {
  color?: string;
  clarity?: string;
  cut?: string;
  shape?: string;
  minCarats?: number;
  maxCarats?: number;
  minPrice?: number;
  maxPrice?: number;
  lab?: string;
  location?: string;
  stage?: string;
  page?: number;
  limit?: number;
  fluorescence?: string;
 
  searchTerm?: string;// This is the search query parameter
}) => {
  // Map lowercase keys to uppercase keys for the API
  const mappedFilters: Record<string, any> = {};
  
  // Map all the filter parameters
  if (filters.shape) mappedFilters.SHAPE = filters.shape;
  if (filters.color) mappedFilters.COLOR = filters.color;
  if (filters.clarity) mappedFilters.CLARITY = filters.clarity;
  if (filters.cut) mappedFilters.CUT = filters.cut;
  if (filters.minCarats) mappedFilters.MIN_CARATS = filters.minCarats;
  if (filters.maxCarats) mappedFilters.MAX_CARATS = filters.maxCarats;
  if (filters.minPrice) mappedFilters.MIN_PRICE = filters.minPrice;
  if (filters.maxPrice) mappedFilters.MAX_PRICE = filters.maxPrice;
  if (filters.lab) mappedFilters.LAB = filters.lab;
  if (filters.location) mappedFilters.LOCATION = filters.location;
  if (filters.stage) mappedFilters.STAGE = filters.stage;
  if (filters.page) mappedFilters.page = filters.page;
  if (filters.fluorescence) mappedFilters.FLOUR = filters.fluorescence;
  if (filters.limit) mappedFilters.limit = filters.limit;
  

  if (filters.searchTerm) mappedFilters.searchTerm= filters.searchTerm;
  
  console.log('Search API called with filters:', mappedFilters);
  
  return api.get<PaginationData<any>>("/api/diamonds/search", mappedFilters as FetchParams);
},
  // Get filter options - Updated to return typed response
  getFilterOptions: async (): Promise<ApiResponse<FilterOptions> | null> => {
    try {
      const response = await apiClient.get<ApiResponse<FilterOptions>>("/api/diamonds/filter-options");
      return response.data;
    } catch (error) {
      console.error("Error fetching filter options:", error);
      return null;
    }
  },

  // Sync diamonds from HRC
  sync: (credentials: { username: string; password: string }) => 
    api.post("/api/diamonds/sync", credentials),

  // Refresh diamonds
  refresh: () => api.post("/api/diamonds/refresh", {}),

  // Email diamonds
  email: (data: { stoneNumbers: string[]; emails: string[] }) => 
    api.post("/api/diamonds/email", data),
};

// Cart API endpoints
export const cartApi = {
  // Add to cart
  add: (stoneNo: string) => api.post("/api/diamonds/cart/add", { stoneNo }),

  // Get cart items
  get: () => api.get<{ cartItems: any[] }>("/api/diamonds/cart"),

  // Get specific cart item
  getByStoneNo: (stoneNo: string) => api.get<{ cartItem: any }>(`/api/diamonds/cart/${stoneNo}`),

  // Remove from cart
  remove: (stoneNo: string) => api.delete("/api/diamonds/cart", stoneNo),

  // Clear cart
  clear: () => api.delete("/api/diamonds/cart", ""),
};

// User API endpoints
export const userApi = {
  // Authentication
  register: async (data: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await api.post<{
        user: {
          id: string;
          username: string;
          email: string;
          firstName: string;
          lastName: string;
          isVerified: boolean;
          kycStatus: string;
        };
      }>("/api/users/register", data);
      return response;
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async (data: { email: string; password: string }) => {
    try {
      const response = await api.post<{ user: any; token: string }>("/api/users/login", data);
      if (response.success && response.data?.token) {
        setAuthToken(response.data.token);
        // Store user data if needed
        if (typeof window !== 'undefined' && response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      return response;
    } catch (error: any) {
      // Enhanced error handling
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/api/users/logout", {});
      removeAuthToken();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      return response;
    } catch (error) {
      // Clear local data even if API call fails
      removeAuthToken();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      throw error;
    }
  },

  // OTP
  sendOtp: (email: string) => api.post("/api/users/otp", { email }),

  verifyOtp: async (data: { email: string; otp: string }) => {
    try {
      console.log("Sending OTP verification request:", data);
      
      const response = await apiClient.post<ApiResponse<any>>(
        "/api/users/verify-otp",
        {
          email: data.email.trim(),
          otp: data.otp.trim()
        }
      );
      
      console.log("OTP verification response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("OTP verification error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        console.error("Full error data:", JSON.stringify(errorData, null, 2));
        
        throw new Error(
          errorData.error || 
          errorData.message || 
          "OTP verification failed"
        );
      }
      
      if (error.response?.status === 500) {
        throw new Error("Server error occurred. The OTP may be incorrect, expired, or there's a database issue. Please try requesting a new OTP.");
      }
      
      if (error.response?.status === 400) {
        throw new Error("Invalid request. Please check your email and OTP.");
      }
      
      if (error.response?.status === 404) {
        throw new Error("User or OTP not found. Please register again or request a new OTP.");
      }
      
      throw new Error("Network error. Please check your connection.");
    }
  },

  // Profile
  getProfile: () => api.get<{ user: any }>("/api/users/profile"),

  updateEmail: (newEmail: string) => api.put("/api/users", "update-email", { newEmail }),

  updatePassword: (data: { email: string; newPassword: string }) => 
    api.put("/api/users", "update-password", data),

  // KYC
  submitCustomerData: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    businessName?: string;
    businessType?: string;
    taxId?: string;
  }) => api.post("/api/users/customer-data", data),

  // Admin endpoints
  getAllUsers: (params?: FetchParams) => api.get<PaginationData<any>>("/api/users", params),

  getUserById: (id: string) => api.getById<{ user: any }>("/api/users", id),

  createUser: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) => api.post("/api/users/create", data),

  updateUser: (id: string, data: object) => api.put("/api/users", id, data),

  deleteUser: (id: string) => api.delete("/api/users", id),

  searchUsers: (params: { q: string; field?: string }) => 
    api.get<{ users: any[] }>("/api/users/search", params as FetchParams),

  getPendingCustomerData: () => 
    api.get<{ pendingUsers: any[] }>("/api/users/customer-data-pending"),

  approveCustomerData: (id: string) => 
    api.post(`/api/users/${id}/approve-customer-data`, {}),

  rejectCustomerData: (id: string, reason: string) => 
    api.post(`/api/users/${id}/reject-customer-data`, { reason }),
};

// Quotation API endpoints
export const quotationApi = {
  // Submit quotation
  submit: (data: {
    stoneNumbers: string[];
    message: string;
    urgency?: string;
  }) => api.post("/api/quotations", data),

  // Get all quotations (admin)
  getAll: (params?: { status?: string; userId?: string }) => 
    api.get<{ quotations: any[] }>("/api/quotations", params as FetchParams),

  // Get quotation by ID (admin)
  getById: (quotationId: string) => 
    api.getById<{ quotation: any }>("/api/quotations", quotationId),

  // Approve quotation (admin)
  approve: (quotationId: string, data: {
    quotedPrice: number;
    validUntil: string;
    notes?: string;
  }) => api.post(`/api/quotations/${quotationId}/approve`, data),

  // Reject quotation (admin)
  reject: (quotationId: string, reason: string) => 
    api.post(`/api/quotations/${quotationId}/reject`, { reason }),
};

// Health check
export const healthCheck = () => api.get<any>("/health");

// Export token management functions
export { getAuthToken, setAuthToken, removeAuthToken, isAuthenticated };

// Export FilterOptions type
export type { FilterOptions };

// Export default
export default {
  api,
  diamondApi,
  cartApi,
  userApi,
  quotationApi,
  healthCheck,
};