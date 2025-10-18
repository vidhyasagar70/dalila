import React, { useState, useEffect } from "react";
import { diamondApi } from "@/lib/api"; 

interface CaratFilterProps {
  selectedMinCarat: string;
  selectedMaxCarat: string;
  onCaratChange: (min: string, max: string) => void;
}

interface CaratRange {
  label: string;
  value: string;
  min: number;
  max: number;
}

export default function CaratFilter({
  selectedMinCarat,
  selectedMaxCarat,
  onCaratChange,
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

  // Sync local state with props when they change externally (e.g., reset filters)
  useEffect(() => {
    if (!selectedMinCarat && !selectedMaxCarat && availableRanges.length > 0) {
      // Reset to default range when filters are cleared
      setFromValue(availableRanges[0].min.toString());
      setToValue(availableRanges[0].max.toString());
    }
  }, [selectedMinCarat, selectedMaxCarat, availableRanges]);

  // Update parent when input values change
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    if (value && toValue) {
      console.log('Carat from changed to:', value);
      onCaratChange(value, toValue);
    } else if (!value && !toValue) {
      // Both empty - clear filter
      console.log('Both inputs empty - clearing filter');
      onCaratChange("", "");
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToValue(value);
    if (fromValue && value) {
      console.log('Carat to changed to:', value);
      onCaratChange(fromValue, value);
    } else if (!fromValue && !value) {
      // Both empty - clear filter
      console.log('Both inputs empty - clearing filter');
      onCaratChange("", "");
    }
  };

  const handleRangeClick = (range: CaratRange) => {
    console.log('Carat range clicked:', range);
    console.log('Current selectedMinCarat:', selectedMinCarat);
    console.log('Current selectedMaxCarat:', selectedMaxCarat);
    
    // Check if this range is already selected
    const isSelected = selectedMinCarat === range.min.toString() && 
                      selectedMaxCarat === range.max.toString();
    
    console.log('Is selected:', isSelected);
    
    if (isSelected) {
      // Clicking the same range again - clear the filter
      console.log('Same range clicked - clearing filter');
      setFromValue(range.min.toString());
      setToValue(range.max.toString());
      onCaratChange("", "");
    } else {
      // Select new range
      console.log('New range selected - applying filter');
      setFromValue(range.min.toString());
      setToValue(range.max.toString());
      onCaratChange(range.min.toString(), range.max.toString());
    }
  };

  return (
    <div className="mb-2 mt-1" style={{ width: "360px" }}>
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
          minHeight: "288px", 
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
            {/* Input Fields */}
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.01"
                  value={fromValue}
                  onChange={handleFromChange}
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
                  onChange={handleToChange}
                  className="w-full px-2 py-1.5 text-xs rounded"
                  style={{
                    border: "0.25px solid #f9e8cd",
                    minHeight: "36px",
                  }}
                  placeholder="To"
                />
              </div>
            </div>

            {/* Range Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {availableRanges.map((range) => {
                const isSelected = selectedMinCarat === range.min.toString() && 
                                  selectedMaxCarat === range.max.toString();
                
                return (
                  <button
                    key={range.value}
                    onClick={() => handleRangeClick(range)}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      isSelected
                        ? "text-blue-600 bg-blue-50"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      border: isSelected
                        ? "0.25px solid #2563eb"
                        : "0.25px solid #f9e8cd",
                      minHeight: "36px",
                      minWidth: "90px",
                    }}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}