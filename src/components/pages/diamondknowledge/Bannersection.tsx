'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DiamondBanner() {
  return (
    <div className="relative bg-slate-900">
      {/* Banner Section */}
      <section className="relative h-[60vh] md:h-[55vh] lg:h-[50vh] flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner-dalila-contact.png"
            alt="About Us Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center py-14">
          <div className="opacity-100">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3 mt-12 ${playFair.className}`}
            >
              Diamond Knowledge
            </h1>
            <div className="w-28 h-0.5 bg-amber-400 mx-auto mb-6" />
          </div>

          <div className="opacity-100 mt-6">
            <div className="flex items-center justify-center gap-2 text-gray-300 text-sm md:text-base">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span>Diamond Knowledge</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
