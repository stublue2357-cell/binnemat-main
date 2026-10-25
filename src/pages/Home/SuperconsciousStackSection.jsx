import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Zap, Flame, Shield, Sparkles, Thermometer, Wind } from 'lucide-react';
import GsapCounter from '../../components/common/GsapCounter';

gsap.registerPlugin(ScrollTrigger);

export default function SuperconsciousStackSection({ onExploreGeysers, onExploreFans, onExploreHobs }) {
  const sectionRef = useRef(null);
  const fanImgRef = useRef(null);
  const geyserImgRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const tempGaugeRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Staggered card entrance on scroll
      gsap.from('.gsap-stack-card', {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'all'
      });

      // 2. Continuous Scroll-driven Fan Rotation (scrubbed to scroll position)
      if (fanImgRef.current) {
        gsap.to(fanImgRef.current, {
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          },
          rotation: 360,
          ease: 'none'
        });
      }

      // 3. Geyser Spatial Floating on Scroll
      if (geyserImgRef.current) {
        gsap.to(geyserImgRef.current, {
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          },
          y: -25,
          ease: 'none'
        });
      }

      // 4. Parallax Floating Badges on Scroll
      if (badge1Ref.current) {
        gsap.to(badge1Ref.current, {
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8
          },
          y: -18,
          ease: 'none'
        });
      }

      if (badge2Ref.current) {
        gsap.to(badge2Ref.current, {
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8
          },
          y: -18,
          ease: 'none'
        });
      }

      // 5. Dynamic Temperature Progress Gauge on scroll
      if (tempGaugeRef.current) {
        gsap.to(tempGaugeRef.current, {
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'center 45%',
            scrub: true
          },
          width: '100%',
          ease: 'power2.out'
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-6xl mx-auto text-slate-900">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6EDFD] border border-[#E5E4E2] text-xs font-mono text-[#6F4E37] mb-3 font-bold shadow-xs">
          <Sparkles size={13} className="text-[#6F4E37]" />
          <span>Dual Climate Flagships</span>
        </div>
        <h2 className="font-wix font-black text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
          Two Extreme Climates. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] via-[#8C6547] to-[#C49774]">
            One Engineering Standard.
          </span>
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mt-4 font-normal">
          Designed specifically for Pakistani weather extremes — from sub-zero Northern winters to scorching 48°C summer heatwaves.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CARD 1: WINTER THERMAL SANCTUARY */}
        <div 
          className="gsap-stack-card glass-apple-card group rounded-3xl p-6 sm:p-8 border border-[#E5E4E2] bg-white/95 hover:border-[#6F4E37]/50 transition-all duration-500 ease-out relative overflow-hidden flex flex-col justify-between min-h-[520px] shadow-[0_10px_35px_rgba(111,78,55,0.06)] hover:shadow-[0_20px_50px_rgba(111,78,55,0.14)]"
        >
          {/* Subtle Ambient Mocha Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#E6EDFD]/70 blur-3xl pointer-events-none -z-10 group-hover:bg-[#6F4E37]/[0.1] transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6EDFD] border border-[#E5E4E2] text-[11px] font-mono text-[#6F4E37] font-bold">
                <Flame size={12} className="text-[#6F4E37]" />
                <span>Winter Thermal Sanctuary</span>
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">01 / WINTER</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-wix font-extrabold text-slate-900 mb-2 tracking-tight">
              Instant &amp; Storage Geysers
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md font-normal mb-4">
              Continuous 55°C boiling showers regardless of Sui gas pressure drops. Incoloy 840 hard-water heating element with high-pressure 8-Bar rating.
            </p>

            {/* LIVE TEMPERATURE HEAT GAUGE (ANIMATES ON SCROLL) */}
            <div className="p-3.5 rounded-2xl bg-[#F7F6F4] border border-[#E5E4E2] mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-slate-600 font-semibold flex items-center gap-1.5">
                  <Thermometer size={14} className="text-[#6F4E37]" />
                  <span>Max Water Temperature</span>
                </span>
                <span className="font-wix font-black text-[#6F4E37] text-sm">
                  <GsapCounter endValue={75} suffix="°C Boiling" />
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  ref={tempGaugeRef}
                  className="h-full bg-gradient-to-r from-[#6F4E37] to-amber-600 rounded-full w-0 transition-all shadow-[0_0_8px_#6F4E37]"
                />
              </div>
            </div>
          </div>

          {/* SPATIAL PRODUCT IMAGE IN DARK-MIRROR PORTAL WITH PARALLAX BADGE */}
          <div className="my-4 flex items-center justify-center relative">
            {/* Parallax Floating Pill Badge */}
            <div 
              ref={badge1Ref}
              className="absolute -top-2 left-2 z-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E4E2] shadow-md text-[11px] font-mono font-bold text-[#6F4E37] flex items-center gap-1.5"
            >
              <Shield size={12} />
              <span>7-Yr Tank Guarantee</span>
            </div>

            <div 
              ref={geyserImgRef}
              className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden bg-[#0C0B0C] p-2 relative shadow-[0_15px_40px_rgba(0,0,0,0.18)] border border-black/10 group-hover:scale-105 transition-transform duration-700"
            >
              <img
                src="/images/superconscious_heater_hero.jpg"
                alt="Binnemat Electric Geysers"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>

          {/* BOTTOM PILL BUTTON & STAT */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5E4E2]">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block font-bold">EFFICIENCY METRIC</span>
              <strong className="text-xs text-slate-800 font-wix">
                <GsapCounter endValue={85} prefix="+" suffix="% Heat Stored" />
              </strong>
            </div>
            <button
              onClick={onExploreGeysers}
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-[#6F4E37] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-none shadow-sm hover:shadow-[0_4px_18px_rgba(111,78,55,0.3)]"
            >
              <span>Explore Geysers</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* CARD 2: SUMMER AERODYNAMIC INVERTER (WITH GSAP FAN SCROLL ROTATION) */}
        <div 
          className="gsap-stack-card glass-apple-card group rounded-3xl p-6 sm:p-8 border border-black/[0.08] bg-white/95 hover:border-emerald-500/40 transition-all duration-500 ease-out relative overflow-hidden flex flex-col justify-between min-h-[520px] shadow-[0_10px_35px_rgba(5,150,105,0.06)] hover:shadow-[0_20px_50px_rgba(5,150,105,0.14)]"
        >
          {/* Subtle Ambient Emerald Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#059669]/[0.08] blur-3xl pointer-events-none -z-10 group-hover:bg-[#059669]/[0.16] transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.03] border border-black/[0.08] text-[11px] font-mono text-slate-700 font-bold">
                <Zap size={12} className="text-emerald-600" />
                <span>Summer Aerodynamic Inverters</span>
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">02 / SUMMER</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-wix font-extrabold text-slate-900 mb-2 tracking-tight">
              30W BLDC Solar &amp; UPS Fans
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md font-normal mb-4">
              Aerofoil pitched blades drawing only 30 watts. Run your entire house cooling all day on a single solar panel during 8-hour load shedding.
            </p>

            {/* LIVE ENERGY SAVINGS GAUGE */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-500/15 mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-emerald-800 font-semibold flex items-center gap-1.5">
                  <Wind size={14} className="text-emerald-600" />
                  <span>Summer Electricity Slashed</span>
                </span>
                <span className="font-wix font-black text-emerald-600 text-sm">
                  <GsapCounter endValue={65} suffix="% Savings" />
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[65%] shadow-[0_0_8px_#059669]" />
              </div>
            </div>
          </div>

          {/* SPATIAL FAN WITH GSAP SCROLL ROTATION & PARALLAX BADGE */}
          <div className="my-4 flex items-center justify-center relative">
            {/* Parallax Floating Pill Badge */}
            <div 
              ref={badge2Ref}
              className="absolute -top-2 right-2 z-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-emerald-500/30 shadow-md text-[11px] font-mono font-bold text-emerald-700 flex items-center gap-1.5"
            >
              <Zap size={12} className="text-emerald-600" />
              <span>30W Inverter Motor</span>
            </div>

            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden bg-[#0C0B0C] p-2 relative shadow-[0_15px_40px_rgba(0,0,0,0.18)] border border-black/10 group-hover:scale-105 transition-transform duration-700">
              <img
                ref={fanImgRef}
                src="/images/superconscious_fan_hero.jpg"
                alt="Binnemat 30W BLDC Fans"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] will-change-transform"
              />
            </div>
          </div>

          {/* BOTTOM PILL BUTTON & STAT */}
          <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block font-bold">POWER DRAW</span>
              <strong className="text-xs text-emerald-700 font-wix">
                <GsapCounter endValue={30} suffix=" Watts Peak" />
              </strong>
            </div>
            <button
              onClick={onExploreFans}
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-none shadow-sm hover:shadow-[0_4px_18px_rgba(5,150,105,0.3)]"
            >
              <span>Explore Fans</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
