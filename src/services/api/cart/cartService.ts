/**
 * Cart Service , Handles shopping cart operations
 */

import apiClient from "../base/apiClient";
import type { ApiResponse } from "../types/api.types";
import type { CartResponse } from "../types/user.types";

// Add item to cart
export const addToCart = async (
  stoneNo: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/api/diamonds/cart/add",
      { stoneNo }
    );
    return response.data;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};

// Get cart items
export const getCart = async (): Promise<ApiResponse<CartResponse> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<CartResponse>>("/api/diamonds/cart");
    return response.data;
  } catch (error) {
    console.error("Get cart error:", error);
    return null;
  }
};

// Remove item from cart
export const removeFromCart = async (
  stoneNo: string
): Promise<ApiResponse<{ message: string }> | null> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/api/diamonds/cart/${stoneNo}`
    );
    return response.data;
  } catch (error) {
    console.error("Remove from cart error:", error);
    return null;
  }
};

// Clear entire cart
export const clearCart = async (): Promise<ApiResponse<{ message: string }> | null> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      "/api/diamonds/cart"
    );
    return response.data;
  } catch (error) {
    console.error("Clear cart error:", error);
    return null;
  }
};


