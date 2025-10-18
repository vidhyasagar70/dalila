"use client"

import React, { useState } from 'react';
import { Clock, CheckCircle, Eye, TrendingUp,X } from 'lucide-react';

interface Offer {
  id: number;
  customer: string;
  email: string;
  phone: string;
  diamond: string;
  carat: string;
  certNo: string;
  inquiry: string;
  status: 'pending' | 'closed';
  submitted: string;
}

interface Stat {
  id: 'pending' | 'closed';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  count: number;
  subtext: string;
  bgColor: string;
  iconColor: string;
  borderColor: string;
}

type TabType = 'pending' | 'closed';

export default function OfferEnquiry() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');

  const stats: Stat[] = [
    {
      id: 'pending',
      icon: Clock,
      label: 'Pending Offers',
      count: 2,
      subtext: 'Awaiting response',
      bgColor: 'bg-slate-900/40',
      iconColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/30',
    },
    {
      id: 'closed',
      icon: CheckCircle,
      label: 'Closed Offers',
      count: 2,
      subtext: 'Successfully closed',
      bgColor: 'bg-slate-900/40',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-400/30',
    },
  ];

  const mockOffers: Record<TabType, Offer[]> = {
    pending: [
      {
        id: 1,
        customer: 'aklank',
        email: 'bits.users.2023@gmail.com',
        phone: '499712725',
        diamond: '0.18 ct',
        carat: '0.18',
        certNo: '227848728',
        inquiry: '0exact price',
        status: 'pending',
        submitted: 'Oct 7, 2025',
      },
      {
        id: 2,
        customer: 'venkat12',
        email: 'hacitp536@fanivr.com',
        phone: '123123123',
        diamond: '0.7 ct',
        carat: '0.7',
        certNo: '2517222042',
        inquiry: 'i like this diamond, can you give it to me in 10000',
        status: 'pending',
        submitted: 'Oct 15, 2025',
      },
      {
        id: 3,
        customer: 'rajesh_kumar',
        email: 'rajesh.kumar@example.com',
        phone: '987654321',
        diamond: '1.25 ct',
        carat: '1.25',
        certNo: '335922145',
        inquiry: 'Best price for this stone?',
        status: 'pending',
        submitted: 'Oct 18, 2025',
      },
      {
        id: 4,
        customer: 'priya_designer',
        email: 'priya.d@designer.com',
        phone: '555123456',
        diamond: '0.45 ct',
        carat: '0.45',
        certNo: '441233567',
        inquiry: 'What is the most competitive price?',
        status: 'pending',
        submitted: 'Oct 19, 2025',
      },
    ],
    closed: [
      {
        id: 5,
        customer: 'merchant_pro',
        email: 'merchant.pro@business.com',
        phone: '666789012',
        diamond: '2.0 ct',
        carat: '2.0',
        certNo: '550234678',
        inquiry: 'Interested in bulk order',
        status: 'closed',
        submitted: 'Oct 5, 2025',
      },
      {
        id: 6,
        customer: 'luxury_boutique',
        email: 'info@luxuryboutique.com',
        phone: '777456123',
        diamond: '0.95 ct',
        carat: '0.95',
        certNo: '661345789',
        inquiry: 'Need certified stones for store',
        status: 'closed',
        submitted: 'Oct 3, 2025',
      },
      {
        id: 7,
        customer: 'diamond_trader',
        email: 'trader@diamonds.com',
        phone: '888234567',
        diamond: '1.5 ct',
        carat: '1.5',
        certNo: '772456890',
        inquiry: 'Regular supplier interested',
        status: 'closed',
        submitted: 'Oct 1, 2025',
      },
      {
        id: 8,
        customer: 'jewelry_store',
        email: 'contact@jewelry.com',
        phone: '999567890',
        diamond: '0.65 ct',
        carat: '0.65',
        certNo: '883567901',
        inquiry: 'Wholesale pricing available?',
        status: 'closed',
        submitted: 'Sep 28, 2025',
      },
    ],
  };

  const currentData = mockOffers[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
     

      {/* Stats Cards */}
      <div className="px-8 py-12 mt-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`${stat.bgColor} ${stat.borderColor} rounded-lg p-6 border backdrop-blur-sm hover:border-opacity-100 transition cursor-pointer group`}
              >
                <div className="flex justify-between items-start mb-4">
                  <Icon className={`${stat.iconColor} w-8 h-8 group-hover:scale-110 transition`} />
                  <TrendingUp className="text-amber-400 w-5 h-5 opacity-60" />
                </div>
                <h3 className="text-slate-300 text-sm font-medium mb-3">{stat.label}</h3>
                <p className="text-4xl font-bold text-white mb-1">{stat.count}</p>
                <p className="text-slate-400 text-xs">{stat.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs Navigation */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 mb-6 border border-slate-700/50 flex gap-3 w-fit">
          {stats.map((stat) => (
            <button
              key={stat.id}
              onClick={() => setActiveTab(stat.id)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition whitespace-nowrap ${
                activeTab === stat.id
                  ? `bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/50`
                  : 'bg-slate-800/40 text-slate-300 hover:text-slate-200 border border-slate-700/30'
              }`}
            >
              {stat.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/80">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Phone No.</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Diamond</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Cert. No.</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Inquiry</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((offer: Offer) => (
                    <tr key={offer.id} className="border-b border-slate-700/30 hover:bg-slate-800/40 transition group">
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <p className="font-semibold text-white">{offer.customer}</p>
                          <p className="text-slate-400 text-xs">{offer.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{offer.phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{offer.diamond}</span>
                          <Eye className="w-4 h-4 text-slate-500 cursor-pointer hover:text-amber-400 transition" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300">{offer.certNo}</span>
                          <Eye className="w-4 h-4 text-slate-500 cursor-pointer hover:text-amber-400 transition" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 max-w-xs truncate" title={offer.inquiry}>
                        {offer.inquiry}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {offer.status === 'pending' ? (
                          <div className="flex items-center gap-2 text-yellow-500">
                            <Clock className="w-4 h-4" />
                            <span>Pending</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>Closed</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{offer.submitted}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className={`px-3 py-1.5 rounded-lg transition font-medium text-sm flex items-center gap-1 ${
                          offer.status === 'pending'
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                            : 'bg-slate-700/40 text-slate-400 hover:bg-slate-700/60'
                        }`}>
                          {offer.status === 'pending' ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Close
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4" />
                              Closed
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <Eye className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400 font-medium">No offers found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-900/80 flex justify-between items-center">
            <p className="text-sm text-slate-400">
              Showing {currentData.length} {activeTab === 'pending' ? 'pending' : 'closed'} offers
            </p>
            <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}