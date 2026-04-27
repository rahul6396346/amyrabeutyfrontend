import { motion } from 'framer-motion';
import { Scissors, Sparkles, Heart, Crown, Droplets, Wand2, Flower2 } from 'lucide-react';

const services = [
  { title: 'Hair Styling', desc: 'Precision cuts, blowouts & couture color crafted by master stylists.', price: '1,200', icon: Scissors },
  { title: 'Hair Spa', desc: 'Restorative therapies that infuse shine, softness and silk-like flow.', price: '1,800', icon: Droplets },
  { title: 'Signature Facial', desc: 'Bespoke skinare rituals tailored to your skin\'s unique chemistry.', price: '2,500', icon: Sparkles },
  { title: 'Makeup Artistry', desc: 'From soft glam to red-carpet, looks that are unmistakably you.', price: '3,500', icon: Wand2 },
  { title: 'Bridal Makeup', desc: 'Heirloom looks for your most photographed day. Trial included.', price: '18,000', icon: Crown },
  { title: 'Nail Couture', desc: 'Hand-painted nail art and luxe gel finishes by trained artists.', price: '900', icon: Heart },
  { title: 'Skin Treatments', desc: 'Advanced peels, hydrafacials and clinical-grade glow protocols.', price: '4,500', icon: Flower2 },
];

const Services = () => {
  return (
    <section id="services" className="py-32 bg-[#FFF5F5] relative">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-20">
        <div className="space-y-6 max-w-2xl mx-auto">
          <span className="px-4 py-1.5 bg-rose-100/50 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">Our Services</span>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-800 tracking-tight leading-[1.1]">
            Crafted rituals for the <br/>
            <span className="text-rose-400 italic">modern muse</span>
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Every service blends advanced technique with sensory indulgence — because beauty is a feeling, not just a finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {services.map((service, i) => (
             <motion.div
               key={i}
               whileHover={{ y: -8 }}
               className="bg-white p-10 rounded-[30px] border border-rose-50 shadow-sm text-left flex flex-col justify-between hover:shadow-xl hover:shadow-rose-100 transition-all group"
             >
                <div className="space-y-6">
                    <div className="h-14 w-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-400 group-hover:bg-rose-400 group-hover:text-white transition-all">
                       <service.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold text-slate-800 tracking-tight">{service.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                </div>
                
                <div className="pt-10 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">From</span>
                    <span className="text-xl font-bold text-rose-300 tracking-tight">₹ {service.price}</span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
