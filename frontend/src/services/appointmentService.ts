import api from './api';

export interface Appointment {
  id?: number;
  customer: number;
  customer_name?: string;
  customer_phone?: string;
  assigned_staff: number;
  staff_name?: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  payment_status: 'PENDING' | 'PARTIAL' | 'PAID';
  booking_source: 'WALK_IN' | 'ONLINE' | 'CALL' | 'WHATSAPP';
  notes?: string;
  advance_payment?: number;
  branch?: string;
  service_ids?: number[];
  services_list?: any[];
}

const appointmentService = {
  getAppointments: (params?: any) => api.get('appointments/', { params }),
  getCalendarAppointments: (start: string, end: string) => 
    api.get('appointments/', { params: { start_date: start, end_date: end, all: 'true' } }),
  getAppointment: (id: number) => api.get(`appointments/${id}/`),
  createAppointment: (data: Appointment) => api.post('appointments/', data),
  updateAppointment: (id: number, data: Partial<Appointment>) => api.patch(`appointments/${id}/`, data),
  cancelAppointment: (id: number, reason: string) => 
    api.delete(`appointments/${id}/`, { data: { cancellation_reason: reason } }),
};

export default appointmentService;
