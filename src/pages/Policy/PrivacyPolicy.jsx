import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-[1050px] mx-auto px-[5%] py-4 sm:py-6 relative z-10">
      <div ref={cardRef} className="glass-apple-card p-8 sm:p-12 rounded-3xl border border-[#E5E4E2] dark:border-white/10 bg-white/95 dark:bg-[#161311]/95 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E6EDFD] text-[#6F4E37] dark:bg-[#6F4E37]/20 dark:text-[#E6EDFD] flex items-center justify-center">
            <Lock size={26} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block">
              DATA SECURITY
            </span>
            <h1 className="font-wix text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
              Customer Privacy &amp; Confidentiality
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
