import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ContactCards from './ContactCards';
import ContactForm from './ContactForm';
import ContactBtuGuide from './ContactBtuGuide';
import ContactBranches from './ContactBranches';

export default function ContactPage() {
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

  return (
    <div className="max-w-[1360px] mx-auto px-[5%] py-4 sm:py-6 relative z-10">
      <div ref={headerRef} className="text-center max-w-xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10 text-[11px] font-extrabold tracking-widest uppercase text-[#6F4E37] dark:text-[#E6EDFD] mb-3">
          GET IN TOUCH
        </span>
        <h1 className="font-wix text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
          Direct Customer Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
          Have questions regarding geyser capacity, hob dimensions, or 30W BLDC fan savings? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <ContactCards />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>

      {/* EXPANDED SIZING GUIDE & REGIONAL HUBS */}
      <ContactBtuGuide />
      <ContactBranches />
    </div>
  );
}
