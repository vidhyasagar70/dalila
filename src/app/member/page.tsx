"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, CheckCircle, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// Extended User interface with additional fields
interface ExtendedUser {
  id: string;
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  identityNumber?: string;
  company?: string;
  shopName?: string;
  shopRegistrationNumber?: string;
  taxNumber?: string;
  password?: string;
  kycStatus?: string;
  role?: string;
}

// Single mock user data that will be replicated
const mockUser: ExtendedUser = {
  id: "1",
  username: "ABC",
  email: "@gmail.com",
  firstName: "ABC",
  lastName: "",
  phone: "1234567891",
  identityNumber: "123245",
  company: "",
  shopName: "ABC",
  shopRegistrationNumber: "VN",
  taxNumber: "VN",
  password: "mock123",
  kycStatus: "pending",
  role: "customer"
};

// Generate multiple rows from single mock data
const generateMockUsers = (count: number, status: string): ExtendedUser[] => {
  return Array.from({ length: count }, (_, index) => ({
    ...mockUser,
    id: `${index + 1}`,
    kycStatus: status
  }));
};

export default function MembersManagement() {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [activeTab, setActiveTab] = useState<"authorized" | "waiting">("waiting");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedStockLimit, setSelectedStockLimit] = useState("");
  const [byExApp, setByExApp] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [memoParty, setMemoParty] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call - replace with your actual API
      // For now, using mock data directly
      setTimeout(() => {
        if (activeTab === "waiting") {
          const mockData = generateMockUsers(25, "pending");
          setUsers(mockData);
          setFilteredUsers(mockData);
        } else {
          const mockData = generateMockUsers(15, "approved");
          setUsers(mockData);
          setFilteredUsers(mockData);
        }
        setLoading(false);
      }, 500);

      /* Uncomment this when your API is ready:
      if (activeTab === "waiting") {
        try {
          const response = await userApi.getPendingCustomerData();
          if (response && response.success && response.data) {
            const pendingUsers = response.data.pendingUsers.map((item: any) => ({
              ...item.user,
              ...item.customerData,
              kycStatus: "pending"
            }));
            setUsers(pendingUsers);
            setFilteredUsers(pendingUsers);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log("API not ready, using mock data");
        }
        const mockData = generateMockUsers(25, "pending");
        setUsers(mockData);
        setFilteredUsers(mockData);
      } else {
        try {
          const response = await userApi.getAllUsers();
          if (response && response.success && response.data) {
            const authorizedUsers = (response.data.users || []).filter(
              (user: ExtendedUser) => user.kycStatus === "approved"
            );
            setUsers(authorizedUsers);
            setFilteredUsers(authorizedUsers);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log("API not ready, using mock data");
        }
        const mockData = generateMockUsers(15, "approved");
        setUsers(mockData);
        setFilteredUsers(mockData);
      }
      setLoading(false);
      */
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again.");
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchUsers();
  }, [activeTab, fetchUsers]);

  // Handle search
  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(user =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, users]);

  // Approve user
  const handleApprove = useCallback(async (userId: string) => {
    try {
      // Replace with actual API call when ready
      console.log("Approving user:", userId);
      // const response = await userApi.approveCustomerData(userId);
      // if (response && response.success) {
      await fetchUsers();
      // }
    } catch (error) {
      console.error("Error approving user:", error);
      setError("Failed to approve user");
    }
  }, [fetchUsers]);

  // Reject user
  const handleReject = useCallback(async (userId: string) => {
    try {
      // Replace with actual API call when ready
      console.log("Rejecting user:", userId);
      // const response = await userApi.rejectCustomerData(userId, "Not eligible");
      // if (response && response.success) {
      await fetchUsers();
      // }
    } catch (error) {
      console.error("Error rejecting user:", error);
      setError("Failed to reject user");
    }
  }, [fetchUsers]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-white p-8 mt-35">
      {/* Header Tabs */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setActiveTab("authorized")}
          className={`px-6 py-2.5 rounded-lg font-medium transition ${
            activeTab === "authorized"
              ? "bg-white text-slate-900"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          style={activeTab === "authorized" ? { border: '1px solid #f9ead4' } : { border: '1px solid #e5e7eb' }}
        >
          Authorized Members
        </button>
        <button
          onClick={() => setActiveTab("waiting")}
          className={`px-6 py-2.5 rounded-lg font-medium transition ${
            activeTab === "waiting"
              ? "text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          style={activeTab === "waiting" ? { backgroundColor: '#050c3a' } : { border: '1px solid #e5e7eb' }}
        >
          Waiting Authorization
        </button>
        <button className="ml-auto px-6 py-2.5 bg-white rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center gap-2" style={{ border: '1px solid #f9ead4' }}>
          <Search className="w-4 h-4" />
          View
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select</label>
          <div className="relative">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg appearance-none bg-white focus:outline-none"
              style={{ border: '1px solid #f9ead4' }}
            >
              <option value="">Select</option>
              <option value="all">All Users</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search User</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg focus:outline-none"
              style={{ border: '1px solid #f9ead4' }}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">M. Person</label>
          <div className="relative">
            <select
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg appearance-none bg-white focus:outline-none"
              style={{ border: '1px solid #f9ead4' }}
            >
              <option value="">Select</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock Limit</label>
          <div className="relative">
            <select
              value={selectedStockLimit}
              onChange={(e) => setSelectedStockLimit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg appearance-none bg-white focus:outline-none"
              style={{ border: '1px solid #f9ead4' }}
            >
              <option value="">Select</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mb-6 flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={byExApp}
            onChange={(e) => setByExApp(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded focus:ring-slate-900"
          />
          <span className="text-sm text-gray-700">By Ex. App</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded focus:ring-slate-900"
          />
          <span className="text-sm text-gray-700">Only in Stock</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={memoParty}
            onChange={(e) => setMemoParty(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded focus:ring-slate-900"
          />
          <span className="text-sm text-gray-700">Memo Party</span>
        </label>
      </div>

      {/* Table */}
      <div className="bg-white overflow-hidden" style={{ border: '1px solid #f9ead4' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead style={{ backgroundColor: '#050c3a' }}>
              <tr style={{ borderBottom: '1px solid #f9ead4' }}>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '40px' }}>Sr</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '80px' }}>ID (Password)</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '120px' }}>Name (Company)</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '100px' }}>Identity Number</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '80px' }}>Username</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '120px' }}>Email address</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '100px' }}>Phone Number</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '80px' }}>Shop Name</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '100px' }}>Shop Registration number</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '80px' }}>TAX Number</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-white" style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-500 text-xs">
                    Loading members...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-red-500 text-xs">
                    {error}
                  </td>
                </tr>
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f9ead4' }} className="hover:bg-gray-50">
                    <td className="px-2 py-2 text-xs text-gray-900">{startIndex + index + 1}</td>
                    <td className="px-2 py-2 text-xs text-gray-900">
                      {user.password ? "#######" : "N/A"}
                    </td>
                    <td className="px-2 py-2 text-xs text-gray-900">
                      {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"}
                      {user.company && (
                        <div className="text-xs text-gray-500">{user.company}</div>
                      )}
                    </td>
                    <td className="px-2 py-2 text-xs text-gray-900">
                      {user.identityNumber || "N/A"}
                    </td>
                    <td className="px-2 py-2 text-xs text-gray-900">{user.username || user.email}</td>
                    <td className="px-2 py-2 text-xs text-gray-900">{user.email}</td>
                    <td className="px-2 py-2 text-xs text-gray-900">{user.phone || "N/A"}</td>
                    <td className="px-2 py-2 text-xs text-gray-900">{user.shopName || "N/A"}</td>
                    <td className="px-2 py-2 text-xs text-gray-900">
                      {user.shopRegistrationNumber || "N/A"}
                    </td>
                    <td className="px-2 py-2 text-xs text-gray-900">{user.taxNumber || "N/A"}</td>
                    <td className="px-2 py-2 text-xs">
                      {activeTab === "waiting" ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleApprove(user.id)}
                            className="text-emerald-600 hover:text-emerald-700"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Reject"
                          >
                            <span className="text-lg">×</span>
                          </button>
                        </div>
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center">
                    <p className="text-gray-500 font-medium text-xs">No members found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 flex justify-between items-center" style={{ borderTop: '1px solid #f9ead4', backgroundColor: '#faf6eb' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === "..."}
                  className={`min-w-[32px] h-8 px-2.5 rounded text-xs font-medium transition ${
                    page === currentPage
                      ? 'bg-slate-900 text-white'
                      : page === "..."
                      ? 'text-gray-400 cursor-default bg-transparent'
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                  style={page !== "..." && page !== currentPage ? { border: '1px solid #f9ead4' } : {}}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}