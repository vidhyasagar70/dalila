"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Loader2, ShoppingCart } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { userApi, cartApi } from "@/lib/api";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const adminpanelPage = pathname === "/adminpanel";
  const inventoryPage = pathname === "/inventory";
  const offerenquiryPage = pathname === "/offer-enquiry";
  const memberPage = pathname === "/member";
  const dashboardPage = pathname === "/dashboard";
  const CartPage = pathname === "/cart";

  // Determine if user is admin
  const isAdmin = isLoggedIn && userRole === "ADMIN";

  // Check if inventory is accessible (Admin or APPROVED status)
  const isInventoryAccessible =
    isLoggedIn && (userRole === "ADMIN" || userStatus === "APPROVED");

  // Fetch cart count - wrapped in useCallback
  const fetchCartCount = useCallback(async () => {
    if (!isLoggedIn) {
      setCartCount(0);
      return;
    }

    try {
      const response = await cartApi.get();
      console.log("Header - Cart response:", response);

      if (response?.success && response.data?.cart?.items) {
        setCartCount(response.data.cart.items.length);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  }, [isLoggedIn]);

  // Check user authentication and role on mount and when pathname changes
  useEffect(() => {
    const checkUserAuth = () => {
      if (typeof window !== "undefined") {
        setIsCheckingAuth(true);

        let token = localStorage.getItem("authToken");
        let userStr = localStorage.getItem("user");

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

        const hasValidAuth = !!(userStr && token);

        if (hasValidAuth && userStr) {
          try {
            const user = JSON.parse(userStr);
            setUserRole(user.role || null);
            setUserStatus(user.status || null);
            setIsLoggedIn(true);
            console.log("User role:", user.role);
            console.log("User status:", user.status);
          } catch {
            setUserRole(null);
            setUserStatus(null);
            setIsLoggedIn(false);
          }
        } else {
          setUserRole(null);
          setUserStatus(null);
          setIsLoggedIn(false);
        }

        setIsCheckingAuth(false);
        console.log("=== END HEADER AUTH CHECK ===");
        console.log("Final auth state - isLoggedIn:", hasValidAuth);
      }
    };

    checkUserAuth();

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
    if (isLoggedIn) {
      fetchCartCount();

      const handleCartUpdate = () => {
        fetchCartCount();
      };

      window.addEventListener("cart-updated", handleCartUpdate);
      return () => {
        window.removeEventListener("cart-updated", handleCartUpdate);
      };
    }
  }, [isLoggedIn, fetchCartCount]);

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

  const handleLogout = async () => {
    try {
      console.log("Logout initiated...");
      await userApi.logout();
    } catch {
    } finally {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserStatus(null);
      setCartCount(0);

      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        document.cookie =
          "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        console.log("Logout complete - storage cleared");
      }

      if (typeof window !== "undefined") {
        const logoutEvent = new CustomEvent("user-logged-out");
        window.dispatchEvent(logoutEvent);
      }

      router.push("/");
    }
  };

  const handleInventoryClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push("/login");
    } else if (userRole !== "ADMIN" && userStatus !== "APPROVED") {
      e.preventDefault();
      alert(
        "Your account is pending approval. Please wait for admin verification to access the inventory.",
      );
    }
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/cart");
    }
  };

  let navigationItems: {
    href: string;
    label: string;
    requiresAuth?: boolean;
  }[] = [];

  if (!isLoggedIn) {
    navigationItems = [
      { href: "/aboutUs", label: "About us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/weBuy", label: "We Buy" },
      { href: "/diamondKnowledge", label: "Diamond Knowledge" },
    ];
  } else if (isAdmin) {
    navigationItems = [
      { href: "/aboutUs", label: "About us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/weBuy", label: "We Buy" },
      { href: "/diamondKnowledge", label: "Diamond Knowledge" },
    ];
  } else {
    navigationItems = [
      { href: "/aboutUs", label: "About us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/weBuy", label: "We Buy" },
      { href: "/diamondKnowledge", label: "Diamond Knowledge" },
    ];
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ||
        adminpanelPage ||
        inventoryPage ||
        offerenquiryPage ||
        memberPage ||
        dashboardPage ||
        CartPage
          ? "bg-[#050c3a] shadow-lg py-2 md:py-2.5"
          : "bg-transparent py-2.5 md:py-3"
      }`}
    >
      <div className="">
        <div className="hidden sm:flex justify-center mb-0.5 md:mb-1">
          <p className="text-xs md:text-md tracking-wide text-white">
            Where Trust Shines, And Quality Sparkles
          </p>
        </div>

        <div className="hidden sm:block w-full h-[1px] bg-white/30 mb-0"></div>

        <div className="flex container mx-auto px-4 md:px-6 lg:px-8 items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:text-[#c89e3a] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

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

          <div className="hidden lg:flex items-center justify-end gap-2 xl:gap-3 flex-1">
            {isLoggedIn && (
              <div className="flex gap-15">
                <button
                  onClick={handleCartClick}
                  className="relative p-2 text-white hover:text-[#c89e3a] transition-colors"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#c89e3a] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </button>
              </div>
            )}

            {isCheckingAuth ? (
              <div className="py-1 px-3 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-[#c89e3a] animate-spin" />
              </div>
            ) : !isLoggedIn ? (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="py-3 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="py-3 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
                >
                  REGISTER
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                {/* DASHBOARD - Available only for regular users, NOT for admin */}
                {!isAdmin && (
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="py-3 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
                  >
                    DASHBOARD
                  </button>
                )}

                {/* INVENTORY - Available for Admin or APPROVED users */}
                <button
                  onClick={(e) => {
                    if (isInventoryAccessible) {
                      router.push("/inventory");
                    } else {
                      e.preventDefault();
                      alert(
                        "Your account is pending approval. Please wait for admin verification to access the inventory.",
                      );
                    }
                  }}
                  disabled={!isInventoryAccessible}
                  className={`py-3 px-3 xl:px-5 text-xs xl:text-sm border border-[#c89e3a] transition-colors whitespace-nowrap ${
                    isInventoryAccessible
                      ? "text-white hover:bg-[#c89e3a] hover:text-white cursor-pointer"
                      : "text-gray-400 bg-gray-700 cursor-not-allowed opacity-60"
                  }`}
                  title={
                    !isInventoryAccessible
                      ? "Your account is pending approval"
                      : ""
                  }
                >
                  INVENTORY
                </button>

                {/* ADMIN PANEL - Only for admins */}
                {isAdmin && (
                  <div className="relative group">
                    <button
                      onMouseEnter={() => setIsAdminDropdownOpen(true)}
                      onMouseLeave={() => setIsAdminDropdownOpen(false)}
                      className="py-3 cursor-pointer px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
                    >
                      ADMIN PANEL
                    </button>

                    {isAdminDropdownOpen && (
                      <div
                        onMouseEnter={() => setIsAdminDropdownOpen(true)}
                        onMouseLeave={() => setIsAdminDropdownOpen(false)}
                        className="absolute top-full left-0 mt-0 w-full bg-[#050c3a] border border-[#c89e3a] rounded shadow-lg z-50"
                      >
                        <Link
                          href="/member"
                          className="block px-4 py-3 text-sm text-white hover:bg-[#c89e3a] hover:text-white transition-colors"
                        >
                          Members
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="py-3 px-3 xl:px-5 text-xs xl:text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>

          {/* Tablet Only */}
          <div className="hidden md:flex lg:hidden items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleCartClick}
                className="relative p-2 text-white hover:text-[#c89e3a] transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c89e3a] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            )}

            {isCheckingAuth ? (
              <div className="py-1 px-3 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-[#c89e3a] animate-spin" />
              </div>
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

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleCartClick}
                className="relative p-2 text-white hover:text-[#c89e3a] transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c89e3a] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
            )}

            {isCheckingAuth ? (
              <div className="py-1 px-4 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-[#c89e3a] animate-spin" />
              </div>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-[#050c3a] z-40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center mb-4 pb-4 border-b border-white/30">
              <p className="text-xs tracking-wide text-gray-300">
                Where Trust Shines, And Quality Sparkles
              </p>
            </div>

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

              {/* Dashboard - Available only for regular users, NOT for admin */}
              {isLoggedIn && !isAdmin && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/dashboard");
                  }}
                  className="text-left text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
                >
                  Dashboard
                </button>
              )}

              {/* Inventory - Available for Admin or APPROVED users */}
              {isLoggedIn && (
                <button
                  onClick={(e) => {
                    if (isInventoryAccessible) {
                      setIsMobileMenuOpen(false);
                      router.push("/inventory");
                    } else {
                      e.preventDefault();
                      alert(
                        "Your account is pending approval. Please wait for admin verification to access the inventory.",
                      );
                    }
                  }}
                  disabled={!isInventoryAccessible}
                  className={`text-left text-lg py-2 border-b border-white/10 transition-colors ${
                    isInventoryAccessible
                      ? "text-white hover:text-[#c89e3a]"
                      : "text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Inventory {!isInventoryAccessible && "(Pending Approval)"}
                </button>
              )}

              {/* Admin Panel - Only for admins */}
              {isAdmin && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/member");
                  }}
                  className="text-left text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
                >
                  Admin Panel
                </button>
              )}

              {/* Cart */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleCartClick();
                  }}
                  className="flex items-center justify-between text-white hover:text-[#c89e3a] transition-colors text-lg py-2 border-b border-white/10"
                >
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-[#c89e3a] text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}
            </nav>

            <div className="flex flex-col gap-3">
              {isCheckingAuth ? (
                <div className="flex justify-center">
                  <Loader2 className="w-8 h-8 text-[#c89e3a] animate-spin" />
                </div>
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