/**
 * Query Service  , Handles diamond enquiry/query operations
 */

import apiClient from "../base/apiClient";
import { handleApiError } from "../base/errorHandler";
import type { ApiResponse } from "../types/api.types";

interface Query {
  id: string;
  userId: string;
  userEmail: string;
  stoneNo: string;
  diamond: unknown;
  query: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  adminReply?: string;
  repliedAt?: string;
  repliedBy?: string;
}

// Create a query/enquiry
export const createQuery = async (data: {
  stoneNo: string;
  query: string;
}): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/diamonds/queries",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Create query error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

// Get user's queries
export const getUserQueries = async (): Promise<{
  success: boolean;
  message: string;
  data: {
    queries: Query[];
  };
}> => {
  try {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: {
        queries: Query[];
      };
    }>("/api/diamonds/queries");
    return response.data;
  } catch (error) {
    console.error("Get user queries error:", error);
    throw error;
  }
};


