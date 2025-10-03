
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MotionWrapper from '../ui/MotionWrapper';
import AnimatedButton from '../ui/AnimatedButton';

export default function AnimatedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MotionWrapper
      variant="fadeDown"
      transition={{ duration: 0.6 }}
      style={isScrolled ? { background: 'linear-gradient(to right, #050c3a 0%, #050c3a 100%)' } : {}}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-3">
          <p className="text-sm tracking-wide text-gray-300">
            Where Trust Shines, And Quality Sparkles
          </p>
        </div>
        <div className="w-full h-[1px] bg-white/30 mb-6"></div>
        <div className="flex items-center justify-between">
          {/* Left Nav */}
          <nav className="hidden md:flex items-center gap-10 flex-1">
            <MotionWrapper variant="grow">
              <Link href="/" className="text-white hover:text-gold-500 transition-colors text-base">
                Home
              </Link>
            </MotionWrapper>
            <MotionWrapper variant="grow">
              <Link href="/weBuy" className="text-white hover:text-gold-500 transition-colors text-base">
                We Buy
              </Link>
            </MotionWrapper>
            <MotionWrapper variant="grow">
              <Link
                href="/diamondKnowledge"
                className="text-white hover:text-gold-500 transition-colors text-base"
              >
                Diamond Knowledge
              </Link>
            </MotionWrapper>
            <MotionWrapper variant="grow">
              <Link href="/contact" className="text-white hover:text-gold-500 transition-colors text-base">
                Contact Us
              </Link>
            </MotionWrapper>
          </nav>

          {/* Logo */}
          <MotionWrapper variant="grow">
            <div className="flex-shrink-0 mx-8 relative h-14 w-[120px]">
              <Image
                src="/images/Dalila Logo.png"
                alt="Dalila Diamonds"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </MotionWrapper>

          <div className="flex items-center justify-end gap-3 flex-1"></div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <AnimatedButton className="py-1.5 px-4 text-sm border-opacity-30">INVENTORY</AnimatedButton>
            <AnimatedButton className="py-1.5 px-4 text-sm border-opacity-30">LOGIN</AnimatedButton>
            <AnimatedButton className="py-1.5 px-4 text-sm border-opacity-30">REGISTER</AnimatedButton>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}
