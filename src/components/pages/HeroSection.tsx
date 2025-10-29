"use client";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: "/dalila_img/banners/new/Banner_01.jpg" },
    { image: "/dalila_img/banners/new/Banner_02.jpg" },
    { image: "/dalila_img/banners/new/Banner_03.jpg" },
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
    <section className="relative h-[calc(90vh+8rem)] flex items-center overflow-hidden bg-white">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-full h-full flex-shrink-0"
            >
              <Image
                src={slide.image}
                alt={`Dalila Diamonds Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:-left-1 top-1/2 -translate-y-10 z-30  text-slate-900 rounded-full p-2 transition-all "
      >
        <IconChevronLeft
          stroke={1}
          className="w-6 h-6 md:w-14 md:h-11 text-[#c89e3a]"
        />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:-right-1 top-1/2 -translate-y-10 z-30  text-slate-900 rounded-full p-2 transition-all "
      >
        <IconChevronRight
          stroke={1}
          className="w-6 h-6 md:w-14 md:h-11 text-[#c89e3a]  "
        />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? "bg-amber-500 w-8"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
