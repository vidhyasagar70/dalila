
import React, { useState } from "react";

const MEASUREMENT_FIELDS = [
  { label: "Length", key: "length" },
  { label: "Width", key: "width" },
  { label: "Depth", key: "depth" },
  { label: "Table %", key: "table" },
  { label: "Depth %", key: "depthPercent" },
  { label: "Ratio", key: "ratio" },
  { label: "Cr.Angle", key: "crAngle" },
  { label: "Pav.Angle", key: "pavAngle" },
  { label: "Gridle %", key: "gridle" },
  { label: "Cr.Height", key: "crHeight" },
  { label: "Pav.Height", key: "pavHeight" },
];

interface MeasurementRange {
  from: string;
  to: string;
}

export interface MeasurementFilters {
  [key: string]: MeasurementRange;
}

interface MeasurementFilterProps {
  measurements: MeasurementFilters;
  onMeasurementChange: (measurements: MeasurementFilters) => void;
}

export default function MeasurementFilter({
  measurements,
  onMeasurementChange,
}: MeasurementFilterProps) {
  const handleChange = (key: string, field: "from" | "to", value: string) => {
    const updatedMeasurements = {
      ...measurements,
      [key]: {
        ...measurements[key],
        [field]: value,
      },
    };
    onMeasurementChange(updatedMeasurements);
  };

  const incrementValue = (key: string, field: "from" | "to") => {
    const currentValue = parseFloat(measurements[key]?.[field] || "0.50");
    const newValue = (currentValue + 0.01).toFixed(2);
    handleChange(key, field, newValue);
  };

  const decrementValue = (key: string, field: "from" | "to") => {
    const currentValue = parseFloat(measurements[key]?.[field] || "0.50");
    const newValue = Math.max(0, currentValue - 0.01).toFixed(2);
    handleChange(key, field, newValue);
  };

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
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
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="7" cy="6" r="1.5" fill="white" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
          <circle cx="17" cy="18" r="1.5" fill="white" />
        </svg>
        <span className="text-lg font-semibold text-white">Measurement</span>
      </div>
      <div
        className="bg-white rounded-b p-3"
        style={{ border: "2px solid #f9e8cd" }}
      >
        <div className="space-y-2">
          {MEASUREMENT_FIELDS.map((field) => (
            <div key={field.key} className="flex items-center gap-2">
              <div
                className="px-3 py-2 font-medium text-white rounded text-sm"
                style={{ backgroundColor: "#000033", minWidth: "100px" }}
              >
                {field.label}
              </div>
              
              {/* From Input */}
              <div className="flex items-center bg-white rounded" style={{ border: "1px solid #e5e7eb" }}>
                <input
                  type="number"
                  step="0.01"
                  value={measurements[field.key]?.from || "0.50"}
                  onChange={(e) =>
                    handleChange(field.key, "from", e.target.value)
                  }
                  className="w-16 px-2 py-1 text-center text-sm outline-none"
                  style={{ appearance: "textfield" }}
                />
                <div className="flex flex-col border-l" style={{ borderColor: "#e5e7eb" }}>
                  <button
                    onClick={() => incrementValue(field.key, "from")}
                    className="px-1 hover:bg-gray-100 transition-colors"
                    style={{ fontSize: "10px", lineHeight: "12px" }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => decrementValue(field.key, "from")}
                    className="px-1 hover:bg-gray-100 transition-colors border-t"
                    style={{ fontSize: "10px", lineHeight: "12px", borderColor: "#e5e7eb" }}
                  >
                    ▼
                  </button>
                </div>
              </div>

              <span className="text-gray-500 text-sm font-medium">To</span>

              {/* To Input */}
              <div className="flex items-center bg-white rounded" style={{ border: "1px solid #e5e7eb" }}>
                <input
                  type="number"
                  step="0.01"
                  value={measurements[field.key]?.to || "0.50"}
                  onChange={(e) =>
                    handleChange(field.key, "to", e.target.value)
                  }
                  className="w-16 px-2 py-1 text-center text-sm outline-none"
                  style={{ appearance: "textfield" }}
                />
                <div className="flex flex-col border-l" style={{ borderColor: "#e5e7eb" }}>
                  <button
                    onClick={() => incrementValue(field.key, "to")}
                    className="px-1 hover:bg-gray-100 transition-colors"
                    style={{ fontSize: "10px", lineHeight: "12px" }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => decrementValue(field.key, "to")}
                    className="px-1 hover:bg-gray-100 transition-colors border-t"
                    style={{ fontSize: "10px", lineHeight: "12px", borderColor: "#e5e7eb" }}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}