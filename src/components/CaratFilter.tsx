"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

interface CaratFilterProps {
  selectedMinCarat: string;
  selectedMaxCarat: string;
  onCaratChange: (min: string, max: string) => void;
}

interface CaratRange {
  label: string;
  value: string;
  min: number;
  max: number;
}

// Static carat ranges matching your UI image
const STATIC_CARAT_RANGES: CaratRange[] = [
  { label: "0.17 - 0.22", value: "0.17-0.22", min: 0.17, max: 0.22 },
  { label: "0.23 - 0.29", value: "0.23-0.29", min: 0.23, max: 0.29 },
  { label: "0.30 - 0.39", value: "0.30-0.39", min: 0.3, max: 0.39 },
  { label: "0.40 - 0.49", value: "0.40-0.49", min: 0.4, max: 0.49 },
  { label: "0.50 - 0.69", value: "0.50-0.69", min: 0.5, max: 0.69 },
  { label: "0.70 - 0.79", value: "0.70-0.79", min: 0.7, max: 0.79 },
  { label: "0.80 - 0.89", value: "0.80-0.89", min: 0.8, max: 0.89 },
  { label: "0.90 - 0.99", value: "0.90-0.99", min: 0.9, max: 0.99 },
  { label: "1.00 - 1.49", value: "1.00-1.49", min: 1.0, max: 1.49 },
  { label: "1.59 - 1.99", value: "1.59-1.99", min: 1.59, max: 1.99 },
  { label: "2.00 - 2.99", value: "2.00-2.99", min: 2.0, max: 2.99 },
  { label: "3.00 - 3.99", value: "3.00-3.99", min: 3.0, max: 3.99 },
  { label: "4.00 - 4.99", value: "4.00-4.99", min: 4.0, max: 4.99 },
  { label: "5.00 - 99.99", value: "5.00-99.99", min: 5.0, max: 99.99 },
];

export default function CaratFilter({
  selectedMinCarat,
  selectedMaxCarat,
  onCaratChange,
}: CaratFilterProps) {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    if (value && toValue) onCaratChange(value, toValue);
    else if (!value && !toValue) onCaratChange("", "");
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToValue(value);
    if (fromValue && value) onCaratChange(fromValue, value);
    else if (!fromValue && !value) onCaratChange("", "");
  };

  const handleRangeClick = (range: CaratRange) => {
    const isSelected =
      selectedMinCarat === range.min.toString() &&
      selectedMaxCarat === range.max.toString();

    if (isSelected) {
      setFromValue("");
      setToValue("");
      onCaratChange("", "");
    } else {
      setFromValue(range.min.toString());
      setToValue(range.max.toString());
      onCaratChange(range.min.toString(), range.max.toString());
    }
  };

  return (
    <div className={`${mavenPro.className} mb-1.5 mt-0.5`}>
      {/* Header */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <Image
          src="/filtersicon/carat.png"
          alt="Carat"
          width={18}
          height={18}
          className="w-4.5 h-4.5"
        />
        <span className="text-base font-semibold text-white">Carat</span>
      </div>

      {/* Body */}
      <div
        className="p-3 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
          minHeight: "288px",
        }}
      >
        {/* Input Fields */}
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <input
              type="number"
              step="0.01"
              value={fromValue}
              onChange={handleFromChange}
              className="w-full px-2 py-1.5 text-xs rounded border border-[#f9e8cd] min-h-[36px]"
              placeholder="From"
            />
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              step="0.01"
              value={toValue}
              onChange={handleToChange}
              className="w-full px-2 py-1.5 text-xs rounded border border-[#f9e8cd] min-h-[36px]"
              placeholder="To"
            />
          </div>
        </div>

        {/* Range Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {STATIC_CARAT_RANGES.map((range) => {
            const isSelected =
              selectedMinCarat === range.min.toString() &&
              selectedMaxCarat === range.max.toString();

            return (
              <button
                key={range.value}
                onClick={() => handleRangeClick(range)}
                className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                  isSelected
                    ? "text-gray-800 bg-[#FAF6EB] border border-[#FAF6EB]"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-[#f9e8cd]"
                } min-h-[36px] min-w-[90px]`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
