import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useSiteBranding } from '../../context/SiteBrandingContext';

export default function ContactCards() {
  const { whatsappNumber, supportPhone, supportEmail, storeAddress, getWhatsAppLink } = useSiteBranding();

  return (
    <div className="space-y-6">
      {/* WHATSAPP CARD */}
      <div className="glass-panel p-6 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center mb-4">
          <Phone size={22} />
        </div>
        <span className="text-xs font-bold text-bn-goldDark dark:text-bn-goldLight uppercase tracking-wider block mb-1">
          FASTEST RESPONSE
        </span>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          WhatsApp Direct Consultation
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
          Chat directly with our HVAC & home appliance specialists for instant price confirmations, BTU calculation, and delivery dates.
        </p>
        <a
          href={getWhatsAppLink('Salam Binnemat, I need consultation on appliances.')}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-bn-gold to-bn-goldDark text-white text-xs font-bold no-underline shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <Phone size={14} />
          <span>Chat on WhatsApp (+{whatsappNumber})</span>
        </a>
      </div>

      {/* EMAIL & STORE INFO */}
      <div className="glass-panel p-6 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-sm space-y-4 text-xs">
        <div className="flex gap-3 items-start">
          <Mail size={18} className="text-bn-gold flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm text-neutral-900 dark:text-neutral-100">Official Correspondence</strong>
            <span className="text-neutral-600 dark:text-neutral-400">{supportEmail}</span>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <MapPin size={18} className="text-bn-gold flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm text-neutral-900 dark:text-neutral-100">Store & Dispatch Center</strong>
            <span className="text-neutral-600 dark:text-neutral-400">{storeAddress}</span>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <Clock size={18} className="text-bn-gold flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm text-neutral-900 dark:text-neutral-100">Operating Hours</strong>
            <span className="text-neutral-600 dark:text-neutral-400">Monday - Saturday: 10:00 AM - 9:00 PM (PKT)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
