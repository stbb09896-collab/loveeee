

import React from 'react';
import { motion, Variants } from 'framer-motion';

const Story: React.FC = () => {
  const text = "They say every love story is beautiful, but ours is my favorite. It began with a simple conversation that turned into endless talks I never wanted to end. Funny how there was a time I didn’t even plan to meet you, not knowing you would become the most important part of my life. And then came our first hug, where everything felt calm and right, and our first kiss, where I realized how deeply I loved you. Now you are not just part of my story, you are my home, my peace, and my forever.";

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="story" className="min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-black relative">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-red-900/20 rounded-2xl blur-xl group-hover:bg-red-800/30 transition-all duration-700" />
          <img
            src="https://lh3.googleusercontent.com/d/1rrMD4aqTZ0P9kqRONpR_7VaZ4s7wuAkn"
            alt="Us"
            className="relative rounded-2xl w-full h-[500px] object-cover shadow-2xl border border-white/10"
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-8 text-red-200"
          >
            How We Met
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg md:text-xl leading-relaxed font-light text-white/80"
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={child}>
                {char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col"
          >
            <span className="font-script text-4xl text-red-500">- Our Beginnings</span>
            <span className="text-white/40 text-sm tracking-widest uppercase mt-2">27 June 2023</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
