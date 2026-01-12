/**
 * Diamond Filter Service , Handles diamond search and filtering operations
 */

import apiClient from "../base/apiClient";
import { handleApiError } from "../base/errorHandler";
import type { ApiResponse, PaginatedResponse, FilterOptions } from "../types/api.types";
import type { Diamond, DiamondSearchFilters } from "../types/diamond.types";

/**
 * Get available filter options
 */
export const getFilterOptions = async (): Promise<ApiResponse<FilterOptions> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<FilterOptions>>(
      "/api/diamonds/filter-options"
    );
    return response.data;
  } catch (error) {
    console.error("Get filter options error:", error);
    return null;
  }
};

/**
 * Search diamonds with filters
 */
export const searchDiamonds = async (
  filters: DiamondSearchFilters
): Promise<ApiResponse<PaginatedResponse<Diamond>>> => {
  try {
    const queryParams = buildSearchQuery(filters);
    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/api/diamonds/search?${queryString}`
      : "/api/diamonds/search";

    console.log("Search API called with URL:", endpoint);

    const response = await apiClient.get<ApiResponse<PaginatedResponse<Diamond>>>(endpoint);
    return response.data;
  } catch (error) {
    console.error("Search diamonds error:", error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

/**
 * Build search query parameters from filters
 */
function buildSearchQuery(filters: DiamondSearchFilters): URLSearchParams {
  const queryParams = new URLSearchParams();

  // Helper function to add multiple values as separate query parameters
  const addMultipleParams = (paramName: string, value: string) => {
    if (!value) return;

    const values = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    // Add each value as a separate query parameter for OR logic
    values.forEach((val) => {
      queryParams.append(paramName, val);
    });
  };

  // Handle SHAPE
  if (filters.shape) {
    addMultipleParams("SHAPE", filters.shape);
  }

  // Handle COLOR
  if (filters.color) {
    addMultipleParams("COLOR", filters.color);
  }

  // Handle CLARITY
  if (filters.clarity) {
    addMultipleParams("CLARITY", filters.clarity);
  }

  // Handle CUT
  if (filters.cut) {
    addMultipleParams("CUT", filters.cut);
  }

  // Handle POLISH
  if (filters.polish) {
    addMultipleParams("POL", filters.polish);
  }

  // Handle SYMMETRY
  if (filters.symmetry) {
    addMultipleParams("SYM", filters.symmetry);
  }

  // Handle FLUORESCENCE
  if (filters.fluorescence) {
    addMultipleParams("FLOUR", filters.fluorescence);
  }

  // Handle LOCATION
  if (filters.location) {
    addMultipleParams("LOCATION", filters.location);
  }

  // Handle LAB
  if (filters.lab) {
    addMultipleParams("LAB", filters.lab);
  }

  // Handle INCLUSIONS
  if (filters.CN) {
    addMultipleParams("CN", filters.CN);
  }
  if (filters.CW) {
    addMultipleParams("CW", filters.CW);
  }
  if (filters.SN) {
    addMultipleParams("SN", filters.SN);
  }
  if (filters.SW) {
    addMultipleParams("SW", filters.SW);
  }

  // Handle KEY_TO_SYMBOLS
  if (filters.keyToSymbols) {
    addMultipleParams("KEY_TO_SYMBOLS", filters.keyToSymbols);
  }

  // Handle CARAT RANGE
  if (filters.minCarats !== undefined) {
    queryParams.append("CARATS_MIN", filters.minCarats.toString());
  }
  if (filters.maxCarats !== undefined) {
    queryParams.append("CARATS_MAX", filters.maxCarats.toString());
  }

  // Handle PRICE RANGE
  if (filters.minPrice !== undefined) {
    queryParams.append("MIN_PRICE", filters.minPrice.toString());
  }
  if (filters.maxPrice !== undefined) {
    queryParams.append("MAX_PRICE", filters.maxPrice.toString());
  }

  // Handle STAGE
  if (filters.stage) {
    addMultipleParams("STAGE", filters.stage);
  }

  // Handle NET RATE
  if (filters.netRateMin !== undefined) {
    queryParams.append("NET_RATE_MIN", filters.netRateMin.toString());
  }
  if (filters.netRateMax !== undefined) {
    queryParams.append("NET_RATE_MAX", filters.netRateMax.toString());
  }

  // Handle NET VALUE
  if (filters.netValueMin !== undefined) {
    queryParams.append("NET_VALUE_MIN", filters.netValueMin.toString());
  }
  if (filters.netValueMax !== undefined) {
    queryParams.append("NET_VALUE_MAX", filters.netValueMax.toString());
  }

  // Handle DISCOUNT PERCENTAGE
  if (filters.discPerMin !== undefined) {
    queryParams.append("DISC_PER_MIN", filters.discPerMin.toString());
  }
  if (filters.discPerMax !== undefined) {
    queryParams.append("DISC_PER_MAX", filters.discPerMax.toString());
  }

  // Handle MEASUREMENT FILTERS
  // Length
  if (filters.lengthMin !== undefined) {
    queryParams.append("LENGTH_MIN", filters.lengthMin.toString());
  }
  if (filters.lengthMax !== undefined) {
    queryParams.append("LENGTH_MAX", filters.lengthMax.toString());
  }

  // Width
  if (filters.widthMin !== undefined) {
    queryParams.append("WIDTH_MIN", filters.widthMin.toString());
  }
  if (filters.widthMax !== undefined) {
    queryParams.append("WIDTH_MAX", filters.widthMax.toString());
  }

  // Depth
  if (filters.depthMin !== undefined) {
    queryParams.append("DEPTH_MIN", filters.depthMin.toString());
  }
  if (filters.depthMax !== undefined) {
    queryParams.append("DEPTH_MAX", filters.depthMax.toString());
  }

  // Table %
  if (filters.tablePerMin !== undefined) {
    queryParams.append("TABLE_PER_MIN", filters.tablePerMin.toString());
  }
  if (filters.tablePerMax !== undefined) {
    queryParams.append("TABLE_PER_MAX", filters.tablePerMax.toString());
  }

  // Pavilion Angle
  if (filters.pavillionAngleMin !== undefined) {
    queryParams.append("PAVILLION_ANGLE_MIN", filters.pavillionAngleMin.toString());
  }
  if (filters.pavillionAngleMax !== undefined) {
    queryParams.append("PAVILLION_ANGLE_MAX", filters.pavillionAngleMax.toString());
  }

  // Pavilion Height
  if (filters.pavillionHeightMin !== undefined) {
    queryParams.append("PAVILLION_HEIGHT_MIN", filters.pavillionHeightMin.toString());
  }
  if (filters.pavillionHeightMax !== undefined) {
    queryParams.append("PAVILLION_HEIGHT_MAX", filters.pavillionHeightMax.toString());
  }

  // Depth %
  if (filters.depthPerMin !== undefined) {
    queryParams.append("DEPTH_PER_MIN", filters.depthPerMin.toString());
  }
  if (filters.depthPerMax !== undefined) {
    queryParams.append("DEPTH_PER_MAX", filters.depthPerMax.toString());
  }

  // Crown Angle
  if (filters.crownAngleMin !== undefined) {
    queryParams.append("CROWN_ANGLE_MIN", filters.crownAngleMin.toString());
  }
  if (filters.crownAngleMax !== undefined) {
    queryParams.append("CROWN_ANGLE_MAX", filters.crownAngleMax.toString());
  }

  // Crown Height
  if (filters.crownHeightMin !== undefined) {
    queryParams.append("CROWN_HEIGHT_MIN", filters.crownHeightMin.toString());
  }
  if (filters.crownHeightMax !== undefined) {
    queryParams.append("CROWN_HEIGHT_MAX", filters.crownHeightMax.toString());
  }

  // Handle SEARCH TERM
  if (filters.searchTerm) {
    queryParams.append("searchTerm", filters.searchTerm);
  }

  // Handle PAGINATION
  if (filters.page !== undefined) {
    queryParams.append("page", filters.page.toString());
  }
  if (filters.limit !== undefined) {
    queryParams.append("limit", filters.limit.toString());
  }

  return queryParams;
}


