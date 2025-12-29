/**
 * Diamond Service , Handles all diamond-related API operations
 */

import apiClient from "../base/apiClient";
import { handleApiError } from "../base/errorHandler";
import type { ApiResponse, PaginatedResponse, DashboardStats } from "../types/api.types";
import type { Diamond, LimitedEditionDiamond, LimitedEditionFilters } from "../types/diamond.types";

// Get all diamonds with pagination
export const getAllDiamonds = async (params?: {
  page?: number;
  limit?: number;
}): Promise<ApiResponse<PaginatedResponse<Diamond>> | null> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const url = queryParams.toString() ? `/api/diamonds?${queryParams}` : "/api/diamonds";
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Diamond>>>(url);
    
    return response.data;
  } catch (error) {
    console.error("Get all diamonds error:", error);
    return null;
  }
};

// Get diamond by ID
export const getDiamondById = async (id: string): Promise<ApiResponse<Diamond> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<Diamond>>(`/api/diamonds/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get diamond by ID error:", error);
    return null;
  }
};

// Get dashboard statistics
export const getDashboardStats = async (): Promise<ApiResponse<DashboardStats> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<DashboardStats>>("/api/diamonds/dashboard");
    return response.data;
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return null;
  }
};

// Sync diamonds from external API
export const syncDiamonds = async (credentials: {
  username: string;
  password: string;
}): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/diamonds/sync",
      credentials
    );
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    return {
      success: false,
      error: apiError.message,
      message: apiError.message,
    };
  }
};

// Refresh diamonds data
export const refreshDiamonds = async (): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/diamonds/refresh",
      {}
    );
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    return {
      success: false,
      error: apiError.message,
      message: apiError.message,
    };
  }
};

// Email diamond details
export const emailDiamonds = async (data: {
  stoneNumbers: string[];
  emails: string[];
}): Promise<ApiResponse<{
  totalRequested: number;
  totalFound: number;
  totalEmailed: number;
  foundStoneNumbers: string[];
  notFoundStoneNumbers: string[];
  result: string;
}>> => {
  try {
    const response = await apiClient.post<ApiResponse<{
      totalRequested: number;
      totalFound: number;
      totalEmailed: number;
      foundStoneNumbers: string[];
      notFoundStoneNumbers: string[];
      result: string;
    }>>("/api/diamonds/email", data);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

// Get limited edition diamonds
export const getLimitedEditionDiamonds = async (): Promise<
  ApiResponse<{ diamonds: LimitedEditionDiamond[]; count: number }> | null
> => {
  try {
    const response = await apiClient.get<ApiResponse<{ diamonds: LimitedEditionDiamond[]; count: number }>>(
      "/api/diamonds/limited-edition"
    );
    return response.data;
  } catch (error) {
    console.error("Get limited edition diamonds error:", error);
    return null;
  }
};

// Save limited edition filters
export const saveLimitedEditionFilters = async (
  filters: LimitedEditionFilters
): Promise<ApiResponse<{ diamonds: LimitedEditionDiamond[]; count: number }> | null> => {
  try {
    const response = await apiClient.post<ApiResponse<{ diamonds: LimitedEditionDiamond[]; count: number }>>(
      "/api/diamonds/limited-edition",
      filters
    );
    return response.data;
  } catch (error) {
    console.error("Save limited edition filters error:", error);
    return null;
  }
};


