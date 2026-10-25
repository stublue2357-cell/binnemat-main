import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-timeline-left',
        { x: -20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
      gsap.fromTo('.gsap-timeline-right',
        { x: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const points = [
    {
      title: "Italian Precision Brass Burners",
      desc: "Pure blue flame combustion with zero carbon soot, certified for both Sui gas and LPG."
    },
    {
      title: "Double-Layer Incoloy 840 Elements",
      desc: "Immune to calcium crusting and scale buildup common in Pakistani bore water."
    },
    {
      title: "100% Pure Copper BLDC Cores",
      desc: "Whisper-quiet brushless motors delivering high airflow at only 30 Watts."
    }
  ];

  return (
    <div ref={containerRef} className="glass-apple-card rounded-3xl overflow-hidden border border-[#E5E4E2] dark:border-white/10 bg-white/95 dark:bg-[#161311]/95 mb-14 shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        {/* LEFT COLUMN: HIGH-RES MACRO CRAFTSMANSHIP PHOTO */}
        <div className="gsap-timeline-left lg:col-span-6 h-72 sm:h-96 w-full relative bg-neutral-900 overflow-hidden">
          <img
            src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/craftsmanship.jpg"
            alt="Precision Craftsmanship"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EDFD]/25 border border-[#E5E4E2]/40 text-[#E6EDFD] text-[10px] font-mono font-bold uppercase tracking-widest backdrop-blur-md mb-1">
              <Award size={12} className="text-[#C49774]" />
              <span>FACTORY DIRECT STANDARDS</span>
            </span>
            <h3 className="font-wix text-xl font-bold text-white m-0 drop-shadow">
              Zero Compromise on Raw Materials
            </h3>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 SHARP PUNCHY BULLETS */}
        <div className="gsap-timeline-right lg:col-span-6 p-5 sm:p-10 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1">
              THE BINNEMAT BENCHMARK
            </span>
            <h2 className="font-wix text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
              Meticulous Craftsmanship
            </h2>
          </div>

          <div className="space-y-4">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#E6EDFD] dark:bg-[#6F4E37]/20 text-[#6F4E37] dark:text-[#E6EDFD] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 m-0 mb-0.5">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed font-light">
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
