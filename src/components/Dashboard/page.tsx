import React from "react";
import {
  Diamond,
  FileText,
  DollarSign,
  ShoppingCart,
  Pause,
  List,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  // Mock data - replace with API calls later
  const stats = {
    inventory: 763,
    newArrival: 25,
    priceRevised: 1234,
    cart: 123,
    holdStone: 0,
    upcomingList: 127,
  };

  const diamonds = [
    {
      id: 1,
      shape: "ROUND",
      carat: "5.06",
      color: "D",
      clarity: "VS2",
      cut: "-EX",
      polish: "EX",
      symmetry: "VST",
      lab: "GIA",
    },
    {
      id: 2,
      shape: "ROUND",
      carat: "5.06",
      color: "D",
      clarity: "VS2",
      cut: "-EX",
      polish: "EX",
      symmetry: "VST",
      lab: "GIA",
    },
    {
      id: 3,
      shape: "ROUND",
      carat: "5.06",
      color: "D",
      clarity: "VS2",
      cut: "-EX",
      polish: "EX",
      symmetry: "VST",
      lab: "GIA",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FEFCF9] p-6 mt-30">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-96 rounded-lg border border-[#F9EAD4] py-2 pl-10 pr-4 focus:border-[#F9EAD4] focus:outline-none focus:ring-1 focus:ring-[#F9EAD4]"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-[#F9EAD4] bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="mb-6 grid grid-cols-4 gap-6">
        {/* Inventory Card */}
        <div className="rounded-xl border border-[#F9EAD4] bg-gradient-to-br from-blue-900 to-blue-950 p-6 text-white shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Diamond className="h-6 w-6" />
            <span className="text-lg font-medium">Inventory</span>
          </div>
          <div className="text-5xl font-bold">{stats.inventory}</div>
        </div>

        {/* New Arrival Card */}
        <div className="rounded-xl border border-[#F9EAD4] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-lg font-medium text-gray-900">
              New Arrival
            </span>
          </div>
          <div className="text-5xl font-bold text-gray-900">
            {stats.newArrival}
          </div>
        </div>

        {/* Price Revised Card */}
        <div className="rounded-xl border border-[#F9EAD4] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <DollarSign className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-lg font-medium text-gray-900">
              Price Revised
            </span>
          </div>
          <div className="text-5xl font-bold text-gray-900">
            ${stats.priceRevised}
          </div>
        </div>

        {/* Cart Card */}
        <div className="rounded-xl border border-[#F9EAD4] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-lg font-medium text-gray-900">Cart</span>
          </div>
          <div className="text-5xl font-bold text-gray-900">{stats.cart}</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Diamond Carousel */}
        <div className="col-span-2 rounded-xl border border-[#F9EAD4] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <button className="rounded-full bg-amber-100 p-3 hover:bg-amber-200">
              <ChevronLeft className="h-5 w-5 text-amber-600" />
            </button>

            <div className="flex gap-6">
              {diamonds.map((diamond) => (
                <div
                  key={diamond.id}
                  className="rounded-xl border border-[#F9EAD4] bg-white p-4 shadow-sm"
                >
                  <div className="mb-4 flex h-48 w-48 items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                    <svg
                      className="h-40 w-40"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <radialGradient id={`diamond-gradient-${diamond.id}`}>
                          <stop offset="0%" style={{ stopColor: "#ffffff" }} />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#e0e0e0" }}
                          />
                        </radialGradient>
                      </defs>
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill={`url(#diamond-gradient-${diamond.id})`}
                      />
                      <path
                        d="M100 40 L140 80 L120 130 L80 130 L60 80 Z"
                        fill="#f5f5f5"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 text-center text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold">{diamond.shape}</span>
                      <span className="font-semibold">{diamond.carat}</span>
                      <span>{diamond.color}</span>
                      <span>{diamond.clarity}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{diamond.cut}</span>
                      <span>{diamond.polish}</span>
                      <span>{diamond.symmetry}</span>
                      <span>{diamond.lab}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="rounded-full bg-amber-100 p-3 hover:bg-amber-200">
              <ChevronRight className="h-5 w-5 text-amber-600" />
            </button>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="space-y-6">
          {/* Hold Stone Card */}
          <div className="rounded-xl border border-[#F9EAD4] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-gray-50 p-2">
                <Pause className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-lg font-medium text-gray-900">
                Hold Stone
              </span>
            </div>
            <div className="text-5xl font-bold text-gray-900">
              {stats.holdStone}
            </div>
          </div>

          {/* Upcoming List Card */}
          <div className="rounded-xl border border-[#F9EAD4] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-gray-50 p-2">
                <List className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-lg font-medium text-gray-900">
                Upcoming List
              </span>
            </div>
            <div className="text-5xl font-bold text-gray-900">
              {stats.upcomingList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
