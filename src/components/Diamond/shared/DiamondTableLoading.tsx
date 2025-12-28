import React from 'react';
import { Loader2 } from 'lucide-react';

interface DiamondTableLoadingProps {
  message?: string;
}

export const DiamondTableLoading: React.FC<DiamondTableLoadingProps> = ({
  message = "Loading diamonds..."
}) => {
  return (
    <div className="w-full h-96 flex items-center justify-center ">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#050c3a] mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};


