import { useEffect, useState } from 'react';
import serviceCatalog, { type Service, type ServiceCategory } from '../../services/serviceCatalog';
import { 
    Plus, Search, Edit3, Trash2, Scissors, 
    Clock, MoreHorizontal, 
    CheckCircle2, XCircle, Grid, List as ListIcon, Loader2
} from 'lucide-react';

const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [srvRes, catRes] = await Promise.all([
        serviceCatalog.getServices({ all: 'true' }),
        serviceCatalog.getCategories()
      ]);
      setServices(srvRes.data.results || srvRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await serviceCatalog.deleteService(id);
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      alert("Failed to delete service.");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Service <span className="text-pink-500">Menu</span></h1>
          <p className="text-slate-500 font-medium mt-1">Manage your salon's catalog of expertise</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-2xl flex mr-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-pink-500' : 'text-slate-400'}`}
              >
                  <Grid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-pink-500' : 'text-slate-400'}`}
              >
                  <ListIcon className="h-4 w-4" />
              </button>
          </div>
          <button
            onClick={() => {}} // TODO: Add logic
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-pink-100 hover:scale-105 active:scale-95 transition-all flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Service
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search hair salon services..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-pink-500/10 placeholder:text-slate-400 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-4 rounded-3xl font-black text-sm transition-all whitespace-nowrap shadow-sm border ${
                  selectedCategory === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
              }`}
            >
                All Services
            </button>
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-4 rounded-3xl font-black text-sm transition-all whitespace-nowrap shadow-sm border ${
                        selectedCategory === cat.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                    }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-pink-500 animate-spin" />
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredServices.map(service => (
                    <div key={service.id} className="group bg-white rounded-[40px] p-8 border border-white hover:border-pink-100 hover:shadow-2xl hover:shadow-pink-100/50 transition-all cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white rounded-xl shadow-sm text-slate-400 hover:text-pink-500">
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="h-16 w-16 bg-pink-50 rounded-3xl flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                            <Scissors className="h-8 w-8" />
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-black text-slate-800 group-hover:text-pink-600 transition-colors uppercase tracking-tight">{service.name}</h3>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{service.category_name}</p>
                            </div>
                            
                            <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                                {service.description || 'Premium salon service tailored for your ultimate transformation.'}
                            </p>

                            <div className="pt-4 flex items-center justify-between">
                                <div className="flex items-center text-slate-800 font-black text-2xl">
                                    <span className="text-sm font-bold text-slate-400 mr-1">$</span>
                                    {service.price}
                                </div>
                                <div className="flex items-center text-xs font-black text-slate-400 uppercase tracking-tighter">
                                    <Clock className="h-4 w-4 mr-1 text-pink-400" />
                                    {service.duration_minutes} MIN
                                </div>
                            </div>
                        </div>
                    </div>
                  ))}
              </div>
          ) : (
              <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                              <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Service</th>
                              <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Category</th>
                              <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Duration</th>
                              <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Price</th>
                              <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                              <th className="px-8 py-5 text-right font-black text-slate-500 uppercase tracking-widest">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                          {filteredServices.map(service => (
                            <tr key={service.id} className="hover:bg-pink-50/20 transition-colors">
                                <td className="px-8 py-6 font-black text-slate-800">{service.name}</td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-500">{service.category_name}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center text-sm font-bold text-slate-600">
                                        <Clock className="h-4 w-4 mr-2 text-slate-300" />
                                        {service.duration_minutes}m
                                    </div>
                                </td>
                                <td className="px-8 py-6 font-black text-slate-800">${service.price}</td>
                                <td className="px-8 py-6">
                                    {service.is_active ? (
                                        <div className="flex items-center text-green-500 text-[10px] font-black uppercase">
                                            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-slate-400 text-[10px] font-black uppercase">
                                            <XCircle className="h-3 w-3 mr-1" /> Hidden
                                        </div>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button className="p-2 text-slate-400 hover:text-pink-500 hover:bg-white rounded-xl transition-all border border-transparent hover:border-pink-100">
                                            <Edit3 className="h-5 w-5" />
                                        </button>
                                        <button 
                                          onClick={() => handleDelete(service.id!)}
                                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all border border-transparent hover:border-red-100"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServiceList;
