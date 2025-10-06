'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DiamondHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err =>
        console.log('Video autoplay failed:', err)
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 md:px-12 lg:px-24 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side - Masked Video in "50" */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end relative"
        >
          <div className="relative w-full max-w-lg">
            {/* Video that fills the text */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute inset-0"
              style={{
                WebkitMaskImage: 'url(#mask-text)',
                maskImage: 'url(#mask-text)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center'
              }}
            />

            {/* SVG mask definition */}
            <svg width="0" height="0">
              <defs>
                <mask id="mask-text" x="0" y="0" width="100%" height="100%">
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="400"
                    fontWeight="bold"
                    fill="white"
                    fontFamily="sans-serif"
                  >
                    50
                  </text>
                </mask>
              </defs>
            </svg>

            {/* Fallback static text (in case mask fails) */}
            <h1 className="text-[20rem] font-bold leading-none text-gray-400 opacity-20 select-none">
              50
            </h1>
          </div>
        </motion.div>

        {/* Right Side - Text Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col justify-center space-y-2"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-blue-600">
            50+ years of family expertise
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-light">
            in the diamond business.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
