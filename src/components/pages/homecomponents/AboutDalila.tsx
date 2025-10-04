'use client';
import { useState, useRef, useEffect, CSSProperties } from 'react';
import Image from 'next/image';

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

export default function AboutDalila() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Half - Image */}
          <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
            <div className="relative">
             <div className="relative w-full aspect-[5/3] bg-black rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/section_about.jpg"
                  alt="Diamond shapes collection"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Gold Banner */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 px-12 py-6 shadow-xl"
                style={{ backgroundColor: '#c89e3a' }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap">
                  ABOUT DALILA
                </h3>
              </div>
            </div>
          </MotionWrapper>

          {/* Right Half - Content */}
          <MotionWrapper variant="slideLeft" transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="space-y-6 lg:pl-8">
              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                We Shape Brilliance into Timeless Value.
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                DALILA, we believe diamonds are more than gems — they are a symbol of trust, 
                innovation, and enduring luxury. As a leading name in the Natural diamonds 
                diamond industry, we partner with businesses and connoisseurs to deliver 
                diamonds that embody precision, sustainability, and prestige. From wholesale 
                supply to bespoke creations, every DALILA diamond is crafted to inspire 
                confidence and redefine brilliance.
              </p>

              {/* Explore More Button */}
              <div className="pt-4">
                <button 
                  className="px-8 py-3 text-white font-semibold text-base uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: '#c89e3a' }}
                >
                  EXPLORE MORE
                </button>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}