// app/limitedEdition/page.tsx
"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DiamondStockTableWithFilter from "@/components/LimitedEdition/DiamondStockTableWithFilterlimited";

export default function LimitedEditionPage() {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);

  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["ADMIN"]} redirectTo="/">
      <DiamondStockTableWithFilter />
    </ProtectedRoute>
  );
}
