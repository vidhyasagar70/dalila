"use client";

import React from "react";
import { Mail } from "lucide-react";

interface EmailButtonProps {
  selectedCount?: number;
  onEmail?: () => void;
  disabled?: boolean;
}

export default function EmailButton({
  selectedCount = 0,
  onEmail,
  disabled = false,
}: EmailButtonProps) {
  const handleEmail = () => {
    if (!disabled && selectedCount > 0) {
      onEmail?.();
    }
  };

  return (
    <button
      onClick={handleEmail}
      disabled={disabled || selectedCount === 0}
      className={`flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded shadow-sm transition-colors ${
        disabled || selectedCount === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#000033]"
      }`}
    >
      <Mail className="w-4 h-4" />
      <span>Email Selected</span>
      
    </button>
  );
}