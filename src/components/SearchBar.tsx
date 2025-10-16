import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center border border-gray-200 rounded overflow-hidden bg-white shadow-sm w-fit">
        <div className="flex items-center px-3 py-2.5 border-r border-gray-200">
          <Search className="w-5 h-5 text-gray-600" />
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search by Stone ID"
          className="px-4 py-2.5 outline-none text-base text-black min-w-[300px]"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2.5 bg-[#000033] text-white font-medium hover:bg-[#000044] transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}