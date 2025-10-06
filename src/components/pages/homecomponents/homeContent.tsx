'use client';
import MotionWrapper from '../../ui/MotionWrapper';
import Image from 'next/image';

export default function HomeContent() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      
        {/* Sell Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <MotionWrapper variant="slideLeft" transition={{ duration: 0.8 }}>
            <div className="relative h-[450px] md:h-[520px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/sell_page.jpg"
                alt="Professional diamond dealer"
                fill
                className="object-cover"
              />
            </div>
          </MotionWrapper>
          
          <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
            <div className="max-w-xl">
              <h2 className="text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-serif font-light mb-7 text-gray-900 leading-[1.15] tracking-tight">
                Sell Your Diamonds<br />
                Safely and<br />
                Seamlessly at Dalila
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-[15px] md:text-base font-light">
                Selling your diamond or fine jewelry should be a seamless, secure, and rewarding 
                experience. At Dalila, we offer a transparent and hassle-free process, trusted by 
                customers. Whether you&apos;re parting with an engagement ring, heirloom or a loose 
                diamond, we value every piece. Here&apos;s how the process works
              </p>
              <button className="bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 rounded-sm transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg">
                Sell Now
              </button>
            </div>
          </MotionWrapper>
        </div>
        
        {/* Language of Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <MotionWrapper variant="slideLeft" transition={{ duration: 0.8 }}>
            <div className="max-w-xl">
              <h2 className="text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-serif font-light mb-7 text-gray-900 leading-[1.15] tracking-tight">
                The Language of<br />
                Diamonds
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4 text-[15px] md:text-base font-light">
                Diamonds are more than just gemstones — they are timeless symbols of love, 
                craftsmanship, and nature&apos;s brilliance. Formed deep within the Earth over billions of 
                years, every natural diamond carries a story of purity and perfection. Whether 
                you&apos;re buying your first diamond or expanding your collection, understanding the 
                key aspects of a diamond helps you make a truly informed choice. This guide is 
                designed to help you explore every detail — from how diamonds are formed to 
                what makes each one unique.
              </p>
              <button className="bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 rounded-sm transition-all duration-300 mt-6 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg">
                Explore More
              </button>
            </div>
          </MotionWrapper>
          
          <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
            <div className="relative h-[450px] md:h-[520px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/diamondwork.png"
                alt="Diamond examination with tweezers"
                fill
                className="object-cover"
              />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}