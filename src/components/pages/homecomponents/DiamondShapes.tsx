'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Playfair_Display, Jost } from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
// Image Popup Modal Component
interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  shapeName: string;
}

function ImagePopup({ isOpen, onClose, imageSrc, shapeName }: ImagePopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
          aria-label="Close popup"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Image Container */}
        <div className="relative w-full h-[70vh] p-12">
          <Image
            src={imageSrc}
            alt={`${shapeName} cut diamond`}
            fill
            style={{ objectFit: 'contain' }}
            className="drop-shadow-2xl"
          />
        </div>

        {/* Shape Name */}
        <div className="py-6 text-center" style={{ backgroundColor: '#c89e3a' }}>
          <h2 className="text-3xl font-bold text-white">{shapeName}</h2>
        </div>
      </div>
    </div>
  );
}

export default function DiamondShapes() {
  const [selectedShape, setSelectedShape] = useState<{ name: string; image: string } | null>(null);

  const shapes: { name: string; image: string }[] = [
    { name: 'Round', image: '/images/round-blue.jpg' },
    { name: 'Princess', image: '/images/princess-blue.jpg' },
    { name: 'Cushion', image: '/images/cushion-blue.jpg' },
    { name: 'Radiant', image: '/images/radiant-blue.jpg' },
    { name: 'Asscher', image: '/images/asscher-blue.jpg' },
    { name: 'Heart', image: '/images/heart-blue.jpg' },
    { name: 'Pear', image: '/images/pear-blue.jpg' },
    { name: 'Marquise', image: '/images/marquise-blue.jpg' },
    { name: 'Oval', image: '/images/oval-blue.jpg' },
    { name: 'Emerald', image: '/images/emerald-blue.jpg' },
  ];

  const handleShapeClick = (shape: { name: string; image: string }) => {
    setSelectedShape(shape);
  };

  const closePopup = () => {
    setSelectedShape(null);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-normal text-slate-600 mb-4 ${playFair.className}`}>
            Diamond Cuts
          </h2>
        </div>

        {/* Diamond Shapes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {shapes.map((shape) => (
            <div
              key={shape.name}
              className="relative overflow-hidden rounded-lg cursor-pointer shadow-lg"
              onClick={() => handleShapeClick(shape)}
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                <div className="relative w-full h-full p-8">
                  <Image
                    src={shape.image}
                    alt={`${shape.name} cut diamond`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Label */}
              <div
                className="py-3 px-4 text-center"
                style={{
                  backgroundColor: '#c89e3a',
                }}
              >
                <h3 className={`font-semibold text-white text-base ${jost.className}`}>
                  {shape.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Popup Modal */}
      <ImagePopup
        isOpen={selectedShape !== null}
        onClose={closePopup}
        imageSrc={selectedShape?.image || ''}
        shapeName={selectedShape?.name || ''}
      />
    </div>
  );
}