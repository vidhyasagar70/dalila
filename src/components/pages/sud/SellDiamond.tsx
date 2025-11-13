"use client";

import Image from "next/image";
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

export default function SellDiamondsProcess() {
  const steps = [
    {
      number: "1",
      title: "Complete the Form",
      heading: "Start the Process with a Simple Form.",
      description:
        "Fill out our straightforward online form and provide any details you have about your diamonds or jewelry. It's quick, easy, and the first step toward getting the best value.",
      image: "/sell/step_1.png",
      imagePosition: "left",
    },
    {
      number: "2",
      title: "In-Person Evaluation or Safe Pickup",
      heading: "Meet Us in Person or we'll Pickup",
      description:
        "You can schedule a face-to-face evaluation at one of our trusted locations. If you prefer not to travel, we offer a safe, insured courier service to collect your diamonds from anywhere in Europe. Your valuable pieces are always in safe hands.",
      image: "/sell/step_2.png",
      imagePosition: "right",
    },
    {
      number: "3",
      title: "Professional Diamond Valuation",
      heading: "Assessments by Certified Professionals.",
      description:
        "Our GIA-certified gemologists and gold specialists evaluate your diamonds and fine jewelry based on the 4Cs, current market conditions, and accurate pricing.",
      image: "/sell/step_3.png",
      imagePosition: "left",
    },
    {
      number: "4",
      title: "Receive the Best Offer",
      heading: "Fair & Transparent Offers.",
      description:
        "Once we ve evaluated your diamonds, we present you with the most competitive offers, reflecting the true value based on the global diamond and gold market.",
      image: "/sell/step_4.png",
      imagePosition: "right",
    },
    {
      number: "5",
      title: "Fast and Secure Payment",
      heading: "Receive Your Payment in 24 Hours.",
      description:
        "Once you accept our offer, we process your payment within 24 hours via secure bank transfer.",
      image: "/sell/recieve_your_payment.png",
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
              <div
                className={`flex flex-col lg:flex-row gap-8 items-stretch ${
                  step.imagePosition === "right" ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Section */}
                <AnimatedContainer
                  direction={step.imagePosition === "left" ? "left" : "right"}
                  delay={0.2}
                >
                  <div className="w-full lg:flex-1">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={400}
                      height={400}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover"
                      priority={index === 0}
                    />
                  </div>
                </AnimatedContainer>

                {/* Content Section */}
                <AnimatedContainer
                  direction={step.imagePosition === "left" ? "right" : "left"}
                  delay={0.4}
                >
                  <div className="w-full lg:flex-1 flex items-center">
                    <div className="w-full">
                      <div className="mb-6">
                        <p
                          className={`text-sm md:text-base text-gray-600 mb-3 ${marcellus.className}`}
                        >
                          {step.number}. {step.title}
                        </p>
                        <h2
                          className={`text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 font-normal leading-tight ${marcellus.className}`}
                        >
                          {step.heading}
                        </h2>
                      </div>
                      <p
                        className={`text-base md:text-lg text-gray-600 leading-relaxed ${jost.className}`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
