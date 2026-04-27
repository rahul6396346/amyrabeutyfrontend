import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customerService from '../../services/customerService';
import type { Customer } from '../../services/customerService';
import CustomerForm from '../../components/customers/CustomerForm';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const rolePrefix = user?.role.toLowerCase() || 'staff';
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await customerService.getCustomer(Number(id));
        setCustomer(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await customerService.updateCustomer(Number(id), data);
      navigate(`/${rolePrefix}/customers/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!customer) return <div className="p-10 text-center">Loading customer data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(`/${rolePrefix}/customers/${id}`)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6 text-slate-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Edit Customer Profile</h2>
            <p className="text-slate-500">Modify personal or membership details</p>
          </div>
        </div>
      </div>

      <div className="parakh-card p-8">
        <div className="parakh-card-gradient bg-gradient-to-r from-blue-500 to-indigo-600" />
        <CustomerForm initialData={customer} onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CustomerEdit;
