import React from 'react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export default function DividerSection({ onExploreGeysers, onExploreHobs }) {
  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CARD 1: ELECTRIC GEYSERS WITH MARKETING PHOTOGRAPHY */}
        <div className="glass-panel luxury-card p-6 sm:p-8 rounded-3xl border-2 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold/50 bg-white/80 dark:bg-[#18181B]/85 shadow-lg flex flex-col justify-between group">
          <div>
            <div className="h-52 sm:h-60 rounded-2xl overflow-hidden bg-neutral-900 mb-5 relative shadow-inner">
              <img
                src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-storage.jpg"
                alt="Electric Geysers Collection"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-3 left-3 bg-neutral-950/85 text-bn-goldLight text-xs font-black px-3 py-1 rounded-full backdrop-blur-md border border-bn-gold/40 flex items-center gap-1.5">
                <Flame size={13} className="text-amber-400" />
                <span>WINTER MUST-HAVE</span>
              </span>
              <span className="absolute bottom-3 right-3 bg-neutral-950/85 text-white text-xs font-bold px-3 py-1 rounded-xl">
                Starting from Rs. 24,800
              </span>
            </div>

            <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
              CONTINUOUS 24-HOUR HOT WATER
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mb-2">
              Sapphire Enamel & Instant Geysers
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              Dual thermal cutouts, high-pressure 8-bar capacity, and German PUF insulation keep boiling water ready 24/7 without gas dependency.
            </p>
          </div>

          <button 
            onClick={onExploreGeysers} 
            className="inline-flex items-center gap-2 text-xs font-black text-bn-goldDark dark:text-bn-goldLight hover:underline bg-transparent border-none cursor-pointer p-0 text-left pt-2"
          >
            <span>Explore All Geyser Models</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* CARD 2: STOVES & HOBS WITH REAL BLUE FLAME PHOTOGRAPHY */}
        <div className="glass-panel luxury-card p-6 sm:p-8 rounded-3xl border-2 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold/50 bg-white/80 dark:bg-[#18181B]/85 shadow-lg flex flex-col justify-between group">
          <div>
            <div className="h-52 sm:h-60 rounded-2xl overflow-hidden bg-neutral-900 mb-5 relative shadow-inner">
              <img
                src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/glass-hob.jpg"
                alt="8mm Tempered Glass Built-in Hobs"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-3 left-3 bg-neutral-950/85 text-bn-goldLight text-xs font-black px-3 py-1 rounded-full backdrop-blur-md border border-bn-gold/40 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                <span>CULINARY LUXURY</span>
              </span>
              <span className="absolute bottom-3 right-3 bg-neutral-950/85 text-white text-xs font-bold px-3 py-1 rounded-xl">
                Starting from Rs. 26,800
              </span>
            </div>

            <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
              8MM TEMPERED GLASS & CAST IRON
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mb-2">
              Italian Flame Built-in Hobs
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              Shatterproof thermal shock glass, heavy cast iron wok pan trivets, and automatic flame-failure safety valves for worry-free gourmet cooking.
            </p>
          </div>

          <button 
            onClick={onExploreHobs} 
            className="inline-flex items-center gap-2 text-xs font-black text-bn-goldDark dark:text-bn-goldLight hover:underline bg-transparent border-none cursor-pointer p-0 text-left pt-2"
          >
            <span>Explore Stoves & Hobs</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
