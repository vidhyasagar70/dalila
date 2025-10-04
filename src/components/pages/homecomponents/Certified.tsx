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

export default function CertifiedBy() {
  const certifications = [
    { name: 'IGI', image: '/images/client_1.png' },
    { name: 'GIA', image: '/images/client_2.png' },
    { name: 'HRD', image: '/images/client_3.png' },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <MotionWrapper variant="fadeIn" transition={{ duration: 0.8 }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              Certified By
            </h2>
          </div>
        </MotionWrapper>

        {/* Sliding Logos Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Sliding Track */}
          <div className="flex animate-slide">
            {/* First set of logos */}
            {certifications.map((cert, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-12 md:mx-16"
                style={{ width: '200px' }}
              >
                <div className="relative h-24 w-full">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {certifications.map((cert, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-12 md:mx-16"
                style={{ width: '200px' }}
              >
                <div className="relative h-24 w-full">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}

            {/* Third set for extra smooth loop */}
            {certifications.map((cert, index) => (
              <div
                key={`third-${index}`}
                className="flex-shrink-0 mx-12 md:mx-16"
                style={{ width: '200px' }}
              >
                <div className="relative h-24 w-full">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-slide {
          animation: slide 15s linear infinite;
        }

        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}