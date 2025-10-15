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
      <div className="flex items-center border-2 border-gray-300 rounded overflow-hidden bg-white shadow" style={{ width: 'fit-content' }}>
        <div className="flex items-center px-3 py-2.5 border-r-2 border-gray-300">
          <Search className="w-5 h-5 text-gray-600" />
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search by Stone ID"
          className="px-4 py-2.5 outline-none text-base"
          style={{ minWidth: '300px', color: '#000' }}
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2.5 text-white font-medium"
          style={{ backgroundColor: '#000033' }}
        >
          Search
        </button>
      </div>
    </div>
  );
}