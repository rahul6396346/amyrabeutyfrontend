import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import billingService, { type Invoice } from '../../services/billingService';
import { Search, Download, Filter, Receipt, Eye, ExternalLink, Loader2 } from 'lucide-react';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const res = await billingService.getInvoices();
      const data = res.data.results || res.data;
      setInvoices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter(inv => 
    inv.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Billing & <span className="text-pink-500">Revenue</span></h1>
          <p className="text-slate-500 font-medium mt-1">Track payments and manage sales receipts</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-700 font-bold hover:shadow-lg transition-all shadow-sm flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Financial Report
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-[32px] p-8 text-white shadow-xl shadow-pink-100">
              <p className="font-bold opacity-80 uppercase text-xs tracking-widest mb-1">Total Revenue</p>
              <h3 className="text-3xl font-black">${invoices.reduce((acc, curr) => acc + Number(curr.total_amount), 0).toFixed(2)}</h3>
          </div>
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <p className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-1">Pending Invoices</p>
              <h3 className="text-3xl font-black text-slate-800">{invoices.filter(i => i.status === 'PENDING').length}</h3>
          </div>
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <p className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-1">Paid Today</p>
              <h3 className="text-3xl font-black text-slate-800">
                  ${invoices.filter(i => i.status === 'PAID').reduce((acc, curr) => acc + Number(curr.total_amount), 0).toFixed(2)}
              </h3>
          </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search invoice # or customer..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-pink-500/10 placeholder:text-slate-400 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-100 rounded-3xl text-slate-600 font-bold flex items-center hover:bg-slate-50 transition-all shadow-sm">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-pink-500 animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Invoice #</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right font-black text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-pink-50/20 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                        <Receipt className="h-4 w-4 mr-3 text-pink-400" />
                        <span className="font-black text-slate-800">{inv.invoice_number}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-bold text-slate-700">{inv.customer_name}</p>
                      <p className="text-xs text-slate-400">{inv.customer_phone}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                      {inv.created_at ? new Date(inv.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-black text-slate-800">${Number(inv.total_amount).toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                      inv.status === 'PAID' ? 'bg-green-100 text-green-600' :
                      inv.status === 'CANCELLED' ? 'bg-slate-100 text-slate-500' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => navigate(`${inv.id}`)}
                          className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-pink-500 border border-transparent hover:border-pink-100"
                        >
                            <Eye className="h-5 w-5" />
                        </button>
                        {inv.appointment_id && (
                            <button
                              onClick={() => navigate(`/owner/appointments/${inv.appointment_id}`)}
                              className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-blue-500 border border-transparent hover:border-blue-100"
                              title="Go to Appointment"
                            >
                                <ExternalLink className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center">
                            <Receipt className="h-12 w-12 text-slate-200 mb-4" />
                            <p className="text-slate-400 font-bold">No invoices found matching your search.</p>
                        </div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
