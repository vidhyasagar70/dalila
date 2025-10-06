'use client';
import { useEffect, useRef } from 'react';

export default function DiamondExperience() {
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
        <div className="flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-lg aspect-square">
            {/* SVG with mask and video */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="text-mask">
                  <rect width="100%" height="100%" fill="black" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="280"
                    fontWeight="bold"
                    fill="white"
                    fontFamily="Arial, sans-serif"
                  >
                    50
                  </text>
                </mask>
              </defs>
              
              <foreignObject
                width="100%"
                height="100%"
                mask="url(#text-mask)"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="/images/FALLING_diam.mp4"
                  style={{ width: '100%', height: '100%' }}
                />
              </foreignObject>
            </svg>
          </div>
        </div>
        
        {/* Right Side - Text Content */}
        <div className="flex flex-col justify-center space-y-2 lg:items-start">
          <h6 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-blue-600">
            50+ years of family expertise
          </h6>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-light">
            in the diamond business.
          </p>
        </div>
      </div>
    </div>
  );
}