import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, CheckCircle2, Calendar } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { soundEngine } from '../utils/soundEffects';

export const DateReveal: React.FC = () => {
  const [isScratched, setIsScratched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastCheckTimeRef = useRef(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Live Countdown logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(WEDDING_DATA.weddingDateISO).getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerReveal = useCallback(() => {
    if (isScratched) return;
    setIsScratched(true);
    soundEngine.playChime();
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#38BDF8', '#F472B6', '#D4AF37', '#FFF9EF', '#BAE6FD'],
      });
    } catch (e) {
      console.error(e);
    }
  }, [isScratched]);

  // Draw initial scratch surface (Theme Sky Blue, Metallic Gold Foil & Soft Blush Pink)
  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w <= 0 || h <= 0) return;

    // Reset composite operation to paint over canvas
    ctx.globalCompositeOperation = 'source-over';

    // Metallic Gradient: Royal Sky Blue, Champagne Gold, Rose Pink
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0284C7');
    grad.addColorStop(0.3, '#D4AF37');
    grad.addColorStop(0.5, '#FDE68A');
    grad.addColorStop(0.7, '#F472B6');
    grad.addColorStop(1, '#0C4A6E');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative inner gold border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    // Corner filigree accents
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 18, w - 36, h - 36);

    // Ik Onkar Symbol at the top of the scratch foil
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 6;
    ctx.fillText('ੴ', w / 2, h / 2 - 42);

    // Instructive Calligraphy Text
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('✨ Scratch Here With Finger ✨', w / 2, h / 2 - 2);
    ctx.font = '12px sans-serif';
    ctx.fillText('to reveal the wedding date', w / 2, h / 2 + 22);

    // Gold sparkle badge at bottom
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#FEF08A';
    ctx.fillText('Ashi & Deep • 2026', w / 2, h / 2 + 50);

    ctx.shadowBlur = 0;
  }, [isScratched]);

  // Setup canvas size and draw foil on mount / resize
  useEffect(() => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const setupSize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.round(rect.width) || 300;
      canvas.width = size;
      canvas.height = size;
      drawFoil();
    };

    setupSize();

    const resizeObserver = new ResizeObserver(() => {
      setupSize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isScratched, drawFoil]);

  // Check scratch percentage with sampled pixels (extremely fast, zero main-thread lag)
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const now = performance.now();
    if (now - lastCheckTimeRef.current < 120) return;
    lastCheckTimeRef.current = now;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      let totalSampled = 0;

      // Sample every 16th pixel to calculate percentage in < 0.1ms
      for (let i = 3; i < data.length; i += 16 * 4) {
        totalSampled++;
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = (transparentPixels / totalSampled) * 100;
      if (percent > 28) {
        triggerReveal();
      }
    } catch (e) {
      console.error(e);
    }
  }, [isScratched, triggerReveal]);

  // Erase stroke between points for smooth continuous scratching
  const eraseLine = useCallback(
    (x2: number, y2: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isScratched) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 44;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      } else {
        ctx.arc(x2, y2, 22, 0, Math.PI * 2);
        ctx.fill();
      }

      lastPointRef.current = { x: x2, y: y2 };
      checkScratchPercentage();
    },
    [isScratched, checkScratchPercentage]
  );

  // Unified Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}

    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lastPointRef.current = { x, y };
    eraseLine(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    eraseLine(x, y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
    checkScratchPercentage();
  };

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-[#070F26] via-[#1A0B2E] to-[#2B0821] text-white overflow-hidden">
      {/* Vibrant Ambient Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0284C7]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#DB2777]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Royal Starlight Dust Lattice */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-[#D4AF37]/60 text-amber-200 shadow-[0_0_20px_rgba(212,175,55,0.25)] mb-4">
          <Calendar className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-amber-200 drop-shadow">
            Interactive Scratch Card
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#FDE68A] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-3">
          Scratch To Unlock The Date
        </h2>
        <p className="text-xs sm:text-sm font-sans-body text-[#BAE6FD]/90 mb-8 max-w-md mx-auto leading-relaxed drop-shadow-sm">
          Rub your finger or mouse across the golden foil card to unveil our wedding date and start the live countdown!
        </p>

        {/* Main Card Container with Royal Glassmorphism & Gold Border */}
        <div className="relative max-w-lg mx-auto bg-gradient-to-b from-[#131F37]/90 via-[#1C1A3A]/90 to-[#2A102A]/90 backdrop-blur-2xl border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.25)] overflow-hidden">
          
          {/* Royal Corner Filigree Ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/70 pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/70 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/70 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/70 pointer-events-none" />

          {/* Unrevealed State: Royal Gold Square Scratch Foil Overlay */}
          {!isScratched && (
            <div
              ref={containerRef}
              className="relative w-64 sm:w-80 h-64 sm:h-80 mx-auto rounded-3xl shadow-[0_10px_35px_rgba(56,189,248,0.35)] group cursor-pointer border-4 border-[#D4AF37] overflow-hidden select-none"
            >
              {/* Underlying Date Text Teaser inside Royal Theme Gold Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C4A6E] via-[#0284C7] to-[#BE185D] flex flex-col items-center justify-center p-6 text-white text-center">
                <span className="text-[10px] font-cinzel text-amber-200 uppercase tracking-widest block mb-1 font-semibold">
                  Save The Date
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white leading-tight">
                  {WEDDING_DATA.formattedDate}
                </h3>
                <p className="text-xs font-sans-body text-sky-100 mt-1">{WEDDING_DATA.city}</p>
                <div className="mt-3 px-3 py-1 rounded-full bg-white/15 border border-white/30 text-[10px] tracking-wider uppercase text-amber-200 font-cinzel">
                  Anand Karaj Nuptials
                </div>
              </div>

              {/* Scratchable Canvas Surface with Touch Action None */}
              <canvas
                ref={canvasRef}
                style={{ touchAction: 'none' }}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none select-none z-10"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              />
            </div>
          )}

          {/* Quick Reveal Button if not scratched */}
          {!isScratched && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={triggerReveal}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#DB2777] hover:scale-105 active:scale-95 text-white text-xs font-sans-body font-bold uppercase tracking-wider transition-all border border-amber-300 shadow-[0_0_20px_rgba(2,132,199,0.5)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" />
                <span>Quick Reveal Date</span>
              </button>
            </div>
          )}

          {/* Revealed Date & Live Countdown Timer */}
          {isScratched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="space-y-6"
            >
              {/* Unveiled Date Callout */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0C4A6E] via-[#0284C7] to-[#BE185D] border-2 border-[#D4AF37] text-white shadow-xl relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-widest text-amber-200 mb-2 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-amber-200" /> Date Unlocked
                </div>

                <h3 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white my-1">
                  {WEDDING_DATA.formattedDate}
                </h3>

                <p className="text-xs sm:text-sm font-cinzel font-semibold text-amber-200 tracking-widest uppercase mt-2">
                  THURSDAY • THE BLISSFUL UNION (ANAND KARAJ)
                </p>

                <p className="text-xs font-sans-body text-sky-100 mt-2">
                  {WEDDING_DATA.city} • {WEDDING_DATA.couple.hashtag}
                </p>
              </div>

              {/* Live Ticking Countdown Timer */}
              <div className="pt-5 border-t border-[#D4AF37]/30">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-cinzel font-bold uppercase tracking-wider text-amber-200 mb-4 drop-shadow">
                  <Clock className="w-4 h-4 text-amber-300 animate-pulse" /> Live Countdown To Nuptials
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                  {timeBlocks.map((block) => (
                    <div
                      key={block.label}
                      className="bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-[#D4AF37]/50 rounded-2xl p-3 sm:p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md hover:border-[#D4AF37] transition-all"
                    >
                      <div className="text-2xl sm:text-4xl font-serif-luxury font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-[#BAE6FD] to-[#38BDF8] drop-shadow-md">
                        {String(block.value).padStart(2, '0')}
                      </div>
                      <span className="text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-widest text-amber-300 mt-1 block">
                        {block.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DateReveal;
