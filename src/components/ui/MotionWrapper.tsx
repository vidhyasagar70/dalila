// components/ui/MotionWrapper.tsx
'use client';
import { useEffect, useRef, useState, CSSProperties, ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  variant?: 'fadeIn' | 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'grow';
  transition?: {
    duration?: number;
    delay?: number;
  };
  className?: string;
  style?: CSSProperties;
}

export default function MotionWrapper({
  children,
  variant = 'fadeIn',
  transition = {},
  className = '',
  style = {},
}: MotionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { duration = 0.6, delay = 0 } = transition;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const getVariantStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      transition: `all ${duration}s ease-out ${delay}s`,
      ...style,
    };

    if (!isVisible) {
      switch (variant) {
        case 'fadeIn':
          return { ...baseStyles, opacity: 0 };
        case 'fadeUp':
          return { ...baseStyles, opacity: 0, transform: 'translateY(40px)' };
        case 'fadeDown':
          return { ...baseStyles, opacity: 0, transform: 'translateY(-40px)' };
        case 'slideLeft':
          return { ...baseStyles, opacity: 0, transform: 'translateX(-60px)' };
        case 'slideRight':
          return { ...baseStyles, opacity: 0, transform: 'translateX(60px)' };
        case 'grow':
          return { ...baseStyles, opacity: 0, transform: 'scale(0.9)' };
        default:
          return baseStyles;
      }
    }

    return { ...baseStyles, opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' };
  };

  return (
    <div ref={elementRef} className={className} style={getVariantStyles()}>
      {children}
    </div>
  );
}