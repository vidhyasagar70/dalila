"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Home, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { userApi } from "@/lib/api";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function OTPVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  
  // Refs for OTP inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Get email from URL params
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // If no email in params, redirect to register
      router.push("/register");
    }
  }, [searchParams, router]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Only allow 4-digit numbers
    if (!/^\d{4}$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);
    
    // Focus last input
    inputRefs.current[3]?.focus();
  };

const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Validate OTP
  const otpString = otp.join("");
  
  // Enhanced logging for debugging
  console.log("=== OTP Verification Debug ===");
  console.log("Email:", email);
  console.log("Email trimmed:", email.trim());
  console.log("OTP:", otpString);
  console.log("OTP Type:", typeof otpString);
  console.log("OTP Length:", otpString.length);
  console.log("Request payload:", {
    email: email.trim(),
    otp: otpString.trim()
  });
  console.log("============================");

  if (otpString.length !== 4) {
    setError("Please enter the complete 4-digit OTP");
    return;
  }

  // Validate that OTP contains only digits
  if (!/^\d{4}$/.test(otpString)) {
    setError("OTP must contain only numbers");
    return;
  }

  // Validate email
  if (!email || !email.trim()) {
    setError("Email is missing. Please go back to registration.");
    return;
  }

  setIsLoading(true);
  setError("");
  setSuccess("");

  try {
    console.log("Sending OTP verification request...");

    // API call with both email and OTP as required by the API
    const response = await userApi.verifyOtp({
      email: email.trim(),
      otp: otpString.trim(),
    });

    console.log("Response received:", response);
    console.log("Response success:", response?.success);
    console.log("Response message:", response?.message);

    // Check if response is successful
    if (response && response.success) {
      console.log("✅ OTP verified successfully!");
      
      setSuccess(
        response.message || "Email verified successfully! Redirecting to login..."
      );

      // Clear the OTP inputs
      setOtp(["", "", "", ""]);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      // Handle unsuccessful response
      console.warn("OTP verification failed:", response);
      
      const errorMessage = response?.message || 
                          response?.error || 
                          "Invalid OTP. Please try again.";
      
      setError(errorMessage);
      
      // Clear OTP inputs on error for security
      setOtp(["", "", "", ""]);
      
      // Focus first input
      inputRefs.current[0]?.focus();
    }

  } catch (err: unknown) {
    console.error("OTP verification error:", err);

    if (err instanceof Error) {
      const errorMessage = err.message.toLowerCase();
      
      console.log("Error message:", errorMessage);
      
      // Specific error handling based on error message
      if (errorMessage.includes("expired")) {
        setError("OTP has expired. Please request a new one.");
      } else if (errorMessage.includes("invalid") || 
                 errorMessage.includes("incorrect") || 
                 errorMessage.includes("wrong")) {
        setError("Invalid OTP. Please check and try again.");
      } else if (errorMessage.includes("not found") || 
                 errorMessage.includes("does not exist")) {
        setError("User not found. Please register again.");
      } else if (errorMessage.includes("already verified")) {
        setError("Email already verified. Please login.");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else if (errorMessage.includes("network") || 
                 errorMessage.includes("fetch") || 
                 errorMessage.includes("failed to fetch")) {
        setError("Unable to connect to server. Please check your internet connection.");
      } else if (errorMessage.includes("server error") || 
                 errorMessage.includes("database") ||
                 errorMessage.includes("something went wrong")) {
        setError("The OTP might be incorrect or expired. Please try requesting a new OTP.");
      } else if (errorMessage.includes("timeout")) {
        setError("Request timeout. Please try again.");
      } else {
        // Generic error message
        setError(err.message || "Verification failed. Please try again.");
      }
      
      // Clear OTP inputs on error
      setOtp(["", "", "", ""]);
      
      // Focus first input
      inputRefs.current[0]?.focus();
      
    } else {
      // Unknown error type
      console.error("Unknown error type:", err);
      setError("An unexpected error occurred. Please try again.");
      
      // Clear OTP inputs on error
      setOtp(["", "", "", ""]);
      
      // Focus first input
      inputRefs.current[0]?.focus();
    }
  } finally {
    setIsLoading(false);
  }
};

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      console.log("Resending OTP to:", email);

      const response = await userApi.sendOtp(email);

      if (response && response.success) {
        setSuccess(response.message || "OTP sent successfully to your email!");
        setCountdown(60); // Start 60 second countdown
        setOtp(["", "", "", ""]); // Clear OTP inputs
        inputRefs.current[0]?.focus(); // Focus first input
      } else {
        setError(response?.message || "Failed to resend OTP. Please try again.");
      }

    } catch (err: unknown) {
      console.error("Resend OTP error:", err);

      if (err instanceof Error) {
        setError(err.message || "Failed to resend OTP. Please try again.");
      } else {
        setError("Unable to connect to server. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
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

      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="flex w-full max-w-[900px] h-auto md:h-[550px] rounded-xl shadow-2xl border border-gray-800 overflow-hidden flex-col md:flex-row">
          {/* Left Welcome Panel */}
          <div
            className="flex flex-col justify-between text-white px-10 py-10 w-full md:w-[50%] md:min-w-[350px]"
            style={{
              background:
                "linear-gradient(to right, rgba(4, 8, 37, 0.9) 0%, rgba(4, 8, 37, 0.9) 100%)",
            }}
          >
            <div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2 mt-5">
                  <div className="relative w-[250px] md:w-[300px] h-[80px] md:h-[100px]">
                    <Image
                      src="/dalila_img/Dalila_Logo.png"
                      alt="Dalila Diamonds"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <h2
                className={`text-4xl md:text-6xl mb-4 md:mb-7 font-light text-[#d4a018] text-center ${playFair.className}`}
              >
                Verify Your Email
              </h2>

              <p className="text-sm md:text-md mt-2 mb-8 font-normal opacity-90 text-center">
                We&apos;ve sent a 4-digit verification code to your email address.
                Please enter it below to complete your registration.
              </p>
            </div>

            {/* Email Display */}
            <div className="mt-2 mb-10 md:mb-20 space-y-2 text-sm opacity-90">
              <div className="flex items-center justify-center gap-2">
                <Mail className="text-[#FFD166] w-4 h-4 flex-shrink-0" />
                <span className="text-[#FFD166] font-semibold">{email}</span>
              </div>
              <p className="text-xs text-center opacity-75">
                Didn&apos;t receive the code? Check your spam folder
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative flex-1 flex flex-col justify-center items-center bg-black/20 px-4 py-8 md:py-0">
            {/* Navigation Buttons */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 flex gap-2 z-10">
              <button
                className="bg-[#101638]/80 rounded-full p-2 shadow-md hover:bg-[#d4a018] transition-all duration-200 hover:scale-110"
                title="Back to Register"
                onClick={() => router.push("/register")}
                type="button"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <button
                className="bg-[#101638]/80 rounded-full p-2 shadow-md hover:bg-[#d4a018] transition-all duration-200 hover:scale-110"
                title="Home"
                onClick={() => router.push("/")}
                type="button"
              >
                <Home className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* OTP Form */}
            <form
              onSubmit={handleVerifyOtp}
              className="relative z-10 w-full max-w-[400px]"
            >
              <h2
                className={`text-2xl md:text-3xl font-semibold text-white mb-6 text-center ${playFair.className}`}
              >
                Enter Verification Code
              </h2>

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500 text-green-200 text-sm text-center flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {success}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-200 text-sm text-center animate-shake">
                  {error}
                </div>
              )}

              {/* OTP Input - 4 digits */}
              <div className="mb-8">
                <div className="flex justify-center gap-3 md:gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={isLoading}
                      className="w-14 h-16 md:w-16 md:h-18 text-center text-2xl font-bold rounded-lg bg-white border-2 border-gray-300 focus:border-[#FFD166] text-black focus:outline-none focus:ring-2 focus:ring-[#FFD166] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading || otp.join("").length !== 4}
                className="w-full bg-[#d4a018] hover:bg-[#c4a639] text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] mb-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>VERIFYING...</span>
                  </>
                ) : (
                  <span>VERIFY EMAIL</span>
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-400">
                    Resend code in{" "}
                    <span className="text-[#FFD166] font-semibold">
                      {countdown}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="text-sm text-[#FFD166] hover:text-yellow-400 hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Resend Verification Code</span>
                    )}
                  </button>
                )}
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center text-xs text-[#474745]">
                Already verified?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/login");
                  }}
                  className="text-[#FFD166] font-semibold hover:text-yellow-400 hover:underline transition-colors"
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