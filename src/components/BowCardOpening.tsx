import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface BowCardOpeningProps {
  onOpen: () => void;
}

export const BowCardOpening: React.FC<BowCardOpeningProps> = ({ onOpen }) => {
  const [isUntying, setIsUntying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleUntie = () => {
    if (isUntying || isOpened) return;
    setIsUntying(true);
    soundEngine.playChime();

    // Trigger high-end petal & gold sparkles shower
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#38BDF8', '#F472B6', '#FCE7F3', '#BAE6FD', '#D4AF37', '#FFF9EF'],
        ticks: 250,
        gravity: 0.7,
        scalar: 1.2,
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#F472B6', '#D4AF37', '#38BDF8'],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#F472B6', '#D4AF37', '#38BDF8'],
        });
      }, 350);
    } catch (e) {
      console.error(e);
    }

    // Complete the reveal transition into the hero video
    setTimeout(() => {
      setIsOpened(true);
      onOpen();
    }, 1400);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(16px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#2E1065] text-[#1E293B] overflow-hidden select-none p-4"
        >
          {/* Ambient Ethereal Glow & Falling Floating Petals Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.15)_0%,_rgba(244,114,182,0.1)_45%,_transparent_75%)] pointer-events-none" />

          {/* Interactive Luxury Bow Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] sm:aspect-[4/5] rounded-[32px] sm:rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#F0F9FF] via-[#FFF5F8] to-[#F0F9FF] border-2 border-[#D4AF37]/70 p-6 sm:p-10 flex flex-col items-center justify-between overflow-hidden cursor-pointer group"
            onClick={handleUntie}
          >
            {/* Subtle Textured Paper Watermark & Deckle Frame */}
            <div className="absolute inset-3 sm:inset-4 rounded-[26px] sm:rounded-[34px] border border-[#BAE6FD]/80 pointer-events-none" />
            <div className="absolute inset-5 sm:inset-6 rounded-[22px] sm:rounded-[30px] border border-[#F472B6]/40 pointer-events-none" />

            {/* Corner Floral Filigree SVGs */}
            <div className="absolute top-4 left-4 w-12 h-12 text-[#D4AF37]/50 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M15,15 Q35,15 35,35 Q15,35 15,15 Z" />
              </svg>
            </div>
            <div className="absolute top-4 right-4 w-12 h-12 text-[#D4AF37]/50 pointer-events-none rotate-90">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M15,15 Q35,15 35,35 Q15,35 15,15 Z" />
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 w-12 h-12 text-[#D4AF37]/50 pointer-events-none -rotate-90">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M15,15 Q35,15 35,35 Q15,35 15,15 Z" />
              </svg>
            </div>
            <div className="absolute bottom-4 right-4 w-12 h-12 text-[#D4AF37]/50 pointer-events-none rotate-180">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M15,15 Q35,15 35,35 Q15,35 15,15 Z" />
              </svg>
            </div>

            {/* Horizontal Satin Ribbon Band */}
            <motion.div
              animate={isUntying ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-12 sm:h-14 bg-gradient-to-r from-[#F472B6] via-[#FBCFE8] to-[#F472B6] border-y border-[#D4AF37]/80 shadow-md z-10 pointer-events-none flex items-center justify-between px-4"
            >
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </motion.div>

            {/* Vertical Satin Ribbon Band */}
            <motion.div
              animate={isUntying ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-gradient-to-b from-[#38BDF8] via-[#BAE6FD] to-[#38BDF8] border-x border-[#D4AF37]/80 shadow-md z-10 pointer-events-none flex flex-col items-center justify-between py-4"
            >
              <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
            </motion.div>

            {/* Top Card Header */}
            <div className="relative z-20 text-center pt-2">
              <span className="text-2xl font-serif text-[#0284C7] font-bold block mb-1">ੴ</span>
              <p className="text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.3em] uppercase text-[#B45309]">
                Satnam Waheguru
              </p>
              <p className="text-xs sm:text-sm font-serif-luxury italic text-[#0369A1] mt-1 font-semibold">
                Anand Karaj Nuptials
              </p>
            </div>

            {/* Center: The Royal Satin Silk Ribbon Bow & Gold Monogram Seal */}
            <div className="relative z-30 my-auto flex flex-col items-center justify-center">
              {/* THE REALISTIC SATIN SILK BOW */}
              <div className="relative w-44 h-40 sm:w-56 sm:h-48 flex items-center justify-center">
                {/* Left Bow Loop */}
                <motion.div
                  animate={
                    isUntying
                      ? { x: -140, y: -40, rotate: -45, scale: 0.2, opacity: 0 }
                      : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-[50%] top-[20%] w-24 sm:w-32 h-16 sm:h-20 bg-gradient-to-bl from-[#F472B6] via-[#FBCFE8] to-[#DB2777] rounded-[60%_30%_60%_30%] border-2 border-[#D4AF37] shadow-[0_8px_25px_rgba(219,39,119,0.45)] origin-right transform -rotate-12"
                >
                  <div className="absolute inset-1.5 rounded-[50%_20%_50%_20%] bg-white/25 blur-[1px]" />
                </motion.div>

                {/* Right Bow Loop */}
                <motion.div
                  animate={
                    isUntying
                      ? { x: 140, y: -40, rotate: 45, scale: 0.2, opacity: 0 }
                      : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-[50%] top-[20%] w-24 sm:w-32 h-16 sm:h-20 bg-gradient-to-br from-[#F472B6] via-[#FBCFE8] to-[#DB2777] rounded-[30%_60%_30%_60%] border-2 border-[#D4AF37] shadow-[0_8px_25px_rgba(219,39,119,0.45)] origin-left transform rotate-12"
                >
                  <div className="absolute inset-1.5 rounded-[20%_50%_20%_50%] bg-white/25 blur-[1px]" />
                </motion.div>

                {/* Left Ribbon Tail */}
                <motion.div
                  animate={
                    isUntying
                      ? { y: 120, rotate: -30, opacity: 0, scale: 0.5 }
                      : { y: 0, rotate: -15, opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.9, delay: 0.05 }}
                  className="absolute left-[28%] top-[55%] w-12 sm:w-16 h-28 sm:h-36 bg-gradient-to-b from-[#F472B6] via-[#DB2777] to-[#BE185D] rounded-b-md border-x-2 border-b-2 border-[#D4AF37] shadow-xl origin-top [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]"
                />

                {/* Right Ribbon Tail */}
                <motion.div
                  animate={
                    isUntying
                      ? { y: 120, rotate: 30, opacity: 0, scale: 0.5 }
                      : { y: 0, rotate: 18, opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.9, delay: 0.05 }}
                  className="absolute right-[28%] top-[55%] w-12 sm:w-16 h-28 sm:h-36 bg-gradient-to-b from-[#F472B6] via-[#DB2777] to-[#BE185D] rounded-b-md border-x-2 border-b-2 border-[#D4AF37] shadow-xl origin-top [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]"
                />

                {/* Center Wax Seal Knot with A & D Monogram */}
                <motion.div
                  animate={
                    isUntying
                      ? { scale: 1.4, opacity: 0, rotate: 90 }
                      : { scale: [1, 1.04, 1], rotate: 0, opacity: 1 }
                  }
                  transition={{
                    scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.5 },
                  }}
                  className="relative z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#FDE68A] to-[#B45309] shadow-[0_10px_35px_rgba(212,175,55,0.6)] flex items-center justify-center"
                >
                  <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center border-2 border-[#D4AF37] overflow-hidden">
                    <img
                      src="/images/ad_monogram.png"
                      alt="A & D Royal Monogram"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Couple Names on the Card */}
              <div className="text-center mt-3 space-y-1">
                <h1 className="text-3xl sm:text-5xl font-alex-brush text-[#0369A1] font-bold tracking-normal leading-tight">
                  Deep &amp; Ashi
                </h1>
                <p className="text-[11px] sm:text-xs font-cinzel font-semibold tracking-widest text-[#B45309] uppercase">
                  Thursday, 17th December 2026
                </p>
              </div>
            </div>

            {/* Bottom Interactive Untie Prompt Button */}
            <div className="relative z-20 pb-2 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#DB2777] text-white font-sans-body font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_8px_25px_rgba(2,132,199,0.4)] border border-amber-200"
              >
                <Sparkles className="w-4 h-4 text-[#FDE68A] animate-pulse" />
                <span>Pull Silk Ribbon to Open</span>
                <Heart className="w-4 h-4 text-[#FDE68A] fill-[#FDE68A]" />
              </motion.div>
              <p className="text-[10px] font-sans-body text-[#64748B] mt-2">
                Click anywhere to untie &amp; open wedding invitation
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BowCardOpening;
