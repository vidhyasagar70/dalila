"use client";

import React from "react";
import { Sparkles, Cloud, Gem, Star } from "lucide-react"; 

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

export default function ShadesFilter({ filters, onFiltersChange }: ShadesFilterProps) {
  const toggleFilter = (category: keyof ShadesFilters, value: string) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFiltersChange({ ...filters, [category]: newValues });
  };

  const isSelected = (category: keyof ShadesFilters, value: string) =>
    filters[category]?.includes(value) || false;

  const sectionClasses =
    "flex items-center gap-2 px-3 py-2 text-lg font-semibold text-white bg-[#000033]";
  const buttonBase =
    "px-3 py-1.5 rounded text-[15px] font-medium transition-all duration-200";

 return (
  <div className="mb-2 mt-1" style={{ width: "fit-content" }}>
    {/* Shades Section */}
    <div
      className="flex items-center gap-1.5 px-2 py-1.5"
      style={{ backgroundColor: "#000033" }}
    >
      <span className="text-sm font-semibold text-white">Shades</span>
    </div>
    <div className="bg-white p-2" style={{ border: "1px solid #f9e8cd", borderTop: "none" }}>
      <div className="grid grid-cols-3 gap-1.5">
        {SHADES_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => toggleFilter("shades", option)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              isSelected("shades", option)
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: "75px",
              minHeight: "28px",
              border: isSelected("shades", option)
                ? "1px solid #2563eb"
                : "1px solid #f9e8cd",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>

    {/* Milky Section */}
    <div
      className="flex items-center gap-1.5 px-2 py-1.5"
      style={{ backgroundColor: "#000033" }}
    >
      <span className="text-sm font-semibold text-white">Milky</span>
    </div>
    <div className="bg-white p-2" style={{ border: "1px solid #f9e8cd", borderTop: "none" }}>
      <div className="grid grid-cols-4 gap-1.5">
        {MILKY_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => toggleFilter("milky", option)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              isSelected("milky", option)
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: "75px",
              minHeight: "28px",
              border: isSelected("milky", option)
                ? "1px solid #2563eb"
                : "1px solid #f9e8cd",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>

    {/* Type2 Ct Section */}
    <div
      className="flex items-center gap-1.5 px-2 py-1.5"
      style={{ backgroundColor: "#000033" }}
    >
      <span className="text-sm font-semibold text-white">Type2 Ct</span>
    </div>
    <div className="bg-white p-2" style={{ border: "1px solid #f9e8cd", borderTop: "none" }}>
      <div className="grid grid-cols-2 gap-1.5">
        {TYPE2_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => toggleFilter("type2Ct", option)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              isSelected("type2Ct", option)
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: "75px",
              minHeight: "28px",
              border: isSelected("type2Ct", option)
                ? "1px solid #2563eb"
                : "1px solid #f9e8cd",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>

    {/* Brl. Section */}
    <div
      className="flex items-center gap-1.5 px-2 py-1.5"
      style={{ backgroundColor: "#000033" }}
    >
      <span className="text-sm font-semibold text-white">Brl.</span>
    </div>
    <div className="bg-white p-2" style={{ border: "1px solid #f9e8cd", borderTop: "none" }}>
      <div className="grid grid-cols-3 gap-1.5">
        {BRL_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => toggleFilter("brl", option)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              isSelected("brl", option)
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: "75px",
              minHeight: "28px",
              border: isSelected("brl", option)
                ? "1px solid #2563eb"
                : "1px solid #f9e8cd",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  </div>
);
}
