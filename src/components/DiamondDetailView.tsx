import React, { useState } from "react";
import Image from "next/image";

import { ArrowLeft, Play, Loader2, Check, AlertCircle ,X} from "lucide-react";
// import { X, Share2, Download, Heart, Search, ExternalLink, FileText, Play, Loader2, Check, AlertCircle } from "lucide-react";
import type { DiamondData } from "@/types/Diamondtable";
import { cartApi } from "@/lib/api";

interface DiamondDetailViewProps {
    diamond: DiamondData;
    onClose: () => void;
}

const DiamondDetailView: React.FC<DiamondDetailViewProps> = ({
    diamond,
    onClose,
}) => {
    // const [quantity, setQuantity] = useState(1);
    const [viewMode, setViewMode] = useState<"image" | "video">("image");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartMessage, setCartMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const formatCurrency = (value: string | number) => {
        const num = parseFloat(String(value));
        return isNaN(num)
            ? "N/A"
            : `$${num.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              })} USD`;
    };

    const handleAddToCart = async () => {
        try {
            setIsAddingToCart(true);
            setCartMessage(null);

            const response = await cartApi.add(diamond.STONE_NO);

            if (response?.success) {
                setCartMessage({
                    type: "success",
                    text: `${diamond.STONE_NO} added to cart successfully!`,
                });

                // Dispatch cart update event for header to update cart count
                if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("cart-updated"));
                }

                // Auto-hide success message after 3 seconds
                setTimeout(() => setCartMessage(null), 3000);
            } else {
                setCartMessage({
                    type: "error",
                    text: response?.message || "Failed to add to cart",
                });
            }
        } catch (error: unknown) {
            console.error("Error adding to cart:", error);

            // Handle specific error messages
            let errorMessage = "Failed to add to cart. Please try again.";
            if (error && typeof error === "object" && "response" in error) {
                const err = error as {
                    response?: { status?: number; data?: { error?: string } };
                    message?: string;
                };
                if (err.response?.status === 401) {
                    errorMessage = "Please log in to add items to cart.";
                } else if (err.response?.data?.error) {
                    errorMessage = err.response.data.error;
                } else if (err.message) {
                    errorMessage = err.message;
                }
            }

            setCartMessage({
                type: "error",
                text: errorMessage,
            });
        } finally {
            setIsAddingToCart(false);
        }
    };

    const InfoItem = ({
        icon,
        label,
        value,
        description,
    }: {
        icon: React.ReactNode;
        label: string;
        value: string;
        description: string;
    }) => (
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
                {icon}
                <span className="text-xs font-medium">{label}</span>
            </div>
            <p className="text-base font-semibold text-gray-900">{value}</p>
            {description && (
                <p className="text-xs text-gray-500">{description}</p>
            )}
        </div>
    );

    const DetailTable = ({
        title,
        data,
    }: {
        title: string;
        data: [string, string | number][];
    }) => (
        <div className="bg-white rounded overflow-hidden border-2 border-[#F9F1E3]">
            <div className="bg-[#050C3A] text-white px-4 py-2.5">
                <h3 className="font-semibold text-sm">{title}</h3>
            </div>
            <div className="divide-y-2 divide-[#F9F1E3]">
                {data.map(([key, value], idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-2 hover:bg-gray-50"
                    >
                        <div className="px-4 py-2.5 bg-gray-50">
                            <p className="text-sm font-medium text-gray-700">
                                {key}
                            </p>
                        </div>
                        <div className="px-4 py-2.5">
                            <p className="text-sm text-gray-900">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div
            className="fixed left-0 top-27 mb-10 w-full flex items-center justify-center z-50  overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full  my-8 max-h-[95vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-[#050C3A] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-10">
    <button
        onClick={onClose}
        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
    >
        <ArrowLeft size={20} />
        <span className="text-xl font-bold">Back</span>
    </button>
</div>

                <div className="p-6">
                    {/* Cart Message */}
                    {cartMessage && (
                        <div
                            className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-fade-in ${
                                cartMessage.type === "success"
                                    ? "bg-green-500/10 border border-green-500/30"
                                    : "bg-red-500/10 border border-red-500/30"
                            }`}
                        >
                            {cartMessage.type === "success" ? (
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            )}
                            <p
                                className={
                                    cartMessage.type === "success"
                                        ? "text-green-400"
                                        : "text-red-400"
                                }
                            >
                                {cartMessage.text}
                            </p>
                            <button
                                onClick={() => setCartMessage(null)}
                                className={`ml-auto ${cartMessage.type === "success" ? "text-green-400 hover:text-green-300" : "text-red-400 hover:text-red-300"}`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Top Section: Images and Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* LEFT - Single Image/Video */}
                        <div className="space-y-3">
                            {/* View Mode Toggle */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode("image")}
                                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                                        viewMode === "image"
                                            ? "bg-[#050C3A] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Image
                                </button>
                                <button
                                    onClick={() => setViewMode("video")}
                                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                                        viewMode === "video"
                                            ? "bg-[#050C3A] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Video
                                </button>
                            </div>

                            {/* Main Display Area */}
                            <div className="relative bg-gray-100 rounded-md border border-gray-200 p-6">
                                <div className="absolute top-3 right-3 flex gap-2 z-10">
                                    {/* <button className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-50 border border-gray-200">
                    <Share2 size={16} className="text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-50 border border-gray-200">
                    <Download size={16} className="text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-50 border border-gray-200">
                    <Heart size={16} className="text-gray-700" />
                  </button> */}
                                </div>

                                {viewMode === "image" ? (
                                    diamond.REAL_IMAGE ? (
                                        <div className="relative w-full aspect-square">
                                            <Image
                                                src={diamond.REAL_IMAGE}
                                                alt={diamond.STONE_NO}
                                                fill
                                                className="object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-square flex items-center justify-center text-gray-400">
                                            No Image Available
                                        </div>
                                    )
                                ) : diamond.MP4 ? (
                                    <div className="relative w-full aspect-square">
                                        <video
                                            src={diamond.MP4}
                                            controls
                                            className="w-full h-full object-contain"
                                        >
                                            Your browser does not support the
                                            video tag.
                                        </video>
                                    </div>
                                ) : (
                                    <div className="w-full aspect-square flex items-center justify-center text-gray-400">
                                        <div className="text-center">
                                            <Play
                                                size={48}
                                                className="mx-auto mb-2 text-gray-300"
                                            />
                                            <p>No Video Available</p>
                                        </div>
                                    </div>
                                )}

                                {/* <button className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 border border-gray-200">
                  <Search size={14} className="text-gray-700" />
                  <span className="text-xs text-gray-700 font-medium">Search Similar</span>
                </button> */}
                            </div>
                        </div>

                        {/* RIGHT - Diamond Info */}
                        <div className="space-y-4">
                            {/* Title Section with Rating */}
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 mb-1">
                                        Diamond Images
                                    </p>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                        {diamond.SHAPE}
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Expertly cut for exceptional sparkle and
                                        clarity.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-yellow-400 text-base">
                                        ★★★★★
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        5.0(258)
                                    </span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="py-2">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-gray-900">
                                        {formatCurrency(diamond.NET_VALUE)}
                                    </span>
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="bg-white rounded-md border-t-2 border-[#F9F1E3] p-4">
                                <h3 className="text-base font-bold text-gray-900 mb-4">
                                    Basic Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoItem
                                        icon={
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                            </svg>
                                        }
                                        label="Shape"
                                        value={diamond.SHAPE}
                                        description="Classic cut known for maximum sparkle."
                                    />
                                    <InfoItem
                                        icon={
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                />
                                            </svg>
                                        }
                                        label="Carat"
                                        value={String(
                                            diamond.CARATS || diamond.SIZE
                                        )}
                                        description="Measures a diamond's size and weight."
                                    />
                                    <InfoItem
                                        icon={
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <rect
                                                    x="3"
                                                    y="3"
                                                    width="18"
                                                    height="18"
                                                    rx="2"
                                                />
                                            </svg>
                                        }
                                        label="Color"
                                        value={diamond.COLOR}
                                        description="Grades a diamond's whiteness and purity."
                                    />
                                    <InfoItem
                                        icon={
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                            </svg>
                                        }
                                        label="Clarity"
                                        value={diamond.CLARITY}
                                        description="Indicates a diamond's internal and external flaws."
                                    />
                                </div>
                            </div>

                            {/* Quantity and Add to Cart - Same Row */}
                            <div className="border-t-2 border-[#F9F1E3] pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-3">
                                        {/* <span className="text-sm font-medium text-gray-700">Quantity</span> */}
                                        <div className="flex items-center border-2 border-[#F9F1E3] rounded overflow-hidden">
                                            {/* <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 hover:bg-gray-100 text-gray-700 font-medium"
                        disabled={isAddingToCart}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-10 text-center border-x-2 border-[#F9F1E3] py-1.5 text-sm"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 hover:bg-gray-100 text-gray-700 font-medium"
                        disabled={isAddingToCart}
                      >
                        +
                      </button> */}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAddingToCart}
                                        className="flex-1 bg-[#050C3A] text-white py-2.5 rounded font-semibold hover:bg-[#030822] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isAddingToCart ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Adding...
                                            </>
                                        ) : (
                                            "ADD TO CART"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Tables Section - 3 Columns with Key-Value Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Details */}
                        <DetailTable
                            title="Details"
                            data={[
                                ["Packet No", diamond.STONE_NO || "N/A"],
                                ["Report No", diamond.REPORT_NO || "N/A"],
                                ["Lab", diamond.LAB || "N/A"],
                                ["Rap.($)", diamond.RAP_PRICE || "N/A"],
                                ["Shape", diamond.SHAPE || "N/A"],
                                [
                                    "Carat",
                                    diamond.CARATS || diamond.SIZE || "N/A",
                                ],
                                ["Color", diamond.COLOR || "N/A"],
                                ["Clarity", diamond.CLARITY || "N/A"],
                                ["Shade", diamond.TINGE || "NO BGM"],
                                ["Cut", diamond.CUT || "N/A"],
                                ["Polish", diamond.POL || "N/A"],
                                ["Symmetry", diamond.SYM || "N/A"],
                                ["Fluorescence", diamond.FLOUR || "N/A"],
                            ]}
                        />

                        {/* Measurements */}
                        <DetailTable
                            title="Measurements"
                            data={[
                                ["Table%", diamond.TABLE_PER || "N/A"],
                                ["Depth%", diamond.DEPTH_PER || "N/A"],
                                [
                                    "Length",
                                    diamond.MEASUREMENTS?.split(
                                        "x"
                                    )[0]?.trim() || "N/A",
                                ],
                                [
                                    "Width",
                                    diamond.MEASUREMENTS?.split(
                                        "x"
                                    )[1]?.trim() || "N/A",
                                ],
                                [
                                    "Depth",
                                    diamond.MEASUREMENTS?.split(
                                        "x"
                                    )[2]?.trim() || "N/A",
                                ],
                                ["Ratio", "-"],
                                ["Crown Angle", diamond.CROWN_ANGLE || "N/A"],
                                ["Crown Height", diamond.CROWN_HEIGHT || "N/A"],
                                ["Pav Angle", diamond.PAVILLION_ANGLE || "N/A"],
                                [
                                    "Pav Height",
                                    diamond.PAVILLION_HEIGHT || "N/A",
                                ],
                                ["Girdle", "THN"],
                                ["Culet", "NON"],
                            ]}
                        />

                        {/* Inclusion Details */}
                        <DetailTable
                            title="Inclusion Details"
                            data={[
                                ["Center Natts", diamond.CN || "MINOR"],
                                ["Side Natts", diamond.SN || "NONE"],
                                ["Center White", diamond.CW || "VERY SLIGHT"],
                                ["Side White", diamond.SW || "SLIGHT"],
                                ["Table Open", "TO-O"],
                                ["Crown Open", "CO-O"],
                                ["Pavilion Open", "PO-O"],
                                ["Eye Clean", "100%"],
                                ["Heart & Arrow", diamond.HA || "-"],
                                ["Brilliancy", "EX"],
                                ["Type2 Cert", "-"],
                                ["Country Of Origin", "-"],
                            ]}
                        />
                    </div>

                    {/* Comments Section */}
                    <div className="mt-6 bg-white rounded overflow-hidden border-2 border-[#F9F1E3]">
                        <div className="bg-[#050C3A] text-white px-4 py-2.5">
                            <h3 className="font-semibold text-sm">
                                Additional Information
                            </h3>
                        </div>
                        <div className="divide-y-2 divide-[#F9F1E3]">
                            <div className="grid grid-cols-2 hover:bg-gray-50">
                                <div className="px-4 py-3 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-700">
                                        Key to Symbols
                                    </p>
                                </div>
                                <div className="px-4 py-3">
                                    <p className="text-sm text-gray-900">
                                        {diamond.KEY_TO_SYMBOLS || "N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 hover:bg-gray-50">
                                <div className="px-4 py-3 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-700">
                                        Report Comments
                                    </p>
                                </div>
                                <div className="px-4 py-3">
                                    <p className="text-sm text-gray-900">
                                        {diamond.REPORT_COMMENTS || "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 hover:bg-gray-50">
                                <div className="px-4 py-3 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-700">
                                        HRC Comments
                                    </p>
                                </div>
                                <div className="px-4 py-3">
                                    <p className="text-sm text-gray-900">
                                        {diamond.COMMENTS_1 || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media Links */}
                    {/* {(diamond.CERTI_PDF || diamond.MP4 || diamond.DNA || diamond.ARROW_IMAGE || diamond.HEART_IMAGE) && (
            <div className="mt-6 bg-white rounded border-2 border-[#F9F1E3] p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Documents & Media</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {diamond.CERTI_PDF && (
                  <a
                    href={diamond.CERTI_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-[#050C3A] hover:opacity-80 p-3 bg-gray-50 rounded text-center"
                  >
                    <FileText size={24} />
                    <span className="text-xs font-medium">Certificate</span>
                  </a>
                )}
                {diamond.MP4 && (
                  <a
                    href={diamond.MP4}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-[#050C3A] hover:opacity-80 p-3 bg-gray-50 rounded text-center"
                  >
                    <Play size={24} />
                    <span className="text-xs font-medium">Video</span>
                  </a>
                )}
                {diamond.ARROW_IMAGE && (
                  <a
                    href={diamond.ARROW_IMAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-[#050C3A] hover:opacity-80 p-3 bg-gray-50 rounded text-center"
                  >
                    <ExternalLink size={24} />
                    <span className="text-xs font-medium">Arrow Image</span>
                  </a>
                )}
                {diamond.HEART_IMAGE && (
                  <a
                    href={diamond.HEART_IMAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-[#050C3A] hover:opacity-80 p-3 bg-gray-50 rounded text-center"
                  >
                    <ExternalLink size={24} />
                    <span className="text-xs font-medium">Heart Image</span>
                  </a>
                )}
                {diamond.DNA && (
                  <a
                    href={diamond.DNA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-[#050C3A] hover:opacity-80 p-3 bg-gray-50 rounded text-center"
                  >
                    <ExternalLink size={24} />
                    <span className="text-xs font-medium">DNA Report</span>
                  </a>
                )}
              </div>
            </div>
          )} */}
                </div>
            </div>
        </div>
    );
};

export default DiamondDetailView;
