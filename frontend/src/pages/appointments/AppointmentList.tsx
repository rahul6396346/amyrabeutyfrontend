import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import type { Appointment } from '../../services/appointmentService';
import { Plus, Calendar as CalendarIcon, List, Search, Download, Filter, Loader2 } from 'lucide-react';
import AppointmentCalendarView from '../../components/appointments/AppointmentCalendarView';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [view, setView] = useState<'calendar' | 'table'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await appointmentService.getAppointments({ all: 'true' });
      const data = res.data.results || res.data;
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(app => 
    app.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.customer_phone?.includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Appointment <span className="text-pink-500">Center</span></h1>
          <p className="text-slate-500 font-medium mt-1">Manage your salon schedule and beauticians</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center px-4 py-2 rounded-xl transition-all ${view === 'calendar' ? 'bg-white shadow-sm text-pink-500' : 'text-slate-500'}`}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setView('table')}
              className={`flex items-center px-4 py-2 rounded-xl transition-all ${view === 'table' ? 'bg-white shadow-sm text-pink-500' : 'text-slate-500'}`}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </button>
          </div>

          <button
            onClick={() => navigate('new')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-pink-100 hover:scale-105 active:scale-95 transition-all flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Book New
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by customer name or phone..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-pink-500/10 placeholder:text-slate-400 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-100 rounded-3xl text-slate-600 font-bold flex items-center hover:bg-slate-50 transition-all shadow-sm">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
        <button className="p-4 bg-white border border-slate-100 rounded-3xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <Download className="h-5 w-5" />
        </button>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-pink-500 animate-spin" />
        </div>
      ) : (
        <>
          {view === 'calendar' ? (
            <AppointmentCalendarView
              appointments={filteredAppointments}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onAppointmentClick={(id) => navigate(`${id}`)}
            />
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Staff</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredAppointments.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => navigate(`${app.id}`)}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-slate-800">{app.customer_name}</p>
                          <p className="text-xs text-slate-500">{app.customer_phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {app.services_list?.map((s, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-pink-50 text-pink-600 rounded-md text-[10px] font-bold">
                              {s.service_name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{app.staff_name || 'TBD'}</td>
                      <td className="px-6 py-4">
                        <div className="text-xs">
                          <p className="font-bold text-slate-700">{app.appointment_date}</p>
                          <p className="text-slate-500">{app.start_time?.substring(0, 5)} - {app.end_time?.substring(0, 5)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          app.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                          app.status === 'CANCELLED' ? 'bg-red-100 text-red-600' :
                          app.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white border rounded-xl transition-all">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentList;
