import React, { useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { FeatureCarousel } from './ui/feature-carousel';

export const Celebrations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="celebrations"
      className="relative py-14 sm:py-24 px-3 sm:px-6 md:px-12 bg-gradient-to-b from-[#081226] via-[#101B38] to-[#0A1128] text-white overflow-hidden min-h-screen"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#0284C7]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#DB2777]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-3/4 left-10 w-[450px] h-[450px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Royal Starlight Dust Lattice */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-4xl mx-auto relative z-10 px-0 sm:px-2">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-[#D4AF37]/50 text-amber-200 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase font-cinzel tracking-[0.25em] font-bold text-amber-200">
              WEDDING CELEBRATION PROGRAMME
            </span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#FDE68A] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] tracking-tight">
            Events &amp; Ceremonies
          </h2>
          <p className="text-xs sm:text-sm font-sans-body text-sky-100/90 max-w-lg mx-auto leading-relaxed">
            Scroll down to view each sacred ceremony, timings, dress codes, and directions for Ashi &amp; Deep.
          </p>
        </div>

        {/* Vertical Event Cards Stream */}
        <FeatureCarousel />
      </div>
    </section>
  );
};


