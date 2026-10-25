import React, { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import gsap from 'gsap';
import PolicyContent from './PolicyContent';
import { ShieldCheck, Truck, RotateCcw, Lock, FileText } from 'lucide-react';

export default function PolicyPage() {
  const navigate = useNavigate();
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const policyLinks = [
    { name: 'Warranty Policy', path: '/warranty-policy', icon: <ShieldCheck size={16} /> },
    { name: 'Shipping Policy', path: '/shipping-policy', icon: <Truck size={16} /> },
    { name: 'Return & Refund', path: '/return-policy', icon: <RotateCcw size={16} /> },
    { name: 'Privacy Policy', path: '/privacy-policy', icon: <Lock size={16} /> },
    { name: 'Terms of Service', path: '/terms-conditions', icon: <FileText size={16} /> }
  ];

  return (
    <div className="max-w-[1050px] mx-auto px-[5%] py-4 sm:py-6 relative z-10">
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10 text-[11px] font-extrabold tracking-widest uppercase text-[#6F4E37] dark:text-[#E6EDFD] mb-3">
          LEGAL, WARRANTY &amp; LOGISTICS
        </span>
        <h1 className="font-wix text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
          Official Binnemat Policies
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
          Transparent guidelines for official factory warranties, express appliance transit, and customer protection.
        </p>

        {/* QUICK JUMP PILLS TO STANDALONE POLICY PAGES */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {policyLinks.map((p) => (
            <button
              key={p.path}
              onClick={() => {
                navigate({ to: p.path });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold glass-apple-card border border-[#E5E4E2] dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-[#6F4E37]/50 hover:text-[#6F4E37] dark:hover:text-[#E6EDFD] transition-colors cursor-pointer shadow-sm"
            >
              {p.icon}
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <PolicyContent />
    </div>
  );
}
