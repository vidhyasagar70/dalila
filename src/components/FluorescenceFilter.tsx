import React, { useEffect, useState } from "react";
import { diamondApi } from "@/lib/api";

interface FluorFilterProps {
  selectedFluor: string[];
  onFluorChange: (fluor: string[]) => void;
}

export default function FluorFilter({
  selectedFluor,
  onFluorChange,
}: FluorFilterProps) {
  const [fluorOptions, setFluorOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await diamondApi.getFilterOptions();
        if (response?.success && response.data) {
          // Filter out empty strings from fluorescence types
          const fluorTypes = response.data.fluorescenceTypes.filter(
            (f) => f.trim() !== ""
          );
          setFluorOptions(fluorTypes);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFluorClick = (value: string) => {
    if (selectedFluor.includes(value)) {
      onFluorChange(selectedFluor.filter((f) => f !== value));
    } else {
      onFluorChange([...selectedFluor, value]);
    }
  };

  if (loading) {
    return (
      <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ backgroundColor: "#000033" }}
        >
          <img src="/filtersicon/flour.png" alt="Fluor" className="w-5 h-5" />
          <span className="text-base font-semibold text-white">Fluor</span>
        </div>
        <div
          className="p-3 bg-white flex items-center justify-center"
          style={{
            border: "0.25px solid #f9e8cd",
            borderTop: "none",
            minHeight: "100px",
          }}
        >
          <span className="text-gray-500">Loading filters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <img src="/filtersicon/flour.png" alt="Fluor" className="w-5 h-5" />
        <span className="text-base font-semibold text-white">Fluor</span>
      </div>

      {/* Buttons */}
      <div
        className="grid grid-cols-4 gap-2 p-3 bg-white"
        style={{ border: "0.25px solid #f9e8cd", borderTop: "none" }}
      >
        {fluorOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleFluorClick(option)}
            className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
              selectedFluor.includes(option)
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 52,
              border: selectedFluor.includes(option)
                ? "0.25px solid #2563eb"
                : "0.25px solid #f9e8cd",
              minHeight: "32px",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}