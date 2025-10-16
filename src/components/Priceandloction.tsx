import React from "react";

const LOCATION_OPTIONS = ["MUM", "BEL", "DUB", "HK", "NYC"];

const LAB_OPTIONS = ["GIA", "IGI", "HRD", "OTHER"];

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

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      {/* Price Section */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-t"
        style={{ backgroundColor: "#000033" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
          <path
            d="M12 6v12M9 8h4.5c.83 0 1.5.67 1.5 1.5S14.33 11 13.5 11H9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 13h4.5c.83 0 1.5.67 1.5 1.5S14.33 16 13.5 16H9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-lg font-semibold text-white">Price</span>
      </div>
      <div
        className="bg-white p-3"
        style={{
          borderLeft: "2px solid #f9e8cd",
          borderRight: "2px solid #f9e8cd",
        }}
      >
        <div className="space-y-2">
          {/* $/ct */}
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-2 font-medium text-white rounded text-sm"
              style={{ backgroundColor: "#000033", minWidth: "80px" }}
            >
              $/ct
            </div>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #e5e7eb" }}
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
                  style={{ fontSize: "10px", lineHeight: "12px", borderColor: "#e5e7eb" }}
                >
                  ▼
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-sm font-medium">To</span>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #e5e7eb" }}
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
                style={{ borderColor: "#e5e7eb" }}
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
                  style={{ fontSize: "10px", lineHeight: "12px", borderColor: "#e5e7eb" }}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Disc% */}
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-2 font-medium text-white rounded text-sm"
              style={{ backgroundColor: "#000033", minWidth: "80px" }}
            >
              Disc%
            </div>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #e5e7eb" }}
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
                  style={{ fontSize: "10px", lineHeight: "12px", borderColor: "#e5e7eb" }}
                >
                  ▼
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-sm font-medium">To</span>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #e5e7eb" }}
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
                  style={{ fontSize: "10px", lineHeight: "12px", borderColor: "#e5e7eb" }}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Total $ */}
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-2 font-medium text-white rounded text-sm"
              style={{ backgroundColor: "#000033", minWidth: "80px" }}
            >
              Total $
            </div>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #e5e7eb" }}
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
                style={{ borderColor: "#e5e7eb" }}
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
                  style={{ fontSize: "10px", lineHeight: "12px", borderColor: "#e5e7eb" }}
                >
                  ▼
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-sm font-medium">To</span>

            <div
              className="flex items-center bg-white rounded"
              style={{ border: "1px solid #e5e7eb" }}
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
                style={{ borderColor: "#e5e7eb" }}
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
                  style={{ fontSize: "10px", lineHeight: "12px", borderColor: "#e5e7eb" }}
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
        className="px-3 py-2 font-medium text-white text-sm"
        style={{ backgroundColor: "#000033" }}
      >
        Location
      </div>
      <div
        className="bg-white p-3"
        style={{
          borderLeft: "2px solid #f9e8cd",
          borderRight: "2px solid #f9e8cd",
        }}
      >
        <div className="grid grid-cols-5 gap-2">
          {LOCATION_OPTIONS.map((location) => (
            <button
              key={location}
              onClick={() => toggleLocation(location)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                isLocationSelected(location)
                  ? "text-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: "60px",
                border: isLocationSelected(location)
                  ? "2px solid #2563eb"
                  : "2px solid #f9e8cd",
              }}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Section */}
      <div
        className="px-3 py-2 font-medium text-white text-sm"
        style={{ backgroundColor: "#000033" }}
      >
        Lab :
      </div>
      <div
        className="bg-white p-3 rounded-b"
        style={{ border: "2px solid #f9e8cd" }}
      >
        <div className="grid grid-cols-4 gap-2">
          {LAB_OPTIONS.map((lab) => (
            <button
              key={lab}
              onClick={() => toggleLab(lab)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                isLabSelected(lab)
                  ? "text-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: "65px",
                border: isLabSelected(lab)
                  ? "2px solid #2563eb"
                  : "2px solid #f9e8cd",
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

