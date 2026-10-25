import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useSiteBranding } from '../../context/SiteBrandingContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCards() {
  const { whatsappNumber, supportPhone, supportEmail, storeAddress, getWhatsAppLink } = useSiteBranding();
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-contact-card',
        { y: 15, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* WHATSAPP CARD */}
      <div className="gsap-contact-card glass-apple-card p-6 sm:p-7 rounded-3xl border border-[#E5E4E2] dark:border-white/10 shadow-sm relative overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10 text-[#6F4E37] dark:text-[#E6EDFD] flex items-center justify-center mb-4 shadow-sm">
          <Phone size={22} />
        </div>
        <span className="text-[11px] font-extrabold text-[#6F4E37] dark:text-[#C49774] uppercase tracking-wider block mb-1">
          FASTEST RESPONSE
        </span>
        <h3 className="font-wix text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          WhatsApp Direct Consultation
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
          Chat directly with our HVAC &amp; home appliance specialists for instant price confirmations, BTU calculation, and delivery dates.
        </p>
        <a
          href={getWhatsAppLink('Salam Binnemat, I need consultation on appliances.')}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 text-white text-xs font-bold no-underline shadow-md transition-all cursor-pointer"
        >
          <Phone size={14} />
          <span>Chat on WhatsApp (+{whatsappNumber})</span>
        </a>
      </div>

      {/* EMAIL & STORE INFO */}
      <div className="gsap-contact-card glass-apple-card p-6 sm:p-7 rounded-3xl border border-[#E5E4E2] dark:border-white/10 shadow-sm space-y-4 text-xs">
        <div className="flex gap-3.5 items-start">
          <div className="w-8 h-8 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 flex items-center justify-center text-[#6F4E37] dark:text-[#E6EDFD] shrink-0 mt-0.5">
            <Mail size={15} />
          </div>
          <div>
            <strong className="block text-sm font-wix font-bold text-slate-900 dark:text-white">Official Correspondence</strong>
            <span className="text-slate-600 dark:text-slate-400">{supportEmail}</span>
          </div>
        </div>

        <div className="flex gap-3.5 items-start">
          <div className="w-8 h-8 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 flex items-center justify-center text-[#6F4E37] dark:text-[#E6EDFD] shrink-0 mt-0.5">
            <MapPin size={15} />
          </div>
          <div>
            <strong className="block text-sm font-wix font-bold text-slate-900 dark:text-white">Store &amp; Dispatch Center</strong>
            <span className="text-slate-600 dark:text-slate-400">{storeAddress}</span>
          </div>
        </div>

        <div className="flex gap-3.5 items-start">
          <div className="w-8 h-8 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 flex items-center justify-center text-[#6F4E37] dark:text-[#E6EDFD] shrink-0 mt-0.5">
            <Clock size={15} />
          </div>
          <div>
            <strong className="block text-sm font-wix font-bold text-slate-900 dark:text-white">Operating Hours</strong>
            <span className="text-slate-600 dark:text-slate-400">Monday - Saturday: 10:00 AM - 9:00 PM (PKT)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
