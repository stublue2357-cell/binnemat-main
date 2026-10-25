import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FileText } from 'lucide-react';

export default function TermsPolicy() {
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
            <FileText size={26} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block">
              TERMS OF SERVICE
            </span>
            <h1 className="font-wix text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
              Terms &amp; Installation Conditions
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
