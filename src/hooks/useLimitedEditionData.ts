import { useState, useEffect, useRef } from "react";
import { diamondApi } from "@/lib/api";
import type { DiamondData, FilterParams } from "@/types/diamond.types";

interface UseLimitedEditionDataProps {
  filters: FilterParams;
  currentPage: number;
  rowsPerPage: number;
  sortConfig?: { key: string; direction: "asc" | "desc" } | null;
}

interface UseLimitedEditionDataReturn {
  data: DiamondData[];
  loading: boolean;
  error: string | null;
  totalRecords: number;
  totalPages: number;
  hasLoadedOnce: boolean;
}

export const useLimitedEditionData = ({
  filters,
  currentPage,
  rowsPerPage,
  sortConfig,
}: UseLimitedEditionDataProps): UseLimitedEditionDataReturn => {
  const [data, setData] = useState<DiamondData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const prevFetchParamsRef = useRef<string | null>(null);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    const fetchLimitedEditionData = async () => {
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
          sortConfig,
        });

        // Skip if same parameters as previous fetch
        if (prevFetchParamsRef.current === fetchParamsKey && hasLoadedOnce.current) {
          setLoading(false);
          return;
        }

        prevFetchParamsRef.current = fetchParamsKey;

        // Build API filters with pagination
        const apiFilters: FilterParams = {
          ...filters,
          page: currentPage,
          limit: rowsPerPage,
        };

        // Add sort parameters if available
        if (sortConfig) {
          apiFilters.sortBy = sortConfig.key;
          apiFilters.sortOrder = sortConfig.direction;
        }

        console.log("🔄 Fetching Limited Edition data with server-side pagination:", apiFilters);

        // Call the API
        const response = await diamondApi.search(apiFilters);

        if (response?.success && response.data) {
          let diamonds: DiamondData[];

          // Extract diamonds array from response
          if (Array.isArray(response.data)) {
            diamonds = response.data as unknown as DiamondData[];
          } else if (response.data.diamonds && Array.isArray(response.data.diamonds)) {
            diamonds = response.data.diamonds as unknown as DiamondData[];
          } else {
            diamonds = [];
          }

          setData(diamonds);
          hasLoadedOnce.current = true;

          // Extract pagination info from response (matching DiamondStockTable pattern)
          const extendedResponse = response as typeof response & {
            pagination?: {
              totalRecords?: number;
              totalPages?: number;
              totalItems?: number;
            };
            totalFilteredRecords?: number;
            total?: number;
            totalPages?: number;
          };

          // Try multiple possible pagination structures
          if (extendedResponse.pagination) {
            // Structure 1: response.pagination object
            const paginationTotal = 
              extendedResponse.pagination.totalRecords ||
              extendedResponse.pagination.totalItems ||
              extendedResponse.totalFilteredRecords ||
              0;
            setTotalRecords(paginationTotal);
            setTotalPages(extendedResponse.pagination.totalPages || Math.ceil(paginationTotal / rowsPerPage));
          } else if (extendedResponse.totalFilteredRecords !== undefined) {
            // Structure 2: response.totalFilteredRecords
            setTotalRecords(extendedResponse.totalFilteredRecords);
            setTotalPages(Math.ceil(extendedResponse.totalFilteredRecords / rowsPerPage));
          } else if (response.data.pagination) {
            // Structure 3: response.data.pagination object
            const dataPagination = response.data.pagination as { totalItems?: number; totalRecords?: number; totalPages?: number };
            const paginationTotal = dataPagination.totalItems || dataPagination.totalRecords || 0;
            setTotalRecords(paginationTotal);
            setTotalPages(dataPagination.totalPages || Math.ceil(paginationTotal / rowsPerPage));
          } else if (extendedResponse.total !== undefined) {
            // Structure 4: response.total and response.totalPages
            setTotalRecords(extendedResponse.total);
            setTotalPages(extendedResponse.totalPages || Math.ceil(extendedResponse.total / rowsPerPage));
          } else {
            // Fallback: use current page data length
            setTotalRecords(diamonds.length);
            setTotalPages(1);
          }

          console.log("✅ Limited Edition API Response:", {
            diamonds: diamonds.length,
            totalRecords: extendedResponse.total || extendedResponse.totalFilteredRecords || diamonds.length,
            totalPages: extendedResponse.totalPages || 1,
            currentPage,
          });
        } else {
          console.log("❌ Response failed or no data");
          setData([]);
          setTotalRecords(0);
          setTotalPages(0);
          hasLoadedOnce.current = true;
        }
      } catch (err) {
        console.error("❌ Error fetching limited edition diamonds:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch diamonds");
        setData([]);
        setTotalRecords(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchLimitedEditionData();
  }, [filters, currentPage, rowsPerPage, sortConfig]);

  return {
    data,
    loading,
    error,
    totalRecords,
    totalPages,
    hasLoadedOnce: hasLoadedOnce.current,
  };
};

