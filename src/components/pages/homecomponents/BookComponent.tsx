'use client';
import { useRef, useEffect, useState } from 'react';


// Motion Wrapper Component (embedded for completeness)
interface MotionWrapperProps {
  children: React.ReactNode;
  variant?: 'fadeIn' | 'fadeUp' | 'slideLeft' | 'slideRight';
  transition?: {
    duration?: number;
    delay?: number;
  };
  className?: string;
}

function MotionWrapperComponent({
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

export default function BookComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content Section */}
          <MotionWrapperComponent variant="slideLeft" transition={{ duration: 0.8 }}>
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-lg p-8 md:p-12 shadow-2xl h-[400px] md:h-[450px] flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight">
                From Classic Cuts to Rare Shapes — We Have It All
              </h1>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                At Dalila, every diamond tells a story of unmatched brilliance. From timeless classics to 
                unique heart-shaped treasures, our collection reflects elegance and perfection. Each piece is 
                crafted with care, ensuring beauty, rarity, and everlasting value. Experience luxury beyond 
                imagination with us.
              </p>

              <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-slate-900 transition-all duration-300 text-sm tracking-wider">
                BOOK NOW
              </button>
            </div>
          </MotionWrapperComponent>

          {/* Right Video Section */}
          <MotionWrapperComponent variant="slideRight" transition={{ duration: 0.8 }}>
            <div className="relative rounded-lg overflow-hidden shadow-2xl h-[400px] md:h-[450px]">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/images/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay gradient for better video visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            </div>
          </MotionWrapperComponent>
        </div>
      </div>
    </div>
  );
}