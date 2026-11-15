import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { soundEngine } from '../utils/soundEffects';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Ensure Video Autoplay on iOS / Android mobile WebKit browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const startPlay = () => {
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    startPlay();

    // Trigger video playback on any touch or scroll if mobile OS restricted autoplay initially
    const handleInteraction = () => {
      startPlay();
    };

    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('pointerdown', handleInteraction, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) startPlay();
    });

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('pointerdown', handleInteraction);
    };
  }, []);

  // Track window scroll progress for hero transformations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 1.05]);

  const togglePlay = () => {
    soundEngine.playClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log('Video play prevented:', e));
    }
  };

  const toggleMute = () => {
    soundEngine.playClick();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (nextMuted === false && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleFullscreen = () => {
    soundEngine.playClick();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {});
    } else if ((videoRef.current as any).webkitEnterFullscreen) {
      (videoRef.current as any).webkitEnterFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-[#0A0F1D] text-white flex flex-col justify-between items-center"
    >
      {/* 1. CRYSTAL CLEAR FULL-BLEED VIDEO WITH SUBTLE VIGNETTE */}
      <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
        <video
          ref={(el) => {
            videoRef.current = el;
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              el.play().catch(() => {});
            }
          }}
          src="/videos/hero_video.mp4?v=2"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          className="w-full h-full object-cover object-center"
        />

        {/* Delicate Cinematic Vignette - Clear couple visibility, balanced contrast for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/85 via-transparent to-[#050B14]/60 pointer-events-none" />

        {/* Soft Radial Ambient Lighting for Champagne & Sky Blue Theme */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(5,11,20,0.5)_90%)] pointer-events-none" />
      </motion.div>

      {/* Decorative Ornate Gold Card Frame Overlay on Hero */}
      <div className="absolute inset-3 sm:inset-6 rounded-3xl border border-[#D4AF37]/40 pointer-events-none z-10 hidden sm:block">
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]" />
      </div>

      {/* 2. TOP FLOATING VIDEO CONTROLS */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 pt-6 flex items-center justify-end pointer-events-auto">
        {/* Video Control Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle with Interactive Pulse */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-amber-300/40 text-amber-200 transition-all shadow-xl hover:scale-105 active:scale-95"
            aria-label={isMuted ? 'Unmute video sound' : 'Mute video sound'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-sans-body hidden sm:inline font-semibold">Sound On</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="text-xs font-sans-body hidden sm:inline font-semibold">Sound Playing</span>
              </>
            )}
          </button>

          {/* Pause / Play Toggle */}
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/30 text-white transition-all shadow-xl hover:scale-105 active:scale-95"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {/* Fullscreen Expansion Toggle */}
          <button
            onClick={handleFullscreen}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/30 text-white transition-all shadow-xl hover:scale-105 active:scale-95 hidden sm:flex"
            aria-label="Expand video fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. HERO CALLIGRAPHIC TYPOGRAPHY (Overlayed with Ethereal Glow) */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-20 px-4 text-center flex flex-col items-center select-none max-w-3xl mx-auto my-auto"
      >
        {/* Ik Onkar Sacred Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl text-[#FDE68A] drop-shadow-[0_4px_15px_rgba(212,175,55,0.6)] font-serif mb-2"
        >
          ੴ
        </motion.div>

        {/* Subheading Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-xl mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-xs sm:text-sm font-cinzel tracking-[0.28em] uppercase font-bold text-sky-100">
            {WEDDING_DATA.couple.subheading}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        {/* Royal Couple Names Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="text-4xl sm:text-7xl md:text-8xl font-serif-luxury font-bold tracking-tight text-white drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] my-2 leading-none"
        >
          <span className="text-[#BAE6FD]">Deep</span>
          <span className="font-great-vibes text-amber-300 mx-3 text-3xl sm:text-6xl md:text-7xl font-normal drop-shadow">
            weds
          </span>
          <span className="text-[#FBCFE8]">Ashi</span>
        </motion.h1>

        {/* Date Callout */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-lg sm:text-3xl font-cinzel font-semibold tracking-widest text-amber-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mt-2"
        >
          {WEDDING_DATA.heroDate || "15 to 17 December 2026"}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xs sm:text-base font-sans-body font-light tracking-[0.2em] uppercase text-sky-100/90 mt-1"
        >
          {WEDDING_DATA.city}
        </motion.p>

        {/* Floating Tap for Sound helper badge if video is muted */}
        {isMuted && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={toggleMute}
            className="mt-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0284C7]/80 to-[#DB2777]/80 backdrop-blur-md border border-amber-200/50 text-white text-xs font-sans-body font-medium shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-200 animate-bounce" />
            <span>Tap here for video sound</span>
          </motion.button>
        )}
      </motion.div>

      {/* 4. SCROLL DOWN CUE */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-20 pb-6 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
        onClick={() => {
          soundEngine.playClick();
          if (onExploreClick) onExploreClick();
        }}
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/90 font-sans-body font-semibold drop-shadow">
          Scroll down to explore invitation
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="p-1.5 sm:p-2 rounded-full bg-white/20 border border-white/40 text-white shadow-lg backdrop-blur-md"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </motion.div>

      {/* Soft Bottom Transition Gradient into Ivory Card Background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#E8F3F8] via-[#E8F3F8]/40 to-transparent z-15 pointer-events-none" />
    </div>
  );
};

export default Hero;

