import React, { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";

interface AdvancedFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
  onResetFilters?: () => void;
}

interface FilterState {
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  lab: string;
  location: string;
}

export default function AdvancedFilters({ onFiltersChange, onResetFilters }: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    cut: "ALL",
    polish: "ALL",
    symmetry: "ALL",
    fluorescence: "ALL",
    lab: "ALL",
    location: "ALL"
  });

  const cutOptions = ["ALL", "Excellent", "Very Good", "Good", "Fair", "Poor"];
  const polishOptions = ["ALL", "Excellent", "Very Good", "Good", "Fair", "Poor"];
  const symmetryOptions = ["ALL", "Excellent", "Very Good", "Good", "Fair", "Poor"];
  const fluorescenceOptions = ["ALL", "None", "Faint", "Medium", "Strong", "Very Strong"];
  const labOptions = ["ALL", "GIA", "IGI", "HRD", "AGS", "GCAL", "EGL"];
  const locationOptions = ["ALL", "Mumbai", "New York", "Hong Kong", "Antwerp", "Dubai", "Surat"];

  const handleFilterChange = (filterName: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleResetFilters = () => {
    const resetState = {
      cut: "ALL",
      polish: "ALL",
      symmetry: "ALL",
      fluorescence: "ALL",
      lab: "ALL",
      location: "ALL"
    };
    setFilters(resetState);
    if (onResetFilters) {
      onResetFilters();
    }
    if (onFiltersChange) {
      onFiltersChange(resetState);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-6 py-3 bg-[#000033] text-white font-medium rounded shadow-sm hover:bg-[#000044] transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>Show Advanced Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <button
          onClick={handleResetFilters}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#D4A574] font-medium rounded shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <X className="w-5 h-5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {isExpanded && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
          <div className="grid grid-cols-3 gap-6">
            {/* Cut Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cut Grade
              </label>
              <div className="relative">
                <select
                  value={filters.cut}
                  onChange={(e) => handleFilterChange('cut', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors text-gray-700"
                >
                  {cutOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Polish Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Polish
              </label>
              <div className="relative">
                <select
                  value={filters.polish}
                  onChange={(e) => handleFilterChange('polish', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors text-gray-700"
                >
                  {polishOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Symmetry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symmetry
              </label>
              <div className="relative">
                <select
                  value={filters.symmetry}
                  onChange={(e) => handleFilterChange('symmetry', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors text-gray-700"
                >
                  {symmetryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Fluorescence Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fluorescence
              </label>
              <div className="relative">
                <select
                  value={filters.fluorescence}
                  onChange={(e) => handleFilterChange('fluorescence', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors text-gray-700"
                >
                  {fluorescenceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Lab Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lab Certification
              </label>
              <div className="relative">
                <select
                  value={filters.lab}
                  onChange={(e) => handleFilterChange('lab', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors text-gray-700"
                >
                  {labOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors text-gray-700"
                >
                  {locationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}