import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Breadcrumb } from 'antd';

export default function CategoryHeader({ 
  currentCategoryName, 
  categories, 
  selectedSlug, 
  onSelectCategory, 
  onNavigateHome 
}) {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selectedSlug]);

  return (
    <div ref={headerRef} className="mb-8">
      {/* BREADCRUMB */}
      <div className="mb-3">
        <Breadcrumb
          items={[
            { title: <span onClick={onNavigateHome} className="cursor-pointer hover:text-[#6F4E37]">Home</span> },
            { title: <span onClick={() => onSelectCategory('all')} className="cursor-pointer hover:text-[#6F4E37]">Categories</span> },
            { title: <span className="font-bold text-[#6F4E37] dark:text-[#C49774]">{currentCategoryName}</span> }
          ]}
        />
      </div>

      {/* TITLE & PILLS BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5E4E2] dark:border-white/10">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1">
            OFFICIAL COLLECTION &bull; 2026 EDITION
          </span>
          <h1 className="font-wix text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
            {currentCategoryName}
          </h1>
        </div>

        {/* CATEGORY SWITCHER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              selectedSlug === 'all'
                ? 'bg-[#6F4E37] text-white border-[#6F4E37] shadow-sm'
                : 'bg-white/90 dark:bg-[#1A1715] text-neutral-700 dark:text-neutral-300 border-[#E5E4E2] dark:border-white/10 hover:border-[#6F4E37]'
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
                  ? 'bg-[#6F4E37] text-white border-[#6F4E37] shadow-sm'
                  : 'bg-white/90 dark:bg-[#1A1715] text-neutral-700 dark:text-neutral-300 border-[#E5E4E2] dark:border-white/10 hover:border-[#6F4E37]'
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
