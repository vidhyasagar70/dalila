"use client";

import React from "react";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SHADES_OPTIONS = [
  "HPHT",
  "NONE",
  "TTLB",
  "VLGY",
  "VLGW",
  "VLG",
  "MIX",
  "VLBW",
  "VLB",
];
const MILKY_OPTIONS = ["ML - 0", "ML - 1", "ML - 2", "ML - 3"];
const TYPE2_OPTIONS = ["TYPE 2A", "TYPE 1AB"];
const BRL_OPTIONS = ["EX", "VG", "GD"];

export interface ShadesFilters {
  shades: string[];
  milky: string[];
  type2Ct: string[];
  brl: string[];
}

interface ShadesFilterProps {
  filters: ShadesFilters;
  onFiltersChange: (filters: ShadesFilters) => void;
}

const FILTER_SECTIONS = [
  { label: "Shades", key: "shades", options: SHADES_OPTIONS, cols: 3 },
  { label: "Milky", key: "milky", options: MILKY_OPTIONS, cols: 4 },
  { label: "Type2 Ct", key: "type2Ct", options: TYPE2_OPTIONS, cols: 2 },
  { label: "Brl.", key: "brl", options: BRL_OPTIONS, cols: 3 },
];

export default function ShadesFilter({
  filters,
  onFiltersChange,
}: ShadesFilterProps) {
  const toggleFilter = (category: keyof ShadesFilters, value: string) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFiltersChange({ ...filters, [category]: newValues });
  };

  const isSelected = (category: keyof ShadesFilters, value: string) =>
    filters[category]?.includes(value) || false;

  return (
    <div
      className={`${mavenPro.className} mb-2 mt-1`}
      style={{ width: "fit-content" }}
    >
      {/* Header */}
      <div
        className="flex items-center px-2.5"
        style={{ backgroundColor: "#000033", height: "32px" }}
      >
        <span className="text-xs font-semibold text-white">SHADES</span>
      </div>

      {/* Filter Sections */}
      <div
        className="bg-white p-1.5"
        style={{ border: "1px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="space-y-1.5">
          {FILTER_SECTIONS.map((section) => (
            <div key={section.key}>
              {/* Sub-header */}
              <div
                className="px-2.5 py-0.5 font-semibold text-white text-xs"
                style={{ backgroundColor: "#000033" }}
              >
                {section.label}
              </div>

              {/* Options */}
              <div
                className={`grid gap-1.5 mt-1.5 mb-1`}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${section.cols}, minmax(0, 1fr))`,
                  gap: "6px",
                }}
              >
                {section.options.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      toggleFilter(section.key as keyof ShadesFilters, option)
                    }
                    className={`px-2 py-1 text-xs font-normal transition-colors ${
                      isSelected(section.key as keyof ShadesFilters, option)
                        ? "text-blue-600 bg-blue-50"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      minWidth: "65px",
                      minHeight: "28px",
                      border: isSelected(
                        section.key as keyof ShadesFilters,
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
