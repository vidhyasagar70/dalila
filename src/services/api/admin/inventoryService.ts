/**
 * Inventory Service ,Handles inventory and supplier management operations (Admin only)
 */

import apiClient from "../base/apiClient";


// Get all diamonds for admin/superadmin
export const getAllInventoryDiamonds = async (params?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const url = `/api/diamonds/admin/search${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await apiClient.get(url);

    return response.data;
  } catch (error) {
    console.error("Get inventory diamonds error:", error);
    throw error;
  }
};

// Search inventory diamonds with filters (Admin)
export const searchInventoryDiamonds = async (filters: {
  source?: string;
  shapes?: string[];
  colors?: string[];
  clarities?: string[];
  minCarats?: number;
  maxCarats?: number;
  page?: number;
  limit?: number;
  searchTerm?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();

    // Add pagination
    if (filters.page) queryParams.append("page", filters.page.toString());
    if (filters.limit) queryParams.append("limit", filters.limit.toString());

    // Add search term
    if (filters.searchTerm) queryParams.append("searchTerm", filters.searchTerm);

    // Add source filter
    if (filters.source) queryParams.append("source", filters.source);

    // Add shape filters
    if (filters.shapes && filters.shapes.length > 0) {
      filters.shapes.forEach((shape) => {
        queryParams.append("SHAPE", shape);
      });
    }

    // Add color filters
    if (filters.colors && filters.colors.length > 0) {
      filters.colors.forEach((color) => {
        queryParams.append("COLOR", color);
      });
    }

    // Add clarity filters
    if (filters.clarities && filters.clarities.length > 0) {
      filters.clarities.forEach((clarity) => {
        queryParams.append("CLARITY", clarity);
      });
    }

    // Add carat range
    if (filters.minCarats !== undefined) {
      queryParams.append("CARATS_MIN", filters.minCarats.toString());
    }
    if (filters.maxCarats !== undefined) {
      queryParams.append("CARATS_MAX", filters.maxCarats.toString());
    }

    const url = `/api/diamonds/admin/search?${queryParams.toString()}`;
    const response = await apiClient.get(url);

    return response.data;
  } catch (error) {
    console.error("Search inventory diamonds error:", error);
    throw error;
  }
};

// Update supplier visibility settings (Admin)
export const updateSupplierVisibility = async (
  supplierName: string,
  isVisible: boolean
) => {
  try {
    const encodedSupplierName = encodeURIComponent(supplierName);
    if (!encodedSupplierName) {
      throw new Error("Supplier name is required");
    }
    const response = await apiClient.put(
      `/api/users/admin/supplier-settings/${encodedSupplierName}`,
      { isVisible }
    );
    return response.data;
  } catch (error) {
    console.error("Update supplier visibility error:", error);
    throw error;
  }
};

// Get suppliers list (Admin)
export const getSuppliers = async () => {
  try {
    const response = await apiClient.get("/api/users/admin/suppliers");
    return response.data;
  } catch (error) {
    console.error("Get suppliers error:", error);
    throw error;
  }
};

// Apply filters to supplier (Admin)
export const applySupplierFilters = async (
  supplierName: string,
  filters: {
    isFilterEnabled: boolean;
    shapes?: string[];
    colors?: string[];
    carats?: {
      min: number;
      max: number;
    };
    cuts?: string[];
    clarities?: string[];
  }
) => {
  try {
    const encodedSupplierName = encodeURIComponent(supplierName);
    if (!encodedSupplierName) {
      throw new Error("Supplier name is required");
    }
    const response = await apiClient.put(
      `/api/users/admin/supplier-settings/${encodedSupplierName}/filters`,
      filters
    );
    return response.data;
  } catch (error) {
    console.error("Apply supplier filters error:", error);
    throw error;
  }
};

// Get applied filters for supplier (Admin)
export const getSupplierFilters = async (supplierName: string) => {
  try {
    const encodedSupplierName = encodeURIComponent(supplierName);
    if (!encodedSupplierName) {
      throw new Error("Supplier name is required");
    }
    const response = await apiClient.get(
      `/api/users/admin/supplier-settings/${encodedSupplierName}/filters`
    );
    return response.data;
  } catch (error) {
    console.error("Get supplier filters error:", error);
    throw error;
  }
};


