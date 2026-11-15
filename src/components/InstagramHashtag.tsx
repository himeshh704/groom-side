import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA } from '../data/weddingData';
import { soundEngine } from '../utils/soundEffects';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

interface HashtagItem {
  tag: string;
  label: string;
  primary?: boolean;
}

export const InstagramHashtag: React.FC = () => {
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const hashtagList: HashtagItem[] = WEDDING_DATA.couple.hashtags || [
    { tag: "#DeepInLoveWithAshi", label: "Official Couple Tag", primary: true },
    { tag: "#DeepWedsAshi", label: "Wedding Celebrations", primary: false },
    { tag: "#DuaSeHora", label: "Two Families, One Heart", primary: false },
    { tag: "#DeepKiAshi", label: "Sangeet & Bhangra Beats", primary: false },
    { tag: "#ADRoyalWedding", label: "Anand Karaj Nuptials", primary: false },
  ];

  const primaryTag = hashtagList.find((h) => h.primary) || hashtagList[0];
  const secondaryTags = hashtagList.filter((h) => h.tag !== primaryTag.tag);

  const handleCopy = (tag: string) => {
    try {
      soundEngine.playChime();
      navigator.clipboard.writeText(tag);
      setCopiedTag(tag);

      // Micro confetti burst in Instagram royal colors
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E1306C', '#FCAF45', '#833AB4', '#D4AF37', '#38BDF8'],
      });

      setTimeout(() => {
        setCopiedTag(null);
      }, 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const openInstagramTag = (tag: string) => {
    soundEngine.playClick();
    const cleanTag = tag.replace('#', '');
    window.open(`https://www.instagram.com/explore/tags/${cleanTag}/`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hashtag-corner" className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#FFF9F2] text-[#291C1A] overflow-hidden relative border-t-2 border-[#D4AF37]/40">
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-purple-500/10 border border-[#D4AF37]/50 text-[#0C4A6E] shadow-sm">
            <InstagramIcon className="w-4 h-4 text-rose-600" />
            <span className="text-xs uppercase font-cinzel tracking-[0.25em] font-bold text-[#6E1F2E]">
              The Royal Hashtag Corner
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#0F172A] tracking-tight">
            Tag Your Wedding Moments
          </h2>

          <p className="text-sm sm:text-base font-cormorant italic text-[#64748B] max-w-lg mx-auto leading-relaxed">
            "Every bhangra step, joyous laughter, and sacred blessing is a story. Share your reels and memories with our official hashtags on Instagram!"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </div>

        {/* Featured Primary Hashtag Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-4 sm:p-8 md:p-10 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF9EF] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.2)] overflow-hidden mb-10 text-center"
        >
          {/* Top Instagram Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#B45309] border border-[#D4AF37]/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] sm:text-[11px] font-cinzel font-bold tracking-widest uppercase">
              {primaryTag.label}
            </span>
          </div>

          {/* Big Hashtag Display (Responsive to fit all mobile screens without cutting) */}
          <div className="my-2 sm:my-3 px-1 w-full overflow-hidden flex items-center justify-center">
            <h3 className="text-[1.3rem] min-[370px]:text-[1.5rem] min-[420px]:text-[1.75rem] sm:text-4xl md:text-5xl font-cinzel font-black tracking-tight sm:tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] drop-shadow-sm select-all break-normal max-w-full leading-tight">
              {primaryTag.tag}
            </h3>
          </div>

          <p className="text-xs sm:text-sm font-sans-body text-[#5E4B37] max-w-md mx-auto mb-6">
            Tap below to copy to your clipboard or instantly search memories on Instagram.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Copy Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCopy(primaryTag.tag)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans-body font-bold text-xs sm:text-sm shadow-md transition-all ${
                copiedTag === primaryTag.tag
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white'
              }`}
            >
              {copiedTag === primaryTag.tag ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Hashtag Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-200" />
                  <span>Copy Primary Hashtag</span>
                </>
              )}
            </motion.button>

            {/* Open in Instagram Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openInstagramTag(primaryTag.tag)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#DD2A7B] to-[#8134AF] hover:from-[#C13584] hover:to-[#5851DB] text-white font-sans-body font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <InstagramIcon className="w-4 h-4 text-amber-200" />
              <span>Explore on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80" />
            </motion.button>
          </div>
        </motion.div>

        {/* Secondary Curated Hashtags Grid */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="text-xs font-cinzel font-bold uppercase tracking-[0.2em] text-[#B45309]">
              More Celebration Tags To Use
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondaryTags.map((item) => {
              const isCopied = copiedTag === item.tag;
              return (
                <motion.div
                  key={item.tag}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-sans-body font-semibold text-[#8C6D46] uppercase tracking-wider block mb-1">
                      {item.label}
                    </span>
                    <h4 className="text-base sm:text-lg font-cinzel font-bold text-[#0F172A] tracking-tight sm:tracking-wide select-all break-normal">
                      {item.tag}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
                    <button
                      onClick={() => handleCopy(item.tag)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans-body font-semibold transition-all ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#FFF9EF] hover:bg-amber-100 text-[#0369A1] border border-[#0284C7]/30'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => openInstagramTag(item.tag)}
                      title="View tag on Instagram"
                      className="p-1.5 rounded-full text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Simple Note on Tagging */}
        <div className="mt-8 pt-6 border-t border-[#D4AF37]/30 text-center">
          <p className="text-xs sm:text-sm font-sans-body text-[#5E4B37] font-medium">
            ✨ <strong>Tag on Instagram:</strong> Use these hashtags in your reels, posts, and stories to share your warm wishes with both families!
          </p>
        </div>

      </div>
    </section>
  );
};

export default InstagramHashtag;
