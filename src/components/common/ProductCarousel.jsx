import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCarousel({ eyebrow, title, products, onSelectProduct }) {
  const trackRef = useRef(null);

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
    <div className="mb-16">
      {/* HEADER WITH CONTROLS */}
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          {eyebrow && (
            <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
              {eyebrow}
            </span>
          )}
          <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
            {title}
          </h2>
        </div>

        {/* NAVIGATION ARROWS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous Products"
            className="w-10 h-10 rounded-full border border-bn-borderLight dark:border-bn-borderDark bg-white/90 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center hover:bg-bn-gold hover:text-white transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next Products"
            className="w-10 h-10 rounded-full border border-bn-borderLight dark:border-bn-borderDark bg-white/90 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center hover:bg-bn-gold hover:text-white transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* TRACK (5 CARDS ON DESKTOP) */}
      <div 
        ref={trackRef}
        className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
      >
        {products && products.map((item, idx) => (
          <div 
            key={item.id || idx} 
            className="carousel-item flex-none w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] min-w-[210px] snap-start"
          >
            <ProductCard product={item} onSelectProduct={onSelectProduct} />
          </div>
        ))}
      </div>
    </div>
  );
}
