import { motion } from 'framer-motion';
import { Crown, CheckCircle2, ArrowRight } from 'lucide-react';

const BridalSection = () => {
  return (
    <section id="bridal" className="py-32 bg-[#FFF5F5] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 font-sans">
        
        {/* Left Image Section */}
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
        >
            <div className="rounded-[50px] overflow-hidden shadow-2xl relative">
                <img 
                  src="/bridal_luxury_makeup_1777020194953.png" 
                  alt="Luxury Bridal Transformation" 
                  className="w-full h-auto object-cover"
                />
            </div>
            {/* Heritage Package Tag - matching screenshot */}
            <div className="absolute bottom-6 right-6 lg:-right-10 bg-white/60 backdrop-blur-xl p-6 rounded-[30px] border border-white/80 shadow-2xl flex items-center gap-4">
                <div className="h-10 w-10 bg-rose-400 rounded-full flex items-center justify-center text-white shadow-sm">
                    <Crown className="h-5 w-5" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Heritage Package</p>
                   <p className="text-xl font-bold text-slate-800 tracking-tight">From ₹ 45,000</p>
                </div>
            </div>
        </motion.div>

        {/* Right Content Section */}
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
        >
            <div className="space-y-6">
                <span className="px-3 py-1 bg-white border border-rose-100 rounded-lg text-rose-400 text-[10px] font-black uppercase tracking-[0.2em]">Bridal Atelier</span>
                <h3 className="text-6xl md:text-8xl font-serif text-slate-800 tracking-tight leading-[0.9]">
                    Your wedding day, <br/>
                    <span className="text-rose-400 italic underline decoration-rose-200 underline-offset-8">unforgettable.</span>
                </h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                    From the first trial to your final touch-up, our bridal atelier choreographs every detail of your look — so you walk in radiant, and stay luminous all night.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {[
                  'Pre-bridal skin & hair consultation',
                  'HD bridal makeup on the day',
                  'Touch-up kit for the reception',
                  'Trial session with senior artist',
                  'Signature hairstyle & draping',
                  'Complimentary bridesmaid styling'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-rose-400" />
                    <span className="text-sm font-bold text-slate-600">{item}</span>
                  </div>
                ))}
            </div>

            <div className="pt-6">
                <button className="px-10 py-5 bg-rose-400 text-white font-bold rounded-2xl shadow-xl shadow-rose-100 hover:bg-rose-500 transition-all active:scale-95 text-lg flex items-center">
                    Book Bridal Consultation
                    <ArrowRight className="ml-4 h-5 w-5" />
                </button>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BridalSection;
