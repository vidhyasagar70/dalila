
import React, { useState } from "react";
import { ShoppingCart, Loader2, X } from "lucide-react";
import { cartApi, getAuthToken } from "@/lib/api";

interface AddToCartButtonProps {
  selectedCount: number;
  selectedStoneNumbers: string[];
  onAddToCart?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  selectedCount,
  selectedStoneNumbers,
  onAddToCart,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleAddToCart = async () => {
    // Check authentication first - now with better error handling
    const token = getAuthToken();
    console.log("🔍 Token check:", token ? "EXISTS" : "MISSING");
    
    if (!token || token.trim() === "") {
      console.error("❌ No authentication token found");
      setMessage({
        type: "error",
        text: "Please login to add items to cart. Your session may have expired.",
      });
      
      // Dispatch unauthorized event to trigger login redirect
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("unauthorized_access"));
      }
      
      setTimeout(() => setMessage(null), 4000);
      return;
    }

    if (selectedStoneNumbers.length === 0) {
      setMessage({
        type: "error",
        text: "Please select at least one diamond",
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    try {
      setIsAdding(true);
      setMessage(null);

      console.log("📦 Adding stones to cart:", selectedStoneNumbers);
      console.log("🔑 Using token:", token.substring(0, 20) + "...");

      // Add all selected diamonds to cart with better error handling
      const results = await Promise.allSettled(
        selectedStoneNumbers.map((stoneNo) => {
          console.log(`  ➕ Attempting to add: ${stoneNo}`);
          return cartApi.add(stoneNo);
        })
      );

      console.log("📊 Cart API results:", results);

      // Analyze results with detailed logging
      const successful = results.filter((r) => {
        if (r.status === "fulfilled") {
          const value = r.value as { success?: boolean; error?: string };
          console.log("  ✅ Fulfilled:", value);
          return value?.success === true;
        }
        console.log("  ❌ Rejected:", r.reason);
        return false;
      });

      const failed = results.length - successful.length;

      // Check if any failures were due to authentication
      const authErrors = results.filter((r) => {
        if (r.status === "rejected") {
          const error = r.reason;
          return (
            error?.response?.status === 401 ||
            error?.message?.includes("Invalid token") ||
            error?.message?.includes("Unauthorized")
          );
        }
        return false;
      });

      if (authErrors.length > 0) {
        console.error("🚫 Authentication errors detected");
        setMessage({
          type: "error",
          text: "Session expired. Please login again.",
        });
        
        // Clear potentially invalid token
        if (typeof window !== "undefined") {
          localStorage.removeItem("authToken");
          // Dispatch unauthorized event
          window.dispatchEvent(new CustomEvent("unauthorized_access"));
        }
        
        setTimeout(() => setMessage(null), 4000);
        return;
      }

      if (successful.length > 0) {
        setMessage({
          type: "success",
          text: `${successful.length} diamond${successful.length > 1 ? 's' : ''} added to cart successfully!${failed > 0 ? ` (${failed} failed)` : ""}`,
        });

        // Dispatch cart updated event to update cart count in header
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cart-updated"));
        }

        // Call the optional callback to clear selection
        if (onAddToCart) {
          onAddToCart();
        }

        // Clear message after 4 seconds
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({
          type: "error",
          text: "Failed to add diamonds to cart. Please try again.",
        });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error("💥 Error adding to cart:", error);
      
      // Enhanced error handling
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { 
          response?: { 
            status?: number;
            data?: { error?: string; message?: string };
          } 
        };
        
        console.error("📡 Response status:", axiosError.response?.status);
        console.error("📡 Response data:", axiosError.response?.data);
        
        if (axiosError.response?.status === 401) {
          setMessage({
            type: "error",
            text: "Session expired. Please login again.",
          });
          
          // Clear token and dispatch event
          if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            window.dispatchEvent(new CustomEvent("unauthorized_access"));
          }
        } else if (axiosError.response?.data?.error?.includes("Invalid token")) {
          setMessage({
            type: "error",
            text: "Invalid session. Please login again.",
          });
          
          // Clear token and dispatch event
          if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            window.dispatchEvent(new CustomEvent("unauthorized_access"));
          }
        } else {
          setMessage({
            type: "error",
            text: axiosError.response?.data?.error || 
                  axiosError.response?.data?.message || 
                  "An error occurred while adding to cart.",
          });
        }
      } else {
        setMessage({
          type: "error",
          text: "Network error. Please check your connection.",
        });
      }
      setTimeout(() => setMessage(null), 4000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={selectedCount === 0 || isAdding}
        className={`flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded shadow-sm transition-colors ${
          selectedCount === 0 || isAdding
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#000033] hover:bg-[#000055]"
        }`}
        title={selectedCount === 0 ? "Select diamonds to add to cart" : `Add ${selectedCount} diamond${selectedCount > 1 ? 's' : ''} to cart`}
      >
        {isAdding ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart {selectedCount > 0 && `(${selectedCount})`}
          </>
        )}
      </button>

      {/* Toast Message at Bottom Right */}
      {message && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50 min-w-[300px] max-w-[500px] flex items-center justify-between bg-[#FAF6EB] transition-all duration-300 ease-in-out ${
            message.type === "success"
              ? "border border-green-500/30 text-green-700"
              : "border border-red-500/30 text-red-700"
          }`}
          style={{
            animation: "slideUp 0.3s ease-out"
          }}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <span className="text-green-600 text-lg">✓</span>
            ) : (
              <span className="text-red-600 text-lg">✕</span>
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="ml-3 hover:opacity-70 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default AddToCartButton;