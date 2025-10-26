"use client";
import React from "react";
import Image from "next/image";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const STATIC_CLARITY_OPTIONS = [
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "SI3",
  "I1",
  "I2",
  "I3",
];

const STATIC_SPECIAL_OPTIONS = ["3EX", "EX-", "VG+", "VG-"];

// Updated mapping for special grades with arrays to support multiple values
const SPECIAL_GRADE_MAPPING: Record<
  string,
  { cut: string[]; polish: string[]; symmetry: string[] }
> = {
  "3EX": { cut: ["EX"], polish: ["EX"], symmetry: ["EX"] },
  "EX-": { cut: ["EX"], polish: ["EX", "VG"], symmetry: ["EX", "VG"] },
  "VG+": { cut: ["VG"], polish: ["VG", "EX"], symmetry: ["VG", "EX"] },
  "VG-": { cut: ["VG"], polish: ["VG", "GD"], symmetry: ["VG", "GD"] },
};

interface ClarityFilterProps {
  selectedClarity: string[];
  selectedSpecial: string;
  selectedCut: string;
  selectedPolish: string;
  selectedSymmetry: string;
  onClarityChange: (clarity: string[]) => void;
  onSpecialChange: (special: string) => void;
  onCutChange: (cut: string) => void;
  onPolishChange: (polish: string) => void;
  onSymmetryChange: (symmetry: string) => void;
}

export default function ClarityFilter({
  selectedClarity,
  selectedSpecial,
  selectedCut,
  selectedPolish,
  selectedSymmetry,
  onClarityChange,
  onSpecialChange,
  onCutChange,
  onPolishChange,
  onSymmetryChange,
}: ClarityFilterProps) {
  // Parse comma-separated strings to arrays for internal use
  const cutArray = selectedCut ? selectedCut.split(',') : [];
  const polishArray = selectedPolish ? selectedPolish.split(',') : [];
  const symmetryArray = selectedSymmetry ? selectedSymmetry.split(',') : [];

  const handleClarityClick = (value: string) => {
    let newClarity: string[];
    if (selectedClarity.includes(value)) {
      newClarity = selectedClarity.filter((c) => c !== value);
    } else {
      newClarity = [...selectedClarity, value];
    }
    onClarityChange(newClarity);
  };

  const handleSpecialClick = (value: string) => {
    const newSpecial = selectedSpecial === value ? "" : value;
    onSpecialChange(newSpecial);

    // If a special grade is selected, automatically set Cut, Polish, and Symmetry as comma-separated strings
    if (newSpecial && SPECIAL_GRADE_MAPPING[newSpecial]) {
      const { cut, polish, symmetry } = SPECIAL_GRADE_MAPPING[newSpecial];
      onCutChange(cut.join(','));
      onPolishChange(polish.join(','));
      onSymmetryChange(symmetry.join(','));
    } else {
      // If deselecting special grade, clear the related filters
      onCutChange("");
      onPolishChange("");
      onSymmetryChange("");
    }
  };

  const handleCutClick = (value: string) => {
    let newCutArray: string[];
    if (cutArray.includes(value)) {
      newCutArray = cutArray.filter((c) => c !== value);
    } else {
      newCutArray = [...cutArray, value];
    }
    onCutChange(newCutArray.join(','));
    // Clear special grade when manually changing cut
    if (selectedSpecial) {
      onSpecialChange("");
    }
  };

  const handlePolishClick = (value: string) => {
    let newPolishArray: string[];
    if (polishArray.includes(value)) {
      newPolishArray = polishArray.filter((p) => p !== value);
    } else {
      newPolishArray = [...polishArray, value];
    }
    onPolishChange(newPolishArray.join(','));
    // Clear special grade when manually changing polish
    if (selectedSpecial) {
      onSpecialChange("");
    }
  };

  const handleSymmetryClick = (value: string) => {
    let newSymmetryArray: string[];
    if (symmetryArray.includes(value)) {
      newSymmetryArray = symmetryArray.filter((s) => s !== value);
    } else {
      newSymmetryArray = [...symmetryArray, value];
    }
    onSymmetryChange(newSymmetryArray.join(','));
    // Clear special grade when manually changing symmetry
    if (selectedSpecial) {
      onSpecialChange("");
    }
  };

  return (
    <div className={`${mavenPro.className} mb-1.5 mt-0.5`}>
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <Image
          src="/filtersicon/clarity.png"
          alt="Clarity"
          width={18}
          height={18}
          className="w-5 h-5"
        />
        <span className="text-base font-semibold text-white">Clarity</span>
      </div>

      <div
        className="p-2 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
          height: "288px",
        }}
      >
        {/* Clarity Options */}
        <div className="grid grid-cols-6 gap-2 mb-4 mt-4">
          {STATIC_CLARITY_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleClarityClick(option)}
              className={`px-1 py-0.5 rounded text-xs font-medium transition-colors ${
                selectedClarity.includes(option)
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border: selectedClarity.includes(option)
                  ? "0.25px solid #FAF6EB"
                  : "0.25px solid #f9e8cd",
                minHeight: "28px",
                minWidth: "48px",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Special Options (3EX, EX-, VG+, VG-) - Smaller size with reduced width */}
        <div className="grid grid-cols-5 gap-1 mb-3 mt-3 items-center">
          <div style={{ minWidth: "35px" }}></div>
          {STATIC_SPECIAL_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleSpecialClick(option)}
              className={`px-1 py-0.5 rounded transition-colors ${
                selectedSpecial === option
                  ? "text-white"
                  : "text-white hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  selectedSpecial === option ? "#00003390" : "#000033",
                border: "none",
                minHeight: "25px",
                fontSize: "10px",
                fontWeight: "600",
                maxWidth: "55px",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Cut, Polish, Symmetry - Row layout with labels on left */}
        <div className="flex flex-col gap-4">
          {/* Cut Row */}
          <div className="grid grid-cols-5 gap-1 items-center">
            <div
              className="px-1.5 py-0.5 rounded text-xs font-semibold text-white flex items-center justify-center"
              style={{
                backgroundColor: "#000033",
                minHeight: "24px",
                minWidth: "35px",
              }}
            >
              Cut
            </div>
            <button
              onClick={() => handleCutClick("EX")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                cutArray.includes("EX")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  cutArray.includes("EX")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              EX
            </button>
            <button
              onClick={() => handleCutClick("VG")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                cutArray.includes("VG")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  cutArray.includes("VG")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              VG
            </button>
            <button
              onClick={() => handleCutClick("GD")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                cutArray.includes("GD")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  cutArray.includes("GD")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              GD
            </button>
            <button
              onClick={() => handleCutClick("FR")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                cutArray.includes("FR")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  cutArray.includes("FR")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              FR
            </button>
          </div>

          {/* Polish Row */}
          <div className="grid grid-cols-5 gap-1 items-center">
            <div
              className="px-1.5 py-0.5 rounded text-xs font-semibold text-white flex items-center justify-center"
              style={{
                backgroundColor: "#000033",
                minHeight: "24px",
                minWidth: "35px",
              }}
            >
              Pol
            </div>
            <button
              onClick={() => handlePolishClick("EX")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                polishArray.includes("EX")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  polishArray.includes("EX")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              EX
            </button>
            <button
              onClick={() => handlePolishClick("VG")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                polishArray.includes("VG")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  polishArray.includes("VG")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              VG
            </button>
            <button
              onClick={() => handlePolishClick("GD")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                polishArray.includes("GD")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  polishArray.includes("GD")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              GD
            </button>
            <button
              onClick={() => handlePolishClick("FR")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                polishArray.includes("FR")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  polishArray.includes("FR")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              FR
            </button>
          </div>

          {/* Symmetry Row */}
          <div className="grid grid-cols-5 gap-1 items-center">
            <div
              className="px-1.5 py-0.5 rounded text-xs font-semibold text-white flex items-center justify-center"
              style={{
                backgroundColor: "#000033",
                minHeight: "24px",
                minWidth: "35px",
              }}
            >
              Sym
            </div>
            <button
              onClick={() => handleSymmetryClick("EX")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                symmetryArray.includes("EX")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  symmetryArray.includes("EX")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              EX
            </button>
            <button
              onClick={() => handleSymmetryClick("VG")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                symmetryArray.includes("VG")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  symmetryArray.includes("VG")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              VG
            </button>
            <button
              onClick={() => handleSymmetryClick("GD")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                symmetryArray.includes("GD")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  symmetryArray.includes("GD")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              GD
            </button>
            <button
              onClick={() => handleSymmetryClick("FR")}
              className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                symmetryArray.includes("FR")
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  symmetryArray.includes("FR")
                    ? "0.25px solid #FAF6EB"
                    : "0.25px solid #f9e8cd",
                minHeight: "24px",
                maxWidth: "55px",
              }}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}