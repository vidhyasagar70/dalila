"use client";
import { useEffect, useState } from "react";
import { Marcellus, Jost } from "next/font/google";
import { ChevronDown, ChevronUp, Send, MessageSquare, X } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { adminApi } from "@/lib/api";
import toast from "react-hot-toast";

const marcellus = Marcellus({ variable: "--font-marcellus", weight: "400", subsets: ["latin"] });
const jost = Jost({ variable: "--font-jost", weight: ["400","500","600","700"], subsets: ["latin"] });

type Row = {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  vatNumber?: string;
  address?: string;
  itemsInCart?: any[];
  holdedItems?: any[];
  enquiries?: any[];
};

export default function CustomerManagementPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [stats, setStats] = useState({ totalEnquiries: 0, pending: 0, approved: 0, rejected: 0 });
  const [replyModal, setReplyModal] = useState<{ open: boolean; queryId: string; stoneNo: string } | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersRes, cartsRes, holdsAllRes, holdsPendingRes, holdsApprovedRes, holdsRejectedRes, queriesRes] = await Promise.all([
          adminApi.getAllUsers({ page: 1, limit: 100 }),
          adminApi.getAllCarts(),
          adminApi.getAllHolds(),
          adminApi.getAllHolds("pending"),
          adminApi.getAllHolds("approved"),
          adminApi.getAllHolds("rejected"),
          adminApi.getAllQueries(),
        ]);

        // Robust unwrapping of API responses
        const unwrap = (res: any) => (res?.data?.data ?? res?.data ?? res ?? null);

        const usersData = unwrap(usersRes);
        const cartsData = unwrap(cartsRes);
        const holdsAllData = unwrap(holdsAllRes);
        const holdsPendingData = unwrap(holdsPendingRes);
        const holdsApprovedData = unwrap(holdsApprovedRes);
        const holdsRejectedData = unwrap(holdsRejectedRes);
        const queriesData = unwrap(queriesRes);

        // Users
        const users = (usersData?.users ?? usersData?.data ?? (Array.isArray(usersData) ? usersData : []) ?? []) as any[];

        // Carts: admin/all returns array with shape { cart: {..., userId}, user: { userId, ... }, totalItems }
        const cartsArr = (cartsData?.carts ?? cartsData?.data ?? (Array.isArray(cartsData) ? cartsData : []) ?? []) as any[];

        // Holds: admin/all returns array with shape { hold: {..., userId, items: [...]}, user: {...} }
        const holdsAll = (holdsAllData?.holds ?? holdsAllData?.data ?? (Array.isArray(holdsAllData) ? holdsAllData : []) ?? []) as any[];

        // Queries: admin/all returns data.groupedQueries -> [ { email, queries: [...] } ]
        let queries: any[] = [];
        if (queriesData?.groupedQueries && Array.isArray(queriesData.groupedQueries)) {
          queries = queriesData.groupedQueries.flatMap((g: any) => Array.isArray(g.queries) ? g.queries : []);
        } else if (queriesData?.queries && Array.isArray(queriesData.queries)) {
          queries = queriesData.queries;
        } else if (Array.isArray(queriesData)) {
          queries = queriesData;
        }

        // Build lookup maps by userId
        const cartByUser: Record<string, any[]> = {};
        cartsArr.forEach((c: any) => {
          const uid = c.cart?.userId || c.user?.userId || c.user?._id || c.userId || c.ownerId;
          if (!uid) return;
          const items = c.cart?.items || c.items || [];
          items.forEach((it: any) => {
            const item = it?.diamond || it;
            if (!cartByUser[uid]) cartByUser[uid] = [];
            cartByUser[uid].push(item);
          });
        });

        const holdsByUser: Record<string, any[]> = {};
        holdsAll.forEach((h: any) => {
          const uid = h.hold?.userId || h.user?.userId || h.user?._id || h.userId || h.ownerId;
          if (!uid) return;
          const items = h.hold?.items || h.items || [];
          items.forEach((it: any) => {
            const item = { ...(it?.diamond || it), status: it?.status, addedAt: it?.addedAt, _id: it?._id };
            if (!holdsByUser[uid]) holdsByUser[uid] = [];
            holdsByUser[uid].push(item);
          });
        });

        const queriesByUser: Record<string, any[]> = {};
        queries.forEach((q: any) => {
          const uid = q.userId || q.user?._id || q.user;
          if (!uid) return;
          queriesByUser[uid] = queriesByUser[uid] || [];
          queriesByUser[uid].push(q);
        });

        // Compose table rows from users
        const composed: Row[] = (users || []).map((u: any) => ({
          id: u.id || u._id || u.userId,
          name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || u.email,
          username: u.username,
          email: u.email,
          phone: u.customerData?.phoneNumber,
          company: u.customerData?.businessInfo?.companyName,
          businessType: u.customerData?.businessInfo?.businessType,
          vatNumber: u.customerData?.businessInfo?.vatNumber,
          address: [
            u.customerData?.address?.street,
            u.customerData?.address?.city,
            u.customerData?.address?.country,
          ].filter(Boolean).join(", "),
          itemsInCart: cartByUser[u.id || u._id || u.userId] || [],
          holdedItems: holdsByUser[u.id || u._id || u.userId] || [],
          enquiries: queriesByUser[u.id || u._id || u.userId] || [],
        }));

        if (!mounted) return;
        setRows(composed);

        // Count holds by status robustly, supporting either filteredItems or full items list
        const countStatus = (dataset: any, status: string) => {
          const arr = (dataset?.holds ?? dataset?.data ?? (Array.isArray(dataset) ? dataset : [])) as any[];
          if (!Array.isArray(arr)) return 0;
          return arr.reduce((sum, h) => {
            if (Array.isArray(h.filteredItems)) return sum + h.filteredItems.length;
            const items = h.hold?.items || h.items || [];
            return sum + items.filter((it: any) => it?.status === status).length;
          }, 0);
        };

        setStats({
          totalEnquiries: queries.length,
          pending: countStatus(holdsPendingData, "pending"),
          approved: countStatus(holdsApprovedData, "approved"),
          rejected: countStatus(holdsRejectedData, "rejected"),
        });
      } catch (e: any) {
        console.error("Failed to load admin data", e);
        if (mounted) setError(e?.message || "Failed to load data");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAll();
    return () => { mounted = false; };
  }, []);

  const toggleRow = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReplySubmit = async () => {
    if (!replyModal || !replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    try {
      setIsSubmittingReply(true);
      const response = await adminApi.replyToQuery(replyModal.queryId, replyText.trim());

      if (response?.success) {
        toast.success("Reply sent successfully!");
        setReplyModal(null);
        setReplyText("");
        // Refresh data
        window.location.reload();
      } else {
        toast.error(response?.message || "Failed to send reply");
      }
    } catch (error: any) {
      console.error("Error sending reply:", error);
      toast.error(error?.response?.data?.message || "Failed to send reply");
    } finally {
      setIsSubmittingReply(false);
    }
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
    return <span className={`inline-block px-2 py-0.5 text-[11px] border rounded ${cls}`}>{label}</span>;
  };

  const get = (obj: any, key: string) => (obj ? obj[key] ?? obj[key.toUpperCase?.()] ?? obj[key.toLowerCase?.()] : undefined);

  const renderDiamondRow = (d: any, extraRight?: React.ReactNode) => {
    const stone = d?.STONE_NO || d?.stoneNo || d?.STONE || "-";
    const loc = d?.LOCATION || d?.LOC || "-";
    const lab = d?.LAB || "-";
    const shape = d?.SHAPE || "-";
    const carats = d?.CARATS || d?.carats || "-";
    const color = d?.COLOR || "-";
    const clarity = d?.CLARITY || "-";
    const cut = d?.CUT || "-";
    const pol = d?.POL || d?.POLISH || "-";
    const sym = d?.SYM || d?.SYMMETRY || "-";
    const fluor = d?.FLOUR || d?.FLUOR || "-";
    const netRate = d?.NET_RATE || "-";
    const rap = d?.RAP_PRICE || "-";
    const netVal = d?.NET_VALUE || "-";
    return (
      <tr className="border-t border-gray-200">
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{stone}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{loc}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{lab}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{shape}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{carats}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{color}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{clarity}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{cut}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{pol}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{sym}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{fluor}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{netRate}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{rap}</td>
        <td className="py-2 pr-6 whitespace-nowrap text-gray-700">{netVal}</td>
        {extraRight && <td className="py-2 pr-6 whitespace-nowrap text-right">{extraRight}</td>}
      </tr>
    );
  };

  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["ADMIN"]} redirectTo="/">
    <div className="min-h-screen bg-white pt-28 pb-16 mt-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className={`${marcellus.className} text-2xl md:text-3xl text-[#0b1b35] mb-2`}>Enquiry Management</h1>
        <p className={`${jost.className} text-sm text-gray-600 mb-6`}>Manage customer hold requests and diamond enquiries</p>
        {error && (<div className="mb-4 text-sm text-red-600">{error}</div>)}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Enquiries", value: stats.totalEnquiries, caption: "All customer queries received" },
            { label: "Pending", value: stats.pending, caption: "Waiting for further action" },
            { label: "Approved", value: stats.approved, caption: "All checks completed successfully" },
            { label: "Rejected", value: stats.rejected, caption: "Request declined after review" },
          ].map((c) => (
            <div key={c.label} className="border border-gray-200 rounded-md p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                    {c.label === "Total Enquiries" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                      </svg>
                    )}
                    {c.label === "Pending" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    )}
                    {c.label === "Approved" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    )}
                    {c.label === "Rejected" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                    )}
                  </div>
                </div>
                {/* Content: Label, Count, Caption stacked vertically */}
                <div className="flex-1">
                  <p className={`${jost.className} text-sm font-medium text-gray-800 mb-1`}>{c.label}</p>
                  <p className={`${jost.className} text-3xl font-bold text-gray-900 mb-1`}>{String(c.value ?? 0).padStart(2, "0")}</p>
                  <p className={`${jost.className} text-[11px] text-gray-500 leading-tight`}>{c.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
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

          {(!loading && rows.length === 0) && (
            <div className="p-6 text-center text-sm text-gray-500">No records found.</div>
          )}

          {(loading ? [] : rows).map((row, idx) => (
            <div key={row.id} className="border-t border-gray-200">
              {/* Summary Row */}
              <div className="grid md:grid-cols-[60px_1.2fr_1.1fr_1.6fr_1.3fr_1fr_1.2fr_1.1fr_1.2fr_0.8fr_0.8fr_80px] items-center px-4 py-3 text-sm">
                <div className="font-medium text-gray-700">{idx + 1}</div>
                <div className="text-gray-800">{row.name || "-"}</div>
                <div className="text-gray-700">{row.username || "-"}</div>
                <div className="text-gray-700 truncate">{row.email || "-"}</div>
                <div className="text-gray-700">{row.phone || "-"}</div>
                <div className="text-gray-700">{row.company || "-"}</div>
                <div className="text-gray-700">{row.businessType || "-"}</div>
                <div className="text-gray-700">{row.vatNumber || "-"}</div>
                <div className="text-gray-700 truncate">{row.address || "-"}</div>
                <div className="text-gray-700">{row.itemsInCart?.length ?? 0}</div>
                <div className="text-gray-700">{row.holdedItems?.length ?? 0}</div>
                <div className="flex justify-end pr-2">
                  <button onClick={() => toggleRow(row.id)} className="inline-flex items-center gap-1 text-[#0b1b35] border border-gray-300 px-2 py-1 rounded-md">
                    View {expanded[row.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Expanded Detail */}
              {expanded[row.id] && (
                <div className="bg-white px-4 pb-4 text-sm">
                  {/* Items in cart */}
                  {row.itemsInCart && row.itemsInCart.length > 0 && (
                    <div className="py-3">
                      <p className={`${jost.className} text-gray-800 font-medium mb-2`}>Items in cart</p>
                      <div className="overflow-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="text-[12px] text-gray-500">
                              <th className="font-medium pr-6 pb-1 text-left">Stone</th>
                              <th className="font-medium pr-6 pb-1 text-left">Loc</th>
                              <th className="font-medium pr-6 pb-1 text-left">Lab</th>
                              <th className="font-medium pr-6 pb-1 text-left">Shape</th>
                              <th className="font-medium pr-6 pb-1 text-left">Carats</th>
                              <th className="font-medium pr-6 pb-1 text-left">Color</th>
                              <th className="font-medium pr-6 pb-1 text-left">Clarity</th>
                              <th className="font-medium pr-6 pb-1 text-left">Cut</th>
                              <th className="font-medium pr-6 pb-1 text-left">Pol</th>
                              <th className="font-medium pr-6 pb-1 text-left">Sym</th>
                              <th className="font-medium pr-6 pb-1 text-left">Fluor</th>
                              <th className="font-medium pr-6 pb-1 text-left">Net Rate</th>
                              <th className="font-medium pr-6 pb-1 text-left">Rap</th>
                              <th className="font-medium pr-6 pb-1 text-left">Net Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.itemsInCart.map((it, i) => {
                              const d = it?.diamond || it;
                              return <>{renderDiamondRow(d)}</>;
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Holded Items */}
                  {row.holdedItems && row.holdedItems.length > 0 && (
                    <div className="py-3">
                      <p className={`${jost.className} text-gray-800 font-medium mb-2`}>Holded Items</p>
                      <div className="overflow-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="text-[12px] text-gray-500">
                              <th className="font-medium pr-6 pb-1 text-left">Stone</th>
                              <th className="font-medium pr-6 pb-1 text-left">Loc</th>
                              <th className="font-medium pr-6 pb-1 text-left">Lab</th>
                              <th className="font-medium pr-6 pb-1 text-left">Shape</th>
                              <th className="font-medium pr-6 pb-1 text-left">Carats</th>
                              <th className="font-medium pr-6 pb-1 text-left">Color</th>
                              <th className="font-medium pr-6 pb-1 text-left">Clarity</th>
                              <th className="font-medium pr-6 pb-1 text-left">Cut</th>
                              <th className="font-medium pr-6 pb-1 text-left">Pol</th>
                              <th className="font-medium pr-6 pb-1 text-left">Sym</th>
                              <th className="font-medium pr-6 pb-1 text-left">Fluor</th>
                              <th className="font-medium pr-6 pb-1 text-left">Net Rate</th>
                              <th className="font-medium pr-6 pb-1 text-left">Rap</th>
                              <th className="font-medium pr-6 pb-1 text-left">Net Value</th>
                              <th className="font-medium pr-6 pb-1 text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.holdedItems.map((it, i) => {
                              const d = it?.diamond || it;
                              return (
                                <tr key={i} className="border-t border-gray-200">
                                  {renderDiamondRow(d)}
                                  <td className="py-2 pr-6 whitespace-nowrap text-right"><StatusBadge status={it?.status} /></td>
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
                      <p className={`${jost.className} text-gray-800 font-medium mb-2`}>Enquiries</p>
                      <div className="space-y-3">
                        {row.enquiries.map((q: any, i) => {
                          const stone = q?.stoneNo || q?.diamond?.STONE_NO || "-";
                          const query = q?.query || q?.message || q?.text || "-";
                          const status = q?.status || "pending";
                          const createdAt = q?.createdAt ? new Date(q.createdAt).toLocaleString() : "";
                          const adminReply = q?.adminReply;
                          const repliedAt = q?.repliedAt ? new Date(q.repliedAt).toLocaleString() : "";
                          const diamond = q?.diamond;

                          return (
                            <div key={i} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                              {/* Query Header */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <MessageSquare size={16} className="text-blue-600" />
                                  <span className="font-medium text-gray-800">Stone: {stone}</span>
                                  <StatusBadge status={status} />
                                </div>
                                <span className="text-xs text-gray-500">{createdAt}</span>
                              </div>

                              {/* Diamond Details (if available) */}
                              {diamond && (
                                <div className="mb-3 p-3 bg-white rounded border border-gray-200">
                                  <p className="text-xs font-medium text-gray-600 mb-2">Diamond Details</p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                    <div><span className="text-gray-500">Shape:</span> <span className="font-medium">{diamond.SHAPE}</span></div>
                                    <div><span className="text-gray-500">Carats:</span> <span className="font-medium">{diamond.CARATS}</span></div>
                                    <div><span className="text-gray-500">Color:</span> <span className="font-medium">{diamond.COLOR}</span></div>
                                    <div><span className="text-gray-500">Clarity:</span> <span className="font-medium">{diamond.CLARITY}</span></div>
                                    <div><span className="text-gray-500">Cut:</span> <span className="font-medium">{diamond.CUT}</span></div>
                                    <div><span className="text-gray-500">Lab:</span> <span className="font-medium">{diamond.LAB}</span></div>
                                    <div><span className="text-gray-500">Location:</span> <span className="font-medium">{diamond.LOCATION}</span></div>
                                    <div><span className="text-gray-500">Net Value:</span> <span className="font-medium">${diamond.NET_VALUE}</span></div>
                                  </div>
                                </div>
                              )}

                              {/* Customer Query */}
                              <div className="mb-3">
                                <p className="text-xs font-medium text-gray-600 mb-1">Customer Query:</p>
                                <p className="text-sm text-gray-800 bg-white p-2 rounded border border-gray-200">{query}</p>
                              </div>

                              {/* Admin Reply (if exists) */}
                              {adminReply && (
                                <div className="mb-3">
                                  <p className="text-xs font-medium text-gray-600 mb-1">Admin Reply:</p>
                                  <p className="text-sm text-gray-800 bg-green-50 p-2 rounded border border-green-200">{adminReply}</p>
                                  <p className="text-xs text-gray-500 mt-1">Replied on: {repliedAt}</p>
                                </div>
                              )}

                              {/* Reply Button */}
                              {status !== "replied" && (
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => setReplyModal({ open: true, queryId: q.id || q._id, stoneNo: stone })}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
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

        {/* Pagination (UI only) */}
        <div className="flex items-center gap-2 justify-center mt-6 text-sm">
          {[1,2,3,4,5].map((p) => (
            <button key={p} className={`border px-3 py-1 rounded-md ${p===1?"bg-[#0b1b35] text-white border-[#0b1b35]":"border-gray-300 text-gray-700"}`}>{p}</button>
          ))}
          <button className="border px-3 py-1 rounded-md border-gray-300 text-gray-700">…</button>
          <button className="border px-3 py-1 rounded-md border-gray-300 text-gray-700">10</button>
        </div>
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
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0b1b35] text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h3 className={`${jost.className} text-lg font-semibold`}>Reply to Enquiry</h3>
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
                <label className={`${jost.className} block text-sm font-medium text-gray-700 mb-2`}>
                  Stone Number
                </label>
                <input
                  type="text"
                  value={replyModal.stoneNo}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className={`${jost.className} block text-sm font-medium text-gray-700 mb-2`}>
                  Your Reply <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter your reply here..."
                  rows={5}
                  className={`${jost.className} w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0b1b35] resize-none`}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex gap-3 justify-end">
              <button
                onClick={() => {
                  setReplyModal(null);
                  setReplyText("");
                }}
                className={`${jost.className} px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleReplySubmit}
                disabled={isSubmittingReply || !replyText.trim()}
                className={`${jost.className} px-4 py-2 bg-[#0b1b35] text-white rounded hover:bg-[#08142a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
              >
                {isSubmittingReply ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
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
