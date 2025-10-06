'use client';
import { useRef, useEffect } from 'react';
import { Playfair_Display } from "next/font/google";
import Image from 'next/image';

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Legacy() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-7xl mx-auto">
          
          {/* Left Section */}
          <div 
            className="rounded-lg p-8 md:p-12 shadow-2xl flex flex-col justify-center h-[450px] md:h-[500px]"
            style={{
              background: "linear-gradient(to right, #050c3a 0%, #050c3a 100%)"
            }}
          >
            <h1 className={`text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight ${playFair.className}`}>
              Our Legacy
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
             Since 2007, Mr. Shreyas Gandhi has been based in Antwerp, the world’s diamond capital, further strengthening our presence in Europe. From this strategic hub, we continue to serve distinguished clients across Germany, the Netherlands, Italy, Belgium, the United States, Hong Kong, China, and beyond.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
             Our guiding principles remain constant—unwavering dedication to quality, integrity in every transaction, and a passion for building lasting relationships across the global diamond community.</p>
           <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-slate-900 transition-all duration-300 text-sm tracking-wider">
              BOOK NOW
            </button>
          </div>

          {/* Right Section */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl h-[450px] md:h-[500px]">
            <Image
              src="/images/princess-blue.jpg"
              alt="About Us Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
