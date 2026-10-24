import React from 'react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoriesSection({ categories, onSelectCategory, onViewAllClick }) {
  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1 flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-500" />
            <span>CERTIFIED DIRECT FACTORY CATALOG</span>
          </span>
          <h2 className="font-cinzel text-2xl md:text-3xl font-black text-neutral-900 dark:text-neutral-100 m-0">
            Shop By Appliance Category
          </h2>
        </div>
        <button 
          onClick={onViewAllClick} 
          className="text-xs md:text-sm font-bold text-bn-goldDark dark:text-bn-goldLight hover:underline bg-transparent border-none cursor-pointer inline-flex items-center gap-1"
        >
          <span>View All Categories</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories && categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat.slug)}
            className="glass-panel luxury-card group rounded-3xl overflow-hidden border-2 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold/60 dark:hover:border-bn-gold/60 bg-white/80 dark:bg-[#18181B]/85 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="h-52 bg-neutral-900 flex items-center justify-center overflow-hidden relative">
              <img 
                src={cat.image || SAFE_SVG_PLACEHOLDER} 
                alt={cat.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <span className="absolute top-3 right-3 bg-neutral-950/85 text-bn-goldLight text-[11px] font-black px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                {cat.count} Certified Models
              </span>
            </div>
            <div className="p-5 flex justify-between items-center mt-auto">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 m-0 group-hover:text-bn-gold transition-colors leading-snug">
                  {cat.name}
                </h3>
                <span className="text-xs font-semibold text-bn-goldDark dark:text-bn-goldLight inline-flex items-center gap-1 mt-1">
                  <span>Explore Collection</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
