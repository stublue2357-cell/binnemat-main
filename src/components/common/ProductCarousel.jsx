import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductCarousel({ eyebrow, title, products, onSelectProduct }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Staggered scroll entrance for carousel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-carousel-header', {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        },
        y: 15,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'all'
      });

      gsap.from('.gsap-carousel-card', {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }, el);

    return () => ctx.revert();
  }, [products]);

  // Track horizontal scroll progress
  const handleScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      }
    }
  };

  const scroll = (direction) => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector('.carousel-item');
      const cardWidth = card ? card.offsetWidth + 20 : 280;
      trackRef.current.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} className="my-8 sm:my-10">
      {/* HEADER WITH CONTROLS */}
      <div className="gsap-carousel-header flex items-end justify-between mb-6 gap-4">
        <div>
          {eyebrow && (
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1 font-bold">
              {eyebrow}
            </span>
          )}
          <h2 className="font-wix text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight m-0">
            {title}
          </h2>
        </div>

        {/* NAVIGATION ARROWS & PROGRESS */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-24 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous Products"
              className="w-9 h-9 rounded-full border border-[#E5E4E2] dark:border-white/10 bg-white dark:bg-[#161522] text-slate-800 dark:text-slate-200 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-[#1E1D2D] hover:border-[#6F4E37] hover:text-[#6F4E37] dark:hover:border-[#C49774] dark:hover:text-[#C49774] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next Products"
              className="w-9 h-9 rounded-full border border-[#E5E4E2] dark:border-white/10 bg-white dark:bg-[#161522] text-slate-800 dark:text-slate-200 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-[#1E1D2D] hover:border-[#6F4E37] hover:text-[#6F4E37] dark:hover:border-[#C49774] dark:hover:text-[#C49774] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* TRACK (5 CARDS ON DESKTOP) */}
      <div 
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
      >
        {products && products.map((item, idx) => (
          <div 
            key={item.id || idx} 
            className="carousel-item gsap-carousel-card flex-none w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] min-w-[210px] snap-start"
          >
            <ProductCard product={item} onSelectProduct={onSelectProduct} />
          </div>
        ))}
      </div>
    </div>
  );
}
