'use client';
import { useRef, useEffect, useState } from 'react';

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

  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
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

export default function VideoContent() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/images/video3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Centered Text Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <MotionWrapper variant="fadeUp" transition={{ duration: 1, delay: 0.3 }}>
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight tracking-wide">
              Every diamond, delicately refined through skill & crafted by the hands of true perfectionists.
            </h1>
          </div>
        </MotionWrapper>
      </div>

      {/* Optional: Elegant border decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/30"></div>
      </div>
    </div>
  );
}