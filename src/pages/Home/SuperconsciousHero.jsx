import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Sparkles, 
  ArrowUpRight, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Award,
  Flame,
  Star
} from 'lucide-react';
import { APP_CONFIG } from '../../config/env';
import { useProductsByCategoryQuery } from '../../hooks/useWooQueries';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function SuperconsciousHero({ onSelectProduct, onExploreClick, onSelectCategory }) {
  // 1. DYNAMIC DATA: Fetch all products under the backend "main-products" category
  const { data: mainProducts = [], isLoading } = useProductsByCategoryQuery('main-products');
  const [activeIdx, setActiveIdx] = useState(0);

  // Safe fallback to prevent out-of-bounds index
  const safeIdx = (activeIdx >= 0 && activeIdx < mainProducts.length) ? activeIdx : 0;
  const currentProduct = mainProducts[safeIdx] || null;

  const heroRef = useRef(null);
  const visualStageRef = useRef(null);
  const contentAreaRef = useRef(null);

  // GSAP Initial Reveal
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-hero-header', {
        y: 25,
        opacity: 0,
        filter: 'blur(6px)',
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      });

      gsap.from('.gsap-hero-stage', {
        scale: 0.97,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.15
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Smooth cross-fade animation when switching products
  useEffect(() => {
    if (visualStageRef.current) {
      gsap.fromTo(
        visualStageRef.current,
        { opacity: 0.35, scale: 0.94, filter: 'blur(5px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }
      );
    }
    if (contentAreaRef.current) {
      gsap.fromTo(
        contentAreaRef.current,
        { opacity: 0.5, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [safeIdx]);

  if (!currentProduct && !isLoading) {
    return null;
  }

  // Active product details
  const productName = currentProduct?.name || 'FastHeat™ Aura H1 Smart Electric Geyser';
  const productPrice = currentProduct?.formatted_price || (currentProduct?.price ? `Rs. ${Number(currentProduct.price).toLocaleString()}` : 'Rs. 36,500');
  const productImage = currentProduct?.images?.[0]?.src || '/images/superconscious_heater_hero.jpg';
  const productDesc = currentProduct?.description || 'Digital precision heating with diamond sapphire enamel core. Immune to Sui gas cuts, hard water scaling, and voltage fluctuations.';
  const productBadge = currentProduct?.badge || 'FLAGSHIP APPLIANCE';

  // Extract specs array or fallback features
  const specsList = currentProduct?.specs 
    ? (Array.isArray(currentProduct.specs) ? currentProduct.specs : Object.entries(currentProduct.specs).map(([k, v]) => `${k}: ${v}`))
    : [
        'Italian Incoloy 840 Element',
        'Zero Sui Gas Dependency',
        'ELCB Built-in Safety Breaker',
        '7-Year Official Tank Warranty'
      ];

  const handleNext = () => {
    if (mainProducts.length > 0) {
      setActiveIdx((prev) => (prev + 1) % mainProducts.length);
    }
  };

  const handlePrev = () => {
    if (mainProducts.length > 0) {
      setActiveIdx((prev) => (prev - 1 + mainProducts.length) % mainProducts.length);
    }
  };

  const whatsAppUrl = `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Salam Binnemat, I want to order/inquire about the flagship appliance: ${productName} (${productPrice}). Please share availability and delivery timeline.`
  )}`;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-start pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden bg-gradient-to-b from-[#FBF9F6] via-[#F6F4F0] to-[#EFECE6] dark:from-[#0D0B0A] dark:via-[#131110] dark:to-[#0A0908] text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* 1. LUXURY RADIAL AMBIENT AURA (WARM CHAMPAGNE & MOCHA GLOW) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.14)_0%,_rgba(111,78,55,0.08)_40%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.18)_0%,_rgba(111,78,55,0.14)_45%,_transparent_75%)] blur-[120px] rounded-full animate-pulse-aura" />
        <div className="absolute top-[60%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(230,237,253,0.3)_0%,_transparent_65%)] dark:bg-[radial-gradient(circle,_rgba(230,237,253,0.04)_0%,_transparent_70%)] blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* 2. TOP EYEBROW BADGE: LIVE BACKEND SYNCHRONIZATION */}
      <div className="gsap-hero-header inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#1E1B19]/90 border border-bn-gold/30 dark:border-bn-gold/35 shadow-[0_4px_24px_rgba(111,78,55,0.08)] backdrop-blur-xl mb-4 text-center">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#6F4E37] dark:text-[#E5C9A1] uppercase">
          Binnemat Flagship Showcase &bull; Main Collection
        </span>
        <span className="hidden sm:inline-block text-[10px] bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold font-bold px-2 py-0.5 rounded-full uppercase">
          Live Backend
        </span>
      </div>

      {/* 3. HERO HEADLINE & PHILOSOPHY */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
        <h1 className="gsap-hero-header font-wix font-black text-4xl sm:text-6xl lg:text-[76px] tracking-tight text-slate-900 dark:text-white leading-[1.08] select-none m-0">
          Thermal &amp; Inverter <span className="bg-gradient-to-r from-[#6F4E37] via-[#A8794E] to-[#D4AF37] bg-clip-text text-transparent">Luxury.</span>
        </h1>
        <p className="gsap-hero-header text-slate-600 dark:text-slate-300 text-xs sm:text-base max-w-xl mx-auto mt-2.5 sm:mt-3 font-normal leading-relaxed">
          Zero winter gas chills, whisper-silent 30W solar fans, and Italian precision cooking.
        </p>
      </div>

      {/* 4. THE MASTER STAGE (EXPANSIVE LUXURY DUAL-ZONE PRESENTATION) */}
      <div className="gsap-hero-stage w-full max-w-6xl mx-auto relative z-10">
        <div className="glass-apple-card rounded-3xl sm:rounded-[36px] border border-black/[0.08] dark:border-white/[0.1] bg-white/85 dark:bg-[#151210]/90 backdrop-blur-3xl shadow-[0_25px_80px_rgba(111,78,55,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-12 relative overflow-hidden">
          
          {/* Subtle Ambient Edge Glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: PRODUCT NARRATIVE, SPECS & DUAL CTAS */}
            <div ref={contentAreaRef} className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1">
              
              {/* Badge & Live Availability */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-gradient-to-r from-[#6F4E37]/15 to-[#8C6547]/20 text-[#6F4E37] dark:text-[#E5C9A1] border border-[#6F4E37]/25 uppercase">
                  {productBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock &bull; Brand Warranty
                </span>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-wix font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3">
                {productName}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-normal max-w-lg">
                {productDesc}
              </p>

              {/* Key Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {specsList.slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium bg-black/[0.02] dark:bg-white/[0.03] p-2 rounded-xl border border-black/[0.04] dark:border-white/[0.05]">
                    <div className="w-5 h-5 rounded-lg bg-[#6F4E37]/10 text-[#6F4E37] dark:text-[#E5C9A1] flex items-center justify-center flex-shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>

              {/* Price & Dual High-Conversion CTA Row */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Direct Official Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-wix font-black text-[#6F4E37] dark:text-[#E5C9A1] tracking-tight">
                      {productPrice}
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100/80 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                      Free Shipping
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (onSelectProduct && currentProduct) {
                        onSelectProduct(currentProduct);
                      } else if (onExploreClick) {
                        onExploreClick();
                      }
                    }}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 text-white font-bold text-xs tracking-wide transition-all shadow-[0_6px_22px_rgba(111,78,55,0.35)] flex items-center justify-center gap-1.5 cursor-pointer border-none"
                  >
                    <span>View Appliance</span>
                    <ArrowUpRight size={15} />
                  </button>

                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-white dark:bg-[#1D1A18] hover:bg-slate-50 dark:hover:bg-[#252220] border border-[#E5E4E2] dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 no-underline shadow-sm text-center"
                    aria-label="Direct WhatsApp Inquiry"
                  >
                    <MessageCircle size={15} className="text-[#6F4E37] dark:text-[#E5C9A1]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: 3D SEAMLESS APPLIANCE SHOWCASE & PEDESTAL */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 relative">
              
              {/* Radial Glowing Pedestal (Eliminates harsh black square cutout) */}
              <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] flex items-center justify-center">
                
                {/* Radiant Ambient Halo */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#D4AF37]/25 via-[#6F4E37]/20 to-transparent blur-3xl -z-10 animate-pulse-aura" />
                <div className="absolute inset-12 rounded-full border border-bn-gold/20 dark:border-bn-gold/30 -z-10" />
                
                {/* Soft Elliptical Ground Shadow */}
                <div className="absolute bottom-6 w-3/4 h-8 bg-black/15 dark:bg-black/60 blur-xl rounded-full -z-10" />

                {/* Floating Appliance Image */}
                <div 
                  ref={visualStageRef}
                  className="w-full h-full p-4 flex items-center justify-center animate-float-3d cursor-pointer group"
                  onClick={() => {
                    if (onSelectProduct && currentProduct) onSelectProduct(currentProduct);
                  }}
                >
                  <img
                    key={currentProduct?.id || safeIdx}
                    src={productImage}
                    alt={productName}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = SAFE_SVG_PLACEHOLDER;
                    }}
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Spec Capsule Overlay */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 glass-apple bg-white/90 dark:bg-[#1E1B19]/90 border border-black/[0.08] dark:border-white/[0.1] rounded-2xl px-3.5 py-2 shadow-lg backdrop-blur-xl flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
                    <Award size={13} />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-mono uppercase text-slate-400 block leading-tight">Authentic Build</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Pure Quality</span>
                  </div>
                </div>

                {/* Prev / Next Stage Arrows */}
                {mainProducts.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 dark:bg-[#1E1B19]/85 border border-black/[0.08] dark:border-white/[0.1] text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      aria-label="Previous product"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 dark:bg-[#1E1B19]/85 border border-black/[0.08] dark:border-white/[0.1] text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      aria-label="Next product"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}

              </div>
            </div>

          </div>

          {/* 5. DYNAMIC PRODUCT SWITCHER DECK (FROM BACKEND 'main-products' CATEGORY) */}
          {mainProducts.length > 1 && (
            <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  Select Model ({safeIdx + 1} of {mainProducts.length})
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  Tap to preview live specs
                </span>
              </div>

              {/* Horizontal Scrollable Thumbnails Deck */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {mainProducts.map((item, idx) => {
                  const isActive = idx === safeIdx;
                  const itemImg = item.images?.[0]?.src || SAFE_SVG_PLACEHOLDER;
                  const itemPrice = item.formatted_price || (item.price ? `Rs. ${Number(item.price).toLocaleString()}` : '');

                  return (
                    <button
                      key={item.id || idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`flex-shrink-0 flex items-center gap-3 p-2 sm:p-2.5 rounded-2xl transition-all duration-300 text-left border cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#6F4E37]/15 to-[#8C6547]/20 border-[#6F4E37] dark:border-[#D4AF37] shadow-[0_4px_16px_rgba(111,78,55,0.2)] scale-[1.02]'
                          : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#1D1A18] p-1 flex items-center justify-center flex-shrink-0 overflow-hidden border border-black/[0.05] dark:border-white/[0.08]">
                        <img 
                          src={itemImg} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = SAFE_SVG_PLACEHOLDER;
                          }}
                        />
                      </div>
                      <div className="pr-2 min-w-[120px] max-w-[200px]">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate m-0 leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-extrabold text-[#6F4E37] dark:text-[#E5C9A1] block mt-0.5">
                          {itemPrice}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
