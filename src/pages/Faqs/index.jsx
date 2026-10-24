import React from 'react';
import FaqAccordion from './FaqAccordion';
import FaqTroubleshooting from './FaqTroubleshooting';
import FaqCta from './FaqCta';

export default function FaqsPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-12 relative z-10">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-2">
          CLARITY & CONFIDENCE
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
          Knowledge Base & Support
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          Comprehensive answers on official warranty claims, nationwide freight safety, and technical climate diagnostics.
        </p>
      </div>

      <FaqAccordion />
      <FaqTroubleshooting />
      <FaqCta />
    </div>
  );
}
