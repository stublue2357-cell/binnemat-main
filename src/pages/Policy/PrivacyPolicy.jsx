import React from 'react';
import { Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-[1050px] mx-auto px-[5%] py-12 relative z-10">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
            <Lock size={26} />
          </div>
          <div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block">
              DATA SECURITY
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
              Customer Privacy & Confidentiality
            </h1>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            Binnemat values your privacy. Personal information collected during order placement (such as phone numbers, delivery addresses, and invoice names) is strictly utilized for courier delivery coordination and official warranty stamping.
          </p>
          <p>
            We do not sell, rent, or disclose personal customer data to third-party telemarketing firms. All WhatsApp order chats are secured and handled strictly by verified Binnemat staff.
          </p>
        </div>
      </div>
    </div>
  );
}
