import React, { useState, useEffect } from "react";
import { diamondApi } from "@/lib/api"; 

interface CaratFilterProps {
  selectedRange?: string;
  onRangeChange?: (range: string) => void;
}

interface CaratRange {
  label: string;
  value: string;
  min: number;
  max: number;
}

export default function CaratFilter({
  selectedRange,
  onRangeChange,
}: CaratFilterProps) {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [availableRanges, setAvailableRanges] = useState<CaratRange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaratRange = async () => {
      try {
        setLoading(true);
        const response = await diamondApi.getFilterOptions();

        if (response?.success && response.data?.caratRange) {
          const { min, max } = response.data.caratRange;

          // Build a single range object dynamically from backend data
          const range = [
            {
              label: `${min.toFixed(2)} - ${max.toFixed(2)}`,
              value: `${min}-${max}`,
              min,
              max,
            },
          ];

          setAvailableRanges(range);
          setFromValue(min.toString());
          setToValue(max.toString());
        } else {
          setAvailableRanges([]);
        }
      } catch (error) {
        console.error("Error fetching carat range:", error);
        setAvailableRanges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaratRange();
  }, []);

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

      {/* Body */}
      <div
        className="p-3 bg-white"
        style={{
          border: "0.25px solid #f9e8cd",
          borderTop: "none",
          minHeight: "180px", // ✅ keeps UI fixed even if one range
        }}
      >
        {loading ? (
          <div className="text-center py-4">
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        ) : availableRanges.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            No carat data available
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.01"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs rounded"
                  style={{
                    border: "0.25px solid #f9e8cd",
                    minHeight: "36px",
                  }}
                  placeholder="From"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.01"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs rounded"
                  style={{
                    border: "0.25px solid #f9e8cd",
                    minHeight: "36px",
                  }}
                  placeholder="To"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {availableRanges.map((range) => (
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
                        ? "0.25px solid #2563eb"
                        : "0.25px solid #f9e8cd",
                    minHeight: "36px",
                    minWidth: "90px",
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
