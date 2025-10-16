import React from "react";
import { Palette } from "lucide-react"; // Lucide icon

const COLOROPTIONS = [
  { label: "All", value: "ALL" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
  { label: "H", value: "H" },
  { label: "I", value: "I" },
  { label: "J", value: "J" },
  { label: "K", value: "K" },
  { label: "L", value: "L" },
  { label: "M", value: "M" },
  { label: "N", value: "N" },
  { label: "N-Z", value: "N-Z" },
  { label: "Fancy", value: "FANCY" },
];

interface ColorFilterProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorFilter({
  selectedColor,
  onColorChange,
}: ColorFilterProps) {
  // Toggle logic — if user clicks the same color again, clear the filter
  const handleColorClick = (color: string) => {
    if (selectedColor === color) {
      onColorChange("ALL"); // Reset to "ALL" or empty filter
    } else {
      onColorChange(color);
    }
  };

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-t"
        style={{ backgroundColor: "#000033" }}
      >
        <Palette size={20} className="text-white opacity-90" />
        <span className="text-lg font-semibold text-white">Color</span>
      </div>

      {/* Options */}
      <div
        className="grid grid-cols-5 gap-2 p-4 bg-white rounded-b"
        style={{ border: "2px solid #f9e8cd" }}
      >
        {COLOROPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleColorClick(option.value)}
            className={`px-4 py-2 rounded text-base font-medium transition-colors ${
              selectedColor === option.value
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 65,
              border:
                selectedColor === option.value
                  ? "2px solid #2563eb"
                  : "2px solid #f9e8cd",
              minHeight: "44px",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
