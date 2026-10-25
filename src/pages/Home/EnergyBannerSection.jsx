import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ArrowUpRight, ShieldCheck } from 'lucide-react';
import GsapCounter from '../../components/common/GsapCounter';

gsap.registerPlugin(ScrollTrigger);

export default function EnergyBannerSection({ onShopClick }) {
  const fanRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !fanRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous Fan Rotation on scroll
      gsap.to(fanRef.current, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        rotation: 360,
        ease: 'none'
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="max-w-[1360px] mx-auto px-[5%] my-8 sm:my-10 text-slate-900 dark:text-white">
      <div className="glass-apple-card rounded-3xl p-8 md:p-12 border border-emerald-500/20 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-50/50 via-white to-[#E6EDFD]/40 dark:from-emerald-950/20 dark:via-[#161311] dark:to-[#6F4E37]/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-[0_15px_45px_rgba(5,150,105,0.08)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Ambient Backlight */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-emerald-400/[0.12] dark:bg-emerald-500/[0.08] blur-3xl pointer-events-none -z-10" />

        {/* LEFT COLUMN: MARKETING BILL COMPARISON */}
        <div className="lg:col-span-7">
          <span className="text-[11px] font-mono tracking-widest text-emerald-700 dark:text-emerald-400 uppercase block mb-3 font-bold flex items-center gap-1.5">
            <Zap size={14} className="text-emerald-600 fill-emerald-600" />
            <span>12V SOLAR DIRECT &bull; 65% ELECTRICITY REDUCTION</span>
          </span>

          <h2 className="font-wix text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
            30W BLDC Inverter Fans. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-[#6F4E37] dark:from-emerald-400 dark:to-[#C49774]">
              Runs 3x Longer on UPS &amp; Solar.
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-xl font-normal">
            Slashing summer electric bills by 65%. Pure copper motor draws only <strong className="text-slate-900 dark:text-white font-bold">30 Watts</strong> with zero motor humming and whisper-silent high air displacement.
          </p>

          {/* VISUAL BILL COMPARISON TILE */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white dark:bg-[#1A1715] border border-[#E5E4E2] dark:border-white/[0.1] mb-8 max-w-lg text-xs shadow-sm">
            <div className="border-r border-[#E5E4E2] dark:border-white/10 pr-4">
              <span className="text-slate-500 block mb-1 font-medium">Old 85W AC Fan</span>
              <strong className="text-rose-600 text-base block font-wix font-bold">
                <GsapCounter endValue={3200} prefix="Rs. " suffix=" / Mo" />
              </strong>
              <span className="text-[10px] text-slate-400">Overheats, drains inverter battery</span>
            </div>
            <div className="pl-2">
              <span className="text-emerald-700 font-mono font-bold block mb-1">Binnemat 30W BLDC</span>
              <strong className="text-emerald-600 text-base block font-wix font-bold">
                <GsapCounter endValue={1100} prefix="Rs. " suffix=" / Mo" />
              </strong>
              <span className="text-[10px] text-emerald-600 font-bold">
                <GsapCounter endValue={25200} prefix="Save Rs. " suffix="+ yearly" />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={onShopClick}
              className="px-7 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white font-bold text-xs tracking-wide transition-all shadow-[0_4px_18px_rgba(5,150,105,0.25)] flex items-center gap-2 cursor-pointer border-none"
            >
              <span>Explore 30W BLDC Fans</span>
              <ArrowUpRight size={15} />
            </button>
            <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-mono font-semibold">
              <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>2 Years Full Motor Replacement</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL BLDC FAN SPATIAL VISUAL WITH SCROLL-DRIVEN FAN ROTATION */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm rounded-3xl overflow-hidden glass-apple-card border border-[#E5E4E2] dark:border-white/[0.1] bg-white dark:bg-[#161311] p-4 group relative shadow-md">
            <div className="h-64 sm:h-72 overflow-hidden rounded-2xl bg-[#0C0B0C] flex items-center justify-center relative p-3">
              <img 
                ref={fanRef}
                src="/images/superconscious_fan_hero.jpg" 
                alt="Binnemat Aeria 30W BLDC Inverter Ceiling Fan"
                className="w-full h-full object-contain will-change-transform filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
            <div className="pt-3 px-1 flex justify-between items-center text-xs">
              <div>
                <strong className="block text-sm text-slate-900 dark:text-white font-wix font-bold">Aeria 30W BLDC</strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Whisper Quiet &bull; RF Remote Included</span>
              </div>
              <strong className="text-base text-emerald-600 dark:text-emerald-400 font-wix font-extrabold">
                Rs. 14,800
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
