"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Home } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpass, setConfirmpass] = useState<string>("");


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/New-Videos/auth-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dimming overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="flex w-[1100px] h-[600px] rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Left Welcome Panel */}
          <div
            className="flex flex-col justify-between text-white px-10 py-10 w-[50%] min-w-[350px]"
            style={{
              background:
                "linear-gradient(to right, rgba(4, 8, 37, 0.9) 0%, rgba(4, 8, 37, 0.9) 100%)",
            }}
          >
            <div>
              {/* Logo */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="relative w-[300px] h-[100px]">
                  <img
                    src="/dalila_img/Dalila_Logo.png"
                    alt="Dalila Diamonds"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <h1 className={`text-5xl mb-10 font-light text-[#d4a018] ${playFair.className
              }`}>
                Join the Dalila Family
              </h1>
              <p className={`text-md mt-2 mb-8 font-normal opacity-90 ${playFair.className
              }`}>
                Experience timeless diamond jewelry crafted with passion, precision, and trust. Begin your journey with Dalila today.
              </p>
            </div>

            {/* Contact Info */}
           <div className={`mt-2 mb-15 space-y-2 text-sm opacity-90`}>
              <div className="flex items-center justify-center gap-2">
                <Phone className="text-[#FFD166] w-4 h-4" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="text-[#FFD166] w-4 h-4" />
                <span>contact@dalila.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="text-[#FFD166] w-4 h-4" />
                <span>123 Diamond Street, XYZ City</span>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative flex-1 flex flex-col justify-center items-center bg-black/20">
            {/* Home Button */}
            <button
              className="absolute top-6 right-6 bg-[#101638]/80 rounded-full p-2 shadow-md z-10 hover:bg-[#101638] transition"
              title="Home"
              onClick={() => console.log("Home clicked")}
            >
              <Home className="w-5 h-5" />
            </button>

            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className="relative z-10 w-full max-w-[550px] px-8"
            >
              <h2 className={`text-2xl font-semibold text-white mb-6 text-center ${playFair.className
              }`}>
                Create an Account
              </h2>
              <div className="mb-5">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Full Name"
                  className="w-full px-5 py-3 rounded bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                  className="w-full px-5 py-3 rounded bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full px-5 py-3 rounded bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  value={confirmpass}
                  onChange={(e) => setConfirmpass(e.target.value)}
                  required
                  placeholder="Confirm Password"
                  className="w-full px-5 py-3 rounded bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />
              </div>

              <div className="flex  items-center mb-6">
                <label className="flex items-center text-xs text-white gap-1 cursor-pointer">
                  <input type="checkbox" className="accent-[#FFD166]" />
                  I agree to the 
                </label>
                <a
                  href="#"
                  className="text-xs p-1 text-[#FFD166] hover:underline transition"
                >
                  Terms & Conditions
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d4a018] hover:bg-yellow-600 text-white font-semibold py-3 rounded transition-colors shadow-lg"
              >
                REGISTER
              </button>

              <div className="mt-6 text-center text-xs text-white">
                Already  have an account?{" "}
                <a
                  href="/login"
                  className="text-[#FFD166] font-semibold hover:underline"
                >
                  Login Here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
