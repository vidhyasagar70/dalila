"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { userApi } from "@/lib/api";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isTestingPage = pathname === "/Testingpages";
  const adminpanelPage = pathname === "/adminpanel";
  const inventoryPage = pathname === "/inventory";
  const offerenquiryPage = pathname === "/offer-enquiry";
  const memberPage = pathname === "/member";
  const dashboardPage = pathname === "/dashboard";
  
  // Determine if user is admin
  const isAdmin = isLoggedIn && userRole === "ADMIN";

  // Debug logs
  console.log('Header Debug:', {
    isLoggedIn,
    userRole,
    isAdmin,
    pathname,
  });

  // Check user authentication and role on mount and when pathname changes
  useEffect(() => {
    const checkUserAuth = () => {
      if (typeof window !== 'undefined') {
        // First, try localStorage
        let token = localStorage.getItem('authToken');
        let userStr = localStorage.getItem('user');
        
        console.log('=== AUTH CHECK ===');
        console.log('LocalStorage Token:', token);
        console.log('LocalStorage User:', userStr);
        
        // If not in localStorage, check cookies
        if (!userStr) {
          console.log('Checking cookies...');
          const cookies = document.cookie.split(';');
          console.log('All cookies:', cookies);
          
          const tokenCookie = cookies.find(c => c.trim().startsWith('authToken='));
          if (tokenCookie) {
            token = tokenCookie.split('=')[1].trim();
            console.log('Found token in cookie:', token);
          }
          
          const userCookie = cookies.find(c => c.trim().startsWith('user='));
          if (userCookie) {
            try {
              userStr = decodeURIComponent(userCookie.split('=')[1].trim());
              console.log('Found user in cookie:', userStr);
            } catch (e) {
              console.error('Error decoding user cookie:', e);
            }
          }
        }
        
        // We only need user data to authenticate (token is optional)
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            console.log('✅ Parsed user successfully:', user);
            console.log('✅ User role:', user.role);
            setUserRole(user.role || null);
            setIsLoggedIn(true);
          } catch (error) {
            console.error('❌ Error parsing user data:', error);
            setUserRole(null);
            setIsLoggedIn(false);
          }
        } else {
          console.log('❌ No user data found');
          setUserRole(null);
          setIsLoggedIn(false);
        }
        console.log('=== END AUTH CHECK ===');
      }
    };

    checkUserAuth();
    
    // Listen for login events
    const handleLoginEvent = () => {
      console.log('Login event received, rechecking auth...');
      setTimeout(checkUserAuth, 100); // Small delay to ensure localStorage is updated
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleLoginEvent);
      window.addEventListener('user-logged-in', handleLoginEvent);
      
      return () => {
        window.removeEventListener('storage', handleLoginEvent);
        window.removeEventListener('user-logged-in', handleLoginEvent);
      };
    }
  }, [pathname]);

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
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call logout API
      await userApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state
      setIsLoggedIn(false);
      setUserRole(null);
      
      // Redirect to home
      router.push('/');
    }
  };

  // Common menu items for regular users and non-logged in users
  const commonMenuItems = [
    { href: "/aboutUs", label: "About us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/diamondKnowledge", label: "Diamond Knowledge" },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    { href: "/inventory", label: "Inventory" },
    { href: "/adminpanel", label: "Admin Panel" },
    { href: "/member", label: "Member" },
    { href: "/offer-enquiry", label: "Offer Enquiry" },
  ];

  // User-only menu items
  const userMenuItems = [
    { href: "/inventory", label: "Inventory" },
  ];

  const navigationItems = isLoggedIn 
    ? isAdmin 
      ? adminMenuItems
      : [...commonMenuItems, ...userMenuItems]
    : [...commonMenuItems, { href: "/inventory", label: "Inventory" }];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isTestingPage || adminpanelPage || inventoryPage || offerenquiryPage || memberPage || dashboardPage
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
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#c89e3a] transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <div className="flex-shrink-0 relative h-20 w-[200px] sm:h-24 sm:w-[240px] md:h-26 md:w-[260px]">
            <button 
              onClick={() => router.push("/")}
              className="block w-full h-full focus:outline-none"
              aria-label="Go to home page"
            >
              <Image
                src="/dalila_img/Dalila_Logo.png"
                alt="Dalila Diamonds"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </button>
          </div>

          {/* Right Auth Buttons - Desktop/Tablet */}
          <div className="hidden lg:flex items-center justify-end gap-2 xl:gap-3 flex-1">
            {!isLoggedIn ? (
              <>
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
            ) : (
              <button
                onClick={handleLogout}
                className="py-1 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
              >
                LOGOUT
              </button>
            )}
          </div>

          {/* Tablet Only - Compact Buttons */}
          <div className="hidden md:flex lg:hidden items-center gap-2">
            {!isLoggedIn ? (
              <button
                onClick={() => router.push("/login")}
                className="py-1 px-3 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
              >
                LOGIN
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="py-1 px-3 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
              >
                LOGOUT
              </button>
            )}
          </div>

          {/* Mobile - Login Button Only */}
          <div className="flex md:hidden">
            {!isLoggedIn ? (
              <button
                onClick={() => router.push("/login")}
                className="py-1 px-4 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
              >
                LOGIN
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="py-1 px-4 text-xs text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
              >
                LOGOUT
              </button>
            )}
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
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3">
              {!isLoggedIn ? (
                <>
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
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-3 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors"
                >
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}