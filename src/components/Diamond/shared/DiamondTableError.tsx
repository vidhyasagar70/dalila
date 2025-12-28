import React from 'react';

interface DiamondTableErrorProps {
  error: string;
  title?: string;
}

export const DiamondTableError: React.FC<DiamondTableErrorProps> = ({
  error,
  title = "Error loading diamonds"
}) => {
  return (
    <div className="w-full h-96 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-red-600 mb-2 text-4xl">⚠️</div>
        <p className="text-red-600 font-medium">{title}</p>
        <p className="text-gray-600 text-sm mt-2">{error}</p>
      </div>
    </div>
  );
};


