'use client';
import Image from 'next/image';
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** AboutDalila Section **/
export default function AboutHero() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Half - Image */}
          <div className="relative pb-12">
            <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/about_us_1.jpg"
                alt="Diamond shapes collection"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Gold Banner - Aligned to right */}
            <div
              className="absolute bottom-0 right-0 px-10 py-5 shadow-xl"
              style={{ backgroundColor: '#c89e3a' }}
            >
              <h3 className="text-sm md:text-3xl font-semibold text-white whitespace-nowrap tracking-wide">
                ABOUT DALILA
              </h3>
            </div>
          </div>

          {/* Right Half - Content */}
          <div className="space-y-6 lg:pl-4">
            {/* Main Heading */}
            <h3 className={`text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight ${playFair.className}`}>
              We Shape Brilliance into Timeless Value.
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              At DALILA, we believe diamonds are more than gems — they are a symbol of trust,
              innovation, and enduring luxury. As a leading name in the natural diamond industry,
              we partner with businesses and connoisseurs to deliver diamonds that embody
              precision, sustainability, and prestige. From wholesale supply to bespoke creations,
              every DALILA diamond is crafted to inspire confidence and redefine brilliance.
            </p>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              With a legacy spanning over five decades, our family has been dedicated to the art
              and integrity of the diamond trade. What began as a modest endeavor in Gujarat has
              evolved into a respected international enterprise, recognized for its commitment to
              excellence, trust, and ethics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
