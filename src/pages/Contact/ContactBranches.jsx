import React from 'react';
import { MapPin, Truck, ShieldCheck, Clock } from 'lucide-react';
import { useSiteBranding } from '../../context/SiteBrandingContext';

export default function ContactBranches() {
  const { storeAddress, supportPhone } = useSiteBranding();

  const fulfillmentPillars = [
    {
      title: "Direct Factory Showroom",
      desc: storeAddress,
      icon: <MapPin size={18} className="text-bn-gold" />,
      badge: "Sole Official Location"
    },
    {
      title: "Nationwide Insured Delivery",
      desc: "Fast courier delivery across Lahore, Karachi, Islamabad, Faisalabad, Rawalpindi & 150+ cities.",
      icon: <Truck size={18} className="text-bn-gold" />,
      badge: "24h - 48h Transit"
    },
    {
      title: "Factory Stamped Warranty",
      desc: "Every geyser, hob & fan is dispatched with official warranty registration card & quality inspection stamp.",
      icon: <ShieldCheck size={18} className="text-bn-gold" />,
      badge: "100% Genuine"
    },
    {
      title: "Direct Support Hotline",
      desc: `Specialist assistance available Mon-Sat (10AM - 9PM) at ${supportPhone}.`,
      icon: <Clock size={18} className="text-bn-gold" />,
      badge: "Instant Response"
    }
  ];

  return (
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 my-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
          OFFICIAL STORE & DISPATCH HUB
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
          Central Headquarters & Nationwide Fulfillment
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 m-0">
          All genuine Binnemat appliances are stocked, tested, and dispatched directly from our flagship center in Gujranwala.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {fulfillmentPillars.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-bn-borderLight dark:border-bn-borderDark text-xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-bn-gold/15 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-bn-goldDark dark:text-bn-gold uppercase px-2 py-0.5 rounded-full bg-bn-gold/10">
                  {item.badge}
                </span>
              </div>
              <strong className="block text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {item.title}
              </strong>
              <p className="text-neutral-600 dark:text-neutral-400 m-0 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
