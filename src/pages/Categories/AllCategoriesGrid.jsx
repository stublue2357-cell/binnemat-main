import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function AllCategoriesGrid({ categories, onSelectCategory }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-cat-header',
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
      gsap.fromTo('.gsap-cat-card',
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
  }, [categories]);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="gsap-cat-header text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1 flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-[#6F4E37] dark:text-[#C49774]" />
          <span>OFFICIAL PRODUCT DIRECTORY</span>
        </span>
        <h1 className="font-wix text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
          All Appliance Categories
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          Select a category below to explore certified, factory-sealed appliances with official manufacturer warranties and nationwide delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories && categories.map((cat) => {
          const fallbackImg = cat.slug === 'summer-collection' 
            ? '/images/superconscious_fan_hero.jpg' 
            : cat.slug === 'stoves-hobs' 
            ? '/images/superconscious_hob_hero.jpg' 
            : '/images/superconscious_heater_hero.jpg';

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="gsap-cat-card glass-apple-card group rounded-3xl overflow-hidden border border-[#E5E4E2] dark:border-white/[0.1] hover:border-[#6F4E37]/60 bg-white/95 dark:bg-[#1A1715]/95 shadow-md hover:shadow-[0_15px_40px_rgba(111,78,55,0.12)] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="h-60 bg-[#141211] flex items-center justify-center overflow-hidden relative">
                <img 
                  src={cat.image || fallbackImg} 
                  alt={cat.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImg;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <span className="absolute top-3 right-3 bg-[#E6EDFD]/90 dark:bg-[#1A1715]/90 text-[#6F4E37] dark:text-[#E6EDFD] text-[11px] font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md border border-[#E5E4E2] dark:border-white/10 shadow-xs">
                  {cat.count} Models
                </span>
              </div>
              <div className="p-5 flex justify-between items-center mt-auto">
                <div>
                  <h3 className="text-base font-wix font-bold text-slate-900 dark:text-white m-0 group-hover:text-[#6F4E37] dark:group-hover:text-[#C49774] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {cat.desc}
                  </p>
                  <span className="text-xs font-bold text-[#6F4E37] dark:text-[#E6EDFD] inline-flex items-center gap-1 mt-2">
                    <span>Explore Collection</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
