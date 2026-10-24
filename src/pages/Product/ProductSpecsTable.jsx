import React from 'react';

export default function ProductSpecsTable({ specs }) {
  const defaultSpecs = {
    "Heating Element / Motor": "Italian Incoloy 840 / Pure Copper 30W BLDC Motor",
    "Material & Finish": "Heavy Sapphire Enamel Tank / 8mm Tempered Glass",
    "Voltage Operating Range": "140V - 260V Voltage Stabilized",
    "Thermal Retention / Efficiency": "Over 24 Hours High Density PUF Insulation",
    "Safety Standards": "Dual Safety Thermal Cutout & ELCB Earth Leakage",
    "Official Factory Warranty": "Official Brand Warranty Stamped on Delivery"
  };

  const finalSpecs = specs && Object.keys(specs).length > 0 ? specs : defaultSpecs;

  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 my-12 shadow-sm">
      <div className="mb-6">
        <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
          PRECISION ENGINEERING
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
          Technical Specifications
        </h2>
      </div>

      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
        {Object.entries(finalSpecs).map(([key, value], idx) => (
          <div key={idx} className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {key}
            </span>
            <span className="sm:col-span-2 text-neutral-600 dark:text-neutral-400">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
