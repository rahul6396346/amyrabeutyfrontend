import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import billingService, { type Invoice } from '../../services/billingService';
import { 
    ArrowLeft, Printer,  Mail, 
    CheckCircle2, CreditCard, User, 
     Scissors, Package, Loader2, AlertTriangle
} from 'lucide-react';

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const fetchInvoice = async () => {
    try {
      const res = await billingService.getInvoice(Number(id));
      setInvoice(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const handleUpdateStatus = async (status: string) => {
    setIsUpdating(true);
    try {
      await billingService.updateInvoice(Number(id), { status: status as any });
      alert(`Invoice marked as ${status}`);
      fetchInvoice();
    } catch (err) {
      alert("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 text-pink-500 animate-spin" /></div>;
  if (!invoice) return <div>Invoice not found.</div>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 print:p-0">
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-pink-500 font-bold transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Billing
        </button>
        
        <div className="flex items-center gap-3">
          <button onClick={handlePrint} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Printer className="h-5 w-5" />
          </button>
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Mail className="h-5 w-5" />
          </button>
          
          {invoice.status === 'PENDING' && (
              <button
                onClick={() => handleUpdateStatus('PAID')}
                disabled={isUpdating}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:scale-105 transition-all flex items-center"
              >
                {isUpdating ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <CheckCircle2 className="h-5 w-5 mr-2" />}
                Mark as Paid
              </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-[50px] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden relative">
        {/* Receipt Header Style */}
        <div className="h-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500" />
        
        <div className="p-12 md:p-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
            <div>
              <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white mr-4">
                      <Scissors className="h-7 w-7" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Amyra<span className="text-pink-500">Beauty</span></h2>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Salon & Spa Luxe</p>
                  </div>
              </div>
              <div className="space-y-1 text-slate-500 font-medium text-sm">
                  <p>123 Elegance Boulevard, High Street</p>
                  <p>Mumbai, Maharashtra - 400001</p>
                  <p>GSTIN: 27AAAAA0000A1Z5</p>
                  <p className="pt-2">+91 98765 43210</p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <div className="inline-block px-4 py-2 bg-pink-50 rounded-2xl text-pink-500 text-xs font-black uppercase tracking-widest mb-4">
                  Tax Invoice
              </div>
              <h1 className="text-5xl font-black text-slate-800 mb-2 uppercase tracking-tighter">#{invoice.invoice_number?.split('-').pop()}</h1>
              <p className="text-slate-400 font-bold mb-8">{invoice.invoice_number}</p>
              
              <div className="space-y-2">
                  <div className="flex md:justify-end items-center text-sm text-slate-500">
                      <span className="font-bold mr-4 uppercase tracking-widest text-[10px]">Invoice Date:</span>
                      <span className="font-black text-slate-800">
                          {invoice.created_at ? new Date(invoice.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                      </span>
                  </div>
                  <div className="flex md:justify-end items-center text-sm text-slate-500">
                      <span className="font-bold mr-4 uppercase tracking-widest text-[10px]">Due Date:</span>
                      <span className="font-black text-slate-800">Upon Receipt</span>
                  </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 py-12 border-y border-slate-100">
              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Bill To</h4>
                <div className="flex items-start">
                    <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mr-4 border border-slate-100">
                        <User className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-xl font-black text-slate-800">{invoice.customer_name}</p>
                        <p className="text-slate-500 font-bold">{invoice.customer_phone}</p>
                        <p className="text-xs text-slate-400 mt-2">Registered Member</p>
                    </div>
                </div>
              </div>

              <div className="space-y-6 md:text-right flex flex-col md:items-end">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Payment Info</h4>
                <div className="flex flex-col gap-2">
                    <div className="flex md:justify-end items-center">
                        <span className="text-[10px] font-black uppercase text-slate-400 mr-3">Status</span>
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${
                            invoice.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                            {invoice.status}
                        </span>
                    </div>
                    <div className="flex md:justify-end items-center">
                        <span className="text-[10px] font-black uppercase text-slate-400 mr-3">Method</span>
                        <div className="flex items-center text-slate-700 font-black">
                            <CreditCard className="h-4 w-4 mr-2 text-pink-500" />
                            {invoice.payment_method}
                        </div>
                    </div>
                </div>
              </div>
          </div>

          {/* Items Table */}
          <div className="mb-16">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Service Summary</h4>
              <table className="w-full">
                  <thead>
                      <tr className="border-b-2 border-slate-800">
                          <th className="py-4 text-left font-black text-slate-800 uppercase text-xs">Description</th>
                          <th className="py-4 text-center font-black text-slate-800 uppercase text-xs">Qty</th>
                          <th className="py-4 text-right font-black text-slate-800 uppercase text-xs">Price</th>
                          <th className="py-4 text-right font-black text-slate-800 uppercase text-xs">Total</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {invoice.items?.map((item, idx) => (
                        <tr key={idx} className="group">
                            <td className="py-6">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center mr-3 text-pink-400">
                                        {item.item_type === 'SERVICE' ? <Scissors className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-800">{item.description}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.item_type}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-6 text-center font-bold text-slate-600">{item.quantity}</td>
                            <td className="py-6 text-right font-bold text-slate-600">${Number(item.unit_price).toFixed(2)}</td>
                            <td className="py-6 text-right font-black text-slate-800">${Number(item.total_price).toFixed(2)}</td>
                        </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          {/* Totals */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-12 border-t-4 border-slate-100">
              <div className="flex-1 max-w-sm">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" /> Important Notes
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          All payments are non-refundable. Service disputes must be raised within 24 hours. Thank you for choosing Amyra Beauty for your transformation.
                      </p>
                  </div>
              </div>

              <div className="w-full md:w-80 space-y-4">
                  <div className="flex justify-between items-center text-slate-500 font-bold">
                      <span>Subtotal</span>
                      <span>${Number(invoice.sub_total).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 font-bold">
                      <span>Tax ({Number(invoice.tax_percentage)}%)</span>
                      <span>+${Number(invoice.tax_amount).toFixed(2)}</span>
                  </div>
                  {Number(invoice.discount_amount) > 0 && (
                      <div className="flex justify-between items-center text-green-500 font-bold">
                        <span>Discount</span>
                        <span>-${Number(invoice.discount_amount).toFixed(2)}</span>
                      </div>
                  )}
                  <div className="pt-4 border-t-2 border-slate-800 flex justify-between items-center">
                      <span className="text-xl font-black text-slate-800">Grand Total</span>
                      <span className="text-3xl font-black text-pink-600">${Number(invoice.total_amount).toFixed(2)}</span>
                  </div>
                  {Number(invoice.amount_paid) > 0 && (
                      <div className="flex justify-between items-center text-sm text-slate-400 font-bold">
                        <span>Amount Paid (Advance)</span>
                        <span>-${Number(invoice.amount_paid).toFixed(2)}</span>
                      </div>
                  )}
                  <div className="flex justify-between items-center p-4 bg-slate-900 rounded-2xl text-white">
                      <span className="text-xs font-black uppercase tracking-widest">Balance Due</span>
                      <span className="text-xl font-black">
                          ${(Number(invoice.total_amount) - Number(invoice.amount_paid)).toFixed(2)}
                      </span>
                  </div>
              </div>
          </div>
          
          <div className="mt-20 pt-16 border-t border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent w-full mb-12" />
              <p className="text-2xl font-black text-slate-800 mb-2 italic">Beauty is more than just a surface.</p>
              <p className="text-slate-400 font-bold">Thank you for visiting! ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
