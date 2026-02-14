import React from 'react';
import { motion } from 'framer-motion';

const InfinitePromise: React.FC = () => {
  return (
    <section className="min-h-screen py-24 flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(69,10,10,0.3)_0%,transparent_70%)]"
        />
      </div>

      <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-script text-5xl md:text-7xl text-red-500 block mb-12 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]"
          >
            We are infinite
          </motion.span>

          <div className="space-y-8 font-serif italic text-xl md:text-3xl leading-relaxed text-red-50/90 max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 1.5 }}
              viewport={{ once: true }}
            >
              —two souls who found each other not by chance, but by destiny. In a world full of endless paths, ours crossed for a reason, and from that moment, something eternal began.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.8, duration: 1.5 }}
              viewport={{ once: true }}
              className="text-white"
            >
              This love isn’t just a feeling, <span className="text-red-600 not-italic font-bold">it’s a promise!</span> one we will carry with us through every moment, every challenge, and every lifetime.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 2.8, duration: 1.5 }}
              viewport={{ once: true }}
              className="text-red-100/70"
            >
              We will protect it, nurture it, and never let it fade, because what we have is rare and meant to last forever. No matter where life takes us, our love will remain constant—growing stronger, deeper, and more beautiful with time.
            </motion.p>
          </div>

          {/* Decorative Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 3.8, duration: 1.5 }}
            viewport={{ once: true }}
            className="w-32 h-[1px] bg-red-800 mx-auto mt-16"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InfinitePromise;