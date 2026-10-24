import React from 'react';
import { ShieldCheck, Flame, Zap, Wind, Award, Truck } from 'lucide-react';

export default function BrandLogosSection() {
  const certifications = [
    { icon: <Flame size={18} className="text-amber-500" />, label: "Italian Incoloy 840", sub: "Anti-Corrosion" },
    { icon: <ShieldCheck size={18} className="text-amber-500" />, label: "8mm Thermal Glass", sub: "Shatter-Resistant" },
    { icon: <Wind size={18} className="text-amber-500" />, label: "30W Sine BLDC", sub: "65% Power Saving" },
    { icon: <Award size={18} className="text-amber-500" />, label: "5-Year Tank Guarantee", sub: "Factory Stamped" },
    { icon: <Zap size={18} className="text-amber-500" />, label: "140V-260V Wide Range", sub: "Surge Protected" },
    { icon: <Truck size={18} className="text-amber-500" />, label: "50+ Cities Delivery", sub: "Zero-Breakage" }
  ];

  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-16">
      <div className="text-center mb-6">
        <span className="text-[11px] font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block">
          FACTORY DIRECT BENCHMARKS &bull; ZERO COMPROMISE
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {certifications.map((c, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-2xl border border-bn-borderLight dark:border-neutral-800 bg-white/70 dark:bg-[#18181B]/80 text-center flex flex-col items-center justify-center shadow-sm hover:border-bn-gold/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-bn-gold/15 flex items-center justify-center mb-2">
              {c.icon}
            </div>
            <strong className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">
              {c.label}
            </strong>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-light block">
              {c.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
