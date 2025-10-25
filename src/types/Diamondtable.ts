// types.ts
export interface DiamondData {
  _id: string;
  STONE_NO: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  CUT?: string;
  POL?: string;
  SYM?: string;
  FLOUR?: string;
  LAB: string;
  REPORT_NO: string;
  RAP_PRICE: string;
  DISC_PER: string;
  NET_RATE: string;
  NET_VALUE: string;
  MEASUREMENTS?: string;
  LOCATION: string;
  STAGE: string;
  REAL_IMAGE?: string;
  MP4?: string;
  CERTI_PDF?: string;
  DNA?: string;
  TABLE_PER?: string;
  DEPTH_PER?: string;
  CROWN_ANGLE?: string;
  CROWN_HEIGHT?: string;
  PAVILLION_ANGLE?: string;
  PAVILLION_HEIGHT?: string;
  COMMENTS_1?: string;
  REPORT_COMMENTS?: string;
  TINGE?: string;
  KEY_TO_SYMBOLS?: string;
  REPORT_DATE?: string;
  SW?: string;
  SN?: string;
  CW?: string;
  CN?: string;
  BRANCH?: string;
  HEART_IMAGE?: string;
  ARROW_IMAGE?: string;
  HA?: string;
  CLARITY_CHARACTERISTICS?: string;
  SIZE?: number;
}

export interface TableProps {
  pageSize?: number;
  onRowClick?: (row: DiamondData) => void;
  searchTerm?: string;
  selectedShape?: string;
  selectedColor?: string;
  selectedMinCarat?: string;
  selectedMaxCarat?: string;
  selectedFluor?: string;
  selectedClarity?: string[];
  selectedCut?: string;
  selectedPolish?: string;
  selectedSymmetry?: string;
  onSelectionChange?: (
    selectedIds: string[],
    selectedDiamonds: DiamondData[],
  ) => void;
}

export interface FilterParams {
  shape?: string;
  color?: string;
  minCarats?: number;
  maxCarats?: number;
  fluorescence?: string;
  clarity?: string;
  cut?: string;
  polish?: string;
  symmetry?: string;
  searchTerm?: string;
}
