'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'PREMIUM DIAMONDS FOR BUSINESSES',
      description:
        'Dalila is a global supplier of certified premium natural diamonds for B2B, trusted by jewelers, manufacturers, and luxury brands worldwide. We provide ethically sourced and precision-graded natural diamonds that embody brilliance, authenticity, and consistency.',
      image: '/images/dalila_banner.jpg',
    },
    {
      title: 'CERTIFIED EXCELLENCE',
      description:
        'Every diamond we source is certified by leading gemological institutes. Our rigorous quality control ensures that each stone meets the highest standards of clarity, cut, and brilliance. Partner with us for diamonds that represent true luxury and value.',
      image: '/images/dalila_banner.jpg',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image}
              alt="Dalila Diamonds Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-amber-400 transition-colors duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-amber-400 transition-colors duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
      </motion.button>

      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content - Text Carousel */}
          <div className="relative min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-6 md:space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white mb-2">
                    {slides[currentSlide].title}
                  </h1>
                  <div className="w-24 h-1 bg-amber-400 mt-4"></div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-gray-200 text-base md:text-lg leading-relaxed max-w-xl"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 transition-all duration-300 shadow-lg"
                >
                  EXPLORE MORE
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${currentSlide}`}
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.9 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
              >
                <img 
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                
                {/* Decorative border */}
                <div className="absolute inset-0 border-4 border-amber-400/20 rounded-lg pointer-events-none"></div>
              </motion.div>
            </AnimatePresence>

            {/* Decorative elements */}
            
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
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

      {/* Slide counter */}
      <div className="absolute top-24 right-8 z-20 text-white/60 font-mono text-sm hidden md:block">
        <motion.span
          key={currentSlide}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-amber-400 text-2xl font-bold"
        >
          {String(currentSlide + 1).padStart(2, '0')}
        </motion.span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}