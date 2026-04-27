import api from './api';

export interface InvoiceItem {
  id?: number;
  item_type: 'SERVICE' | 'PRODUCT' | 'OTHER';
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Invoice {
  id?: number;
  invoice_number?: string;
  appointment?: number;
  appointment_id?: number;
  customer: number;
  customer_name?: string;
  customer_phone?: string;
  sub_total: number;
  tax_percentage: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  amount_paid: number;
  status: 'PENDING' | 'PAID' | 'PARTIAL' | 'CANCELLED';
  payment_method: 'CASH' | 'CARD' | 'UPI' | 'WALLET';
  items?: InvoiceItem[];
  created_at?: string;
}

const billingService = {
  getInvoices: (params?: any) => api.get('invoices/', { params }),
  getInvoice: (id: number) => api.get(`invoices/${id}/`),
  createInvoice: (data: Partial<Invoice>) => api.post('invoices/', data),
  updateInvoice: (id: number, data: Partial<Invoice>) => api.patch(`invoices/${id}/`, data),
  deleteInvoice: (id: number) => api.delete(`invoices/${id}/`),
};

export default billingService;
