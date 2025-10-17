import React, { useEffect, useState } from "react";
import { diamondApi, FilterOptions } from "@/lib/api";

const SPECIAL_OPTIONS = [
  { label: "3EX", value: "3EX" },
  { label: "EX-", value: "EX-" },
  { label: "VG+", value: "VG+" },
  { label: "VG-", value: "VG-" },
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
  const [clarityOptions, setClarityOptions] = useState<string[]>([]);
  const [cutOptions, setCutOptions] = useState<string[]>([]);
  const [polishOptions, setPolishOptions] = useState<string[]>([]);
  const [symmetryOptions, setSymmetryOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await diamondApi.getFilterOptions();
        if (response?.success && response.data) {
          // Filter out empty strings and sort clarities
          const clarities = response.data.clarities.filter(c => c.trim() !== "");
          setClarityOptions(clarities);

          // Filter out empty strings and "-" for cuts, polish, and symmetry
          const cuts = response.data.cuts.filter(c => c.trim() !== "" && c !== "-");
          setCutOptions(cuts);

          const polish = response.data.polishGrades.filter(p => p.trim() !== "");
          setPolishOptions(polish);

          const symmetry = response.data.symmetryGrades.filter(s => s.trim() !== "");
          setSymmetryOptions(symmetry);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleClarityClick = (value: string) => {
    if (selectedClarity.includes(value)) {
      onClarityChange(selectedClarity.filter((c) => c !== value));
    } else {
      onClarityChange([...selectedClarity, value]);
    }
  };

  const handleSpecialClick = (value: string) => {
    if (selectedClarity.length === 1 && selectedClarity[0] === value) {
      onClarityChange([]);
    } else {
      onClarityChange([value]);
    }
  };

  const handleCutClick = (value: string) => {
    onCutChange(selectedCut === value ? "" : value);
  };

  const handlePolishClick = (value: string) => {
    onPolishChange(selectedPolish === value ? "" : value);
  };

  const handleSymmetryClick = (value: string) => {
    onSymmetryChange(selectedSymmetry === value ? "" : value);
  };

  if (loading) {
    return (
      <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ backgroundColor: "#000033" }}
        >
          <img src="/filtersicon/clarity.png" alt="Clarity" className="w-5 h-5" />
          <span className="text-base font-semibold text-white">Clarity</span>
        </div>
        <div
          className="p-3 bg-white flex items-center justify-center"
          style={{ border: "0.25px solid #f9e8cd", borderTop: "none", minHeight: "200px" }}
        >
          <span className="text-gray-500">Loading filters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <img src="/filtersicon/clarity.png" alt="Clarity" className="w-5 h-5" />
        <span className="text-base font-semibold text-white">Clarity</span>
      </div>

      <div
        className="p-3 bg-white"
        style={{ border: "0.25px solid #f9e8cd", borderTop: "none" }}
      >
        {/* Clarity Options */}
        <div className="grid grid-cols-6 gap-2 mb-3">
          {clarityOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleClarityClick(option)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                selectedClarity.includes(option)
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border: selectedClarity.includes(option)
                  ? "0.25px solid #2563eb"
                  : "0.25px solid #f9e8cd",
                minHeight: "36px",
                minWidth: "54px",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Special Options */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {SPECIAL_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSpecialClick(option.value)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors hover:opacity-90 ${
                selectedClarity.length === 1 && selectedClarity[0] === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-[#000033] text-white"
              }`}
              style={{ 
                minHeight: "36px",
                minWidth: "70px",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Cut Options */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="px-2 py-1.5 rounded text-xs font-semibold text-white"
            style={{ 
              backgroundColor: "#000033", 
              minWidth: "60px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center"
            }}
          >
            Cut :
          </div>
          <div className="flex gap-2 flex-1">
            {cutOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleCutClick(option)}
                className={`px-2 py-1.5 rounded text-xs font-medium transition-colors flex-1 ${
                  selectedCut === option
                    ? "text-blue-600 bg-blue-50"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  border:
                    selectedCut === option
                      ? "0.25px solid #2563eb"
                      : "0.25px solid #f9e8cd",
                  minHeight: "36px",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Polish Options */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="px-2 py-1.5 rounded text-xs font-semibold text-white"
            style={{ 
              backgroundColor: "#000033", 
              minWidth: "60px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center"
            }}
          >
            Pol :
          </div>
          <div className="flex gap-2 flex-1">
            {polishOptions.map((option) => (
              <button
                key={option}
                onClick={() => handlePolishClick(option)}
                className={`px-2 py-1.5 rounded text-xs font-medium transition-colors flex-1 ${
                  selectedPolish === option
                    ? "text-blue-600 bg-blue-50"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  border:
                    selectedPolish === option
                      ? "0.25px solid #2563eb"
                      : "0.25px solid #f9e8cd",
                  minHeight: "36px",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Symmetry Options */}
        <div className="flex items-center gap-2">
          <div
            className="px-2 py-1.5 rounded text-xs font-semibold text-white"
            style={{ 
              backgroundColor: "#000033", 
              minWidth: "60px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center"
            }}
          >
            Sym :
          </div>
          <div className="flex gap-2 flex-1">
            {symmetryOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSymmetryClick(option)}
                className={`px-2 py-1.5 rounded text-xs font-medium transition-colors flex-1 ${
                  selectedSymmetry === option
                    ? "text-blue-600 bg-blue-50"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  border:
                    selectedSymmetry === option
                      ? "0.25px solid #2563eb"
                      : "0.25px solid #f9e8cd",
                  minHeight: "36px",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}