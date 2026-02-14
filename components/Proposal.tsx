import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

interface ProposalProps {
  onAccept: () => void;
  isAccepted: boolean;
}

const Proposal: React.FC<ProposalProps> = ({ onAccept, isAccepted }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    onAccept();
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  return (
    <section className="min-h-screen py-24 flex items-center justify-center bg-black relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            viewport={{ once: true }}
            className="text-center z-10 px-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-red-600 mb-8 flex justify-center"
            >
              <Heart size={80} fill="currentColor" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-serif mb-12 text-white">
              Will you be my Valentine?
            </h2>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="px-12 py-4 bg-red-600 text-white rounded-full font-bold text-xl shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              >
                YES ❤️
              </motion.button>
              <motion.button
                onMouseEnter={moveNoButton}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="px-12 py-4 border border-white/20 text-white/40 rounded-full font-medium"
              >
                Wait, what? 
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Background Cover Photo */}
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1ysWEpLRSDdQMJZ3iqMO8FVutZTY3pJoe" 
                alt="Memory Cover" 
                className="w-full h-full object-cover mix-blend-overlay filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center z-10 px-6"
            >
              <div className="relative mb-12">
                 <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-red-500/30 rounded-full scale-150"
                 />
                 <Heart size={120} className="text-red-600 mx-auto drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]" fill="currentColor" />
              </div>
              <h2 className="text-5xl md:text-8xl font-script text-white mb-6 drop-shadow-2xl">You're My Forever</h2>
              <p className="text-xl md:text-2xl text-red-100 font-serif italic drop-shadow-lg">
                I promise to love you, always and forever.
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-12 flex justify-center gap-2"
              >
                {Array.from({length: 5}).map((_, i) => (
                  <Heart key={i} size={24} className="text-red-800" fill="currentColor" />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Proposal;