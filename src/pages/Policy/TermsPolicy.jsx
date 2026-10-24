import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsPolicy() {
  return (
    <div className="max-w-[1050px] mx-auto px-[5%] py-12 relative z-10">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
            <FileText size={26} />
          </div>
          <div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block">
              TERMS OF SERVICE
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
              Terms & Installation Conditions
            </h1>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            Electric geysers and built-in glass hobs must be installed by certified technicians adhering to standard safety codes. Electric geysers require proper electrical earth grounding and dedicated 16A breaker connections.
          </p>
          <p>
            Cash on Delivery (COD) orders require telephonic verification prior to nationwide cargo dispatch. Prices are subject to official manufacturer revisions during rapid market updates.
          </p>
        </div>
      </div>
    </div>
  );
}
