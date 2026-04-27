import { motion } from 'framer-motion';
import { Star, ShieldCheck, Sparkles, Heart } from 'lucide-react';

const reasons = [
  { id: '01', title: 'Expert Stylists', desc: 'Internationally trained artists with 10+ years of editorial experience.', icon: Star },
  { id: '02', title: 'Premium Products', desc: 'We work exclusively with cruelty-free, professional-grade brands.', icon: Sparkles },
  { id: '03', title: 'Hygienic Environment', desc: 'Sanitized stations, single-use kits and medical-grade sterilization.', icon: ShieldCheck },
  { id: '04', title: 'Personalized Care', desc: 'Every appointment begins with a one-on-one beauty consultation.', icon: Heart },
];

const WhyChooseUs = () => {
  return (
    <section className="py-32 bg-[#FFF5F5]">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-20">
        <div className="space-y-6 max-w-2xl mx-auto">
          <span className="px-4 py-1.5 bg-rose-100/50 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">Why Glow & Grace</span>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-800 tracking-tight leading-[1.1]">
            The standard, <br/>
            <span className="text-rose-400 italic">elevated.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {reasons.map((reason, i) => (
             <motion.div
               key={i}
               whileHover={{ y: -8 }}
               className="bg-white p-12 rounded-[50px] border border-rose-50 shadow-sm text-left space-y-8 relative overflow-hidden group"
             >
                <span className="absolute top-8 right-12 text-6xl font-serif text-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{reason.id}</span>
                <div className="h-16 w-16 bg-rose-400 rounded-2xl flex items-center justify-center text-white shadow-sm relative z-10">
                   <reason.icon className="h-7 w-7" />
                </div>
                <div className="space-y-2 relative z-10">
                    <h4 className="text-2xl font-bold text-slate-800 tracking-tight">{reason.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{reason.desc}</p>
                </div>
                <p className="text-rose-100 font-serif text-7xl absolute bottom-0 right-0 translate-y-1/2 -z-10 group-hover:text-rose-200 transition-colors">{reason.id}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
