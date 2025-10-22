import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { diamondApi } from "@/lib/api";
import type {
  DiamondData,
  TableProps,
  FilterParams,
} from "@/types/Diamondtable";
import DiamondDetailView from "./DiamondDetailView";

const DiamondGridView: React.FC<TableProps> = ({
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
  const [selectedDiamond, setSelectedDiamond] = useState<DiamondData | null>(
    null
  );

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

          response = await diamondApi.search(filters);
        } else {
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
          setData(diamonds);
          setCurrentPage(1);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching diamonds:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch diamonds"
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

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#050c3a] mx-auto mb-4" />
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
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col bg-white p-6">
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
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 flex-wrap">
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

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-6">
          {paginatedData.map((diamond) => (
            <div
              key={diamond._id}
              className="bg-white rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden relative"
              style={{ border: '1px solid #f9e8cd' }}
            >
              {/* Heart Icon */}
              <button className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full transition-colors">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>

              {/* Image Container */}
              <div className="relative w-full h-40 bg-gray-50 p-3">
                {diamond.REAL_IMAGE ? (
                  <Image
                    src={diamond.REAL_IMAGE}
                    alt={diamond.STONE_NO}
                    fill
                    className="object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Diamond Info */}
              <div className="px-4 pb-4 pt-2 space-y-1 bg-white">
                {/* Shape */}
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">Shape: </span>
                  <span className="text-gray-700">{diamond.SHAPE}</span>
                </div>

                {/* Carat */}
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">Carat: </span>
                  <span className="text-gray-700">{diamond.CARATS || diamond.SIZE}</span>
                </div>

                {/* Color */}
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">Color: </span>
                  <span className="text-gray-700">{diamond.COLOR}</span>
                </div>

                {/* Clarity */}
                <div className="text-sm mb-3">
                  <span className="font-semibold text-gray-900">Clarity: </span>
                  <span className="text-gray-700">{diamond.CLARITY}</span>
                </div>

                {/* View Details Button */}
                <div className="flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onRowClick) {
                        onRowClick(diamond);
                      } else {
                        setSelectedDiamond(diamond);
                      }
                    }}
                    className="mt-2 px-4 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 rounded"
                    style={{ border: '1px solid #d1d5db' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer/Pagination */}
        <div
          className="px-6 py-4 bg-white rounded-lg shadow-sm flex items-center justify-between"
          style={{
            background: "linear-gradient(to right, #faf6eb 0%, #faf6eb 100%)",
            border: '0.5px solid #f9e8cd'
          }}
        >
          <div className="text-sm text-gray-700 font-medium">
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, data.length)} of {data.length}{" "}
            diamonds
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 font-medium">Items per page</span>
              <select
                className="border rounded px-3 py-2 text-sm text-gray-800 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#070b3a]"
                style={{ border: '0.5px solid #f9e8cd' }}
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
                className="p-2 rounded hover:bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed text-[#070b3a] transition-colors"
                style={{ border: '0.5px solid #f9e8cd' }}
              >
                <ChevronLeft size={18} className="text-[#070b3a]" />
              </button>

              <span className="text-sm text-gray-700 font-medium px-3">
                Page {currentPage} of {totalPages}
              </span>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[#070b3a] text-white"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                    style={{ border: '0.5px solid #f9e8cd' }}
                  >
                    {page}
                  </button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span className="text-sm text-gray-600 px-1">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? "bg-[#070b3a] text-white"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                    style={{ border: '0.5px solid #f9e8cd' }}
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
                className="p-2 rounded hover:bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed text-[#070b3a] transition-colors"
                style={{ border: '0.5px solid #f9e8cd' }}
              >
                <ChevronRight size={18} className="text-[#070b3a]" />
              </button>
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

export default DiamondGridView;