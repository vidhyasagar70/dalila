"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { stockService, type DiamondData } from "@/services/stockService";
import DiamondStockTable from "@/components/DiamondStockTable";

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [stockData, setStockData] = useState<DiamondData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const verifyAccess = async () => {
      if (!authService.isAuthenticated()) {
        router.replace("/login");
        return;
      }

      setIsChecking(false);
      await loadStockData();
    };

    verifyAccess();
  }, [router]);

  const loadStockData = async () => {
    setError("");

    try {
      const data = await stockService.getStock();
      setStockData(data);

      if (data.length === 0) {
        setError("No stock data available at the moment.");
      }
    } catch (err) {
      console.error("❌ Failed to load stock:", err);
      setError(err instanceof Error ? err.message : "Failed to load stock data");

      if (err instanceof Error && err.message.includes("Authentication failed")) {
        setTimeout(() => {
          authService.logout();
        }, 2000);
      }
    }
  };

  if (isChecking) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-[100px] mt-30">
      {/* ↑ increased top padding to 100px (adjust if needed) */}

      {/* Error Message */}
      {error && (
        <div className="w-full px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 w-full">
        <DiamondStockTable data={stockData} pageSize={20} />
      </div>
    </div>
  );
}
