"use client";
import React from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Static color options matching your UI image
const STATIC_COLOR_OPTIONS = [
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
      onColorChange("");
    } else {
      onColorChange(color);
    }
  };

  return (
    <div className="mb-1.5 mt-0.5" style={{ width: "360px" }}>
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <Image
          src="/filtersicon/color.png"
          alt="Color"
          width={18}
          height={18}
          className="w-4.5 h-4.5"
        />
        <span
          className={`${playFair.className} text-base font-semibold text-white`}
        >
          Color
        </span>
      </div>

      <div
        className="grid grid-cols-5 gap-1 p-1.5 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
        }}
      >
        {STATIC_COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleColorClick(option.value)}
            className={`${playFair.className} px-1 py-0.5 rounded text-xs font-medium transition-colors ${
              selectedColor === option.value
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 44,
              border:
                selectedColor === option.value
                  ? "0.25px solid #2563eb"
                  : "0.25px solid #f9e8cd",
              minHeight: "41px",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
