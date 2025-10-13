"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050c3a] shadow-lg py-2 md:py-2.5"
          : "bg-transparent py-2.5 md:py-3"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top Tagline - Hidden on mobile */}
        <div className="hidden sm:flex justify-center mb-0.5 md:mb-1">
          <p className="text-xs md:text-sm tracking-wide text-gray-300">
            Where Trust Shines, And Quality Sparkles
          </p>
        </div>

        {/* Divider Line - Hidden on mobile */}
        <div className="hidden sm:block w-full h-[1px] bg-white/30 mb-0"></div>

        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:text-[#c89e3a] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left Navigation - Desktop/Tablet */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1">
            <Link
              href="/aboutUs"
              className="text-white hover:text-[#c89e3a] transition-colors text-sm xl:text-base whitespace-nowrap"
            >
              About us
            </Link>
            <Link
              href="/weBuy"
              className="text-white hover:text-[#c89e3a] transition-colors text-sm xl:text-base whitespace-nowrap"
            >
              We Buy
            </Link>
            <Link
              href="/diamondKnowledge"
              className="text-white hover:text-[#c89e3a] transition-colors text-sm xl:text-base whitespace-nowrap"
            >
              Diamond Knowledge
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-[#c89e3a] transition-colors text-sm xl:text-base whitespace-nowrap"
            >
              Contact Us
            </Link>
          </nav>

          {/* Center Logo */}
          <div className="flex-shrink-0 relative h-20 w-[200px] sm:h-24 sm:w-[240px] md:h-26 md:w-[260px]">
            <Link href="/" className="block w-full h-full">
              <Image
                src="/dalila_img/Dalila_Logo.png"
                alt="Dalila Diamonds"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>
          </div>

          {/* Right Auth Buttons - Desktop/Tablet */}
          <div className="hidden lg:flex items-center justify-end gap-2 xl:gap-3 flex-1">
            <button className="py-1 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap">
              INVENTORY
            </button>
            <button
              onClick={() => router.push("/login")}
              className="py-1 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
            >
              LOGIN
            </button>
            <button
              onClick={() => router.push("/register")}
              className="py-1 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
            >
              REGISTER
            </button>
          </div>

          {/* Tablet Only - Compact Buttons */}
          <div className="hidden md:flex lg:hidden items-center gap-2">
            <button className="py-1 px-3 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors">
              INV
            </button>
            <button
              onClick={() => router.push("/login")}
              className="py-1 px-3 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
            >
              LOGIN
            </button>
          </div>

          {/* Mobile - Login Button Only */}
          <div className="flex md:hidden">
            <button
              onClick={() => router.push("/login")}
              className="py-1 px-4 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-[#050c3a] z-40">
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Tagline */}
            <div className="flex justify-center mb-4 pb-4 border-b border-white/30">
              <p className="text-xs tracking-wide text-gray-300">
                Where Trust Shines, And Quality Sparkles
              </p>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-4 mb-8">
              <Link
                href="/aboutUs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
              >
                About us
              </Link>
              <Link
                href="/weBuy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
              >
                We Buy
              </Link>
              <Link
                href="/diamondKnowledge"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
              >
                Diamond Knowledge
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
              >
                Contact Us
              </Link>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors">
                INVENTORY
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/login");
                }}
                className="w-full py-3 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
              >
                LOGIN
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/register");
                }}
                className="w-full py-3 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
              >
                REGISTER
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}