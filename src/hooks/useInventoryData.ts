import { useState, useEffect, useRef } from 'react';

interface InventoryDiamond {
  _id: string;
  STONE_NO: string;
  source: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  CUT: string;
  POL: string;
  SYM: string;
  FLOUR: string;
  LAB: string;
  LOCATION: string;
  NET_RATE: string;
  DISC_PER: string;
  NET_VALUE: string;
  RAP_PRICE: string;
  DEPTH_PER: string;
  TABLE_PER: string;
  MEASUREMENTS: string;
  REPORT_NO: string;
  REAL_IMAGE: string;
  MP4: string;
  REPORT_COMMENTS?: string;
  REPORT_DATE?: string;
  CROWN_ANGLE?: string;
  CROWN_HEIGHT?: string;
  PAVILLION_ANGLE?: string;
  PAVILLION_HEIGHT?: string;
  CN?: string;
  CW?: string;
  SN?: string;
  SW?: string;
  TINGE?: string;
  LENGTH?: string;
  WIDTH?: string;
  DEPTH?: string;
  GIRDLE?: string;
  GIRDLE_PER?: string;
  STAR?: string;
  RATIO?: string;
  KEY_TO_SYMBOLS?: string | string[];
  ARROW_IMAGE?: string;
  HEART_IMAGE?: string;
  DNA?: string;
  HA?: string;
  BRANCH?: string;
  STAGE?: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface FilterParams {
  [key: string]: string | number | boolean | string[] | number[] | undefined;
}

interface UseInventoryDataProps {
  filters: FilterParams;
  currentPage: number;
  rowsPerPage: number;
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
}

interface UseInventoryDataReturn {
  data: InventoryDiamond[];
  loading: boolean;
  error: string | null;
  pagination: PaginationData | null;
  hasLoadedOnce: boolean;
}

/**
 * Custom hook to fetch inventory diamond data from API
 * Handles loading states, errors, and pagination for inventory management
 */
export const useInventoryData = ({
  filters,
  currentPage,
  rowsPerPage,
  sortConfig
}: UseInventoryDataProps): UseInventoryDataReturn => {
  const [data, setData] = useState<InventoryDiamond[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  
  const prevFetchParamsRef = useRef<string>('');
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    const fetchInventoryData = async () => {
      // Validate page number
      if (currentPage < 1) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Create unique key for current request
        const fetchParamsKey = JSON.stringify({
          ...filters,
          currentPage,
          rowsPerPage,
          sortConfig
        });

        // Skip if same parameters as previous fetch
        if (prevFetchParamsRef.current === fetchParamsKey && hasLoadedOnce.current) {
          setLoading(false);
          return;
        }

        prevFetchParamsRef.current = fetchParamsKey;

        // Build API URL
        const url = new URL('https://dalila-inventory-service-dev.caratlogic.com/api/diamonds/admin/search');
        url.searchParams.append('page', currentPage.toString());
        url.searchParams.append('limit', rowsPerPage.toString());
        
        // Add sort parameters
        if (sortConfig) {
          url.searchParams.append('sortBy', sortConfig.key);
          url.searchParams.append('sortOrder', sortConfig.direction);
        }
        
        // Add filter parameters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(v => url.searchParams.append(key, String(v)));
            } else {
              url.searchParams.append(key, String(value));
            }
          }
        });

        // Call API
        const response = await fetch(url.toString(), {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 500 && currentPage > 1) {
            throw new Error('Page out of bounds');
          }
          throw new Error(`Failed to fetch inventory data: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          setData(result.data);
          setPagination(result.pagination);
          hasLoadedOnce.current = true;
        } else {
          throw new Error('Invalid response format from API');
        }
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError(err instanceof Error ? err.message : 'Failed to load inventory data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [filters, currentPage, rowsPerPage, sortConfig]);

  return {
    data,
    loading,
    error,
    pagination,
    hasLoadedOnce: hasLoadedOnce.current
  };
};



