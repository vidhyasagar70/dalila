import React, { useState } from "react";
import { Gem } from "lucide-react";

const CARAT_RANGES = [
  { label: "0.17 - 0.22", value: "0.17-0.22", min: 0.17, max: 0.22 },
  { label: "0.23 - 0.29", value: "0.23-0.29", min: 0.23, max: 0.29 },
  { label: "0.30 - 0.39", value: "0.30-0.39", min: 0.30, max: 0.39 },
  { label: "0.40 - 0.49", value: "0.40-0.49", min: 0.40, max: 0.49 },
  { label: "0.50 - 0.69", value: "0.50-0.69", min: 0.50, max: 0.69 },
  { label: "0.70 - 0.79", value: "0.70-0.79", min: 0.70, max: 0.79 },
  { label: "0.80 - 0.89", value: "0.80-0.89", min: 0.80, max: 0.89 },
  { label: "0.90 - 0.99", value: "0.90-0.99", min: 0.90, max: 0.99 },
  { label: "1.00 - 1.49", value: "1.00-1.49", min: 1.00, max: 1.49 },
  { label: "1.59 - 1.99", value: "1.59-1.99", min: 1.59, max: 1.99 },
  { label: "2.00 - 2.99", value: "2.00-2.99", min: 2.00, max: 2.99 },
  { label: "3.00 - 3.99", value: "3.00-3.99", min: 3.00, max: 3.99 },
  { label: "4.00 - 4.99", value: "4.00-4.99", min: 4.00, max: 4.99 },
  { label: "5.00 - 99.99", value: "5.00-99.99", min: 5.00, max: 99.99 },
];

interface CaratFilterProps {
  selectedRange?: string;
  onRangeChange?: (range: string) => void;
}

export default function CaratFilter({ selectedRange, onRangeChange }: CaratFilterProps) {
  const [fromValue, setFromValue] = useState("0.50");
  const [toValue, setToValue] = useState("");

  const handleRangeClick = (range: string) => {
    // Toggle logic: if clicked same range again, clear selection
    onRangeChange?.(selectedRange === range ? "" : range);
  };

  return (
    <div
      className="mb-3 mt-2"
      style={{ width: "fit-content", transform: "scale(0.95)", transformOrigin: "top left" }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-t"
        style={{ backgroundColor: "#000033" }}
      >
        <Gem className="text-white" size={22} />
        <span className="text-base font-semibold text-white">Carat</span>
      </div>

      <div className="p-3 bg-white rounded-b" style={{ border: "2px solid #f9e8cd" }}>
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded"
              style={{ border: "2px solid #e5e7eb" }}
              placeholder="From"
            />
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded"
              style={{ border: "2px solid #e5e7eb" }}
              placeholder="To"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {CARAT_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => handleRangeClick(range.value)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                selectedRange === range.value
                  ? "text-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                border:
                  selectedRange === range.value
                    ? "2px solid #2563eb"
                    : "2px solid #f9e8cd",
                minHeight: "38px",
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
