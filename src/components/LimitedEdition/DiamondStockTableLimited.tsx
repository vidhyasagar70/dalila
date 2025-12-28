import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { diamondApi } from "@/lib/api";
import type {
  DiamondData,
  TableProps,
  FilterParams,
} from "@/types/Diamondtable";
import DiamondDetailView from "../DiamondDetailView";
import { Maven_Pro } from "next/font/google";
import { formatPrice, formatPercentage } from "@/utils/formatting";
import { DiamondTablePagination } from "../Diamond/shared/DiamondTablePagination";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

interface CaratRangeValue { min: string; max: string; }

interface LimitedTableProps extends Omit<TableProps, 'selectedMinCarat' | 'selectedMaxCarat' | 'onSelectionChange'> {
  selectedCaratRanges?: CaratRangeValue[];
}

const DiamondStockTable: React.FC<LimitedTableProps> = ({
  pageSize = 20,
  onRowClick,
  searchTerm = "",
  selectedShape = [],
  selectedColor = [],
  selectedCaratRanges = [],
  selectedFluor = [],
  selectedClarity = [],
  selectedCut = "",
  selectedPolish = "",
  selectedSymmetry = "",
  selectedLabs = [],
}) => {
  const [data, setData] = useState<DiamondData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedDiamond, setSelectedDiamond] = useState<DiamondData | null>(
    null,
  );

  const fetchDiamonds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const hasSearchTerm = searchTerm && searchTerm.trim();
      const hasShapeFilter =
        Array.isArray(selectedShape) && selectedShape.length > 0;
      const hasColorFilter =
        Array.isArray(selectedColor) && selectedColor.length > 0;
      const hasCaratFilter = Array.isArray(selectedCaratRanges) && selectedCaratRanges.length > 0;
      const hasFluorFilter =
        Array.isArray(selectedFluor) && selectedFluor.length > 0;
      const hasClarityFilter = selectedClarity && selectedClarity.length > 0;
      const hasCutFilter = selectedCut && selectedCut.trim();
      const hasPolishFilter = selectedPolish && selectedPolish.trim();
      const hasSymmetryFilter = selectedSymmetry && selectedSymmetry.trim();
      const hasLabFilter = Array.isArray(selectedLabs) && selectedLabs.length > 0;

      // Always use search API - same as DiamondStockTable
      const filters: FilterParams = {
        page: 1,
        limit: 10000, // Get all results for client-side pagination
      };

      if (hasShapeFilter) {
        filters.shape = selectedShape.join(",");
      }
      if (hasColorFilter) {
        filters.color = selectedColor.join(",");
      }
      if (hasCaratFilter) {
        // Use min of all mins and max of all maxes for API filter
        const minVals = selectedCaratRanges.map(r => parseFloat(r.min)).filter(v => !isNaN(v));
        const maxVals = selectedCaratRanges.map(r => parseFloat(r.max)).filter(v => !isNaN(v));
        if (minVals.length > 0) filters.minCarats = Math.min(...minVals);
        if (maxVals.length > 0) filters.maxCarats = Math.max(...maxVals);
      }
      if (hasFluorFilter) {
        filters.fluorescence = selectedFluor.join(",");
      }
      if (hasClarityFilter) {
        filters.clarity = selectedClarity.join(",");
      }
      if (hasCutFilter) {
        filters.cut = selectedCut.trim();
      }
      if (hasPolishFilter) {
        filters.polish = selectedPolish.trim();
      }
      if (hasSymmetryFilter) {
        filters.symmetry = selectedSymmetry.trim();
      }
      if (hasLabFilter) {
        filters.lab = selectedLabs.join(",");
      }
      if (hasSearchTerm) {
        filters.searchTerm = searchTerm.trim();
      }

      // Always use search API (same endpoint as DiamondStockTable)
      const response = await diamondApi.search(filters);

      console.log("Limited Edition API Response:", response);
      console.log("Response success:", response?.success);
      console.log("Response data:", response?.data);
      console.log("Is response.data an array?", Array.isArray(response?.data));

      if (response?.success && response.data) {
        let diamonds: DiamondData[];
        if (Array.isArray(response.data)) {
          diamonds = response.data as unknown as DiamondData[];
          console.log("✅ Diamonds from array:", diamonds.length, "items");
        } else if (
          response.data.diamonds &&
          Array.isArray(response.data.diamonds)
        ) {
          diamonds = response.data.diamonds as unknown as DiamondData[];
          console.log("✅ Diamonds from diamonds property:", diamonds.length, "items");
        } else {
          diamonds = [];
          console.log("❌ No diamonds found in response");
        }
        console.log("Setting data:", diamonds);
        setData(diamonds);
        setCurrentPage(1);
      } else {
        console.log("❌ Response failed or no data");
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching diamonds:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch diamonds",
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [
    searchTerm,
    selectedShape,
    selectedColor,
    selectedCaratRanges,
    selectedFluor,
    selectedClarity,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedLabs,
  ]);

  useEffect(() => {
    fetchDiamonds();
  }, [fetchDiamonds]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    console.log("📊 SortedData - Input data length:", data.length);
    console.log("📊 SortedData - Data sample:", data.slice(0, 2));
    
    if (data.length === 0) {
      console.log("⚠️ No data to sort");
      return data;
    }

    // No client-side filtering needed anymore - all filtering is done server-side
    const filtered = data;
    console.log("📊 Filtered data length:", filtered.length);

    if (!sortConfig) {
      console.log("📊 No sort config, returning filtered data");
      return filtered;
    }

    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof DiamondData];
      const bValue = b[sortConfig.key as keyof DiamondData];

      const aNum = parseFloat(String(aValue));
      const bNum = parseFloat(String(bValue));
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    console.log("📊 Sorted data length:", sorted.length);
    return sorted;
  }, [data, sortConfig]);

  console.log("📄 Pagination - Total Pages:", Math.ceil(sortedData.length / rowsPerPage));
  console.log("📄 Pagination - Current Page:", currentPage);
  console.log("📄 Pagination - Rows Per Page:", rowsPerPage);
  
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  
  console.log("📄 Paginated data length:", paginatedData.length);
  console.log("📄 Paginated data sample:", paginatedData.slice(0, 2));

  const handleStockIdClick = (e: React.MouseEvent, row: DiamondData) => {
    e.stopPropagation();
    if (onRowClick) {
      onRowClick(row);
    } else {
      setSelectedDiamond(row);
    }
  };

  console.log("🔍 Component State - Loading:", loading, "Error:", error, "Data Length:", data.length);

  if (loading) {
    console.log("⏳ Showing loading state");
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#FAF6EB] mx-auto mb-4" />
          <p className="text-gray-600">
            {searchTerm ||
            (Array.isArray(selectedShape) && selectedShape.length > 0)
              ? `Searching diamonds...`
              : "Loading diamonds..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    console.log("❌ Showing error state:", error);
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-2 text-4xl">⚠️</div>
          <p className="text-red-600 font-medium">Error loading diamonds</p>
          <p className="text-gray-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    console.log("⚠️ Showing empty state");
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-3">
            {searchTerm ||
            (Array.isArray(selectedShape) && selectedShape.length > 0) ||
            (Array.isArray(selectedColor) && selectedColor.length > 0) ||
            (Array.isArray(selectedClarity) && selectedClarity.length > 0) ||
            (Array.isArray(selectedFluor) && selectedFluor.length > 0) ||
            (Array.isArray(selectedCaratRanges) && selectedCaratRanges.length > 0)
              ? `No diamonds found matching your filters`
              : "No diamonds found"}
          </p>
        </div>
      </div>
    );
  }

  console.log("✅ Rendering table with data");
  console.log("🎨 Rendering table body with", paginatedData.length, "rows");

  return (
    <>
      <div className={`w-full flex flex-col bg-gray-50 p-4 ${mavenPro.className}`}>
        <div className="bg-white shadow-sm flex flex-col rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead className={`bg-[#050c3a] text-white sticky top-0 z-10 ${mavenPro.className}`}>
                <tr>
                  {/* <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">
                    <button
                      onClick={() => handleSort("REAL_IMAGE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Image
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={`text-white ${sortConfig?.key === "REAL_IMAGE" && sortConfig.direction === "asc" ? "opacity-100" : "opacity-30"}`}
                        />
                        <ChevronDown
                          size={12}
                          className={`text-white ${sortConfig?.key === "REAL_IMAGE" && sortConfig.direction === "desc" ? "opacity-100" : "opacity-30"}`}
                        />
                      </div>
                    </button>
                  </th> */}
                  <th className="w-24 px-2 py-3 text-left text-[14px] font-medium">
                    <button
                      onClick={() => handleSort("STONE_NO")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Stock ID
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "STONE_NO" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "STONE_NO" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Location</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Stage</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Shape</th>
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
                  <th className="w-60 px-2 py-3 text-left text-[14px] font-medium">Comments</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Depth%</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Table%</th>
                  <th className="w-28 px-2 py-3 text-left text-[14px] font-medium">Measure</th>
                  <th className="w-32 px-2 py-3 text-left text-[14px] font-medium">Key Symbols</th>
                  <th className="w-60 px-2 py-3 text-left text-[14px] font-medium">Report Comments</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Crn Angle</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Crn Height</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Pav Angle</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Pav Height</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">CN</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">CW</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">SN</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">SW</th>
                  <th className="w-24 px-2 py-3 text-left text-[14px] font-medium">Report No</th>
                  <th className="w-24 px-2 py-3 text-left text-[14px] font-medium">Report Date</th>
                  <th className="w-20 px-2 py-3 text-left text-[14px] font-medium">Tinge</th>
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
                    {/* <td className="px-1 py-0.5">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="relative w-12 h-12">
                          <div className="w-full h-full bg-gray-100 rounded overflow-hidden">
                            {row.REAL_IMAGE ? (
                              <Image
                                src={row.REAL_IMAGE}
                                alt={row.STONE_NO}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect fill='%23f3f4f6' width='48' height='48'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='10'%3ENo Image%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">
                                No img
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-0.5 -left-0.5">
                            <div
                              className={`w-2.5 h-2.5 rounded-full border border-white ${row.STAGE === "A" ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td> */}
                    <td
                      className="px-2 py-1 text-[14px] text-gray-700 font-medium truncate cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={(e) => handleStockIdClick(e, row)}
                    >
                      {row.STONE_NO}
                    </td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.LOCATION}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.STAGE}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.SHAPE}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.CARATS}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.COLOR}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.CLARITY}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.CUT || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.POL || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.SYM || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.FLOUR || "N/A"}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{row.LAB}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{formatPrice(row.RAP_PRICE)}</td>
                  <td className="px-2 py-1 text-[14px] font-semibold text-red-600">{formatPercentage(row.DISC_PER)}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700">{formatPrice(row.NET_RATE ?? 0)}</td>
                  <td className="px-2 py-1 text-[14px] text-gray-700 font-medium">{formatPrice(row.NET_VALUE ?? 0)}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700 max-w-[240px]" title={row.COMMENTS_1}><div className="truncate">{row.COMMENTS_1 || "N/A"}</div></td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.DEPTH_PER || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.TABLE_PER || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.MEASUREMENTS || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.KEY_TO_SYMBOLS || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700 max-w-[240px]" title={row.REPORT_COMMENTS}><div className="truncate">{row.REPORT_COMMENTS || "N/A"}</div></td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.CROWN_ANGLE || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.CROWN_HEIGHT || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.PAVILLION_ANGLE || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.PAVILLION_HEIGHT || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.CN || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.CW || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.SN || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700">{row.SW || "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.REPORT_NO}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.REPORT_DATE ? new Date(row.REPORT_DATE).toLocaleDateString() : "N/A"}</td>
                    <td className="px-2 py-1 text-[14px] text-gray-700 truncate">{row.TINGE || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DiamondTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            paginationInfo={{
              start: (currentPage - 1) * rowsPerPage + 1,
              end: Math.min(currentPage * rowsPerPage, sortedData.length),
              total: sortedData.length
            }}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(newRows) => {
              setRowsPerPage(newRows);
              setCurrentPage(1);
            }}
            disabled={loading}
          />
        </div>
      </div>
      {selectedDiamond && (
        <DiamondDetailView
          diamond={selectedDiamond}
          onClose={() => setSelectedDiamond(null)}
        />
      )}
    </>
  );
};

export default DiamondStockTable;
