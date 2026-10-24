import React from 'react';
import { Breadcrumb } from 'antd';

export default function CategoryHeader({ 
  currentCategoryName, 
  categories, 
  selectedSlug, 
  onSelectCategory, 
  onNavigateHome 
}) {
  return (
    <div className="mb-8">
      {/* BREADCRUMB */}
      <div className="mb-3">
        <Breadcrumb
          items={[
            { title: <span onClick={onNavigateHome} className="cursor-pointer hover:text-bn-gold">Home</span> },
            { title: <span onClick={() => onSelectCategory('all')} className="cursor-pointer hover:text-bn-gold">Categories</span> },
            { title: <span className="font-bold text-bn-goldDark dark:text-bn-goldLight">{currentCategoryName}</span> }
          ]}
        />
      </div>

      {/* TITLE & PILLS BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-bn-borderLight dark:border-bn-borderDark">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
            OFFICIAL COLLECTION &bull; 2026 EDITION
          </span>
          <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
            {currentCategoryName}
          </h1>
        </div>

        {/* CATEGORY SWITCHER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              selectedSlug === 'all'
                ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900'
                : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold'
            }`}
          >
            All
          </button>
          {categories && categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                selectedSlug === cat.slug
                  ? 'bg-bn-gold text-white border-bn-gold shadow-sm'
                  : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
