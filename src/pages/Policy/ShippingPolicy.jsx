import React from 'react';
import { Truck, CheckCircle } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="max-w-[1050px] mx-auto px-[5%] py-12 relative z-10">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
            <Truck size={26} />
          </div>
          <div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block">
              LOGISTICS PROTOCOLS
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
              Nationwide Express Shipping Policy
            </h1>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            Transporting fragile 8mm tempered glass cooktops, heavy porcelain geyser tanks, and balanced fan blades requires specialized care. Binnemat maintains dedicated logistics protocols across Pakistan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-800/60 border border-bn-borderLight dark:border-bn-borderDark space-y-2">
              <strong className="block text-sm text-neutral-900 dark:text-neutral-100">Lahore & Rawalpindi/Islamabad</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 m-0">Same-Day or 24-48 Hours Doorstep Delivery via dedicated company vehicles.</p>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-800/60 border border-bn-borderLight dark:border-bn-borderDark space-y-2">
              <strong className="block text-sm text-neutral-900 dark:text-neutral-100">Karachi, Multan, Faisalabad & Beyond</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 m-0">2 to 4 Business Days Insured Freight Transit across 50+ regional hubs.</p>
            </div>
          </div>

          <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 pt-2">Reinforced Protective Crating</h3>
          <p>
            All built-in glass hobs and electric water heaters are shipped inside high-density polystyrene shock absorbers and reinforced wooden exterior frames. In the rare event of transit damage, we provide 100% free immediate doorstep replacement.
          </p>
        </div>
      </div>
    </div>
  );
}
