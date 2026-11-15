import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export const SpecialNotes: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="special-notes"
      className="min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-[#07111E] via-[#161938] to-[#2B0E35] text-white flex flex-col justify-center items-center relative overflow-hidden select-none"
    >
      {/* Vibrant Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F472B6]/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Festive Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        style={{ y: parallaxY }}
        className="max-w-3xl w-full mx-auto relative z-10 will-change-transform"
      >
        {/* Royal Ornate Blessing Card Container */}
        <div className="relative bg-gradient-to-b from-[#0F1C30]/95 via-[#191C3B]/95 to-[#241334]/95 backdrop-blur-xl border-2 border-[#D4AF37]/80 rounded-[36px] sm:rounded-[52px] p-6 sm:p-12 md:p-16 shadow-[0_25px_80px_rgba(0,0,0,0.6),_0_0_40px_rgba(212,175,55,0.2)] text-center overflow-hidden">
          {/* Inner Golden Silhouette Arch Border */}
          <div className="absolute inset-2.5 sm:inset-4 rounded-[28px] sm:rounded-[44px] border border-[#D4AF37]/30 pointer-events-none" />

          {/* Top Decorative Diamonds */}
          <div className="flex items-center justify-center gap-3 mb-2 text-[#D4AF37]">
            <Sparkles className="w-4 h-4 text-[#FDE68A] animate-pulse" />
            <span className="text-4xl sm:text-5xl font-serif text-[#FDE68A] font-bold tracking-widest drop-shadow-[0_2px_15px_rgba(212,175,55,0.6)]">
              ੴ
            </span>
            <Sparkles className="w-4 h-4 text-[#FDE68A] animate-pulse" />
          </div>

          <span className="text-[11px] sm:text-xs font-cinzel font-bold tracking-[0.35em] text-[#D4AF37] uppercase block mb-6">
            A Cordial Invitation
          </span>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-10" />

          {/* Staggered Typography Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-10 sm:space-y-12"
          >
            {/* 1. Both Families Header */}
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="text-xs sm:text-sm font-cinzel font-bold uppercase tracking-[0.25em] text-[#FDE68A] block drop-shadow-sm">
                With Love &amp; Blessings From Both Families
              </span>

              {/* Parents Section - Groom's Parents permanently on TOP */}
              <div className="space-y-6">
                {/* Groom's Parents (Top) */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-1 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#38BDF8]/30 shadow-inner"
                >
                  <p className="font-bold text-[#E0F2FE] tracking-wider text-xl sm:text-2xl md:text-3xl font-serif-luxury drop-shadow-sm">
                    Sd. Vicky Singh &amp; Sdr. Poonam Kaur
                  </p>
                  <p className="text-xs sm:text-sm text-[#38BDF8] font-sans-body font-semibold tracking-wider">
                    (Parents of the Groom)
                  </p>
                </motion.div>

                {/* Bride's Parents */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-1 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#F472B6]/30 shadow-inner"
                >
                  <p className="font-bold text-[#FCE7F3] tracking-wider text-xl sm:text-2xl md:text-3xl font-serif-luxury drop-shadow-sm">
                    Sd. Satyajit Singh &amp; Sdr. Amarpreet Kaur
                  </p>
                  <p className="text-xs sm:text-sm text-[#F472B6] font-sans-body font-semibold tracking-wider">
                    (Parents of the Bride)
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Golden Divider */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 my-2">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
            </motion.div>

            {/* 2. Grandparents Blessings - Groom's Grandparents permanently on TOP */}
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="text-xs sm:text-sm font-cinzel font-bold uppercase tracking-[0.25em] text-[#FDE68A] block drop-shadow-sm">
                With Celestial Blessings of Grandparents
              </span>

              <div className="space-y-4">
                {/* Groom's Grandparents (Top) */}
                <motion.div variants={itemVariants} className="space-y-0.5">
                  <p className="font-bold text-[#FBCFE8] text-lg sm:text-2xl font-serif-luxury tracking-wide">
                    Sd. Jamit Singh &amp; Late Sdr. Raj Kaur
                  </p>
                  <p className="text-xs sm:text-sm text-pink-200/70 font-sans-body">
                    (Grandparents of the Groom)
                  </p>
                </motion.div>

                <div className="w-12 h-[1px] bg-white/10 mx-auto" />

                {/* Bride's Grandparents */}
                <motion.div variants={itemVariants} className="space-y-0.5">
                  <p className="font-bold text-[#BAE6FD] text-lg sm:text-2xl font-serif-luxury tracking-wide">
                    Sd. Kesar Singh &amp; Sdr. Jogendra Kaur
                  </p>
                  <p className="text-xs sm:text-sm text-sky-200/70 font-sans-body">
                    (Grandparents of the Bride)
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* 3. RSVP Section */}
            <motion.div variants={itemVariants} className="pt-4 space-y-1">
              <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">
                R. S. V. P.
              </span>
              <p className="text-xl sm:text-2xl font-cinzel font-bold text-[#FDE68A] tracking-[0.2em] uppercase drop-shadow-sm">
                HORA &amp; DUA
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom Golden Line */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-10" />
        </div>
      </motion.div>
    </section>
  );
};

export default SpecialNotes;
