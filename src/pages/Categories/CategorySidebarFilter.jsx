import React from 'react';

export default function CategorySidebarFilter({ 
  selectedCategorySlug, 
  activeSubCategory, 
  onSelectSubCategory,
  totalCount
}) {
  const subCategoryMap = {
    'winter-collection': [
      { id: 'all', label: 'All Winter Geysers' },
      { id: 'instant-geysers', label: 'Instant Fast-Recovery Geysers' },
      { id: 'storage-geysers', label: 'Heavy Storage Geysers (35L-50L)' },
      { id: 'hybrid-heaters', label: 'Hybrid Gas-Electric Heaters' }
    ],
    'summer-collection': [
      { id: 'all', label: 'All Summer Fans' },
      { id: 'bldc-ceiling-fans', label: '30W BLDC Inverter Ceiling Fans' },
      { id: 'exhaust-fans', label: 'Silent Extraction Exhaust Fans' },
      { id: 'pedestal-fans', label: 'Heavy Duty Pedestal Fans' }
    ],
    'stoves-hobs': [
      { id: 'all', label: 'All Cooking Stoves & Hobs' },
      { id: 'built-in-hobs', label: '8mm Tempered Glass Built-in Hobs' },
      { id: 'infrared-stoves', label: 'Double Induction & Infrared Cooktops' },
      { id: 'range-hoods', label: 'Auto Heat-Clean Range Hoods' }
    ]
  };

  const currentFilters = subCategoryMap[selectedCategorySlug] || [
    { id: 'all', label: 'All Appliances' }
  ];

  return (
    <aside className="glass-apple-card p-5 rounded-2xl border border-[#E5E4E2] dark:border-white/10 bg-white/95 dark:bg-[#1A1715]/95 shadow-sm space-y-6">
      <div>
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#E5E4E2] dark:border-white/10">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#6F4E37] dark:text-[#C49774]">
            FILTER BY SUB-CATEGORY
          </span>
          <span className="text-[11px] font-bold text-neutral-500">
            {totalCount} Models
          </span>
        </div>

        {/* LEFT TAB PILLS */}
        <div className="flex flex-col gap-1.5">
          {currentFilters.map((sub) => {
            const isSelected = activeSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubCategory(sub.id)}
                className={`text-left text-xs font-bold px-3 py-2.5 rounded-xl transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#6F4E37] text-white border-[#6F4E37] shadow-sm'
                    : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border-[#E5E4E2] dark:border-white/10 hover:border-[#6F4E37]'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* QUICK GUARANTEE BADGE */}
      <div className="p-3.5 rounded-xl bg-[#E6EDFD] dark:bg-[#6F4E37]/15 border border-[#E5E4E2] dark:border-[#6F4E37]/30 text-xs">
        <strong className="block text-[#6F4E37] dark:text-[#E6EDFD] font-bold mb-1">
          ✦ Official Factory Direct
        </strong>
        <p className="text-neutral-600 dark:text-neutral-400 m-0 leading-relaxed text-[11px]">
          All Geysers &amp; BLDC Fans include verified stamped company warranty cards.
        </p>
      </div>
    </aside>
  );
}
