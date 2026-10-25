import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function AboutHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-about-hero-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-[#E5E4E2] dark:border-white/10 bg-neutral-950">
      {/* BACKGROUND STUDIO HERO PHOTOGRAPHY */}
      <div className="h-[420px] sm:h-[480px] w-full relative">
        <img
          src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/studio-collection.jpg"
          alt="Binnemat Flagship Appliance Collection"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/superconscious_heater_hero.jpg';
          }}
          className="w-full h-full object-cover object-center filter brightness-60"
        />
        {/* CINEMATIC GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40" />
      </div>

      {/* FLOATING CENTERED COPY */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-12 text-white">
        <span className="gsap-about-hero-item inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6EDFD]/20 border border-[#E5E4E2]/40 text-[#E6EDFD] text-xs font-mono font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
          <Sparkles size={13} className="text-[#C49774]" />
          <span>BINNEMAT APPLIANCES</span>
        </span>
        <h1 className="gsap-about-hero-item font-wix text-3xl sm:text-5xl lg:text-6xl font-black max-w-3xl leading-tight m-0 text-white drop-shadow-lg">
          Crafted for Comfort. <br />
          <span className="gold-gradient-text">Built for Endurance.</span>
        </h1>
        <p className="gsap-about-hero-item text-xs sm:text-base text-neutral-300 max-w-xl mt-3 leading-relaxed font-light drop-shadow">
          Ultra-efficient electric water heaters, 8mm glass hobs, and 30W inverter fans engineered for Pakistani living.
        </p>
      </div>
    </div>
  );
}
