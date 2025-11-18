"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Gem,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";

import { diamondApi } from "@/lib/api";
import { Maven_Pro } from "next/font/google";
import type { LimitedEditionDiamond } from "@/lib/api";
import type { DiamondData } from "@/types/Diamondtable";
import DiamondDetailView from "@/components/DiamondDetailView";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});


interface LimitedEditionPageProps {
  diamonds: LimitedEditionDiamond[];
  loading: boolean;
  error: string;
  hasLoadedOnce: boolean;
  refreshLimitedEditionDiamonds: () => void;
}

export default function LimitedEditionPage({
  diamonds,
  loading,
  error,
  hasLoadedOnce,
  refreshLimitedEditionDiamonds,
}: LimitedEditionPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedDiamond, setSelectedDiamond] = useState<LimitedEditionDiamond | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleToggle = () => {
    if (!isOpen && !hasLoadedOnce) {
      refreshLimitedEditionDiamonds();
    }
    setIsOpen(!isOpen);
  };

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
      <div className="max-w-7xl mx-auto">
        {/* Collapsible Header Button */}
        <button
          onClick={handleToggle}
          style={{ borderColor: "#FAE9D0" }}
          className="w-full bg-white p-6 shadow-md border hover:bg-gray-50 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Gem className="w-8 h-8 text-[#050C3A]" />
              <div className="text-left">
                <h2
                  className={`text-2xl font-bold text-gray-900 ${mavenPro.className}`}
                >
                  Limited Edition Diamonds
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Click here to see our exclusive collection
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {hasLoadedOnce && (
                <span className="bg-[#050C3A] text-white px-4 py-2 text-sm font-semibold">
                  {diamonds.length} Diamonds
                </span>
              )}
              {isOpen ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </div>
          </div>
        </button>

        {/* Collapsible Content */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[2000px] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          {loading ? (
            <div className="bg-white p-12 shadow-md border border-[#FAE9D0] flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#FAE9D0] mx-auto" />
                <p className="mt-4 text-gray-600 font-medium">
                  Loading limited edition diamonds...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white p-6 shadow-md border border-[#FAE9D0]">
              <div className="p-4 bg-red-50 border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Diamond Carousel */}
              <div
                style={{ borderColor: "#FAE9D0" }}
                className="bg-white p-8 shadow-md border mb-6"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevSlide}
                    disabled={diamonds.length <= 3}
                    className="p-2 bg-[#FAE9D0] hover:bg-[#e5d5b5] transition-all duration-300 flex-shrink-0 self-center z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                            className="bg-white p-4 w-56 flex-shrink-0 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-left border border-transparent hover:border-[#FAE9D0]"
                          >
                            <div className="bg-gray-50 p-6 mb-4 flex items-center justify-center">
                              {diamond.MP4 ? (
                                <video
                                  className="w-32 h-32 object-cover"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                >
                                  <source src={diamond.MP4} type="video/mp4" />
                                </video>
                              ) : diamond.REAL_IMAGE ? (
                                <Image
                                  src={diamond.REAL_IMAGE}
                                  alt={diamond.STONE_NO}
                                  width={128}
                                  height={128}
                                  className="w-32 h-32 object-cover"
                                />
                              ) : (
                                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400">No Image</span>
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
                                <span>-{diamond.CUT || "N/A"}</span>
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
                    className="p-2 bg-[#FAE9D0] hover:bg-[#e5d5b5] transition-all duration-300 flex-shrink-0 self-center z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                        className={`h-2 transition-all duration-500 ease-out ${
                          currentSlide === index
                            ? "w-8 bg-[#FAE9D0]"
                            : "w-2 bg-gray-300 hover:bg-gray-400 hover:w-4"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Info Section */}
              <div className="grid grid-cols-3 gap-6">
                <div
                  style={{ borderColor: "#FAE9D0" }}
                  className="bg-white p-6 shadow-md border text-center"
                >
                  <h3
                    className={`text-xl font-bold text-gray-900 mb-2 ${mavenPro.className}`}
                  >
                    Exclusive Collection
                  </h3>
                  <p className="text-gray-600">
                    Handpicked rare diamonds with exceptional quality
                  </p>
                </div>

                <div
                  style={{ borderColor: "#FAE9D0" }}
                  className="bg-white p-6 shadow-md border text-center"
                >
                  <h3
                    className={`text-xl font-bold text-gray-900 mb-2 ${mavenPro.className}`}
                  >
                    Certified Authenticity
                  </h3>
                  <p className="text-gray-600">
                    All diamonds come with official lab certifications
                  </p>
                </div>

                <div
                  style={{ borderColor: "#FAE9D0" }}
                  className="bg-white p-6 shadow-md border text-center"
                >
                  <h3
                    className={`text-xl font-bold text-gray-900 mb-2 ${mavenPro.className}`}
                  >
                    Premium Service
                  </h3>
                  <p className="text-gray-600">
                    Expert guidance and personalized assistance
                  </p>
                </div>
              </div>
            </>
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