import React, { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { cartApi } from "@/lib/api";

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
    if (selectedStoneNumbers.length === 0) return;

    try {
      setIsAdding(true);
      setMessage(null);

      console.log("Adding stones to cart:", selectedStoneNumbers);

      const results = await Promise.allSettled(
        selectedStoneNumbers.map((stoneNo) => cartApi.add(stoneNo))
      );

      console.log("Cart API results:", results);

      const successful = results.filter(
        (r) => r.status === "fulfilled" && (r.value as { success?: boolean })?.success
      );
      const failed = results.length - successful.length;

      if (successful.length > 0) {
        setMessage({
          type: "success",
          text: `${successful.length} diamond(s) added to cart!${failed > 0 ? ` (${failed} failed)` : ""}`,
        });

        // Dispatch cart updated event
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cart-updated"));
        }

        // Call the optional callback
        if (onAddToCart) {
          onAddToCart();
        }

        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: "error",
          text: "Failed to add diamonds to cart. Please try again.",
        });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage({
        type: "error",
        text: "An error occurred while adding to cart.",
      });
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
            : "bg-[#000033]"
        }`}
      >
        {isAdding ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </>
        )}
      </button>

      {/* Success/Error Message Popup */}
      {message && (
        <div
          className={`absolute top-full mt-2 left-0 px-4 py-2.5 rounded shadow-sm text-sm font-medium z-50 ${
            message.type === "success"
              ? "bg-[#FAF6EB] text-[#000033]"
              : "bg-[#FAF6EB] text-[#000033]"
          }`}
          style={{ minWidth: 'max-content' }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;