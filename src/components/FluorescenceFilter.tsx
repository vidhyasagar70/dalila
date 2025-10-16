import React from "react";

const FLUOR_OPTIONS = [
  { label: "NON", value: "NON" },
  { label: "VSL", value: "VSL" },
  { label: "FNT", value: "FNT" },
  { label: "SL", value: "SL" },
  { label: "MED", value: "MED" },
  { label: "STG", value: "STG" },
  { label: "VST", value: "VST" },
];

interface FluorFilterProps {
  selectedFluor: string[];
  onFluorChange: (fluor: string[]) => void;
}

export default function FluorFilter({
  selectedFluor,
  onFluorChange,
}: FluorFilterProps) {
  const handleFluorClick = (value: string) => {
    if (selectedFluor.includes(value)) {
      onFluorChange(selectedFluor.filter((f) => f !== value));
    } else {
      onFluorChange([...selectedFluor, value]);
    }
  };

  return (
    <div className="mb-4 mt-2" style={{ width: 'fit-content' }}>
      <div className="flex items-center gap-2 px-3 py-2 rounded-t" style={{ backgroundColor: '#000033' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="none" stroke="white" strokeWidth="2" opacity="0.9"/>
          <path d="M12 8 L14 10 L12 12 L10 10 Z" fill="white" opacity="0.9"/>
          <circle cx="12" cy="12" r="3" fill="white" opacity="0.5"/>
          <path d="M8 8 L6 6 M16 8 L18 6 M8 16 L6 18 M16 16 L18 18" stroke="white" strokeWidth="1.5" opacity="0.7"/>
        </svg>
        <span className="text-lg font-semibold text-white">
          Fluor
        </span>
      </div>
      
      <div className="p-4 bg-white rounded-b" style={{ border: '2px solid #f9e8cd' }}>
        <div className="grid grid-cols-4 gap-2">
          {FLUOR_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFluorClick(option.value)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                selectedFluor.includes(option.value)
                  ? "text-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{ 
                border: selectedFluor.includes(option.value) ? '2px solid #2563eb' : '2px solid #f9e8cd',
                minHeight: '45px',
                minWidth: '70px'
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}