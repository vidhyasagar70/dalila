// components/layout/HeroSection.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedButton from '../ui/AnimatedButton';
import Image from 'next/image';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: '/images/Banner-01.jpg' },
    { image: '/images/Banner-02.jpg' },
    { image: '/images/Banner-03.jpg' },
    { image: '/images/Banner-04.jpg' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt="Dalila Diamonds"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-slate-900/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <AnimatedButton
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-amber-400 bg-transparent border-none shadow-none w-auto h-auto p-0"
        style={{ background: 'none', border: 'none' }}
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
      </AnimatedButton>
      <AnimatedButton
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-amber-400 bg-transparent border-none shadow-none w-auto h-auto p-0"
        style={{ background: 'none', border: 'none' }}
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
      </AnimatedButton>

      {/* Main container */}
      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Content removed - images contain all details */}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-amber-400 w-10 shadow-lg shadow-amber-400/50'
                : 'bg-white/40 w-3 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
