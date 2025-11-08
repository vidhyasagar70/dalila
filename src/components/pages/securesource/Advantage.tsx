"use client";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import GoldButton from "@/components/ui/button";
import { FaEuroSign } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { IoEarth } from "react-icons/io5";

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

export default function S2SAdvantages() {
  const advantages = [
    {
      icon: FaEuroSign,
      title: "Euro Payment",
      description: "Euro payment accepted for your convenience",
    },
    {
      icon: MdLocalShipping,
      title: "Weekly Shipments",
      description: "From India (except on Indian public holidays)",
    },
    {
      icon: IoEarth,
      title: "EU Shipping",
      description: "Ship to any EU country for additional FedEx fee",
    },
  ];

  return (
    <div className="bg-[#0B1A33] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <AnimatedContainer direction="up">
          <h2
            className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-center mb-10 md:mb-12 text-white tracking-tight ${marcellus.className}`}
          >
            ADVANTAGES OF S2S - SECURE TO SOURCE
          </h2>
        </AnimatedContainer>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-6">
          {advantages.map((advantage, index) => (
            <AnimatedContainer
              key={advantage.title}
              direction="up"
              delay={index * 0.2}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#c89e3a] flex items-center justify-center mb-4">
                  <advantage.icon className="text-white" size={44} />
                </div>

                {/* Title */}
                <h3
                  className={`text-xl md:text-2xl font-normal mb-2 text-white ${marcellus.className}`}
                >
                  {advantage.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-white/90 text-[14px] md:text-[15px] leading-relaxed max-w-xs ${jost.className}`}
                >
                  {advantage.description}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        {/* Contact Button */}
        <AnimatedContainer direction="up" delay={0.6}>
          <div className="flex justify-center mt-4">
            <GoldButton text="CONTACT US" />
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}