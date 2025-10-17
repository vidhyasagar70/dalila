"use client";

import React from "react";

const KEY_TO_SYMBOL_OPTIONS = [
  "ALL",
  "PINPOINT",
  "NEEDLE",
  "FEATHER",
  "CRYSTAL",
  "CLOUD",
  "INDENTED NATURAL",
  "CAVITY",
  "TWINNING WISP",
  "NATURAL",
  "CHIP",
  "EXTRA FACET",
  "KNOT",
  "SURFACE GRAINING",
];

const EY_CLN_OPTIONS = ["100%", "90%", "80%", "70%"];
const H_AND_A_OPTIONS = ["100%", "90%", "80%", "70%"];

export interface KeySymbolFilters {
  keyToSymbol: string[];
  eyCln: string[];
  hAndA: string[];
}

interface KeySymbolFilterProps {
  filters: KeySymbolFilters;
  onFiltersChange: (filters: KeySymbolFilters) => void;
}

export default function KeySymbolFilter({
  filters,
  onFiltersChange,
}: KeySymbolFilterProps) {
  const toggleFilter = (category: keyof KeySymbolFilters, value: string) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    onFiltersChange({
      ...filters,
      [category]: newValues,
    });
  };

  const isSelected = (category: keyof KeySymbolFilters, value: string) =>
    filters[category]?.includes(value) || false;

  const sectionHeader =
    "flex items-center gap-2 px-3 py-2 text-lg font-semibold text-white bg-[#000033]";
  const buttonBase =
    "px-3 py-1.5 rounded text-[15px] font-medium transition-all duration-200";

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content", minWidth: "320px" }}>
      {/* Key To Symbol Section */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <span className="text-base font-semibold text-white">Key To Symbol</span>
      </div>
      <div className="bg-white p-3" style={{ border: "2px solid #f9e8cd", borderTop: "none" }}>
        <div className="grid grid-cols-3 gap-2">
          {KEY_TO_SYMBOL_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter("keyToSymbol", option)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors break-words ${
                isSelected("keyToSymbol", option)
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minHeight: "32px",
                border: isSelected("keyToSymbol", option)
                  ? "2px solid #2563eb"
                  : "2px solid #f9e8cd",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Ey.Cln Section */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <span className="text-base font-semibold text-white">Ey.Cln</span>
      </div>
      <div className="bg-white p-3" style={{ border: "2px solid #f9e8cd", borderTop: "none" }}>
        <div className="grid grid-cols-4 gap-2">
          {EY_CLN_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter("eyCln", option)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors break-words ${
                isSelected("eyCln", option)
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minHeight: "32px",
                border: isSelected("eyCln", option)
                  ? "2px solid #2563eb"
                  : "2px solid #f9e8cd",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* H&A Section */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <span className="text-base font-semibold text-white">H&A</span>
      </div>
      <div className="bg-white p-3" style={{ border: "2px solid #f9e8cd", borderTop: "none" }}>
        <div className="grid grid-cols-4 gap-2">
          {H_AND_A_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter("hAndA", option)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors break-words ${
                isSelected("hAndA", option)
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minHeight: "32px",
                border: isSelected("hAndA", option)
                  ? "2px solid #2563eb"
                  : "2px solid #f9e8cd",
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