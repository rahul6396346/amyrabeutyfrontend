import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Customer } from '../../services/customerService';
import { Loader2 } from 'lucide-react';

const customerSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  gender: z.enum(['FEMALE', 'MALE', 'OTHER']),
  membership_type: z.enum(['NONE', 'SILVER', 'GOLD', 'PLATINUM']),
  dob: z.string().optional(),
  anniversary_date: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  preferred_services: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  initialData?: Partial<Customer>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const CustomerForm = ({ initialData, onSubmit, isLoading }: CustomerFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      gender: 'FEMALE',
      membership_type: 'NONE',
      ...initialData,
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
          <input
            {...register('full_name')}
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.full_name ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-pink-500 outline-none`}
            placeholder="e.g. Neha Sharma"
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
          <input
            {...register('phone')}
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-pink-500 outline-none`}
            placeholder="9876543210"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="neha@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
          <select
            {...register('gender')}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Membership Type</label>
          <select
            {...register('membership_type')}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="NONE">None</option>
            <option value="SILVER">Silver</option>
            <option value="GOLD">Gold</option>
            <option value="PLATINUM">Platinum</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
          <input
            {...register('dob')}
            type="date"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
        <textarea
          {...register('address')}
          rows={3}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Enter detailed address..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
        <textarea
          {...register('notes')}
          rows={2}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Any special requests or details..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          className="px-6 py-2.5 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all flex items-center"
        >
          {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          {initialData ? 'Update Customer' : 'Save Customer'}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
