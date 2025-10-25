"use client";
import React from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

// Static fluorescence options matching your UI image
const STATIC_FLUOR_OPTIONS = ["NON", "VSL", "FNT", "SL", "MED", "STG", "VST"];

interface FluorFilterProps {
    selectedFluor: string;
    onFluorChange: (fluor: string) => void;
}

export default function FluorFilter({
    selectedFluor,
    onFluorChange,
}: FluorFilterProps) {
    const handleFluorClick = (value: string) => {
        onFluorChange(selectedFluor === value ? "" : value);
    };

    return (
        <div>
            <div
                className="flex items-center gap-1.5 px-2.5 py-1.5"
                style={{ backgroundColor: "#000033" }}
            >
                <Image
                    src="/filtersicon/flour.png"
                    alt="Fluor"
                    width={18}
                    height={18}
                    className="w-4.5 h-4.5"
                />
                <span
                    className={`${playFair.className} text-base font-semibold text-white`}
                >
                    Fluor
                </span>
            </div>

            <div
                className="grid grid-cols-5 gap-1 p-1.5 bg-white"
                style={{
                    border: "0.25px solid #f9e8cd",
                    borderTop: "none",
                }}
            >
                {STATIC_FLUOR_OPTIONS.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleFluorClick(option)}
                        className={`${playFair.className} px-1 py-0.5 rounded text-xs font-medium transition-colors ${
                            selectedFluor === option
                                ? "text-blue-600 bg-blue-50"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        style={{
                            minWidth: 44,
                            border:
                                selectedFluor === option
                                    ? "0.25px solid #2563eb"
                                    : "0.25px solid #f9e8cd",
                            minHeight: "41px",
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
