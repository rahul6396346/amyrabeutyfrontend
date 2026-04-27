import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Scissors, 
  CreditCard, 
  Package, 
  UserSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const rolePrefix = user?.role.toLowerCase() || 'staff';

  const allMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: `/${rolePrefix}/dashboard` },
    { name: 'Customers', icon: Users, path: `/${rolePrefix}/customers` },
    { name: 'Appointments', icon: Calendar, path: `/${rolePrefix}/appointments` },
    { name: 'Services', icon: Scissors, path: `/${rolePrefix}/services` },
    { name: 'Billing', icon: CreditCard, path: `/${rolePrefix}/billing` },
    { name: 'Inventory', icon: Package, path: `/${rolePrefix}/inventory` },
    { name: 'Staff Management', icon: UserSquare, path: `/${rolePrefix}/staff` },
    { name: 'Reports', icon: BarChart3, path: `/${rolePrefix}/reports` },
    { name: 'Settings', icon: Settings, path: `/${rolePrefix}/settings` },
  ];

  const menuItems = user?.role === 'OWNER' 
    ? allMenuItems 
    : [
        { name: 'Add Customer', icon: Users, path: `/${rolePrefix}/customers/new` }
      ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen w-72 bg-[#0A0D14] text-white border-r border-slate-800 shadow-2xl">
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-tighter text-white">
          GLOW & <span className="text-rose-400">GRACE</span>
        </h1>
        <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg">
          <X className="h-5 w-5 text-slate-400" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 group ${
              isActive(item.path)
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${isActive(item.path) ? 'text-rose-400' : 'text-slate-500'}`} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800/50">
        <div className="bg-slate-800/30 rounded-2xl p-4 mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Logged in as</p>
            <p className="text-sm font-bold truncate text-slate-200">{user?.username}</p>
            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-bold text-slate-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
