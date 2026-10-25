import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APP_CONFIG } from '../../config/env';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-story-intro',
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
      gsap.fromTo('.gsap-story-card',
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const showcase = [
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bathroom-install.jpg',
      tag: 'WINTER SANCTUARY',
      title: 'Instant Warmth & 24h Heat Retention',
      desc: 'Sapphire enamel tanks and Italian Incoloy 840 heating elements keep water piping hot even through peak winter gas shutdowns.'
    },
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/kitchen-install.jpg',
      tag: 'CULINARY MASTERY',
      title: '8mm Tempered Glass & Brass Flame',
      desc: 'Shatterproof thermal glass with heavy cast iron pan trivets, designed for heavy karahi cooking and high-pressure LPG or Sui gas.'
    }
  ];

  return (
    <div ref={containerRef} className="mb-14 space-y-8">
      {/* MINIMAL INTRO WITH GOLD URDU SLOGAN */}
      <div className="gsap-story-intro glass-apple-card flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#161311]/90 border border-[#E5E4E2] dark:border-white/10 shadow-sm">
        <div className="max-w-xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1">
            THE PHILOSOPHY
          </span>
          <h2 className="font-wix text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0 mb-2">
            Appliances Built for the Real Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 m-0 leading-relaxed font-normal">
            We reject fragile appliances. Every Binnemat unit is engineered to endure hard bore water, wide-voltage fluctuations, and gas load-shedding.
          </p>
        </div>

        <div className="text-center px-6 py-4 rounded-2xl bg-[#E6EDFD]/70 dark:bg-[#1A1715] border border-[#E5E4E2] dark:border-white/10 shadow-xs shrink-0">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6EDFD] block">
            OUR PROMISE
          </span>
          <div className="font-urdu text-3xl sm:text-4xl text-[#6F4E37] dark:text-[#C49774] my-1 font-bold">
            {APP_CONFIG.SLOGAN_URDU}
          </div>
          <span className="text-[11px] text-neutral-500">Peace, Quiet &amp; Reliability</span>
        </div>
      </div>

      {/* 2 LARGE REALISTIC INSTALLATION PHOTO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showcase.map((item, idx) => (
          <div
            key={idx}
            className="gsap-story-card glass-apple-card group rounded-3xl overflow-hidden border border-[#E5E4E2] dark:border-white/10 bg-white/95 dark:bg-[#161311]/95 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-neutral-900">
              <img
                src={item.img}
                alt={item.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md text-bn-goldLight text-[11px] font-black px-3 py-1 rounded-full border border-white/10 tracking-wider">
                {item.tag}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-wix text-lg font-bold text-slate-900 dark:text-white m-0 mb-2 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6EDFD] transition-colors tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
