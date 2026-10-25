import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Truck, CheckCircle } from 'lucide-react';

export default function ShippingPolicy() {
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
            <Truck size={26} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block">
              LOGISTICS PROTOCOLS
            </span>
            <h1 className="font-wix text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
              Nationwide Express Shipping Policy
            </h1>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            Transporting fragile 8mm tempered glass cooktops, heavy porcelain geyser tanks, and balanced fan blades requires specialized care. Binnemat maintains dedicated logistics protocols across Pakistan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#F7F6F4] dark:bg-[#12100E] border border-[#E5E4E2] dark:border-white/10 space-y-2">
              <strong className="block text-sm font-wix text-neutral-900 dark:text-neutral-100 font-bold">Lahore &amp; Rawalpindi/Islamabad</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 m-0">Same-Day or 24-48 Hours Doorstep Delivery via dedicated company vehicles.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F7F6F4] dark:bg-[#12100E] border border-[#E5E4E2] dark:border-white/10 space-y-2">
              <strong className="block text-sm font-wix text-neutral-900 dark:text-neutral-100 font-bold">Karachi, Multan, Faisalabad &amp; Beyond</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 m-0">2 to 4 Business Days Insured Freight Transit across 50+ regional hubs.</p>
            </div>
          </div>

          <h3 className="font-wix text-base font-bold text-neutral-900 dark:text-neutral-100 pt-2">Reinforced Protective Crating</h3>
          <p>
            All built-in glass hobs and electric water heaters are shipped inside high-density polystyrene shock absorbers and reinforced wooden exterior frames. In the rare event of transit damage, we provide 100% free immediate doorstep replacement.
          </p>
        </div>
      </div>
    </div>
  );
}
