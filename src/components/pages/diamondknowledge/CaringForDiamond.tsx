'use client';
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

export default function CaringForDiamond() {
  const careTips = [
    'Clean them gently with warm water and mild soap.',
    'Store separately to prevent scratching other jewelry',
    'Schedule professional cleanings once a year.'
  ];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className={`text-[40px] md:text-[48px] lg:text-[52px] text-[#2d2d2d] mb-4 font-normal tracking-tight leading-tight ${playFair.className}`}>
            Caring for Your Diamond
          </h1>
          <p className={`text-[#6b6b6b] leading-relaxed text-[13px] md:text-[14px] max-w-4xl mx-auto font-normal ${jost.className}`}>
            Diamonds are durable, but they still deserve care. To maintain brilliance:
          </p>
        </div>

        {/* Care Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-8">
          {careTips.map((tip, index) => (
            <div key={index} className="text-center">
              <p className={`text-[#757575] text-[13px] md:text-[13.5px] leading-relaxed font-normal ${jost.className}`}>
                {tip}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}