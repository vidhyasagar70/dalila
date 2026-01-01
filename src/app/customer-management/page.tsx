"use client";

import { useState } from "react";
import { Marcellus, Jost } from "next/font/google";
import { ChevronDown, ChevronUp, Send, MessageSquare, X, HelpCircle, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Diamond } from "@/lib/api";
import {
  useCustomerManagementData,
  useReplyManagement,
  useHoldManagement,
} from "@/hooks/customer-management";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
});
const jost = Jost({
  variable: "--font-jost",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Types are now exported from hooks
interface CartItem {
  stoneNo: string;
  diamond: Diamond;
  addedAt: string;
  _id: string;
}

interface HoldItem {
  stoneNo: string;
  diamond: Diamond;
  status: string;
  addedAt: string;
  _id: string;
}

interface Query {
  id: string;
  _id: string;
  userId: string;
  stoneNo: string;
  query: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  adminReply?: string;
  repliedAt?: string;
  diamond?: Diamond;
}

export default function CustomerManagementPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Custom hooks for data management with server-side pagination
  const { rows, setRows, loading, error, stats, setStats, pagination, refetch } = 
    useCustomerManagementData(currentPage, itemsPerPage);
  
  const {
    replyModal,
    setReplyModal,
    replyText,
    setReplyText,
    isSubmittingReply,
    handleReplySubmit,
  } = useReplyManagement(setRows);

  const { processingHoldId, handleApproveHold, handleDeclineHold } =
    useHoldManagement(setRows, setStats);

  // Server-side pagination values
  const totalPages = pagination.totalPages;
  const currentRows = rows; // All rows are already paginated by server
  const startIndex = (pagination.currentPage - 1) * pagination.recordsPerPage;

  // Generate page numbers for pagination UI
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (pagination.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pagination.hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const pageNumbers = getPageNumbers();

  // Helper function to safely access Diamond properties
  const getDiamondProp = (
    diamond: Diamond | HoldItem | CartItem | undefined,
    ...keys: string[]
  ): string => {
    if (!diamond) return "-";
    const obj = diamond as Record<string, unknown>;
    for (const key of keys) {
      const value = obj[key];
      if (value !== undefined && value !== null && value !== "") {
        return String(value);
      }
    }
    return "-";
  };

  const toggleRow = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const StatusBadge = ({ status }: { status?: string }) => {
    const s = (status || "").toLowerCase();
    const cls =
      s === "approved"
        ? "bg-green-100 text-green-700 border-green-300"
        : s === "rejected" || s === "declined"
          ? "bg-red-100 text-red-700 border-red-300"
          : "bg-yellow-100 text-yellow-700 border-yellow-300";
    const label = s ? s.charAt(0).toUpperCase() + s.slice(1) : "Pending";
    return (
      <span
        className={`inline-block px-2 py-0.5 text-[11px] border rounded-none ${cls}`}
      >
        {label}
      </span>
    );
  };


  // Pagination is now handled by usePagination hook

  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["ADMIN", "SUPER_ADMIN"]} redirectTo="/">
      <div className="min-h-screen bg-white pt-28 pb-16 mt-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1
            className={`${marcellus.className} text-2xl md:text-3xl text-[#0b1b35] mb-2`}
          >
            Enquiry Management
          </h1>
          <p className={`${jost.className} text-sm text-gray-600 mb-6`}>
            Manage customer hold requests and diamond enquiries
          </p>
          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Total Enquiries",
                value: stats.totalEnquiries,
                caption: "All customer queries received",
              },
              {
                label: "Pending",
                value: stats.pending,
                caption: "Waiting for further action",
              },
              {
                label: "Approved",
                value: stats.approved,
                caption: "All checks completed successfully",
              },
              {
                label: "Rejected",
                value: stats.rejected,
                caption: "Request declined after review",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="border border-gray-200 rounded-none p-4"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-none bg-white border border-gray-200 flex items-center justify-center">
                      {c.label === "Total Enquiries" && (
                        <HelpCircle className="w-[18px] h-[18px] text-gray-700" />
                      )}
                      {c.label === "Pending" && (
                        <Clock className="w-[18px] h-[18px] text-gray-700" />
                      )}
                      {c.label === "Approved" && (
                        <CheckCircle className="w-[18px] h-[18px] text-gray-700" />
                      )}
                      {c.label === "Rejected" && (
                        <XCircle className="w-[18px] h-[18px] text-gray-700" />
                      )}
                    </div>
                  </div>
                  {/* Content: Label, Count, Caption stacked vertically */}
                  <div className="flex-1">
                    <p
                      className={`${jost.className} text-sm font-medium text-gray-800 mb-1`}
                    >
                      {c.label}
                    </p>
                    <p
                      className={`${jost.className} text-3xl font-bold text-gray-900 mb-1`}
                    >
                      {String(c.value ?? 0).padStart(2, "0")}
                    </p>
                    <p
                      className={`${jost.className} text-[11px] text-gray-500 leading-tight`}
                    >
                      {c.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="border border-[#E9E2C6] rounded-none overflow-hidden">
            <div className="hidden md:grid grid-cols-[60px_1.2fr_1.1fr_1.6fr_1.3fr_1fr_1.2fr_1.1fr_1.2fr_0.8fr_0.8fr_80px] items-center bg-[#0b1b35] text-white text-sm px-4 py-3">
              <div>Sr</div>
              <div>Name</div>
              <div>Username</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Company</div>
              <div>Business Type</div>
              <div>VAT Number</div>
              <div>Address</div>
              <div>Cart Items</div>
              <div>Hold Items</div>
              <div>View</div>
            </div>

            {!loading && rows.length === 0 && (
              <div className="p-6 text-center text-sm text-gray-500">
                No records found.
              </div>
            )}

            {(loading ? [] : currentRows).map((row, idx) => (
              <div key={row.id} className="border-t border-[#E9E2C6]">
                {/* Summary Row */}
                <div className="grid md:grid-cols-[60px_1.2fr_1.1fr_1.6fr_1.3fr_1fr_1.2fr_1.1fr_1.2fr_0.8fr_0.8fr_80px] items-center px-4 py-3 text-sm border-b border-[#E9E2C6]">
                  <div className="font-medium text-gray-700">
                    {startIndex + idx + 1}
                  </div>
                  <div className="text-gray-800">{row.name || "-"}</div>
                  <div className="text-gray-700">{row.username || "-"}</div>
                  <div className="text-gray-700 truncate">
                    {row.email || "-"}
                  </div>
                  <div className="text-gray-700">{row.phone || "-"}</div>
                  <div className="text-gray-700">{row.company || "-"}</div>
                  <div className="text-gray-700">{row.businessType || "-"}</div>
                  <div className="text-gray-700">{row.vatNumber || "-"}</div>
                  <div className="text-gray-700 truncate">
                    {row.address || "-"}
                  </div>
                  <div className="text-gray-700">
                    {row.itemsInCart?.length ?? 0}
                  </div>
                  <div className="text-gray-700">
                    {row.holdedItems?.length ?? 0}
                  </div>
                  <div className="flex justify-end pr-2">
                    <button
                      onClick={() => toggleRow(row.id)}
                      className="inline-flex items-center cursor-pointer gap-1 text-[#0b1b35] border border-gray-300 px-2 py-1 rounded-none"
                    >
                      View{" "}
                      {expanded[row.id] ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Detail */}
                {expanded[row.id] && (
                  <div className="bg-white px-4 pb-4 text-sm">
                    {/* Items in cart */}
                    {row.itemsInCart && row.itemsInCart.length > 0 && (
                      <div className="py-3">
                        <div className="overflow-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr>
                                <th colSpan={15}>
                                  <span className="bg-[#0b1b35] text-white font-medium px-4 py-3 text-sm inline-block mb-1">
                                    Items in cart
                                  </span>
                                </th>
                              </tr>
                              <tr className="text-[12px] text-white bg-[#0b1b35] border-b border-[#E9E2C6]">
                                <th className="py-3 px-4 font-medium">Sr no</th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Stone
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Loc
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Lab
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Shape
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Carats
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Color
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Clarity
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Cut
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Pol
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Sym
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Fluor
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Net Rate
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Rap
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Net Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.itemsInCart.map((it, idx) => {
                                const d = it?.diamond || it;
                                return (
                                  <tr
                                    key={idx}
                                    className="border-t border-[#E9E2C6]"
                                  >
                                    <td className="py-2 px-4 whitespace-nowrap text-gray-700">
                                      {idx + 1}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(
                                        d,
                                        "STONE_NO",
                                        "stoneNo",
                                        "STONE",
                                      )}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "LOCATION", "LOC")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "LAB")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "SHAPE")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "CARATS", "carats")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "COLOR")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "CLARITY")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "CUT")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "POL", "POLISH")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "SYM", "SYMMETRY")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "FLOUR", "FLUOR")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "NET_RATE")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "RAP_PRICE")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "NET_VALUE")}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Holded Items */}
                    {row.holdedItems && row.holdedItems.length > 0 && (
                      <div className="py-3">
                        <div className="overflow-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr>
                                <th colSpan={16}>
                                  <span className="bg-[#0b1b35] text-white font-medium px-4 py-3 text-sm inline-block mb-1">
                                    Holded Items
                                  </span>
                                </th>
                              </tr>
                              <tr className="text-[12px] text-white bg-[#0b1b35] border-b border-[#E9E2C6]">
                                <th className="py-3 px-4 font-medium">Sr no</th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Stone
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Loc
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Lab
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Shape
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Carats
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Color
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Clarity
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Cut
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Pol
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Sym
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Fluor
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Net Rate
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Rap
                                </th>
                                <th className="font-medium pr-6 pb-1 text-left">
                                  Net Value
                                </th>
                                <th className="font-medium pr-6 pb-1 text-right">
                                  Status
                                </th>
                                <th className="font-medium pr-6 pb-1 text-right">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.holdedItems.map((it, idx) => {
                                const d = it?.diamond || it;
                                const itemStatus = (
                                  it?.status || "pending"
                                ).toLowerCase();
                                const itemId = it?._id;
                                return (
                                  <tr
                                    key={idx}
                                    className="border-t border-[#E9E2C6]"
                                  >
                                    <td className="py-2 px-4 whitespace-nowrap text-gray-700">
                                      {idx + 1}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(
                                        d,
                                        "STONE_NO",
                                        "stoneNo",
                                        "STONE",
                                      )}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "LOCATION", "LOC")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "LAB")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "SHAPE")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "CARATS", "carats")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "COLOR")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "CLARITY")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "CUT")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "POL", "POLISH")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "SYM", "SYMMETRY")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "FLOUR", "FLUOR")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "NET_RATE")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "RAP_PRICE")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-gray-700">
                                      {getDiamondProp(d, "NET_VALUE")}
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-right">
                                      <StatusBadge status={it?.status} />
                                    </td>
                                    <td className="py-2 pr-6 whitespace-nowrap text-right">
                                      {itemStatus === "pending" && (
                                        <div className="flex items-center justify-end gap-2">
                                          <button
                                            onClick={() =>
                                              handleApproveHold(itemId)
                                            }
                                            disabled={
                                              processingHoldId === itemId
                                            }
                                            className="px-3 py-1 bg-green-600  cursor-pointer text-white text-xs rounded-none hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                            {processingHoldId === itemId
                                              ? "..."
                                              : "Approve"}
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDeclineHold(itemId)
                                            }
                                            disabled={
                                              processingHoldId === itemId
                                            }
                                            className="px-3 py-1 cursor-pointer bg-red-600 text-white text-xs rounded-none hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                            {processingHoldId === itemId
                                              ? "..."
                                              : "Decline"}
                                          </button>
                                        </div>
                                      )}
                                      {(itemStatus === "approved" ||
                                        itemStatus === "rejected") && (
                                        <span className="text-xs text-gray-500">
                                          No actions
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Enquiries */}
                    {row.enquiries && row.enquiries.length > 0 && (
                      <div className="py-3">
                        <p
                          className={`${jost.className} text-gray-800 font-medium mb-2`}
                        >
                          Enquiries
                        </p>
                        <div className="space-y-3">
                          {row.enquiries.map((q, i) => {
                            const stone = String(
                              q?.stoneNo ||
                                (q?.diamond as Diamond | undefined)?.STONE_NO ||
                                "-",
                            );
                            const query = String(q?.query || "-");
                            const status = String(q?.status || "pending");
                            const createdAt = q?.createdAt
                              ? new Date(q.createdAt).toLocaleString()
                              : "";
                            const adminReply = q?.adminReply;
                            const repliedAt = q?.repliedAt
                              ? new Date(q.repliedAt).toLocaleString()
                              : "";
                            const diamond = q?.diamond;

                            return (
                              <div
                                key={i}
                                className="border border-[#E9E2C6] rounded-none p-4 bg-gray-50 [color-scheme:light]"
                              >
                                {/* Query Header */}
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <MessageSquare
                                      size={16}
                                      className="text-blue-600"
                                    />
                                    <span className="font-medium text-gray-900">
                                      Stone: {stone}
                                    </span>
                                    <StatusBadge status={status} />
                                  </div>
                                  <span className="text-xs text-gray-600">
                                    {createdAt}
                                  </span>
                                </div>

                                {/* Diamond Details (if available) */}
                                {diamond && (
                                  <div className="mb-3 p-3 bg-white rounded-none border border-[#E9E2C6] [color-scheme:light]">
                                    <p className="text-xs font-medium text-gray-700 mb-2">
                                      Diamond Details
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                      <div>
                                        <span className="text-gray-600">
                                          Shape:
                                        </span>{" "}
                                        <span className="font-medium text-gray-900">
                                          {String(
                                            (diamond as Diamond).SHAPE || "-",
                                          )}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Carats:
                                        </span>{" "}
                                        <span className="font-medium text-gray-900">
                                          {String(
                                            (diamond as Diamond).CARATS || "-",
                                          )}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Color:
                                        </span>{" "}
                                        <span className="font-medium text-gray-900">
                                          {String(
                                            (diamond as Diamond).COLOR || "-",
                                          )}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Clarity:
                                        </span>{" "}
                                        <span className="font-medium text-gray-900">
                                          {String(
                                            (diamond as Diamond).CLARITY || "-",
                                          )}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Cut:
                                        </span>{" "}
                                        <span className="font-medium text-gray-900">
                                          {String(
                                            (diamond as Diamond).CUT || "-",
                                          )}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Lab:
                                        </span>{" "}
                                        <span className="font-medium text-gray-900">
                                          {String(
                                            (diamond as Diamond).LAB || "-",
                                          )}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Location:
                                        </span>{" "}
                                        <span className="font-medium text-gray-900">
                                          {String(
                                            (diamond as Diamond).LOCATION ||
                                              "-",
                                          )}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Net Value:
                                        </span>{" "}
                                        <span className="font-medium text-gray-900">
                                          $
                                          {String(
                                            (diamond as Diamond).NET_VALUE ||
                                              "-",
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Customer Query */}
                                <div className="mb-3">
                                  <p className="text-xs font-medium text-gray-700 mb-1 bg-white px-1">
                                    Customer Query:
                                  </p>
                                  <p className="text-sm text-gray-900 bg-white p-2 rounded-none border border-[#E9E2C6] [color-scheme:light]">
                                    {query}
                                  </p>
                                </div>

                                {/* Admin Reply (if exists) */}
                                {adminReply && (
                                  <div className="mb-3">
                                    <p className="text-xs font-medium text-gray-700 mb-1 bg-white px-1">
                                      Dalila Diamond:
                                    </p>
                                    <p className="text-sm text-gray-900 bg-green-50 p-2 rounded-none border border-green-200 [color-scheme:light]">
                                      {adminReply}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1 bg-white px-1">
                                      Replied on: {repliedAt}
                                    </p>
                                  </div>
                                )}

                                {/* Reply Button */}
                                {status !== "replied" && (
                                  <div className="flex justify-end">
                                    <button
                                      onClick={() =>
                                        setReplyModal({
                                          open: true,
                                          queryId: q.id || q._id,
                                          stoneNo: stone,
                                        })
                                      }
                                      className="flex items-center gap-2 px-4 py-2 bg-[#030822] text-white text-sm rounded-none cursor-pointer hover:bg-[#020615] transition-colors"
                                    >
                                      <Send size={14} />
                                      Reply
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 justify-center mt-6 text-sm">
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={!pagination.hasPrevPage || loading}
                className="border px-3 py-1 rounded-none border-gray-300 text-gray-700 hover:bg-[#EAD9BE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>

              {/* Page Numbers */}
              {pageNumbers.map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && goToPage(page)
                  }
                  disabled={page === "..." || loading}
                  className={`border px-3 py-1 rounded-none transition-colors ${
                    page === currentPage
                      ? "bg-[#EAD9BE] text-gray-900 border-[#EAD9BE] font-semibold"
                      : page === "..."
                        ? "border-transparent text-gray-400 cursor-default"
                        : "border-gray-300 text-gray-700 hover:bg-[#EAD9BE]"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={!pagination.hasNextPage || loading}
                className="border px-3 py-1 rounded-none border-gray-300 text-gray-700 hover:bg-[#EAD9BE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Reply Modal */}
        {replyModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setReplyModal(null);
              setReplyText("");
            }}
          >
            <div
              className="bg-white rounded-none shadow-xl w-full max-w-md [color-scheme:light]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#0b1b35] text-white px-6 py-4 rounded-none flex items-center justify-between">
                <h3 className={`${jost.className} text-lg font-semibold`}>
                  Reply to Enquiry
                </h3>
                <button
                  onClick={() => {
                    setReplyModal(null);
                    setReplyText("");
                  }}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label
                    className={`${jost.className} block text-sm font-medium text-gray-900 mb-2`}
                  >
                    Stone Number
                  </label>
                  <input
                    type="text"
                    value={replyModal.stoneNo}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-none bg-gray-50 text-gray-900 [color-scheme:light]"
                  />
                </div>

                <div>
                  <label
                    className={`${jost.className} block text-sm font-medium text-gray-900 mb-2`}
                  >
                    Your Reply <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Enter your reply here..."
                    rows={5}
                    className={`${jost.className} w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#0b1b35] resize-none bg-white text-gray-900 placeholder:text-gray-500 [color-scheme:light]`}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 rounded-none flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setReplyModal(null);
                    setReplyText("");
                  }}
                  className={`${jost.className} px-4 py-2 border border-gray-300 rounded-none text-gray-900 hover:bg-gray-100 transition-colors`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplySubmit}
                  disabled={isSubmittingReply || !replyText.trim()}
                  className={`${jost.className} px-4 py-2 bg-[#0b1b35] text-white rounded-none hover:bg-[#08142a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                >
                  {isSubmittingReply ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
