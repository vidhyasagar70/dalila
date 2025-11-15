"use client";

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

export default function FreeEstimateSteps() {
  const steps = [
    {
      number: "01",
      title: "Tell Us About Your Diamond",
      details: [
        "Shape, carat weight, colour, clarity, cut/make, fluorescence",
        "Measurements and setting (if mounted)",
      ],
      color: "bg-[#E85D4F]",
    },
    {
      number: "02",
      title: "Upload Diamond Photos",
      details: ["Top and side view on a plain background", "Taken in good natural daylight"],
      color: "bg-[#E8B71D]",
    },
    {
      number: "03",
      title: "Upload Certificate",
      details: ["GIA / IGI / HRD certificate", "Or simply share the report number"],
      color: "bg-[#1ABC9C]",
    },
    {
      number: "04",
      title: "Add Your Comments",
      details: ["Chips, repolish, laser inscription", "Desired price and timeline"],
      color: "bg-[#3498DB]",
    },
    {
      number: "05",
      title: "Share Your Contact Details",
      details: ["Name, email, phone", "City and country"],
      color: "bg-[#2ECC71]",
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <AnimatedContainer direction="up">
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl text-center text-gray-900 mb-4 ${marcellus.className}`}
          >
            Get a Free Estimate{" "}
            <span className="bg-gradient-to-r from-[#3498DB] via-[#5DADE2] to-[#3498DB] bg-clip-text text-transparent">
              — In 5 Simple Steps
            </span>
          </h2>
        </AnimatedContainer>

        {/* Steps Container */}
        <div className="mt-16 md:mt-20">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connecting Line */}
            <div className="absolute top-[55px] left-0 right-0 h-[2px] bg-gray-300 z-0" />

            {/* Steps Grid */}
            <div className="relative z-10 grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <AnimatedContainer
                  key={index}
                  direction="up"
                  delay={0.1 * index}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Circle */}
                    <div
                      className={`${step.color} w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg ${marcellus.className} mb-4 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer`}
                    >
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-base font-semibold text-gray-900 mb-3 min-h-[48px] ${jost.className}`}
                    >
                      {step.title}
                    </h3>

                    {/* Details */}
                    <ul
                      className={`text-sm text-gray-600 space-y-1.5 ${jost.className}`}
                    >
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <span className="mr-2 mt-0.5 text-gray-600 text-base font-bold">
                            •
                          </span>
                          <span className="text-left">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet View */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <AnimatedContainer key={index} direction="up" delay={0.1 * index}>
                <div className="flex items-start gap-4">
                  {/* Circle */}
                  <div
                    className={`${step.color} w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg flex-shrink-0 ${marcellus.className} transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer`}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3
                      className={`text-base md:text-lg font-semibold text-gray-900 mb-2 ${jost.className}`}
                    >
                      {step.title}
                    </h3>
                    <ul
                      className={`text-xs md:text-sm text-gray-600 space-y-1.5 ${jost.className}`}
                    >
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <span className="mr-2 mt-0.5 text-gray-500 text-sm">
                            •
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
