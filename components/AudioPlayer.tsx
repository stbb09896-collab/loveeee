import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.warn("Autoplay was prevented. User interaction required.", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Attempt to autoplay on mount, though most browsers block this
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
    }
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Romantic placeholder, easy to edit
        loop
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-14 h-14 rounded-full bg-red-950/40 backdrop-blur-xl border border-red-500/30 flex items-center justify-center text-red-200 shadow-2xl relative group"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <Volume2 size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <VolumeX size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing rings when playing */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-red-500/50 pointer-events-none"
          />
        )}
      </motion.button>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-3 py-1 rounded text-[10px] uppercase tracking-widest text-white/60 pointer-events-none whitespace-nowrap">
        {isPlaying ? 'Pause Melody' : 'Play Melody'}
      </div>
    </div>
  );
};

import { AnimatePresence } from 'framer-motion';
export default AudioPlayer;