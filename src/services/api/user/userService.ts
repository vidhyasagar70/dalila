/**
 * User Service ,  Handles user  management operations
 */

import apiClient from "../base/apiClient";
import { handleApiError } from "../base/errorHandler";
import type { ApiResponse, PaginatedResponse, FetchParams } from "../types/api.types";
import type { User, CustomerData } from "../types/user.types";

// Get user profile
export const getProfile = async (): Promise<ApiResponse<{ user: User }>> => {
  try {
    const response = await apiClient.get<ApiResponse<{ user: User }>>("/api/users/profile");
    return response.data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
};

// Submit customer data for KYC
export const submitCustomerData = async (data: CustomerData & { email?: string }): Promise<
  ApiResponse<{
    message: string;
    user: User;
  }>
> => {
  try {
    console.log("Submitting customer data:", JSON.stringify(data, null, 2));

    const response = await apiClient.post<
      ApiResponse<{
        message: string;
        user: User;
      }>
    >("/api/users/customer-data", data);

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Submit error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to submit customer data");
  }
};

// Get all users (Admin only)
export const getAllUsers = async (params?: FetchParams): Promise<ApiResponse<PaginatedResponse<User>> | null> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const url = queryParams.toString() ? `/api/users?${queryParams}` : "/api/users";
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(url);
    
    return response.data;
  } catch (error) {
    console.error("Get all users error:", error);
    return null;
  }
};

// Get user by ID (Admin only)
export const getUserById = async (id: string): Promise<ApiResponse<{ user: User }> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<{ user: User }>>(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get user by ID error:", error);
    return null;
  }
};

// Update user (Admin only)
export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<ApiResponse<{ user: User }>> => {
  try {
    const response = await apiClient.put<ApiResponse<{ user: User }>>(
      `/api/users/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

// Delete user (Admin only)
export const deleteUser = async (id: string): Promise<ApiResponse<{ message: string }> | null> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete user error:", error);
    return null;
  }
};

// Search users (Admin only)
export const searchUsers = async (params: {
  q: string;
  field?: string;
}): Promise<ApiResponse<{ users: User[] }> | null> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("q", params.q);
    if (params.field) queryParams.append("field", params.field);

    const response = await apiClient.get<ApiResponse<{ users: User[] }>>(
      `/api/users/search?${queryParams}`
    );
    return response.data;
  } catch (error) {
    console.error("Search users error:", error);
    return null;
  }
};

// Submit contact form
export const submitContactForm = async (data: {
  email: string;
  name: string;
  phoneNo: string;
  message: string;
}): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/users/contact",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Contact form submission error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to submit contact form");
  }
};


