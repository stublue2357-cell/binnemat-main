import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductSpecsTable({ specs }) {
  const tableRef = useRef(null);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 15, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, [specs]);

  const defaultSpecs = {
    "Heating Element / Motor": "Italian Incoloy 840 / Pure Copper 30W BLDC Motor",
    "Material & Finish": "Heavy Sapphire Enamel Tank / 8mm Tempered Glass",
    "Voltage Operating Range": "140V - 260V Voltage Stabilized",
    "Thermal Retention / Efficiency": "Over 24 Hours High Density PUF Insulation",
    "Safety Standards": "Dual Safety Thermal Cutout & ELCB Earth Leakage",
    "Official Factory Warranty": "Official Brand Warranty Stamped on Delivery"
  };

  const finalSpecs = specs && Object.keys(specs).length > 0 ? specs : defaultSpecs;

  return (
    <div ref={tableRef} className="glass-apple-card p-6 sm:p-10 rounded-3xl border border-[#E5E4E2] dark:border-white/10 bg-white/95 dark:bg-[#1A1715]/95 my-10 shadow-sm">
      <div className="mb-6">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1">
          PRECISION ENGINEERING
        </span>
        <h2 className="font-wix text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
          Technical Specifications
        </h2>
      </div>

      <div className="divide-y divide-[#E5E4E2] dark:divide-white/10 text-sm">
        {Object.entries(finalSpecs).map(([key, value], idx) => (
          <div key={idx} className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {key}
            </span>
            <span className="sm:col-span-2 text-neutral-600 dark:text-neutral-400">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
