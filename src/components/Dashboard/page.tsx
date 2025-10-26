"use client";

import { useState, useEffect } from 'react';
import { 
  Package, 
  FileText, 
  DollarSign, 
  ShoppingCart, 
  Loader2,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Gem,
  List
} from 'lucide-react';
import { diamondApi } from '@/lib/api';

export default function AdminDashboard() {
  // Real data from API
  const [totalDiamonds, setTotalDiamonds] = useState(0);
  const [newlyAddedDiamonds, setNewlyAddedDiamonds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock data
  const mockStats = {
    newArrival: 25,
    priceRevised: 1234,
    cart: 123,
    holdStone: 0,
    upcomingList: 127
  };

  // Mock diamond data for carousel
  const mockDiamonds = [
    { shape: 'ROUND', carat: '5.06', color: 'D', clarity: 'VS2', cut: 'EX', polish: 'EX', symmetry: 'VST', lab: 'GIA' },
    { shape: 'ROUND', carat: '5.06', color: 'D', clarity: 'VS2', cut: 'EX', polish: 'EX', symmetry: 'VST', lab: 'GIA' },
    { shape: 'ROUND', carat: '5.06', color: 'D', clarity: 'VS2', cut: 'EX', polish: 'EX', symmetry: 'VST', lab: 'GIA' },
    { shape: 'ROUND', carat: '5.06', color: 'D', clarity: 'VS2', cut: 'EX', polish: 'EX', symmetry: 'VST', lab: 'GIA' },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await diamondApi.getDashboardStats();

      if (response && response.success && response.data) {
        setTotalDiamonds(response.data.totalDiamonds);
        setNewlyAddedDiamonds(response.data.newlyAddedDiamonds);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Unable to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, mockDiamonds.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, mockDiamonds.length - 2)) % Math.max(1, mockDiamonds.length - 2));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-35">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span className="font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* Left Section - Stats Cards */}
          <div className="col-span-9">
            {/* Top Row - 4 Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Inventory Card - Dark Navy */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Gem className="w-8 h-8" />
                  <span className="text-sm opacity-80">Inventory</span>
                </div>
                <div className="text-4xl font-bold">{totalDiamonds}</div>
              </div>

              {/* New Arrival Card */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600">New Arrival</span>
                </div>
                <div className="text-4xl font-bold text-gray-900">{newlyAddedDiamonds}</div>
              </div>

              {/* Price Revised Card */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <DollarSign className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600">Price Revised</span>
                </div>
                <div className="text-4xl font-bold text-gray-900">${mockStats.priceRevised}</div>
              </div>

              {/* Cart Card */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600">Cart</span>
                </div>
                <div className="text-4xl font-bold text-gray-900">{mockStats.cart}</div>
              </div>
            </div>

            {/* Diamond Carousel */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-yellow-600" />
                </button>
                
                <div className="flex gap-4 flex-1 justify-center">
                  {mockDiamonds.slice(currentSlide, currentSlide + 3).map((diamond, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 w-64">
                      <div className="bg-gray-50 rounded-lg p-6 mb-4 flex items-center justify-center">
                        <img
                          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3CradialGradient id='diamondGrad'%3E%3Cstop offset='0%25' style='stop-color:rgb(255,255,255);stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:rgb(230,240,255);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(200,220,240);stop-opacity:1' /%3E%3C/radialGradient%3E%3C/defs%3E%3Cpolygon points='100,20 160,80 100,180 40,80' fill='url(%23diamondGrad)' stroke='%23888' stroke-width='2'/%3E%3C/svg%3E"
                          alt="Diamond"
                          className="w-32 h-32"
                        />
                      </div>
                      <div className="text-center space-y-1">
                        <div className="flex justify-center gap-2 text-sm font-medium text-gray-900">
                          <span>{diamond.shape}</span>
                          <span>{diamond.carat}</span>
                          <span>{diamond.color}</span>
                          <span>{diamond.clarity}</span>
                        </div>
                        <div className="flex justify-center gap-2 text-sm text-gray-600">
                          <span>-{diamond.cut}</span>
                          <span>{diamond.polish}</span>
                          <span>{diamond.symmetry}</span>
                          <span>{diamond.lab}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-yellow-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Hold Stone & Upcoming List */}
          <div className="col-span-3 space-y-6">
            {/* Hold Stone Card */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Package className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Hold Stone</span>
              </div>
              <div className="text-5xl font-bold text-gray-900">{mockStats.holdStone}</div>
            </div>

            {/* Upcoming List Card */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <List className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Upcoming List</span>
              </div>
              <div className="text-5xl font-bold text-gray-900">{mockStats.upcomingList}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}