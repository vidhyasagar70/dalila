import api from "./api";
import { AxiosError } from "axios";

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
  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dalilaAuthToken");
    }
    return null;
  }

  async getStock(filters: Record<string, any> = {}): Promise<DiamondData[]> {
  try {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }
    
    // Build request body with token and filters
    const body: Record<string, any> = { Token: token };
    
    // Add color filter if provided (as array)
    if (filters.COLOR && filters.COLOR.length > 0) {
      body.COLOR = filters.COLOR;
    }
    
    // Add search term if provided
    if (filters.searchTerm) {
      body.searchTerm = filters.searchTerm;
    }

    console.log("🔍 Sending to GetStock:", body);

    const response = await api.post("/GetStock", body);

    const data =
      response.data.GetStockResult?.DATA ||
      response.data.DATA ||
      [];

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("StockService getStock Error:", error);
    throw error;
  }
}
}

export const stockService = new StockService();
