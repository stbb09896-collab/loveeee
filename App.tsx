import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Hero from './components/Hero';
import Story from './components/Story';
import Timeline from './components/Timeline';
import InfinitePromise from './components/InfinitePromise';
import Gallery from './components/Gallery';
import Letter from './components/Letter';
import Proposal from './components/Proposal';
import FloatingHearts from './components/FloatingHearts';
import CursorGlow from './components/CursorGlow';
import AudioPlayer from './components/AudioPlayer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasAcceptedProposal, setHasAcceptedProposal] = useState(false);
  
  const loadingMessages = [
    "Gathering our memories...",
    "Collecting our whispers...",
    "Cherishing every moment...",
    "Preparing our story...",
    "Building our forever...",
    "welcome to avit world"
  ];

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    story: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    infinite: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    letter: useRef<HTMLDivElement>(null),
    proposal: useRef<HTMLDivElement>(null),
  };

  // Detect visibility of sections to switch songs
  const isInfiniteInView = useInView(sectionRefs.infinite, { amount: 0.1 });
  const isGalleryInView = useInView(sectionRefs.gallery, { amount: 0.1 });
  const isLetterInView = useInView(sectionRefs.letter, { amount: 0.1 });
  const isProposalInView = useInView(sectionRefs.proposal, { amount: 0.1 });

  const mainSong = "https://res.cloudinary.com/dog2onxal/video/upload/v1771076655/Barney_Sku-_Your_eyes_got_my_heart_falling_for_you_x_Teri_nazron_ne_your_eyes_got_my_heart_kfdycg.mp3";
  const infiniteSong = "https://res.cloudinary.com/dog2onxal/video/upload/v1771077155/Vekhegi_mainu_te_sochegi_kya_tu__Dooron_Dooron_Live_-_Paresh_Pahuja_l23w9o.mp3";
  const finalSong = "https://res.cloudinary.com/dog2onxal/video/upload/v1771077525/meri_jakhmo_ko_teri_chhuan_chahiye_tu_chahiye_sukoon_atifaslam_tuchahiye_eadwyz.mp3";

  // Audio Logic
  let currentSong = mainSong;
  if (hasAcceptedProposal) {
    currentSong = finalSong;
  } else if (isInfiniteInView || isGalleryInView || isLetterInView || isProposalInView) {
    currentSong = infiniteSong;
  }

  // Effect to automatically unmute/play when reaching the Infinite Promise section
  // only if the user has already engaged with the site/scrolled down
  useEffect(() => {
    if (isInfiniteInView) {
      setIsAudioPlaying(true);
    }
  }, [isInfiniteInView]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingTextIndex((prev) => {
        if (prev < loadingMessages.length - 1) return prev + 1;
        return prev;
      });
    }, 1600);

    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(textInterval);
    }, 9500);

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);

  const startJourney = () => {
    // This is the trigger to start the emotional ride
    setIsAudioPlaying(true);
    sectionRefs.story.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProposalAccept = () => {
    setHasAcceptedProposal(true);
    // Automatically play the final song immediately
    setIsAudioPlaying(true);
  };

  return (
    <div className="relative bg-black text-white selection:bg-red-900/40">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.5, 1, 0.5],
                filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-red-700 relative"
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <motion.div 
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-red-600 rounded-full blur-xl"
              />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingTextIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="mt-8 font-serif text-lg md:text-xl tracking-[0.2em] text-red-100/60 lowercase italic text-center px-4"
              >
                {loadingMessages[loadingTextIndex]}
              </motion.p>
            </AnimatePresence>
            
            <div className="absolute bottom-12 w-48 h-[1px] bg-white/5 overflow-hidden">
               <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-gradient-to-r from-transparent via-red-600 to-transparent"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CursorGlow />
      <FloatingHearts />
      <AudioPlayer 
        isPlaying={isAudioPlaying} 
        setIsPlaying={setIsAudioPlaying} 
        src={currentSong}
      />

      <div id="hero" ref={sectionRefs.hero}>
        <Hero onBegin={startJourney} />
      </div>
      
      <div id="story" ref={sectionRefs.story}>
        <Story />
      </div>
      
      <div id="timeline" ref={sectionRefs.timeline}>
        <Timeline />
      </div>

      <div id="infinite" ref={sectionRefs.infinite}>
        <InfinitePromise />
      </div>
      
      <div id="gallery" ref={sectionRefs.gallery}>
        <Gallery />
      </div>
      
      <div id="letter" ref={sectionRefs.letter}>
        <Letter />
      </div>
      
      <div id="proposal" ref={sectionRefs.proposal}>
        <Proposal onAccept={handleProposalAccept} isAccepted={hasAcceptedProposal} />
      </div>

      <footer className="py-8 text-center text-white/20 text-xs font-serif italic tracking-widest border-t border-white/5 bg-black">
        A symphony of moments, composed for us. &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;