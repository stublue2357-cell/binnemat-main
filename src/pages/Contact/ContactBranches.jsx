import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Truck, ShieldCheck, Clock } from 'lucide-react';
import { useSiteBranding } from '../../context/SiteBrandingContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactBranches() {
  const { storeAddress, supportPhone } = useSiteBranding();
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-branch-card',
        { y: 15, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

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
    <div ref={containerRef} className="glass-apple-card p-8 sm:p-10 rounded-3xl border border-[#E5E4E2] dark:border-white/10 my-8 shadow-sm relative overflow-hidden">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1">
          OFFICIAL STORE &amp; DISPATCH HUB
        </span>
        <h2 className="font-wix text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
          Central Headquarters &amp; Nationwide Fulfillment
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 m-0">
          All genuine Binnemat appliances are stocked, tested, and dispatched directly from our flagship center in Gujranwala.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fulfillmentPillars.map((item, idx) => (
          <div key={idx} className="gsap-branch-card p-5 rounded-2xl glass-apple-card border border-[#E5E4E2] dark:border-white/10 text-xs space-y-2 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10 flex items-center justify-center text-[#6F4E37] dark:text-[#E6EDFD]">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-[#6F4E37] dark:text-[#E6EDFD] uppercase px-2 py-0.5 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10">
                  {item.badge}
                </span>
              </div>
              <strong className="block text-sm font-wix font-bold text-slate-900 dark:text-white mb-1">
                {item.title}
              </strong>
              <p className="text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
