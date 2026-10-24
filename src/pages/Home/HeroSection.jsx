import React from 'react';
import { Button } from 'antd';
import { ArrowRight, PhoneCall, Zap, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../../config/env';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function HeroSection({ onExploreClick }) {
  return (
    <section className="min-h-[80vh] flex items-center px-[5%] py-6 max-w-[1360px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
        {/* LEFT COLUMN: MINIMAL MARKETING HEADLINE & QUICK CHIPS */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bn-gold/15 border border-bn-gold/40 text-bn-goldDark dark:text-bn-goldLight text-xs font-black mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-bn-gold animate-pulse shadow-sm" />
            <Sparkles size={13} className="text-amber-500" />
            <span>OFFICIAL FACTORY DIRECT &bull; 2026 CAMPAIGN</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-[50px] font-black text-neutral-900 dark:text-neutral-100 leading-[1.12] mb-4 tracking-tight">
            End Winter Gas Chills. <br />
            <span className="gold-gradient-text">Cut Summer Bills by 65%.</span>
          </h1>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg font-light">
            Instant 3-second continuous hot water and whisper-silent 30W solar BLDC fans. Precision engineered for Pakistani homes.
          </p>

          {/* MINIMAL CHIPS */}
          <div className="flex flex-wrap gap-2 mb-8 text-xs font-bold text-neutral-700 dark:text-neutral-300">
            <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-neutral-800 border border-bn-borderLight dark:border-bn-borderDark flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Zero Sui Gas Dependence</span>
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-neutral-800 border border-bn-borderLight dark:border-bn-borderDark flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Hard Water Scaling Proof</span>
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/80 dark:bg-neutral-800 border border-bn-borderLight dark:border-bn-borderDark flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>12V Solar & UPS Direct</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3.5 mb-8">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRight size={16} />}
              onClick={onExploreClick}
              className="rounded-full font-black px-8 h-12 bg-gradient-to-r from-bn-gold to-bn-goldDark border-none text-white flex items-center gap-2 shadow-lg hover:shadow-xl text-sm"
            >
              Explore Geysers & Fans
            </Button>
            <Button
              size="large"
              icon={<PhoneCall size={16} />}
              href={`https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=Salam%20Binnemat,%20I%20am%20interested%20in%20ordering`}
              target="_blank"
              className="rounded-full font-bold px-6 h-12 border-bn-borderLight dark:border-bn-borderDark text-neutral-800 dark:text-neutral-200 flex items-center gap-2"
            >
              WhatsApp Order
            </Button>
          </div>

          {/* TRUST STATS */}
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-bn-borderLight dark:border-bn-borderDark text-xs">
            <div>
              <strong className="block text-xl font-black text-bn-goldDark dark:text-bn-goldLight">7+ Years</strong>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Tank Warranty</span>
            </div>
            <div>
              <strong className="block text-xl font-black text-bn-goldDark dark:text-bn-goldLight">30 Watts</strong>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Eco BLDC Power</span>
            </div>
            <div>
              <strong className="block text-xl font-black text-bn-goldDark dark:text-bn-goldLight">25,000+</strong>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Homes Equipped</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LARGE LIFESTYLE VISUAL CARD */}
        <div className="lg:col-span-5">
          <div className="glass-panel luxury-card p-4 sm:p-5 rounded-3xl border-2 border-bn-gold/40 bg-white/90 dark:bg-[#18181B]/90 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bn-gold text-white text-[11px] font-black shadow-sm">
                <Flame size={12} className="text-amber-200 fill-amber-200" />
                <span>WINTER BESTSELLER</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                100% Factory Sealed
              </span>
            </div>

            <div className="h-72 sm:h-84 rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center relative mb-4 shadow-inner group">
              <img
                src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-storage.jpg"
                alt="Binnemat Sapphire 35L Digital Geyser"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-neutral-950/80 backdrop-blur-md text-white p-2.5 rounded-xl flex items-center justify-between border border-white/10 text-xs">
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-400" />
                  <span className="font-semibold">Italian Incoloy 840</span>
                </div>
                <span className="text-[11px] font-black text-bn-goldLight">55°C Touch Display</span>
              </div>
            </div>

            <div className="flex justify-between items-center px-1">
              <div>
                <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 m-0">
                  Sapphire 35L Storage Geyser
                </h3>
                <span className="text-[11px] text-neutral-500">
                  24-Hour Boiling Heat Retention
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-bn-goldDark dark:text-bn-goldLight block">
                  Rs. 36,500
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  Free Doorstep Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
