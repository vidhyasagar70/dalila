"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import DiamondStockTableWithFilter from "@/components/DiamondStockTableWithFilter";

export default function Contact() {
    return (
        <ProtectedRoute
            requireAuth={true}
            redirectTo="/login"
            allowedRoles={["USER", "ADMIN"]}
        >
            <main className="relative">
                <DiamondStockTableWithFilter />
            </main>
        </ProtectedRoute>
    );
}
