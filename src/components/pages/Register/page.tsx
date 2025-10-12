"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Home } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpass, setConfirmpass] = useState<string>("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email, "Password:", password);
    // Add your registration logic here
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
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2 mt-5">
                  <div className="relative w-[300px] h-[100px]">
                    <Image
                      src="/dalila_img/Dalila_Logo.png"
                      alt="Dalila Diamonds"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>

              <h2
                className={`text-6xl mb-7 font-light text-[#d4a018] ${playFair.className}`}
              >
                <div className="text-center">Join the Dalila</div>
                <div className="text-center">Family</div>
              </h2>

              <p className="text-md mt-2 mb-8 font-normal opacity-90">
                <div className="text-center">
                  Experience timeless diamond jewelry crafted with passion,
                </div>
                <div className="text-center">
                  precision, and trust. Begin your journey with Dalila today.
                </div>
              </p>
            </div>

            {/* Contact Info */}
            <div className="mt-2 mb-20 space-y-2 text-sm opacity-90">
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
              className="absolute top-4 md:top-6 right-4 md:right-6 bg-[#101638]/80 rounded-full p-2 shadow-md z-10 hover:bg-[#d4a018] transition-all duration-200 hover:scale-110"
              title="Home"
              onClick={() => router.push("/")}
              type="button"
            >
              <Home className="w-5 h-5 text-white" />
            </button>

            {/* Registration Form */}
            <form
              onSubmit={handleRegister}
              className="relative z-10 w-full max-w-[550px] px-8"
            >
              <h2
                className={`text-2xl font-semibold text-white mb-6 text-center ${playFair.className}`}
              >
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

              <div className="flex items-center mb-6 gap-2">
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
                className="w-full bg-[#d4a018] hover:bg-[#c4a639] text-white font-semibold py-3 rounded transition-colors shadow-lg"
              >
                REGISTER
              </button>

              <div className="mt-6 text-center text-xs text-[#474745]">
                Already have an account?{" "}
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
