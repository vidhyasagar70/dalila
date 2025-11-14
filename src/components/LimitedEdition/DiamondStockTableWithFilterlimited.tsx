"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { DiamondData } from "@/types/Diamondtable";
import DiamondComparisonPage from "../DiamondComparisonPage";
import ColorFilter from "./colorfilterLimited";

import ShapeFilter from "./shapefilteLimited";
import CaratFilter from "./CaratFilterLimited";
import ClarityFilter from "./ClarityFilterLimited";
import FluorFilter from "./FluorescenceFilterLimited";
import DiamondStockTable from "./DiamondStockTableLimited";
import SpecialClarityFilter from "./Specialdiamond";

export default function DiamondStockTableWithFilter() {
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedClarity, setSelectedClarity] = useState<string[]>([]);
  const [selectedCut, setSelectedCut] = useState("");
  const [selectedPolish, setSelectedPolish] = useState("");
  const [selectedSymmetry, setSelectedSymmetry] = useState("");
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);
  const [selectedFluor, setSelectedFluor] = useState<string[]>([]);
  const [selectedMinCarat, setSelectedMinCarat] = useState("");
  const [selectedMaxCarat, setSelectedMaxCarat] = useState("");
  const [selectedDiamonds, setSelectedDiamonds] = useState<DiamondData[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleColorChange = (colors: string[]) => {
    setSelectedColor(colors);
  };

  const handleShapeChange = (shapes: string[]) => {
    setSelectedShape(shapes);
  };

  const handleFluorChange = (fluor: string[]) => {
    setSelectedFluor(fluor);
  };

  const handleClarityChange = (clarity: string[]) => {
    setSelectedClarity(clarity);
    setSearchTerm("");
  };

  const handleCutChange = (cut: string) => {
    setSelectedCut(cut);
    setSearchTerm("");
  };

  const handlePolishChange = (polish: string) => {
    setSelectedPolish(polish);
    setSearchTerm("");
  };

  const handleSymmetryChange = (symmetry: string) => {
    setSelectedSymmetry(symmetry);
    setSearchTerm("");
  };

  const handleLabsChange = (labs: string[]) => {
    setSelectedLabs(labs);
    setSearchTerm("");
  };

  const handleCaratChange = (min: string, max: string) => {
    setSelectedMinCarat(min);
    setSelectedMaxCarat(max);
  };

  const handleSelectionChange = (
    selectedIds: string[],
    diamonds: DiamondData[],
  ) => {
    setSelectedDiamonds(diamonds);
  };

  const handleSaveParameters = async () => {
    try {
      const filters: {
        SHAPE?: string;
        COLOR?: string;
        CLARITY?: string;
        CUT?: string;
        POL?: string;
        SYM?: string;
        LAB?: string;
        FLOUR?: string;
        CARATS_MIN?: string;
        CARATS_MAX?: string;
      } = {};

      // Add filters only if they have values
      if (selectedShape.length > 0) {
        filters.SHAPE = selectedShape.join(",");
      }
      if (selectedColor.length > 0) {
        filters.COLOR = selectedColor.join(",");
      }
      if (selectedClarity.length > 0) {
        filters.CLARITY = selectedClarity.join(",");
      }
      if (selectedCut) {
        filters.CUT = selectedCut;
      }
      if (selectedPolish) {
        filters.POL = selectedPolish;
      }
      if (selectedSymmetry) {
        filters.SYM = selectedSymmetry;
      }
      if (selectedLabs.length > 0) {
        filters.LAB = selectedLabs.join(",");
      }
      if (selectedFluor.length > 0) {
        filters.FLOUR = selectedFluor.join(",");
      }
      if (selectedMinCarat) {
        filters.CARATS_MIN = selectedMinCarat;
      }
      if (selectedMaxCarat) {
        filters.CARATS_MAX = selectedMaxCarat;
      }

      console.log("Saving filters:", filters);
      
      const { diamondApi } = await import("@/lib/api");
      const response = await diamondApi.saveLimitedEditionFilters(filters);
      
      if (response && response.success) {
        toast.success("Parameters saved successfully!");
        console.log("Saved filters response:", response);
      } else {
        toast.error("Failed to save parameters");
      }
    } catch (error) {
      console.error("Error saving parameters:", error);
      toast.error("Error saving parameters");
    }
  };

  return (
    <div className="w-full px-4 py-4 bg-[#F5F7FA] mt-30">
      {/* TOP ROW: Shapes, Carat, Clarity + Fluor/Color stack */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5">
        <ShapeFilter
          selectedShape={selectedShape}
          onShapeChange={handleShapeChange}
        />
        <CaratFilter
          selectedMinCarat={selectedMinCarat}
          selectedMaxCarat={selectedMaxCarat}
          onCaratChange={handleCaratChange}
        />
        <div className="flex flex-col">
          <SpecialClarityFilter
            selectedCut={selectedCut}
            selectedPolish={selectedPolish}
            selectedSymmetry={selectedSymmetry}
            selectedLabs={selectedLabs}
            onCutChange={handleCutChange}
            onPolishChange={handlePolishChange}
            onSymmetryChange={handleSymmetryChange}
            onLabsChange={handleLabsChange}
          />
          <FluorFilter
            selectedFluor={selectedFluor}
            onFluorChange={handleFluorChange}
          />
        </div>
        <div className="flex flex-col">
          <ClarityFilter
            selectedClarity={selectedClarity}
            onClarityChange={handleClarityChange}
          />
          <ColorFilter
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            onSaveParameters={handleSaveParameters}
          />
        </div>
      </div>

     
      {/* Table View */}
      <DiamondStockTable
        searchTerm={searchTerm}
        selectedShape={selectedShape}
        selectedColor={selectedColor}
        selectedMinCarat={selectedMinCarat}
        selectedMaxCarat={selectedMaxCarat}
        selectedFluor={selectedFluor}
        selectedClarity={selectedClarity}
        selectedCut={selectedCut}
        selectedPolish={selectedPolish}
        selectedSymmetry={selectedSymmetry}
        selectedLabs={selectedLabs}
        onSelectionChange={handleSelectionChange}
        pageSize={10}
      />

      {/* Comparison Modal */}
      {showComparison && (
        <DiamondComparisonPage
          diamonds={selectedDiamonds}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}
