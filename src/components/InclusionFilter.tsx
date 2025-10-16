import React from "react";
import { Gem } from "lucide-react"; // Lucide icon

const INCLUSION_OPTIONS = [
  "NONE",
  "NOT VISIBLE",
  "MINOR",
  "MEDIUM",
  "HEAVY",
  "PINPOINT",
];

const INCLUSION_TYPES = [
  { label: "Center Black", key: "centerBlack" },
  { label: "Center White", key: "centerWhite" },
  { label: "Side Black", key: "sideBlack" },
  { label: "Side White", key: "sideWhite" },
];

export interface InclusionFilters {
  centerBlack: string[];
  centerWhite: string[];
  sideBlack: string[];
  sideWhite: string[];
}

interface InclusionFilterProps {
  inclusions: InclusionFilters;
  onInclusionChange: (inclusions: InclusionFilters) => void;
}

export default function InclusionFilter({
  inclusions,
  onInclusionChange,
}: InclusionFilterProps) {
  const toggleInclusion = (type: keyof InclusionFilters, value: string) => {
    const currentValues = inclusions[type] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    onInclusionChange({
      ...inclusions,
      [type]: newValues,
    });
  };

  const isSelected = (type: keyof InclusionFilters, value: string) => {
    return inclusions[type]?.includes(value) || false;
  };

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-t"
        style={{ backgroundColor: "#000033" }}
      >
        <Gem size={20} className="text-white opacity-90" />
        <span className="text-lg font-semibold text-white">Inclusion</span>
      </div>

      {/* Inclusion Filters */}
      <div
        className="bg-white rounded-b p-4"
        style={{ border: "2px solid #f9e8cd" }}
      >
        <div className="space-y-4">
          {INCLUSION_TYPES.map((type) => (
            <div key={type.key}>
              {/* Sub-header */}
              <div
                className="px-3 py-2 font-semibold text-white rounded text-sm mb-3"
                style={{ backgroundColor: "#000033", minWidth: "140px" }}
              >
                {type.label}
              </div>

              {/* Options */}
              <div className="grid grid-cols-3 gap-2">
                {INCLUSION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      toggleInclusion(type.key as keyof InclusionFilters, option)
                    }
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isSelected(type.key as keyof InclusionFilters, option)
                        ? "text-blue-600 bg-blue-50"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      minWidth: "90px",
                      minHeight: "44px",
                      border: isSelected(
                        type.key as keyof InclusionFilters,
                        option
                      )
                        ? "2px solid #2563eb"
                        : "2px solid #f9e8cd",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
