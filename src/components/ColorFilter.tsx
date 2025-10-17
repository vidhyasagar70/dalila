import React from "react";

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
  const handleColorClick = (color: string) => {
    if (selectedColor === color) {
      onColorChange("ALL");
    } else {
      onColorChange(color);
    }
  };

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <img src="/filtersicon/color.png" alt="Color" className="w-5 h-5" />
        <span className="text-base font-semibold text-white">Color</span>
      </div>
      <div
        className="grid grid-cols-5 gap-2 p-3 bg-white"
        style={{ border: "0.25px solid #f9e8cd", borderTop: "none" }}
      >
        {COLOROPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleColorClick(option.value)}
            className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
              selectedColor === option.value
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 52,
              border:
                selectedColor === option.value
                  ? "0.25px solid #2563eb"
                  : "0.25px solid #f9e8cd",
              minHeight: "32px",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}