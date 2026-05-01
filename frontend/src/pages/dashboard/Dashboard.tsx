import { useEffect, useState } from 'react';
import { TrendingUp, Users, Calendar, Scissors, DollarSign,  Sparkles, Clock, ChevronRight } from 'lucide-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const res = await api.get('admin/stats/');
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
            <div className="h-20 w-20 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin" />
            <Scissors className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-pink-500" />
        </div>
        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Crunshing Salon Numbers...</p>
    </div>
  );

  const stats = [
    { 
        name: 'Total Revenue', 
        value: `$${Number(data?.total_revenue || 0).toLocaleString()}`, 
        change: '+12.5%', 
        icon: DollarSign, 
        color: 'from-emerald-400 to-green-600',
        shadow: 'shadow-emerald-100'
    },
    { 
        name: 'Active Customers', 
        value: data?.total_customers || 0, 
        change: '+5.2%', 
        icon: Users, 
        color: 'from-blue-400 to-indigo-600',
        shadow: 'shadow-blue-100'
    },
    { 
        name: 'Upcoming Bookings', 
        value: data?.upcoming_appointments || 0, 
        change: '+8.1%', 
        icon: Calendar, 
        color: 'from-purple-400 to-fuchsia-600',
        shadow: 'shadow-purple-100'
    },
    { 
        name: 'Services Completed', 
        value: data?.services_done || 0, 
        change: '+14.2%', 
        icon: Scissors, 
        color: 'from-pink-400 to-rose-600',
        shadow: 'shadow-pink-100'
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live System Status</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Business <span className="text-pink-500">Pulse</span></h1>
          <p className="text-slate-500 font-medium">Real-time performance analytics for your salon empire.</p>
        </div>
        
        <button 
          onClick={() => navigate('/owner/appointments/new')}
          className="group px-8 py-4 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center"
        >
          <Sparkles className="h-5 w-5 mr-3 text-pink-400 group-hover:rotate-12 transition-transform" />
          Quick Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className={`relative bg-white rounded-[40px] p-8 border border-white hover:border-pink-50 transition-all group overflow-hidden ${stat.shadow} hover:shadow-2xl`}>
             <div className={`absolute top-0 right-10 h-1 w-20 bg-gradient-to-r ${stat.color} rounded-b-full`} />
             
             <div className="flex flex-col justify-between h-full">
                <div className="mb-8">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                        <stat.icon className="h-7 w-7" />
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.name}</p>
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
                </div>
                
                <div className="flex items-center text-xs font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[50px] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-600" />
          <div className="flex items-center justify-between mb-10">
            <div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Revenue Trajectory</h3>
                <p className="text-slate-400 text-sm font-medium">Simulated monthly growth projections</p>
            </div>
            <select className="bg-slate-50 border-none rounded-2xl px-4 py-2 text-xs font-bold text-slate-500 outline-none">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
            </select>
          </div>
          
          <div className="w-full h-80 bg-slate-50/50 rounded-[40px] flex items-center justify-center border-4 border-dashed border-slate-100 group-hover:scale-[1.01] transition-transform">
             <div className="text-center">
                <TrendingUp className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Analytics Visualization Loading...</p>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[50px] p-10 border border-slate-50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-500" />
          <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Recent Activity</h3>
              <button onClick={() => navigate('/owner/appointments')} className="text-pink-500 font-black text-xs uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
          </div>

          <div className="space-y-6">
            {data?.recent_appointments?.map((app: any, i: number) => (
              <div 
                key={i} 
                onClick={() => navigate(`/owner/appointments/${app.id}`)}
                className="flex items-center gap-4 p-4 rounded-[2rem] hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100 group"
              >
                <div className="h-14 w-14 rounded-2xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-pink-100 group-hover:text-pink-500 transition-all">
                  {app.customer_name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-black text-slate-800 truncate">{app.customer_name}</p>
                  <div className="flex items-center text-xs font-bold text-slate-500">
                      <Clock className="h-3 w-3 mr-1" /> {app.time} • {app.service}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                    app.status === 'CONFIRMED' ? 'bg-green-100 text-green-600' : 
                    app.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
                }`}>
                    {app.status}
                </div>
              </div>
            ))}
            {!data?.recent_appointments?.length && (
                <p className="text-center text-slate-400 font-bold py-20">No recent activity found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
