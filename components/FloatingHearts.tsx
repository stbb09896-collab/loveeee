
import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: '110vh', 
            x: `${Math.random() * 100}vw`,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: '-10vh',
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0.5]
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute text-red-900/20"
          style={{ fontSize: `${20 + Math.random() * 40}px` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
