"use client";
import React from "react";
import Image from "next/image";
import {Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],  
  weight: ["400", "500", "600", "700", "800"],  
  display: "swap",
});


const STATIC_CLARITY_OPTIONS = [
    "FL",
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
    "SI3",
    "I1",
    "I2",
    "I3",
];

const STATIC_SPECIAL_OPTIONS = ["3EX", "EX-", "VG+", "VG-"];
const STATIC_CUT_OPTIONS = ["EX", "VG", "GD", "FR"];
const STATIC_POLISH_OPTIONS = ["EX", "VG", "GD", "FR"];
const STATIC_SYMMETRY_OPTIONS = ["EX", "VG", "GD", "FR"];

// Mapping of special grades to their corresponding Cut/Polish/Symmetry combinations
const SPECIAL_GRADE_MAPPING: Record<
    string,
    { cut: string; polish: string; symmetry: string }
> = {
    "3EX": { cut: "EX", polish: "EX", symmetry: "EX" },
    "EX-": { cut: "EX", polish: "EX", symmetry: "VG" },
    "VG+": { cut: "VG", polish: "VG", symmetry: "VG" },
    "VG-": { cut: "VG", polish: "GD", symmetry: "GD" },
};

interface ClarityFilterProps {
    selectedClarity: string[];
    selectedSpecial: string;
    selectedCut: string;
    selectedPolish: string;
    selectedSymmetry: string;
    onClarityChange: (clarity: string[]) => void;
    onSpecialChange: (special: string) => void;
    onCutChange: (cut: string) => void;
    onPolishChange: (polish: string) => void;
    onSymmetryChange: (symmetry: string) => void;
}

export default function ClarityFilter({
    selectedClarity,
    selectedSpecial,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    onClarityChange,
    onSpecialChange,
    onCutChange,
    onPolishChange,
    onSymmetryChange,
}: ClarityFilterProps) {
    const handleClarityClick = (value: string) => {
        let newClarity: string[];
        if (selectedClarity.includes(value)) {
            newClarity = selectedClarity.filter((c) => c !== value);
        } else {
            newClarity = [...selectedClarity, value];
        }
        onClarityChange(newClarity);
    };

    const handleSpecialClick = (value: string) => {
        const newSpecial = selectedSpecial === value ? "" : value;
        onSpecialChange(newSpecial);

        // If a special grade is selected, automatically set Cut, Polish, and Symmetry
        if (newSpecial && SPECIAL_GRADE_MAPPING[newSpecial]) {
            const { cut, polish, symmetry } = SPECIAL_GRADE_MAPPING[newSpecial];
            onCutChange(cut);
            onPolishChange(polish);
            onSymmetryChange(symmetry);
        } else {
            // If deselecting special grade, clear the related filters
            onCutChange("");
            onPolishChange("");
            onSymmetryChange("");
        }
    };

    const handleCutClick = (value: string) => {
        const newCut = selectedCut === value ? "" : value;
        onCutChange(newCut);
        // Clear special grade when manually changing cut
        if (selectedSpecial) {
            onSpecialChange("");
        }
    };

    const handlePolishClick = (value: string) => {
        const newPolish = selectedPolish === value ? "" : value;
        onPolishChange(newPolish);
        // Clear special grade when manually changing polish
        if (selectedSpecial) {
            onSpecialChange("");
        }
    };

    const handleSymmetryClick = (value: string) => {
        const newSymmetry = selectedSymmetry === value ? "" : value;
        onSymmetryChange(newSymmetry);
        // Clear special grade when manually changing symmetry
        if (selectedSpecial) {
            onSpecialChange("");
        }
    };

    return (
        <div className={`${mavenPro.className} mb-1.5 mt-0.5`}>
            <div
                className="flex items-center gap-1.5 px-2.5 py-1.5"
                style={{ backgroundColor: "#000033" }}
            >
                <Image
                    src="/filtersicon/clarity.png"
                    alt="Clarity"
                    width={18}
                    height={18}
                    className="w-5 h-5"
                />
                <span className="text-base font-semibold text-white">
                    Clarity
                </span>
            </div>

            <div
                className="p-2 bg-white"
                style={{
                    border: "0.25px solid #f9e8cd",
                    borderTop: "none",
                    height: "288px",
                }}
            >
                {/* Clarity Options */}
                <div className="grid grid-cols-6 gap-1 mb-4 mt-4">
                    {STATIC_CLARITY_OPTIONS.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleClarityClick(option)}
                            className={`px-1 py-0.5 rounded text-xs font-medium transition-colors ${
                                selectedClarity.includes(option)
                                    ? "text-blue-600 bg-blue-50"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            style={{
                                border: selectedClarity.includes(option)
                                    ? "0.25px solid #2563eb"
                                    : "0.25px solid #f9e8cd",
                                minHeight: "28px",
                                minWidth: "48px",
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Special Options (3EX, EX-, VG+, VG-) */}
                <div className="grid grid-cols-4 gap-1 mb-3 mt-3">
                    {STATIC_SPECIAL_OPTIONS.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSpecialClick(option)}
                            className={`px-1.5 py-1 rounded text-xs font-semibold transition-colors ${
                                selectedSpecial === option
                                    ? "text-white"
                                    : "text-white hover:opacity-80"
                            }`}
                            style={{
                                backgroundColor:
                                    selectedSpecial === option
                                        ? "#00003390"
                                        : "#000033",
                                border: "none",
                                minHeight: "32px",
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Cut Options */}
                <div className="flex items-center gap-1.5 mb-2">
                    <div
                        className="px-1.5 py-1 rounded text-xs font-semibold text-white"
                        style={{
                            backgroundColor: "#000033",
                            minWidth: "35px",
                            minHeight: "26px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Cut :
                    </div>
                    <div className="flex gap-1.5 flex-1">
                        {STATIC_CUT_OPTIONS.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleCutClick(option)}
                                className={`px-1.5 py-1 rounded text-xs font-medium transition-colors flex-1 ${
                                    selectedCut === option
                                        ? "text-blue-600 bg-blue-50"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                                style={{
                                    border:
                                        selectedCut === option
                                            ? "0.25px solid #2563eb"
                                            : "0.25px solid #f9e8cd",
                                    minHeight: "26px",
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Polish Options */}
                <div className="flex items-center gap-1.5 mb-2">
                    <div
                        className="px-1.5 py-1 rounded text-xs font-semibold text-white"
                        style={{
                            backgroundColor: "#000033",
                            minWidth: "35px",
                            minHeight: "26px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Pol :
                    </div>
                    <div className="flex gap-1.5 flex-1">
                        {STATIC_POLISH_OPTIONS.map((option) => (
                            <button
                                key={option}
                                onClick={() => handlePolishClick(option)}
                                className={`px-1.5 py-1 rounded text-xs font-medium transition-colors flex-1 ${
                                    selectedPolish === option
                                        ? "text-blue-600 bg-blue-50"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                                style={{
                                    border:
                                        selectedPolish === option
                                            ? "0.25px solid #2563eb"
                                            : "0.25px solid #f9e8cd",
                                    minHeight: "26px",
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Symmetry Options */}
                <div className="flex items-center gap-1.5">
                    <div
                        className="px-1.5 py-1 rounded text-xs font-semibold text-white"
                        style={{
                            backgroundColor: "#000033",
                            minWidth: "35px",
                            minHeight: "26px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Sym :
                    </div>
                    <div className="flex gap-1.5 flex-1">
                        {STATIC_SYMMETRY_OPTIONS.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSymmetryClick(option)}
                                className={`px-1.5 py-1 rounded text-xs font-medium transition-colors flex-1 ${
                                    selectedSymmetry === option
                                        ? "text-blue-600 bg-blue-50"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                                style={{
                                    border:
                                        selectedSymmetry === option
                                            ? "0.25px solid #2563eb"
                                            : "0.25px solid #f9e8cd",
                                    minHeight: "26px",
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
