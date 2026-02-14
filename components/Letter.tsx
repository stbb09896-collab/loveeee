
import React from 'react';
import { motion } from 'framer-motion';

const Letter: React.FC = () => {
  return (
    <section className="min-h-screen py-24 flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="max-w-3xl w-full mx-6 p-12 md:p-20 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[40px] shadow-2xl relative z-10"
      >
        <div className="font-script text-5xl text-red-400 mb-12 text-center">My Love Letter</div>
        
        <div className="space-y-8 text-lg md:text-xl font-serif text-red-50/80 leading-relaxed italic">
          <p>
            "To my dearest, I am writing this to tell you how much you mean to me. Sometimes words feel inadequate to describe the depth of my feelings, but I'll try."
          </p>
          <p>
            "You are the light that guides me through my darkest days, the warmth that comforts me when the world feels cold, and the melody that plays in my heart every single day."
          </p>
          <p>
            "No matter what happens in this unpredictable life, I promise to stay by your side. I promise to love you more today than yesterday, but less than tomorrow. You are my home, my peace, and my greatest adventure."
          </p>
          <p className="text-right pt-8 text-red-500 font-script text-4xl">
            With all my love, Forever.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Letter;
