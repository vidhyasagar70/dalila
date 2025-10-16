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
    <div className="mb-4 mt-2 w-fit">
      {/* Shades Section */}
      <div className={`${sectionClasses} rounded-t`}>
        <Sparkles size={20}  />
        <span>Shades</span>
      </div>
      <div className="bg-white p-3 border-x-2 border-[#f9e8cd]">
        <div className="grid grid-cols-3 gap-2">
          {SHADES_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter("shades", option)}
              className={`${buttonBase} ${
                isSelected("shades", option)
                  ? "text-blue-600 border-2 border-blue-600"
                  : "text-gray-700 border-2 border-[#f9e8cd] hover:bg-gray-50"
              }`}
              style={{ minWidth: "80px" }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Milky Section */}
      <div className={sectionClasses}>
        <span>Milky</span>
      </div>
      <div className="bg-white p-3 border-x-2 border-[#f9e8cd]">
        <div className="grid grid-cols-4 gap-2">
          {MILKY_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter("milky", option)}
              className={`${buttonBase} ${
                isSelected("milky", option)
                  ? "text-blue-600 border-2 border-blue-600"
                  : "text-gray-700 border-2 border-[#f9e8cd] hover:bg-gray-50"
              }`}
              style={{ minWidth: "70px" }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Type2 Ct Section */}
      <div className={sectionClasses}>
        <span>Type2 Ct</span>
      </div>
      <div className="bg-white p-3 border-x-2 border-[#f9e8cd]">
        <div className="grid grid-cols-2 gap-2">
          {TYPE2_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter("type2Ct", option)}
              className={`${buttonBase} ${
                isSelected("type2Ct", option)
                  ? "text-blue-600 border-2 border-blue-600"
                  : "text-gray-700 border-2 border-[#f9e8cd] hover:bg-gray-50"
              }`}
              style={{ minWidth: "110px" }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Brl. Section */}
      <div className={sectionClasses}>
        <span>Brl.</span>
      </div>
      <div className="bg-white p-3 rounded-b border-2 border-[#f9e8cd]">
        <div className="grid grid-cols-3 gap-2">
          {BRL_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter("brl", option)}
              className={`${buttonBase} ${
                isSelected("brl", option)
                  ? "text-blue-600 border-2 border-blue-600"
                  : "text-gray-700 border-2 border-[#f9e8cd] hover:bg-gray-50"
              }`}
              style={{ minWidth: "70px" }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
