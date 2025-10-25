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

export default function DiamondStockTableWithFilter() {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [selectedColor, setSelectedColor] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedShape, setSelectedShape] = useState("ALL");
    const [selectedClarity, setSelectedClarity] = useState<string[]>([]);
    const [selectedSpecial, setSelectedSpecial] = useState("");
    const [selectedCut, setSelectedCut] = useState("");
    const [selectedPolish, setSelectedPolish] = useState("");
    const [selectedSymmetry, setSelectedSymmetry] = useState("");
    const [selectedFluor, setSelectedFluor] = useState("");
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

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    const handleShapeChange = (shape: string) => {
        setSelectedShape(shape);
    };

    const handleFluorChange = (fluor: string) => {
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
        console.log("Carat changed - min:", min, "max:", max);
        setSelectedMinCarat(min);
        setSelectedMaxCarat(max);
    };

<<<<<<< HEAD
    const handleSelectionChange = (
        selectedIds: string[],
        diamonds: DiamondData[]
    ) => {
        setSelectedDiamonds(diamonds);
    };
=======
  const handleSelectionChange = (
    selectedIds: string[],
    diamonds: DiamondData[],
  ) => {
    setSelectedDiamonds(diamonds);
  };
>>>>>>> 6b33d17d84c968ff8de55de115abb70d36a8326e

    const handleCompare = () => {
        if (selectedDiamonds.length > 0) {
            setShowComparison(true);
        }
    };

<<<<<<< HEAD
    const handleEmail = () => {
        console.log(
            "Email sent for diamonds:",
            selectedDiamonds.map((d) => d.STONE_NO)
        );
    };
=======
  const handleEmail = () => {
    console.log(
      "Email sent for diamonds:",
      selectedDiamonds.map((d) => d.STONE_NO),
    );
  };
>>>>>>> 6b33d17d84c968ff8de55de115abb70d36a8326e

    const handleResetFilters = () => {
        setSelectedColor("");
        setSelectedShape("");
        setSelectedClarity([]);
        setSelectedSpecial("");
        setSelectedCut("");
        setSelectedPolish("");
        setSelectedSymmetry("");
        setSelectedFluor("");
        setSelectedMinCarat("");
        setSelectedMaxCarat("");
    };

    return (
        <div className="w-full px-4 py-4 bg-[#F5F7FA] mt-35">
            {/* TOP ROW: Shapes, Carat, Clarity (3 cols) + Fluor/Color stack (1 col) */}
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
                <div className="flex flex-col justify-between py-1 ">
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
            <div className="flex flex-wrap items-center gap-3 mt-0.5 bg-[#faf6eb] px-4 py-2 rounded">
                {/* View Mode Toggle - Left Side */}
                <div className="flex items-center gap-1 bg-[#faf6eb] rounded p-0.5">
                    <button
                        onClick={() => setViewMode("list")}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                            viewMode === "list"
                                ? "bg-[#000033] text-white"
                                : "bg-[#faf6eb] text-gray-600"
                        }`}
                        title="Table View"
                    >
                        <List className="w-4 h-4" />
                        <span className="text-sm font-medium">Table View</span>
                    </button>
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                            viewMode === "grid"
                                ? "bg-[#000033] text-white"
                                : "bg-[#faf6eb] text-gray-600"
                        }`}
                        title="Grid View"
                    >
                        <Grid3x3 className="w-4 h-4" />
                        <span className="text-sm font-medium">Grid View</span>
                    </button>
                </div>

                {/* Spacer to push items to the right */}
                <div className="flex-1"></div>

<<<<<<< HEAD
                {/* Search Bar and Action Buttons - Right Side */}
                <div className="flex flex-wrap items-center gap-2">
                    <SearchBar onSearch={handleSearch} />

                    <CompareButton
                        selectedCount={selectedDiamonds.length}
                        onCompare={handleCompare}
                        disabled={selectedDiamonds.length === 0}
                    />
=======
        {/* Search Bar and Action Buttons - Right Side */}
        <div className="flex items-center gap-2">
          <SearchBar onSearch={handleSearch} />

          <CompareButton
            selectedCount={selectedDiamonds.length}
            onCompare={handleCompare}
            disabled={selectedDiamonds.length === 0}
          />

          <EmailButton
            selectedCount={selectedDiamonds.length}
            selectedStoneNumbers={selectedDiamonds.map((d) => d.STONE_NO)}
            onEmail={handleEmail}
          />
>>>>>>> 6b33d17d84c968ff8de55de115abb70d36a8326e

                    <EmailButton
                        selectedCount={selectedDiamonds.length}
                        selectedStoneNumbers={selectedDiamonds.map(
                            (d) => d.STONE_NO
                        )}
                        onEmail={handleEmail}
                    />

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#000033] text-white transition-colors shadow-sm rounded"
                    >
                        <Image
                            src="/filtersicon/filter-add.png"
                            alt="Filter"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">
                            Show Advanced Filters
                        </span>
                        {showFilters ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>

                    <button
                        onClick={handleResetFilters}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#D4A574] text-[#D4A574] transition-colors shadow-sm rounded"
                        title="Reset All Filters"
                    >
                        <Image
                            src="/filtersicon/filter-remove.png"
                            alt="Reset"
                            width={18}
                            height={18}
                            className="w-4.5 h-4.5"
                        />
                        <span className="text-sm font-medium">
                            Reset Filters
                        </span>
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
<<<<<<< HEAD
    );
=======
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
>>>>>>> 6b33d17d84c968ff8de55de115abb70d36a8326e
}
