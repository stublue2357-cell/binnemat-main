import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';
import { ArrowUpRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CategoriesSection({ categories, onSelectCategory, onViewAllClick }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Refresh ScrollTrigger to ensure accurate trigger calculation
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-category-card', 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="max-w-[1360px] mx-auto px-[5%] my-10 sm:my-12 text-slate-900 dark:text-white">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1 font-bold flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#6F4E37] dark:text-[#C49774]" />
            <span>ARCHITECTURAL APPLIANCE DIRECTORY</span>
          </span>
          <h2 className="font-wix text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
            Explore All Categories
          </h2>
        </div>
        <button 
          onClick={onViewAllClick} 
          className="text-xs md:text-sm font-bold text-[#6F4E37] dark:text-[#E5E4E2] hover:text-[#8C6547] bg-transparent border-none cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          <span>View All Catalog</span>
          <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories && categories.map((cat) => {
          const fallbackImg = cat.slug === 'summer-collection' 
            ? '/images/superconscious_fan_hero.jpg' 
            : cat.slug === 'stoves-hobs' 
            ? '/images/superconscious_hob_hero.jpg' 
            : '/images/superconscious_heater_hero.jpg';

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.slug)}
              className="gsap-category-card glass-apple-card group rounded-3xl overflow-hidden border border-[#E5E4E2] dark:border-white/[0.1] hover:border-[#6F4E37]/50 bg-white/95 dark:bg-[#1A1715]/95 shadow-md hover:shadow-[0_15px_40px_rgba(111,78,55,0.12)] transition-all duration-500 cursor-pointer flex flex-col"
            >
              <div className="h-56 bg-[#141211] flex items-center justify-center overflow-hidden relative">
                {/* Backlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(111,78,55,0.08)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <img 
                  src={cat.image || fallbackImg} 
                  alt={cat.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImg;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <span className="absolute top-3 right-3 bg-[#E6EDFD]/90 dark:bg-[#1A1715]/90 text-[#6F4E37] dark:text-[#E6EDFD] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-[#E5E4E2] dark:border-white/10 shadow-xs">
                  {cat.count} Certified Models
                </span>
              </div>
              <div className="p-5 flex justify-between items-center mt-auto">
                <div>
                  <h3 className="text-sm sm:text-base font-wix font-bold text-slate-900 dark:text-white m-0 group-hover:text-[#6F4E37] dark:group-hover:text-[#C49774] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-[#6F4E37] dark:group-hover:text-[#C49774] inline-flex items-center gap-1 mt-1.5 transition-colors">
                    <span>Explore Collection</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
