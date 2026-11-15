"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  MapPin,
  Sun,
  Wine,
  Music,
  Clock,
  Shirt,
  Calendar,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { cn } from "../../lib/utils";
import { soundEngine } from "../../utils/soundEffects";

export interface EventPortion {
  side: string;
  eventName: string;
  date?: string;
  samaptiTime: string;
  venue: string;
}

export interface EventFeatureItem {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  image: string;
  venue: string;
  time: string;
  dressCode: string;
  description: string;
  googleMapsUrl?: string;
  calendarLink?: string;
  portions?: EventPortion[];
}

const EVENTS_DATA: EventFeatureItem[] = [
  {
    id: "path-samapti",
    label: "Path Samapti",
    sublabel: "8 Dec (Bride) ΓÇó 13 Dec (Groom)",
    icon: Sparkles,
    image: "/images/ad_event_sahej_path.jpg",
    venue: "Dhanbad & Asansol Gurudwaras",
    time: "8th Dec (Bride) & 13th Dec (Groom)",
    dressCode: "Traditional / Head Covered",
    description: "Seeking the supreme divine blessings of Sri Guru Granth Sahib Ji as we commence the auspicious wedding celebrations of Ashi & Deep.",
    portions: [
      {
        side: "BrideΓÇÖs Side",
        eventName: "Sahej Path Samapti",
        date: "8th Dec 2026",
        samaptiTime: "12:00 PM",
        venue: "Gurudwara Gurunanak Pura, Dhanbad",
      },
      {
        side: "GroomΓÇÖs Side",
        eventName: "Akhand Path Samapti",
        date: "13th Dec 2026",
        samaptiTime: "9:30 AM",
        venue: "Baba Deep Singh Ji Gurudwara, Dhruv Dangal, Asansol",
      },
    ],
  },
  {
    id: "ring-ceremony",
    label: "Cheers to Forever (Ring Ceremony)",
    sublabel: "15 Dec ΓÇó 7:00 PM",
    icon: Wine,
    image: "/images/ad_event_ring_ceremony.jpg",
    venue: "The Grand, Murgasol, Asansol",
    time: "Tuesday, 15th Dec 2026 ΓÇó 7:00 PM Onwards",
    dressCode: "Evening Glitz & Glamour",
    description: "An evening of sparkling rings, champagne toasts, melodious music, and celebrating the beginning of forever.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Murgasol+Asansol",
    calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ring+Ceremony+-+Cheers+to+Forever+-+Deep+weds+Ashi&dates=20261215T133000Z/20261215T173000Z&details=Cheers+to+Forever+Ring+Ceremony&location=The+Grand,+Murgasol,+Asansol",
  },
  {
    id: "phoolon-ki-haldi",
    label: "Phoolon Ki Haldi",
    sublabel: "16 Dec ΓÇó 11:00 AM",
    icon: Sun,
    image: "/images/ad_event_haldi.jpg",
    venue: "The Grand, Murgasol, Asansol",
    time: "Wednesday, 16th Dec 2026 ΓÇó 11:00 AM Onwards",
    dressCode: "Hot Pink for Ladies",
    description: "A joyous celebration of auspicious turmeric, a shower of fragrant rose petals, dholki tunes, and bright smiles.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Murgasol+Asansol",
    calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Phoolon+ki+Haldi+-+Deep+weds+Ashi&dates=20261216T053000Z/20261216T093000Z&details=Phoolon+Ki+Haldi+Celebration&location=The+Grand,+Murgasol,+Asansol",
  },
  {
    id: "band-baaja-brigade",
    label: "Band Baaja Brigade (Baraat)",
    sublabel: "16 Dec ΓÇó 7:00 PM",
    icon: Music,
    image: "/images/ad_event_baraat.jpg",
    venue: "The Grand, Murgasol, Asansol",
    time: "Wednesday, 16th Dec 2026 ΓÇó 7:00 PM Onwards",
    dressCode: "Royal Festive Punjabi",
    description: "High-octane Punjabi dhol beats, brass band fanfare, and energetic bhangra as the groom's brigade arrives in grand style!",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Murgasol+Asansol",
    calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Band+Baaja+Brigade+Baraat+-+Deep+weds+Ashi&dates=20261216T133000Z/20261216T173000Z&details=Band+Baaja+Brigade+Baraat+Celebration&location=The+Grand,+Murgasol,+Asansol",
  },
  {
    id: "anand-karaj",
    label: "The Blissful Union (Anand Karaj)",
    sublabel: "17 Dec ΓÇó 11:00 AM",
    icon: Heart,
    image: "/images/ad_event_anand_karaj.jpg",
    venue: "Shri Guru Nanak Gurudwara, Asansol (Followed by Lunch @ The Grand)",
    time: "Thursday, 17th Dec 2026 ΓÇó 11:00 AM Onwards",
    dressCode: "Pastel Elegance / Gurdwara Formal",
    description: "The holy Four Laavan nuptials uniting Ashi & Deep into one spiritual light before Sri Guru Granth Sahib Ji, followed by celebratory lunch at The Grand.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Shri+Guru+Nanak+Gurudwara+Asansol",
    calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Blissful+Union+Anand+Karaj+-+Deep+weds+Ashi&dates=20261217T053000Z/20261217T093000Z&details=Anand+Karaj+Wedding+Ceremony+followed+by+Lunch+at+The+Grand&location=Shri+Guru+Nanak+Gurudwara,+Asansol",
  },
  {
    id: "reception-party",
    label: "Grand Reception Party",
    sublabel: "19 Dec ΓÇó 7:00 PM",
    icon: Sparkles,
    image: "/images/ad_event_reception.jpg",
    venue: "Asansol Club, Asansol",
    time: "Saturday, 19th Dec 2026 ΓÇó 7:00 PM Onwards",
    dressCode: "Black Tie & Indian Regal Formals",
    description: "A gala night of soulful music, gourmet dining, and celebrations welcoming the newlyweds Ashi & Deep into married life.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Asansol+Club+Asansol",
    calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Grand+Reception+Party+-+Deep+weds+Ashi&dates=20261219T133000Z/20261219T183000Z&details=Grand+Wedding+Reception+Party&location=Asansol+Club,+Asansol",
  },
];

export function FeatureCarousel() {
  const scrollToEvent = useCallback((id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(`event-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* 1. Quick-Jump Date Pills Bar (Sticky / Easy Navigation for All Guests) */}
      <div className="sticky top-4 z-30 py-2.5 px-3 rounded-2xl bg-[#091124]/90 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-wider text-amber-200 shrink-0 px-1">
          Jump to:
        </span>
        {EVENTS_DATA.map((event, idx) => {
          const shortDate = event.sublabel.split("ΓÇó")[0].trim();
          return (
            <button
              key={event.id}
              onClick={() => scrollToEvent(event.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-cinzel font-semibold text-white/90 bg-white/[0.08] hover:bg-[#D4AF37]/20 hover:text-amber-200 hover:border-[#D4AF37] border border-white/10 transition-all shrink-0 active:scale-95 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              <span>{idx + 1}. {shortDate}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Natural Vertical Scroll Stream of Event Cards */}
      <div className="space-y-12 sm:space-y-16">
        {EVENTS_DATA.map((event, index) => {
          const IconComponent = event.icon;
          const isLast = index === EVENTS_DATA.length - 1;

          return (
            <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-2 sm:border-3 border-[#D4AF37] bg-gradient-to-b from-[#111A2E]/95 via-[#18122B]/95 to-[#240A22]/95 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(212,175,55,0.2)] backdrop-blur-xl group"
              >
                {/* Visual Banner Header with Arch Image & Overlays */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.label}
                    className="w-full h-full object-cover brightness-[1.02] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Fade to Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111A2E] via-black/40 to-black/30 pointer-events-none" />

                  {/* Top Bar Badges on Image */}
                  <div className="absolute top-3.5 inset-x-3.5 sm:top-5 sm:inset-x-5 flex items-center justify-between gap-2 z-10">
                    {/* Hashtag Pill */}
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/50 text-amber-200 text-[10px] sm:text-xs font-cinzel font-bold tracking-widest uppercase shadow-md">
                      #DeepWedsAshi
                    </div>

                    {/* Ceremony Number Pill */}
                    <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#DB2777] text-white text-[11px] sm:text-xs font-cinzel font-bold tracking-wider uppercase border border-amber-200/60 shadow-lg">
                      {index + 1} OF {EVENTS_DATA.length}
                    </div>
                  </div>

                  {/* Main Event Title Overlaid on Image Base */}
                  <div className="absolute bottom-3 inset-x-4 sm:bottom-4 sm:inset-x-6 z-10 space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-300/40 text-amber-300 text-xs font-cinzel font-bold uppercase tracking-wider">
                      <IconComponent className="w-3.5 h-3.5 text-amber-300" />
                      <span>{event.sublabel}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      {event.label}
                    </h3>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-5 sm:p-7 space-y-5 text-white">
                  {/* Event Description */}
                  <p className="text-xs sm:text-sm font-sans-body text-sky-100/95 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Special Dual Portion Layout for Path Samapti */}
                  {event.portions ? (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                        {event.portions.map((portion, pIdx) => {
                          const isBride = portion.side.toLowerCase().includes("bride");
                          return (
                            <div
                              key={pIdx}
                              className={cn(
                                "p-3 sm:p-4 rounded-2xl border backdrop-blur-md text-left transition-all",
                                isBride
                                  ? "bg-gradient-to-r from-[#DB2777]/30 via-[#BE185D]/20 to-black/60 border-[#F472B6]/60 shadow-[0_4px_20px_rgba(219,39,119,0.2)]"
                                  : "bg-gradient-to-r from-[#0284C7]/30 via-[#0369A1]/20 to-black/60 border-[#38BDF8]/60 shadow-[0_4px_20px_rgba(2,132,199,0.2)]"
                              )}
                            >
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span
                                  className={cn(
                                    "text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shrink-0",
                                    isBride
                                      ? "bg-[#DB2777]/60 text-pink-100 border-pink-300/60"
                                      : "bg-[#0284C7]/60 text-sky-100 border-sky-300/60"
                                  )}
                                >
                                  {portion.side}
                                </span>
                                <span className="text-xs sm:text-sm font-serif-luxury font-bold text-amber-200">
                                  {portion.eventName}
                                </span>
                              </div>

                              <div className="space-y-1.5 text-xs sm:text-sm font-sans-body">
                                <div className="flex items-center justify-between gap-2 text-amber-200">
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                                    <span>
                                      Samapti Time: <strong className="text-white font-semibold">{portion.samaptiTime}</strong>
                                    </span>
                                  </div>
                                  {portion.date && (
                                    <span className="text-amber-200/90 font-cinzel font-semibold text-xs">
                                      {portion.date}
                                    </span>
                                  )}
                                </div>

                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(portion.venue)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sky-100/95 hover:text-white transition-colors group/map pt-0.5 font-medium"
                                >
                                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] group-hover/map:scale-110 transition-transform shrink-0" />
                                  <span className="underline underline-offset-4 decoration-[#D4AF37]/70">
                                    {portion.venue} ≡ƒôì
                                  </span>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Shared Dress Code Banner */}
                      <div className="p-3 rounded-xl bg-white/[0.05] border border-amber-300/30 flex items-center justify-between flex-wrap gap-2 text-xs font-sans-body">
                        <span className="text-white/80">8th &amp; 13th Dec 2026</span>
                        <div className="flex items-center gap-1.5 text-amber-200 font-medium">
                          <Shirt className="w-3.5 h-3.5 text-amber-300" />
                          <span>DRESS CODE: <strong className="text-white">{event.dressCode}</strong></span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Standard Ceremony Details Grid */
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        {/* Time & Date Box */}
                        <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.06] border border-amber-300/30 space-y-1">
                          <div className="flex items-center gap-1.5 text-amber-200 text-xs font-cinzel uppercase tracking-wider font-semibold">
                            <Clock className="w-3.5 h-3.5 text-amber-300" />
                            <span>Date &amp; Time</span>
                          </div>
                          <p className="text-xs sm:text-sm font-sans-body font-semibold text-white">
                            {event.time}
                          </p>
                        </div>

                        {/* Dress Code Box */}
                        <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.06] border border-amber-300/30 space-y-1">
                          <div className="flex items-center gap-1.5 text-amber-200 text-xs font-cinzel uppercase tracking-wider font-semibold">
                            <Shirt className="w-3.5 h-3.5 text-amber-300" />
                            <span>Dress Code</span>
                          </div>
                          <p className="text-xs sm:text-sm font-sans-body font-semibold text-white">
                            {event.dressCode}
                          </p>
                        </div>
                      </div>

                      {/* Venue Box with Direct Google Maps Link */}
                      <div className="p-3.5 rounded-xl bg-white/[0.06] border border-[#D4AF37]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-amber-200 text-xs font-cinzel uppercase tracking-wider font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Ceremony Venue</span>
                          </div>
                          <p className="text-xs sm:text-sm font-sans-body font-medium text-white/95">
                            {event.venue}
                          </p>
                        </div>

                        {event.googleMapsUrl && (
                          <a
                            href={event.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:scale-105 active:scale-95 text-white text-xs font-sans-body font-semibold transition-all border border-amber-200/50 shadow-md shrink-0"
                          >
                            <MapPin className="w-3.5 h-3.5 text-amber-200" />
                            <span>Directions (Map)</span>
                            <ExternalLink className="w-3 h-3 text-amber-200" />
                          </a>
                        )}
                      </div>

                      {/* Add to Calendar Button */}
                      {event.calendarLink && (
                        <div className="pt-1 flex justify-end">
                          <a
                            href={event.calendarLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white font-sans-body transition-colors underline underline-offset-4 decoration-amber-300/50"
                          >
                            <Calendar className="w-3.5 h-3.5 text-amber-300" />
                            <span>Add {event.label.split("(")[0].trim()} to Calendar</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Connecting Downward Ornament between Event Cards */}
              {!isLast && (
                <div className="py-6 sm:py-8 flex flex-col items-center justify-center text-amber-300/70 select-none">
                  <div className="w-[2px] h-6 bg-gradient-to-b from-[#D4AF37] to-transparent" />
                  <div className="my-1 flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-amber-300/30 text-[10px] sm:text-xs font-cinzel tracking-widest uppercase text-amber-200">
                    <ChevronDown className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                    <span>Next Ceremony</span>
                    <ChevronDown className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                  </div>
                  <div className="w-[2px] h-6 bg-gradient-to-t from-[#D4AF37] to-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeatureCarousel;
