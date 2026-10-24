import React from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';

export default function ReturnPolicy() {
  return (
    <div className="max-w-[1050px] mx-auto px-[5%] py-12 relative z-10">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
            <RotateCcw size={26} />
          </div>
          <div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block">
              7-DAY CONFIDENCE
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
              Refund & Doorstep Replacement Policy
            </h1>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            We stand behind every appliance we dispatch. If your order arrives defective, damaged during transit, or differing from the model requested, you are covered by our <strong>7-Day Hassle-Free Replacement Guarantee</strong>.
          </p>

          <div className="p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-800/60 border border-bn-borderLight dark:border-bn-borderDark space-y-2">
            <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100">Conditions for Replacement</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex gap-2 items-start"><CheckCircle size={15} className="text-bn-gold flex-shrink-0 mt-0.5" /> Appliance must remain uninstalled in original packing with all internal manuals and cables.</li>
              <li className="flex gap-2 items-start"><CheckCircle size={15} className="text-bn-gold flex-shrink-0 mt-0.5" /> Notification must be sent to our WhatsApp desk (+92 321 2418430) within 7 days of receiving the item.</li>
              <li className="flex gap-2 items-start"><CheckCircle size={15} className="text-bn-gold flex-shrink-0 mt-0.5" /> Doorstep reverse pickup will be arranged at zero shipping cost to the customer.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
