
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorGlow: React.FC = () => {
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for a high-end feel
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of cursor size (48px)
      mouseX.set(e.clientX - 48);
      mouseY.set(e.clientY - 48);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Background radial glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[9998] opacity-30 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(220, 38, 38, 0.15), transparent 80%)`,
        }}
      />

      {/* Main Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Animated Border Ring */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute inset-0 border border-red-500/40 rounded-full"
        />

        {/* Inner Secondary Ring */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-3 border-[0.5px] border-dashed border-red-400/20 rounded-full"
        />

        {/* The Image with Zoom Pulse */}
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.3)]"
        >
          <img
            src="https://lh3.googleusercontent.com/d/1Bp7l1IhuTAOz-RSncGVh8Tac4ao_YEGH"
            alt="Cursor Icon"
            className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]"
            onError={(e) => {
               (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CursorGlow;
