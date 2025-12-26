/**
 * Admin Service , Handles admin-specific operations
 */

import apiClient from "../base/apiClient";
import { getAuthToken } from "../base/authHandler";
import { handleApiError } from "../base/errorHandler";
import type { ApiResponse } from "../types/api.types";
import type { User } from "../types/user.types";


 // Get pending customer data for approval (Admin)
 export const getPendingCustomerData = async (): Promise<
  ApiResponse<
    Array<{
      _id: string;
      id?: string;
      email: string;
      username?: string;
      firstName?: string;
      lastName?: string;
      kycStatus?: string;
      status?: string;
      role?: string;
      customerData?: unknown;
    }>
  > | null
> => {
  try {
    const response = await apiClient.get("/api/users/customer-data-pending");
    return response.data;
  } catch (error) {
    console.error("Get pending customer data error:", error);
    return null;
  }
};

// Approve customer data (Admin)
export const approveCustomerData = async (
  userId: string
): Promise<
  ApiResponse<{
    message: string;
    user: User;
  }>
> => {
  try {
    const response = await apiClient.post(`/api/users/${userId}/approve-customer-data`, {});
    return response.data;
  } catch (error) {
    console.error("Approve customer data error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to approve customer data");
  }
};

// Reject customer data (Admin)
export const rejectCustomerData = async (
  userId: string,
  reason: string
): Promise<
  ApiResponse<{
    message: string;
  }>
> => {
  try {
    const response = await apiClient.post(`/api/users/${userId}/reject-customer-data`, { reason });
    return response.data;
  } catch (error) {
    console.error("Reject customer data error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to reject customer data");
  }
};

// Create admin user (SUPER_ADMIN only)
export const createAdmin = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<
  ApiResponse<{
    message: string;
    user: User;
  }>
> => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const response = await apiClient.post("/api/users/admin/create", data);
    return response.data;
  } catch (error) {
    console.error("Create admin error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to create admin");
  }
};

// Get all admin users (SUPER_ADMIN only)
export const getAdminList = async (params?: { page?: number; limit?: number }) => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/api/users/admin/list?${queryString}`
      : "/api/users/admin/list";

    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Get admin list error:", error);
    throw error;
  }
};

// Delete admin user (SUPER_ADMIN only)
export const deleteAdmin = async (adminId: string) => {
  try {
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      throw new Error("Unauthorized. Please log in.");
    }

    console.log("Deleting admin with ID:", adminId);

    const response = await apiClient.delete(`/api/users/admin/${adminId}`);

    console.log("Delete admin response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delete admin error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to delete admin");
  }
};

// Get all holds with status filter (Admin)
export const getAllHolds = async (status?: string) => {
  try {
    const url = status ? `/api/diamonds/hold/admin/all?status=${status}` : "/api/diamonds/hold/admin/all";
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Get all holds error:", error);
    return null;
  }
};

// Approve hold (Admin)
export const approveHold = async (holdId: string) => {
  try {
    const response = await apiClient.put(`/api/diamonds/hold/${holdId}/approve`, {});
    return response.data;
  } catch (error) {
    console.error("Approve hold error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to approve hold");
  }
};

// Reject hold (Admin)
export const rejectHold = async (holdId: string) => {
  try {
    const response = await apiClient.put(`/api/diamonds/hold/${holdId}/reject`, {});
    return response.data;
  } catch (error) {
    console.error("Reject hold error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to reject hold");
  }
};

// Get all queries (Admin)
export const getAllQueries = async () => {
  try {
    const response = await apiClient.get("/api/diamonds/queries/admin/all");
    return response.data;
  } catch (error) {
    console.error("Get all queries error:", error);
    return null;
  }
};

// Reply to a query (Admin)
export const replyToQuery = async (queryId: string, reply: string) => {
  try {
    const response = await apiClient.put(`/api/diamonds/queries/${queryId}/reply`, { reply });
    return response.data;
  } catch (error) {
    console.error("Reply to query error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to reply to query");
  }
};

// Get all carts (Admin)
export const getAllCarts = async () => {
  try {
    const response = await apiClient.get("/api/diamonds/cart/admin/all");
    return response.data;
  } catch (error) {
    console.error("Get all carts error:", error);
    return null;
  }
};


