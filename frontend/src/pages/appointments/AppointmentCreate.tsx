import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import AppointmentForm from '../../components/appointments/AppointmentForm';
import { ArrowLeft, Sparkles } from 'lucide-react';

const AppointmentCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBooking = async (data: any) => {
    setIsLoading(true);
    try {
      await appointmentService.createAppointment(data);
      alert("Appointment booked successfully!");
      navigate('/owner/appointments');
    } catch (err: any) {
      alert("Booking Failed: " + (err.response?.data?.assigned_staff || "Check for overlaps."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-pink-500 font-bold transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Schedule
        </button>
        <div className="flex items-center text-pink-500 bg-pink-50 px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-xs font-black uppercase">New Booking</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-purple-100/50 blur-3xl -z-10" />
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[40px] p-8 shadow-2xl shadow-pink-100/50">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-800">New Appointment</h1>
            <p className="text-slate-500 mt-1">Reserve a slot for your customer with our premium beauticians.</p>
          </div>

          <AppointmentForm onSubmit={handleBooking} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCreate;
