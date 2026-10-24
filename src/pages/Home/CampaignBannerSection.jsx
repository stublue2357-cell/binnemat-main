import React from 'react';
import { PhoneCall, ShieldCheck, Truck, Zap, Flame } from 'lucide-react';
import { APP_CONFIG } from '../../config/env';

export default function CampaignBannerSection() {
  const highlights = [
    {
      icon: <Flame size={20} className="text-amber-500" />,
      title: "Winter FastHeat Geysers",
      sub: "3-Second Steam & 50L Storage"
    },
    {
      icon: <Zap size={20} className="text-amber-500" />,
      title: "30W BLDC Inverter Fans",
      sub: "65% Power Saver & Silent Motor"
    },
    {
      icon: <Truck size={20} className="text-amber-500" />,
      title: "Express 50+ Cities Dispatch",
      sub: "Same-Day in Lahore & Twin Cities"
    },
    {
      icon: <ShieldCheck size={20} className="text-amber-500" />,
      title: "Official Brand Warranties",
      sub: "Stamped Manufacturer Cards"
    }
  ];

  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-14">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-bn-gold/30 bg-gradient-to-r from-bn-gold/10 via-white/80 to-bn-gold/10 dark:from-[#18181B] dark:via-[#1e1e24] dark:to-[#18181B] shadow-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {highlights.map((h, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-bn-gold/30 flex items-center justify-center flex-shrink-0">
                {h.icon}
              </div>
              <div>
                <strong className="block text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {h.title}
                </strong>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {h.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
