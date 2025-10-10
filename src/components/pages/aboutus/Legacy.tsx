"use client";
import { useRef, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Legacy() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto">
          {/* Left Section */}
          <div
            className="p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl flex flex-col justify-center h-[350px] sm:h-[400px] md:h-[400px] lg:h-[450px]"
            style={{
              background: "linear-gradient(to right, #050c3a 0%, #050c3a 100%)",
            }}
          >
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 md:mb-4 leading-tight ${playFair.className}`}
            >
              Our Legacy
            </h1>

            <p
              className={`text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-3 md:mb-4 ${playFair.className}`}
            >
              Since 2007, Mr. Shreyas Gandhi has been based in Antwerp, the
              world&apos;s diamond capital, further strengthening our presence
              in Europe. From this strategic hub, we continue to serve
              distinguished clients across Germany, the Netherlands, Italy,
              Belgium, the United States, Hong Kong, China, and beyond.
            </p>
            <p
              className={`text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6 ${playFair.className}`}
            >
              Our guiding principles remain constant—unwavering dedication to
              quality, integrity in every transaction, and a passion for
              building lasting relationships across the global diamond
              community.
            </p>
            <button
              className={`py-2 px-4 md:py-2.5 md:px-5 lg:px-6 text-xs sm:text-sm lg:text-base text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap w-fit ${playFair.className}`}
            >
              CONTACT
            </button>
          </div>

          {/* Right Section */}
          <div className="relative overflow-hidden shadow-2xl h-[350px] sm:h-[400px] md:h-[400px] lg:h-[450px]">
            <Image
              src="/images/asscher-blue.jpg"
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
