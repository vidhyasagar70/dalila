// @/types/Diamondtable.ts
import { matchesInclusionFilters, type InclusionFilters } from "../components/InclusionFilter";

export interface DiamondData {
  _id: string;
  STONE_NO: string;
  SHAPE: string;
  CARATS: number;
  COLOR: string;
  MP4?: string; 
  HA?: string;
  CLARITY: string;
  CUT?: string;
  POL?: string;
  SYM?: string;
  FLOUR?: string;
  LAB: string;
  REPORT_NO: string;
  REPORT_DATE?: string;
  MEASUREMENTS?: string;
  TABLE_PER?: number;
  DEPTH_PER?: number;
  CROWN_ANGLE?: number;
  CROWN_HEIGHT?: number;
  PAVILLION_ANGLE?: number;
  PAVILLION_HEIGHT?: number;
  RAP_PRICE: number;
  DISC_PER: number;
  NET_RATE: number;
  NET_VALUE: number;
  LOCATION: string;
  STAGE: string;
  TINGE?: string;
  CN?: string;
  CW?: string;
  SN?: string;
  SW?: string;
  KEY_TO_SYMBOLS?: string;
  COMMENTS_1?: string;
  REPORT_COMMENTS?: string;
  REAL_IMAGE?: string;
  SIZE?: number; // Alternative for CARATS in some components
}

export interface FilterParams {
  shape?: string; // Comma-separated string: "ROUND,PEAR,OVAL"
  color?: string;
  limit?: number;
  page?: number;
  minCarats?: number;
  maxCarats?: number;
  fluorescence?: string;
  clarity?: string; // Comma-separated string
  cut?: string;
  polish?: string;
  symmetry?: string;
  searchTerm?: string;
}

// For DiamondStockTable component
export interface TableProps {
  pageSize?: number;
  onRowClick?: (diamond: DiamondData) => void;
  searchTerm?: string;
  selectedShape?: string[];
  selectedColor?: string[];
  selectedMinCarat?: string;
  selectedMaxCarat?: string;
  selectedFluor?: string[];
  selectedClarity?: string[];
  selectedCut?: string;
  selectedPolish?: string;
  selectedSymmetry?: string;
  onSelectionChange?: (selectedIds: string[], diamonds: DiamondData[]) => void;
  inclusions?: InclusionFilters;
}

// For DiamondGridView component
export interface GridViewProps {
  pageSize?: number;
  onRowClick?: (diamond: DiamondData) => void;
  searchTerm?: string;
  selectedShape?: string[];
  selectedColor?: string[];
  selectedMinCarat?: string;
  selectedMaxCarat?: string;
  selectedFluor?: string[];
  selectedClarity?: string[];
  selectedCut?: string;
  selectedPolish?: string;
  selectedSymmetry?: string;
}

// API Response types
export interface DiamondApiResponse {
  success: boolean;
  data?: DiamondData[] | { diamonds: DiamondData[] };
  message?: string;
}

export interface CartApiResponse {
  success: boolean;
  message?: string;
  data?: {
    [key: string]: unknown;
  };
}
