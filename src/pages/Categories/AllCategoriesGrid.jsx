import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function AllCategoriesGrid({ categories, onSelectCategory }) {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1 flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-amber-500" />
          <span>OFFICIAL PRODUCT DIRECTORY</span>
        </span>
        <h1 className="font-cinzel text-3xl md:text-4xl font-black text-neutral-900 dark:text-neutral-100 m-0">
          All Appliance Categories
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          Select a category below to explore certified, factory-sealed appliances with official manufacturer warranties and nationwide delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories && categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className="glass-panel luxury-card group rounded-3xl overflow-hidden border-2 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold/60 dark:hover:border-bn-gold/60 bg-white/80 dark:bg-[#18181B]/80 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="h-56 bg-neutral-900 flex items-center justify-center overflow-hidden relative">
              <img 
                src={cat.image || SAFE_SVG_PLACEHOLDER} 
                alt={cat.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <span className="absolute top-3 right-3 bg-neutral-950/85 text-bn-goldLight text-xs font-black px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                {cat.count} Models
              </span>
            </div>
            <div className="p-5 flex justify-between items-center mt-auto">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 m-0 group-hover:text-bn-gold transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                  {cat.desc}
                </p>
                <span className="text-xs font-bold text-bn-goldDark dark:text-bn-goldLight inline-flex items-center gap-1 mt-2">
                  <span>Explore Collection</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
