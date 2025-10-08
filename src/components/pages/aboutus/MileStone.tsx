'use client';
import Image from 'next/image';
import { Playfair_Display } from "next/font/google";
import { Gem } from 'lucide-react';

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});



export default function AboutMilestone() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h1 className={`text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-center mb-20 text-gray-900 ${playFair.className}`}>
          Milestones & Achievements
        </h1>
      
        {/* Milestones Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="relative h-[380px] md:h-[420px] w-full max-w-[540px] mx-auto overflow-hidden">
              <Image
                src="/images/about_us_3.png"
                alt="Diamond on display"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div>
            <div className="space-y-8">
              {/* Achievement 1 */}
              <div className="flex gap-4">
                <Gem className="text-[#c89e3a] flex-shrink-0" size={24} />
                <div className="flex-1">
                  <p className={`text-gray-600 text-base md:text-lg leading-relaxed ${playFair.className}`}>
                    <span className="font-semibold">50+ years of family expertise in the diamond business</span>
                  </p>
                </div>
                <div className="flex-1 pl-8">
                  <p className={`text-gray-600 text-base md:text-lg leading-relaxed ${playFair.className}`}>
                    <span className="font-semibold">Expansion from Surat and Mumbai to a global presence.</span>
                  </p>
                </div>
              </div>

              {/* Achievement 2 */}
              <div className="flex gap-4">
                <Gem className="text-[#c89e3a] flex-shrink-0" size={24} />
                <div className="flex-1">
                  <p className={`text-gray-600 text-base md:text-lg leading-relaxed ${playFair.className}`}>
                    <span className="font-semibold">Strategic establishment in Antwerp (since 2007) to serve European clientele.</span>
                  </p>
                </div>
                <div className="flex-1 pl-8">
                  <p className={`text-gray-800 text-base md:text-lg leading-relaxed ${playFair.className}`}>
                    <span className="font-semibold">Strong international network across the United States, Europe, Hong Kong, China, and beyond.</span>
                  </p>
                </div>
              </div>

              {/* Achievement 3 */}
              <div className="flex gap-4">
                <Gem className="text-[#c89e3a] flex-shrink-0" size={24} />
                <div className="flex-1">
                  <p className={`text-gray-600 text-base md:text-lg leading-relaxed ${playFair.className}`}>
                    <span className="font-semibold">A reputation built on quality, transparency, and long-standing relationships.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}