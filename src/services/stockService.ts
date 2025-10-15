// services/stockService.ts 
import api from "./api";
import { AxiosError } from "axios";

interface GetStockResponse {
  GetStockResult?: {
    DATA?: DiamondData[];
    MESSAGE?: string;
    SUCCESS?: boolean;
  };
  DATA?: DiamondData[];
  Message?: string;
  Success?: boolean;
}

export interface DiamondData {
  STONE_NO: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  CUT: string;
  POL: string;
  SYM: string;
  FLOUR: string;
  LAB: string;
  REPORT_NO: string;
  RAP_PRICE: string;
  DISC_PER: string;
  NET_RATE: string;
  NET_VALUE: string;
  MEASUREMENTS: string;
  TABLE_PER: string;
  DEPTH_PER: string;
  CROWN_ANGLE: string;
  CROWN_HEIGHT: string;
  PAVILLION_ANGLE: string;
  PAVILLION_HEIGHT: string;
  LOCATION: string;
  COMMENTS_1: string;
  TINGE: string;
  CERTI_PDF: string;
  REAL_IMAGE: string;
  ARROW_IMAGE: string;
  HEART_IMAGE: string;
  DNA: string;
  MP4: string;
  STAGE: string;
  BRANCH: string;
  KEY_TO_SYMBOLS: string;
  REPORT_COMMENTS: string;
  REPORT_DATE: string;
  CLARITY_CHARACTERISTICS: string;
  HA: string;
  [key: string]: any;
}

class StockService {
  /**
   * Get authentication token from localStorage
   */
  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dalilaAuthToken");
    }
    return null;
  }

  /**
   * Fetch all stock data
   */
  async getStock(): Promise<DiamondData[]> {
    try {
      console.log("📊 Fetching stock data via POST...");

      // Get the token
      const token = this.getAuthToken();
      
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      console.log("🔑 Token found, sending request...");

      // POST request to GetStock endpoint with token in body
      const response = await api.post<GetStockResponse>("/GetStock", {
        Token: token
      });

      console.log("✓ Stock API Response received");
      console.log("Response structure:", {
        hasGetStockResult: !!response.data.GetStockResult,
        hasDATA: !!(response.data.GetStockResult?.DATA || response.data.DATA),
        message: response.data.GetStockResult?.MESSAGE || response.data.Message,
        success: response.data.GetStockResult?.SUCCESS || response.data.Success
      });

      // Extract data from various response formats
      const data =
        response.data.GetStockResult?.DATA ||
        response.data.DATA ||
        [];

      const message =
        response.data.GetStockResult?.MESSAGE ||
        response.data.Message ||
        "";

      const success =
        response.data.GetStockResult?.SUCCESS ||
        response.data.Success ||
        false;

      console.log(`✓ API Response: ${message}`);
      console.log(`✓ Success: ${success}`);
      console.log(`✓ Stock data count: ${data.length} diamonds`);

      // Check for token expiration or invalid token
      if (!success) {
        if (message.toLowerCase().includes("token") && 
            (message.toLowerCase().includes("invalid") || 
             message.toLowerCase().includes("expired"))) {
          throw new Error("Authentication token is invalid or expired. Please login again.");
        }
        throw new Error(message || "API returned success=false");
      }

      if (!data || data.length === 0) {
        console.warn("⚠️ API returned empty data array");
        return [];
      }

      return data;
    } catch (error) {
      console.error("❌ Get Stock Error:", error);

      if (error instanceof AxiosError) {
        console.error("Axios Error Details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });

        if (error.response?.status === 401) {
          throw new Error("Authentication failed: Token invalid or expired. Please login again.");
        }

        if (error.response) {
          const errorMessage =
            error.response.data?.GetStockResult?.MESSAGE ||
            error.response.data?.Message ||
            error.response.data?.message ||
            "Failed to fetch stock data";
          throw new Error(errorMessage);
        } else if (error.request) {
          throw new Error("No response from server. Please check your connection.");
        }
      }

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("An unexpected error occurred while fetching stock data.");
    }
  }

  /**
   * Fetch stock data with filters
   */
  async getStockWithFilters(filters: Record<string, any>): Promise<DiamondData[]> {
    try {
      console.log("📊 Fetching filtered stock data...", filters);

      const token = this.getAuthToken();
      
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      // Include token in the request body along with filters
      const response = await api.post<GetStockResponse>("/GetStock", {
        Token: token,
        ...filters
      });

      const data =
        response.data.GetStockResult?.DATA ||
        response.data.DATA ||
        [];

      const message =
        response.data.GetStockResult?.MESSAGE ||
        response.data.Message ||
        "";

      const success =
        response.data.GetStockResult?.SUCCESS ||
        response.data.Success ||
        false;

      if (!success) {
        if (message.toLowerCase().includes("token") && 
            (message.toLowerCase().includes("invalid") || 
             message.toLowerCase().includes("expired"))) {
          throw new Error("Authentication token is invalid or expired. Please login again.");
        }
        throw new Error(message || "API returned success=false");
      }

      console.log(`✓ Filtered stock data fetched: ${data.length} diamonds`);

      return data;
    } catch (error) {
      console.error("❌ Get Filtered Stock Error:", error);
      throw error;
    }
  }

  /**
   * Get single diamond by stone number
   */
  async getDiamondByStoneNo(stoneNo: string): Promise<DiamondData | null> {
    try {
      const allStock = await this.getStock();
      return allStock.find(diamond => diamond.STONE_NO === stoneNo) || null;
    } catch (error) {
      console.error("❌ Get Diamond Error:", error);
      throw error;
    }
  }

  /**
   * Search diamonds by term
   */
  async searchDiamonds(searchTerm: string): Promise<DiamondData[]> {
    try {
      const allStock = await this.getStock();
      const term = searchTerm.toLowerCase();
      
      return allStock.filter(diamond => 
        diamond.STONE_NO?.toLowerCase().includes(term) ||
        diamond.SHAPE?.toLowerCase().includes(term) ||
        diamond.COLOR?.toLowerCase().includes(term) ||
        diamond.CLARITY?.toLowerCase().includes(term) ||
        diamond.REPORT_NO?.toLowerCase().includes(term)
      );
    } catch (error) {
      console.error("❌ Search Diamonds Error:", error);
      throw error;
    }
  }

  /**
   * Verify token is still valid
   */
  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getAuthToken();
      
      if (!token) {
        return false;
      }

      // Try to fetch stock with just token to verify it's valid
      const response = await api.post<GetStockResponse>("/GetStock", {
        Token: token
      });

      const success =
        response.data.GetStockResult?.SUCCESS ||
        response.data.Success ||
        false;

      return success;
    } catch (error) {
      console.error("❌ Token verification failed:", error);
      return false;
    }
  }
}

export const stockService = new StockService();