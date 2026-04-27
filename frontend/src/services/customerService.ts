import api from './api';

export interface Customer {
  id?: number;
  full_name: string;
  phone: string;
  email?: string;
  gender: 'FEMALE' | 'MALE' | 'OTHER';
  dob?: string;
  anniversary_date?: string;
  address?: string;
  notes?: string;
  preferred_services?: string;
  membership_type: 'NONE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  profile_image?: string;
  total_visits?: number;
  total_spent?: number;
  is_active?: boolean;
}

const customerService = {
  getCustomers: (params?: any) => api.get('customers/', { params }),
  getCustomer: (id: number) => api.get(`customers/${id}/`),
  createCustomer: (data: FormData | Customer) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return api.post('customers/', data, { headers });
  },
  updateCustomer: (id: number, data: FormData | Customer) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return api.patch(`customers/${id}/`, data, { headers });
  },
  deleteCustomer: (id: number) => api.delete(`customers/${id}/`),
};

export default customerService;
