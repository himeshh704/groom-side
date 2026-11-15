import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  caption: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery/gallery_real_1.jpg",
    title: "Soulful Connection",
    caption: "Ashi & Deep in timeless warmth and serene togetherness."
  },
  {
    id: 3,
    src: "/images/gallery/gallery_real_3.jpg",
    title: "Eternal Companions",
    caption: "Walking hand in hand toward a lifetime of togetherness."
  },
  {
    id: 5,
    src: "/images/gallery/gallery_real_6.jpg",
    title: "Cheers to Forever",
    caption: "Stepping into a glorious tomorrow as husband and wife."
  },
  {
    id: 4,
    src: "/images/gallery/gallery_real_4.jpg",
    title: "Royal Romance",
    caption: "Grand celebrations and moments carved into golden memories."
  },
  {
    id: 2,
    src: "/images/gallery/gallery_real_2.jpg",
    title: "Cherished Smiles",
    caption: "Radiant laughter and hearts woven in divine harmony."
  }
];

export const CoupleStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const openLightbox = (index: number) => {
    soundEngine.playClick();
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    soundEngine.playClick();
    setSelectedImageIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  return (
    <section ref={sectionRef} id="couple" className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#E8F3F8] via-[#FFF9FB] to-[#F0F9FF] text-[#1E293B] overflow-hidden">
      <motion.div style={{ y: parallaxY }} className="max-w-6xl mx-auto will-change-transform">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#D4AF37]/40 text-[#0284C7] shadow-sm">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase font-cinzel tracking-[0.25em] font-bold text-[#0369A1]">
              Priceless Moments
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#0F172A]">
            Pre-Wedding Gallery
          </h2>

          <p className="text-sm sm:text-base font-cormorant italic text-[#64748B] max-w-xl mx-auto">
            "Capturing the eternal bond, laughter, and timeless romance of Ashi & Deep."
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </div>

        {/* Interactive Gallery Grid: Balanced responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_IMAGES.map((item, index) => {
            const isLandscape = item.id === 4;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                onClick={() => openLightbox(index)}
                className={`group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 bg-[#F0F9FF] shadow-lg hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-500 ${
                  isLandscape ? "sm:col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-[3/4]"
                }`}
              >
              {/* Photo */}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center brightness-[1.03] contrast-[1.04] saturate-[1.06] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay with Gold Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1.5 text-amber-200 text-xs font-cinzel uppercase tracking-widest font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ashi &amp; Deep</span>
                  </div>
                  <h3 className="text-lg font-serif-luxury font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans-body text-sky-100/80 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Click to Zoom Icon Badge */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-full border border-amber-300/50 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4 fill-amber-300" />
              </div>
            </motion.div>
          );
        })}
        </div>
      </motion.div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 border border-white/20"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6 text-[#D4AF37]" />
            </button>

            {/* Prev Image */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 border border-white/20"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 text-[#D4AF37]" />
            </button>

            {/* Main Lightbox Image Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[85vh] w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-black shadow-2xl flex flex-col"
            >
              <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center">
                <img
                  src={GALLERY_IMAGES[selectedImageIndex].src}
                  alt={GALLERY_IMAGES[selectedImageIndex].title}
                  className="max-w-full max-h-[70vh] object-contain brightness-[1.03] contrast-[1.04] saturate-[1.06] rounded-md shadow-2xl"
                />
              </div>

              {/* Lightbox Caption Bar */}
              <div className="bg-gradient-to-r from-[#0C4A6E] via-[#0284C7] to-[#BE185D] border-t border-[#D4AF37]/50 p-4 sm:p-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-amber-200">
                      {GALLERY_IMAGES[selectedImageIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans-body text-white/90 mt-0.5">
                      {GALLERY_IMAGES[selectedImageIndex].caption}
                    </p>
                  </div>
                  <span className="text-xs font-cinzel text-amber-200 font-semibold tracking-widest shrink-0">
                    {selectedImageIndex + 1} / {GALLERY_IMAGES.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Next Image */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 border border-white/20"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 text-[#D4AF37]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CoupleStory;
