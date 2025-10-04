'use client';
import MotionWrapper from '../../ui/MotionWrapper';
import Image from 'next/image';

export default function HomeContent() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
      
        {/* Sell Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <MotionWrapper variant="slideLeft" transition={{ duration: 0.8 }}>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/images/sell_page.jpg"
                alt="Diamond selling service"
                fill
                className="object-cover"
              />
            </div>
          </MotionWrapper>
          <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Sell Your Diamonds Safely and Seamlessly at Dalila
              </h2>
              <p className="text-black leading-relaxed mb-6">
                Selling your diamond or fine jewelry should be a seamless, secure, and rewarding 
                experience. At Dalila, we offer a transparent and hassle-free process, trusted by 
                customers. Whether you&apos;re parting with an engagement ring, heirloom or a loose 
                diamond, we value every piece. Here&apos;s how the process works.
              </p>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded transition-colors">
                SELL NOW
              </button>
            </div>
          </MotionWrapper>
        </div>
        
        {/* Language of Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <MotionWrapper variant="slideLeft" transition={{ duration: 0.8 }}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Language of Diamonds
              </h2>
              <p className="text-black leading-relaxed mb-4">
                Diamonds are more than just gemstones — they are timeless symbols of love, 
                craftsmanship, and nature&apos;s brilliance. Formed deep within the Earth over billions of 
                years, every natural diamond carries a story of purity and perfection. Whether 
                you&apos;re buying your first diamond or expanding your collection, understanding the 
                key aspects of a diamond helps you make a truly informed choice.
              </p>
              <p className="text-black leading-relaxed">
                This guide is designed to help you explore every detail — from how diamonds are formed to 
                what makes each one unique.
              </p>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded transition-colors mt-6">
                EXPLORE MORE
              </button>
            </div>
          </MotionWrapper>
          <MotionWrapper variant="slideRight" transition={{ duration: 0.8 }}>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
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