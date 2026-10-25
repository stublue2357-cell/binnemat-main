import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactBtuGuide() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const sizingData = [
    { 
      appliance: "Instant Electric Geyser (3kW - 9kW)", 
      usage: "Kitchen Sink / Single Guest Bathroom", 
      recommendation: "Continuous 3-second instant hot water; requires dedicated 20A wiring." 
    },
    { 
      appliance: "35 Liters Sapphire Enamel Storage Geyser", 
      usage: "Standard Family Bathroom (3 to 5 Persons)", 
      recommendation: "2000W Italian Incoloy 840 element; retains heat for 24+ hours." 
    },
    { 
      appliance: "50 Liters Heavy Duty Storage Geyser", 
      usage: "Multiple Bathrooms / Joint Family (6 to 8 Persons)", 
      recommendation: "Extra-thick German PUF insulation prevents heat leakage in freezing weather." 
    },
    { 
      appliance: "Dual Hybrid Gas & Electric Geyser (30L-50L)", 
      usage: "Areas with Sui Gas Winter Load-Shedding", 
      recommendation: "Automatic electric backup thermostat turns on when gas pressure drops." 
    },
    { 
      appliance: "56-Inch AeroGold 30W BLDC Ceiling Fan", 
      usage: "Master Bedrooms & Living Rooms (120 - 250 sq.ft)", 
      recommendation: "65% less electricity than standard 85W AC fans; runs 3x longer on UPS/Solar." 
    },
    { 
      appliance: "8mm Tempered Glass Built-in Hob (3-4 Burner)", 
      usage: "Modern Kitchen Countertop / Sui Gas & LPG", 
      recommendation: "Heavy cast iron wok pan trivets with automatic flame-failure safety valves." 
    }
  ];

  return (
    <div ref={containerRef} className="glass-apple-card p-5 sm:p-10 rounded-3xl border border-[#E5E4E2] dark:border-white/10 my-10 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10 text-[#6F4E37] dark:text-[#E6EDFD] flex items-center justify-center shadow-sm shrink-0">
          <Calculator size={18} />
        </div>
        <div>
          <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block">
            PRE-PURCHASE ESTIMATOR
          </span>
          <h2 className="font-wix text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
            Geyser Capacity &amp; Appliance Sizing Guide
          </h2>
        </div>
      </div>

      <span className="sm:hidden text-[11px] text-[#6F4E37] dark:text-[#C49774] font-mono font-semibold block mb-2">
        ← Swipe horizontally to view full table details →
      </span>

      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <table className="w-full min-w-[580px] text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#E5E4E2] dark:border-white/10 text-slate-500 dark:text-slate-400">
              <th className="py-3 px-3 font-bold text-slate-900 dark:text-white font-wix">Appliance Category</th>
              <th className="py-3 px-3 font-bold font-wix">Ideal Household / Room Type</th>
              <th className="py-3 px-3 font-bold text-[#6F4E37] dark:text-[#C49774] font-wix">Technical Specification Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E2] dark:divide-white/5">
            {sizingData.map((s, idx) => (
              <tr key={idx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white font-wix">{s.appliance}</td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">{s.usage}</td>
                <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400 text-xs">{s.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
        * <strong>Hard Water Advisory:</strong> For areas in Lahore, Rawalpindi, and Karachi with bore water TDS above 300 PPM, we strongly recommend Sapphire Enamel Storage Geysers equipped with magnesium sacrificial anode rods.
      </p>
    </div>
  );
}
