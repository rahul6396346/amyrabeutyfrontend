import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import type { Appointment } from '../../services/appointmentService';
import AppointmentForm from '../../components/appointments/AppointmentForm';
import { ArrowLeft, Loader2 } from 'lucide-react';

const AppointmentEdit = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    appointmentService.getAppointment(Number(id)).then(res => {
      const data = res.data;
      setAppointment({
        ...data,
        service_ids: data.services_list?.map((s: any) => s.service) || []
      });
      setIsLoading(false);
    });
  }, [id]);

  const handleUpdate = async (data: any) => {
    setIsSaving(true);
    try {
      await appointmentService.updateAppointment(Number(id), data);
      alert("Appointment updated successfully.");
      navigate(`/owner/appointments/${id}`);
    } catch (err: any) {
      alert("Update Failed: " + (err.response?.data?.assigned_staff || "Check for overlaps."));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-pink-500" /></div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-pink-500 font-bold transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Cancel Editing
        </button>
      </div>

      <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800 mb-8">Edit Booking</h1>
        <AppointmentForm initialData={appointment!} onSubmit={handleUpdate} isLoading={isSaving} />
      </div>
    </div>
  );
};

export default AppointmentEdit;
