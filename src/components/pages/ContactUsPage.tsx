'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import {Playfair_Display} from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
  };

  return (
    <div className="relative min-h-screen bg-slate-900">
      {/* Hero Section with Background */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner-dalila-contact.png"
            alt="Contact Us Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center py-20">
          <div className="opacity-0 translate-y-5 animate-[fadeIn_0.6s_ease-out_forwards]">
           <h1 className={`text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-8 mt-23 ${playFair.className}`}>
              CONTACT US
            </h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6" />
          </div>

          <div className="opacity-0 translate-y-5 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Have a question or need assistance with your booking? Our dedicated team is available
              around the clock to provide you with prompt and friendly service.
            </p>
          </div>

          <div className="opacity-0 translate-y-5 animate-[fadeIn_0.6s_ease-out_0.3s_forwards] mt-8">
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Home
              </a>
              <span>›</span>
              <span className="text-amber-400">Contact Us</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative bg-white py-20">
        <div className="container mx-auto px-6 flex justify-center">
          {/* Contact Form */}
          <div className="bg-white rounded-none p-8 md:p-12 lg:p-16 opacity-0 translate-x-12 animate-[slideInRight_0.6s_ease-out_forwards] max-w-2xl w-full shadow-lg">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-12 text-center">
              Write a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Left Column - Name, Email, Phone */}
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-amber-500 transition-all text-slate-700 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-amber-500 transition-all text-slate-700 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-amber-500 transition-all text-slate-700 placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Right Column - Message */}
                <div className="flex flex-col">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full h-full min-h-[200px] px-5 py-4 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-amber-500 transition-all resize-none text-slate-700 placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Send Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="px-12 py-4 bg-amber-500 text-white font-medium hover:bg-amber-600 active:scale-98 transition-all duration-300 rounded-none uppercase tracking-wider text-sm"
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
