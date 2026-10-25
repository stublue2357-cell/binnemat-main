import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-manifesto-card', {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        },
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 px-4 sm:px-6 max-w-5xl mx-auto my-4 text-slate-900 dark:text-white">
      <div className="gsap-manifesto-card relative rounded-3xl overflow-hidden glass-apple-card border border-[#E5E4E2] dark:border-white/[0.1] bg-white/95 dark:bg-[#161311]/90 p-8 sm:p-12 text-center shadow-[0_15px_45px_rgba(111,78,55,0.06)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
        {/* Core Ambient Aurora Glow (Pale Lavender & Mocha) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E6EDFD]/70 dark:bg-[#6F4E37]/[0.15] blur-3xl pointer-events-none -z-10" />

        {/* Sacred Geometry Mark */}
        <div className="flex justify-center mb-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#6F4E37] to-[#8C6547] flex items-center justify-center p-0.5 shadow-[0_4px_20px_rgba(111,78,55,0.3)]">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#161311] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-[#6F4E37] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Urdu Calligraphy Headline */}
        <h2 className="font-urdu text-5xl sm:text-7xl md:text-8xl text-slate-900 dark:text-white pt-2 pb-1 leading-[1.4] drop-shadow-sm font-bold">
          ہر گھر کا سکون
        </h2>

        {/* English Brand Manifesto Pill (Pale Lavender & Mocha) */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/25 border border-[#E5E4E2] dark:border-[#8C6547]/30 text-[11px] font-mono tracking-widest uppercase text-[#6F4E37] dark:text-[#E5E4E2] font-bold shadow-sm">
            THE BINNEMAT MANIFESTO
          </span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-normal mb-6">
          Unbroken winter warmth, silent solar cooling, and gourmet gas safety. Engineered for Pakistan.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-5 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-[#E5E4E2] dark:border-white/[0.1] text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">
            <Shield size={13} className="text-[#6F4E37] dark:text-[#C49774]" />
            <span>100% Sealed Original</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">
            <Sparkles size={13} className="text-amber-500" />
            <span>7-Year Tank Warranty</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">
            <CheckCircle size={13} className="text-emerald-500" />
            <span>Nationwide Logistics</span>
          </div>
        </div>
      </div>
    </section>
  );
}
