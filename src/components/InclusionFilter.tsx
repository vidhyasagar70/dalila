"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <div className="mb-2 mt-1" style={{ width: "fit-content" }}>
      {/* Header */}
      <div
        className="flex items-center px-2.5"
        style={{ backgroundColor: "#000033", height: "32px" }}
      >
        <span
          className={`${playFair.className} text-xs font-semibold text-white`}
        >
          INCLUSION
        </span>
      </div>

      {/* Inclusion Filters */}
      <div
        className="bg-white p-1.5"
        style={{ border: "1px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="space-y-1.5">
          {INCLUSION_TYPES.map((type) => (
            <div key={type.key}>
              {/* Sub-header */}
              <div
                className={`${playFair.className} px-2.5 py-0.5 font-semibold text-white text-xs`}
                style={{ backgroundColor: "#000033" }}
              >
                {type.label}
              </div>

              {/* Options */}
              <div className="grid grid-cols-3 gap-1.5 mt-1.5 mb-1">
                {INCLUSION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      toggleInclusion(
                        type.key as keyof InclusionFilters,
                        option,
                      )
                    }
                    className={`${playFair.className} px-2 py-1 text-xs font-normal transition-colors ${
                      isSelected(type.key as keyof InclusionFilters, option)
                        ? "text-blue-600 bg-blue-50"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      minWidth: "80px",
                      minHeight: "28px",
                      border: isSelected(
                        type.key as keyof InclusionFilters,
                        option,
                      )
                        ? "1px solid #2563eb"
                        : "1px solid #f9e8cd",
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
