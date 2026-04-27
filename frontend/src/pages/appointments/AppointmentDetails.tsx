import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import type { Appointment } from '../../services/appointmentService';
import { 
    ArrowLeft, Calendar, User, Users, Clock, 
    CreditCard, CheckCircle2, XCircle, AlertCircle, 
    Edit, Printer, MapPin, Receipt, Scissors
} from 'lucide-react';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const res = await appointmentService.getAppointment(Number(id));
      setAppointment(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleStatusUpdate = async (status: string) => {
    try {
      await appointmentService.updateAppointment(Number(id), { status: status as any });
      alert(`Appointment is now ${status}`);
      fetchDetails();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleCancel = async () => {
    const reason = window.prompt("Reason for cancellation?");
    if (reason === null) return;
    try {
      await appointmentService.cancelAppointment(Number(id), reason);
      alert("Appointment has been cancelled.");
      fetchDetails();
    } catch (err) {
      alert("Failed to cancel.");
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center text-pink-500">Loading details...</div>;
  if (!appointment) return <div>Appointment not found</div>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-pink-500 font-bold transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to List
        </button>
        <div className="flex items-center space-x-3">
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Printer className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate('edit')}
            className="flex items-center px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-700 font-bold hover:shadow-lg transition-all shadow-sm"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit Booking
          </button>
          {appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && (
            <button
               onClick={() => handleStatusUpdate('COMPLETED')}
               className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-green-100 hover:scale-105 transition-all flex items-center"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Complete Service
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-10 py-2 rotate-45 translate-x-8 -translate-y-2 text-[10px] font-black tracking-widest uppercase ${
                appointment.status === 'COMPLETED' ? 'bg-green-500 text-white' : 
                appointment.status === 'CANCELLED' ? 'bg-red-500 text-white' : 'bg-pink-500 text-white'
            }`}>
                {appointment.status}
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center">
              Booking Details
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="p-6 bg-slate-50 rounded-3xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> Schedule
                </p>
                <p className="text-lg font-black text-slate-800">{appointment.appointment_date}</p>
                <p className="text-slate-500 font-bold">{appointment.start_time?.substring(0, 5)} - {appointment.end_time?.substring(0, 5)}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> Branch
                </p>
                <p className="text-lg font-black text-slate-800">{appointment.branch}</p>
                <p className="text-slate-500 font-bold">Standard Station</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-black text-slate-800 flex items-center">
                <Scissors className="h-5 w-5 mr-2 text-pink-500" />
                Selected Services
              </h3>
              <div className="divide-y divide-slate-50">
                {appointment.services_list?.map((s, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="h-10 w-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 mr-4">
                            {idx + 1}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">{s.service_name}</p>
                            <p className="text-xs text-slate-500">Service Reference #{s.service}</p>
                        </div>
                    </div>
                    <p className="font-black text-slate-800">${s.price_at_booking}</p>
                  </div>
                ))}
                <div className="pt-4 flex justify-between items-center text-lg">
                    <p className="font-black text-slate-400">Total Value</p>
                    <p className="font-black text-pink-600">
                        ${appointment.services_list?.reduce((acc, curr) => acc + Number(curr.price_at_booking), 0).toFixed(2)}
                    </p>
                </div>
              </div>
            </div>

            {appointment.notes && (
                <div className="mt-8 p-6 bg-amber-50 rounded-3xl border border-amber-100">
                    <p className="text-xs font-black text-amber-600 uppercase mb-2 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> Client Notes
                    </p>
                    <p className="text-amber-800 text-sm leading-relaxed">{appointment.notes}</p>
                </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-800 mb-6 flex items-center">
                    <User className="h-5 w-5 mr-2 text-pink-500" />
                    Customer Card
                </h3>
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="h-20 w-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black mb-4">
                        {appointment.customer_name?.[0]}
                    </div>
                    <p className="font-black text-xl text-slate-800">{appointment.customer_name}</p>
                    <p className="font-bold text-slate-500">{appointment.customer_phone}</p>
                </div>
                <button 
                  onClick={() => navigate(`/owner/customers/${appointment.customer}`)}
                  className="w-full py-3 border border-pink-100 text-pink-500 font-bold rounded-2xl hover:bg-pink-50 transition-all"
                >
                    View Full Profile
                </button>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-800 mb-6 flex items-center">
                    <Receipt className="h-5 w-5 mr-2 text-pink-500" />
                    Bouticien Details
                </h3>
                <div className="flex items-center p-4 bg-slate-50 rounded-2xl">
                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 mr-3">
                        <Users className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-black uppercase">Assigned Staff</p>
                        <p className="font-black text-slate-800">{appointment.staff_name || 'Beautician Not Assigned'}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-800 mb-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-pink-500" />
                    Payment Summary
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                        <span className="text-slate-500 font-bold">Advance Paid</span>
                        <span className="font-black text-green-600">${appointment.advance_payment}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-slate-500 font-bold">Payment Status</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                            appointment.payment_status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                            {appointment.payment_status}
                        </span>
                    </div>
                </div>
            </div>

            {appointment.status !== 'CANCELLED' && (
                <button
                    onClick={handleCancel}
                    className="w-full py-4 border-2 border-red-50 text-red-500 font-black rounded-[2rem] hover:bg-red-50 transition-all flex items-center justify-center"
                >
                    <XCircle className="h-5 w-5 mr-2" />
                    Cancel Appointment
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
