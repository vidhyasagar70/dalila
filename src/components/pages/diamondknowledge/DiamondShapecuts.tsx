'use client';
import { Playfair_Display} from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DiamondShapeCuts() {
  const diamondCuts = [
    { name: 'Round Brilliant', image: '/images/cut-shaps/round-diamond.png' },
    { name: 'Princess Cut', image: '/images/cut-shaps/princess.png' },
    { name: 'Cushion Cut', image: '/images/cut-shaps/cushion-diamond.png' },
    { name: 'Radiant Cut', image: '/images/cut-shaps/radian-diamond.png' },
    { name: 'Asscher Cut', image: '/images/cut-shaps/cushion-cut-diamond.png' },
    { name: 'Heart Cut', image: '/images/cut-shaps/heart.png' },
    { name: 'Pear Cut', image: '/images/cut-shaps/pear-diamond.png' },
    { name: 'Marquise Cut', image: '/images/cut-shaps/marquise-cut-diamond.png' },
    { name: 'Oval Cut', image: '/images/cut-shaps/oval-diamond.png' },
    { name: 'Emerald Cut', image: '/images/cut-shaps/emerald.png' },
  ];

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 font-normal tracking-tight ${playFair.className}`}>
            Diamonds Cuts
          </h1>
        </div>
      
        {/* Diamond Cuts Grid */}
      {/* Diamond Cuts Grid */}
        <div className="max-w-6xl mx-auto">
          {/* First 8 items in 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {diamondCuts.slice(0, 8).map((cut, index) => (
              <div
                key={index}
                className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center min-h-[180px]"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img
                    src={cut.image}
                    alt={cut.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className={`text-xl font-normal text-gray-900 text-center ${playFair.className}`}>
                  {cut.name}
                </h3>
              </div>
            ))}
          </div>
          
          {/* Last 2 items centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {diamondCuts.slice(8).map((cut, index) => (
              <div
                key={index + 8}
                className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center min-h-[180px]"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img
                    src={cut.image}
                    alt={cut.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className={`text-xl font-normal text-gray-900 text-center ${playFair.className}`}>
                  {cut.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}