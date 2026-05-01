import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customerService from '../../services/customerService';
import type { Customer } from '../../services/customerService';
import { Plus, Search,  Edit, Trash, Users, UserCheck, Star, UsersRound, Download } from 'lucide-react';
import CustomerStatsCard from '../../components/customers/CustomerStatsCard';
import { useAuth } from '../../contexts/AuthContext';

const CustomerList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const rolePrefix = user?.role.toLowerCase() || 'staff';
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ membership_type: '', is_active: '' });

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = { search, ...filters };
      const response = await customerService.getCustomers(params);
      setCustomers(response.data.results || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [filters]);

  const stats = [
    { title: 'Total Customers', value: '1,248', icon: Users, color: 'bg-blue-500', trend: '+12% from last month' },
    { title: 'New (This Month)', value: '84', icon: UserCheck, color: 'bg-green-500', trend: '+5% increase' },
    { title: 'Premium Members', value: '312', icon: Star, color: 'bg-pink-500', trend: '25% of total' },
    { title: 'Repeat Customers', value: '842', icon: UsersRound, color: 'bg-purple-500', trend: '68% retention' },
  ];

  const getMembershipBadge = (type: string) => {
    const colors: any = {
      PLATINUM: 'bg-slate-900 text-white',
      GOLD: 'bg-amber-100 text-amber-700',
      SILVER: 'bg-slate-100 text-slate-700',
      NONE: 'bg-slate-50 text-slate-400'
    };
    return colors[type] || 'bg-slate-50 text-slate-400';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Customer Database</h2>
          <p className="text-slate-500 mt-1">Manage client profiles and membership tiers</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold transition-all">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => navigate(`/${rolePrefix}/customers/new`)}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-pink-200 hover:shadow-pink-300 transform active:scale-95 transition-all"
          >
            <Plus className="h-5 w-5" />
            <span>New Customer</span>
          </button>
        </div>
      </div>

      {/* Stats Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <CustomerStatsCard key={i} {...stat} />
        ))}
      </div>

      {/* Filters and List */}
      <div className="parakh-card">
        <div className="parakh-card-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchCustomers()}
              placeholder="Search by name, phone or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filters.membership_type}
              onChange={(e) => setFilters({ ...filters, membership_type: e.target.value })}
              className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Tiers</option>
              <option value="PLATINUM">Platinum</option>
              <option value="GOLD">Gold</option>
              <option value="SILVER">Silver</option>
              <option value="NONE">No Membership</option>
            </select>
            <select
              value={filters.is_active}
              onChange={(e) => setFilters({ ...filters, is_active: e.target.value })}
              className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Status</option>
              <option value="true">Active Only</option>
              <option value="false">Inactive Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Client Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Phone / Email</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Membership</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Visits</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Total Spent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin h-8 w-8 text-pink-500 mx-auto" />
                    <p className="text-slate-400 mt-2 text-sm font-medium">Fetching customers...</p>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">No customers matching your search.</td>
                </tr>
              ) : customers.map((customer) => (
                <tr key={customer.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-pink-50 to-pink-100 flex items-center justify-center text-pink-500 font-bold border border-pink-200">
                        {customer.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div 
                        className="cursor-pointer"
                        onClick={() => navigate(`/${rolePrefix}/customers/${customer.id}`)}
                      >
                        <p className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors">{customer.full_name}</p>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">{customer.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <p className="text-slate-900 font-medium">{customer.phone}</p>
                    <p className="text-slate-400 truncate max-w-[150px]">{customer.email}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-tighter shadow-sm ${getMembershipBadge(customer.membership_type)}`}>
                      {customer.membership_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{customer.total_visits}</td>
                  <td className="px-6 py-4 text-center">
                    <p className="font-bold text-pink-600">${customer.total_spent}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-1">
                      <button 
                        onClick={() => navigate(`/${rolePrefix}/customers/${customer.id}/edit`)}
                        className="p-2 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-all"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default CustomerList;
