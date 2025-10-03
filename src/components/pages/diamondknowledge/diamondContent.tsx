'use client';
import MotionWrapper from '../../ui/MotionWrapper';

export default function DiamondKnowledge() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Introduction Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <MotionWrapper variant="fadeIn" transition={{ duration: 0.8 }}>
            <div className="text-center mb-4">
              <p className="text-amber-400 text-sm uppercase tracking-wider mb-2">
                Introduction
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Diamond Knowledge Guide
              </h1>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fadeIn" transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-black text-center max-w-3xl mx-auto leading-relaxed">
              Diamonds are much that you purchase — they are timeless symbols of love, 
              craftsmanship, and natural brilliance. To make sense that the hard-won billions of 
              years in your investment is right one, it's essential to understand the key factors 
              that chip away from purchasing your collection, understanding the key aspects of a 
              diamond helps you make a fully informed choice.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="fadeIn" transition={{ duration: 0.8, delay: 0.4 }}>
            <p className="text-black text-center max-w-3xl mx-auto leading-relaxed mt-4">
              This guide will walk you through the essential elements that determine any diamond are 
              formed by what values teach true essence.
            </p>
          </MotionWrapper>
        </div>

        {/* Diamond Journey Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <MotionWrapper variant="slideLeft" transition={{ duration: 0.8 }}>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/images/diamondwork.png"
                alt="Diamond in hands"
                className="w-full h-full object-cover"
              />
            </div>
          </MotionWrapper>

          <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-wider mb-3">
                DIAMONDS JOURNEY
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Journey of a Diamond
              </h2>
              <p className="text-black leading-relaxed">
                Natural diamonds are created under extreme pressure and temperature conditions, 
                deep within the Earth's mantle, over billions of years. They are brought to the 
                surface through volcanic rock, eventually reaching the surface where they are mined and 
                transformed into beautiful jewels.
              </p>
              <p className="text-black leading-relaxed mt-4">
                Every diamond carries a unique story — a window into our planet's ancient past, 
                formed under unimaginable heat and pressure growing to create. in authenticity and value.
              </p>
            </div>
          </MotionWrapper>
        </div>

        {/* The 4Cs Section */}
        <div className="mb-20">
          <MotionWrapper variant="fadeIn" transition={{ duration: 0.8 }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The 4Cs of Diamonds
              </h2>
              <p className="text-black max-w-3xl mx-auto">
                When it comes to evaluating a diamond's quality and beauty, professionals rely on the 4Cs — Cut, Color, Clarity, 
                and Carat Weight. Understanding these characteristics is key, you choose a diamond that matches your 
                preferences and budget.
              </p>
            </div>
          </MotionWrapper>

          {/* Image and 4Cs Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <MotionWrapper variant="slideLeft" transition={{ duration: 0.8 }}>
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <img
                  src="/images/diamondjourney.png"
                  alt="Diamonds collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </MotionWrapper>

            <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
              <div className="space-y-8">
                {/* Cut */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Cut: The Sparkle Factor</h3>
                    <p className="text-black text-sm leading-relaxed">
                      A diamond cut determines how well it reflects light. A well-cut diamond, 
                      regardless of its shape, will have more brilliance (white light), fire 
                      (flashes of color). It is designed how the facets of the diamond interact 
                      with light, a poor cut can make even the most expensive diamond look dull.
                    </p>
                  </div>
                </div>

                {/* Color */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Color: The Shade of Purity</h3>
                    <p className="text-black text-sm leading-relaxed">
                      Diamonds are graded on a color scale from D (colorless) to Z (light yellow or 
                      brown). The closer a diamond is to colorless, the more valuable it typically is. 
                      The less color, a diamond has, the more light it can reflect, resulting in 
                      unmatched sparkle and brilliance.
                    </p>
                  </div>
                </div>

                {/* Clarity */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Clarity: Nature's Signature</h3>
                    <p className="text-black text-sm leading-relaxed">
                      Every diamond contains tiny imperfections—internal flaws called inclusions and 
                      surface irregularities known as blemishes. These are natural byproducts of the 
                      diamond's formation process. Diamonds are graded for clarity on a scale from 
                      Flawless (FL) to Included (I1, I2, I3), with most diamonds falling somewhere 
                      in this spectrum.
                    </p>
                  </div>
                </div>

                {/* Carat */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Carat Weight: The Measure of Size</h3>
                    <p className="text-black text-sm leading-relaxed">
                      Carat weight measures a diamond's size, but it's not just about how large a diamond 
                      looks—it's also about its overall proportions. A 1-carat diamond, when cut well, 
                      will. Whether dimensions of 6 mm across, however, the weight can vary based on 
                      the depth and cut. A two-carat diamond is not just twice the size of a 1-carat; 
                      it can look much bigger when it's well-cut.
                    </p>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>

        {/* Third Section - Examining Diamonds */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <MotionWrapper variant="slideLeft" transition={{ duration: 0.8 }}>
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-wider mb-3">
                PROFESSIONAL EVALUATION
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Expert Diamond Examination
              </h2>
              <p className="text-black leading-relaxed">
                Our certified gemologists use advanced tools and techniques to evaluate every aspect 
                of your diamond. From precise measurements to detailed clarity analysis, we ensure 
                accurate assessment of your diamond's true value.
              </p>
              <p className="text-black leading-relaxed mt-4">
                Understanding the intricacies of diamond grading requires years of expertise and 
                specialized equipment. We provide comprehensive evaluations that give you complete 
                transparency about your diamond's characteristics.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/images/diamond.png"
                alt="Diamond examination"
                className="w-full h-full object-cover"
              />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}
