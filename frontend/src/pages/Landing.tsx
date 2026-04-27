import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import BridalSection from '@/components/landing/BridalSection';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import Gallery from '@/components/landing/Gallery';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#FFF5F5] font-sans overflow-x-hidden selection:bg-rose-100 selection:text-rose-600">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-rose-400 z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Services />
        </motion.div>

        <BridalSection />

        <WhyChooseUs />

        <Gallery />

        {/* Testimonials Placeholder / Coming Soon section as seen in design */}
        <section id="reviews" className="py-24 bg-[#FFF5F5] border-t border-rose-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h4 className="text-2xl font-serif text-slate-800 italic">"The best salon experience in the city. Truly luxurious."</h4>
                <div className="mt-8 h-1 w-20 bg-rose-200 mx-auto rounded-full" />
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-slate-400">- Reviewed by 2,400+ Women</p>
            </div>
        </section>

      </main>

      <Footer />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-8 right-8 z-40 md:hidden">
          <button className="h-16 w-16 bg-rose-500 text-white rounded-full shadow-2xl flex items-center justify-center animate-bounce">
              <Sparkles className="h-8 w-8" />
          </button>
      </div>
    </div>
  );
};

import { Sparkles } from 'lucide-react';

export default Landing;
