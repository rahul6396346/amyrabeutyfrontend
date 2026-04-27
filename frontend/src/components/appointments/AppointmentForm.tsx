import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Appointment } from '../../services/appointmentService';
import { useEffect, useState } from 'react';
import customerService from '../../services/customerService';
import api from '../../services/api';
import { Loader2 } from 'lucide-react';

const appointmentSchema = z.object({
  customer: z.number().min(1, 'Customer is required'),
  assigned_staff: z.number().min(1, 'Staff is required'),
  service_ids: z.array(z.number()).min(1, 'At least one service is required'),
  appointment_date: z.string().min(1, 'Date is required'),
  start_time: z.string().min(1, 'Start time is required'),
  end_time: z.string().min(1, 'End time is required'),
  status: z.string(),
  booking_source: z.string(),
  advance_payment: z.number().optional(),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  initialData?: Partial<Appointment>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const AppointmentForm = ({ initialData, onSubmit, isLoading }: AppointmentFormProps) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      status: 'PENDING',
      booking_source: 'WALK_IN',
      service_ids: [],
      ...initialData,
    }
  });

  useEffect(() => {
    // In production, use debounced search for customers
    customerService.getCustomers({ all: 'true' }).then(res => setCustomers(res.data));
    api.get('staff/').then(res => setStaff(res.data.results || res.data));
    api.get('services/').then(res => setServices(res.data.results || res.data));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Select */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Select Customer *</label>
          <select
            {...register('customer', { valueAsNumber: true })}
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.customer ? 'border-red-500' : 'border-slate-200'} rounded-xl outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="">Choose a customer...</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.full_name} ({c.phone})</option>)}
          </select>
          {errors.customer && <p className="text-red-500 text-xs mt-1">{errors.customer.message}</p>}
        </div>

        {/* Staff Select */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Beautician *</label>
          <select
            {...register('assigned_staff', { valueAsNumber: true })}
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.assigned_staff ? 'border-red-500' : 'border-slate-200'} rounded-xl outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="">Choose staff...</option>
            {staff.map(s => <option key={s.id} value={s.id}>{s.user_name || s.username || `Staff #${s.id}`}</option>)}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Appointment Date *</label>
          <input
            type="date"
            {...register('appointment_date')}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Times */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Start Time *</label>
            <input
              type="time"
              {...register('start_time')}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">End Time *</label>
            <input
              type="time"
              {...register('end_time')}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Services Multi-Select */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Services *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {services.map(s => (
              <label key={s.id} className="flex items-center space-x-2 p-3 border border-slate-100 rounded-xl hover:bg-pink-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  value={s.id}
                  {...register('service_ids')}
                  onChange={(e) => {
                    const current = watch('service_ids') || [];
                    const val = parseInt(e.target.value);
                    if (e.target.checked) {
                      setValue('service_ids', [...current, val]);
                    } else {
                      setValue('service_ids', current.filter(id => id !== val));
                    }
                  }}
                  className="rounded text-pink-500 focus:ring-pink-500"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-800">{s.name}</p>
                  <p className="text-slate-500">${s.price}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Booking Source</label>
          <select
            {...register('booking_source')}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="WALK_IN">Walk-in</option>
            <option value="ONLINE">Online</option>
            <option value="CALL">Phone Call</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Advance Payment</label>
            <input
                type="number"
                {...register('advance_payment', { valueAsNumber: true })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="0.00"
            />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Special Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Client preferences, allergies, etc..."
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-12 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-pink-100 hover:shadow-pink-200 transform active:scale-95 transition-all flex items-center"
        >
          {isLoading && <Loader2 className="animate-spin h-5 w-5 mr-3" />}
          {initialData ? 'Reschedule Appointment' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
