import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Heart, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface GroomIntroOpeningProps {
  onOpen: () => void;
}

export const GroomIntroOpening: React.FC<GroomIntroOpeningProps> = ({ onOpen }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Play video immediately upon mounting (as soon as anyone opens the link)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // First attempt to play with sound
    video.muted = false;
    const playAttempt = video.play();

    if (playAttempt !== undefined) {
      playAttempt
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // If browser autoplay policy blocks audio without user gesture,
          // immediately fallback to muted autoplay so video plays instantly without delay
          video.muted = true;
          setIsMuted(true);
          video.play().catch((err) => {
            console.warn('Video autoplay failed:', err);
          });
        });
    }

    // Show the interactive "Open Card" action button 2.5 seconds in as the groom extends the card
    const promptTimer = setTimeout(() => {
      setShowPrompt(true);
    }, 2500);

    return () => {
      clearTimeout(promptTimer);
    };
  }, []);

  const handleComplete = () => {
    if (isExiting) return;
    setIsExiting(true);
    soundEngine.playChime();

    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#38BDF8', '#F472B6', '#D4AF37', '#FFF9EF', '#BAE6FD'],
      });
    } catch (_) {}

    setTimeout(() => {
      onOpen();
    }, 800);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  // Clicking anywhere on the video screen unmutes if currently muted
  const handleContainerClick = () => {
    if (isMuted && videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      soundEngine.playClick();
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleContainerClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden select-none cursor-pointer"
        >
          {/* FULLSCREEN GROOM HANDOVER VIDEO - Plays instantly when opened */}
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src="/videos/couple_handover.mp4"
              autoPlay
              playsInline
              muted
              preload="auto"
              onEnded={handleComplete}
              className="w-full h-full object-cover object-center"
            />

            {/* Subtle top & bottom vignette to frame the video gracefully */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

            {/* Top Bar: Sound Status & Skip Button */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-auto">
              {/* Sound Toggle Button */}
              <button
                onClick={toggleMute}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-amber-300/40 text-amber-200 transition-all shadow-xl hover:scale-105 active:scale-95"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span className="text-xs font-sans-body font-semibold">Tap for Sound</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-sans-body font-semibold">Sound On</span>
                  </>
                )}
              </button>

              {/* Skip to Main Invitation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleComplete();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-sans-body font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Skip to Invitation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Interactive "Open Card" Button (Appears as groom hands card forward) */}
            {showPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-8 sm:bottom-12 z-30 flex flex-col items-center pointer-events-auto px-4"
              >
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComplete();
                  }}
                  className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#DB2777] text-white font-sans-body font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_10px_35px_rgba(219,39,119,0.5)] border-2 border-amber-200 cursor-pointer animate-pulse"
                >
                  <Heart className="w-4 h-4 text-amber-200 fill-amber-200" />
                  <span>Open Ashi &amp; Deep's Card</span>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </motion.button>
                <span className="text-[11px] font-sans-body text-white/80 mt-2 drop-shadow">
                  Click to open the wedding invitation
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GroomIntroOpening;
