import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FaqAccordion from './FaqAccordion';
import FaqTroubleshooting from './FaqTroubleshooting';
import FaqCta from './FaqCta';

export default function FaqsPage() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-4 sm:py-6 relative z-10">
      <div ref={headerRef} className="text-center max-w-xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10 text-[11px] font-extrabold tracking-widest uppercase text-[#6F4E37] dark:text-[#E6EDFD] mb-3">
          CLARITY &amp; CONFIDENCE
        </span>
        <h1 className="font-wix text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
          Knowledge Base &amp; Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
          Comprehensive answers on official warranty claims, nationwide freight safety, and technical climate diagnostics.
        </p>
      </div>

      <FaqAccordion />
      <FaqTroubleshooting />
      <FaqCta />
    </div>
  );
}
