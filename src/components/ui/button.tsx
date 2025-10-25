"use client";
import { Playfair_Display } from "next/font/google";
import React from "react";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

interface GoldButtonProps {
    text: string;
    onClick?: () => void;
}

const GoldButton: React.FC<GoldButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5  transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${playFair.className}`}
        >
            {text}
        </button>
    );
};

export default GoldButton;
