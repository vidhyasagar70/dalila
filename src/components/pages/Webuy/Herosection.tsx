'use client';

import Image from 'next/image';
import { Playfair_Display,Jost } from "next/font/google";

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
/** AboutDalila Section **/
export default function Webuyhero() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 lg:pl-4">
            <h3 className={`text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight ${playFair.className}`}>
            Sell Your Diamonds With Dalila
            </h3>
            <h6 className={`text-3xl md:text-4xl lg:text-5xl leading-tight ${jost.className} bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent`}>In 5 easy steps</h6>


            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
             At Dalila, we understand that every diamond carries more than just value — it carries meaning, memories, and trust. That&apos;s why we&apos;ve created a seamless 5-step process designed with elegance, discretion, and precision at its core. From the moment you share your diamond with us to the instant you receive your payment, every detail is handled with the utmost care and transparency. Our experts ensure that your diamond&apos;s true brilliance is recognized and rewarded, offering you not just a transaction, but an experience worthy of the gem you hold.
            </p>

    
          </div>

          <div className="relative pb-12">
            <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/intro1.jpg"
                alt="Diamond shapes collection"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
