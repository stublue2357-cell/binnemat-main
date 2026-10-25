import React, { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Truck, RotateCcw, Lock, FileText, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PolicyContent() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-policy-card',
        { y: 15, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const policies = [
    {
      id: 'warranty',
      path: '/warranty-policy',
      title: 'Official Warranty Policy',
      badge: '100% BRAND SEALED',
      icon: <ShieldCheck size={28} className="text-bn-goldDark dark:text-bn-gold" />,
      summary: 'Every electric geyser, built-in hob, and BLDC fan is sourced through authorized distributor channels with manufacturer-stamped warranty cards.',
      points: [
        'Storage Geysers: 5-7 Years official tank warranty against corrosion.',
        'Instant Geysers: 2 Years electrical & copper heat exchanger warranty.',
        'BLDC Inverter Fans: 2 Years full motor replacement warranty.',
        'Tempered Glass Hobs: 1-2 Years burner & auto-ignition warranty.'
      ]
    },
    {
      id: 'shipping',
      path: '/shipping-policy',
      title: 'Nationwide Express Shipping Policy',
      badge: 'SAFE DOORSTEP TRANSIT',
      icon: <Truck size={28} className="text-bn-goldDark dark:text-bn-gold" />,
      summary: 'Specialized reinforced crating for heavy geysers and fragile 8mm tempered glass cooktops dispatched across 50+ Pakistani cities.',
      points: [
        'Lahore & Twin Cities: 24 to 48 hours doorstep dispatch.',
        'Karachi & Regional Hubs: 2 to 4 business days insured freight.',
        'Protective Packaging: High-density foam buffers & timber crating.',
        'Pre-Delivery Inspection: Customer verification prior to dispatch slip.'
      ]
    },
    {
      id: 'return',
      path: '/return-policy',
      title: 'Refund & 7-Day Replacement Guarantee',
      badge: 'PEACE OF MIND',
      icon: <RotateCcw size={28} className="text-bn-goldDark dark:text-bn-gold" />,
      summary: 'If your appliance arrives with transit damage or differing specifications, we provide immediate 1-to-1 replacement within 7 business days.',
      points: [
        '7-Day Doorstep Replacement: Valid on uninstalled original units.',
        'Zero Restocking Fee: Full replacement for transit-damaged items.',
        'Dedicated Courier Pickup: Coordinated seamlessly via WhatsApp.'
      ]
    },
    {
      id: 'privacy',
      path: '/privacy-policy',
      title: 'Customer Data Privacy & Confidentiality',
      badge: 'ENCRYPTED & PRIVATE',
      icon: <Lock size={28} className="text-bn-goldDark dark:text-bn-gold" />,
      summary: 'Customer telephone numbers and shipping addresses are strictly utilized for delivery coordination and official warranty activation.',
      points: [
        'Zero Data Sharing: We never sell customer records to telemarketers.',
        'Encrypted Invoicing: Secure corporate payment tracking and receipts.'
      ]
    },
    {
      id: 'terms',
      path: '/terms-conditions',
      title: 'Installation Terms & Safe Operation',
      badge: 'SAFETY PROTOCOLS',
      icon: <FileText size={28} className="text-bn-goldDark dark:text-bn-gold" />,
      summary: 'Safe usage and professional installation requirements for high-power electric water heaters and gas-line built-in kitchen hobs.',
      points: [
        'Electric Geysers: Must be connected with dedicated 16A earthing breaker.',
        'Built-in Glass Hobs: Requires professional countertop cutting & gas sealing.'
      ]
    }
  ];

  return (
    <div ref={containerRef} className="space-y-6">
      {policies.map((p) => (
        <section
          key={p.id}
          className="gsap-policy-card glass-apple-card p-6 sm:p-8 rounded-3xl border border-[#E5E4E2] dark:border-white/10 bg-white/95 dark:bg-[#161311]/95 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E6EDFD] dark:bg-[#6F4E37]/20 text-[#6F4E37] dark:text-[#E6EDFD] flex items-center justify-center flex-shrink-0">
                {p.icon}
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block">
                  {p.badge}
                </span>
                <h2 className="font-wix text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
                  {p.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                navigate({ to: p.path });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6F4E37] dark:text-[#E6EDFD] hover:underline bg-transparent border-none cursor-pointer self-start sm:self-center"
            >
              <span>Read Full Policy</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4 font-normal">
            {p.summary}
          </p>

          <div className="p-4 rounded-2xl bg-[#F7F6F4] dark:bg-[#12100E] border border-[#E5E4E2] dark:border-white/10">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 m-0 pl-4 list-disc">
              {p.points.map((pt, idx) => (
                <li key={idx} className="leading-snug">
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
