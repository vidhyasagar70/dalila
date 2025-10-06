'use client';
import { useEffect, useRef } from 'react';
import { Playfair_Display} from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});


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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-7xl mx-auto">
        
        <div className="grid grid-cols-2 gap-8 items-center">
          {/* Left half - Large "50" with diamond video mask */}
          <div className="flex items-center justify-center">
            <div className="relative text-gray-600" style={{ width: '600px', height: '600px' }}>
              <svg
                viewBox="0 0 600 600"
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
                      fontSize="450"
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

          {/* Right half - Text content */}
          <div className="flex flex-col gap-1 mt-65">
            <h6 className={`text-3xl md:text-4xl font-light leading-tight text-blue-600 ${playFair.className}`}>
              50+ years of family expertise 
            </h6>
            <p className={`text-2xl md:text-3xl text-gray-800 font-light ${playFair.className}`}>
              in the diamond business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}