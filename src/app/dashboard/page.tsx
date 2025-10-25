// app/dashboard/page.tsx
"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

import Dashboard from "../dashboaard/page";
export default function DashboardPage() {
  return (
    <ProtectedRoute requireAuth={true} redirectTo="/login" allowedRoles={["ADMIN"]}>
      <main className="relative">
        <Dashboard/>
      </main>
    </ProtectedRoute>
  );
}
