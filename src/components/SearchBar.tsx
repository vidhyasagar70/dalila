import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  isSearching?: boolean;
}

export default function SearchBar({ onSearch, isSearching = false }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    onSearch(searchInput.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchInput("");
    onSearch(""); // This will reset the table to show all data
  };

  return (
    <div className="mb-4">
      <div className="flex items-center border border-gray-200 rounded overflow-hidden bg-white shadow-sm w-fit">
        <div className="flex items-center px-3 py-2.5 border-r border-gray-200">
          <img src="/filtersicon/filtersearch.png" alt="Search" className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search by Stone ID"
          className="px-4 py-2.5 outline-none text-base text-black min-w-[300px]"
          disabled={isSearching}
        />
        {searchInput && (
          <button
            onClick={handleClear}
            className="px-3 py-2.5 text-gray-500 hover:text-gray-700 transition-colors"
            title="Clear search"
          >
            ×
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-6 py-2.5 bg-[#000033] text-white font-medium hover:bg-[#000044] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}