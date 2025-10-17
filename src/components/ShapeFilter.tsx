import React, { useEffect, useState } from "react";
import { diamondApi } from "@/lib/api";

// Mapping of shape values to their images and display labels
const SHAPE_IMAGE_MAP: Record<string, { image: string; label: string }> = {
  ROUND: { label: "Round", image: "/shapefilter/vector (4).png" },
  RADIANT: { label: "Radiant", image: "/shapefilter/vector (3).png" },
  PEAR: { label: "Pear", image: "/shapefilter/vector (2).png" },
  SQUARE: { label: "Square", image: "/shapefilter/vector.png" },
  EMERALD: { label: "Emerald", image: "/shapefilter/vector (5).png" },
  OVAL: { label: "Oval", image: "/shapefilter/vector-oval.png" },
  CUSHION: { label: "Cushion", image: "/shapefilter/vector (6).png" },
  "CUSHION BRILLIANT": { label: "Cushion Brilliant", image: "/shapefilter/vector (6).png" },
  TRILLIANT: { label: "Trilliant", image: "/shapefilter/vector (7).png" },
  HEART: { label: "Heart", image: "/shapefilter/Vector-heart.png" },
  PRINCESS: { label: "Princess", image: "/shapefilter/vector_princess.png" },
  MARQUISE: { label: "Marquise", image: "/shapefilter/vector_marque.png" },
  OTHER: { label: "Other", image: "/shapefilter/others.png" },
};

interface ShapeOption {
  value: string;
  label: string;
  image: string;
}

interface ShapeFilterProps {
  selectedShape: string;
  onShapeChange: (shape: string) => void;
}

export default function ShapeFilter({
  selectedShape,
  onShapeChange,
}: ShapeFilterProps) {
  const [shapeOptions, setShapeOptions] = useState<ShapeOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await diamondApi.getFilterOptions();
        if (response?.success && response.data) {
          // Map API shapes to shape options with images
          const shapes = response.data.shapes
            .filter((s) => s.trim() !== "")
            .map((shape) => {
              const mappedData = SHAPE_IMAGE_MAP[shape] || {
                label: shape.charAt(0) + shape.slice(1).toLowerCase(),
                image: "/shapefilter/others.png",
              };
              return {
                value: shape,
                label: mappedData.label,
                image: mappedData.image,
              };
            });
          setShapeOptions(shapes);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleShapeClick = (shape: string) => {
    if (selectedShape === shape) {
      onShapeChange("");
    } else {
      onShapeChange(shape);
    }
  };

  if (loading) {
    return (
      <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ backgroundColor: "#000033" }}
        >
          <img src="/filtersicon/shape.png" alt="Shape" className="w-5 h-5" />
          <span className="text-base font-semibold text-white">Shape</span>
        </div>
        <div
          className="p-3 bg-white flex items-center justify-center"
          style={{
            border: "0.25px solid #f9e8cd",
            borderTop: "none",
            minHeight: "150px",
          }}
        >
          <span className="text-gray-500">Loading shapes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 mt-2" style={{ width: "fit-content" }}>
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#000033" }}
      >
        <img src="/filtersicon/shape.png" alt="Shape" className="w-5 h-5" />
        <span className="text-base font-semibold text-white">Shape</span>
      </div>
      <div
        className="grid grid-cols-4 gap-2 p-3 bg-white"
        style={{ border: "0.25px solid #f9e8cd", borderTop: "none" }}
      >
        {shapeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleShapeClick(option.value)}
            className={`flex flex-col items-center justify-center gap-1.5 px-2 py-2 transition-colors ${
              selectedShape === option.value
                ? "text-blue-600 bg-blue-50"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: "70px",
              minHeight: "80px",
              border:
                selectedShape === option.value
                  ? "0.25px solid #2563eb"
                  : "0.25px solid #f9e8cd",
            }}
          >
            <img
              src={option.image}
              alt={option.label}
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}