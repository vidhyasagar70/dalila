import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  ExternalLink,
  FileText,
  Play,
  Loader2,
} from "lucide-react";
import { diamondApi } from "@/lib/api";
import type {
  DiamondData,
  TableProps,
  FilterParams,
} from "@/types/Diamondtable";
import DiamondDetailView from "./DiamondDetailView";
const DiamondStockTable: React.FC<TableProps> = ({
  pageSize = 20,
  onRowClick,
  searchTerm = "",
  selectedShape = "",
  selectedColor = "",
  selectedMinCarat = "",
  selectedMaxCarat = "",
  selectedFluor = "",
  selectedClarity = [],
  selectedCut = "",
  selectedPolish = "",
  selectedSymmetry = "",
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
 
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
  const fetchDiamonds = async () => {
    try {
      setLoading(true);
      setError(null);

      const hasSearchTerm = searchTerm && searchTerm.trim();
      const hasShapeFilter =
        selectedShape && selectedShape.trim() && selectedShape !== "ALL";
      const hasColorFilter =
        selectedColor && selectedColor.trim() && selectedColor !== "ALL";
      const hasCaratFilter =
        (selectedMinCarat && selectedMinCarat.trim()) ||
        (selectedMaxCarat && selectedMaxCarat.trim());
      const hasFluorFilter =
        selectedFluor && selectedFluor.trim() && selectedFluor !== "ALL";
      const hasClarityFilter = selectedClarity && selectedClarity.length > 0;
      const hasCutFilter = selectedCut && selectedCut.trim();
      const hasPolishFilter = selectedPolish && selectedPolish.trim();
      const hasSymmetryFilter = selectedSymmetry && selectedSymmetry.trim();

      console.log("Filter checks:", {
        hasSearchTerm,
        hasShapeFilter,
        hasColorFilter,
        hasCaratFilter,
        hasFluorFilter,
        hasClarityFilter,
        hasCutFilter,
        hasPolishFilter,
        hasSymmetryFilter,
      });

      const hasAnyFilter =
        hasShapeFilter ||
        hasColorFilter ||
        hasSearchTerm ||
        hasCaratFilter ||
        hasFluorFilter ||
        hasClarityFilter ||
        hasCutFilter ||
        hasPolishFilter ||
        hasSymmetryFilter;

      console.log("hasAnyFilter:", hasAnyFilter);

      let response;
      if (hasAnyFilter) {
        const filters: FilterParams = {};
        if (hasShapeFilter) filters.shape = selectedShape.trim();
        if (hasColorFilter) filters.color = selectedColor.trim();
        if (hasCaratFilter) {
          if (selectedMinCarat && selectedMinCarat.trim()) {
            filters.minCarats = parseFloat(selectedMinCarat);
          }
          if (selectedMaxCarat && selectedMaxCarat.trim()) {
            filters.maxCarats = parseFloat(selectedMaxCarat);
          }
        }

        if (hasFluorFilter) filters.fluorescence = selectedFluor.trim();
        if (hasClarityFilter) filters.clarity = selectedClarity.join(",");
        if (hasCutFilter) filters.cut = selectedCut.trim();
        if (hasPolishFilter) filters.polish = selectedPolish.trim();
        if (hasSymmetryFilter) filters.symmetry = selectedSymmetry.trim();
        if (hasSearchTerm) filters.searchTerm = searchTerm.trim();

        console.log("Calling API with filters:", filters);
        response = await diamondApi.search(filters);
        console.log("API response:", response);
      } else {
        console.log("Fetching all diamonds (no filters)");
        response = await diamondApi.getAllNoPagination();
      }

      if (response?.success && response.data) {
        let diamonds: DiamondData[];
        if (Array.isArray(response.data)) {
          diamonds = response.data as unknown as DiamondData[];
        } else if (
          response.data.diamonds &&
          Array.isArray(response.data.diamonds)
        ) {
          diamonds = response.data.diamonds as unknown as DiamondData[];
        } else {
          diamonds = [];
        }
        console.log(`Fetched ${diamonds.length} diamonds`);
        setData(diamonds);
        setCurrentPage(1);
      } else {
        console.log("No data received from API");
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
  };

  fetchDiamonds();
}, [
  searchTerm,
  selectedShape,
  selectedColor,
  selectedMinCarat,
  selectedMaxCarat,
  selectedFluor,
  selectedClarity,
  selectedCut,
  selectedPolish,
  selectedSymmetry,
]);

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

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig || data.length === 0) return data;

    const sorted = [...data].sort((a, b) => {
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

    return sorted;
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const formatCurrency = (value: string | number) => {
    const num = parseFloat(String(value));
    return isNaN(num)
      ? "N/A"
      : `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (value: string | number) => {
    const num = parseFloat(String(value));
    return isNaN(num) ? "N/A" : `${num.toFixed(2)}%`;
  };

  const handleViewDetails = (diamond: DiamondData, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDiamond(diamond);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedData.map((row) => row._id));
      setSelectedRows(allIds);
      setSelectAll(true);
    } else {
      setSelectedRows(new Set());
      setSelectAll(false);
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
      setSelectAll(false);
    }
    setSelectedRows(newSelected);
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">
            {searchTerm || selectedShape
              ? `Searching diamonds...`
              : "Loading diamonds..."}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
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

  // No data state
  if (data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-3">
            {searchTerm ||
            selectedShape ||
            selectedColor ||
            selectedClarity.length > 0 ||
            selectedCut ||
            selectedPolish ||
            selectedSymmetry ||
            selectedFluor ||
            selectedMinCarat ||
            selectedMaxCarat
              ? `No diamonds found matching your filters`
              : "No diamonds found"}
          </p>
          {(selectedShape ||
            selectedColor ||
            selectedClarity.length > 0 ||
            selectedCut ||
            selectedPolish ||
            selectedSymmetry ||
            selectedFluor ||
            selectedMinCarat ||
            selectedMaxCarat) && (
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              {selectedShape && selectedShape !== "ALL" && (
                <p>Shape: {selectedShape}</p>
              )}
              {selectedColor && selectedColor !== "ALL" && (
                <p>Color: {selectedColor}</p>
              )}
              {selectedClarity.length > 0 && (
                <p>Clarity: {selectedClarity.join(", ")}</p>
              )}
              {selectedCut && <p>Cut: {selectedCut}</p>}
              {selectedPolish && <p>Polish: {selectedPolish}</p>}
              {selectedSymmetry && <p>Symmetry: {selectedSymmetry}</p>}
              {selectedFluor && selectedFluor !== "ALL" && (
                <p>Fluorescence: {selectedFluor}</p>
              )}
              {(selectedMinCarat || selectedMaxCarat) && (
                <p>
                  Carat Range: {selectedMinCarat || "0"} -{" "}
                  {selectedMaxCarat || "∞"}
                </p>
              )}
              {searchTerm && <p>Search: &quot;{searchTerm}&quot</p>}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex flex-col bg-gray-50 p-4">
        {/* Active Filters Display */}
        {(searchTerm ||
          selectedShape ||
          selectedColor ||
          selectedClarity.length > 0 ||
          selectedCut ||
          selectedPolish ||
          selectedSymmetry ||
          selectedFluor ||
          selectedMinCarat ||
          selectedMaxCarat) && (
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <span className="font-medium">Active Filters:</span>
            {selectedShape && selectedShape !== "ALL" && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Shape: {selectedShape}
              </span>
            )}
            {selectedColor && selectedColor !== "ALL" && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Color: {selectedColor}
              </span>
            )}
            {selectedClarity.length > 0 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Clarity: {selectedClarity.join(", ")}
              </span>
            )}
            {selectedCut && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Cut: {selectedCut}
              </span>
            )}
            {selectedPolish && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Polish: {selectedPolish}
              </span>
            )}
            {selectedSymmetry && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Symmetry: {selectedSymmetry}
              </span>
            )}
            {selectedFluor && selectedFluor !== "ALL" && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Fluorescence: {selectedFluor}
              </span>
            )}
            {(selectedMinCarat || selectedMaxCarat) && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Carat: {selectedMinCarat || "0"} - {selectedMaxCarat || "∞"}
              </span>
            )}
            {searchTerm && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Search: {searchTerm}
              </span>
            )}
          </div>
        )}

        <div className="bg-white shadow-sm flex flex-col rounded-lg">
          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              {/* Header */}
              <thead className="bg-[#050c3a] text-white sticky top-0 z-10">
                <tr>
                  <th className="w-12 px-2 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 cursor-pointer [accent-color:#050C3A]"
                    />
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
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
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
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
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("SHAPE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Shape
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "SHAPE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "SHAPE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-16 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CARATS")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Carat
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CARATS" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CARATS" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-16 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("COLOR")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Color
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "COLOR" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "COLOR" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CLARITY")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Clarity
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CLARITY" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CLARITY" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-16 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CUT")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Cut
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CUT" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CUT" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-16 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("POL")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Polish
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "POL" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "POL" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("SYM")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Symmetry
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "SYM" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "SYM" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("FLOUR")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Fluor
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "FLOUR" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "FLOUR" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-16 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("LAB")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Lab
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "LAB" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "LAB" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("REPORT_NO")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Report No
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "REPORT_NO" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "REPORT_NO" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("REPORT_DATE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Report Date
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "REPORT_DATE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "REPORT_DATE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-28 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("MEASUREMENTS")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Measure
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "MEASUREMENTS" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "MEASUREMENTS" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("TABLE_PER")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Table%
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "TABLE_PER" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "TABLE_PER" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("DEPTH_PER")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Depth%
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "DEPTH_PER" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "DEPTH_PER" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CROWN_ANGLE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Crn Angle
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CROWN_ANGLE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CROWN_ANGLE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CROWN_HEIGHT")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Crn Height
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CROWN_HEIGHT" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CROWN_HEIGHT" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("PAVILLION_ANGLE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Pav Angle
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "PAVILLION_ANGLE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "PAVILLION_ANGLE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("PAVILLION_HEIGHT")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Pav Height
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "PAVILLION_HEIGHT" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "PAVILLION_HEIGHT" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("RAP_PRICE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Rap Price
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "RAP_PRICE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "RAP_PRICE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("DISC_PER")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Disc%
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "DISC_PER" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "DISC_PER" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("NET_RATE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Net Rate
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "NET_RATE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "NET_RATE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("NET_VALUE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Net Value
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "NET_VALUE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "NET_VALUE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("LOCATION")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Location
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "LOCATION" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "LOCATION" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("STAGE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Stage
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "STAGE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "STAGE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("TINGE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Tinge
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "TINGE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "TINGE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CN")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      CN
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CN" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CN" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CW")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      CW
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CW" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CW" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("SN")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      SN
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "SN" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "SN" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("SW")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      SW
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "SW" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "SW" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-32 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("KEY_TO_SYMBOLS")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Key Symbols
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "KEY_TO_SYMBOLS" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "KEY_TO_SYMBOLS" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-60 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("COMMENTS_1")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Comments
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "COMMENTS_1" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "COMMENTS_1" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-60 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("REPORT_COMMENTS")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Report Comments
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "REPORT_COMMENTS" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "REPORT_COMMENTS" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("ARROW_IMAGE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Arrow Img
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "ARROW_IMAGE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "ARROW_IMAGE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("HEART_IMAGE")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Heart Img
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "HEART_IMAGE" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "HEART_IMAGE" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CERTI_PDF")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Certificate
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CERTI_PDF" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CERTI_PDF" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("MP4")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Video
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "MP4" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "MP4" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("DNA")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      DNA
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "DNA" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "DNA" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-24 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("BRANCH")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Branch
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "BRANCH" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "BRANCH" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-32 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CLARITY_CHARACTERISTICS")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      Clarity Char
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "CLARITY_CHARACTERISTICS" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "CLARITY_CHARACTERISTICS" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                  <th className="w-20 px-2 py-3 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("HA")}
                      className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                    >
                      HA
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={12}
                          className={
                            sortConfig?.key === "HA" &&
                            sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortConfig?.key === "HA" &&
                            sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      </div>
                    </button>
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {paginatedData.map((row, idx) => (
                 <tr
                    key={row._id}
                    onClick={() => {
                      if (onRowClick) {
                        onRowClick(row);
                      } else {
                        setSelectedDiamond(row);
                      }
                    }}
                    style={{
                      background:
                        idx % 2 === 1
                          ? "linear-gradient(to right, #faf6eb 0%, #faf6eb 100%)"
                          : "white",
                    }}
                    className="hover:opacity-80 cursor-pointer transition-opacity"
                  >
                    <td className="px-2 py-1 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row._id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleRowSelect(row._id, e.target.checked);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 cursor-pointer [accent-color:#050C3A]"
                      />
                    </td>
                    <td className="px-1 py-0.5">
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
                        {/* <button
                          onClick={(e) => handleViewDetails(row, e)}
                          className="mt-1"
                        >
                          <Eye
                            size={12}
                            className="text-gray-600 hover:text-indigo-600 cursor-pointer"
                          />
                        </button> */}
                      </div>
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700 font-medium truncate">
                      {row.STONE_NO}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700 truncate">
                      {row.SHAPE}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.CARATS}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.COLOR}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.CLARITY}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.CUT || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.POL || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.SYM || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.FLOUR || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.LAB}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700 truncate">
                      {row.REPORT_NO}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700 truncate">
                      {row.REPORT_DATE
                        ? new Date(row.REPORT_DATE).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700 truncate">
                      {row.MEASUREMENTS || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.TABLE_PER || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.DEPTH_PER || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.CROWN_ANGLE || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.CROWN_HEIGHT || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.PAVILLION_ANGLE || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.PAVILLION_HEIGHT || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {formatCurrency(row.RAP_PRICE)}
                    </td>
                    <td className="px-2 py-1 text-[12px] font-semibold text-red-600">
                      {formatPercentage(row.DISC_PER)}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {formatCurrency(row.NET_RATE)}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700 font-medium">
                      {formatCurrency(row.NET_VALUE)}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.LOCATION}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.STAGE}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700 truncate">
                      {row.TINGE || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.CN || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.CW || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.SN || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.SW || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700 truncate">
                      {row.KEY_TO_SYMBOLS || "N/A"}
                    </td>
                    <td
                      className="px-2 py-1 text-[12px] text-gray-700 max-w-[240px]"
                      title={row.COMMENTS_1}
                    >
                      <div className="truncate">{row.COMMENTS_1 || "N/A"}</div>
                    </td>
                    <td
                      className="px-2 py-1 text-[12px] text-gray-700 max-w-[240px]"
                      title={row.REPORT_COMMENTS}
                    >
                      <div className="truncate">
                        {row.REPORT_COMMENTS || "N/A"}
                      </div>
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.ARROW_IMAGE ? (
                        <a
                          href={row.ARROW_IMAGE}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink size={14} className="inline" />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.HEART_IMAGE ? (
                        <a
                          href={row.HEART_IMAGE}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink size={14} className="inline" />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.CERTI_PDF ? (
                        <a
                          href={row.CERTI_PDF}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FileText size={14} className="inline" />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.MP4 ? (
                        <a
                          href={row.MP4}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Play size={14} className="inline" />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.DNA ? (
                        <a
                          href={row.DNA}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 truncate block"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.BRANCH || "N/A"}
                    </td>
                    <td
                      className="px-2 py-1 text-[12px] text-gray-700 truncate"
                      title={row.CLARITY_CHARACTERISTICS}
                    >
                      {row.CLARITY_CHARACTERISTICS || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-[12px] text-gray-700">
                      {row.HA || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {/* Footer */}
          <div
            className="px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-shrink-0"
            style={{
              background: "linear-gradient(to right, #faf6eb 0%, #faf6eb 100%)",
            }}
          >
            <div className="text-sm text-gray-700">
              Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
              {Math.min(currentPage * rowsPerPage, sortedData.length)} of{" "}
              {sortedData.length} diamonds
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Row per page</span>
                <select
                  className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-800 bg-white cursor-pointer"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#070b3a]"
                >
                  <ChevronLeft size={16} className="text-[#070b3a]" />
                </button>

                <span className="text-sm text-gray-700 px-2">
                  Page {currentPage} of {totalPages}
                </span>

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 rounded text-sm font-medium ${currentPage === page ? "bg-[#070b3a] text-white" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      {page}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <>
                    <span className="text-sm text-gray-600">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-7 h-7 rounded text-sm font-medium ${currentPage === totalPages ? "bg-[#070b3a] text-white" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#070b3a]"
                >
                  <ChevronRight size={16} className="text-[#070b3a]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     {/* Detail Modal */}
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
