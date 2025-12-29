import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { userApi } from "@/lib/api";

interface UseHeaderAuthReturn {
    userRole: string | null;
    userStatus: string | null;
    isLoggedIn: boolean;
    isCheckingAuth: boolean;
    isAdmin: boolean;
    isInventoryAccessible: boolean;
    handleLogout: () => Promise<void>;
}

export const useHeaderAuth = (): UseHeaderAuthReturn => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userStatus, setUserStatus] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Function to check if token has expired
    const isTokenExpired = (): boolean => {
        if (typeof window === "undefined") return false;

        const tokenTimestamp = localStorage.getItem("authTokenTimestamp");
        if (!tokenTimestamp) {
            localStorage.setItem("authTokenTimestamp", Date.now().toString());
            return false;
        }

        const tokenAge = Date.now() - parseInt(tokenTimestamp, 10);
        const ONE_DAY_MS = 24 * 60 * 60 * 1000;

        return tokenAge >= ONE_DAY_MS;
    };

    // Determine if user is admin or super admin
    const isAdmin =
        isLoggedIn && (userRole === "ADMIN" || userRole === "SUPER_ADMIN");

    // Check if inventory is accessible (Admin or APPROVED status)
    const isInventoryAccessible =
        isLoggedIn &&
        (userRole === "ADMIN" ||
            userRole === "SUPER_ADMIN" ||
            userStatus === "APPROVED");

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
                        c.trim().startsWith("authToken=")
                    );
                    if (tokenCookie) {
                        token = tokenCookie.split("=")[1].trim();
                        console.log("Found token in cookie");
                    }

                    const userCookie = cookies.find((c) =>
                        c.trim().startsWith("user=")
                    );
                    if (userCookie) {
                        try {
                            userStr = decodeURIComponent(
                                userCookie.split("=")[1].trim()
                            );
                            console.log("Found user in cookie");
                        } catch (e) {
                            console.error("Error decoding user cookie:", e);
                        }
                    }
                }

                const hasValidAuth = !!(userStr && token);

                // Check if token has expired
                if (hasValidAuth && isTokenExpired()) {
                    console.log("Token has expired. Logging out user...");
                    // Clear auth data
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("authTokenTimestamp");
                    localStorage.removeItem("user");
                    document.cookie =
                        "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    document.cookie =
                        "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

                    setUserRole(null);
                    setUserStatus(null);
                    setIsLoggedIn(false);
                    setIsCheckingAuth(false);

                    // Dispatch logout event
                    const logoutEvent = new CustomEvent("user-logged-out");
                    window.dispatchEvent(logoutEvent);

                    // Only redirect to login if not on homepage or public pages
                    const publicPages = [
                        "/",
                        "/aboutUs",
                        "/diamondKnowledge",
                        "/blogs",
                        "/contact",
                        "/secure-to-source",
                        "/diamond-source",
                        "/sud",
                    ];
                    const isPublicPage = publicPages.some(
                        (page) =>
                            pathname === page || pathname.startsWith("/blogs/")
                    );

                    if (!isPublicPage) {
                        router.push("/login");
                    }
                    return;
                }

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
    }, [pathname, router]);

    // Logout handler
    const handleLogout = async () => {
        try {
            console.log("Logout initiated...");
            await userApi.logout();
        } catch {
        } finally {
            setIsLoggedIn(false);
            setUserRole(null);
            setUserStatus(null);

            if (typeof window !== "undefined") {
                localStorage.removeItem("authToken");
                localStorage.removeItem("authTokenTimestamp");
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

    return {
        userRole,
        userStatus,
        isLoggedIn,
        isCheckingAuth,
        isAdmin,
        isInventoryAccessible,
        handleLogout,
    };
};

