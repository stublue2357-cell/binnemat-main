import React from 'react';
import { ShieldCheck, Zap, Truck, Headphones } from 'lucide-react';

export default function AboutValues() {
  const pillars = [
    {
      icon: <ShieldCheck size={20} className="text-bn-gold" />,
      title: "100% Factory Sealed",
      desc: "Authentic manufacturer warranty card stamped on dispatch."
    },
    {
      icon: <Zap size={20} className="text-bn-gold" />,
      title: "Wide-Voltage Safe",
      desc: "Built to operate stably between 140V-260V without external stabilizers."
    },
    {
      icon: <Truck size={20} className="text-bn-gold" />,
      title: "Zero-Breakage Delivery",
      desc: "Reinforced polystyrene shock crating for safe 50+ city shipping."
    },
    {
      icon: <Headphones size={20} className="text-bn-gold" />,
      title: "Direct WhatsApp Line",
      desc: "Instant guidance on sizing, installation, and after-sales support."
    }
  ];

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl border border-bn-borderLight dark:border-neutral-800 bg-white/80 dark:bg-[#18181B] shadow-sm flex items-start gap-3.5"
          >
            <div className="w-9 h-9 rounded-xl bg-bn-gold/15 flex items-center justify-center shrink-0">
              {p.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 m-0 mb-0.5">
                {p.title}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed font-light">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
