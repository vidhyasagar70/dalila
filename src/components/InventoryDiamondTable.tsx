"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Maven_Pro } from "next/font/google";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import type { InclusionFilters } from "./Filters/InclusionFilter";
import type { KeySymbolFilters } from "./Filters/KeyToSymbolFilter";
import type { PriceLocationFilters } from "./Filters/PriceAndLocationFilter";
import DiamondDetailView from "./DiamondDetailView";
import { formatPrice, formatPercentage } from "@/utils/formatting";
import { DiamondTablePagination } from "./Diamond/shared/DiamondTablePagination";
import { useInventoryData } from "@/hooks/useInventoryData";
import { useInventoryFilters } from "@/hooks/useInventoryFilters";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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

interface MeasurementFilters {
  length?: { from: string; to: string };
  width?: { from: string; to: string };
  depth?: { from: string; to: string };
  table?: { from: string; to: string };
  depthPercent?: { from: string; to: string };
  pavAngle?: { from: string; to: string };
  pavHeight?: { from: string; to: string };
  crAngle?: { from: string; to: string };
  crHeight?: { from: string; to: string };
}

interface FilterProps {
  shapes?: string[];
  colors?: string[];
  clarities?: string[];
  minCarats?: number;
  maxCarats?: number;
  fluors?: string[];
  cut?: string;
  polish?: string;
  symmetry?: string;
  inclusions?: InclusionFilters;
  keySymbols?: KeySymbolFilters;
  priceFilters?: PriceLocationFilters;
  locations?: string[];
  labs?: string[];
  measurements?: MeasurementFilters;
}

interface InventoryTableProps {
  data?: InventoryDiamond[];
  loading?: boolean;
  error?: string | null;
  pageSize?: number;
  viewMode?: "list" | "grid";
  externalPagination?: PaginationData;
  onPageChange?: (page: number, rowsPerPage: number) => void;
  filterSource?: string;
  noPagination?: boolean;
  filterProps?: FilterProps;
}

const InventoryDiamondTable: React.FC<InventoryTableProps> = ({
  data: propData,
  loading: propLoading,
  error: propError,
  pageSize = 10,
  viewMode = "list",
  externalPagination,
  onPageChange,
  filterSource,
  noPagination = false,
  filterProps,
}) => {
  // Track if component is being used with external data (from props)
  const isExternalData = propData !== undefined;
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [sortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [selectedDiamond, setSelectedDiamond] = useState<InventoryDiamond | null>(null);
  
  // Build API filters from filter props
  const { filters } = useInventoryFilters(filterProps || {});
  
  // Create stable filter key for detecting real filter changes
  const filterKey = useMemo(() => JSON.stringify(filters), [filters]);
  
  // Fetch data from API (only when not using external data)
  const {
    data: fetchedData,
    loading: fetchLoading,
    error: fetchError,
    pagination: fetchPagination,
    hasLoadedOnce
  } = useInventoryData({
    filters,
    currentPage: isExternalData ? 1 : currentPage,
    rowsPerPage: isExternalData ? 10 : rowsPerPage,
    sortConfig,
  });
  
  // Determine which data/loading/error to use
  const data = isExternalData ? (propData || []) : fetchedData;
  const loading = isExternalData ? (propLoading ?? false) : fetchLoading;
  const error = isExternalData ? propError : fetchError;
  const pagination = isExternalData ? externalPagination : fetchPagination;

  // Sync external pagination current page if provided
  useEffect(() => {
    if (isExternalData && externalPagination) {
      setCurrentPage(externalPagination.currentPage);
    }
  }, [isExternalData, externalPagination]);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    if (!isExternalData) {
      setCurrentPage(1);
    }
  }, [filterKey, isExternalData]);

  // Calculate paginated data and totals
  const { paginatedData, totalRecords, totalPages } = useMemo(() => {
    let paginated: InventoryDiamond[];
    let total: number;
    let pages: number;

    if (noPagination) {
      // Show all data without pagination
      paginated = filterSource ? data.filter((d) => d.source === filterSource) : data;
      total = paginated.length;
      pages = 1;
    } else {
      // Internal pagination for external data without external pagination
      const isInternalPagination = isExternalData && !externalPagination;
      if (isInternalPagination) {
        const filtered = filterSource ? data.filter((d) => d.source === filterSource) : data;
        const startIdx = (currentPage - 1) * rowsPerPage;
        const endIdx = startIdx + rowsPerPage;
        paginated = filtered.slice(startIdx, endIdx);
        total = filtered.length;
        pages = Math.ceil(total / rowsPerPage);
      } else if (isExternalData) {
        paginated = filterSource ? data.filter((d) => d.source === filterSource) : data;
        // Use totalRecords from pagination if available, otherwise fall back to paginated.length
        total = pagination?.totalRecords || paginated.length;
        pages = pagination?.totalPages || 1;
      } else {
        paginated = data;
        total = pagination?.totalRecords || 0;
        pages = pagination?.totalPages || 1;
      }
    }

    return { paginatedData: paginated, totalRecords: total, totalPages: pages };
  }, [data, filterSource, noPagination, isExternalData, externalPagination, currentPage, rowsPerPage, pagination]);
  
  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    const start = totalRecords === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, totalRecords);
    return { start, end, total: totalRecords };
  }, [currentPage, rowsPerPage, totalRecords]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      
      // If using external data with page change callback, notify parent
      if (isExternalData && onPageChange) {
        onPageChange(page, rowsPerPage);
      }
    }
  };
  
  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setCurrentPage(1);
    
    // Notify parent if using external data
    if (isExternalData && onPageChange) {
      onPageChange(1, newRows);
    }
  };

  const handleStockClick = (diamond: InventoryDiamond) => {
    // Show diamond detail view
    setSelectedDiamond(diamond);
  };

  if (loading && data.length === 0 && !hasLoadedOnce) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#FAF6EB] mx-auto mb-4" />
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  if (error && !hasLoadedOnce) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error loading inventory</p>
          <p className="text-gray-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-3">No inventory data found</p>
          <p className="text-gray-500 text-sm">Try adjusting your filters or check back later</p>
        </div>
      </div>
    );
  }

  // Grid View Rendering
  if (viewMode === "grid") {
    return (
      <>
      <div className={`w-full flex flex-col bg-gray-50 p-4 ${mavenPro.className}`}>
        <div className="bg-white shadow-sm rounded-lg p-6 relative">
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20 rounded-lg">
              <Loader2 className="w-12 h-12 animate-spin text-[#FAF6EB] mx-auto mb-4" />
            </div>
          )}
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
            {paginatedData.map((diamond) => (
              <div
                key={diamond._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleStockClick(diamond)}
              >
                {/* Diamond Image */}
                <div className="relative h-48 bg-gray-100">
                  {diamond.REAL_IMAGE ? (
                    <Image
                      src={diamond.REAL_IMAGE}
                      alt={diamond.STONE_NO}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                {/* Diamond Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2 hover:underline">
                    {diamond.STONE_NO || "N/A"}
                  </h3>
                  
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Source:</span>
                      <span className="font-medium text-gray-900">{diamond.source || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-gray-900">{diamond.LOCATION || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stage:</span>
                      <span className="font-medium text-gray-900">{diamond.STAGE || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shape:</span>
                      <span className="font-medium text-gray-900">{diamond.SHAPE || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carat:</span>
                      <span className="font-medium text-gray-900">{diamond.CARATS || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium text-gray-900">{diamond.COLOR || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clarity:</span>
                      <span className="font-medium text-gray-900">{diamond.CLARITY || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cut:</span>
                      <span className="font-medium text-gray-900">{diamond.CUT || "N/A"}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rap Price:</span>
                        <span className="font-semibold text-gray-900">{formatPrice(diamond.RAP_PRICE || "0")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Disc%:</span>
                        <span className="font-semibold text-red-600">{formatPercentage(diamond.DISC_PER || "0")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Rate:</span>
                        <span className="font-semibold text-gray-900">{formatPrice(diamond.NET_RATE || "0")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Value:</span>
                        <span className="font-semibold text-gray-900">{formatPrice(diamond.NET_VALUE || "0")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination for Grid View */}
          {!noPagination && (
            <DiamondTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              paginationInfo={paginationInfo}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              disabled={loading}
            />
          )}
        </div>
      </div>
      {selectedDiamond && (
        <DiamondDetailView
          diamond={{
            ...selectedDiamond,
            CARATS: parseFloat(selectedDiamond.CARATS) || 0,
            RAP_PRICE: parseFloat(selectedDiamond.RAP_PRICE) || 0,
            DISC_PER: parseFloat(selectedDiamond.DISC_PER) || 0,
            NET_VALUE: parseFloat(selectedDiamond.NET_VALUE) || 0,
            NET_RATE: selectedDiamond.NET_RATE,
            TABLE_PER: selectedDiamond.TABLE_PER ? parseFloat(selectedDiamond.TABLE_PER) : undefined,
            DEPTH_PER: selectedDiamond.DEPTH_PER ? parseFloat(selectedDiamond.DEPTH_PER) : undefined,
            CROWN_ANGLE: selectedDiamond.CROWN_ANGLE ? parseFloat(selectedDiamond.CROWN_ANGLE) : undefined,
            CROWN_HEIGHT: selectedDiamond.CROWN_HEIGHT ? parseFloat(selectedDiamond.CROWN_HEIGHT) : undefined,
            PAVILLION_ANGLE: selectedDiamond.PAVILLION_ANGLE ? parseFloat(selectedDiamond.PAVILLION_ANGLE) : undefined,
            PAVILLION_HEIGHT: selectedDiamond.PAVILLION_HEIGHT ? parseFloat(selectedDiamond.PAVILLION_HEIGHT) : undefined,
            KEY_TO_SYMBOLS: Array.isArray(selectedDiamond.KEY_TO_SYMBOLS) 
              ? selectedDiamond.KEY_TO_SYMBOLS.join(", ") 
              : selectedDiamond.KEY_TO_SYMBOLS,
            STAGE: selectedDiamond.STAGE || 'inventory',
          }}
          onClose={() => setSelectedDiamond(null)}
        />
      )}
      </>
    );
  }

  // Table View Rendering (default)
  return (
    <>
    <div
      className={`w-full flex flex-col bg-gray-50 p-4 ${mavenPro.className}`}
    >
      <div className="bg-white shadow-sm flex flex-col rounded-none relative">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#FAF6EB] mx-auto mb-4" />
          </div>
        )}
        
        <div className={`overflow-x-auto ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
          <table className="w-full border-collapse table-fixed">
            <thead
              className={`bg-[#050c3a] text-white sticky top-0 z-10 ${mavenPro.className}`}
            >
              <tr>
                <th className="w-28 px-2 py-3 text-left text-[14px] font-medium">Stock ID</th>
                <th className="w-28 px-2 py-3 text-left text-[14px] font-medium">Source</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Location</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Stage</th>
                <th className="w-25 px-2 py-3 text-left text-[14px] font-medium">Shape</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Carat</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Color</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Clarity</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Cut</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Polish</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Symmetry</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Fluor</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Lab</th>
                <th className="w-24 px-2 py-3 text-left text-[14px] font-medium">Rap Price</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Disc%</th>
                <th className="w-24 px-2 py-3 text-left text-[14px] font-medium">Net Rate</th>
                <th className="w-24 px-2 py-3 text-left text-[14px] font-medium">Net Value</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Depth%</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Table%</th>
                <th className="w-30 px-2 py-3 text-left text-[14px] font-medium">Measure</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Length</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Width</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Depth</th>
                <th className="w-16 px-2 py-3 text-left text-[14px] font-medium">Ratio</th>
                <th className="w-35 px-2 py-3 text-left text-[14px] font-medium">Key Symbols</th>
                <th className="w-60 px-2 py-3 text-left text-[14px] font-medium">Report Comments</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Crn Angle</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Crn Height</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Pav Angle</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Pav Height</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">CN</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">CW</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">SN</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">SW</th>
                <th className="w-30 px-2 py-3 text-left text-[14px] font-medium">Report No</th>
                <th className="w-24 px-2 py-3 text-left text-[14px] font-medium">Report Date</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Tinge</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Girdle</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Girdle %</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Star</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">H&A</th>
                <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Branch</th>
                {/* <th className="w-30 px-2 py-3 text-left text-[14px] font-medium">DNA</th> */}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((row, idx) => (
                <tr
                  key={row._id}
                  style={{
                    background:
                      idx % 2 === 1
                        ? "linear-gradient(to right, #faf6eb 0%, #faf6eb 100%)"
                        : "white",
                  }}
                  className="transition-opacity"
                >
                  <td 
                    className="px-2 py-1 text-[14px] text-gray-700 font-medium truncate cursor-pointer hover:text-blue-600 hover:underline"
                    onClick={() => handleStockClick(row)}
                  >
                    {row.STONE_NO || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 text-sm truncate">{row.source || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.LOCATION || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.STAGE || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.SHAPE || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.CARATS || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.COLOR || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.CLARITY || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.CUT || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.POL || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.SYM || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.FLOUR || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.LAB || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{formatPrice(row.RAP_PRICE || 0)}</td>
                  <td className="px-2 py-1 text-[14px] font-semibold text-red-600">{formatPercentage(row.DISC_PER || 0)}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{formatPrice(row.NET_RATE || 0)}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 font-medium">{formatPrice(row.NET_VALUE || 0)}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.DEPTH_PER || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.TABLE_PER || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.MEASUREMENTS || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.LENGTH || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.WIDTH || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.DEPTH || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.RATIO || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 truncate">
                    {Array.isArray(row.KEY_TO_SYMBOLS) 
                      ? row.KEY_TO_SYMBOLS.join(", ") || "N/A"
                      : row.KEY_TO_SYMBOLS || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 max-w-[240px]" title={row.REPORT_COMMENTS}>
                    <div className="truncate">{row.REPORT_COMMENTS || "N/A"}</div>
                  </td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.CROWN_ANGLE || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.CROWN_HEIGHT || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.PAVILLION_ANGLE || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.PAVILLION_HEIGHT || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.CN || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.CW || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.SN || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.SW || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700" style={{maxWidth: '220px', whiteSpace: 'normal', wordBreak: 'break-all'}}>
                    {row.REPORT_NO || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 truncate">
                    {row.REPORT_DATE ? new Date(row.REPORT_DATE).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.TINGE || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.GIRDLE || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.GIRDLE_PER || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.STAR || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.HA || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.BRANCH || "N/A"}</td>
                  {/* <td className="px-2 py-1 text-[14px] text-gray-700 truncate">
                    {row.DNA ? (
                      <a 
                        href={row.DNA} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Link
                      </a>
                    ) : "N/A"}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!noPagination && (
          <DiamondTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            paginationInfo={paginationInfo}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            disabled={loading}
          />
        )}
      </div>
    </div>
    {selectedDiamond && (
      <DiamondDetailView
        diamond={{
          ...selectedDiamond,
          CARATS: parseFloat(selectedDiamond.CARATS) || 0,
          RAP_PRICE: parseFloat(selectedDiamond.RAP_PRICE) || 0,
          DISC_PER: parseFloat(selectedDiamond.DISC_PER) || 0,
          NET_VALUE: parseFloat(selectedDiamond.NET_VALUE) || 0,
          NET_RATE: selectedDiamond.NET_RATE,
          TABLE_PER: selectedDiamond.TABLE_PER ? parseFloat(selectedDiamond.TABLE_PER) : undefined,
          DEPTH_PER: selectedDiamond.DEPTH_PER ? parseFloat(selectedDiamond.DEPTH_PER) : undefined,
          CROWN_ANGLE: selectedDiamond.CROWN_ANGLE ? parseFloat(selectedDiamond.CROWN_ANGLE) : undefined,
          CROWN_HEIGHT: selectedDiamond.CROWN_HEIGHT ? parseFloat(selectedDiamond.CROWN_HEIGHT) : undefined,
          PAVILLION_ANGLE: selectedDiamond.PAVILLION_ANGLE ? parseFloat(selectedDiamond.PAVILLION_ANGLE) : undefined,
          PAVILLION_HEIGHT: selectedDiamond.PAVILLION_HEIGHT ? parseFloat(selectedDiamond.PAVILLION_HEIGHT) : undefined,
          KEY_TO_SYMBOLS: Array.isArray(selectedDiamond.KEY_TO_SYMBOLS) 
            ? selectedDiamond.KEY_TO_SYMBOLS.join(", ") 
            : selectedDiamond.KEY_TO_SYMBOLS,
          STAGE: selectedDiamond.STAGE || 'inventory',
        }}
        onClose={() => setSelectedDiamond(null)}
      />
    )}
    </>
  );
};

export default InventoryDiamondTable;
