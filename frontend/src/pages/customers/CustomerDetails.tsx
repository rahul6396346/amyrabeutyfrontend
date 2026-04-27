import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customerService from '../../services/customerService';
import type { Customer } from '../../services/customerService';
import { ArrowLeft, Edit, MapPin, Phone, Mail, Cake, Heart, History, Clock, DollarSign, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const rolePrefix = user?.role.toLowerCase() || 'staff';
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await customerService.getCustomer(Number(id));
        setCustomer(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading) return <div className="p-10 text-center font-bold text-slate-500">Loading Client Profile...</div>;
  if (!customer) return <div className="p-10 text-center text-red-500">Customer not found.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(`/${rolePrefix}/customers`)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6 text-slate-600" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-3xl bg-pink-500 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-pink-100 border-4 border-white">
              {customer.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{customer.full_name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className="px-3 py-0.5 bg-pink-100 text-pink-600 text-[10px] font-black rounded-full uppercase tracking-tighter">
                  {customer.membership_type} MEMBER
                </span>
                <span className={`h-2 w-2 rounded-full ${customer.is_active ? 'bg-green-500' : 'bg-slate-300'}`} />
                <span className="text-xs text-slate-400 font-bold uppercase">{customer.is_active ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/${rolePrefix}/customers/${id}/edit`)}
          className="flex items-center justify-center space-x-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl"
        >
          <Edit className="h-4 w-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Stats & Info */}
        <div className="space-y-6">
          <div className="parakh-card p-6">
            <div className="parakh-card-gradient bg-pink-500" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Loyalty Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
                    <History className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Total Visits</p>
                    <p className="text-lg font-black text-slate-800">{customer.total_visits}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-bold uppercase">Last Visit</p>
                  <p className="text-sm font-bold text-slate-800">12 Oct, 2023</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Total Revenue</p>
                    <p className="text-lg font-black text-slate-800">${customer.total_spent}</p>
                  </div>
                </div>
                <div className="text-right text-green-600">
                  <p className="text-[10px] font-black uppercase text-slate-400">Avg / Visit</p>
                  <p className="text-sm font-bold">${(Number(customer.total_spent) / (customer.total_visits || 1)).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="parakh-card p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-slate-400" />
                <p className="text-slate-700 font-bold">{customer.phone}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-slate-400" />
                <p className="text-slate-700 font-medium">{customer.email || 'No email provided'}</p>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-slate-400" />
                <p className="text-slate-700 text-sm leading-relaxed">{customer.address || 'No address on file'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: History & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="parakh-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Personal Details</h3>
              <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-pink-500 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-slate-400 mb-1">
                  <Cake className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase">Birth Date</span>
                </div>
                <p className="text-slate-800 font-bold">{customer.dob || 'Not set'}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-slate-400 mb-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase">Anniversary</span>
                </div>
                <p className="text-slate-800 font-bold">{customer.anniversary_date || 'Not set'}</p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <div className="flex items-center space-x-2 text-slate-400 mb-1">
                  <Star className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase">Preferred Services</span>
                </div>
                <p className="text-slate-800 font-medium leading-relaxed">{customer.preferred_services || 'No data yet'}</p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <div className="flex items-center space-x-2 text-slate-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase">Notes & Observations</span>
                </div>
                <p className="p-4 bg-slate-50 rounded-2xl text-slate-600 text-sm italic border-l-4 border-pink-500">
                  {customer.notes || 'No internal notes available for this client.'}
                </p>
              </div>
            </div>
          </div>

          <div className="parakh-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
              <button className="text-pink-500 text-xs font-black uppercase hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex space-x-4 border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs">
                    {i === 0 ? 'NOW' : 'OCT'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-800">Hair Coloring & Spa</p>
                      <p className="text-pink-600 font-black">$120.00</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 uppercase font-medium tracking-widest">Served by: Rahul Sharma</p>
                    <p className="text-xs text-slate-400 mt-1">12 Oct 2023, 04:30 PM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
