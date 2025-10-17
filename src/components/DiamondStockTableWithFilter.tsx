// components/DiamondStockTableWithFilter.tsx

"use client";
import React, { useState } from "react";

import ColorFilter from "./ColorFilter";
import SearchBar from "./SearchBar";
import ShapeFilter from "./ShapeFilter";
import CaratFilter from "./CaratFilter";
import ClarityFilter from "./ClarityFilter";
import FluorFilter from "./FluorescenceFilter";
import InclusionFilter, { type InclusionFilters } from './InclusionFilter';
import MeasurementFilter from "./MeasurementFilter";
import KeySymbolFilter, { type KeySymbolFilters } from './KeyToSymbolFilter';
import ShadesFilter, { type ShadesFilters } from './ShadesFilter';
import PriceLocationFilter, { type PriceLocationFilters } from './Priceandloction';
import AdvancedFilters from "./AdvancedFilters";
import DiamondStockTable from "./DiamondStockTable";
export default function DiamondStockTableWithFilter() {

  const [isSearching, setIsSearching] = useState(false);
  const [selectedColor, setSelectedColor] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShape, setSelectedShape] = useState("ALL");
  const [selectedCaratRange, setSelectedCaratRange] = useState("");
  const [selectedClarity, setSelectedClarity] = useState<string[]>([]);
  const [selectedCut, setSelectedCut] = useState("");
  const [selectedPolish, setSelectedPolish] = useState("");
  const [selectedSymmetry, setSelectedSymmetry] = useState("");
   const [selectedFluor, setSelectedFluor] = useState("");
  const [selectedMinCarat, setSelectedMinCarat] = useState("");
const [selectedMaxCarat, setSelectedMaxCarat] = useState("");

  const [measurements, setMeasurements] = useState({
    length: { from: "0.50", to: "0.50" },
    width: { from: "0.50", to: "0.50" },
    depth: { from: "0.50", to: "0.50" },
    table: { from: "0.50", to: "0.50" },
    depthPercent: { from: "0.50", to: "0.50" },
    ratio: { from: "0.50", to: "0.50" },
    crAngle: { from: "0.50", to: "0.50" },
    pavAngle: { from: "0.50", to: "0.50" },
    gridle: { from: "0.50", to: "0.50" },
    crHeight: { from: "0.50", to: "0.50" },
    pavHeight: { from: "0.50", to: "0.50" },
  });
  const [inclusions, setInclusions] = useState<InclusionFilters>({
    centerBlack: [],
    centerWhite: [],
    sideBlack: [],
    sideWhite: [],
  });
  const [shadesFilters, setShadesFilters] = useState<ShadesFilters>({
    shades: [],
    milky: [],
    type2Ct: [],
    brl: [],
  });
  const [keySymbolFilters, setKeySymbolFilters] = useState<KeySymbolFilters>({
    keyToSymbol: [],
    eyCln: [],
    hAndA: [],
  });
  const [priceLocationFilters, setPriceLocationFilters] = useState<PriceLocationFilters>({
    pricePerCarat: { from: "0.50", to: "0.50" },
    discount: { from: "0.50", to: "0.50" },
    totalPrice: { from: "0.50", to: "0.50" },
    locations: [],
    labs: [],
  });
  const [showFilters, setShowFilters] = useState(true);
   const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const handleShapeChange = (shape: string) => {
    setSelectedShape(shape);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSelectedShape("");
    setSearchTerm("");
  };
  const handleCaratChange = (min: string, max: string) => {
  setSelectedMinCarat(min);
  setSelectedMaxCarat(max);
};



  const handleFluorChange = (fluor: string) => {  
    setSelectedFluor(fluor);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCaratRangeChange = (range: string) => {
    setSelectedCaratRange(range);
    setSearchTerm("");
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

  const handleResetFilters = () => {
    setSelectedColor("");
    setSelectedShape("");
    setSelectedCaratRange("");
    setSelectedClarity([]);
    setSelectedCut("");
    setSelectedPolish("");
    setSelectedSymmetry("");
    setSelectedFluor("");
  };

  return (
    <div className="w-full px-4 py-4 bg-gray-50 mt-35">
    {/* TOP ROW: Shapes, Carat, Clarity (3 cols) + Fluor/Color stack (1 col) */}
<div className="grid grid-cols-4 gap-0.5">
 <ShapeFilter
                selectedShape={selectedShape}
                onShapeChange={handleShapeChange}
              />
  <CaratFilter 
  selectedMinCarat={selectedMinCarat}
  selectedMaxCarat={selectedMaxCarat}
  onCaratChange={handleCaratChange}
/>
  <ClarityFilter
    selectedClarity={selectedClarity}
    selectedCut={selectedCut}
    selectedPolish={selectedPolish}
    selectedSymmetry={selectedSymmetry}
    onClarityChange={handleClarityChange}
    onCutChange={handleCutChange}
    onPolishChange={handlePolishChange}
    onSymmetryChange={handleSymmetryChange}
  />

  <div className="flex flex-col gap-0.5">
    <FluorFilter
      selectedFluor={selectedFluor}
      onFluorChange={handleFluorChange}
    />
   <ColorFilter
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
              />
  </div>
</div>

      <div className="grid grid-cols-2 mt-2">
        <SearchBar onSearch={handleSearch} isSearching={isSearching}/>
        <div className="mt-2">
          <AdvancedFilters
            onShowFilters={() => setShowFilters(!showFilters)}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>


      {showFilters && (
        <div className="grid grid-cols-5 gap-4">
          <InclusionFilter
            inclusions={inclusions}
            onInclusionChange={setInclusions}
          />
          <ShadesFilter
            filters={shadesFilters}
            onFiltersChange={setShadesFilters}
          />
          <KeySymbolFilter
            filters={keySymbolFilters}
            onFiltersChange={setKeySymbolFilters}
          />
          <PriceLocationFilter
            filters={priceLocationFilters}
            onFiltersChange={setPriceLocationFilters}
          />
          <MeasurementFilter
            measurements={measurements}
            onMeasurementChange={setMeasurements}

          />

         
        </div>
      )}
       <DiamondStockTable
  searchTerm={searchTerm}
  selectedShape={selectedShape}
  selectedColor={selectedColor}
  selectedMinCarat={selectedMinCarat}
  selectedMaxCarat={selectedMaxCarat}
  selectedFluor={selectedFluor} 
  pageSize={20}
/>

    </div>
  );
}