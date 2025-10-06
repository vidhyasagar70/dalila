'use client';
import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { Playfair_Display, Jost } from "next/font/google";

interface MotionWrapperProps {
  children: ReactNode;
  variant?: 'fadeIn' | 'fadeUp' | 'slideLeft' | 'slideRight';
  transition?: {
    duration?: number;
    delay?: number;
  };
  className?: string;
}
const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

function MotionWrapper({
  children,
  variant = 'fadeIn',
  transition = {},
  className = '',
}: MotionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const duration = transition.duration ?? 0.6;
  const delay = transition.delay ?? 0;

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
      if (currentElement) observer.unobserve(currentElement);
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

    return { ...baseStyles, opacity: 1, transform: 'translate(0, 0)' };
  };

  return (
    <div ref={elementRef} className={className} style={getVariantStyles()}>
      {children}
    </div>
  );
}

/** AboutDalila Section **/
export default function AboutDalila() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Half - Image */}
          <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
            <div className="relative pb-12">
              <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/images/section_about.jpg"
                  alt="Diamond shapes collection"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gold Banner - Aligned to right */}
              <div
                className="absolute bottom-0 right-0 px-10 py-5 shadow-xl"
                style={{ backgroundColor: '#c89e3a' }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap tracking-wide">
                  ABOUT DALILA
                </h3>
              </div>
            </div>
          </MotionWrapper>

          {/* Right Half - Content */}
          <MotionWrapper variant="slideLeft" transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="space-y-6 lg:pl-4">
              {/* Main Heading */}
              <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 leading-tight ${playFair.className}`}>
                We Shape Brilliance into Timeless Value.
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                At DALILA, we believe diamonds are more
                than gems — they are a symbol of trust, innovation, and enduring luxury. As a
                leading name in the natural diamond industry, we partner with businesses and
                connoisseurs to deliver diamonds that embody precision, sustainability, and
                prestige. From wholesale supply to bespoke creations, every DALILA diamond is
                crafted to inspire confidence and redefine brilliance.
              </p>

              {/* Explore More Button */}
              <div className="pt-6">
                <button
                  className="px-10 py-4 text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
                  style={{ backgroundColor: '#c89e3a' }}
                >
                  Explore More
                </button>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}
