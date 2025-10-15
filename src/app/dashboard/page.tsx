"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import DiamondStockTableWithFilter from "@/components/DiamondStockTableWithFilter";

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string>("");

  // Auth verification
  useEffect(() => {
    const verifyAccess = async () => {
      if (!authService.isAuthenticated()) {
        router.replace("/login");
        return;
      }
      setIsChecking(false);
    };
    verifyAccess();
  }, [router]);

  if (isChecking) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-[100px] mt-[30px]">
      {error && (
        <div className="w-full px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>
        </div>
      )}
      {/* Main Content */}
      <div className="flex-1 w-full">
        <DiamondStockTableWithFilter />
      </div>
    </div>
  );
}
