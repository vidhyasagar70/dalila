"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Hand, Loader2, LogOut } from "lucide-react";
import { authService } from "@/services/authService";

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Check authentication on component mount
    const checkAuth = () => {
      if (!authService.isAuthenticated()) {
        console.log("User not authenticated, redirecting to login...");
        router.replace("/login");
      } else {
        console.log("User authenticated");
        setIsChecking(false);
        
        // Get user email from localStorage if available
        const rememberedEmail = localStorage.getItem("dalilaRememberedEmail");
        if (rememberedEmail) {
          setUserName(rememberedEmail.split('@')[0]);
        }
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      authService.logout();
    }
  };

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-indigo-700 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 text-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl w-full">
        <div className="flex items-center justify-center gap-3 mb-6">
          <LayoutDashboard className="w-12 h-12 text-indigo-700" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4 flex items-center justify-center gap-3">
          Welcome {userName && `${userName}`}!
          <Hand className="w-8 h-8 text-yellow-500 animate-wave" />
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
          Manage your profile, view analytics, and explore key features all in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer">
            <h3 className="font-semibold text-indigo-700 mb-2">Profile</h3>
            <p className="text-sm text-gray-600">Manage your account</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
            <h3 className="font-semibold text-green-700 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">View your stats</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
            <h3 className="font-semibold text-purple-700 mb-2">Settings</h3>
            <p className="text-sm text-gray-600">Configure preferences</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}