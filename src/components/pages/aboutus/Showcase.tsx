'use client';
import Image from 'next/image';
import { Playfair_Display} from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});


export default function Aboutshowcase() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      
        {/* Sell Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="relative h-[350px] md:h-[390px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/Heritage.png"
                alt="Professional diamond dealer"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div>
            <div className="max-w-xl">
              <h2 className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${playFair.className} `}>
                Our Heritage
              </h2>
              <p className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${playFair.className}`}>
                The origins of our company date back more than 50 years, when three visionary brothers left their village in Gujarat at the age of 18, determined to build a future in the diamond industry. Through perseverance, hard work, and adherence to ethical business practices, they established a strong foundation in Surat and Mumbai.
As the second generation joined the business, the vision expanded to international markets, creating enduring partnerships worldwide. This forward-looking approach, combined with our deeply rooted values, has positioned us as a trusted name in the global diamond trade.
              </p>
              <button className={`bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 rounded-sm transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${playFair.className}`}>
                EXPLORE MORE
              </button>
            </div>
          </div>
        </div>
        
        {/* Language of Diamonds Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="max-w-xl">
              <h2 className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${playFair.className}`}>
                Diamond Knowledge Guide 
              </h2>
              <p className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${playFair.className}`}>
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
          </div>
          
          <div>
           <div className="relative h-[350px] md:h-[390px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/diamondwork.png"
                alt="Diamond examination with tweezers"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        {/* Sell Diamonds Section */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-25 mt-25">
                  <div>
                    <div className="relative h-[350px] md:h-[390px] w-full max-w-[480px] mx-auto rounded-sm overflow-hidden shadow-2xl">
                      <Image
                        src="/images/sell_page.jpg"
                        alt="Professional diamond dealer"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="max-w-xl">
                      <h2 className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${playFair.className} `}>
                        Sell Your Diamonds<br />
                        Safely and<br />
                        Seamlessly at Dalila
                      </h2>
                      <p className={`text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base font-normal ${playFair.className}`}>
                        Selling your diamond or fine jewelry should be a seamless, secure, and rewarding 
                        experience. At Dalila, we offer a transparent and hassle-free process, trusted by 
                        customers. Whether you&apos;re parting with an engagement ring, heirloom or a loose 
                        diamond, we value every piece. Here&apos;s how the process works
                      </p>
                      <button  className={`bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 rounded-sm transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${playFair.className}`}>
                        Sell Now
                      </button>
                    </div>
                  </div>
                </div>
      </div>
    </div>
  );
}