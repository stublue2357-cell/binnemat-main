import React from 'react';
import { ShieldCheck, Flame, Zap, Wind, Award, Truck } from 'lucide-react';

export default function BrandLogosSection() {
  const certifications = [
    { icon: <Flame size={17} className="text-[#6F4E37] dark:text-[#C49774]" />, label: "Italian Incoloy 840", sub: "Anti-Corrosion", color: "bg-[#E6EDFD] dark:bg-[#6F4E37]/20" },
    { icon: <ShieldCheck size={17} className="text-[#6F4E37] dark:text-[#C49774]" />, label: "8mm Thermal Glass", sub: "Shatter-Resistant", color: "bg-[#E6EDFD] dark:bg-[#6F4E37]/20" },
    { icon: <Wind size={17} className="text-emerald-600 dark:text-emerald-400" />, label: "30W Sine BLDC", sub: "65% Power Saving", color: "bg-emerald-50 dark:bg-emerald-950/40" },
    { icon: <Award size={17} className="text-amber-600 dark:text-amber-400" />, label: "5-Year Guarantee", sub: "Factory Stamped", color: "bg-amber-50 dark:bg-amber-950/40" },
    { icon: <Zap size={17} className="text-[#6F4E37] dark:text-[#C49774]" />, label: "Wide Volt Range", sub: "Surge Protected", color: "bg-[#E6EDFD] dark:bg-[#6F4E37]/20" },
    { icon: <Truck size={17} className="text-emerald-600 dark:text-emerald-400" />, label: "50+ Cities", sub: "Doorstep Express", color: "bg-emerald-50 dark:bg-emerald-950/40" }
  ];

  return (
    <section className="max-w-[1360px] mx-auto px-[5%] my-8 sm:my-10 text-slate-900 dark:text-white">
      <div className="text-center mb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block font-bold">
          FACTORY DIRECT BENCHMARKS &bull; ZERO COMPROMISE
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {certifications.map((c, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-2xl border border-[#E5E4E2] dark:border-white/[0.08] bg-white/90 dark:bg-[#1A1715]/90 text-center flex flex-col items-center justify-center shadow-xs hover:border-[#6F4E37]/50 hover:shadow-md transition-all"
          >
            <div className={`w-8 h-8 rounded-full ${c.color} dark:bg-white/[0.08] flex items-center justify-center mb-2`}>
              {c.icon}
            </div>
            <strong className="text-xs font-bold text-slate-900 dark:text-white block font-wix">
              {c.label}
            </strong>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
              {c.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
