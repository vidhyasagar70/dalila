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

export default function ColorFilter({ selectedColor, onColorChange }: ColorFilterProps) {
  return (
    <div className="mb-4 mt-2" style={{ width: 'fit-content' }}>
      <div className="flex items-center gap-2 px-3 py-2 rounded-t" style={{ backgroundColor: '#000033' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" fill="white" opacity="0.9"/>
          <circle cx="9" cy="10" r="1.5" fill="#000033"/>
          <circle cx="15" cy="10" r="1.5" fill="#000033"/>
          <circle cx="12" cy="14" r="1.2" fill="#000033"/>
          <circle cx="8" cy="15" r="0.8" fill="#000033"/>
          <circle cx="16" cy="15" r="0.8" fill="#000033"/>
        </svg>
        <span className="text-lg font-semibold text-white">
          Color
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2 p-3 bg-white rounded-b" style={{ border: '2px solid #f9e8cd' }}>
        {COLOROPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onColorChange(option.value)}
            className={`px-3 py-1.5 rounded text-base font-medium transition-colors ${
              selectedColor === option.value
                ? "text-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{ 
              minWidth: 55,
              border: selectedColor === option.value ? '2px solid #2563eb' : '2px solid #f9e8cd'
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}