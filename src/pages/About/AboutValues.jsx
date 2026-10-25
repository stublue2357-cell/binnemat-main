import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Zap, Truck, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutValues() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-val-card',
        { y: 15, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: <ShieldCheck size={20} className="text-[#6F4E37] dark:text-[#C49774]" />,
      title: "100% Factory Sealed",
      desc: "Authentic manufacturer warranty card stamped on dispatch."
    },
    {
      icon: <Zap size={20} className="text-[#6F4E37] dark:text-[#C49774]" />,
      title: "Wide-Voltage Safe",
      desc: "Built to operate stably between 140V-260V without external stabilizers."
    },
    {
      icon: <Truck size={20} className="text-[#6F4E37] dark:text-[#C49774]" />,
      title: "Zero-Breakage Delivery",
      desc: "Reinforced polystyrene shock crating for safe 50+ city shipping."
    },
    {
      icon: <Headphones size={20} className="text-[#6F4E37] dark:text-[#C49774]" />,
      title: "Direct WhatsApp Line",
      desc: "Instant guidance on sizing, installation, and after-sales support."
    }
  ];

  return (
    <div ref={containerRef} className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p, idx) => (
          <div 
            key={idx}
            className="gsap-val-card glass-apple-card p-5 rounded-2xl border border-[#E5E4E2] dark:border-white/10 bg-white/95 dark:bg-[#161311]/95 shadow-xs flex items-start gap-3.5"
          >
            <div className="w-9 h-9 rounded-xl bg-[#E6EDFD] dark:bg-[#6F4E37]/20 flex items-center justify-center shrink-0">
              {p.icon}
            </div>
            <div>
              <h4 className="font-wix text-sm font-bold text-neutral-900 dark:text-neutral-100 m-0 mb-0.5">
                {p.title}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed font-normal">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
