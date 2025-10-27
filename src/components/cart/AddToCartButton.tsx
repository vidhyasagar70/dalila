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
    // Check authentication first
    const token = getAuthToken();
    if (!token || token.trim() === "") {
      setMessage({
        type: "error",
        text: "Please login to add items to cart",
      });
      setTimeout(() => setMessage(null), 3000);
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

      console.log("Adding stones to cart:", selectedStoneNumbers);

      // Add all selected diamonds to cart
      const results = await Promise.allSettled(
        selectedStoneNumbers.map((stoneNo) => cartApi.add(stoneNo))
      );

      console.log("Cart API results:", results);

      // Count successful and failed additions
      const successful = results.filter(
        (r) => r.status === "fulfilled" && (r.value as { success?: boolean })?.success
      );
      const failed = results.length - successful.length;

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
      console.error("Error adding to cart:", error);
      
      // Check if it's an authentication error
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 401) {
          setMessage({
            type: "error",
            text: "Session expired. Please login again.",
          });
        } else {
          setMessage({
            type: "error",
            text: "An error occurred while adding to cart.",
          });
        }
      } else {
        setMessage({
          type: "error",
          text: "An error occurred while adding to cart.",
        });
      }
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="relative inline-block">
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

      {/* Success/Error Message Popup */}
      {message && (
        <div
          className={`absolute top-full mt-2 right-0 px-4 py-2.5 rounded shadow-lg text-sm font-medium z-50 min-w-[250px] animate-fade-in flex items-center justify-between ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/30 text-green-700"
              : "bg-red-500/10 border border-red-500/30 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <span className="text-#FAF6EB">✓</span>
            ) : (
              <span className="text-red-500">✕</span>
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="ml-2 hover:opacity-70"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;