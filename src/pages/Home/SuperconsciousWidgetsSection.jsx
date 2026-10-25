import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Flame, Award, ArrowUpRight, CheckCircle2, Cpu, Sparkles, Thermometer, Wind } from 'lucide-react';
import GsapCounter from '../../components/common/GsapCounter';

gsap.registerPlugin(ScrollTrigger);

const WIDGETS_DATA = [
  {
    id: 'thermal',
    tabNumber: '01',
    category: 'Winter Thermal Sanctuary',
    title: 'FastHeat™ Diamond Core System',
    tagline: 'Endurance Against Saline Hard Water',
    image: '/images/superconscious_heater_hero.jpg',
    endValue: 85,
    prefix: '+',
    suffix: '%',
    statDesc: 'Boiling Heat Retention (Heavy PUF)',
    gaugeLabel: 'Max Water Temp',
    gaugeVal: '75°C Boiling',
    gaugePercent: 90,
    gaugeIcon: Thermometer,
    icon: Flame,
    color: '#6F4E37',
    accentBg: 'rgba(111, 78, 55, 0.1)',
    badgeText: '7-Year Tank Warranty',
    categorySlug: 'winter-collection',
    btnText: 'Explore Winter Geysers',
    points: [
      'Italian Incoloy 840 anti-corrosive heating coil',
      'Sapphire diamond enamel tank rated for 8-Bar',
      'Instant 3-second continuous hot water flow'
    ]
  },
  {
    id: 'inverter',
    tabNumber: '02',
    category: 'Summer Aerodynamic Eco',
    title: 'AeroDrive 30W BLDC Motor',
    tagline: 'Silent Inverter Cooling on Solar & UPS',
    image: '/images/superconscious_fan_hero.jpg',
    endValue: 30,
    suffix: 'W',
    statDesc: 'Peak Solar Power Draw',
    gaugeLabel: 'Summer Bill Slashed',
    gaugeVal: '65% Savings',
    gaugePercent: 65,
    gaugeIcon: Wind,
    icon: Zap,
    color: '#059669',
    accentBg: 'rgba(5, 150, 105, 0.08)',
    badgeText: 'Pure Copper BLDC',
    categorySlug: 'summer-collection',
    btnText: 'Explore 30W Fans',
    points: [
      'Direct 12V solar panel & UPS battery connection',
      'Slashes electricity bills by 65% with 30W draw',
      'Whisper-quiet aerofoil aerodynamic blades'
    ]
  },
  {
    id: 'culinary',
    tabNumber: '03',
    category: 'Gourmet Kitchen Burners',
    title: 'Ignis 8mm Beveled Glass Hobs',
    tagline: 'Precision Italian Brass Flame Engine',
    image: '/images/superconscious_hob_hero.jpg',
    endValue: 4.8,
    suffix: 'kW',
    decimals: 1,
    statDesc: 'Triple Ring Turbo Wok Heat Output',
    gaugeLabel: 'Gas Auto-Cutoff Safety',
    gaugeVal: '0.1s Flame Safety',
    gaugePercent: 100,
    gaugeIcon: Shield,
    icon: Cpu,
    color: '#D97706',
    accentBg: 'rgba(217, 119, 6, 0.08)',
    badgeText: 'Flame Failure Safety',
    categorySlug: 'stoves-hobs',
    btnText: 'Explore Built-in Hobs',
    points: [
      'Spanish thermoelectric flame failure auto safety cutoff',
      '8mm shatter-resistant diamond beveled glass',
      'Heavy cast iron trivets for oversized cookware'
    ]
  }
];

export default function SuperconsciousWidgetsSection({ onSelectCategory }) {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const pinnedStageRef = useRef(null);
  const cardRefs = useRef([]);
  const fanRef = useRef(null);
  const stInstanceRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const stage = pinnedStageRef.current;
    if (!el || !stage) return;

    const mm = gsap.matchMedia();

    // DESKTOP: PINNED CARD STACKING ON SCROLL (Single Page Stage with Still Background)
    mm.add('(min-width: 1024px)', () => {
      // Initialize card positions:
      // Card 0: in center
      // Card 1: below view (yPercent: 120)
      // Card 2: below view (yPercent: 120)
      gsap.set(cardRefs.current[0], { yPercent: 0, scale: 1, opacity: 1, zIndex: 10, filter: 'blur(0px)' });
      gsap.set(cardRefs.current[1], { yPercent: 120, scale: 0.95, opacity: 0, zIndex: 20, filter: 'blur(0px)' });
      gsap.set(cardRefs.current[2], { yPercent: 120, scale: 0.95, opacity: 0, zIndex: 30, filter: 'blur(0px)' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=2200', // Scroll distance for scrubbed stacking
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              setActiveTab(0);
            } else if (p < 0.70) {
              setActiveTab(1);
            } else {
              setActiveTab(2);
            }
          }
        }
      });

      stInstanceRef.current = tl.scrollTrigger;

      // STEP 1: Card 2 slides UP and lands on Card 1
      tl.to(cardRefs.current[1], {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        duration: 1
      }, 0.2);

      // Card 1 recedes into background with subtle scale & blur
      tl.to(cardRefs.current[0], {
        scale: 0.94,
        opacity: 0.35,
        y: -15,
        filter: 'blur(2px)',
        ease: 'power2.out',
        duration: 1
      }, 0.2);

      // STEP 2: Card 3 slides UP and lands on Card 2
      tl.to(cardRefs.current[2], {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        duration: 1
      }, 1.3);

      // Card 2 recedes into background
      tl.to(cardRefs.current[1], {
        scale: 0.94,
        opacity: 0.35,
        y: -15,
        filter: 'blur(2px)',
        ease: 'power2.out',
        duration: 1
      }, 1.3);

      // Continuous 360-deg Fan Blade Rotation on scrub
      if (fanRef.current) {
        tl.to(fanRef.current, {
          rotation: 360,
          ease: 'none',
          duration: 2.3
        }, 0);
      }
    });

    // MOBILE / TABLET: CLEAN RESPONSIVE STACK
    mm.add('(max-width: 1023px)', () => {
      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        gsap.set(cardEl, { yPercent: 0, opacity: 1, scale: 1, filter: 'blur(0px)', position: 'relative' });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Smooth scroll to card when user clicks a tab
  const handleTabClick = (idx) => {
    setActiveTab(idx);
    const st = stInstanceRef.current;
    if (st && window.innerWidth >= 1024) {
      const scrollTargets = [0, 0.48, 0.88];
      const targetScroll = st.start + scrollTargets[idx] * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    } else {
      const targetCard = cardRefs.current[idx];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section ref={containerRef} className="relative w-full text-slate-900">
      {/* PINNED VIEWPORT STAGE: Background stays STILL while cards slide up */}
      <div 
        ref={pinnedStageRef} 
        className="w-full min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 relative overflow-hidden"
      >
        {/* Still Ambient Mesh Glow in Pinned Stage */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E6EDFD]/60 dark:bg-[#6F4E37]/[0.08] blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#6F4E37]/[0.04] blur-[100px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: STILL HEADLINE & SYNCED SELECTOR TABS */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6EDFD] dark:bg-[#1A1715] border border-[#E5E4E2] dark:border-white/[0.1] text-xs font-mono text-[#6F4E37] dark:text-[#E6EDFD] mb-4 font-bold w-fit shadow-xs">
              <Sparkles size={13} className="text-[#6F4E37] dark:text-[#C49774]" />
              <span>Core Engineering Pillars</span>
            </div>

            <h2 className="font-wix font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-4">
              Upgrade Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] via-[#8C6547] to-[#C49774]">
                Living.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-normal max-w-md">
              Purpose-built for Pakistani climate realities: saline hard water, gas cuts, and summer loadshedding.
            </p>

            {/* VERTICAL SELECTOR TABS WITH DYNAMIC PROGRESS TRACK */}
            <div className="relative flex flex-col gap-3 max-w-md">
              {/* Left Vertical Progress Line */}
              <div className="absolute left-1 top-2 bottom-2 w-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                <div 
                  className="w-full bg-gradient-to-b from-[#6F4E37] to-[#8C6547] transition-all duration-500 rounded-full shadow-[0_0_8px_#6F4E37]"
                  style={{ 
                    height: `${((activeTab + 1) / WIDGETS_DATA.length) * 100}%` 
                  }}
                />
              </div>

              {WIDGETS_DATA.map((item, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(idx)}
                    className={`sm:ml-4 p-4 rounded-2xl text-left transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#181724] border-[#6F4E37]/50 dark:border-[#8C6547]/50 shadow-[0_10px_30px_rgba(111,78,55,0.12)] scale-[1.02]'
                        : 'bg-white/60 dark:bg-[#111018]/60 border-black/[0.06] dark:border-white/[0.06] hover:border-black/15 dark:hover:border-white/15 hover:bg-white/80 dark:hover:bg-[#111018]/80'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-mono block font-bold ${isSelected ? 'text-[#6F4E37] dark:text-[#C49774]' : 'text-slate-400 dark:text-slate-500'}`}>
                        {item.tabNumber}
                      </span>
                      <span className={`text-sm font-wix font-bold ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                        {item.category}
                      </span>
                    </div>
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        isSelected ? 'bg-[#6F4E37] shadow-[0_0_10px_#6F4E37] scale-125' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: STACKING CARDS STAGE (CARDS SLIDE UP OVER EACH OTHER) */}
          <div className="lg:col-span-7 relative w-full h-[540px] sm:h-[560px]">
            {WIDGETS_DATA.map((item, idx) => {
              const Icon = item.icon;
              const GaugeIcon = item.gaugeIcon;
              const isSelected = activeTab === idx;

              return (
                <div
                  key={item.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="lg:absolute lg:inset-0 w-full rounded-3xl border border-[#E5E4E2] dark:border-white/[0.1] bg-white/95 dark:bg-[#161311]/95 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden will-change-transform mb-6 lg:mb-0"
                  style={{
                    boxShadow: isSelected 
                      ? '0 25px 60px rgba(111, 78, 55, 0.16)' 
                      : '0 15px 35px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {/* Subtle Ambient Aura */}
                  <div 
                    className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none -z-10"
                    style={{ backgroundColor: `${item.color}18` }}
                  />

                  {/* TOP HEADER */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center p-2.5 border border-black/[0.06] dark:border-white/[0.08] shadow-sm"
                          style={{ backgroundColor: item.accentBg }}
                        >
                          <Icon size={22} style={{ color: item.color }} />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block font-semibold">
                            {item.tagline}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-wix font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* LIVE STAT WITH GSAP COUNTER */}
                      <div className="text-right">
                        <span
                          className="text-2xl sm:text-3xl font-wix font-black block"
                          style={{ color: item.color }}
                        >
                          <GsapCounter
                            endValue={item.endValue}
                            prefix={item.prefix || ''}
                            suffix={item.suffix || ''}
                            decimals={item.decimals || 0}
                          />
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono font-medium">
                          {item.statDesc}
                        </span>
                      </div>
                    </div>

                    {/* LIVE PROGRESS GAUGE */}
                    <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                          <GaugeIcon size={13} style={{ color: item.color }} />
                          <span>{item.gaugeLabel}</span>
                        </span>
                        <span className="font-wix font-bold text-xs" style={{ color: item.color }}>
                          {item.gaugeVal}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-700"
                          style={{ 
                            width: `${item.gaugePercent}%`,
                            backgroundColor: item.color 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* MIDDLE SECTION: 2 COLUMNS (BULLETS + SPATIAL IMAGE) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-auto">
                    {/* Feature Bullets */}
                    <div className="sm:col-span-7 space-y-2">
                      {item.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          <CheckCircle2 size={13} className="text-[#6F4E37] dark:text-[#C49774] mt-0.5 flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Spatial Appliance Portal */}
                    <div className="sm:col-span-5 flex justify-center">
                      <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-[#0C0B0C] p-2 relative shadow-[0_12px_30px_rgba(0,0,0,0.18)] border border-black/10 dark:border-white/10 group-hover:scale-105 transition-transform">
                        <img
                          ref={item.id === 'inverter' ? fanRef : null}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] will-change-transform"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] dark:border-white/[0.08] mt-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold">
                      <Award size={12} className="text-[#6F4E37] dark:text-[#C49774]" />
                      <span>{item.badgeText}</span>
                    </span>

                    <button
                      onClick={() => onSelectCategory && onSelectCategory(item.categorySlug)}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-[#6F4E37] dark:hover:bg-[#6F4E37] dark:hover:text-white text-xs font-bold transition-all cursor-pointer border-none shadow-sm hover:shadow-[0_4px_18px_rgba(111,78,55,0.3)]"
                    >
                      <span>{item.btnText}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
