import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Bridal', href: '#bridal' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md py-2 border-b border-rose-50" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-10 w-10 bg-rose-400 rounded-full flex items-center justify-center text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            Glow & <span className="text-rose-400">Grace</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-rose-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="hidden sm:block px-6 py-2.5 border border-rose-200 text-rose-500 font-bold rounded-xl hover:bg-rose-50 transition-all text-sm"
          >
            Login
          </button>
          <button 
            onClick={() => {
                const contact = document.getElementById('contact');
                contact?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-rose-400 text-white font-bold rounded-xl md:rounded-2xl shadow-lg shadow-rose-100 hover:bg-rose-500 transition-all active:scale-95 text-xs md:text-sm"
          >
            Book Appointment
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 lg:hidden"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 w-full bg-white border-b border-rose-100 p-6 lg:hidden shadow-xl"
          >
            <div className="grid grid-cols-1 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-800 py-2 border-b border-slate-50"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/login');
                }}
                className="mt-4 w-full py-4 bg-white border border-rose-200 text-rose-500 font-bold rounded-2xl"
              >
                Login
              </button>
              <button className="w-full py-4 bg-rose-400 text-white font-bold rounded-2xl shadow-lg">
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
