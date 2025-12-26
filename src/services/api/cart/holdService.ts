/**
 * Hold Service ,Handles diamond hold operations
 */

import apiClient from "../base/apiClient";
import type { ApiResponse } from "../types/api.types";

interface HoldItem {
  stoneNo: string;
  diamond: unknown;
  status: string;
  addedAt: string;
  _id: string;
  statusUpdatedAt?: string;
  statusUpdatedBy?: string;
  rejectionReason?: string;
}

interface HoldResponse {
  hold: {
    _id: string;
    userId: string;
    items: HoldItem[];
    createdAt: string;
    updatedAt: string;
  };
  totalItems: number;
}

// Add item to hold
export const addToHold = async (
  stoneNo: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/diamonds/hold/add",
      { stoneNo }
    );
    return response.data;
  } catch (error) {
    console.error("Add to hold error:", error);
    throw error;
  }
};

// Get hold items for current user
export const getHoldItems = async (): Promise<ApiResponse<HoldResponse> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<HoldResponse>>("/api/diamonds/hold");
    return response.data;
  } catch (error) {
    console.error("Get hold items error:", error);
    return null;
  }
};


