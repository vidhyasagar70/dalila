/**
 * Form Service , Handles form submission operations (sell diamond form, etc.)
 */

import apiClient from "../base/apiClient";
import { handleApiError } from "../base/errorHandler";
import type { ApiResponse } from "../types/api.types";

// Submit sell diamond form (Public - no auth required)
export const submitSellDiamondForm = async (
  formData: FormData
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/forms/submit",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Form submission error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message || "Failed to submit form");
  }
};

// Get all form submissions grouped by email (Admin)
export const getGroupedSubmissions = async (params?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const url = queryParams.toString()
      ? `/api/forms/grouped?${queryParams.toString()}`
      : "/api/forms/grouped";

    console.log("Fetching buy form submissions from:", url);

    const response = await apiClient.get(url);

    console.log("Buy form submissions response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get grouped submissions error:", error);
    throw error;
  }
};

// Update form submission status (Admin)
export const updateSubmissionStatus = async (
  submissionId: string,
  status: string
) => {
  try {
    const response = await apiClient.patch(`/api/forms/${submissionId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Update submission status error:", error);
    throw error;
  }
};


