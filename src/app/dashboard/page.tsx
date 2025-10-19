// app/dashboard/page.tsx
"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import DiamondStockTableWithFilter from "@/components/DiamondStockTableWithFilter";

export default function DashboardPage() {
  return (
    <ProtectedRoute requireAuth={true} redirectTo="/login">
      <main className="relative">
        <DiamondStockTableWithFilter />
      </main>
    </ProtectedRoute>
  );
}
