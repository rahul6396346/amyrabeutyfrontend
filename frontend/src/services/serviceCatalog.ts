import api from './api';

export interface ServiceCategory {
  id: number;
  name: string;
  description?: string;
}

export interface Service {
  id?: number;
  category: number;
  category_name?: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
  is_active?: boolean;
}

const serviceCatalog = {
  getCategories: () => api.get('service-categories/', { params: { all: 'true' } }),
  createCategory: (data: Partial<ServiceCategory>) => api.post('service-categories/', data),
  
  getServices: (params?: any) => api.get('services/', { params }),
  getService: (id: number) => api.get(`services/${id}/`),
  createService: (data: Service) => api.post('services/', data),
  updateService: (id: number, data: Partial<Service>) => api.patch(`services/${id}/`, data),
  deleteService: (id: number) => api.delete(`services/${id}/`),
};

export default serviceCatalog;
