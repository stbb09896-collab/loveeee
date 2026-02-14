import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying, src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [internalSrc, setInternalSrc] = useState(src);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const finalSong = "https://res.cloudinary.com/dog2onxal/video/upload/v1771077525/meri_jakhmo_ko_teri_chhuan_chahiye_tu_chahiye_sukoon_atifaslam_tuchahiye_eadwyz.mp3";

  // Handle source changes with a 2-second pause (or immediate switch for the final song)
  useEffect(() => {
    if (src !== internalSrc) {
      const audio = audioRef.current;
      
      // If it's the final song, switch immediately as requested
      if (src === finalSong) {
        setInternalSrc(src);
        setIsTransitioning(false);
        setIsPlaying(true);
        if (audio) {
          audio.src = src;
          audio.load();
        }
        return;
      }

      // Otherwise, follow the 2-second transition rule
      setIsTransitioning(true);
      if (audio) {
        audio.pause();
      }

      // Wait 2 seconds before switching to new source and playing
      const timer = setTimeout(() => {
        setInternalSrc(src);
        setIsTransitioning(false);
        // Force isPlaying to true if we are entering a new phase
        setIsPlaying(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [src, internalSrc, setIsPlaying]);

  // Sync audio element with internal source and playing state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isTransitioning) return;

    audio.volume = 0.5;

    const syncPlayback = async () => {
      try {
        if (isPlaying) {
          // Re-load if the src on the element doesn't match internalSrc
          if (audio.src !== internalSrc) {
            audio.src = internalSrc;
            audio.load();
          }
          playPromiseRef.current = audio.play();
          await playPromiseRef.current;
        } else {
          if (playPromiseRef.current !== null) {
            await playPromiseRef.current;
          }
          audio.pause();
        }
      } catch (err) {
        // Log errors but don't break the UI, as browsers often block autoplay
        console.warn("Audio sync error (often due to browser autoplay policies):", err);
      }
    };

    syncPlayback();
  }, [isPlaying, internalSrc, isTransitioning]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <audio
        ref={audioRef}
        src={internalSrc}
        loop
        preload="auto"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-14 h-14 rounded-full bg-red-950/40 backdrop-blur-xl border border-red-500/30 flex items-center justify-center text-red-200 shadow-2xl relative group"
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying && !isTransitioning ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Volume2 size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <VolumeX size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && !isTransitioning && (
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-red-500/50 pointer-events-none"
          />
        )}
        
        {isTransitioning && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-2 border-red-500/20 border-t-red-500 rounded-full pointer-events-none"
          />
        )}
      </motion.button>
      
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest text-red-100/80 pointer-events-none whitespace-nowrap border border-red-900/20 backdrop-blur-sm">
        {isTransitioning ? 'Switching Melody...' : (isPlaying ? 'Pause Melody' : 'Play Melody')}
      </div>
    </div>
  );
};

export default AudioPlayer;