'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

export default function WeBuy() {
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 mt-23">
              Sell Your Diamonds
            </h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6" />
          </div>

          <div className="opacity-0 translate-y-5 animate-[fadeIn_0.6s_ease-out_0.3s_forwards] mt-8">
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Home
              </a>
              <span>›</span>
              <span className="text-amber-400">Sell your Diamonds</span>
            </div>
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
      `}</style>
    </div>
  );
}
