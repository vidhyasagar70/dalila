"use client";

import React from "react";
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

const FILTER_SECTIONS = [
  { label: "Key To Symbol", key: "keyToSymbol", options: KEY_TO_SYMBOL_OPTIONS, cols: 2 },
  { label: "Ey.Cln", key: "eyCln", options: EY_CLN_OPTIONS, cols: 4 },
  { label: "H&A", key: "hAndA", options: H_AND_A_OPTIONS, cols: 4 },
];

export default function KeySymbolFilter({
  filters,
  onFiltersChange,
}: KeySymbolFilterProps) {
  const toggleFilter = (category: keyof KeySymbolFilters, value: string) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFiltersChange({ ...filters, [category]: newValues });
  };

  const isSelected = (category: keyof KeySymbolFilters, value: string) =>
    filters[category]?.includes(value) || false;

  return (
    <div className={`${playFair.className} mb-2 mt-1`} style={{ width: "fit-content" }}>
      {/* Header */}
      <div
        className="flex items-center px-2.5"
        style={{ backgroundColor: "#000033", height: "32px" }}
      >
        <span className="text-xs font-semibold text-white">KEY TO SYMBOL</span>
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
                      toggleFilter(section.key as keyof KeySymbolFilters, option)
                    }
                    className={`px-2 py-1 text-xs font-normal transition-colors ${
                      isSelected(section.key as keyof KeySymbolFilters, option)
                        ? "text-blue-600 bg-blue-50"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      minWidth: "65px",
                      minHeight: "28px",
                      border: isSelected(
                        section.key as keyof KeySymbolFilters,
                        option
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
