"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Home, Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { userApi, getAuthToken, UNAUTHORIZED_EVENT } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load remembered email on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        setRememberMe(true);
      }
    }
  }, []);

  // Listen for unauthorized events
  useEffect(() => {
    const handleUnauthorized = () => {
      console.log("Unauthorized event detected, redirecting to login...");
      router.push('/login');
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
      return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email.trim()) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Initiating login...");
      
      // Call the login API
      const response = await userApi.login({
        email: email.trim(),
        password: password,
      });

      if (response && response.success) {
        console.log("✅ Login successful!", response);

        // Handle remember me
        if (typeof window !== 'undefined') {
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          
          // Verify data is stored
          console.log("=== Verifying stored data ===");
          const storedToken = localStorage.getItem('authToken');
          const storedUser = localStorage.getItem('user');
          console.log("Token in localStorage:", storedToken ? "EXISTS" : "MISSING");
          console.log("User in localStorage:", storedUser);
          
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              console.log("✅ Parsed user role:", parsedUser.role);
            } catch (e) {
              console.error("❌ Error parsing stored user:", e);
            }
          }
          
          // IMPORTANT: Dispatch custom event to notify Header component
          console.log("Dispatching login event...");
          const loginEvent = new CustomEvent('user-logged-in');
          window.dispatchEvent(loginEvent);
          
          console.log("✅ Login event dispatched");
        }

        // Get redirect URL from query params or default to dashboard
        const redirect = searchParams.get('redirect') || '/dashboard';

        // Show success message
        setError("");

        // Redirect without page reload
        setTimeout(() => {
          console.log(`Redirecting to: ${redirect}`);
          router.push(redirect);
        }, 1000);
      } else {
        // Handle unsuccessful login
        setError(response?.message || "Login failed. Please try again.");
      }

    } catch (err: unknown) {
      console.error("Login error:", err);

      if (err instanceof Error) {
        // Check for specific error messages from the API
        const errorMessage = err.message;
        
        if (errorMessage.includes("Invalid credentials") || 
            errorMessage.includes("incorrect password") ||
            errorMessage.includes("not found")) {
          setError("Invalid email or password. Please try again.");
        } else if (errorMessage.includes("not verified")) {
          setError("Please verify your email address before logging in.");
        } else if (errorMessage.includes("account is locked") || 
                   errorMessage.includes("suspended")) {
          setError("Your account has been suspended. Please contact support.");
        } else if (errorMessage.includes("network") || 
                   errorMessage.includes("fetch")) {
          setError("Unable to connect to server. Please check your internet connection.");
        } else {
          setError(errorMessage || "Login failed. Please try again.");
        }
      } else {
        setError(
          "Unable to connect to server. Please check your internet connection and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Navigate to forgot password page
    router.push('/forgot-password');
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="flex w-full max-w-[1100px] h-auto md:h-[480px] rounded-xl shadow-2xl border border-gray-800 overflow-hidden flex-col md:flex-row">
          
          {/* Left Panel - Brand Info */}
          <div
            className="flex flex-col justify-between text-white px-10 py-10 w-full md:w-[50%] md:min-w-[350px]"
            style={{
              background:
                "linear-gradient(to right, rgba(4, 8, 37, 0.9) 0%, rgba(4, 8, 37, 0.9) 100%)",
            }}
          >
            <div>
              <div className="flex items-center justify-center gap-3 mb-1">
                <div className="relative w-[250px] md:w-[300px] h-[80px] md:h-[100px]">
                  <Image
                    src="/dalila_img/Dalila_Logo.png"
                    alt="Dalila Diamonds"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <h1 className="text-3xl md:text-6xl font-light mt-2 mb-4 text-[#d4a018] text-center">
                Welcome to Dalila
              </h1>

              <p className="text-sm md:text-md mt-2 mb-8 font-normal opacity-90 text-center">
                Where Trust Shines and Quality Sparkles. We bring you timeless
                diamond jewelry crafted with love and precision.
              </p>
            </div>

            <div className="mt-4 md:mt-2 mb-6 md:mb-10 space-y-2 text-sm opacity-90">
              <div className="flex items-center justify-center gap-2">
                <Phone className="text-[#FFD166] w-4 h-4 flex-shrink-0" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="text-[#FFD166] w-4 h-4 flex-shrink-0" />
                <span>contact@dalila.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="text-[#FFD166] w-4 h-4 flex-shrink-0" />
                <span>123 Diamond Street, XYZ City</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="relative flex-1 flex flex-col justify-center items-center bg-black/20 px-4 py-8 md:py-0">
            
            {/* Home Button */}
            <button
              className="absolute top-4 md:top-6 right-4 md:right-6 bg-[#101638]/80 rounded-full p-2 shadow-md z-10 hover:bg-[#d4a018] transition-all duration-200 hover:scale-110"
              title="Home"
              onClick={() => router.push("/")}
              type="button"
            >
              <Home className="w-5 h-5 text-white" />
            </button>

            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className="relative z-10 w-full max-w-[400px] md:max-w-[550px]"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
                Login to Your Account
              </h2>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-200 text-sm text-center animate-shake">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div className="mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Email Address"
                  className="w-[90%] ml-5 px-5 py-3 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  autoComplete="email"
                />
              </div>

              {/* Password Input */}
              <div className="mb-5 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Password"
                  className="w-[90%] ml-5 px-5 py-3 rounded-lg bg-white border border-gray-300 focus:border-[#FFD166] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[60px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center mb-6">
                <label className="flex ml-5 items-center text-xs text-white gap-2 cursor-pointer hover:text-[#FFD166] transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#FFD166] w-4 h-4 cursor-pointer"
                    disabled={isLoading}
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-xs text-[#FFD166] hover:text-yellow-400 hover:underline transition-colors mr-6"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-[90%] ml-5 bg-[#d4a018] hover:bg-[#c4a639] text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>LOGGING IN...</span>
                  </>
                ) : (
                  <span>LOGIN</span>
                )}
              </button>

              {/* Register Link */}
              <div className="mt-6 text-center text-xs text-[#474745]">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/register");
                  }}
                  className="text-[#FFD166] font-semibold hover:text-yellow-400 hover:underline transition-colors"
                >
                  Register here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}