import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RotateCcw, CheckCircle } from 'lucide-react';

export default function ReturnPolicy() {
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
            <RotateCcw size={26} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block">
              7-DAY CONFIDENCE
            </span>
            <h1 className="font-wix text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
              Refund &amp; Doorstep Replacement Policy
            </h1>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            We stand behind every appliance we dispatch. If your order arrives defective, damaged during transit, or differing from the model requested, you are covered by our <strong>7-Day Hassle-Free Replacement Guarantee</strong>.
          </p>

          <div className="p-5 rounded-2xl bg-[#F7F6F4] dark:bg-[#12100E] border border-[#E5E4E2] dark:border-white/10 space-y-2">
            <h3 className="font-wix text-base font-bold text-neutral-900 dark:text-neutral-100">Conditions for Replacement</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex gap-2 items-start"><CheckCircle size={15} className="text-[#6F4E37] dark:text-[#C49774] flex-shrink-0 mt-0.5" /> Appliance must remain uninstalled in original packing with all internal manuals and cables.</li>
              <li className="flex gap-2 items-start"><CheckCircle size={15} className="text-[#6F4E37] dark:text-[#C49774] flex-shrink-0 mt-0.5" /> Notification must be sent to our WhatsApp desk (+92 321 2418430) within 7 days of receiving the item.</li>
              <li className="flex gap-2 items-start"><CheckCircle size={15} className="text-[#6F4E37] dark:text-[#C49774] flex-shrink-0 mt-0.5" /> Doorstep reverse pickup will be arranged at zero shipping cost to the customer.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
