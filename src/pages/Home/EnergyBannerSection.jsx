import React from 'react';
import { Button } from 'antd';
import { Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function EnergyBannerSection({ onShopClick }) {
  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-16">
      <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-[#EDE5D5] to-[#DFD4BF] dark:from-[#18181B] dark:to-[#222226] border-2 border-bn-gold/30 text-neutral-900 dark:text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl transition-colors duration-300">
        {/* LEFT COLUMN: MARKETING BILL COMPARISON */}
        <div className="lg:col-span-7">
          <span className="text-xs font-black tracking-widest text-bn-goldDark dark:text-bn-goldLight uppercase block mb-2 flex items-center gap-1.5">
            <Zap size={15} className="text-amber-500 fill-amber-500" />
            <span>SOLAR DIRECT &bull; 65% ELECTRICITY REDUCTION</span>
          </span>

          <h2 className="font-cinzel text-2xl md:text-4xl font-black text-neutral-900 dark:text-white mb-4 leading-snug">
            30W BLDC Smart Inverter Fans. <br />
            <span className="gold-gradient-text">Runs 3x Longer on UPS & Solar.</span>
          </h2>

          <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 max-w-xl">
            Ordinary 85W AC ceiling fans consume massive electricity and quickly drain UPS batteries during load-shedding. Binnemat pure copper BLDC fans run at only <strong>30 Watts</strong> with zero motor buzzing and whisper-silent high air throw.
          </p>

          {/* VISUAL BILL COMPARISON TILE */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/70 dark:bg-black/40 border border-bn-gold/25 mb-6 max-w-lg text-xs">
            <div className="border-r border-neutral-300 dark:border-neutral-700 pr-3">
              <span className="text-neutral-500 block">Old 85W AC Fan</span>
              <strong className="text-red-500 text-sm block">Rs. 3,200 / Month</strong>
              <span className="text-[10px] text-neutral-400">Heats up, trips UPS quickly</span>
            </div>
            <div className="pl-2">
              <span className="text-bn-goldDark dark:text-bn-goldLight font-bold block">Binnemat 30W BLDC</span>
              <strong className="text-emerald-600 dark:text-emerald-400 text-sm block">Rs. 1,100 / Month</strong>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Save Rs. 25,000+ yearly</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              type="primary" 
              size="large" 
              icon={<ArrowRight size={16} />}
              onClick={onShopClick}
              className="rounded-full font-black px-8 h-12 bg-gradient-to-r from-bn-gold to-bn-goldDark border-none text-white shadow-md hover:shadow-xl text-sm"
            >
              Shop 30W BLDC Fans
            </Button>
            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-bn-gold" />
              <span>2 Years Full Motor Replacement</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL BLDC FAN PHOTOGRAPHY */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-bn-gold/40 group relative">
            <div className="h-64 sm:h-72 overflow-hidden bg-neutral-900 flex items-center justify-center">
              <img 
                src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bldc-fan.jpg" 
                alt="Binnemat AeroGold 30W BLDC Inverter Ceiling Fan"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md flex justify-between items-center text-xs">
              <div>
                <strong className="block text-sm text-neutral-900 dark:text-neutral-100 font-cinzel">AeroGold 30W BLDC</strong>
                <span className="text-neutral-500">Whisper Quiet &bull; RF Remote Included</span>
              </div>
              <strong className="text-base text-bn-goldDark dark:text-bn-goldLight font-black">
                Rs. 13,900
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
