"use client";
import { useState } from "react";
import { Marcellus, Jost } from "next/font/google";
import { ChevronDown, ChevronUp } from "lucide-react";

const marcellus = Marcellus({ variable: "--font-marcellus", weight: "400", subsets: ["latin"] });
const jost = Jost({ variable: "--font-jost", weight: ["400","500","600","700"], subsets: ["latin"] });

// Fake UI-only data for now
const mockCards = [
  { label: "Total Enquiries", value: 3, caption: "All customer queries received" },
  { label: "Pending", value: 1, caption: "Waiting for further action" },
  { label: "Approved", value: 2, caption: "All checks completed successfully" },
  { label: "Rejected", value: 1, caption: "Request declined after review" },
];

const mockRows = [
  {
    id: 1,
    name: "aklank Jain",
    username: "akjain3",
    email: "ajain@gmail.xy",
    phone: "+91 8860208097",
    company: "cts",
    businessType: "Other",
    vatNumber: "23423232",
    address: "avenue anciens...",
    itemsInCart: [
      { sku: "S-1333", country: "BE", cert: "GIA", shape: "ROUND", cts: 0.32, fl: "F", disc: "90.8%", measurements: "12.5", depth: "2.45", price: "$253.36", ratio: 2.34, table: "10.36", girdle: "0.65", amount: "$125.63" },
      { sku: "S-1333", country: "BE", cert: "GIA", shape: "ROUND", cts: 0.32, fl: "F", disc: "90.8%", measurements: "12.5", depth: "2.45", price: "$253.36", ratio: 2.34, table: "10.36", girdle: "0.65", amount: "$125.63" },
    ],
    holdedItems: [
      { sku: "S-1333", country: "BE", cert: "GIA", shape: "ROUND", cts: 0.32, fl: "F", disc: "90.8%", measurements: "12.5", depth: "2.45", price: "$253.36", ratio: 2.34, table: "10.36", girdle: "0.65", amount: "$125.63" },
      { sku: "S-1333", country: "BE", cert: "GIA", shape: "ROUND", cts: 0.32, fl: "F", disc: "90.8%", measurements: "12.5", depth: "2.45", price: "$253.36", ratio: 2.34, table: "10.36", girdle: "0.65", amount: "$125.63" },
    ],
    enquiryMessage: "Message from user",
    statuses: { approved: true, declined: false },
  },
  { id: 2, name: "aklank Jain", username: "akjain3", email: "ajain@gmail.xy", phone: "+91 8860208097", company: "cts", businessType: "Other", vatNumber: "23423232", address: "avenue anciens..." },
  { id: 3, name: "aklank Jain", username: "akjain3", email: "ajain@gmail.xy", phone: "+91 8860208097", company: "cts", businessType: "Other", vatNumber: "23423232", address: "avenue anciens..." },
];

export default function CustomerManagementPage() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 1: true });

  const toggleRow = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 mt-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className={`${marcellus.className} text-2xl md:text-3xl text-[#0b1b35] mb-2`}>Enquiry Management</h1>
        <p className={`${jost.className} text-sm text-gray-600 mb-6`}>Manage customer hold requests and diamond enquiries</p>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {mockCards.map((c) => (
            <div key={c.label} className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f4efe3] flex items-center justify-center text-[#0b1b35] text-sm">{c.value.toString().padStart(2, "0")}</div>
                <div>
                  <p className={`${jost.className} text-sm text-gray-700`}>{c.label}</p>
                  <p className={`${jost.className} text-[11px] text-gray-500`}>{c.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="hidden md:grid grid-cols-[60px_1.2fr_1.1fr_1.6fr_1.3fr_1fr_1.2fr_1.1fr_1.6fr_80px] items-center bg-[#0b1b35] text-white text-sm px-4 py-3">
            <div>Sr</div>
            <div>Name</div>
            <div>Username</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Company</div>
            <div>Business Type</div>
            <div>VAT Number</div>
            <div>Address</div>
            <div>View</div>
          </div>

          {mockRows.map((row, idx) => (
            <div key={row.id} className="border-t border-gray-200">
              {/* Summary Row */}
              <div className="grid md:grid-cols-[60px_1.2fr_1.1fr_1.6fr_1.3fr_1fr_1.2fr_1.1fr_1.6fr_80px] items-center px-4 py-3 text-sm">
                <div className="font-medium text-gray-700">{idx + 1}</div>
                <div className="text-gray-800">{row.name}</div>
                <div className="text-gray-700">{row.username}</div>
                <div className="text-gray-700 truncate">{row.email}</div>
                <div className="text-gray-700">{row.phone}</div>
                <div className="text-gray-700">{row.company}</div>
                <div className="text-gray-700">{row.businessType}</div>
                <div className="text-gray-700">{row.vatNumber}</div>
                <div className="text-gray-700 truncate">{row.address}</div>
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
                  {row.itemsInCart && (
                    <div className="py-3">
                      <p className={`${jost.className} text-gray-800 font-medium mb-2`}>Items in cart</p>
                      <div className="overflow-auto">
                        <table className="w-full text-left border-collapse">
                          <tbody>
                            {row.itemsInCart.map((it, i) => (
                              <tr key={i} className="border-t border-gray-200">
                                {Object.values(it).map((val, k) => (
                                  <td key={k} className="py-2 pr-6 text-gray-700 whitespace-nowrap">{String(val)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Holded Items */}
                  {row.holdedItems && (
                    <div className="py-3">
                      <p className={`${jost.className} text-gray-800 font-medium mb-2`}>Holded Items</p>
                      <div className="overflow-auto">
                        <table className="w-full text-left border-collapse">
                          <tbody>
                            {row.holdedItems.map((it, i) => (
                              <tr key={i} className="border-t border-gray-200">
                                {Object.values(it).map((val, k) => (
                                  <td key={k} className="py-2 pr-6 text-gray-700 whitespace-nowrap">{String(val)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Enquiry */}
                  {row.enquiryMessage && (
                    <div className="py-3">
                      <p className={`${jost.className} text-gray-800 font-medium mb-2`}>Enquiry</p>
                      <div className="border border-gray-200 rounded-md p-3 text-gray-700 text-sm bg-gray-50">
                        {row.enquiryMessage}
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
    </div>
  );
}
