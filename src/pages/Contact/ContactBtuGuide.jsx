import React from 'react';
import { Calculator } from 'lucide-react';

export default function ContactBtuGuide() {
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
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 my-10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
          <Calculator size={20} />
        </div>
        <div>
          <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block">
            PRE-PURCHASE ESTIMATOR
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
            Geyser Capacity & Appliance Sizing Guide
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
              <th className="py-3 px-2 font-bold text-neutral-900 dark:text-neutral-100">Appliance Category</th>
              <th className="py-3 px-2 font-bold">Ideal Household / Room Type</th>
              <th className="py-3 px-2 font-bold text-bn-goldDark dark:text-bn-goldLight">Technical Specification Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {sizingData.map((s, idx) => (
              <tr key={idx} className="hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50">
                <td className="py-3.5 px-2 font-semibold text-neutral-900 dark:text-neutral-100">{s.appliance}</td>
                <td className="py-3.5 px-2 text-neutral-600 dark:text-neutral-300">{s.usage}</td>
                <td className="py-3.5 px-2 text-neutral-500 dark:text-neutral-400 text-xs">{s.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
        * <strong>Hard Water Advisory:</strong> For areas in Lahore, Rawalpindi, and Karachi with bore water TDS above 300 PPM, we strongly recommend Sapphire Enamel Storage Geysers equipped with magnesium sacrificial anode rods.
      </p>
    </div>
  );
}
