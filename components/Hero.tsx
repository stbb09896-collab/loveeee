import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeroProps {
  onBegin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBegin }) => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative bg-black overflow-hidden px-4">
      {/* Cinematic Grayscale Background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://lh3.googleusercontent.com/d/1d4F2o9YoxgzO9eqZCjc_SgpTrLYsAj-Z" 
          alt="Atmosphere" 
          className="w-full h-full object-cover filter brightness-50 contrast-125 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </motion.div>

      {/* Decorative Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-black pointer-events-none z-[1]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative z-10 flex flex-col items-center max-w-5xl text-center"
      >
        {/* Luxury Circular Profile Moment */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-12"
        >
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-red-900/30 shadow-2xl p-1 bg-black/50 backdrop-blur-md">
            <img 
              src="https://lh3.googleusercontent.com/d/16GqALbLODSfnVUa2cD8-6YqrD_P5ribz" 
              alt="Our Moment" 
              className="w-full h-full object-cover rounded-full filter sepia-[0.2]"
            />
          </div>
        </motion.div>

        {/* Cinematic Captions */}
        <h1 className="text-4xl md:text-7xl font-serif font-light mb-8 text-white leading-tight tracking-tight px-4">
          Every word here carries a feeling I was never able to fully say out loud.
        </h1>

        <p className="text-lg md:text-xl font-serif text-red-200/60 mb-12 max-w-2xl leading-relaxed italic drop-shadow-lg">
          Every moment we shared, every laugh, every silence, every heartbeat that changed me. You didn’t just enter my life, you became a part of who I am.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(127, 29, 29, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onBegin}
          className="px-12 py-5 bg-red-950/40 backdrop-blur-md text-white rounded-full font-serif tracking-[0.2em] uppercase text-xs border border-red-900/50 transition-all shadow-xl flex items-center gap-4 group"
        >
          Begin Our Story ❤️
          <Heart size={18} className="group-hover:fill-current transition-all" />
        </motion.button>
      </motion.div>

      {/* Scroll indicator - Cinematic line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <motion.div 
          animate={{ height: [0, 80, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-[1px] bg-gradient-to-b from-red-700 to-transparent"
        />
        <span className="text-[10px] uppercase tracking-[0.4em] text-red-900 font-bold">Scroll to feel</span>
      </div>
    </section>
  );
};

export default Hero;