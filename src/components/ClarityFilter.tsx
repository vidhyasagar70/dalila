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

// Mapping of special grades to their corresponding Cut/Polish/Symmetry combinations
const SPECIAL_GRADE_MAPPING: Record<
  string,
  { cut: string; polish: string; symmetry: string }
> = {
  "3EX": { cut: "EX", polish: "EX", symmetry: "EX" },
  "EX-": { cut: "EX", polish: "EX", symmetry: "VG" },
  "VG+": { cut: "VG", polish: "VG", symmetry: "VG" },
  "VG-": { cut: "VG", polish: "GD", symmetry: "GD" },
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

    // If a special grade is selected, automatically set Cut, Polish, and Symmetry
    if (newSpecial && SPECIAL_GRADE_MAPPING[newSpecial]) {
      const { cut, polish, symmetry } = SPECIAL_GRADE_MAPPING[newSpecial];
      onCutChange(cut);
      onPolishChange(polish);
      onSymmetryChange(symmetry);
    } else {
      // If deselecting special grade, clear the related filters
      onCutChange("");
      onPolishChange("");
      onSymmetryChange("");
    }
  };

  const handleCutClick = (value: string) => {
    const newCut = selectedCut === value ? "" : value;
    onCutChange(newCut);
    // Clear special grade when manually changing cut
    if (selectedSpecial) {
      onSpecialChange("");
    }
  };

  const handlePolishClick = (value: string) => {
    const newPolish = selectedPolish === value ? "" : value;
    onPolishChange(newPolish);
    // Clear special grade when manually changing polish
    if (selectedSpecial) {
      onSpecialChange("");
    }
  };

  const handleSymmetryClick = (value: string) => {
    const newSymmetry = selectedSymmetry === value ? "" : value;
    onSymmetryChange(newSymmetry);
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
                selectedCut === "EX"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedCut === "EX"
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
                selectedCut === "VG"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedCut === "VG"
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
                selectedCut === "GD"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedCut === "GD"
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
                selectedCut === "FR"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedCut === "FR"
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
                selectedPolish === "EX"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedPolish === "EX"
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
                selectedPolish === "VG"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedPolish === "VG"
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
                selectedPolish === "GD"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedPolish === "GD"
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
                selectedPolish === "FR"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedPolish === "FR"
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
                selectedSymmetry === "EX"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedSymmetry === "EX"
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
                selectedSymmetry === "VG"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedSymmetry === "VG"
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
                selectedSymmetry === "GD"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedSymmetry === "GD"
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
                selectedSymmetry === "FR"
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedSymmetry === "FR"
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