import React from "react";

const FLUOR_OPTIONS = [
  { label: "NON", value: "NON" },
  { label: "VSL", value: "VSL" },
  { label: "FNT", value: "FNT" },
  { label: "SL", value: "SL" },
  { label: "MED", value: "MED" },
  { label: "STG", value: "STG" },
  { label: "VST", value: "VST" },
];

interface FluorFilterProps {
  selectedFluor: string[];
  onFluorChange: (fluor: string[]) => void;
}

export default function FluorFilter({
  selectedFluor,
  onFluorChange,
}: FluorFilterProps) {
  const handleFluorClick = (value: string) => {
    if (selectedFluor.includes(value)) {
      onFluorChange(selectedFluor.filter((f) => f !== value));
    } else {
      onFluorChange([...selectedFluor, value]);
    }
  };

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <img
          src="/filtersicon/flour.png"
          alt="Fluor"
          className="w-5 h-5"
        />
        <span className="text-base font-semibold text-white">Fluor</span>
      </div>

      {/* Buttons */}
      <div
        className="grid grid-cols-4 gap-2 p-3 bg-white"
        style={{ border: "2px solid #f9e8cd", borderTop: "none" }}
      >
        {FLUOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleFluorClick(option.value)}
            className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
              selectedFluor.includes(option.value)
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 52,
              border: selectedFluor.includes(option.value)
                ? "2px solid #2563eb"
                : "2px solid #f9e8cd",
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
