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
    <div className="mb-2 mt-1" style={{ width: "fit-content" }}>
      {/* Main Header with Icon */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <img
          src="/filtersicon/shades.png"
          alt="Shades"
          width={18}
          height={18}
          className="w-7 h-6"
        />
        <span className={`${mavenPro.className} text-base font-semibold text-white`}>
          Shades
        </span>
      </div>
      
      {/* Shades Options */}
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
        {SHADES_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => toggleFilter("shades", option)}
            className={`${mavenPro.className} font-medium transition-colors ${
              isSelected("shades", option)
                ? "text-gray-800 bg-[#FAF6EB]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: "80px",
              height: "28px",
              fontSize: "12px",
              padding: "4px 6px",
              border: isSelected("shades", option)
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
      
      {/* Other Filter Sections */}
      <div style={{ marginTop: "6px" }}>
        {FILTER_SECTIONS.map((section, index) => (
          <div key={section.key} style={{ marginBottom: index < FILTER_SECTIONS.length - 1 ? "6px" : "0" }}>
            {/* Sub-header */}
            <div
              className={`${mavenPro.className} px-2.5 py-1.5 font-semibold text-white text-sm`}
              style={{ backgroundColor: "#000033" }}
            >
              {section.label}
            </div>

            {/* Options */}
            <div
              className="bg-white"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${section.cols}, minmax(0, 1fr))`,
                gap: "6px",
                padding: "6px",
                borderLeft: "1px solid #f9e8cd",
                borderRight: "1px solid #f9e8cd",
                borderBottom: "1px solid #f9e8cd",
              }}
            >
              {section.options.map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    toggleFilter(section.key as keyof ShadesFilters, option)
                  }
                  className={`${mavenPro.className} font-medium transition-colors ${
                    isSelected(section.key as keyof ShadesFilters, option)
                      ? "text-gray-800 bg-[#FAF6EB]"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  style={{
                    minWidth: "80px",
                    height: "28px",
                    fontSize: "12px",
                    padding: "4px 6px",
                    border: isSelected(
                      section.key as keyof ShadesFilters,
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