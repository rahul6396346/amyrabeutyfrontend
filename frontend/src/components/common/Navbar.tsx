import { Bell, Search, Menu} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user } = useAuth();

  return (
    <header className="h-16 md:h-20 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button 
            onClick={onMenuClick}
            className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 w-80 focus-within:ring-2 focus-within:ring-rose-100 transition-all">
          <Search className="h-4 w-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search activities..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-6">
        <ThemeToggle />
        <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 md:pl-6 md:border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{user?.username || 'Admin User'}</p>
            <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">{user?.role || 'Owner'}</p>
          </div>
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-rose-600 flex items-center justify-center text-white font-black shadow-lg shadow-rose-100">
            {user?.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
