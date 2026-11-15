import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SocialCards from './ui/card-fan-carousel';

const GALLERY_CARDS = [
  {
    imgUrl: "/images/ashi_deep_couple.png",
    alt: "Ashi & Deep Royal Wedding Couple",
  },
  {
    imgUrl: "/images/ad_event_haldi.jpg",
    alt: "Phoolon Ki Haldi Celebration",
  },
  {
    imgUrl: "/images/ad_event_ring_ceremony.jpg",
    alt: "Cheers to Forever Ring Ceremony",
  },
  {
    imgUrl: "/images/ad_event_baraat.jpg",
    alt: "Band Baaja Brigade Baraat",
  },
  {
    imgUrl: "/images/ad_event_anand_karaj.jpg",
    alt: "The Blissful Union Anand Karaj",
  },
  {
    imgUrl: "/images/ad_event_reception.jpg",
    alt: "Grand Reception Celebration",
  },
  {
    imgUrl: "/images/ad_event_sahej_path.jpg",
    alt: "Sahej Path Samapti Gurudwara",
  },
  {
    imgUrl: "/images/ashi_deep_real.jpg",
    alt: "Ashi & Deep Together",
  },
];

export const RoyalGallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 px-4 md:px-8 bg-[#FFF9EF] text-[#291C1A] overflow-hidden relative">
      <div className="max-w-6xl mx-auto text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#6E1F2E]/10 border border-[#6E1F2E]/30 text-[#6E1F2E]">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs uppercase font-sans-body tracking-[0.25em] font-bold">
            ROYAL MEMORIES
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#6E1F2E]">
          Celebration Gallery
        </h2>

        <p className="text-xs sm:text-sm font-cormorant italic text-[#291C1A]/80 max-w-xl mx-auto">
          Hover and cycle through our royal interactive card fan gallery.
        </p>
      </div>

      {/* Card Fan Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SocialCards cards={GALLERY_CARDS} />
      </motion.div>
    </section>
  );
};
