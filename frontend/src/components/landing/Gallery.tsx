import { motion } from 'framer-motion';

const images = [
    { src: '/bridal_luxury_makeup_1777020194953.png', span: 'row-span-2 col-span-2' },
    { src: '/luxury_makeup_kit_1777020567302.png', span: 'col-span-2' },
    { src: '/salon_facial_luxury_1777020315647.png', span: 'row-span-1' },
    { src: '/luxury_nails_art_1777020536798.png', span: 'row-span-2' },
    { src: '/salon_hero_premium_1777018665495.png', span: 'col-span-2' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-32 bg-[#FFF5F5]">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
                <span className="px-4 py-1.5 bg-white border border-rose-100 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">Gallery</span>
                <h2 className="text-5xl md:text-7xl font-serif text-slate-800 tracking-tight">
                    Moments of <span className="text-rose-400 italic">glow.</span>
                </h2>
            </div>
            <p className="text-slate-500 font-medium max-w-sm border-l border-rose-200 pl-8">
                A curated edit from our studio — bridal transformations, signature styling and skin journeys.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((img, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 0.98 }}
                    className={`rounded-[40px] overflow-hidden shadow-xl ${img.span} h-[300px] md:h-auto min-h-[250px] relative group cursor-pointer`}
                >
                    <img src={img.src} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
