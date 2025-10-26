import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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

// Static options
const STATIC_LOCATION_OPTIONS = ["MUM", "BEL", "DUB", "HK", "NYC"];
const STATIC_LAB_OPTIONS = ["GIA", "IGI", "HRD", "OTHER"];

export default function PriceLocationFilter({
  filters,
  onFiltersChange,
}: PriceLocationFilterProps) {
  const handlePriceChange = (
    field: "pricePerCarat" | "discount" | "totalPrice",
    type: "from" | "to",
    value: string,
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
    type: "from" | "to",
  ) => {
    const currentValue = parseFloat(filters[field]?.[type] || "0.50");
    const newValue = (currentValue + 0.01).toFixed(2);
    handlePriceChange(field, type, newValue);
  };

  const decrementValue = (
    field: "pricePerCarat" | "discount" | "totalPrice",
    type: "from" | "to",
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
    <div
      className={`${mavenPro.className} mb-2 mt-1`}
      style={{ width: "fit-content" }}
    >
      {/* Price Section */}
      <div
        className="flex items-center gap-1.5 px-2 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <span className="text-sm font-semibold text-white">Price</span>
      </div>
      <div
        className="bg-white p-2"
        style={{ border: "1px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="space-y-1.5">
          {/* $/ct */}
          <div className="flex items-center gap-1.5">
            <div
              className="px-2 py-1 font-medium text-white rounded text-xs"
              style={{ backgroundColor: "#000033", minWidth: "65px" }}
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
                className="w-14 px-1.5 py-0.5 text-center text-xs outline-none"
                style={{ appearance: "textfield", fontFamily: "inherit" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#e5e7eb" }}
              >
                <button
                  onClick={() => incrementValue("pricePerCarat", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                >
                  <ChevronUp className="w-3 h-3 text-gray-600" />
                </button>
                <button
                  onClick={() => decrementValue("pricePerCarat", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-xs font-medium">To</span>

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
                className="w-14 px-1.5 py-0.5 text-center text-xs outline-none"
                style={{ appearance: "textfield", fontFamily: "inherit" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#f9e8cd" }}
              >
                <button
                  onClick={() => incrementValue("pricePerCarat", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                >
                  <ChevronUp className="w-3 h-3 text-gray-600" />
                </button>
                <button
                  onClick={() => decrementValue("pricePerCarat", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{ borderColor: "#f9e8cd" }}
                >
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Disc% */}
          <div className="flex items-center gap-1.5">
            <div
              className="px-2 py-1 font-medium text-white rounded text-xs"
              style={{ backgroundColor: "#000033", minWidth: "65px" }}
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
                className="w-14 px-1.5 py-0.5 text-center text-xs outline-none"
                style={{ appearance: "textfield", fontFamily: "inherit" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#e5e7eb" }}
              >
                <button
                  onClick={() => incrementValue("discount", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                >
                  <ChevronUp className="w-3 h-3 text-gray-600" />
                </button>
                <button
                  onClick={() => decrementValue("discount", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-xs font-medium">To</span>

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
                className="w-14 px-1.5 py-0.5 text-center text-xs outline-none"
                style={{ appearance: "textfield", fontFamily: "inherit" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#e5e7eb" }}
              >
                <button
                  onClick={() => incrementValue("discount", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                >
                  <ChevronUp className="w-3 h-3 text-gray-600" />
                </button>
                <button
                  onClick={() => decrementValue("discount", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Total $ */}
          <div className="flex items-center gap-1.5">
            <div
              className="px-2 py-1 font-medium text-white rounded text-xs"
              style={{ backgroundColor: "#000033", minWidth: "65px" }}
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
                className="w-14 px-1.5 py-0.5 text-center text-xs outline-none"
                style={{ appearance: "textfield", fontFamily: "inherit" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#f9e8cd" }}
              >
                <button
                  onClick={() => incrementValue("totalPrice", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                >
                  <ChevronUp className="w-3 h-3 text-gray-600" />
                </button>
                <button
                  onClick={() => decrementValue("totalPrice", "from")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{ borderColor: "#f9e8cd" }}
                >
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>

            <span className="text-gray-500 text-xs font-medium">To</span>

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
                className="w-14 px-1.5 py-0.5 text-center text-xs outline-none"
                style={{ appearance: "textfield", fontFamily: "inherit" }}
              />
              <div
                className="flex flex-col border-l"
                style={{ borderColor: "#f9e8cd" }}
              >
                <button
                  onClick={() => incrementValue("totalPrice", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors"
                >
                  <ChevronUp className="w-3 h-3 text-gray-600" />
                </button>
                <button
                  onClick={() => decrementValue("totalPrice", "to")}
                  className="px-1 hover:bg-gray-100 transition-colors border-t"
                  style={{ borderColor: "#f9e8cd" }}
                >
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div
        className="px-2 py-1.5 font-medium text-white text-sm flex items-center gap-2"
        style={{ backgroundColor: "#000033" }}
      >
        <span>Location</span>
      </div>
      <div
        className="bg-white p-2"
        style={{ border: "1px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="grid grid-cols-5 gap-1.5">
          {STATIC_LOCATION_OPTIONS.map((location) => (
            <button
              key={location}
              onClick={() => toggleLocation(location)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                isLocationSelected(location)
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: "50px",
                minHeight: "28px",
                fontFamily: "inherit",
                border: isLocationSelected(location)
                  ? "1px solid #2563eb"
                  : "1px solid #f9e8cd",
              }}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Section */}
      <div
        className="px-2 py-1.5 font-medium text-white text-sm flex items-center gap-2"
        style={{ backgroundColor: "#000033" }}
      >
        <span>Lab :</span>
      </div>
      <div
        className="bg-white p-2"
        style={{ border: "1px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="grid grid-cols-4 gap-1.5">
          {STATIC_LAB_OPTIONS.map((lab) => (
            <button
              key={lab}
              onClick={() => toggleLab(lab)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                isLabSelected(lab)
                  ? "text-blue-600 bg-blue-50"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: "55px",
                minHeight: "28px",
                fontFamily: "inherit",
                border: isLabSelected(lab)
                  ? "1px solid #2563eb"
                  : "1px solid #f9e8cd",
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
