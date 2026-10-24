import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import Logo from '../common/Logo';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useSiteBranding } from '../../context/SiteBrandingContext';

export default function Footer({ logoSrc }) {
  const navigate = useNavigate();
  const { whatsappNumber, supportEmail, storeAddress, getWhatsAppLink } = useSiteBranding();

  const handleNav = (path) => {
    navigate({ to: path });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const policyLinks = [
    { label: 'Official Warranty Policy', path: '/warranty-policy' },
    { label: 'Shipping & Express Delivery', path: '/shipping-policy' },
    { label: 'Refund & 7-Day Return Policy', path: '/return-policy' },
    { label: 'Privacy & Data Protection', path: '/privacy-policy' },
    { label: 'Terms & Installation Rules', path: '/terms-conditions' }
  ];

  return (
    <footer className="bg-[#ECE5D8] dark:bg-[#121214] text-neutral-800 dark:text-neutral-100 pt-16 pb-8 border-t border-bn-borderLight dark:border-white/10 relative z-10 transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-[5%] grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* COL 1: BRAND INFO */}
        <div>
          <div className="mb-4">
            <Logo logoSrc={logoSrc} onClick={() => handleNav('/')} />
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 max-w-sm">
            Pakistan's premier authorized supplier of high-efficiency Electric Geysers, Italian built-in glass hobs, and energy-saving 30W BLDC inverter fans. Official factory-stamped warranties guaranteed.
          </p>
          <div className="flex flex-col gap-3 text-sm text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-bn-goldDark dark:text-bn-gold" />
              <a
                href={getWhatsAppLink('Salam Binnemat, I need support regarding appliances.')}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-800 dark:text-neutral-200 hover:text-bn-gold transition-colors font-medium"
              >
                +{whatsappNumber} (Direct WhatsApp Support)
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-bn-goldDark dark:text-bn-gold" />
              <span>{supportEmail}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin size={16} className="text-bn-goldDark dark:text-bn-gold shrink-0" />
              <span>{storeAddress}</span>
            </div>
          </div>
        </div>

        {/* COL 2: QUICK LINKS */}
        <div>
          <h4 className="font-cinzel text-neutral-900 dark:text-bn-goldLight text-base font-bold mb-5 tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
            {[
              { path: '/', label: 'Home' },
              { path: '/categories', label: 'All Appliances' },
              { path: '/category/winter-collection', label: 'Winter Geysers Collection' },
              { path: '/category/summer-collection', label: 'Summer BLDC Fans' },
              { path: '/category/stoves-hobs', label: 'Stoves & Built-in Hobs' },
              { path: '/about', label: 'About Binnemat' },
              { path: '/contact', label: 'Contact Us' },
              { path: '/faqs', label: 'FAQs' }
            ].map(link => (
              <li key={link.path}>
                <button 
                  onClick={() => handleNav(link.path)} 
                  className="hover:text-bn-gold transition-colors text-left bg-transparent border-none cursor-pointer p-0"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3: STANDALONE POLICY PAGES */}
        <div>
          <h4 className="font-cinzel text-neutral-900 dark:text-bn-goldLight text-base font-bold mb-5 tracking-wide">
            Certified Customer Policies
          </h4>
          <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
            {policyLinks.map(link => (
              <li key={link.path}>
                <button 
                  onClick={() => handleNav(link.path)} 
                  className="hover:text-bn-gold transition-colors text-left bg-transparent border-none cursor-pointer p-0"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COPYRIGHT BOTTOM BAR */}
      <div className="max-w-[1360px] mx-auto px-[5%] pt-8 border-t border-bn-borderLight dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p className="m-0">&copy; {new Date().getFullYear()} Binnemat Pakistan. All Rights Reserved.</p>
        <p className="m-0 font-urdu text-sm font-bold text-bn-goldDark dark:text-bn-goldLight">
          ہر گھر کا سکون — بااعتماد الیکٹرک واٹر ہیٹرز اور ہوم ایپلائینسز
        </p>
      </div>
    </footer>
  );
}
