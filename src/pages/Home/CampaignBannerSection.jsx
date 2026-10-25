import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Truck, Zap, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CampaignBannerSection() {
  const containerRef = useRef(null);

  const highlights = [
    {
      icon: <Flame size={18} className="text-[#6F4E37] dark:text-[#E5E4E2]" />,
      title: "FastHeat™ Geysers",
      sub: "3s Flow & 50L Enamel Storage",
      color: "bg-[#E6EDFD]"
    },
    {
      icon: <Zap size={18} className="text-emerald-600 dark:text-emerald-400" />,
      title: "30W BLDC Inverters",
      sub: "65% Power Cut & Solar Direct",
      color: "bg-emerald-50"
    },
    {
      icon: <Truck size={18} className="text-[#6F4E37] dark:text-[#E5E4E2]" />,
      title: "50+ Cities Express",
      sub: "Doorstep Delivery Pakistan",
      color: "bg-[#E6EDFD]"
    },
    {
      icon: <ShieldCheck size={18} className="text-[#8C6547] dark:text-[#C49774]" />,
      title: "Factory Guaranteed",
      sub: "100% Brand Sealed Original",
      color: "bg-[#6F4E37]/10"
    }
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-campaign-item', {
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="max-w-[1360px] mx-auto px-[5%] my-8">
      <div className="glass-apple-card p-5 sm:p-7 rounded-3xl border border-[#E5E4E2] dark:border-white/[0.1] bg-white/95 dark:bg-[#161311]/90 shadow-[0_10px_35px_rgba(111,78,55,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          {highlights.map((h, idx) => (
            <div key={idx} className="gsap-campaign-item flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-2xl ${h.color} dark:bg-white/[0.08] border border-black/[0.04] dark:border-white/10 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                {h.icon}
              </div>
              <div>
                <strong className="block text-xs sm:text-sm font-wix font-bold text-slate-900 dark:text-white">
                  {h.title}
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
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
