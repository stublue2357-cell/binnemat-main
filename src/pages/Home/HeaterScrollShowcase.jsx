import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Zap, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Eye, 
  Thermometer, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { getWhatsAppOrderUrl } from '../../config/env';
import { HEATER_MOCK_SVGS } from '../../constants/heaterAssets';

// 7 Curated Premium Heaters with High-Detail Specs & Visuals
export const CURATED_HEATERS = [
  {
    id: 101,
    name: "Binnemat Sapphire 35L Digital Storage Electric Geyser",
    shortName: "Sapphire 35L Storage",
    tagline: "24-Hour Boiling Thermal Storage",
    slug: "binnemat-sapphire-35l-geyser",
    price: 36500,
    formatted_price: "Rs. 36,500",
    badge: "SAPPHIRE ENAMEL",
    badgeColor: "from-amber-500 to-amber-700",
    power: "2000W Incoloy 840",
    powerPercent: 70,
    temp: "75°C Max Heat",
    capacity: "35 Liters Family Size",
    warranty: "7 Years Tank • 2 Years Element",
    accentColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.35)",
    image: HEATER_MOCK_SVGS.SAPPHIRE_35L,
    mockFallback: HEATER_MOCK_SVGS.SAPPHIRE_35L,
    features: [
      "Sapphire Glasslined Anti-Rust Tank",
      "Italian Incoloy 840 Spiral Element",
      "Heavy Polyurethane Foam Thermal Insulation",
      "Dual Safety Thermal Cut-off"
    ]
  },
  {
    id: 102,
    name: "Binnemat FastHeat 9kW Instant Digital Electric Geyser",
    shortName: "FastHeat 9kW Instant",
    tagline: "Instant 3-Second Endless Hot Water",
    slug: "binnemat-fastheat-instant-geyser",
    price: 24800,
    formatted_price: "Rs. 24,800",
    badge: "3-SEC INSTANT",
    badgeColor: "from-rose-500 to-orange-600",
    power: "3kW - 9kW Inverter",
    powerPercent: 95,
    temp: "55°C Instant Digital",
    capacity: "Continuous Flow (No Tank)",
    warranty: "2 Years Official Warranty",
    accentColor: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.35)",
    image: HEATER_MOCK_SVGS.FASTHEAT_9KW,
    mockFallback: HEATER_MOCK_SVGS.FASTHEAT_9KW,
    features: [
      "3-Second German Heating Matrix",
      "Smart Touch LED Temperature Screen",
      "Built-in ELCB Shock-Proof Breaker",
      "Operates on Ultra Low Water Pressure"
    ]
  },
  {
    id: 103,
    name: "Binnemat Inferno 2400W Ceramic Radiant Room Heater",
    shortName: "Inferno 2400W Room Heater",
    tagline: "Wide-Angle Rapid Ceramic Room Warmth",
    slug: "binnemat-inferno-2400w-room-heater",
    price: 18500,
    formatted_price: "Rs. 18,500",
    badge: "RAPID CERAMIC",
    badgeColor: "from-amber-600 to-red-600",
    power: "2400W Ceramic PTC",
    powerPercent: 80,
    temp: "Wide 120° Oscillation",
    capacity: "Covers 350 sq. ft. Room",
    warranty: "2 Years Motor & Element",
    accentColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.35)",
    image: HEATER_MOCK_SVGS.INFERNO_2400W,
    mockFallback: HEATER_MOCK_SVGS.INFERNO_2400W,
    features: [
      "PTC Ceramic Non-Oxygen Burning Element",
      "Auto Tip-over & Overheat Safety Switch",
      "3 Digital Speed & Heating Modes",
      "Whisper-Quiet Turbo Air Circulation"
    ]
  },
  {
    id: 104,
    name: "Super Asia Heavy Duty 50L Rust-Proof Storage Geyser",
    shortName: "SuperAsia 50L Heavy",
    tagline: "Commercial Grade Polyurethane Insulated",
    slug: "super-asia-50l-geyser",
    price: 42500,
    formatted_price: "Rs. 42,500",
    badge: "50L HEAVY DUTY",
    badgeColor: "from-yellow-600 to-amber-700",
    power: "2500W Copper Spiral",
    powerPercent: 85,
    temp: "80°C Thermal Shield",
    capacity: "50 Liters Multi-Bath",
    warranty: "5 Years Official Warranty",
    accentColor: "#CA8A04",
    glowColor: "rgba(202, 138, 4, 0.35)",
    image: HEATER_MOCK_SVGS.SUPER_ASIA_50L,
    mockFallback: HEATER_MOCK_SVGS.SUPER_ASIA_50L,
    features: [
      "Thick Gauge Rust-Proof Marine Steel",
      "High-Density German Polyurethane",
      "Sacrificial Magnesium Anode Rod",
      "Multi-Bathroom Concurrent Supply"
    ]
  },
  {
    id: 105,
    name: "Binnemat Dual Hybrid Gas & 30L Electric Geyser",
    shortName: "Dual Hybrid Gas/Electric",
    tagline: "Zero Interruption Gas & Power Switching",
    slug: "binnemat-hybrid-gas-electric-geyser",
    price: 48000,
    formatted_price: "Rs. 48,000",
    badge: "DUAL HYBRID",
    badgeColor: "from-blue-600 to-indigo-700",
    power: "Gas Jet + 1500W Electric",
    powerPercent: 90,
    temp: "Dual Automated Thermo",
    capacity: "30 Liters Hybrid Tank",
    warranty: "3 Years Comprehensive",
    accentColor: "#2563EB",
    glowColor: "rgba(37, 99, 235, 0.35)",
    image: HEATER_MOCK_SVGS.DUAL_HYBRID_GAS,
    mockFallback: HEATER_MOCK_SVGS.DUAL_HYBRID_GAS,
    features: [
      "Auto Switch Natural Gas to Electric",
      "Imported Italian Low-Pressure Jet Burner",
      "Copper Immersion Auxiliary Element",
      "Gas Load-Shedding Proof Design"
    ]
  },
  {
    id: 106,
    name: "NasGas Premium 20L Fast-Recovery Kitchen Geyser",
    shortName: "NasGas 20L Kitchen Fit",
    tagline: "Compact Under-Sink High-Velocity Heating",
    slug: "nasgas-premium-20l-geyser",
    price: 28500,
    formatted_price: "Rs. 28,500",
    badge: "FAST RECOVERY",
    badgeColor: "from-emerald-600 to-teal-700",
    power: "1500W Rapid Flow",
    powerPercent: 65,
    temp: "65°C Pre-Set Auto",
    capacity: "20 Liters Slim Fit",
    warranty: "2 Years Official Warranty",
    accentColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.35)",
    image: HEATER_MOCK_SVGS.NASGAS_20L,
    mockFallback: HEATER_MOCK_SVGS.NASGAS_20L,
    features: [
      "Ultra-Compact Under-Sink Mounting",
      "Continuous High Flow for Kitchen Sink",
      "Anti-Calcification Enamel Core",
      "Energy Saver Eco-Thermostat"
    ]
  },
  {
    id: 107,
    name: "Binnemat Quartz Ultra-Quiet Tower Room Heater",
    shortName: "Quartz Tower Infrared",
    tagline: "Warm Sun-Like Infrared Rays with Zero Noise",
    slug: "binnemat-quartz-tower-room-heater",
    price: 16900,
    formatted_price: "Rs. 16,900",
    badge: "QUARTZ INFRARED",
    badgeColor: "from-orange-500 to-amber-600",
    power: "1800W Dual Quartz Tubes",
    powerPercent: 60,
    temp: "Instant Infrared Radiance",
    capacity: "Covers 250 sq. ft. Area",
    warranty: "1 Year Official Warranty",
    accentColor: "#F97316",
    glowColor: "rgba(249, 115, 22, 0.35)",
    image: HEATER_MOCK_SVGS.QUARTZ_TOWER,
    mockFallback: HEATER_MOCK_SVGS.QUARTZ_TOWER,
    features: [
      "Natural Sun-Like Infrared Heat Waves",
      "Zero Noise Whisper-Quiet Operation",
      "Mesh Cool-Touch Safety Grill",
      "Low Energy Eco Thermostat Setting"
    ]
  }
];

export default function Heater3DScrollShowcase({ liveProducts = [], onSelectProduct }) {
  // If live products are provided, merge them or use our 7 curated heaters
  const items = CURATED_HEATERS.map((curated, idx) => {
    if (liveProducts && liveProducts[idx]) {
      const live = liveProducts[idx];
      return {
        ...curated,
        id: live.id || curated.id,
        name: live.name || curated.name,
        price: live.price ? Number(live.price) : curated.price,
        formatted_price: live.formatted_price || `Rs. ${Number(live.price || curated.price).toLocaleString()}`,
        slug: live.slug || curated.slug,
        image: live.images?.[0]?.src || curated.image
      };
    }
    return curated;
  });

  const totalItems = items.length;
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll listener inside the 350vh track
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height - window.innerHeight;
      if (containerHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / containerHeight));
      setScrollProgress(progress);

      const targetIndex = Math.min(totalItems - 1, Math.floor(progress * totalItems));
      setActiveIndex(targetIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalItems]);

  const activeProduct = items[activeIndex] || items[0];

  // Manual Jump button for thumbs/arrows
  const jumpToIndex = (index) => {
    const clamped = Math.max(0, Math.min(totalItems - 1, index));
    setActiveIndex(clamped);
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + (clamped / (totalItems - 1)) * containerHeight;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: `${totalItems * 80}vh` }} // Generous scroll runway
    >
      {/* STICKY VIEWPORT STAGE */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-gradient-to-b from-neutral-950 via-[#120F0B] to-neutral-950 text-white select-none">
        
        {/* AMBIENT HEAT GLOW STAGE IN THE BACKGROUND */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 50% 45%, ${activeProduct.glowColor} 0%, rgba(18, 15, 11, 0.4) 60%, transparent 100%)`
          }}
        />

        {/* TOP BRAND & STEP BAR */}
        <div className="relative z-20 max-w-[1360px] mx-auto w-full px-[5%] pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bn-gold/20 border border-bn-gold/40 text-bn-goldLight text-xs font-black uppercase tracking-widest">
              <Flame size={14} className="text-amber-400 animate-pulse" />
              <span>Winter Warmth Engineering</span>
            </span>
            <span className="hidden sm:inline-block text-xs text-neutral-400 font-light">
              Scroll down to rotate through Certified Heaters
            </span>
          </div>

          {/* INDEX INDICATOR */}
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
            <span className="font-bold text-bn-gold">0{activeIndex + 1}</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-500">0{totalItems}</span>
          </div>
        </div>

        {/* MAIN 3D SHOWCASE ARENA */}
        <div className="relative z-10 max-w-[1360px] mx-auto w-full px-[5%] flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 py-2">
          
          {/* LEFT: SPECS & PRODUCT INFORMATION HUD */}
          <div className="w-full lg:w-5/12 space-y-4 text-left order-2 lg:order-1 transition-all duration-500">
            
            {/* BADGE & CATEGORY */}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-lg bg-gradient-to-r ${activeProduct.badgeColor}`}>
                {activeProduct.badge}
              </span>
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" />
                <span>Certified Incoloy Element</span>
              </span>
            </div>

            {/* PRODUCT TITLE */}
            <div>
              <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug m-0">
                {activeProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-bn-goldLight/90 mt-1 font-light italic">
                "{activeProduct.tagline}"
              </p>
            </div>

            {/* LIVE PRICE & STOCK */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-cinzel text-3xl sm:text-4xl font-black text-bn-gold tracking-tight">
                {activeProduct.formatted_price}
              </span>
              <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                In Stock &bull; Free Express Delivery
              </span>
            </div>

            {/* SPECIFICATION TILES */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                  <Zap size={13} className="text-amber-400" />
                  <span className="font-bold uppercase tracking-wider text-[10px]">Power & Rating</span>
                </div>
                <strong className="block text-xs sm:text-sm text-neutral-100 font-bold truncate">
                  {activeProduct.power}
                </strong>
                <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${activeProduct.powerPercent}%` }} 
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                  <Thermometer size={13} className="text-rose-400" />
                  <span className="font-bold uppercase tracking-wider text-[10px]">Heat Capacity</span>
                </div>
                <strong className="block text-xs sm:text-sm text-neutral-100 font-bold truncate">
                  {activeProduct.capacity}
                </strong>
                <span className="text-[10px] text-neutral-400 block mt-1 truncate">
                  {activeProduct.temp}
                </span>
              </div>
            </div>

            {/* BULLET FEATURES */}
            <ul className="space-y-1.5 pt-1 text-xs text-neutral-300 font-light hidden sm:block">
              {activeProduct.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-bn-gold shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={getWhatsAppOrderUrl(activeProduct.name, activeProduct.formatted_price)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Order via WhatsApp</span>
              </a>

              <button
                onClick={() => onSelectProduct && onSelectProduct(activeProduct)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Eye size={15} />
                <span>Full Specs</span>
                <ArrowUpRight size={14} className="text-neutral-400" />
              </button>
            </div>
          </div>

          {/* RIGHT: 3D ROTATING PRODUCT STAGE (APPLE-STYLE TURNTABLE) */}
          <div className="w-full lg:w-7/12 h-[340px] sm:h-[420px] lg:h-[480px] flex items-center justify-center relative order-1 lg:order-2">
            
            {/* 3D PERSPECTIVE STAGE */}
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: '1400px' }}
            >
              {items.map((item, index) => {
                const offset = index - activeIndex;
                const isCurrent = offset === 0;
                
                // Continuous scroll offset based on subProgress
                const subProgress = (scrollProgress * totalItems) - activeIndex;
                const dynamicOffset = offset - subProgress;

                // 3D positioning calculations
                const rotateY = dynamicOffset * 48; // Smooth rotation angle
                const translateZ = isCurrent ? 0 : -Math.abs(dynamicOffset) * 220;
                const translateX = dynamicOffset * 180;
                const scale = Math.max(0.65, 1 - Math.abs(dynamicOffset) * 0.22);
                const opacity = Math.max(0, 1 - Math.abs(dynamicOffset) * 0.55);
                const zIndex = 20 - Math.round(Math.abs(dynamicOffset) * 5);

                return (
                  <div
                    key={item.id}
                    onClick={() => jumpToIndex(index)}
                    className="absolute cursor-pointer transition-transform duration-500 ease-out will-change-transform"
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                      pointerEvents: isCurrent ? 'auto' : 'auto'
                    }}
                  >
                    {/* APPLIANCE PEDESTAL & IMAGE CONTAINER */}
                    <div className="relative group w-[260px] sm:w-[320px] lg:w-[360px] aspect-square flex items-center justify-center">
                      
                      {/* RADIANT AMBER HALO BEHIND HEATER */}
                      <div 
                        className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 ${isCurrent ? 'opacity-80 scale-110' : 'opacity-20 scale-75'}`}
                        style={{ background: item.glowColor }}
                      />

                      {/* CIRCULAR PEDESTAL DISC (TURNTABLE BASE) */}
                      <div 
                        className="absolute bottom-4 w-4/5 h-12 rounded-full border border-amber-500/30 bg-gradient-to-t from-black/80 via-neutral-900/40 to-transparent shadow-[0_0_40px_rgba(245,158,11,0.25)]"
                        style={{ transform: 'rotateX(75deg)' }}
                      />

                      {/* APPLIANCE PRODUCT IMAGE */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-all duration-500 ${isCurrent ? 'scale-100 brightness-105' : 'scale-90 brightness-75'}`}
                        onError={(e) => {
                          e.target.src = item.mockFallback || item.image;
                        }}
                      />

                      {/* FLOATING PRODUCT TAG */}
                      <div className={`absolute top-2 right-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-bn-gold/40 text-[10px] font-bold text-bn-goldLight transition-all duration-300 ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        Heater 0{index + 1}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PREV & NEXT CONTROLS */}
            <button
              onClick={() => jumpToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous Heater"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center backdrop-blur-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 z-30 shadow-xl cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => jumpToIndex(activeIndex + 1)}
              disabled={activeIndex === totalItems - 1}
              aria-label="Next Heater"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center backdrop-blur-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 z-30 shadow-xl cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* BOTTOM: THUMBNAIL SCRUBBER & INTERACTIVE PROGRESS BAR */}
        <div className="relative z-20 max-w-[1360px] mx-auto w-full px-[5%] pb-6 space-y-3">
          
          {/* SCRUBBER PROGRESS TRACK */}
          <div className="w-full bg-neutral-800/80 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-bn-gold to-amber-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((activeIndex + 1) / totalItems) * 100}%` }}
            />
          </div>

          {/* 7 HEATER THUMBNAIL PILLS (CLICKABLE) */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => jumpToIndex(idx)}
                  className={`flex-1 min-w-[70px] sm:min-w-[110px] py-2 px-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-bn-gold/20 border-bn-gold text-white shadow-lg shadow-bn-gold/20 scale-105' 
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <span className={`block text-[10px] font-mono font-bold ${isActive ? 'text-bn-gold' : 'text-neutral-500'}`}>
                    0{idx + 1}
                  </span>
                  <span className="block text-[11px] font-bold truncate">
                    {item.shortName}
                  </span>
                  <span className="text-[10px] text-neutral-400 hidden sm:block truncate">
                    {item.formatted_price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
