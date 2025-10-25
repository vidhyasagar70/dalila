"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
  length: MeasurementRange;
  width: MeasurementRange;
  depth: MeasurementRange;
  table: MeasurementRange;
  depthPercent: MeasurementRange;
  ratio: MeasurementRange;
  crAngle: MeasurementRange;
  pavAngle: MeasurementRange;
  gridle: MeasurementRange;
  crHeight: MeasurementRange;
  pavHeight: MeasurementRange;
}

interface MeasurementFilterProps {
  measurements: MeasurementFilters;
  onMeasurementChange: (measurements: MeasurementFilters) => void;
}

export default function MeasurementFilter({
  measurements,
  onMeasurementChange,
}: MeasurementFilterProps) {
  const handleChange = (
    key: keyof MeasurementFilters,
    field: "from" | "to",
    value: string,
  ) => {
    const updatedMeasurements = {
      ...measurements,
      [key]: {
        ...measurements[key],
        [field]: value,
      },
    };
    onMeasurementChange(updatedMeasurements);
  };

  const incrementValue = (
    key: keyof MeasurementFilters,
    field: "from" | "to",
  ) => {
    const currentValue = parseFloat(measurements[key]?.[field] || "0.50");
    const newValue = (currentValue + 0.01).toFixed(2);
    handleChange(key, field, newValue);
  };

  const decrementValue = (
    key: keyof MeasurementFilters,
    field: "from" | "to",
  ) => {
    const currentValue = parseFloat(measurements[key]?.[field] || "0.50");
    const newValue = Math.max(0, currentValue - 0.01).toFixed(2);
    handleChange(key, field, newValue);
  };

  return (
    <div
      className={`${playFair.className} mb-2 mt-1`}
      style={{ width: "fit-content" }}
    >
      <div
        className="flex items-center gap-1.5 px-2 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <span className="text-sm font-semibold text-white">Measurement</span>
      </div>
      <div
        className="bg-white p-2"
        style={{ border: "1px solid #f9e8cd", borderTop: "none" }}
      >
        <div className="space-y-1.5">
          {MEASUREMENT_FIELDS.map((field) => (
            <div key={field.key} className="flex items-center gap-1.5">
              <div
                className="px-2 py-1 font-medium text-white rounded text-xs"
                style={{ backgroundColor: "#000033", minWidth: "80px" }}
              >
                {field.label}
              </div>

              {/* From Input */}
              <div
                className="flex items-center bg-white rounded"
                style={{ border: "1px solid #f9e8cd" }}
              >
                <input
                  type="number"
                  step="0.01"
                  value={
                    measurements[field.key as keyof MeasurementFilters]?.from ||
                    "0.50"
                  }
                  onChange={(e) =>
                    handleChange(
                      field.key as keyof MeasurementFilters,
                      "from",
                      e.target.value,
                    )
                  }
                  className="w-14 px-1.5 py-0.5 text-center text-xs outline-none"
                  style={{ appearance: "textfield", fontFamily: "inherit" }}
                />
                <div
                  className="flex flex-col border-l"
                  style={{ borderColor: "#f9e8cd" }}
                >
                  <button
                    onClick={() =>
                      incrementValue(
                        field.key as keyof MeasurementFilters,
                        "from",
                      )
                    }
                    className="px-1 hover:bg-gray-100 transition-colors"
                    style={{
                      fontSize: "9px",
                      lineHeight: "10px",
                      fontFamily: "inherit",
                    }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      decrementValue(
                        field.key as keyof MeasurementFilters,
                        "from",
                      )
                    }
                    className="px-1 hover:bg-gray-100 transition-colors border-t"
                    style={{
                      fontSize: "9px",
                      lineHeight: "10px",
                      borderColor: "#e5e7eb",
                      fontFamily: "inherit",
                    }}
                  >
                    ▼
                  </button>
                </div>
              </div>

              <span className="text-gray-500 text-xs font-medium">To</span>

              {/* To Input */}
              <div
                className="flex items-center bg-white rounded"
                style={{ border: "1px solid #f9e8cd" }}
              >
                <input
                  type="number"
                  step="0.01"
                  value={
                    measurements[field.key as keyof MeasurementFilters]?.to ||
                    "0.50"
                  }
                  onChange={(e) =>
                    handleChange(
                      field.key as keyof MeasurementFilters,
                      "to",
                      e.target.value,
                    )
                  }
                  className="w-14 px-1.5 py-0.5 text-center text-xs outline-none"
                  style={{ appearance: "textfield", fontFamily: "inherit" }}
                />
                <div
                  className="flex flex-col border-l"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <button
                    onClick={() =>
                      incrementValue(
                        field.key as keyof MeasurementFilters,
                        "to",
                      )
                    }
                    className="px-1 hover:bg-gray-100 transition-colors"
                    style={{
                      fontSize: "9px",
                      lineHeight: "10px",
                      fontFamily: "inherit",
                    }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      decrementValue(
                        field.key as keyof MeasurementFilters,
                        "to",
                      )
                    }
                    className="px-1 hover:bg-gray-100 transition-colors border-t"
                    style={{
                      fontSize: "9px",
                      lineHeight: "10px",
                      borderColor: "#e5e7eb",
                      fontFamily: "inherit",
                    }}
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
