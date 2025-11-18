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

  // Auto-play carousel effect
  useEffect(() => {
    if (!isAutoPlaying || diamonds.length <= 3 || !isOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % Math.max(1, diamonds.length - 2)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, diamonds.length, isOpen]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev + 1) % Math.max(1, diamonds.length - 2)
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(1, diamonds.length - 2)) %
        Math.max(1, diamonds.length - 2)
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

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
                <p className="mt-4 text-gray-600 font-medium">
                  Loading limited edition diamonds...
                </p>
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
            <div
              style={{ borderColor: "#FAE9D0" }}
              className="bg-white p-8 shadow-md border rounded-none"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={prevSlide}
                  disabled={diamonds.length <= 3}
                  className="p-2 bg-[#FAE9D0] hover:bg-[#e5d5b5] rounded-none transition-all duration-300 flex-shrink-0 self-center z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex gap-4 flex-1 justify-center items-center overflow-hidden relative px-4">
                  {diamonds.length > 0 ? (
                    <div
                      className="flex gap-4 transition-all duration-700 ease-out"
                      style={{
                        transform: `translateX(-${currentSlide * (224 + 16)}px)`,
                      }}
                    >
                      {diamonds.map((diamond, index) => (
                        <button
                          key={diamond.STONE_NO || index}
                          onClick={() => setSelectedDiamond(diamond)}
                          className="bg-white p-4 w-56 flex-shrink-0 rounded-none hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-left border border-transparent hover:border-[#FAE9D0]"
                        >
                          <div className="bg-gray-50 p-6 mb-4 rounded-none flex items-center justify-center">
                            {diamond.MP4 ? (
                              <video
                                className="w-32 h-32 object-cover rounded-none"
                                autoPlay
                                loop
                                muted
                                playsInline
                              >
                                <source src={diamond.MP4} type="video/mp4" />
                              </video>
                            ) : diamond.REAL_IMAGE ? (
                              <img
                                src={diamond.REAL_IMAGE}
                                alt={diamond.STONE_NO}
                                className="w-32 h-32 object-cover rounded-none"
                              />
                            ) : (
                              <div className="w-32 h-32 bg-gray-200 rounded-none flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="text-center space-y-2">
                            <div className="flex justify-center gap-2 text-sm font-medium text-gray-900">
                              <span>{diamond.SHAPE}</span>
                              <span>{diamond.CARATS}</span>
                              <span>{diamond.COLOR}</span>
                              <span>{diamond.CLARITY}</span>
                            </div>
                            <div className="flex justify-center gap-2 text-sm text-gray-600">
                              <span>{diamond.CUT || "N/A"}</span>
                              <span>{diamond.POL}</span>
                              <span>{diamond.SYM}</span>
                              <span>{diamond.LAB}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-20">
                      <Gem className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-xl">No limited edition diamonds available</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={nextSlide}
                  disabled={diamonds.length <= 3}
                  className="p-2 bg-[#FAE9D0] hover:bg-[#e5d5b5] rounded-none transition-all duration-300 flex-shrink-0 self-center z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Carousel Indicators */}
              {diamonds.length > 3 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({
                    length: Math.ceil(diamonds.length - 2),
                  }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentSlide(index);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }}
                      className={`h-2 rounded-none transition-all duration-500 ease-out ${
                        currentSlide === index
                          ? "w-8 bg-[#FAE9D0]"
                          : "w-2 bg-gray-300 hover:bg-gray-400 hover:w-4"
                      }`}
                    />
                  ))}
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