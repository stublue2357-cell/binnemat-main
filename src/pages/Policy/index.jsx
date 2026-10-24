import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import PolicyContent from './PolicyContent';
import { ShieldCheck, Truck, RotateCcw, Lock, FileText } from 'lucide-react';

export default function PolicyPage() {
  const navigate = useNavigate();

  const policyLinks = [
    { name: 'Warranty Policy', path: '/warranty-policy', icon: <ShieldCheck size={16} /> },
    { name: 'Shipping Policy', path: '/shipping-policy', icon: <Truck size={16} /> },
    { name: 'Return & Refund', path: '/return-policy', icon: <RotateCcw size={16} /> },
    { name: 'Privacy Policy', path: '/privacy-policy', icon: <Lock size={16} /> },
    { name: 'Terms of Service', path: '/terms-conditions', icon: <FileText size={16} /> }
  ];

  return (
    <div className="max-w-[1050px] mx-auto px-[5%] py-12 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-2">
          LEGAL, WARRANTY & LOGISTICS
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
          Official Binnemat Policies
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-bn-borderDark text-neutral-800 dark:text-neutral-200 hover:border-bn-gold hover:text-bn-goldDark dark:hover:text-bn-gold transition-colors cursor-pointer shadow-sm"
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
