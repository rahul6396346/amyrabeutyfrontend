import { Sparkles, Globe, Link, Share2, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#120F0F] text-white pt-32 pb-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        {/* Branding */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-rose-400 rounded-full flex items-center justify-center text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Glow & <span className="text-rose-400">Grace</span></span>
          </div>
          <p className="text-slate-400 font-medium leading-relaxed">
            A luxury salon experience for women who believe beauty is a daily ritual — not a destination.
          </p>
          <div className="flex gap-4">
            {[Globe, Link, Share2].map((Icon, i) => (
                <button key={i} className="h-10 w-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors">
                    <Icon className="h-4 w-4" />
                </button>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
           <h5 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-rose-400">Quick Links</h5>
           <ul className="space-y-4 font-bold text-slate-400">
              {['Home', 'Services', 'Bridal', 'Gallery', 'Testimonials', 'Contact'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
           </ul>
        </div>

        {/* Contact */}
        <div>
           <h5 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-rose-400">Visit Us</h5>
           <ul className="space-y-6">
              <li className="flex gap-4">
                 <MapPin className="h-5 w-5 text-rose-400 shrink-0" />
                 <p className="text-slate-400 text-sm font-medium">42, Linking Road, Bandra West,<br/> Mumbai 400050</p>
              </li>
              <li className="flex gap-4">
                 <Phone className="h-5 w-5 text-rose-400 shrink-0" />
                 <p className="text-slate-400 text-sm font-bold">+91 99999 99999</p>
              </li>
              <li className="flex gap-4">
                 <Mail className="h-5 w-5 text-rose-400 shrink-0" />
                 <p className="text-slate-400 text-sm font-bold">hello@glowandgrace.com</p>
              </li>
           </ul>
        </div>

        {/* Hours */}
        <div className="space-y-8">
           <h5 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-rose-400">Hours</h5>
           <div className="space-y-4 text-sm">
                <div className="flex items-center gap-4 text-slate-400">
                    <Clock className="h-5 w-5 text-rose-400" />
                    <div>
                        <p className="font-bold">Mon — Sat: 10:00 — 21:00</p>
                        <p className="opacity-60 text-xs">Sunday: 11:00 — 19:00</p>
                    </div>
                </div>
           </div>
           <button className="w-full py-4 bg-rose-400 text-white font-bold rounded-2xl shadow-xl shadow-rose-900/50 hover:bg-rose-500 transition-all text-sm">
             Book Appointment
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] gap-4">
          <p>© 2026 Glow & Grace Salon. All rights reserved.</p>
          <p>Crafted with elegance in Mumbai.</p>
      </div>
    </footer>
  );
};

export default Footer;
