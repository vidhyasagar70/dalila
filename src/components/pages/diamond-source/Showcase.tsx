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

export default function DiamondSourceshowcase() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Sell Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <AnimatedContainer direction="scale-out">
            <div>
              <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/diamondcuts/Tellusyourneeds.jpg"
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
                  Tell Us What You Need
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
              >
                Select stones from any online public platform of your choice. Browse at your convenience and choose the diamonds that match your requirements.
              </p>
             
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
                 We Search Our Worldwide <br/> Network
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
              >
                Our team searches our exclusive worldwide network for stones that match your exact specifications, including goods not listed on public online platforms. We have access to premium inventory that others don't.
              </p>
             
            </div>
          </div>

          <div>
            <AnimatedContainer direction="scale-out">
              <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/diamondcuts/WeSearchOurWorldwideNetwork.jpg"
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
                  src="/diamondcuts/Fastandsecuredelivery.jpg"
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
                  Fast & Secure <br/>Delivery
                </h2>
              </AnimatedContainer>
              <p
                className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${jost.className}`}
              >
               Weekly shipments from India ensure you receive your diamonds quickly and securely. No additional cost for delivery within Belgium.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
