import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from 'antd';
import { PhoneCall } from 'lucide-react';
import { APP_CONFIG } from '../../config/env';

gsap.registerPlugin(ScrollTrigger);

export default function FaqCta() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ctaRef} className="mt-12 text-center glass-apple-card p-8 sm:p-10 rounded-3xl border border-[#E5E4E2] dark:border-white/10 shadow-sm relative overflow-hidden">
      <h3 className="font-wix text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
        Still Have Specific Questions?
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
        Our customer support team is on standby to assist with room BTU calculations, genuine warranty verification, and bulk orders.
      </p>
      <Button
        type="primary"
        icon={<PhoneCall size={16} />}
        href={APP_CONFIG.DEVELOPER_WHATSAPP}
        target="_blank"
        className="rounded-full h-11 px-7 font-bold bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 border-none text-white shadow-md inline-flex items-center gap-2"
      >
        Ask on WhatsApp (+92 321 2418430)
      </Button>
    </div>
  );
}
