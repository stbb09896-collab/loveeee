
import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../constants';

const Timeline: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-center mb-24 text-white"
        >
          Our Beautiful Journey
        </motion.h2>

        <div className="relative border-l-2 border-red-900/30 ml-4 md:ml-auto md:mr-auto">
          {TIMELINE_DATA.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-20 relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot on line */}
              <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] z-10" />

              <div className={`w-full md:w-1/2 pl-8 md:px-12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-red-500 font-medium tracking-widest text-sm uppercase block mb-2">{event.date}</span>
                <h3 className="text-2xl font-serif text-white mb-4">{event.title}</h3>
                <p className="text-white/60 leading-relaxed">{event.description}</p>
              </div>

              <div className="w-full md:w-1/2 mt-6 md:mt-0 px-8 md:px-12">
                <div className="overflow-hidden rounded-xl aspect-[4/3] relative group shadow-2xl shadow-red-950/20">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
