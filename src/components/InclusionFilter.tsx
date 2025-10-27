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
        className="flex items-center px-2.5"
        style={{ backgroundColor: "#000033", height: "32px" }}
      >
        <span
          className={`${mavenPro.className} text-xs font-semibold text-white`}
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
                className={`${mavenPro.className} px-2.5 py-0.5 font-semibold text-white text-xs`}
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
                    className={`${mavenPro.className} px-2 py-1 text-xs font-medium transition-colors ${
                      isSelected(type.key as keyof InclusionFilters, option)
                        ? "text-gray-800 bg-[#FAF6EB]"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      minWidth: "80px",
                      minHeight: "28px",
                      border: isSelected(
                        type.key as keyof InclusionFilters,
                        option,
                      )
                        ? "0.25px solid #FAF6EB"
                        : "0.25px solid #f9e8cd",
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