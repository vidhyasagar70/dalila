"use client";
import React from "react";
import Image from "next/image";
import { Maven_Pro } from "next/font/google";
import { Save } from "lucide-react";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const STATIC_COLOR_OPTIONS = [
  {label:"ALL",value:"ALL"},
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
  { label: "H", value: "H" },
  
];

interface ColorFilterProps {
  selectedColor: string[]; // Changed to array
  onColorChange: (color: string[]) => void; // Changed to array
  onSaveParameters?: () => void;
}

export default function ColorFilterLimited({
  selectedColor,
  onColorChange,
  onSaveParameters,
}: ColorFilterProps) {
  const handleColorClick = (color: string) => {
    const currentColors = Array.isArray(selectedColor) ? selectedColor : [];

    if (currentColors.includes(color)) {
      // Remove color if already selected
      onColorChange(currentColors.filter((c) => c !== color));
    } else {
      // Add color to selection
      onColorChange([...currentColors, color]);
    }
  };

  const isSelected = (color: string) => {
    return Array.isArray(selectedColor) && selectedColor.includes(color);
  };

  return (
    <div>
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <Image
          src="/filtersicon/color.png"
          alt="Color"
          width={18}
          height={18}
          className="w-7 h-6"
        />
        <span
          className={`${mavenPro.className} text-base font-normal text-white`}
        >
          Color
        </span>
      </div>
      <div
        className="grid grid-cols-3 gap-1 p-1.5 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
        }}
      >
        {STATIC_COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleColorClick(option.value)}
            className={`${mavenPro.className} px-1 py-1 text-sm font-normal transition-colors ${
              isSelected(option.value)
                ? "text-gray-800 bg-[#FAF6EB]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 40,
              border: isSelected(option.value)
                ? "0.25px solid #FAF6EB"
                : "0.25px solid #f9e8cd",
              borderRadius: "0",
              minHeight: "32px",
              fontSize: "13px",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      {/* Save Parameters Button */}
      <button
        onClick={onSaveParameters}
        className={`${mavenPro.className} w-full flex items-center justify-center gap-2 px-3 py-2 text-white font-normal transition-colors hover:opacity-90`}
        style={{
          backgroundColor: "#000033",
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
          fontSize: "14px",
        }}
      >
        <Save size={16} strokeWidth={2} />
        <span>Save Parameters</span>
      </button>
    </div>
  );
}
