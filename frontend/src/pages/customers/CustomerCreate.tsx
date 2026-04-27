import { useNavigate } from 'react-router-dom';
import customerService from '../../services/customerService';
import CustomerForm from '../../components/customers/CustomerForm';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CustomerCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const rolePrefix = user?.role.toLowerCase() || 'staff';
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await customerService.createCustomer(data);
      if (user?.role === 'OWNER') {
        navigate(`/${rolePrefix}/customers`);
      } else {
        // Staying on the same page for staff/manager, just resetting or showing success
        // The form component should ideally handle its own reset or we can force a reload
        window.location.reload(); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {user?.role === 'OWNER' && (
            <button 
              onClick={() => navigate(`/${rolePrefix}/customers`)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-slate-600" />
            </button>
          )}
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Add New Customer</h2>
            <p className="text-slate-500">Enter personal and membership details</p>
          </div>
        </div>
      </div>

      <div className="parakh-card p-8">
        <div className="parakh-card-gradient bg-gradient-to-r from-pink-500 to-purple-600" />
        <CustomerForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CustomerCreate;
