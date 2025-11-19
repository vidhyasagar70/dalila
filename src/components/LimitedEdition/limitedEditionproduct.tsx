"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Gem,

} from "lucide-react";



// Mock types
interface LimitedEditionDiamond {
  STONE_NO: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  CUT?: string;
  POL: string;
  SYM: string;
  LAB: string;
  MP4?: string;
  REAL_IMAGE?: string;
}

interface DiamondData {
  STONE_NO: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  CUT?: string;
  POL: string;
  SYM: string;
  LAB: string;
}

// Mock DiamondDetailView component
function DiamondDetailView({ diamond, onClose }: { diamond: DiamondData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-none max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Diamond Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <div className="space-y-2">
            <p><strong>Stone No:</strong> {diamond.STONE_NO}</p>
            <p><strong>Shape:</strong> {diamond.SHAPE}</p>
            <p><strong>Carats:</strong> {diamond.CARATS}</p>
            <p><strong>Color:</strong> {diamond.COLOR}</p>
            <p><strong>Clarity:</strong> {diamond.CLARITY}</p>
            <p><strong>Cut:</strong> {diamond.CUT || "N/A"}</p>
            <p><strong>Polish:</strong> {diamond.POL}</p>
            <p><strong>Symmetry:</strong> {diamond.SYM}</p>
            <p><strong>Lab:</strong> {diamond.LAB}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LimitedEditionPageProps {
  diamonds: LimitedEditionDiamond[];
  loading: boolean;
  error: string;
  hasLoadedOnce: boolean;
  refreshLimitedEditionDiamonds: () => void;
}

interface LimitedEditionPageProps {
  diamonds: LimitedEditionDiamond[];
  loading: boolean;
  error: string;
  hasLoadedOnce: boolean;
  refreshLimitedEditionDiamonds: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function LimitedEditionPage({
  diamonds,
  loading,
  error,
  hasLoadedOnce,
  refreshLimitedEditionDiamonds,
  isOpen,
  onToggle,
}: LimitedEditionPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedDiamond, setSelectedDiamond] = useState<LimitedEditionDiamond | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(diamonds.length / itemsPerPage);
  const paginatedItems = diamonds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // No selection helpers needed (checkboxes removed)

  return (
    <div className="bg-gray-50">
      <div className="w-full">
        {/* Collapsible Content */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[2000px] opacity-100 mt-6" : "max-h-0 opacity-0"
          } bg-white`}
        >
          {loading ? (
            <div className="bg-white p-12 shadow-md border border-[#FAE9D0] rounded-md flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#FAE9D0] mx-auto" />
                <p className="mt-4 text-gray-600 font-medium">Loading limited edition diamonds...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white p-6 shadow-md border border-[#FAE9D0] rounded-md">
              <div className="p-4 bg-red-50 border border-red-200 rounded-none flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : (
            <div style={{ borderColor: "#FAE9D0" }} className="bg-white p-0 shadow-md border rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#060c3c] text-white">
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-20">Image</th>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-32">Stone No</th>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-20">Lab</th>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-20">Shape</th>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-20">Carat</th>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-20">Color</th>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-20">Clarity</th>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-20">Cut</th>
                      <th className="px-2 py-2 text-left text-xs font-medium border-b border-[#F9E8CD] w-20">Pol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-6 text-gray-500 text-sm">
                          No limited edition diamonds available
                        </td>
                      </tr>
                    ) : (
                      paginatedItems.map((diamond, idx) => (
                        <tr key={diamond.STONE_NO || idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-[#faf6eb]"} border-b border-[#F9E8CD] text-xs`} style={{height:'36px'}}>
                          <td className="px-2 py-1">
                            <div className="w-10 h-10 bg-gray-50 p-0.5 flex items-center justify-center">
                              {diamond.MP4 ? (
                                <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                                  <source src={diamond.MP4} type="video/mp4" />
                                </video>
                              ) : diamond.REAL_IMAGE ? (
                                <img src={diamond.REAL_IMAGE} alt={diamond.STONE_NO} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">No Image</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-2 py-1 text-xs text-[#060c3c] font-medium cursor-pointer hover:text-blue-600 hover:underline" onClick={() => setSelectedDiamond(diamond)}>{diamond.STONE_NO}</td>
                          <td className="px-2 py-1 text-xs text-[#060c3c]">{diamond.LAB || "-"}</td>
                          <td className="px-2 py-1 text-xs text-[#060c3c]">{diamond.SHAPE || "-"}</td>
                          <td className="px-2 py-1 text-xs text-[#060c3c]">{diamond.CARATS || "-"}</td>
                          <td className="px-2 py-1 text-xs text-[#060c3c]">{diamond.COLOR || "-"}</td>
                          <td className="px-2 py-1 text-xs text-[#060c3c]">{diamond.CLARITY || "-"}</td>
                          <td className="px-2 py-1 text-xs text-[#060c3c]">{diamond.CUT || "-"}</td>
                          <td className="px-2 py-1 text-xs text-[#060c3c]">{diamond.POL || "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination Footer */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-2 flex items-center justify-between border-t border-[#F9E8CD]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-6 h-6 flex items-center justify-center text-[#060c3c] hover:bg-[#060c3c]/5 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[22px] h-6 px-1 flex items-center justify-center rounded text-xs font-medium transition-colors ${
                            currentPage === page
                              ? "bg-[#060c3c] text-white"
                              : "text-[#060c3c] hover:bg-[#060c3c]/5"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-6 h-6 flex items-center justify-center text-[#060c3c] hover:bg-[#060c3c]/5 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Diamond Detail View Modal */}
      {selectedDiamond && (
        <DiamondDetailView
          diamond={selectedDiamond as unknown as DiamondData}
          onClose={() => setSelectedDiamond(null)}
        />
      )}
    </div>
  );
}