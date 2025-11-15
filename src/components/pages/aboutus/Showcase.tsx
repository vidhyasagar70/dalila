"use client";
import Image from "next/image";

import GoldButton from "@/components/ui/button";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function Aboutshowcase() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Sell Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <AnimatedContainer direction="scale-out">
            <div>
              <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/images/Heritage.png"
                  alt="Professional diamond dealer"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </AnimatedContainer>

          <div>
            <div className="max-w-xl">
              <AnimatedContainer direction="up">
                <h2
                  className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${marcellus.className} `}
                >
                  Our Heritage
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
              >
                The roots of our company stretch back more than five decades, to when three visionary brothers left their village in Gujarat at just 18, determined to build a future in the diamond trade. Through unwavering perseverance,
                 hard work and a commitment to ethical practices, 
                 they laid a strong foundation in Surat and Mumbai.
                 As the second generation joined the business,
                the vision expanded beyond India’s borders,
                forging lasting partnerships and establishing a global presence.Today, this forward-looking spirit grounded in deeply held family values continues to guide us, 
                earning DALILA its reputation as a trusted name in the international diamond industry.


              </p>
              {/* <button
                className={`bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 rounded-sm transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${playFair.className}`}
              >
                EXPLORE MORE
              </button> */}
              <GoldButton text="Explore More" />
            </div>
          </div>
        </div>

        {/* Language of Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="max-w-xl">
              <AnimatedContainer direction="up">
                <h2
                  className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${marcellus.className}`}
                >
                  Diamond Knowledge Guide
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
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
              {/* <button className="bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 rounded-sm transition-all duration-300 mt-6 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg">
                Explore More
              </button> */}
              <GoldButton text="Explore More" />
            </div>
          </div>

          <div>
            <AnimatedContainer direction="scale-out">
              <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/images/diamondwork.png"
                  alt="Diamond examination with tweezers"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedContainer>
          </div>
        </div>
        {/* Sell Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-25 mt-25">
          <div>
            <AnimatedContainer direction="scale-out" delay={0.5}>
              <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/images/sell_page.jpg"
                  alt="Professional diamond dealer"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedContainer>
          </div>

          <div>
            <div className="max-w-xl">
              <AnimatedContainer direction="up">
                <h2
                  className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${marcellus.className} `}
                >
                  Sell Your Diamonds
                  <br />
                  Safely and
                  <br />
                  Seamlessly at Dalila
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
              >
                Selling your diamond or fine jewelry should be a seamless,
                secure, and rewarding experience. At Dalila, we offer a
                transparent and hassle-free process, trusted by customers.
                Whether you&apos;re parting with an engagement ring, heirloom or
                a loose diamond, we value every piece. Here&apos;s how the
                process works
              </p>
              {/* <button
                className={`bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 rounded-sm transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${playFair.className}`}
              >
                Sell Now
              </button> */}
              <GoldButton text="Sell Now" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
