"use client";

import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SellDiamondsProcess() {
  const steps = [
    {
      number: "1",
      title: "Complete the Form",
      heading: "Start the Process with a Simple Form.",
      description:
        "Fill out our straightforward online form and provide any details you have about your diamonds or jewelry. It's quick, easy, and the first step toward getting the best value.",
      image: "/images/step_1.png",
      imagePosition: "left",
    },
    {
      number: "2",
      title: "In-Person Evaluation or Safe Pickup",
      heading: "Meet Us in Person or we'll Pickup",
      description:
        "You can schedule a face-to-face evaluation at one of our trusted locations. If you prefer not to travel, we offer a safe, insured courier service to collect your diamonds from anywhere in Europe. Your valuable pieces are always in safe hands.",
      image: "/images/step_2.png",
      imagePosition: "right",
    },
    {
      number: "3",
      title: "Professional Diamond Valuation",
      heading: "Assessments by Certified Professionals.",
      description:
        "Our GIA-certified gemologists and gold specialists evaluate your diamonds and fine jewelry based on the 4Cs, current market conditions, and accurate pricing.",
      image: "/images/step_3.png",
      imagePosition: "left",
    },
    {
      number: "4",
      title: "Receive the Best Offer",
      heading: "Fair & Transparent Offers.",
      description:
        "Once we ve evaluated your diamonds, we present you with the most competitive offers, reflecting the true value based on the global diamond and gold market.",
      image: "/images/step_4.png",
      imagePosition: "right",
    },
    {
      number: "5",
      title: "Fast and Secure Payment",
      heading: "Receive Your Payment in 24 Hours.",
      description:
        "Once you accept our offer, we  process your payment within 24 hours via secure bank transfer.",
      image: "/images/step_5.png",
      imagePosition: "left",
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <div key={index} className="relative w-full">
              {/* Image Section */}
              <div
                className={`relative w-full lg:w-1/2 ${
                  step.imagePosition === "right" ? "ml-auto" : "mr-auto"
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-96 md:h-[500px] lg:h-[600px] object-cover"
                />
              </div>

              {/* Content Section - Overlapping */}
              <div
                className={`relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 ${
                  step.imagePosition === "right" ? "lg:left-0" : "lg:right-0"
                } w-full lg:w-3/5 mt-8 lg:mt-0`}
              >
                <div className="bg-white border border-gray-200 p-10 md:p-12 lg:p-16 shadow-lg mx-4 lg:mx-0">
                  <div className="mb-6">
                    <p
                      className={`text-sm md:text-base text-gray-600 mb-3 ${playFair.className}`}
                    >
                      {step.number}. {step.title}
                    </p>
                    <h2
                      className={`text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 font-normal leading-tight ${playFair.className}`}
                    >
                      {step.heading}
                    </h2>
                  </div>
                  <p
                    className={`text-base md:text-lg text-gray-600 leading-relaxed ${playFair.className}`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
