import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceCatalog, { type ServiceCategory } from '../../services/serviceCatalog';
import { 
    ArrowLeft, Scissors, Clock, DollarSign, 
    Tag, Info, Save, Sparkles, AlertCircle, 
    CheckCircle2, PlusCircle, Loader2
} from 'lucide-react';

const ServiceCreate = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      category: '',
      price: '',
      duration_minutes: '30',
      description: '',
      is_active: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    serviceCatalog.getCategories().then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await serviceCatalog.createService({
          ...formData,
          category: Number(formData.category),
          price: Number(formData.price),
          duration_minutes: Number(formData.duration_minutes)
      });
      alert("Service added to catalog!");
      navigate('/owner/services');
    } catch (err) {
      alert("Failed to create service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-pink-500 font-bold transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </button>
        <div className="flex items-center text-pink-500 bg-pink-50 px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-xs font-black uppercase">Service Creation</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-purple-100/50 blur-3xl -z-10" />
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-pink-100/50">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">New <span className="text-pink-500">Service</span></h1>
            <p className="text-slate-500 font-medium mt-1">Define the transformation you offer to your clients.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Scissors className="h-3 w-3 mr-2" /> Service Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Brazilian Blowout"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-slate-800 placeholder:text-slate-300"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Tag className="h-3 w-3 mr-2" /> Category
                </label>
                <div className="relative">
                    <select
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-slate-800 appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                    </select>
                    <PlusCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-500 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <DollarSign className="h-3 w-3 mr-2" /> Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-slate-800"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Clock className="h-3 w-3 mr-2" /> Duration (Minutes)
                </label>
                <div className="relative">
                    <input
                    type="number"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-slate-800"
                    value={formData.duration_minutes}
                    onChange={e => setFormData({...formData, duration_minutes: e.target.value})}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300 uppercase">Min</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <Info className="h-3 w-3 mr-2" /> Service Description
              </label>
              <textarea
                rows={4}
                className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] outline-none focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-slate-800 placeholder:text-slate-300"
                placeholder="Explain the benefits and process of this service..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="flex items-center p-6 bg-pink-50 rounded-3xl border border-pink-100">
                <div className="flex items-center h-5">
                    <input
                        id="is_active"
                        type="checkbox"
                        className="h-5 w-5 text-pink-600 border-slate-300 rounded-lg focus:ring-pink-500 cursor-pointer"
                        checked={formData.is_active}
                        onChange={e => setFormData({...formData, is_active: e.target.checked})}
                    />
                </div>
                <div className="ml-4 flex flex-col">
                    <label htmlFor="is_active" className="text-sm font-black text-slate-800 cursor-pointer">Live on Menu</label>
                    <p className="text-xs text-pink-600 font-bold">Making it active allows customers to see it on the booking page.</p>
                </div>
            </div>

            <div className="pt-6 flex flex-col md:flex-row gap-4">
                <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-3xl shadow-2xl shadow-pink-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="animate-spin h-6 w-6 mr-3" /> : <Save className="h-6 w-6 mr-3" />}
                    Confirm & Publish
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-10 py-5 bg-white border-2 border-slate-50 text-slate-400 font-black rounded-3xl hover:bg-slate-50 transition-all"
                >
                    Discard Changes
                </button>
            </div>
          </form>
        </div>
      </div>

      {/* Helper Card */}
      <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
                <AlertCircle className="h-8 w-8 text-pink-400" />
          </div>
          <div>
              <p className="text-xl font-black mb-2">Pro Tip: Bundling Services</p>
              <p className="text-slate-400 font-medium leading-relaxed">Consider creating "Packages" in the future to increase your Average Order Value across your beauty services.</p>
          </div>
      </div>
    </div>
  );
};

export default ServiceCreate;
