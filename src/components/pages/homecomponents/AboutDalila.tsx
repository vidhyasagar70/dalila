"use client";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** AboutDalila Section **/
export default function AboutDalila() {
  return (
    <div className={`bg-white py-12 md:py-16 lg:py-20 ${playFair.className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="pb-8 md:pb-10 lg:pb-12 flex flex-col items-end justify-end">
            <AnimatedContainer direction="scale-out">
              <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                <Image
                  src="/diamondcuts/home-about.jpg"
                  alt="Diamond shapes collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </AnimatedContainer>
            <AnimatedContainer
              direction="scale-out"
              delay={0.2}
              className="flex justify-end relative"
            >
              <div
                className="absolute -top-10 -right-10 max-w-sm px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-8 shadow-xl"
                style={{ backgroundColor: "#c89e3a" }}
              >
                <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-semibold text-white whitespace-nowrap tracking-wide">
                  ABOUT DALILA
                </h3>
              </div>
            </AnimatedContainer>
          </div>
          <div className="space-y-4 md:space-y-6 lg:pl-4">
            <AnimatedContainer direction="up" delay={0.5}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight">
                We Shape Brilliance into Timeless Value.
              </h3>
            </AnimatedContainer>
            <AnimatedContainer direction="up" delay={0.5}>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                At DALILA, we believe diamonds are more than gems — they are a
                symbol of trust, innovation, and enduring luxury. As a leading
                name in the natural diamond industry, we partner with businesses
                and connoisseurs to deliver diamonds that embody precision,
                sustainability, and prestige. From wholesale supply to bespoke
                creations, every DALILA diamond is crafted to inspire confidence
                and redefine brilliance.
              </p>
            </AnimatedContainer>
            <div className="pt-4 md:pt-6">
              <AnimatedContainer direction="scale-out">
                <button
                  className="px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-white font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
                  style={{ backgroundColor: "#c89e3a" }}
                >
                  Explore More
                </button>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}