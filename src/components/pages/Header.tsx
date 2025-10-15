"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

// Mock auth service - replace with your actual authService
const authService = {
  isAuthenticated: () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("dalilaAuthToken");
    }
    return false;
  },
  getUser: () => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("dalilaUser");
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dalilaAuthToken");
      localStorage.removeItem("dalilaUser");
      document.cookie = "dalilaAuthToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      window.location.href = "/login";
    }
  }
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setUser(authService.getUser());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      authService.logout();
    }
  };

  // Define navigation items based on authentication and user role
  const getNavItems = () => {
    if (!isAuthenticated) {
      // Guest users - original menu
      return [
        { href: "/aboutUs", label: "About us" },
        { href: "/weBuy", label: "We Buy" },
        { href: "/diamondKnowledge", label: "Diamond Knowledge" },
        { href: "/contact", label: "Contact Us" },
      ];
    }

    if (user?.role === "ADMIN") {
      // Admin users - admin specific menu
      return [
        { href: "/aboutUs", label: "About us" },
        { href: "/admin", label: "Admin Panel" },
        { href: "/admin/members", label: "Members" },
        { href: "/admin/quotations", label: "Offer Enquiry" },
        { href: "/contact", label: "Contact Us" },
      ];
    }

    // Regular authenticated users - standard menu
    return [
      { href: "/aboutUs", label: "About us" },
      { href: "/weBuy", label: "We Buy" },
      { href: "/diamondKnowledge", label: "Diamond Knowledge" },
      { href: "/contact", label: "Contact Us" },
    ];
  };

  const navItems = getNavItems();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isAuthenticated
          ? "bg-[#050c3a] shadow-lg py-2 md:py-2.5"
          : isScrolled
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors text-sm xl:text-base whitespace-nowrap ${
                  pathname === item.href
                    ? "text-[#c89e3a] font-semibold"
                    : "text-white hover:text-[#c89e3a]"
                }`}
              >
                {item.label}
              </Link>
            ))}
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
            {isAuthenticated ? (
              <>
                {/* Inventory Button for authenticated users */}
                <button
                  onClick={() => router.push("/inventory")}
                  className="py-1 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
                >
                  INVENTORY
                </button>

                {/* Profile Button */}
                <button
                  onClick={() => router.push("/profile")}
                  className="py-1 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden xl:inline">{user?.username || "Profile"}</span>
                  <span className="xl:hidden">Profile</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="py-1 px-3 xl:px-5 text-xs xl:text-sm text-white bg-[#c89e3a] border border-[#c89e3a] hover:bg-[#b08e33] transition-colors whitespace-nowrap flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden xl:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Guest user buttons - original layout */}
                <button
                  onClick={() => router.push("/inventory")}
                  className="py-1 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
                >
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
              </>
            )}
          </div>

          {/* Tablet Only - Compact Buttons */}
          {!isAuthenticated && (
            <>
              <div className="hidden md:flex lg:hidden items-center gap-2">
                <button
                  onClick={() => router.push("/inventory")}
                  className="py-1 px-3 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
                >
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
            </>
          )}

          {/* Mobile Profile Button (when authenticated) */}
          {isAuthenticated && (
            <div className="flex lg:hidden">
              <button
                onClick={() => router.push("/profile")}
                className="py-1 px-3 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] transition-colors flex items-center gap-1"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-[#050c3a] z-40 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Tagline */}
            <div className="flex justify-center mb-4 pb-4 border-b border-white/30">
              <p className="text-xs tracking-wide text-gray-300">
                Where Trust Shines, And Quality Sparkles
              </p>
            </div>

            {/* User Info (if authenticated) */}
            {isAuthenticated && user && (
              <div className="mb-6 pb-4 border-b border-white/30">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-[#c89e3a] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">{user.username || "User"}</p>
                    <p className="text-xs text-gray-400 uppercase">{user.role || "Member"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-4 mb-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors text-lg py-2 border-b border-white/10 ${
                    pathname === item.href
                      ? "text-[#c89e3a] font-semibold"
                      : "text-white hover:text-[#c89e3a]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/inventory");
                    }}
                    className="w-full py-3 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
                  >
                    INVENTORY
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/profile");
                    }}
                    className="w-full py-3 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    PROFILE
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-3 text-sm text-white bg-[#c89e3a] border border-[#c89e3a] hover:bg-[#b08e33] transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/inventory");
                    }}
                    className="w-full py-3 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
                  >
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}