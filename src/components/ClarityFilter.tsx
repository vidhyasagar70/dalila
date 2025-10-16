import React from "react";
import { Sparkles } from "lucide-react";

const CLARITY_OPTIONS = [
  { label: "FL", value: "FL" },
  { label: "IF", value: "IF" },
  { label: "VVS1", value: "VVS1" },
  { label: "VVS2", value: "VVS2" },
  { label: "VS1", value: "VS1" },
  { label: "VS2", value: "VS2" },
  { label: "SI1", value: "SI1" },
  { label: "SI2", value: "SI2" },
  { label: "SI3", value: "SI3" },
  { label: "I1", value: "I1" },
  { label: "I2", value: "I2" },
  { label: "I3", value: "I3" },
];

const SPECIAL_OPTIONS = [
  { label: "3EX", value: "3EX" },
  { label: "EX-", value: "EX-" },
  { label: "VG+", value: "VG+" },
  { label: "VG-", value: "VG-" },
];

const CUT_OPTIONS = [
  { label: "EX", value: "EX" },
  { label: "VG", value: "VG" },
  { label: "GD", value: "GD" },
  { label: "FR", value: "FR" },
];

const POL_OPTIONS = [
  { label: "EX", value: "EX" },
  { label: "VG", value: "VG" },
  { label: "GD", value: "GD" },
  { label: "FR", value: "FR" },
];

const SYM_OPTIONS = [
  { label: "EX", value: "EX" },
  { label: "VG", value: "VG" },
  { label: "GD", value: "GD" },
  { label: "FR", value: "FR" },
];

interface ClarityFilterProps {
  selectedClarity: string[];
  selectedCut: string;
  selectedPolish: string;
  selectedSymmetry: string;
  onClarityChange: (clarity: string[]) => void;
  onCutChange: (cut: string) => void;
  onPolishChange: (polish: string) => void;
  onSymmetryChange: (symmetry: string) => void;
}

export default function ClarityFilter({
  selectedClarity,
  selectedCut,
  selectedPolish,
  selectedSymmetry,
  onClarityChange,
  onCutChange,
  onPolishChange,
  onSymmetryChange,
}: ClarityFilterProps) {
  // Toggle clarity
  const handleClarityClick = (value: string) => {
    if (selectedClarity.includes(value)) {
      onClarityChange(selectedClarity.filter((c) => c !== value));
    } else {
      onClarityChange([...selectedClarity, value]);
    }
  };

  // Toggle special clarity (single selection)
  const handleSpecialClick = (value: string) => {
    if (selectedClarity.length === 1 && selectedClarity[0] === value) {
      onClarityChange([]);
    } else {
      onClarityChange([value]);
    }
  };

  // Toggle helpers for Cut, Polish, Symmetry
  const handleCutClick = (value: string) => {
    onCutChange(selectedCut === value ? "" : value);
  };

  const handlePolishClick = (value: string) => {
    onPolishChange(selectedPolish === value ? "" : value);
  };

  const handleSymmetryClick = (value: string) => {
    onSymmetryChange(selectedSymmetry === value ? "" : value);
  };

  return (
    <div
      className="mb-3 mt-2"
      style={{ width: "fit-content", transform: "scale(0.95)", transformOrigin: "top left" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-t"
        style={{ backgroundColor: "#000033" }}
      >
        <Sparkles className="text-white" size={22} />
        <span className="text-base font-semibold text-white">Clarity</span>
      </div>

      <div
        className="p-3 bg-white rounded-b"
        style={{ border: "2px solid #f9e8cd" }}
      >
        {/* Main Clarity Options */}
        <div className="grid grid-cols-6 gap-2 mb-3">
          {CLARITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleClarityClick(option.value)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                selectedClarity.includes(option.value)
                  ? "text-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border: selectedClarity.includes(option.value)
                  ? "2px solid #2563eb"
                  : "2px solid #f9e8cd",
                minHeight: "38px",
                minWidth: "58px",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Special Options */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {SPECIAL_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSpecialClick(option.value)}
              className={`px-4 py-2 rounded text-sm font-semibold transition-colors hover:opacity-90 ${
                selectedClarity.length === 1 && selectedClarity[0] === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-[#000033] text-white"
              }`}
              style={{ minHeight: "38px" }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Cut */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="px-3 py-2 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: "#000033", minWidth: "70px" }}
          >
            Cut :
          </div>
          <div className="flex gap-2 flex-1">
            {CUT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleCutClick(option.value)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors flex-1 ${
                  selectedCut === option.value
                    ? "text-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  border:
                    selectedCut === option.value
                      ? "2px solid #2563eb"
                      : "2px solid #f9e8cd",
                  minHeight: "38px",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Polish */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="px-3 py-2 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: "#000033", minWidth: "70px" }}
          >
            Pol :
          </div>
          <div className="flex gap-2 flex-1">
            {POL_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handlePolishClick(option.value)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors flex-1 ${
                  selectedPolish === option.value
                    ? "text-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  border:
                    selectedPolish === option.value
                      ? "2px solid #2563eb"
                      : "2px solid #f9e8cd",
                  minHeight: "38px",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Symmetry */}
        <div className="flex items-center gap-2">
          <div
            className="px-3 py-2 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: "#000033", minWidth: "70px" }}
          >
            Sym :
          </div>
          <div className="flex gap-2 flex-1">
            {SYM_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSymmetryClick(option.value)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors flex-1 ${
                  selectedSymmetry === option.value
                    ? "text-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  border:
                    selectedSymmetry === option.value
                      ? "2px solid #2563eb"
                      : "2px solid #f9e8cd",
                  minHeight: "38px",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
