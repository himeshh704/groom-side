import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Navigation, ArrowUp, Sparkles, Phone } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { soundEngine } from '../utils/soundEffects';

export const FooterMap: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-[#F0F9FF] via-[#FFF9FB] to-[#E8F3F8] text-[#1E293B] border-t-2 border-[#D4AF37]/40 pt-16 pb-12 overflow-hidden">
      <motion.div style={{ y: parallaxY }} className="max-w-6xl mx-auto px-4 sm:px-6 will-change-transform">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#D4AF37]/40 text-[#0284C7] shadow-sm">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase font-cinzel tracking-[0.25em] font-bold text-[#0369A1]">
              Venue Location &amp; Directions
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#0F172A]">
            Getting To The Venue
          </h2>

          <p className="text-sm sm:text-base font-cormorant italic text-[#64748B] max-w-lg mx-auto">
            THE GRAND • Murgasol, Asansol, West Bengal
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </div>

        {/* FULL SIZE INTERACTIVE GOOGLE MAP CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#B5965A] shadow-2xl bg-[#FFF9EF]">
          {/* Map Frame Header Overlay Bar */}
          <div className="bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#DB2777] text-[#FFF9EF] px-6 py-3 border-b border-[#B5965A]/40 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif text-[#FDE68A]">ੴ</span>
              <div>
                <span className="text-xs font-serif-luxury font-bold text-amber-100 block">
                  THE GRAND, ASANSOL
                </span>
                <span className="text-[10px] font-sans-body text-[#FFF9EF]/90 block">
                  Murgasol, Asansol, West Bengal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=The+Grand+Murgasol+Asansol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF9EF] hover:bg-white text-[#0369A1] text-xs font-bold font-sans-body shadow-md transition-all hover:scale-105"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>The Grand Map</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shri+Guru+Nanak+Gurudwara+Asansol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FCE7F3] hover:bg-white text-[#DB2777] text-xs font-bold font-sans-body shadow-md transition-all hover:scale-105"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Gurudwara Map</span>
              </a>
            </div>
          </div>

          {/* Full Size iFrame Map */}
          <div className="w-full h-[380px] sm:h-[480px] relative bg-[#FAF2E4]">
            <iframe
              src="https://maps.google.com/maps?q=The+Grand+Hotel,+Murgasol,+Asansol,+West+Bengal&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Grand Asansol Location Map"
              className="relative z-10 w-full h-full"
            />
          </div>
        </div>

        {/* Footer Closing & Back to Top */}
        <div className="text-center mt-12 space-y-4">
          <div className="inline-flex flex-col items-center">
            <span className="text-3xl font-serif text-[#0284C7] font-bold tracking-widest mb-1 select-none">
              ੴ
            </span>
            <span className="text-xs font-cinzel font-semibold tracking-widest text-[#B45309] uppercase">
              Satnam Waheguru
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#0F172A]">
            {WEDDING_DATA.couple.heading}
          </h3>

          <p className="text-xs sm:text-sm font-cinzel tracking-[0.25em] text-[#B45309] uppercase font-bold">
            R.S.V.P: HORA &amp; DUA
          </p>

          {/* Magical Creator Credit & Contact Tag */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0C4A6E] via-[#0284C7] to-[#BE185D] border-2 border-[#D4AF37]/60 text-white shadow-2xl relative overflow-hidden max-w-xl mx-auto text-center group">
            {/* Ambient Sparkle Glows */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-amber-200 text-[10px] sm:text-xs font-cinzel uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span>Crafted With Magic & Devotion</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-serif-luxury font-bold text-amber-100">
                Want something magical like this for your special day?
              </h4>

              <p className="text-xs sm:text-sm font-sans-body text-white/90 max-w-md mx-auto leading-relaxed">
                Designed &amp; Developed by <strong className="text-amber-300 font-semibold">Himesh</strong>
              </p>

              {/* Phone & Location Tag */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:8824962843"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#291C1A] text-xs sm:text-sm font-bold font-sans-body shadow-lg hover:bg-amber-200 hover:scale-105 transition-all border border-[#D4AF37]"
                >
                  <Phone className="w-4 h-4 text-[#291C1A]" />
                  <span>+91 88249 62843</span>
                </a>

                <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 border border-[#D4AF37]/40 text-amber-200 text-xs sm:text-sm font-semibold font-sans-body">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Jodhpur, Rajasthan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0284C7] text-white hover:bg-[#0369A1] text-xs font-sans-body font-semibold shadow-md transition-all border border-amber-200/40"
            >
              <span>Back To Top Cover</span>
              <ArrowUp className="w-4 h-4 text-amber-200" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
