import React, { useState, useEffect } from "react";
import { stockService } from "../services/stockService";
import type { DiamondData } from "../services/stockService";
import DiamondStockTable from "./DiamondStockTable";
import ColorFilter from "./ColorFilter";
import SearchBar from "./SearchBar";
import ShapeFilter from "./ShapeFilter";
function getColorsForFilter(selected: string): string[] {
  if (selected === "ALL") return [];
  if (selected === "N-Z") return ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  if (selected === "FANCY") return ["FANCY"];
  return [selected];
}

export default function DiamondStockTableWithFilter() {
  const [stockData, setStockData] = useState<DiamondData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [selectedShape, setSelectedShape] = useState("ROUND");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const filters: any = {};
        
        const colorsForFilter = getColorsForFilter(selectedColor);
        if (colorsForFilter.length > 0) {
          filters.COLOR = colorsForFilter;
        }
        
        if (searchTerm.trim()) {
          filters.searchTerm = searchTerm.trim();
        }

        console.log("📤 Sending filters:", filters);
        
        const data = await stockService.getStock(filters);
        setStockData(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch diamond stock data.");
        setStockData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedColor, searchTerm]);

  return (
   <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex gap-4 mb-4">
        <ColorFilter
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
        />
        <ShapeFilter
          selectedShape={selectedShape}
          onShapeChange={setSelectedShape}
        />
      </div>
     
      
      
      <SearchBar onSearch={handleSearch} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      
      <DiamondStockTable data={stockData} loading={loading} pageSize={20} />
    </div>
  );
}