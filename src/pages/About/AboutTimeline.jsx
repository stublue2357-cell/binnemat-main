import React from 'react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function AboutTimeline() {
  const points = [
    {
      title: "Italian Precision Brass Burners",
      desc: "Pure blue flame combustion with zero carbon soot, certified for both Sui gas and LPG."
    },
    {
      title: "Double-Layer Incoloy 840 Elements",
      desc: "Immune to calcium crusting and scale buildup common in Pakistani bore water."
    },
    {
      title: "100% Pure Copper BLDC Cores",
      desc: "Whisper-quiet brushless motors delivering high airflow at only 30 Watts."
    }
  ];

  return (
    <div className="rounded-3xl overflow-hidden border border-bn-borderLight dark:border-neutral-800 bg-white dark:bg-[#18181B] mb-14 shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        {/* LEFT COLUMN: HIGH-RES MACRO CRAFTSMANSHIP PHOTO */}
        <div className="lg:col-span-6 h-72 sm:h-96 w-full relative bg-neutral-900 overflow-hidden">
          <img
            src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/craftsmanship.jpg"
            alt="Precision Craftsmanship"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bn-gold/30 border border-bn-gold/50 text-bn-goldLight text-[10px] font-black uppercase tracking-widest backdrop-blur-md mb-1 text-white">
              <Award size={12} className="text-amber-400" />
              <span>FACTORY DIRECT STANDARDS</span>
            </span>
            <h3 className="font-cinzel text-xl font-bold text-white m-0 drop-shadow">
              Zero Compromise on Raw Materials
            </h3>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 SHARP PUNCHY BULLETS */}
        <div className="lg:col-span-6 p-8 sm:p-10 space-y-6">
          <div>
            <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
              THE BINNEMAT BENCHMARK
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 m-0">
              Meticulous Craftsmanship
            </h2>
          </div>

          <div className="space-y-4">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-goldLight flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 m-0 mb-0.5">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed font-light">
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
