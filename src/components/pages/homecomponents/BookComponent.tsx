'use client';
import { useRef, useEffect} from 'react';
import { Playfair_Display, Jost } from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function BookComponent() {
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
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content Section */}
         
             <div 
            className="p-8 md:p-12 shadow-2xl flex flex-col justify-center h-[400px] md:h-[450px]"
            style={{
              background: "linear-gradient(to right, #050c3a 0%, #050c3a 100%)"
            }}
          >
              <h1 className={`text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight ${playFair.className}`}>
                From Classic Cuts to Rare Shapes — We Have It All
              </h1>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                At Dalila, every diamond tells a story of unmatched brilliance. From timeless classics to 
                unique heart-shaped treasures, our collection reflects elegance and perfection. Each piece is 
                crafted with care, ensuring beauty, rarity, and everlasting value. Experience luxury beyond 
                imagination with us.
              </p>

              <button className="py-1 px-3 xl:px-4 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap w-fit">
              BOOK NOW
            </button>
            </div>
          

         
            <div className="relative overflow-hidden shadow-2xl h-[400px] md:h-[450px]">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/images/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay gradient for better video visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            </div>
       
        </div>
      </div>
    </div>
  );
}