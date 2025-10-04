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
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-dalila-contact.png"
            alt="Sell Diamonds Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center py-20">
          <div className="opacity-0 translate-y-5 animate-[fadeIn_0.6s_ease-out_forwards]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
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

      {/* Contact Form Section */}
      <section className="relative z-10 py-20 bg-slate-800">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Get a Quote for Your Diamonds
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-slate-700 rounded-2xl shadow-lg p-8 space-y-6"
          >
            <div>
              <label className="block mb-2 text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 text-slate-900 font-semibold py-3 rounded-lg hover:bg-amber-500 transition"
            >
              Send Message
            </button>
          </form>
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
