import React from "react";

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

export default function ShapeFilter({
  selectedShape,
  onShapeChange,
}: ShapeFilterProps) {
  const handleShapeClick = (shape: string) => {
    if (selectedShape === shape) {
      onShapeChange(""); // deselect if clicked again
    } else {
      onShapeChange(shape);
    }
  };

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      {/* Header Section */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <img src="/filtersicon/shape.png" alt="Shape" className="w-5 h-5" />
        <span className="text-base font-semibold text-white">Shape</span>
      </div>

      {/* Shape Buttons */}
      <div
        className="grid grid-cols-4 gap-2 p-3 bg-white"
        style={{ border: "0.25px solid #f9e8cd", borderTop: "none" }}
      >
        {SHAPE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleShapeClick(option.value)}
            className={`flex flex-col items-center justify-center gap-1.5 px-2 py-2 transition-colors ${
              selectedShape === option.value
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: 70,
              minHeight: 80, // slightly taller
              border:
                selectedShape === option.value
                  ? "0.25px solid #2563eb"
                  : "0.25px solid #f9e8cd",
            }}
          >
            <img
              src={option.image}
              alt={option.label}
              className="w-8 h-8 object-contain" // increased size
            />
            <span className="text-xs font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
