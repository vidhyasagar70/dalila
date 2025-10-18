// ColorFilter.tsx
import React, { useEffect, useState } from "react";
import { diamondApi } from "@/lib/api";
import Image from "next/image"; 
interface ColorFilterProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorFilter({
  selectedColor,
  onColorChange,
}: ColorFilterProps) {
  const [colorOptions, setColorOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const response = await diamondApi.getFilterOptions();
        
        if (response?.success && response.data?.colors) {
          const colors = response.data.colors;
          
          const dynamicColors = colors
            .filter((color: string) => color && color !== "*" && color !== "")
            .map((color: string) => ({
              label: formatColorLabel(color),
              value: color
            }));
          
          setColorOptions(dynamicColors);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
        setColorOptions([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const formatColorLabel = (color: string): string => {
    if (color === "FANCY") return "Fancy";
    if (color === "FANCY INTENSE YELLOW") return "Fancy Int. Yellow";
    if (color === "O-P") return "O-P";
    if (color === "U-V") return "U-V";
    if (color.includes("+")) return color;
    return color;
  };

  const handleColorClick = (color: string) => {
    if (selectedColor === color) {
      onColorChange("");
    } else {
      onColorChange(color);
    }
  };

  if (loading) {
    return (
      <div className="mb-2 mt-1" style={{ width: "360px" }}>
        <div
  className="flex items-center gap-2 px-3 py-2"
  style={{ backgroundColor: "#000033" }}
>
  <Image src="/filtersicon/color.png" alt="Color" className="w-5 h-5" />
  <span className="text-base font-semibold text-white">Color</span>
</div>
        <div
          className="p-2 bg-white text-center"
          style={{ 
            border: "0.25px solid #f9e8cd", 
            borderTop: "none",
            height: "288px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span className="text-sm text-gray-500">Loading colors...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-2 mt-1" style={{ width: "340px" }}>
      <div
  className="flex items-center gap-2 px-3 py-2"
  style={{ backgroundColor: "#000033" }}
>
  <Image src="/filtersicon/color.png" alt="Color" className="w-5 h-5" />
  <span className="text-base font-semibold text-white">Color</span>
</div>
      <div
        className="grid grid-cols-5 gap-1.5 p-2 bg-white"
        style={{ 
          border: "0.25px solid #f9e8cd", 
          borderTop: "none",
          height: "288px",
        }}
      >
        {colorOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleColorClick(option.value)}
            className={`px-1.5 py-1 rounded text-xs font-medium transition-colors ${
              selectedColor === option.value
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 48,
              border:
                selectedColor === option.value
                  ? "0.25px solid #2563eb"
                  : "0.25px solid #f9e8cd",
              minHeight: "28px",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}