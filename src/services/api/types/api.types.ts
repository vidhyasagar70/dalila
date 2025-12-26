/**
 * Common API Types , Shared types for API responses and requests
 */

// Generic API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  error?: string;
}

// Pagination metadata
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

// Paginated response
export interface PaginatedResponse<T> {
  diamonds?: T[];
  users?: T[];
  quotations?: T[];
  data?: T[];
  pagination?: PaginationMeta;
}

// Fetch parameters for API requests
export interface FetchParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: Record<string, string | number | boolean>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  userId?: string;
  field?: string;
  searchTerm?: string;
}

// Filter options for diamonds
export interface FilterOptions {
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

// Dashboard 
export interface DashboardStats {
  totalDiamonds: number;
  newlyAddedDiamonds: number;
}


