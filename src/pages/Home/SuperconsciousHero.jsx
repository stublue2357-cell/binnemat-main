import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Sparkles, Shield, Zap, Flame, CheckCircle, MessageCircle } from 'lucide-react';
import { APP_CONFIG } from '../../config/env';
import GsapCounter from '../../components/common/GsapCounter';

const HERO_APPLIANCES = [
  {
    id: 'geyser',
    tag: 'Winter Warmth • 3-Sec Flow',
    name: 'FastHeat™ Aura H1 Smart Geyser',
    category: 'Thermal Storage & Instant',
    image: '/images/superconscious_heater_hero.jpg',
    statLabel: 'Heat Retention',
    statEndValue: 24,
    statSuffix: ' Hours',
    badge: 'Incoloy 840 Hard-Water Core',
    price: 'Rs. 36,500',
    desc: 'Digital heating with diamond enamel core. Immune to Sui gas cuts and hard water scaling.',
    specs: ['55°C Touch LED Ring', 'Zero Gas Dependency', 'ELCB Safety Shock Breaker', '7-Year Tank Warranty']
  },
  {
    id: 'fan',
    tag: 'Summer Breeze • 30W Inverter',
    name: 'Aeria 30W BLDC Aerodynamic Fan',
    category: 'Ultra-Low Watt Inverter',
    image: '/images/superconscious_fan_hero.jpg',
    statLabel: 'Electricity Saved',
    statEndValue: 65,
    statPrefix: '+',
    statSuffix: '% Cut',
    badge: '12V Solar & UPS Direct',
    price: 'Rs. 14,800',
    desc: 'Whisper-quiet BLDC motor with aerodynamic blades. Slashes electric bills by 65%.',
    specs: ['Direct Solar & UPS Support', 'Whisper Silent <28dB', 'RF Smart Remote Control', 'Pure Copper High-Torque']
  },
  {
    id: 'hob',
    tag: 'Culinary Precision • 8mm Glass',
    name: 'Ignis Italian Beveled Built-in Hob',
    category: 'Gourmet Kitchen Burners',
    image: '/images/superconscious_hob_hero.jpg',
    statLabel: 'Thermal Output',
    statEndValue: 4.8,
    statSuffix: ' kW',
    decimals: 1,
    badge: 'Pure Italian Brass Burners',
    price: 'Rs. 28,500',
    desc: '8mm tempered glass with Spanish auto flame-failure safety valves for worry-free cooking.',
    specs: ['Auto Flame-Failure Cutoff', 'Cast Iron Handi Trivets', '8mm Thermal Shock Glass', 'Bi-Gas (Sui & LPG) Ready']
  }
];

export default function SuperconsciousHero({ onExploreClick, onSelectCategory }) {
  const [activeTab, setActiveTab] = useState(0);
  const currentAppliance = HERO_APPLIANCES[activeTab];
  const heroRef = useRef(null);
  const imageContainerRef = useRef(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for headline, badge, and copy
      gsap.from('.gsap-hero-fade', {
        opacity: 0,
        y: 35,
        filter: 'blur(8px)',
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // Spatial Portal Entrance
      gsap.from('.gsap-hero-portal', {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.2
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Smooth image swap transition on tab click
  useEffect(() => {
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0.4, scale: 0.94, filter: 'blur(4px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-between pt-32 sm:pt-36 md:pt-40 pb-14 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FAF9F7] via-[#FFFFFF] to-[#F3F2F0] dark:from-[#110F0E] dark:via-[#0A0908] dark:to-[#0E0C0B] text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* 1. MOCHA BROWN, PLATINUM SILVER & PALE LAVENDER AURORA BACKDROP */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Radiant Pale Lavender & Mocha Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle,_rgba(230,237,253,0.75)_0%,_rgba(111,78,55,0.08)_50%,_transparent_75%)] dark:bg-[radial-gradient(circle,_rgba(111,78,55,0.22)_0%,_rgba(230,237,253,0.06)_50%,_transparent_75%)] blur-3xl animate-pulse-aura" />
        {/* Soft Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* 2. TOP INDICATOR PILL (PALE LAVENDER WITH MOCHA ACCENT) */}
      <div className="gsap-hero-fade inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6EDFD]/85 dark:bg-[#1A1614]/90 border border-[#E5E4E2] dark:border-white/[0.1] backdrop-blur-xl mb-4 shadow-[0_4px_20px_rgba(111,78,55,0.06)]">
        <span className="w-2 h-2 rounded-full bg-[#6F4E37] shadow-[0_0_8px_#6F4E37] animate-pulse" />
        <span className="text-xs font-mono font-bold tracking-wider text-[#6F4E37] dark:text-[#E5E4E2] uppercase">
          The Thermal &amp; Inverter Intelligence
        </span>
      </div>

      {/* 3. GIANT LOWERCASE TYPOGRAPHY (SUPERCONSCIOUS SIGNATURE) */}
      <div className="text-center max-w-4xl mx-auto mb-6">
        <h1 className="gsap-hero-fade font-wix font-black text-6xl sm:text-8xl lg:text-[112px] tracking-tight text-slate-900 dark:text-white lowercase leading-none select-none m-0">
          binnemat
        </h1>
        <p className="gsap-hero-fade text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-4 font-normal leading-relaxed">
          Zero winter gas chills, whisper-silent 30W solar fans, and Italian precision cooking.
        </p>
      </div>

      {/* 4. APPLIANCE INTERACTIVE SELECTOR PILLS */}
      <div className="gsap-hero-fade flex items-center gap-1.5 p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-[#E5E4E2] dark:border-white/[0.1] backdrop-blur-xl mb-8 z-20">
        {HERO_APPLIANCES.map((app, idx) => (
          <button
            key={app.id}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border-none cursor-pointer ${
              activeTab === idx
                ? 'bg-gradient-to-r from-[#6F4E37] to-[#8C6547] text-white shadow-[0_4px_16px_rgba(111,78,55,0.35)]'
                : 'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {app.name.split(' ')[0]} {app.name.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* 5. CENTERPIECE: 3D FLOATING APPLIANCE & SPATIAL CARD */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* LEFT COLUMN: HERO SPECS & STATS */}
        <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-center text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#6F4E37] dark:text-[#C49774] uppercase tracking-wider mb-2 font-bold">
            <Sparkles size={13} />
            <span>{currentAppliance.tag}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-wix font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            {currentAppliance.name}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
            {currentAppliance.desc}
          </p>

          {/* KEY SPECS LIST */}
          <div className="space-y-2.5 mb-6">
            {currentAppliance.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <CheckCircle size={15} className="text-[#6F4E37] dark:text-[#C49774] flex-shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (activeTab === 0 && onSelectCategory) onSelectCategory('winter-collection');
                else if (activeTab === 1 && onSelectCategory) onSelectCategory('summer-collection');
                else if (activeTab === 2 && onSelectCategory) onSelectCategory('stoves-hobs');
                else if (onExploreClick) onExploreClick();
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 text-white font-bold text-xs tracking-wide transition-all shadow-[0_6px_22px_rgba(111,78,55,0.35)] flex items-center gap-2 cursor-pointer border-none"
            >
              <span>Explore Collection</span>
              <ArrowUpRight size={15} />
            </button>
            <a
              href={`https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=Salam%20Binnemat,%20I%20am%20interested%20in%20${encodeURIComponent(currentAppliance.name)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-white dark:bg-[#161522] hover:bg-slate-50 dark:hover:bg-[#1E1D2D] border border-[#E5E4E2] dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center gap-2 no-underline shadow-sm"
            >
              <MessageCircle size={14} className="text-[#6F4E37] dark:text-[#C49774]" />
              <span>Direct Inquire</span>
            </a>
          </div>
        </div>

        {/* CENTER COLUMN: 3D FLOATING SPATIAL PORTAL */}
        <div className="gsap-hero-portal lg:col-span-5 order-1 lg:order-2 flex items-center justify-center relative">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(111,78,55,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-[#E5E4E2] dark:border-white/10 bg-[#0C0B0C] p-2">
            {/* Glowing Mocha & Lavender Torus Rim */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#6F4E37]/30 via-[#8C6547]/20 to-[#E6EDFD]/25 blur-xl -z-10 animate-pulse-aura" />
            
            {/* Appliance Image with Floating Animation */}
            <div ref={imageContainerRef} className="w-full h-full animate-float-3d">
              <img
                key={currentAppliance.id}
                src={currentAppliance.image}
                alt={currentAppliance.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FLOATING FROSTED STAT CARD */}
        <div className="lg:col-span-3 order-3 flex flex-col justify-center">
          <div className="glass-apple-card p-6 rounded-3xl border border-[#E5E4E2] dark:border-white/[0.1] bg-white/95 dark:bg-[#161311]/90 backdrop-blur-2xl shadow-[0_15px_40px_rgba(111,78,55,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Top Mocha Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6F4E37] to-transparent" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-[#6F4E37] dark:text-[#C49774] tracking-wider uppercase font-bold">
                Live Specification
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1 font-medium">
                  {currentAppliance.statLabel}
                </span>
                <span className="text-3xl font-wix font-black text-slate-900 dark:text-white tracking-tight block">
                  <GsapCounter
                    endValue={currentAppliance.statEndValue}
                    prefix={currentAppliance.statPrefix || ''}
                    suffix={currentAppliance.statSuffix || ''}
                    decimals={currentAppliance.decimals || 0}
                  />
                </span>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
                <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1 font-medium">Core Tech</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {currentAppliance.badge}
                </span>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-medium">Factory Direct Price</span>
                  <span className="text-lg font-extrabold text-[#6F4E37] dark:text-[#E5E4E2]">{currentAppliance.price}</span>
                </div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  Free Shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
