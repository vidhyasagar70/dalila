import React, { useEffect, useState } from "react";
import { diamondApi } from "@/lib/api";

export interface PriceRange {
  from: string;
  to: string;
}

export interface PriceLocationFilters {
  pricePerCarat: PriceRange;
  discount: PriceRange;
  totalPrice: PriceRange;
  locations: string[];
  labs: string[];
}

interface PriceLocationFilterProps {
  filters: PriceLocationFilters;
  onFiltersChange: (filters: PriceLocationFilters) => void;
}

export default function PriceLocationFilter({
  filters,
  onFiltersChange,
}: PriceLocationFilterProps) {
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [labOptions, setLabOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await diamondApi.getFilterOptions();
        if (response?.success && response.data) {
          // Filter out empty strings from locations
          const locations = response.data.locations.filter(
            (l) => l.trim() !== ""
          );
          setLocationOptions(locations);

          // Filter out empty strings from labs
          const labs = response.data.labs.filter((l) => l.trim() !== "");
          setLabOptions(labs);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handlePriceChange = (
    field: "pricePerCarat" | "discount" | "totalPrice",
    type: "from" | "to",
    value: string
  ) => {
    onFiltersChange({
      ...filters,
      [field]: {
        ...filters[field],
        [type]: value,
      },
    });
  };

  const incrementValue = (
    field: "pricePerCarat" | "discount" | "totalPrice",
    type: "from" | "to"
  ) => {
    const currentValue = parseFloat(filters[field]?.[type] || "0.50");
    const newValue = (currentValue + 0.01).toFixed(2);
    handlePriceChange(field, type, newValue);
  };

  const decrementValue = (
    field: "pricePerCarat" | "discount" | "totalPrice",
    type: "from" | "to"
  ) => {
    const currentValue = parseFloat(filters[field]?.[type] || "0.50");
    const newValue = Math.max(0, currentValue - 0.01).toFixed(2);
    handlePriceChange(field, type, newValue);
  };

  const toggleLocation = (location: string) => {
    const currentLocations = filters.locations || [];
    const newLocations = currentLocations.includes(location)
      ? currentLocations.filter((l) => l !== location)
      : [...currentLocations, location];

    onFiltersChange({
      ...filters,
      locations: newLocations,
    });
  };

  const toggleLab = (lab: string) => {
    const currentLabs = filters.labs || [];
    const newLabs = currentLabs.includes(lab)
      ? currentLabs.filter((l) => l !== lab)
      : [...currentLabs, lab];

    onFiltersChange({
      ...filters,
      labs: newLabs,
    });
  };

  const isLocationSelected = (location: string) => {
    return filters.locations?.includes(location) || false;
  };

  const isLabSelected = (lab: string) => {
    return filters.labs?.includes(lab) || false;
  };

  if (loading) {
    return (
      <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ backgroundColor: "#000033" }}
        >
          <span className="text-base font-semibold text-white">Price</span>
        </div>
        <div
          className="p-3 bg-white flex items-center justify-center"
          style={{
            border: "0.25px solid #f9e8cd",
            borderTop: "none",
            minHeight: "150px",
          }}
        >
          <span className="text-gray-500">Loading filters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      {/* Price Section */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <span className="text-base font-semibold text-white">Price</span>
      </div>
      <div
        className="bg-white p-3"
        style={{ border: "0.25px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="space-y-2">
          {/* $/ct */}
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-1.5 font-medium text-white rounded text-xs"
              style={{ backgroundColor: "#000033", minWidth: "80px" }}
            >
              $/ct
            </div>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #f9e8cd" }}
            >
              <input
                type="number"
                step="0.01"
                value={filters.pricePerCarat?.from || "0.50"}
                onChange={(e) =>
                  handlePriceChange("pricePerCarat", "from", e.target.value)
                }
                className="w-16 px-2 py-1 text-center text-sm outline-none"
                style={{ appearance: "textfield" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#e5e7eb" }}
              >
                <button
                  onClick={() => incrementValue("pricePerCarat", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                  style={{ fontSize: "10px", lineHeight: "12px" }}
                >
                  ▲
                </button>
                <button
                  onClick={() => decrementValue("pricePerCarat", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{
                    fontSize: "10px",
                    lineHeight: "12px",
                    borderColor: "#e5e7eb",
                  }}
                >
                  ▼
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-sm font-medium">To</span>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #f9e8cd" }}
            >
              <input
                type="number"
                step="0.01"
                value={filters.pricePerCarat?.to || "0.50"}
                onChange={(e) =>
                  handlePriceChange("pricePerCarat", "to", e.target.value)
                }
                className="w-16 px-2 py-1 text-center text-sm outline-none"
                style={{ appearance: "textfield" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#f9e8cd" }}
              >
                <button
                  onClick={() => incrementValue("pricePerCarat", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                  style={{ fontSize: "10px", lineHeight: "12px" }}
                >
                  ▲
                </button>
                <button
                  onClick={() => decrementValue("pricePerCarat", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{
                    fontSize: "10px",
                    lineHeight: "12px",
                    borderColor: "#f9e8cd",
                  }}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Disc% */}
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-1.5 font-medium text-white rounded text-xs"
              style={{ backgroundColor: "#000033", minWidth: "80px" }}
            >
              Disc%
            </div>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #f9e8cd" }}
            >
              <input
                type="number"
                step="0.01"
                value={filters.discount?.from || "0.50"}
                onChange={(e) =>
                  handlePriceChange("discount", "from", e.target.value)
                }
                className="w-16 px-2 py-1 text-center text-sm outline-none"
                style={{ appearance: "textfield" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#e5e7eb" }}
              >
                <button
                  onClick={() => incrementValue("discount", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                  style={{ fontSize: "10px", lineHeight: "12px" }}
                >
                  ▲
                </button>
                <button
                  onClick={() => decrementValue("discount", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{
                    fontSize: "10px",
                    lineHeight: "12px",
                    borderColor: "#e5e7eb",
                  }}
                >
                  ▼
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-sm font-medium">To</span>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #f9e8cd" }}
            >
              <input
                type="number"
                step="0.01"
                value={filters.discount?.to || "0.50"}
                onChange={(e) =>
                  handlePriceChange("discount", "to", e.target.value)
                }
                className="w-16 px-2 py-1 text-center text-sm outline-none"
                style={{ appearance: "textfield" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#e5e7eb" }}
              >
                <button
                  onClick={() => incrementValue("discount", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                  style={{ fontSize: "10px", lineHeight: "12px" }}
                >
                  ▲
                </button>
                <button
                  onClick={() => decrementValue("discount", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{
                    fontSize: "10px",
                    lineHeight: "12px",
                    borderColor: "#e5e7eb",
                  }}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Total $ */}
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-1.5 font-medium text-white rounded text-xs"
              style={{ backgroundColor: "#000033", minWidth: "80px" }}
            >
              Total $
            </div>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #f9e8cd" }}
            >
              <input
                type="number"
                step="0.01"
                value={filters.totalPrice?.from || "0.50"}
                onChange={(e) =>
                  handlePriceChange("totalPrice", "from", e.target.value)
                }
                className="w-16 px-2 py-1 text-center text-sm outline-none"
                style={{ appearance: "textfield" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#f9e8cd" }}
              >
                <button
                  onClick={() => incrementValue("totalPrice", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                  style={{ fontSize: "10px", lineHeight: "12px" }}
                >
                  ▲
                </button>
                <button
                  onClick={() => decrementValue("totalPrice", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{
                    fontSize: "10px",
                    lineHeight: "12px",
                    borderColor: "#f9e8cd",
                  }}
                >
                  ▼
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-sm font-medium">To</span>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #f9e8cd" }}
            >
              <input
                type="number"
                step="0.01"
                value={filters.totalPrice?.to || "0.50"}
                onChange={(e) =>
                  handlePriceChange("totalPrice", "to", e.target.value)
                }
                className="w-16 px-2 py-1 text-center text-sm outline-none"
                style={{ appearance: "textfield" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#f9e8cd" }}
              >
                <button
                  onClick={() => incrementValue("totalPrice", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                  style={{ fontSize: "10px", lineHeight: "12px" }}
                >
                  ▲
                </button>
                <button
                  onClick={() => decrementValue("totalPrice", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{
                    fontSize: "10px",
                    lineHeight: "12px",
                    borderColor: "#f9e8cd",
                  }}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div
        className="px-3 py-1.5 font-medium text-white text-xs"
        style={{ backgroundColor: "#000033" }}
      >
        Location
      </div>
      <div
        className="bg-white p-3"
        style={{ border: "0.25px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="grid grid-cols-5 gap-2">
          {locationOptions.map((location) => (
            <button
              key={location}
              onClick={() => toggleLocation(location)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                isLocationSelected(location)
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: "60px",
                minHeight: "32px",
                border: isLocationSelected(location)
                  ? "0.25px solid #2563eb"
                  : "0.25px solid #f9e8cd",
              }}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Section */}
      <div
        className="px-3 py-1.5 font-medium text-white text-xs"
        style={{ backgroundColor: "#000033" }}
      >
        Lab :
      </div>
      <div
        className="bg-white p-3"
        style={{ border: "0.25px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="grid grid-cols-4 gap-2">
          {labOptions.map((lab) => (
            <button
              key={lab}
              onClick={() => toggleLab(lab)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                isLabSelected(lab)
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: "65px",
                minHeight: "32px",
                border: isLabSelected(lab)
                  ? "0.25px solid #2563eb"
                  : "0.25px solid #f9e8cd",
              }}
            >
              {lab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}