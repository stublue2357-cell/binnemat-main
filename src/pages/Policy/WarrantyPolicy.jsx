import React from 'react';
import { ShieldCheck, PhoneCall, CheckCircle } from 'lucide-react';
import { APP_CONFIG } from '../../config/env';

export default function WarrantyPolicy() {
  return (
    <div className="max-w-[1050px] mx-auto px-[5%] py-12 relative z-10">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
            <ShieldCheck size={26} />
          </div>
          <div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block">
              OFFICIAL CERTIFICATION
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
              Official Brand Warranty & Claim Policy
            </h1>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            At <strong>Binnemat</strong>, every electric geyser, cooking hob, and BLDC fan is sourced exclusively through authorized corporate channels. We guarantee 100% brand-sealed original equipment accompanied by official manufacturer warranty cards stamped with your dispatch date.
          </p>

          <div className="p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-800/60 border border-bn-borderLight dark:border-bn-borderDark space-y-3">
            <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100">Specific Product Coverage Breakdown</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex gap-2.5 items-start">
                <CheckCircle size={16} className="text-bn-gold flex-shrink-0 mt-0.5" />
                <span><strong>Electric Storage Geysers:</strong> 5 to 7 Years official tank warranty against rust and scaling. 1 to 2 Years warranty on Italian Incoloy heating elements and thermostats.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle size={16} className="text-bn-gold flex-shrink-0 mt-0.5" />
                <span><strong>Instant Digital Geysers:</strong> 2 Years official warranty covering copper heat exchangers, flow sensors, and automatic safety cutoff switches.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle size={16} className="text-bn-gold flex-shrink-0 mt-0.5" />
                <span><strong>BLDC Inverter Ceiling Fans:</strong> 2 Years full replacement warranty covering pure copper brushless motors and RF remote receivers.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle size={16} className="text-bn-gold flex-shrink-0 mt-0.5" />
                <span><strong>Tempered Glass Built-in Hobs:</strong> 1 to 2 Years warranty on cast iron pan trivets, brass burner caps, and pulse ignition switches.</span>
              </li>
            </ul>
          </div>

          <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 pt-2">How to Lodge an Official Claim</h3>
          <p>
            To initiate an authorized technician home visit, simply message our dedicated warranty desk on WhatsApp at <strong>+92 321 2418430</strong> with a photo of your stamped warranty card and purchase invoice.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <a
              href={`https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=Salam%20Binnemat,%20I%20need%20warranty%20claim%20assistance`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bn-gold text-white font-bold text-xs shadow-md no-underline"
            >
              <PhoneCall size={15} />
              <span>Contact Warranty Desk (+92 321 2418430)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
