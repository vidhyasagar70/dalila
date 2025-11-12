"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slides = [
    {
      image: "/dalila_img/banners/Banner-01-speedometer.jpg",
      title: "Timeless Elegance",
    },
    {
      image: "/dalila_img/banners/new/Banner_02.jpg",
      title: "Modern Luxury",
    },
    {
      image: "/dalila_img/banners/new/Banner_03.jpg",
      title: "Exclusive Collection",
    },
  ];

  // Create slides with clones at beginning and end for infinite loop
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // Handle infinite loop reset
  useEffect(() => {
    if (currentSlide === slides.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(1);
      }, 1000);
    } else if (currentSlide === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(slides.length);
      }, 1000);
    }
  }, [currentSlide, slides.length]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index + 1);
  };

  const getActiveIndex = () => {
    if (currentSlide === 0) return slides.length - 1;
    if (currentSlide === slides.length + 1) return 0;
    return currentSlide - 1;
  };

  return (
    <section className="relative h-[calc(90vh+8rem)] flex items-center overflow-hidden bg-white">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <div
          className={`flex h-full ${isTransitioning ? "transition-transform duration-1000 ease-out" : ""}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-full h-full flex-shrink-0"
            >
              <img
                src={slide.image}
                alt={`Dalila Diamonds Banner ${((index - 1 + slides.length) % slides.length) + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better button visibility */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:-left-1 top-1/2 -translate-y-10 z-30 text-slate-900 rounded-full p-2 transition-all hover:scale-110"
      >
        <ChevronLeft
          strokeWidth={1}
          className="w-6 h-6 md:w-14 md:h-11 text-[#c89e3a]"
        />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:-right-1 top-1/2 -translate-y-10 z-30 text-slate-900 rounded-full p-2 transition-all hover:scale-110"
      >
        <ChevronRight
          strokeWidth={1}
          className="w-6 h-6 md:w-14 md:h-11 text-[#c89e3a]"
        />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              getActiveIndex() === index
                ? "bg-amber-500 w-8"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
