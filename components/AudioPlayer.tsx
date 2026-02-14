
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioConfig {
  url: string;
  startTime?: number;
}

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  audioConfig: AudioConfig;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying, audioConfig }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle Play/Pause toggle
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Playback blocked or failed:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle source changes and seeking to specific parts
  useEffect(() => {
    if (audioRef.current && audioConfig.url) {
      const wasPlaying = isPlaying;
      
      // If it's a new URL, swap and seek
      if (audioRef.current.src !== audioConfig.url) {
        audioRef.current.src = audioConfig.url;
        audioRef.current.load();
        
        // When metadata loads, we can seek to the specific part
        const onLoadedMetadata = () => {
          if (audioRef.current && audioConfig.startTime !== undefined) {
            audioRef.current.currentTime = audioConfig.startTime;
          }
          if (wasPlaying) {
            audioRef.current.play().catch(() => {});
          }
          audioRef.current?.removeEventListener('loadedmetadata', onLoadedMetadata);
        };
        
        audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
      }
    }
  }, [audioConfig.url, audioConfig.startTime]);

  return (
    <div className="fixed bottom-8 right-8 z-[2000]">
      <audio ref={audioRef} loop />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 bg-darkRed/20 backdrop-blur-md border border-red-900/50 rounded-full flex items-center justify-center text-red-500 hover:text-red-400 hover:scale-110 transition-all duration-300 shadow-lg shadow-red-900/20 group"
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <Volume2 size={24} className="group-hover:animate-pulse" />
        ) : (
          <VolumeX size={24} />
        )}
        
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isPlaying ? 'bg-red-500' : 'bg-zinc-800'}`}></span>
        </span>
      </button>
    </div>
  );
};

export default AudioPlayer;
