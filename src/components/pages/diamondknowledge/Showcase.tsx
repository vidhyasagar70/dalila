"use client";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Diamondshowcase() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Sell Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="relative h-[350px] md:h-[390px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/diamondwork.png"
                alt="Professional diamond dealer"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="max-w-xl">
              <h4
                className={`text-sm md:text-base uppercase tracking-widest text-gray-500 mb-4 font-medium ${playFair.className}`}
              >
                Introduction
              </h4>
              <h2
                className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${playFair.className}`}
              >
                Diamond Knowledge Guide
              </h2>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${playFair.className}`}
              >
                Diamonds are more than just gemstones — they are timeless
                symbols of love, craftsmanship, and nature&apos;s brilliance.
                Formed deep within the Earth over billions of years, every
                natural diamond carries a story of purity and perfection.
                Whether you&apos;re buying your first diamond or expanding your
                collection, understanding the key aspects of a diamond helps you
                make a truly informed choice. This guide is designed to help you
                explore every detail — from how diamonds are formed to what
                makes each one unique.
              </p>
            </div>
          </div>
        </div>

        {/* Language of Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="max-w-xl">
              <h4
                className={`text-sm md:text-base uppercase tracking-widest text-gray-500 mb-4 font-medium ${playFair.className}`}
              >
                Diamond&apos;s Journey
              </h4>
              <h2
                className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${playFair.className}`}
              >
                The Journey of a Diamond
              </h2>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${playFair.className}`}
              >
                Natural diamonds are created under extreme pressure and
                temperature conditions, deep below the Earth&apos;s surface.
                Over millions of years, these crystals travel upward through
                volcanic activity, eventually reaching the surface where they
                are mined and transformed into beautiful jewels.
              </p>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${playFair.className}`}
              >
                Each diamond&apos;s journey — from mine to masterpiece —
                involves ethical sourcing, expert craftsmanship, and precise
                grading to ensure its authenticity and value.
              </p>
            </div>
          </div>

          <div>
            <div className="relative h-[350px] md:h-[390px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/diamondjourney.png"
                alt="Diamond examination with tweezers"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
