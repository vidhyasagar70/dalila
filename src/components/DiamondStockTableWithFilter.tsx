"use client";
import React, { useState } from "react";
import { Grid3x3, List, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { DiamondData } from "@/types/Diamondtable";
import DiamondComparisonPage from "./DiamondComparisonPage";
import ColorFilter from "./ColorFilter";
import SearchBar from "./SearchBar";
import ShapeFilter from "./ShapeFilter";
import CaratFilter from "./CaratFilter";
import ClarityFilter from "./ClarityFilter";
import FluorFilter from "./FluorescenceFilter";
import InclusionFilter, { type InclusionFilters } from "./InclusionFilter";
import MeasurementFilter from "./MeasurementFilter";
import KeySymbolFilter, { type KeySymbolFilters } from "./KeyToSymbolFilter";
import ShadesFilter, { type ShadesFilters } from "./ShadesFilter";
import PriceLocationFilter, {
  type PriceLocationFilters,
} from "./Priceandloction";
import DiamondStockTable from "./DiamondStockTable";
import DiamondGridView from "./DiamondGridView";
import CompareButton from "./CompareButton";
import EmailButton from "./EmailButton";
import AddToCartButton from "../components/cart/AddToCartButton";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function DiamondStockTableWithFilter() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedClarity, setSelectedClarity] = useState<string[]>([]);
  const [selectedSpecial, setSelectedSpecial] = useState("");
  const [selectedCut, setSelectedCut] = useState("");
  const [selectedPolish, setSelectedPolish] = useState("");
  const [selectedSymmetry, setSelectedSymmetry] = useState("");
  const [selectedFluor, setSelectedFluor] = useState<string[]>([]);
  const [selectedMinCarat, setSelectedMinCarat] = useState("");
  const [selectedMaxCarat, setSelectedMaxCarat] = useState("");
  const [selectedDiamonds, setSelectedDiamonds] = useState<DiamondData[]>([]);
  const [showComparison, setShowComparison] = useState(false);

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
  const [priceLocationFilters, setPriceLocationFilters] =
    useState<PriceLocationFilters>({
      pricePerCarat: { from: "0.50", to: "0.50" },
      discount: { from: "0.50", to: "0.50" },
      totalPrice: { from: "0.50", to: "0.50" },
      locations: [],
      labs: [],
    });
  const [showFilters, setShowFilters] = useState(false);

  const handleColorChange = (colors: string[]) => {
    setSelectedColor(colors);
  };

  const handleShapeChange = (shapes: string[]) => {
    setSelectedShape(shapes);
  };

  const handleFluorChange = (fluor: string[]) => {
    setSelectedFluor(fluor);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClarityChange = (clarity: string[]) => {
    setSelectedClarity(clarity);
    setSearchTerm("");
  };

  const handleSpecialChange = (special: string) => {
    setSelectedSpecial(special);
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

  const handleCompare = () => {
    if (selectedDiamonds.length > 0) {
      setShowComparison(true);
    }
  };

  const handleEmail = () => {
    console.log(
      "Email sent for diamonds:",
      selectedDiamonds.map((d) => d.STONE_NO),
    );
  };

  const handleAddToCart = () => {
    // Clear selection after adding to cart
    setSelectedDiamonds([]);
    console.log("Diamonds added to cart successfully, selection cleared");
  };

  const handleResetFilters = () => {
    setSelectedColor([]);
    setSelectedShape([]);
    setSelectedClarity([]);
    setSelectedSpecial("");
    setSelectedCut("");
    setSelectedPolish("");
    setSelectedSymmetry("");
    setSelectedFluor([]);
    setSelectedMinCarat("");
    setSelectedMaxCarat("");
    setKeySymbolFilters({  // Add this
    keyToSymbol: [],
    eyCln: [],
    hAndA: [],
  });
  setInclusions({  // Add this
    centerBlack: [],
    centerWhite: [],
    sideBlack: [],
    sideWhite: [],
  });
  setShadesFilters({  // Add this
    shades: [],
    milky: [],
    type2Ct: [],
    brl: [],
  });
  setPriceLocationFilters({  // Add this
    pricePerCarat: { from: "0.50", to: "0.50" },
    discount: { from: "0.50", to: "0.50" },
    totalPrice: { from: "0.50", to: "0.50" },
    locations: [],
    labs: [],
  });
  setMeasurements({  // Add this
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
        <ClarityFilter
          selectedClarity={selectedClarity}
          selectedSpecial={selectedSpecial}
          selectedCut={selectedCut}
          selectedPolish={selectedPolish}
          selectedSymmetry={selectedSymmetry}
          onClarityChange={handleClarityChange}
          onSpecialChange={handleSpecialChange}
          onCutChange={handleCutChange}
          onPolishChange={handlePolishChange}
          onSymmetryChange={handleSymmetryChange}
        />
       <div className="flex flex-col ">
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

      {/* SEARCH AND NAVIGATION ROW */}
      <div
        className={`flex items-center gap-2 mt-0.5 bg-[#faf6eb] px-4 py-2 rounded ${mavenPro.className}`}
      >
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#faf6eb] rounded-none p-0.5">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list"
                ? "bg-[#000033] text-white"
                : "bg-[#faf6eb] text-gray-600 hover:bg-gray-200"
            }`}
            title="Table View"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid"
                ? "bg-[#000033] text-white"
                : "bg-[#faf6eb] text-gray-600 hover:bg-gray-200"
            }`}
            title="Grid View"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2">
          {/* Add to Cart Button */}
          <AddToCartButton
            selectedCount={selectedDiamonds.length}
            selectedStoneNumbers={selectedDiamonds.map((d) => d.STONE_NO)}
            onAddToCart={handleAddToCart}
          />

          {/* Compare Button */}
          <CompareButton
            selectedCount={selectedDiamonds.length}
            onCompare={handleCompare}
            disabled={selectedDiamonds.length === 0}
          />

          {/* Email Button */}
          <EmailButton
            selectedCount={selectedDiamonds.length}
            selectedStoneNumbers={selectedDiamonds.map((d) => d.STONE_NO)}
            onEmail={handleEmail}
          />

          {/* Advanced Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-[#000033] text-white transition-colors shadow-sm rounded-none hover:bg-[#000055] whitespace-nowrap"
          >
            <Image
              src="/filtersicon/filter-add.png"
              alt="Filter"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Advanced Filters</span>
            {showFilters ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Reset Filters Button */}
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-4 py-2 bg-[#000033] text-white transition-colors shadow-sm rounded-none hover:bg-[#000055] whitespace-nowrap"
            title="Reset All Filters"
          >
            <Image
              src="/filtersicon/filter-remove.png"
              alt="Reset"
              width={18}
              height={18}
              className="w-4.5 h-4.5"
            />
            <span className="text-sm font-medium">Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Section */}
      {showFilters && (
        <div className="grid grid-cols-5 gap-4 mt-4">
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
          <div className="flex flex-col gap-2">
            <PriceLocationFilter
              filters={priceLocationFilters}
              onFiltersChange={setPriceLocationFilters}
            />
          </div>
          <MeasurementFilter
            measurements={measurements}
            onMeasurementChange={setMeasurements}
          />
        </div>
      )}

      {/* Table or Grid View */}
      {viewMode === "list" ? (
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
          onSelectionChange={handleSelectionChange}
          priceLocationFilters={priceLocationFilters}
           selectedLocations={priceLocationFilters.locations}  // NEW
  selectedLabs={priceLocationFilters.labs}    
  keySymbolFilters={keySymbolFilters}        // NEW
          pageSize={10}
        />
      ) : (
        <DiamondGridView
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
          pageSize={12}
        />
      )}

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