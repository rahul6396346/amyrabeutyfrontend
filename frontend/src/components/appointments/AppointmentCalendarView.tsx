import { ChevronLeft, ChevronRight, Clock, User, Scissors } from 'lucide-react';
import type { Appointment } from '../../services/appointmentService';

interface CalendarViewProps {
  appointments: Appointment[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onAppointmentClick: (id: number) => void;
}

const AppointmentCalendarView = ({ appointments, currentDate, onDateChange, onAppointmentClick }: CalendarViewProps) => {
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

  const getDayAppointments = () => {
    return appointments.filter(app => {
      const appDate = app.appointment_date;
      const curDateStr = currentDate.toISOString().split('T')[0];
      return appDate === curDateStr;
    });
  };

  const dayAppointments = getDayAppointments();

  const prevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    onDateChange(d);
  };

  const nextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    onDateChange(d);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <h3 className="font-black text-xl text-slate-800 flex items-center">
            <Clock className="h-6 w-6 mr-2 text-pink-500" />
            Daily Schedule
        </h3>
        <div className="flex items-center space-x-4">
          <button onClick={prevDay} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><ChevronLeft /></button>
          <span className="font-bold text-slate-600">{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          <button onClick={nextDay} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><ChevronRight /></button>
        </div>
      </div>

      <div className="relative overflow-auto" style={{ maxHeight: '600px' }}>
        {/* Time Grid */}
        <div className="flex">
          <div className="w-20 border-r border-slate-50 bg-slate-50/50">
            {hours.map(h => (
              <div key={h} className="h-24 px-2 py-4 text-[10px] font-black text-slate-400 text-right border-b border-slate-100">
                {h % 12 || 12}:00 {h >= 12 ? 'PM' : 'AM'}
              </div>
            ))}
          </div>

          <div className="flex-1 relative bg-white">
            {hours.map(h => (
              <div key={h} className="h-24 border-b border-slate-50 w-full" />
            ))}

            {/* Appointment Blocks */}
            {dayAppointments.map(app => {
              const startH = parseInt(app.start_time.split(':')[0]);
              const startM = parseInt(app.start_time.split(':')[1]);
              const endH = parseInt(app.end_time.split(':')[0]);
              const endM = parseInt(app.end_time.split(':')[1]);
              
              const top = ((startH - 8) * 96) + (startM / 60 * 96);
              const height = ((endH - startH) * 96) + ((endM - startM) / 60 * 96);

              return (
                <div
                  key={app.id}
                  onClick={() => onAppointmentClick(app.id!)}
                  className="absolute left-2 right-2 rounded-2xl border-l-4 p-3 cursor-pointer hover:brightness-95 transition-all overflow-hidden z-10"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: app.status === 'COMPLETED' ? '#f0fdf4' : app.status === 'CANCELLED' ? '#fef2f2' : '#fdf2f8',
                    borderColor: app.status === 'COMPLETED' ? '#16a34a' : app.status === 'CANCELLED' ? '#dc2626' : '#db2777',
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-pink-900 text-xs truncate">{app.customer_name}</p>
                      <span className="text-[10px] font-bold text-slate-500">{app.start_time.substring(0, 5)}</span>
                    </div>
                    
                    <div className="flex items-center text-[10px] text-slate-600 mb-1">
                      <Scissors className="h-3 w-3 mr-1" />
                      <span className="truncate">{app.services_list?.map(s => s.service_name).join(', ')}</span>
                    </div>

                    <div className="mt-auto flex items-center text-[9px] font-black uppercase text-slate-400">
                      <User className="h-3 w-3 mr-1" />
                      {app.staff_name || 'Unassigned'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendarView;
