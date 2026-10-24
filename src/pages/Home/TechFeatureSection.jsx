import React from 'react';
import { Check, Flame, ArrowRight } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';
import { APP_CONFIG } from '../../config/env';

export default function TechFeatureSection() {
  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-16">
      <div className="glass-panel p-6 md:p-10 rounded-3xl border-2 border-bn-borderLight dark:border-bn-borderDark bg-white/80 dark:bg-[#18181B]/85 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xl">
        {/* IMAGE COLUMN WITH STEAM PHOTOGRAPHY */}
        <div className="md:col-span-5 h-72 md:h-88 bg-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-lg group">
          <img 
            src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-instant.jpg" 
            alt="Binnemat Instant FastHeat Electric Geyser"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 bg-neutral-950/85 backdrop-blur-md text-bn-goldLight text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 border border-bn-gold/30">
            <Flame size={14} className="text-amber-400" />
            <span>3-Second Continuous Steam</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/90 backdrop-blur-md text-white p-3 rounded-xl flex items-center justify-between border border-white/10 text-xs">
            <span className="text-neutral-300">FastHeat 9kW Digital</span>
            <strong className="text-bn-goldLight font-black">Rs. 24,800</strong>
          </div>
        </div>

        {/* MARKETING DETAILS COLUMN */}
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-xs font-black uppercase mb-2">
            <span>SUI GAS WINTER CRISIS SOLVED</span>
          </div>

          <h2 className="font-cinzel text-2xl md:text-3xl font-black text-neutral-900 dark:text-neutral-100 mb-3 leading-tight">
            Instant Hot Water in 3 Seconds. <br />
            <span className="text-bn-goldDark dark:text-bn-goldLight">Zero Gas Dependence.</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed max-w-lg">
            Say goodbye to frozen winter mornings and zero Sui gas pressure. Heats water automatically on-demand with pure copper dual-circuit elements.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
            <div className="p-3.5 rounded-xl bg-white/70 dark:bg-neutral-800/50 border border-bn-borderLight dark:border-bn-borderDark flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-bn-gold text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} />
              </span>
              <div>
                <strong className="block text-neutral-900 dark:text-neutral-100 font-bold">Continuous 3-Sec Hot Water</strong>
                <span className="text-neutral-500">Endless flow directly from the tap</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/70 dark:bg-neutral-800/50 border border-bn-borderLight dark:border-bn-borderDark flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-bn-gold text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} />
              </span>
              <div>
                <strong className="block text-neutral-900 dark:text-neutral-100 font-bold">Incoloy 840 Hard Water Shield</strong>
                <span className="text-neutral-500">Impervious to bore water calcium</span>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=Salam%20Binnemat,%20I%20want%20to%20order%20the%20Instant%20FastHeat%20Geyser`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bn-gold hover:bg-bn-goldDark text-white font-bold text-xs shadow-md transition-all no-underline"
          >
            <span>Order Instant Geyser via WhatsApp</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
