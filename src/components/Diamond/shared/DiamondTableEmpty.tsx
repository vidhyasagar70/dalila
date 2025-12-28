import React from 'react';

interface DiamondTableEmptyProps {
  message?: string;
  hasFilters?: boolean;
}

export const DiamondTableEmpty: React.FC<DiamondTableEmptyProps> = ({
  message,
  hasFilters = false
}) => {
  const defaultMessage = hasFilters 
    ? "No diamonds found matching your filters"
    : "No diamonds found";

  return (
    <div className="w-full h-96 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-gray-600 text-lg mb-3">
          {message || defaultMessage}
        </p>
        {hasFilters && (
          <p className="text-gray-500 text-sm">
            Try adjusting your filters or search criteria
          </p>
        )}
      </div>
    </div>
  );
};


