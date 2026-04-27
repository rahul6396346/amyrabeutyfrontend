import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#FFF5F5]">
      {/* Background Image - Chandelier luxury */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/salon_hero_premium_1777018665495.png" 
          alt="Luxury Salon Background" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F5] via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-rose-100 text-slate-800 shadow-sm">
            <Sparkles className="h-4 w-4 text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Award-Winning Luxury Salon</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-serif text-slate-900 leading-[0.85] tracking-tight">
              Redefining <br/>
              <span className="text-rose-400 italic">Beauty</span> <br/>
              & Confidence
            </h1>
          </div>

          {/* Floating Review Card - matching screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white/40 backdrop-blur-xl p-8 rounded-[40px] border border-white/60 shadow-2xl inline-block max-w-[320px] ml-auto lg:absolute lg:right-12 lg:bottom-20"
          >
            <div className="flex items-center gap-4 mb-4">
               <div className="h-12 w-12 bg-rose-400 rounded-full flex items-center justify-center text-white shadow-sm">
                  <Star className="h-6 w-6" />
               </div>
               <div>
                  <p className="font-bold text-slate-800">4.9 / 5</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2,400+ Reviews</p>
               </div>
            </div>
            <p className="text-lg font-medium text-slate-700 italic border-l-2 border-rose-200 pl-4">
                "An absolutely magical experience — felt like royalty."
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant side elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-rose-100/30 to-transparent blur-[100px]" />
    </section>
  );
};

export default Hero;
