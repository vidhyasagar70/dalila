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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
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

  // Check user authentication and role on mount and when pathname changes
  useEffect(() => {
    const checkUserAuth = () => {
      if (typeof window !== "undefined") {
        setIsCheckingAuth(true);

        // First, try localStorage
        let token = localStorage.getItem("authToken");
        let userStr = localStorage.getItem("user");

        console.log("=== HEADER AUTH CHECK ===");
        console.log("LocalStorage Token:", token ? "EXISTS" : "MISSING");
        console.log("LocalStorage User:", userStr ? "EXISTS" : "MISSING");

        // If not in localStorage, check cookies
        if (!userStr || !token) {
          console.log("Checking cookies...");
          const cookies = document.cookie.split(";");

          const tokenCookie = cookies.find((c) =>
            c.trim().startsWith("authToken="),
          );
          if (tokenCookie) {
            token = tokenCookie.split("=")[1].trim();
            console.log("Found token in cookie");
          }

          const userCookie = cookies.find((c) => c.trim().startsWith("user="));
          if (userCookie) {
            try {
              userStr = decodeURIComponent(userCookie.split("=")[1].trim());
              console.log("Found user in cookie");
            } catch (e) {
              console.error("Error decoding user cookie:", e);
            }
          }
        }

        // Check if user is authenticated
        const hasValidAuth = !!(userStr && token);

        if (hasValidAuth && userStr) {
          try {
            const user = JSON.parse(userStr);
            console.log("✅ User authenticated:", user.email);
            console.log("✅ User role:", user.role);
            setUserRole(user.role || null);
            setIsLoggedIn(true);
          } catch (error) {
            console.error("❌ Error parsing user data:", error);
            setUserRole(null);
            setIsLoggedIn(false);
          }
        } else {
          console.log("❌ No valid authentication found");
          setUserRole(null);
          setIsLoggedIn(false);
        }

        setIsCheckingAuth(false);
        console.log("=== END HEADER AUTH CHECK ===");
        console.log("Final auth state - isLoggedIn:", hasValidAuth);
      }
    };

    checkUserAuth();

    // Listen for auth events
    const handleAuthEvent = (event: Event) => {
      console.log("Auth event received:", event.type);
      setTimeout(checkUserAuth, 100);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleAuthEvent);
      window.addEventListener("user-logged-in", handleAuthEvent);
      window.addEventListener("user-logged-out", handleAuthEvent);

      return () => {
        window.removeEventListener("storage", handleAuthEvent);
        window.removeEventListener("user-logged-in", handleAuthEvent);
        window.removeEventListener("user-logged-out", handleAuthEvent);
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
      console.log("Logout initiated...");
      // Call logout API
      await userApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state
      setIsLoggedIn(false);
      setUserRole(null);

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        // Clear cookies
        document.cookie =
          "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        console.log("✅ Logout complete - storage cleared");
      }

      // Dispatch logout event for ProtectedRoute to listen
      if (typeof window !== "undefined") {
        const logoutEvent = new CustomEvent("user-logged-out");
        window.dispatchEvent(logoutEvent);
      }

      // Redirect to home
      router.push("/");
    }
  };

  // Handle inventory click for non-logged in users
  const handleInventoryClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push("/login");
    }
  };

  // Menu items based on authentication status and role
  let navigationItems: { href: string; label: string; requiresAuth?: boolean }[] = [];

  if (!isLoggedIn) {
    // Before login - show these for everyone
    navigationItems = [
      { href: "/aboutUs", label: "About us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/blogs", label: "Blogs" },
      { href: "/diamondKnowledge", label: "Diamond Knowledge" },
      { href: "/inventory", label: "Inventory", requiresAuth: true }, // Shows but redirects to login
    ];
  } else if (isAdmin) {
    // Admin after login - no Contact Us
    navigationItems = [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/inventory", label: "Inventory" },
      { href: "/member", label: "Members" },
      { href: "/offer-enquiry", label: "Offers" },
    ];
  } else {
    // Regular user after login - shows Contact Us
    navigationItems = [
      { href: "/aboutUs", label: "About us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/blogs", label: "Blogs" },
      { href: "/diamondKnowledge", label: "Diamond Knowledge" },
      { href: "/inventory", label: "Inventory" },
    ];
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ||
        isTestingPage ||
        adminpanelPage ||
        inventoryPage ||
        offerenquiryPage ||
        memberPage ||
        dashboardPage
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
                onClick={item.requiresAuth ? handleInventoryClick : undefined}
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
            {isCheckingAuth ? (
              <div className="h-8 w-24 bg-white/10 animate-pulse rounded"></div>
            ) : !isLoggedIn ? (
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
            {isCheckingAuth ? (
              <div className="h-8 w-16 bg-white/10 animate-pulse rounded"></div>
            ) : !isLoggedIn ? (
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
            {isCheckingAuth ? (
              <div className="h-8 w-16 bg-white/10 animate-pulse rounded"></div>
            ) : !isLoggedIn ? (
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
                  onClick={(e) => {
                    if (item.requiresAuth) {
                      handleInventoryClick(e);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3">
              {isCheckingAuth ? (
                <div className="h-12 w-full bg-white/10 animate-pulse rounded"></div>
              ) : !isLoggedIn ? (
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