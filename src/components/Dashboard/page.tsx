"use client";

import { useState, useEffect } from 'react';
import { 
  Package, 
  FileText,  
  ShoppingCart, 
  Loader2,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Gem,
  List,
  DollarSign
} from 'lucide-react';

import { diamondApi, cartApi } from '@/lib/api';

export default function AdminDashboard() {

  const [totalDiamonds, setTotalDiamonds] = useState(0);
  const [newlyAddedDiamonds, setNewlyAddedDiamonds] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock data
  const mockStats = {
    newArrival: 25,
    priceRevised: 1234,
    holdStone: 0,
    upcomingList: 0
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
    fetchCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await cartApi.get();
      console.log("Dashboard - Cart response:", response);

      if (response?.success && response.data?.cart?.items) {
        setCartCount(response.data.cart.items.length);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  };

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

  const handleRefresh = () => {
    fetchDashboardData();
    fetchCartCount();
  };

  const handleNavigate = (path: string) => {
    window.location.href = path;
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
          <Loader2 className="w-12 h-12 animate-spin text-[#FAF6EB] mx-auto" />
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
                style={{ borderColor: '#FAE9D0' }}
                className="pl-10 pr-4 py-2 border rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleRefresh}
              style={{ borderColor: '#FAE9D0' }}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
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

        {/* First Row - 4 Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Inventory Card - Dark Navy - Clickable */}
          <button
            onClick={() => handleNavigate('/inventory')}
            style={{ borderColor: '#FAE9D0', backgroundColor: '#050C3A' }}
            className="rounded-xl p-6 text-white shadow-lg border hover:opacity-90 transition-opacity text-left w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <Gem className="w-8 h-8" />
              <span className="text-lg opacity-80">Inventory</span>
            </div>
            <div className="text-4xl font-bold text-center">{totalDiamonds}</div>
          </button>

          {/* New Arrival Card */}
          <div 
            style={{ borderColor: '#FAE9D0' }}
            className="bg-white rounded-xl p-6 shadow-md border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-lg  font-semibold text-gray-900">New Arrival</span>
            </div>
            <div className="text-5xl font-bold text-gray-900 text-center">{newlyAddedDiamonds}</div>
          </div>

          {/* Price Revised Card */}
          <div 
            style={{ borderColor: '#FAE9D0' }}
            className="bg-white rounded-xl p-6 shadow-md border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Price Revised</span>
            </div>
            <div className="text-5xl font-bold text-gray-900 text-center">0</div>
          </div>

          {/* Cart Card - Clickable - Now showing real count */}
          <button
            onClick={() => handleNavigate('/cart')}
            style={{ borderColor: '#FAE9D0' }}
            className="bg-white rounded-xl p-6 shadow-md border hover:bg-gray-50 transition-colors text-left w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Cart</span>
            </div>
            <div className="text-5xl font-bold text-gray-900 text-center">{cartCount}</div>
          </button>
        </div>

        {/* Second Row - Diamond Carousel and Right Cards */}
        <div className="grid grid-cols-12 gap-6">
          {/* Diamond Carousel - Left Side */}
          <div className="col-span-9">
            <div 
              style={{ borderColor: '#FAE9D0' }}
              className="bg-white rounded-xl p-4 shadow-md border"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limited Edition</h2>
              <div className="flex items-center justify-between">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-[#FAE9D0] transition-colors flex-shrink-0"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex gap-3 flex-1 justify-center">
                  {mockDiamonds.slice(currentSlide, currentSlide + 3).map((diamond, index) => (
                    <div 
                      key={index} 
                      style={{ borderColor: '#FAE9D0' }}
                      className="bg-white border rounded-xl p-3 w-52"
                    >
                      <div className="bg-gray-50 rounded-lg p-4 mb-3 flex items-center justify-center">
                        <video
                          className="w-24 h-24 object-cover rounded"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src="/New-Videos/auth-bg.mp4" type="video/mp4" />
                        </video>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="flex justify-center gap-2 text-xs font-medium text-gray-900">
                          <span>{diamond.shape}</span>
                          <span>{diamond.carat}</span>
                          <span>{diamond.color}</span>
                          <span>{diamond.clarity}</span>
                        </div>
                        <div className="flex justify-center gap-2 text-xs text-gray-600">
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
                  className="p-2 rounded-full bg-[#FAE9D0] transition-colors flex-shrink-0"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Hold Stone & Upcoming List */}
          <div className="col-span-3 space-y-6">
            {/* Hold Stone Card */}
            <div 
              style={{ borderColor: '#FAE9D0' }}
              className="bg-white rounded-xl p-6 shadow-md border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Package className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Hold Stone</span>
              </div>
              <div className="text-5xl font-bold text-gray-900  text-center">{mockStats.holdStone}</div>
            </div>

            {/* Upcoming List Card */}
            <div 
              style={{ borderColor: '#FAE9D0' }}
              className="bg-white rounded-xl p-6 shadow-md border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <List className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Upcoming List</span>
              </div>
              <div className="text-5xl font-bold text-gray-900  text-center">{mockStats.upcomingList}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}