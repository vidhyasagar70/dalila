'use client';
import { useState, useRef, useEffect, CSSProperties } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

// Motion Wrapper Component
interface MotionWrapperProps {
  children: React.ReactNode;
  variant?: 'fadeIn' | 'fadeUp' | 'slideLeft' | 'slideRight';
  transition?: {
    duration?: number;
    delay?: number;
  };
  className?: string;
}

function MotionWrapper({
  children,
  variant = 'fadeIn',
  transition = {},
  className = '',
}: MotionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { duration = 0.6, delay = 0 } = transition;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getVariantStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      transition: `all ${duration}s ease-out ${delay}s`,
    };

    if (!isVisible) {
      switch (variant) {
        case 'fadeIn':
          return { ...baseStyles, opacity: 0 };
        case 'fadeUp':
          return { ...baseStyles, opacity: 0, transform: 'translateY(40px)' };
        case 'slideLeft':
          return { ...baseStyles, opacity: 0, transform: 'translateX(-60px)' };
        case 'slideRight':
          return { ...baseStyles, opacity: 0, transform: 'translateX(60px)' };
        default:
          return baseStyles;
      }
    }

    return { ...baseStyles, opacity: 1, transform: 'translateY(0) translateX(0)' };
  };

  return (
    <div ref={elementRef} className={className} style={getVariantStyles()}>
      {children}
    </div>
  );
}

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
        className="relative max-w-4xl w-full mx-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-scaleIn"
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
  const [hoveredShape, setHoveredShape] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<{ name: string; image: string } | null>(null);

  const shapes = [
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
        <MotionWrapper variant="fadeIn" transition={{ duration: 0.8 }}>
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm uppercase tracking-wider mb-3">
              EXPLORE SHAPES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Diamond Cuts
            </h2>
          </div>
        </MotionWrapper>

        {/* Diamond Shapes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {shapes.map((shape, index) => {
            // Determine if it's left or right half
            const isLeftHalf = index % 5 < 2.5;
            const variant = isLeftHalf ? 'slideRight' : 'slideLeft';

            return (
              <MotionWrapper
                key={shape.name}
                variant={variant}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div
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
                    <h3 className="font-semibold text-white text-base">
                      {shape.name}
                    </h3>
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>

      </div>

      {/* Image Popup Modal */}
      <ImagePopup
        isOpen={selectedShape !== null}
        onClose={closePopup}
        imageSrc={selectedShape?.image || ''}
        shapeName={selectedShape?.name || ''}
      />

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}