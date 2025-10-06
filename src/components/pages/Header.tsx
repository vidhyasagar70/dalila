'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050c3a] shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Top Tagline */}
        <div className="flex justify-center mb-3">
          <p className="text-sm tracking-wide text-gray-300">
            Where Trust Shines, And Quality Sparkles
          </p>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-white/30 mb-6"></div>

        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="hidden md:flex items-center gap-10 flex-1">
            <Link
              href="/aboutUs"
              className="text-white hover:text-[#c89e3a] transition-colors text-base"
            >
              About us
            </Link>
            <Link
              href="/weBuy"
              className="text-white hover:text-[#c89e3a] transition-colors text-base"
            >
              We Buy
            </Link>
            <Link
              href="/diamondKnowledge"
              className="text-white hover:text-[#c89e3a] transition-colors text-base"
            >
              Diamond Knowledge
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-[#c89e3a] transition-colors text-base"
            >
              Contact Us
            </Link>
          </nav>

          {/* Center Logo */}
          <div className="flex-shrink-0 relative h-16 w-[150px]">
            <Link
              href="/"
              className="text-white hover:text-[#c89e3a] transition-colors text-base"
            >
            <Image
              src="/images/Dalila Logo.png"
              alt="Dalila Diamonds"
              fill
              style={{ objectFit: 'contain' }}
              priority
            /></Link>
          </div>

          {/* Right Auth Buttons */}
          <div className="flex items-center justify-end gap-3 flex-1">
            <button className="py-1 px-6 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors">
              INVENTORY
            </button>
            <button className="py-1 px-6 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors">
              LOGIN
            </button>
            <button className="py-1 px-6 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors">
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}