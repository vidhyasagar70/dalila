"use client"
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Eye, TrendingUp, Loader } from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  businessName?: string;
  businessType?: string;
  taxId?: string;
}

interface Stat {
  id: 'pending' | 'approved' | 'rejected';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  count: number;
  subtext: string;
  bgColor: string;
  iconColor: string;
  borderColor: string;
}

type TabType = 'pending' | 'approved' | 'rejected';

// Mock data for when API fails
const generateMockUsers = (status: TabType): User[] => {
  const mockData: Record<TabType, User[]> = {
    pending: [
      {
        id: '1',
        firstName: 'Emma',
        lastName: 'Wilson',
        email: 'emma.wilson@startup.com',
        phone: '+1234567890',
        kycStatus: 'pending',
        createdAt: '2024-10-14',
        businessName: 'StartUp Innovations',
        businessType: 'Technology',
      },
      {
        id: '2',
        firstName: 'David',
        lastName: 'Martinez',
        email: 'david@creative.com',
        phone: '+1111222333',
        kycStatus: 'pending',
        createdAt: '2024-10-13',
        businessName: 'Creative Solutions',
        businessType: 'Design & Creative',
      },
      {
        id: '3',
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa@digitalagency.com',
        phone: '+2222333444',
        kycStatus: 'pending',
        createdAt: '2024-10-12',
        businessName: 'Digital Agency Pro',
        businessType: 'Digital Marketing',
      },
      {
        id: '4',
        firstName: 'Chris',
        lastName: 'Thompson',
        email: 'chris@cloudsystems.com',
        phone: '+3333444555',
        kycStatus: 'pending',
        createdAt: '2024-10-11',
        businessName: 'Cloud Systems Inc',
        businessType: 'Cloud Services',
      },
      {
        id: '5',
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria@consulting.com',
        phone: '+4444555666',
        kycStatus: 'pending',
        createdAt: '2024-10-10',
        businessName: 'Consulting Partners',
        businessType: 'Consulting',
      },
    ],
    approved: [
      {
        id: '6',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@techcorp.com',
        phone: '+1234567890',
        kycStatus: 'approved',
        createdAt: '2024-09-15',
        businessName: 'Tech Corp',
        businessType: 'Technology',
      },
      {
        id: '7',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@designstudio.com',
        phone: '+0987654321',
        kycStatus: 'approved',
        createdAt: '2024-09-10',
        businessName: 'Design Studio',
        businessType: 'Design',
      },
      {
        id: '8',
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert@finance.com',
        phone: '+1122334455',
        kycStatus: 'approved',
        createdAt: '2024-09-08',
        businessName: 'Finance Inc',
        businessType: 'Finance',
      },
      {
        id: '9',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael@analytics.com',
        phone: '+5555666777',
        kycStatus: 'approved',
        createdAt: '2024-09-05',
        businessName: 'Data Analytics Ltd',
        businessType: 'Data & Analytics',
      },
      {
        id: '10',
        firstName: 'Sophie',
        lastName: 'Laurent',
        email: 'sophie@brandagency.com',
        phone: '+6666777888',
        kycStatus: 'approved',
        createdAt: '2024-09-01',
        businessName: 'Brand Agency',
        businessType: 'Branding',
      },
    ],
    rejected: [
      {
        id: '18',
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex@unknown.com',
        phone: '+5544332211',
        kycStatus: 'rejected',
        createdAt: '2024-07-15',
        businessName: 'Unknown Ltd',
        businessType: 'Retail',
      },
      {
        id: '19',
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah@marketing.com',
        phone: '+6677889900',
        kycStatus: 'rejected',
        createdAt: '2024-07-12',
        businessName: 'Marketing Pro',
        businessType: 'Marketing',
      },
      {
        id: '20',
        firstName: 'Michael',
        lastName: 'Davis',
        email: 'michael@services.com',
        phone: '+9988776655',
        kycStatus: 'rejected',
        createdAt: '2024-07-10',
        businessName: 'Services LLC',
        businessType: 'Services',
      },
      {
        id: '21',
        firstName: 'Patricia',
        lastName: 'Hughes',
        email: 'patricia@trading.com',
        phone: '+1122334466',
        kycStatus: 'rejected',
        createdAt: '2024-07-08',
        businessName: 'Trading Company',
        businessType: 'Trading',
      },
      {
        id: '22',
        firstName: 'James',
        lastName: 'Peterson',
        email: 'james@import.com',
        phone: '+2233445577',
        kycStatus: 'rejected',
        createdAt: '2024-07-05',
        businessName: 'Import Export Co',
        businessType: 'Import/Export',
      },
    ],
  };
  return mockData[status];
};

export default function MembersEnquiry() {
  const [activeTab, setActiveTab] = useState<TabType>('approved');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Record<TabType, number>>({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // Fetch users by KYC status
  const fetchUsersByStatus = async (status: TabType) => {
    setLoading(true);
    try {
      // This would call your actual API endpoint
      // For now, using mock data since we don't have live API access
      const mockUsers = generateMockUsers(status);
      setUsers(mockUsers);
    } catch (error) {
      console.error(`Failed to fetch ${status} users:`, error);
      // Fallback to mock data
      setUsers(generateMockUsers(status));
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  useEffect(() => {
    const initializeStats = async () => {
      try {
        // In a real app, you'd fetch these from the API
        // For demo purposes, calculating from mock data
        const pending = generateMockUsers('pending').length;
        const approved = generateMockUsers('approved').length;
        const rejected = generateMockUsers('rejected').length;

        setStats({ pending, approved, rejected });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats({
          pending: generateMockUsers('pending').length,
          approved: generateMockUsers('approved').length,
          rejected: generateMockUsers('rejected').length,
        });
      }
    };

    initializeStats();
  }, []);

  // Load users when tab changes
  useEffect(() => {
    fetchUsersByStatus(activeTab);
  }, [activeTab]);

  const statCards: Stat[] = [
    {
      id: 'pending',
      icon: Clock,
      label: 'Waiting Authorization',
      count: stats.pending,
      subtext: 'Pending KYC',
      bgColor: 'bg-slate-900/40',
      iconColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/30',
    },
    {
      id: 'approved',
      icon: CheckCircle,
      label: 'Authorized Members',
      count: stats.approved,
      subtext: 'KYC approved',
      bgColor: 'bg-slate-900/40',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-400/30',
    },
    {
      id: 'rejected',
      icon: XCircle,
      label: 'Rejected Members',
      count: stats.rejected,
      subtext: 'KYC rejected',
      bgColor: 'bg-slate-900/40',
      iconColor: 'text-rose-500',
      borderColor: 'border-rose-500/30',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Stats Cards */}
      <div className="px-8 py-12 mt-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => {
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
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 mb-6 border border-slate-700/50 flex gap-3 overflow-x-auto">
          {statCards.map((stat) => (
            <button
              key={stat.id}
              onClick={() => setActiveTab(stat.id)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition whitespace-nowrap ${
                activeTab === stat.id
                  ? `bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/50`
                  : 'bg-slate-800/40 text-slate-300 hover:text-slate-200 border border-slate-700/30'
              }`}
            >
              {stat.label} ({stat.count})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/80">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Business Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <Loader className="w-8 h-8 text-amber-400 mx-auto animate-spin" />
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user, idx) => (
                    <tr key={user.id} className="border-b border-slate-700/30 hover:bg-slate-800/40 transition group">
                      <td className="px-6 py-4 text-sm text-slate-300">{idx + 1}</td>
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <p className="font-semibold text-white">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{user.phone || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{user.businessName || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{user.businessType || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{formatDate(user.createdAt)}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="p-2 hover:bg-amber-500/20 rounded-lg transition hover:text-amber-400 text-slate-400">
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <Eye className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400 font-medium">No users found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-900/80 flex justify-between items-center">
            <p className="text-sm text-slate-400">
              Showing {users.length} {activeTab} users
            </p>
            <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}