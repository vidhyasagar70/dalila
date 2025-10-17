import React, { useState } from "react";

const CARAT_RANGES = [
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

interface CaratFilterProps {
  selectedRange?: string;
  onRangeChange?: (range: string) => void;
}

export default function CaratFilter({
  selectedRange,
  onRangeChange,
}: CaratFilterProps) {
  const [fromValue, setFromValue] = useState("0.50");
  const [toValue, setToValue] = useState("");

  const handleRangeClick = (range: string) => {
    onRangeChange?.(selectedRange === range ? "" : range);
  };

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <img src="/filtersicon/carat.png" alt="Carat" className="w-5 h-5" />
        <span className="text-base font-semibold text-white">Carat</span>
      </div>

      {/* Filter Body */}
      <div
        className="p-3 bg-white"
        style={{ border: "2px solid #f9e8cd", borderTop: "none" }}
      >
        {/* Input Fields */}
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1">
            <input
              type="number"
              step="0.01"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full px-2 py-1 text-xs rounded"
              style={{ border: "2px solid #e5e7eb" }}
              placeholder="From"
            />
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              step="0.01"
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              className="w-full px-2 py-1 text-xs rounded"
              style={{ border: "2px solid #e5e7eb" }}
              placeholder="To"
            />
          </div>
        </div>

        {/* Range Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {CARAT_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => handleRangeClick(range.value)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                selectedRange === range.value
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedRange === range.value
                    ? "2px solid #2563eb"
                    : "2px solid #f9e8cd",
                minHeight: "37px", 
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
