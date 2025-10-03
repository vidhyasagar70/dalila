'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={isScrolled ? {
        background: 'linear-gradient(to right, #050c3a 0%, #050c3a 100%)'
      } : {}}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Tagline at top */}
        <div className="flex justify-center mb-3">
          <p className="text-sm tracking-wide text-gray-300">
            Where Trust Shines, And Quality Sparkles
          </p>
        </div>

        {/* Horizontal line */}
        <div className="w-full h-[1px] bg-white/30 mb-6"></div>

        {/* Logo and Menu Row */}
        <div className="flex items-center justify-between">
          {/* Left Navigation - All Menu Items */}
          <nav className="hidden md:flex items-center gap-10 flex-1">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/"
              className="text-white hover:text-gold-500 transition-colors text-base"
            >
              Home
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#about"
              className="text-white hover:text-gold-500 transition-colors text-base"
            >
              About Us
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <button className="flex items-center gap-1 text-white hover:text-gold-500 transition-colors text-base">
                Pages
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#contact"
              className="text-white hover:text-gold-500 transition-colors text-base"
            >
              Contact Us
            </motion.a>
          </nav>

          {/* Center Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 mx-8"
          >
            <img 
              src="/images/logo2.png" 
              alt="Dalila Diamonds" 
              className="h-14 w-auto"
            />
          </motion.div>

          {/* Spacer for balance */}
          <div className="flex-1"></div>

          {/* Auth Buttons - Right Side */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2.5 border-2 border-yellow-600 bg-transparent text-white hover:bg-yellow-600 hover:border-yellow-600 transition-all text-base font-medium"
            >
              LOGIN
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2.5 border-2 border-yellow-600 bg-transparent text-white hover:bg-yellow-600 hover:border-yellow-600 transition-all text-base font-medium"
            >
              REGISTER
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}