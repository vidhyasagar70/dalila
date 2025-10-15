// components/DiamondStockTable.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  ExternalLink,
  FileText,
  Play,
} from "lucide-react";

interface DiamondData {
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

interface TableProps {
  data: DiamondData[];
  pageSize?: number;
  loading?: boolean;
  onRowClick?: (row: DiamondData) => void;
}

const DiamondStockTable: React.FC<TableProps> = ({ 
  data = [], 
  pageSize = 20,
  loading = false,
  onRowClick 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedDiamond, setSelectedDiamond] = useState<DiamondData | null>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
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
    currentPage * rowsPerPage
  );

  // Format currency
  const formatCurrency = (value: string | number) => {
    const num = parseFloat(String(value));
    return isNaN(num) ? "N/A" : `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format percentage
  const formatPercentage = (value: string | number) => {
    const num = parseFloat(String(value));
    return isNaN(num) ? "N/A" : `${num.toFixed(2)}%`;
  };

  // Handle view details
  const handleViewDetails = (diamond: DiamondData, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDiamond(diamond);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading diamond data...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No diamond data available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col bg-gray-50 p-4">
        <div className="bg-white shadow-sm flex flex-col rounded-lg">
          {/* Table Container - Full Width */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              {/* Header */}
              <thead className="bg-[#050c3a] text-white sticky top-0 z-10">
                <tr>
                  <th className="w-20 px-2 py-2 text-left text-[12px] font-medium">
                    <span>Image</span>
                  </th>
                  <th className="w-24 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("STONE_NO")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Stock ID
                      {sortConfig?.key === "STONE_NO" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-20 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("SHAPE")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Shape
                      {sortConfig?.key === "SHAPE" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-16 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CARATS")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Carat
                      {sortConfig?.key === "CARATS" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-16 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("COLOR")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Color
                      {sortConfig?.key === "COLOR" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-20 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CLARITY")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Clarity
                      {sortConfig?.key === "CLARITY" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-16 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("CUT")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Cut
                      {sortConfig?.key === "CUT" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-16 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("POL")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Polish
                      {sortConfig?.key === "POL" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-20 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("SYM")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Symmetry
                      {sortConfig?.key === "SYM" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-20 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("FLOUR")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Fluor
                      {sortConfig?.key === "FLOUR" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-16 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("LAB")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Lab
                      {sortConfig?.key === "LAB" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-24 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("REPORT_NO")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Report
                      {sortConfig?.key === "REPORT_NO" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-24 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("RAP_PRICE")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Rap
                      {sortConfig?.key === "RAP_PRICE" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-20 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("DISC_PER")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Disc%
                      {sortConfig?.key === "DISC_PER" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-24 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("NET_RATE")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Rate
                      {sortConfig?.key === "NET_RATE" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-24 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("NET_VALUE")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Value
                      {sortConfig?.key === "NET_VALUE" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-28 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("MEASUREMENTS")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Measure
                      {sortConfig?.key === "MEASUREMENTS" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                  <th className="w-20 px-2 py-2 text-left text-[12px] font-medium">
                    <button
                      onClick={() => handleSort("LOCATION")}
                      className="flex items-center gap-0.5 hover:text-gray-300 transition-colors"
                    >
                      Location
                      {sortConfig?.key === "LOCATION" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {paginatedData.map((row, idx) => (
                  <tr
                    key={`${row.STONE_NO}-${idx}`}
                    onClick={() => onRowClick?.(row)}
                    style={{
                      background:
                        idx % 2 === 1
                          ? "linear-gradient(to right, #faf6eb 0%, #faf6eb 100%)"
                          : "white",
                    }}
                    className="border-b border-gray-100 hover:opacity-80 cursor-pointer transition-opacity"
                  >
                    <td className="px-2 py-2">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="relative w-12 h-12">
                          <div className="w-full h-full bg-gray-100 rounded overflow-hidden">
                            {row.REAL_IMAGE ? (
                              <img
                                src={row.REAL_IMAGE}
                                alt={row.STONE_NO}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/placeholder-diamond.png";
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
                              className={`w-2.5 h-2.5 rounded-full border border-white ${
                                row.STAGE === "A" ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleViewDetails(row, e)}
                          className="mt-1"
                        >
                          <Eye
                            size={12}
                            className="text-gray-600 hover:text-indigo-600 cursor-pointer"
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700 font-medium truncate">
                      {row.STONE_NO}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700 truncate">
                      {row.SHAPE}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.CARATS}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.COLOR}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.CLARITY}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.CUT || "N/A"}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.POL || "N/A"}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.SYM || "N/A"}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.FLOUR || "N/A"}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.LAB}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700 truncate">
                      {row.REPORT_NO}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {formatCurrency(row.RAP_PRICE)}
                    </td>
                    <td className="px-2 py-2 text-[12px] font-semibold text-red-600">
                      {formatPercentage(row.DISC_PER)}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {formatCurrency(row.NET_RATE)}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700 font-medium">
                      {formatCurrency(row.NET_VALUE)}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700 truncate">
                      {row.MEASUREMENTS || "N/A"}
                    </td>
                    <td className="px-2 py-2 text-[12px] text-gray-700">
                      {row.LOCATION}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            className="px-3 py-2 border-t border-gray-200 flex items-center justify-between flex-shrink-0"
            style={{
              background: "linear-gradient(to right, #faf6eb 0%, #faf6eb 100%)",
            }}
          >
            <div className="text-[12px] text-gray-700">
              Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
              {Math.min(currentPage * rowsPerPage, sortedData.length)} of{" "}
              {sortedData.length} diamonds
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-gray-700">Row per page</span>
                <select
                  className="border border-gray-300 rounded px-2 py-0.5 text-[12px] text-gray-800 bg-white cursor-pointer"
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
                  className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-[#070b3a]"
                >
                  <ChevronLeft size={14} className="text-[#070b3a]" />
                </button>

                <span className="ml-2 text-[12px] text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-6 h-6 rounded text-[12px] font-medium ${
                        currentPage === page
                          ? "bg-[#070b3a] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <>
                    <span className="text-[12px] text-gray-600">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-6 h-6 rounded text-[12px] font-medium ${
                        currentPage === totalPages
                          ? "bg-[#070b3a] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
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
                  className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-[#070b3a]"
                >
                  <ChevronRight size={14} className="text-[#070b3a]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDiamond && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDiamond(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Diamond Details - {selectedDiamond.STONE_NO}
                </h2>
                <button
                  onClick={() => setSelectedDiamond(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Images */}
                <div className="space-y-4">
                  {selectedDiamond.REAL_IMAGE && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Diamond Image</h3>
                      <img
                        src={selectedDiamond.REAL_IMAGE}
                        alt="Diamond"
                        className="w-full rounded-lg border"
                      />
                    </div>
                  )}
                  
                  {selectedDiamond.MP4 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Video</h3>
                      <a
                        href={selectedDiamond.MP4}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                      >
                        <Play size={16} />
                        View Video
                      </a>
                    </div>
                  )}

                  {selectedDiamond.CERTI_PDF && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Certificate</h3>
                      <a
                        href={selectedDiamond.CERTI_PDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                      >
                        <FileText size={16} />
                        View Certificate
                      </a>
                    </div>
                  )}

                  {selectedDiamond.DNA && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">DNA Report</h3>
                      <a
                        href={selectedDiamond.DNA}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                      >
                        <ExternalLink size={16} />
                        View DNA Report
                      </a>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Shape</p>
                      <p className="font-medium">{selectedDiamond.SHAPE}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Carat</p>
                      <p className="font-medium">{selectedDiamond.CARATS}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Color</p>
                      <p className="font-medium">{selectedDiamond.COLOR}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Clarity</p>
                      <p className="font-medium">{selectedDiamond.CLARITY}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cut</p>
                      <p className="font-medium">{selectedDiamond.CUT || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Polish</p>
                      <p className="font-medium">{selectedDiamond.POL || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Symmetry</p>
                      <p className="font-medium">{selectedDiamond.SYM || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fluorescence</p>
                      <p className="font-medium">{selectedDiamond.FLOUR || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lab</p>
                      <p className="font-medium">{selectedDiamond.LAB}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Report No</p>
                      <p className="font-medium">{selectedDiamond.REPORT_NO}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Measurements</p>
                      <p className="font-medium">{selectedDiamond.MEASUREMENTS || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium">{selectedDiamond.LOCATION}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Pricing</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Rap Price</p>
                        <p className="font-medium">{formatCurrency(selectedDiamond.RAP_PRICE)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Discount</p>
                        <p className="font-medium text-red-600">{formatPercentage(selectedDiamond.DISC_PER)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Net Rate</p>
                        <p className="font-medium">{formatCurrency(selectedDiamond.NET_RATE)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Net Value</p>
                        <p className="font-medium text-green-600">{formatCurrency(selectedDiamond.NET_VALUE)}</p>
                      </div>
                    </div>
                  </div>

                  {selectedDiamond.TABLE_PER && (
                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Proportions</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Table %</p>
                          <p className="font-medium">{selectedDiamond.TABLE_PER}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Depth %</p>
                          <p className="font-medium">{selectedDiamond.DEPTH_PER || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Crown Angle</p>
                          <p className="font-medium">{selectedDiamond.CROWN_ANGLE || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Crown Height</p>
                          <p className="font-medium">{selectedDiamond.CROWN_HEIGHT || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Pavilion Angle</p>
                          <p className="font-medium">{selectedDiamond.PAVILLION_ANGLE || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Pavilion Height</p>
                          <p className="font-medium">{selectedDiamond.PAVILLION_HEIGHT || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDiamond.COMMENTS_1 && (
                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>
                      <p className="text-sm text-gray-600">{selectedDiamond.COMMENTS_1}</p>
                    </div>
                  )}

                  {selectedDiamond.REPORT_COMMENTS && (
                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Report Comments</h3>
                      <p className="text-sm text-gray-600">{selectedDiamond.REPORT_COMMENTS}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiamondStockTable;