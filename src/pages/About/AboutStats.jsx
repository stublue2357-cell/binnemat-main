import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStats() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-stat-item',
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: "25,000+", label: "Pakistani Households", desc: "Equipped with certified climate appliances" },
    { value: "65%", label: "Average Energy Saved", desc: "Via 30W BLDC fans & precision thermostats" },
    { value: "50+ Cities", label: "Nationwide Coverage", desc: "Zero-damage express delivery across Pakistan" }
  ];

  return (
    <div ref={containerRef} className="glass-apple-card rounded-3xl overflow-hidden mb-14 border border-[#E5E4E2] dark:border-white/10 shadow-xl py-10 sm:py-12 px-6 relative">
      {/* Core Ambient Aurora Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E6EDFD]/60 dark:bg-[#6F4E37]/[0.12] blur-3xl pointer-events-none -z-10" />

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto text-center items-center">
        {metrics.map((m, idx) => (
          <div key={idx} className="gsap-stat-item p-3">
            <strong className="block font-wix text-3xl sm:text-4xl font-black text-[#6F4E37] dark:text-[#E6EDFD] mb-1 font-mono">
              {m.value}
            </strong>
            <h3 className="text-sm font-wix font-bold text-slate-900 dark:text-white mb-0.5">
              {m.label}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 font-normal">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
