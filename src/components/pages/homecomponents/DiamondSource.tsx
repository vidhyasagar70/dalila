'use client';
import { useRef, useEffect } from 'react';

export default function DiamondSource() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-7xl mx-auto">
          {/* Left Content Section */}
          <div>
            <div className="relative overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/images/world_net.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay gradient for better video visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Right Content Section */}
          <div>
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 md:p-12 shadow-2xl h-[400px] md:h-[500px] flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight font-serif">
                Diamond Sourcing
              </h1>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                At Dalila, we have the ability to source diamonds of any shape, size, or quality,
                tailored exactly to your preferences. Whether you're looking for a specific cut,
                color, or carat weight, we can help you find the perfect diamond from anywhere in the
                world. Our global network of trusted suppliers & experts ensures that we can secure
                diamonds that meet the highest standards of craftsmanship & value. With Dalila,
                you don't just get a diamond - you get a personalized, seamless experience,
                bringing you the finest options available on the market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}