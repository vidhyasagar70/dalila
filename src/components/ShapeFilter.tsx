import React from "react";
import { Diamond } from "lucide-react";

const SHAPE_OPTIONS = [
  { label: "Round", value: "ROUND", image: "/shapefilter/vector (4).png" },
  { label: "Radiant", value: "RADIANT", image: "/shapefilter/vector (3).png" },
  { label: "Pear", value: "PEAR", image: "/shapefilter/vector (2).png" },
  { label: "Square", value: "SQUARE", image: "/shapefilter/vector.png" },
  { label: "Emerald", value: "EMERALD", image: "/shapefilter/vector (5).png" },
  { label: "Oval", value: "OVAL", image: "/shapefilter/vector-oval.png" },
  { label: "Cushion", value: "CUSHION", image: "/shapefilter/vector (6).png" },
  { label: "Trilliant", value: "TRILLIANT", image: "/shapefilter/vector (7).png" },
  { label: "Heart", value: "HEART", image: "/shapefilter/Vector-heart.png" },
  { label: "Princess", value: "PRINCESS", image: "/shapefilter/vector_princess.png" },
  { label: "Marquise", value: "MARQUISE", image: "/shapefilter/vector_marque.png" },
  { label: "Other", value: "OTHER", image: "/shapefilter/others.png" },
];

interface ShapeFilterProps {
  selectedShape: string;
  onShapeChange: (shape: string) => void;
}

export default function ShapeFilter({ selectedShape, onShapeChange }: ShapeFilterProps) {
  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{ backgroundColor: "#000033" }}
      >
        <Diamond className="text-white" size={24} />
        <span className="text-lg font-semibold text-white">Shapes</span>
      </div>
      <div
        className="grid grid-cols-4 gap-3 p-4 bg-white"
        style={{ border: "2px solid #f9e8cd", borderTop: "none" }}
      >
        {SHAPE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() =>
              onShapeChange(selectedShape === option.value ? "" : option.value)
            }
            className={`flex flex-col items-center justify-center gap-2.5 px-3 py-3 transition-colors ${
              selectedShape === option.value
                ? "text-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 95,
              minHeight: 90,
              border:
                selectedShape === option.value
                  ? "2px solid #2563eb"
                  : "2px solid #f9e8cd",
            }}
          >
            <img src={option.image} alt={option.label} className="w-8 h-8 object-contain" />
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}