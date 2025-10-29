"use client";
import React from "react";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
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

// Type for diamond data with inclusion properties
interface DiamondWithInclusions {
  CN?: string | number;
  CW?: string | number;
  SN?: string | number;
  SW?: string | number;
  [key: string]: unknown;
}

// Helper function to check if inclusion filters match a diamond
export const matchesInclusionFilters = (
  diamond: DiamondWithInclusions,
  filters: InclusionFilters
): boolean => {
  const hasAnyFilter = 
    filters.centerBlack.length > 0 ||
    filters.centerWhite.length > 0 ||
    filters.sideBlack.length > 0 ||
    filters.sideWhite.length > 0;

  if (!hasAnyFilter) return true;

  // Map diamond properties to inclusion filter keys
  const checks = [
    { key: 'centerBlack', value: diamond.CN },
    { key: 'centerWhite', value: diamond.CW },
    { key: 'sideBlack', value: diamond.SN },
    { key: 'sideWhite', value: diamond.SW },
  ];

  // Check each inclusion type
  for (const check of checks) {
    const filterKey = check.key as keyof InclusionFilters;
    const selectedValues = filters[filterKey];
    
    if (selectedValues.length > 0) {
      const diamondValue = check.value?.toString().toUpperCase() || '';
      
      // If filter is active but diamond value doesn't match any selected option
      if (!selectedValues.includes(diamondValue)) {
        return false;
      }
    }
  }

  return true;
};

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
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <span
          className={`${mavenPro.className} text-base font-semibold text-white`}
        >
          INCLUSION
        </span>
      </div>

      {/* Inclusion Filters */}
      <div style={{ marginTop: "6px" }}>
        {INCLUSION_TYPES.map((type, index) => (
          <div key={type.key} style={{ marginBottom: index < INCLUSION_TYPES.length - 1 ? "6px" : "0" }}>
            {/* Sub-header */}
            <div
              className={`${mavenPro.className} px-2.5 py-1.5 font-semibold text-white text-sm`}
              style={{ backgroundColor: "#000033" }}
            >
              {type.label}
            </div>

            {/* Options */}
            <div
              className="bg-white"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "6px",
                padding: "6px",
                borderLeft: "1px solid #f9e8cd",
                borderRight: "1px solid #f9e8cd",
                borderBottom: "1px solid #f9e8cd",
              }}
            >
              {INCLUSION_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    toggleInclusion(
                      type.key as keyof InclusionFilters,
                      option,
                    )
                  }
                  className={`${mavenPro.className} font-medium transition-colors ${
                    isSelected(type.key as keyof InclusionFilters, option)
                      ? "text-gray-800 bg-[#FAF6EB]"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  style={{
                    minWidth: "80px",
                    height: "28px",
                    fontSize: "12px",
                    padding: "4px 6px",
                    border: isSelected(
                      type.key as keyof InclusionFilters,
                      option,
                    )
                      ? "0.25px solid #FAF6EB"
                      : "0.25px solid #f9e8cd",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
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
  );
}