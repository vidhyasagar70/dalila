// components/ProtectedRoute.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectIfAuth?: boolean;
  redirectTo?: string;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  requireAuth = false,
  redirectIfAuth = false,
  redirectTo = "/",
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === "undefined") return;

      // Get auth data from localStorage FIRST (most reliable)
      let userStr = localStorage.getItem("user");

      let token = localStorage.getItem("authToken");
      if (!userStr || !token) {
        console.log("Checking cookies as fallback...");
        const cookies = document.cookie.split(";");
        const tokenCookie = cookies.find((c) =>
          c.trim().startsWith("authToken="),
        );
        const userCookie = cookies.find((c) => c.trim().startsWith("user="));

        if (tokenCookie && !token) {
          token = tokenCookie.split("=")[1].trim();
          console.log("Found token in cookie");
        }
        if (userCookie && !userStr) {
          try {
            userStr = decodeURIComponent(userCookie.split("=")[1].trim());
            console.log("Found user in cookie");
          } catch (e) {
            console.error("Error decoding user cookie:", e);
          }
        }
      }

      const isLoggedIn = !!(userStr && token);
      let userRole: string | null = null;

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userRole = user.role || null;
          console.log("Parsed user role:", userRole);
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }

      console.log("ProtectedRoute Decision:", {
        pathname,
        isLoggedIn,
        userRole,
        requireAuth,
        redirectIfAuth,
        hasToken: !!token,
        hasUser: !!userStr,
      });

      // Case 1: Route requires authentication but user is not logged in
      if (requireAuth && !isLoggedIn) {
        setIsAuthorized(false);
        setIsChecking(false);
        router.push(redirectTo);
        return;
      }

      // Case 2: Route should redirect if user IS logged in (like login/register pages)
      if (redirectIfAuth && isLoggedIn) {
        setIsAuthorized(false);
        setIsChecking(false);
        router.push(redirectTo);
        return;
      }

      // Case 3: Check role-based access if roles are specified
      if (requireAuth && allowedRoles && allowedRoles.length > 0) {
        if (!userRole || !allowedRoles.includes(userRole)) {
          setIsAuthorized(false);
          setIsChecking(false);
          router.push(redirectTo);
          return;
        }
      }

      // All checks passed
      console.log("✅ Authorization check PASSED for:", pathname);
      setIsAuthorized(true);
      setIsChecking(false);
    };

    // Delay to ensure localStorage is populated after login
    const timeoutId = setTimeout(checkAuth, 200);

    // Listen for auth changes
    const handleAuthChange = () => {
      setTimeout(checkAuth, 200);
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("user-logged-in", handleAuthChange);
    window.addEventListener("user-logged-out", handleAuthChange);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("user-logged-in", handleAuthChange);
      window.removeEventListener("user-logged-out", handleAuthChange);
    };
  }, [pathname, requireAuth, redirectIfAuth, redirectTo, allowedRoles, router]);

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050c3a]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#c89e3a] border-r-transparent"></div>
          <p className="mt-4 text-white">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authorized (already redirecting)
  if (!isAuthorized) {
    return null;
  }

  // Render children if authorized
  return <>{children}</>;
}
