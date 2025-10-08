'use client';
import { Mail, Phone } from 'lucide-react';
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ContactHeroSection() {
  const goldColor = '#B58900';
  
  return (
    <div className={`bg-white ${playFair.className}`}>
      <div className="container mx-auto max-w-7xl px-4 pt-16 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: goldColor }}>
              GET IN TOUCH
            </p>
            
            <h1 className="text-5xl lg:text-6xl font-serif mb-12 text-gray-900">
              Contact Us
            </h1>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Email Support Card */}
              <div className="space-y-4">
                <div 
                  className="w-20 h-20 flex items-center justify-center"
                  style={{ backgroundColor: goldColor }}
                >
                  <Mail className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-serif text-gray-900">
                  Email Support
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  Reach out to us via email for any inquiries or support. Our team responds within 24 hours.
                </p>
              </div>

              {/* Call Us Card */}
              <div className="space-y-4">
                <div 
                  className="w-20 h-20 flex items-center justify-center"
                  style={{ backgroundColor: goldColor }}
                >
                  <Phone className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-serif text-gray-900">
                  Call Us
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  Contact our friendly team by phone for immediate assistance or to book an appointment.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Customer Service Representative Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden h-96">
                <img
                  src="/dalila_img/contact-1.webp"
                  alt="Customer service representative"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Diamond Image */}
              <div className="relative bg-black rounded-lg overflow-hidden h-96">
                <img
                  src="/dalila_img/contact-3.png"
                  alt="Luxury diamond"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}