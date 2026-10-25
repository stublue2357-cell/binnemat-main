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
    <footer className="bg-[#F7F6F4] dark:bg-[#0E0C0B] text-slate-700 dark:text-slate-300 pt-16 pb-8 border-t border-[#E5E4E2] dark:border-white/[0.08] relative z-10 transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-[5%] grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* COL 1: BRAND INFO */}
        <div>
          <div className="mb-4">
            <Logo logoSrc={logoSrc} onClick={() => handleNav('/')} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm font-normal">
            Pakistan's authorized supplier of high-efficiency Electric Geysers, 30W BLDC inverter fans, and Italian built-in glass hobs with official factory warranties.
          </p>
          <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-[#6F4E37] dark:text-[#C49774]" />
              <a
                href={getWhatsAppLink('Salam Binnemat, I need support regarding appliances.')}
                target="_blank"
                rel="noreferrer"
                className="text-slate-800 dark:text-slate-200 hover:text-[#6F4E37] dark:hover:text-[#E6EDFD] transition-colors font-semibold"
              >
                +{whatsappNumber} (Direct Customer Support)
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={15} className="text-[#6F4E37] dark:text-[#C49774]" />
              <span>{supportEmail}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin size={15} className="text-[#6F4E37] dark:text-[#C49774] shrink-0" />
              <span>{storeAddress}</span>
            </div>
          </div>
        </div>

        {/* COL 2: QUICK LINKS */}
        <div>
          <h4 className="font-wix text-slate-900 dark:text-white text-sm font-bold mb-4 tracking-tight">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {[
              { path: '/', label: 'Home' },
              { path: '/categories', label: 'All Categories' },
              { path: '/category/winter-collection', label: 'Winter Geysers Collection' },
              { path: '/category/summer-collection', label: 'Summer 30W BLDC Fans' },
              { path: '/category/stoves-hobs', label: 'Stoves & Built-in Hobs' },
              { path: '/about', label: 'About Us' },
              { path: '/contact', label: 'Contact Us' },
              { path: '/faqs', label: 'FAQs & Support' }
            ].map(link => (
              <li key={link.path}>
                <button 
                  onClick={() => handleNav(link.path)} 
                  className="hover:text-[#6F4E37] dark:hover:text-[#E6EDFD] transition-colors text-left bg-transparent border-none cursor-pointer p-0"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3: STANDALONE POLICY PAGES */}
        <div>
          <h4 className="font-wix text-slate-900 dark:text-white text-sm font-bold mb-4 tracking-tight">
            Customer Policies
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {policyLinks.map(link => (
              <li key={link.path}>
                <button 
                  onClick={() => handleNav(link.path)} 
                  className="hover:text-[#6F4E37] dark:hover:text-[#E6EDFD] transition-colors text-left bg-transparent border-none cursor-pointer p-0"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COPYRIGHT BOTTOM BAR */}
      <div className="max-w-[1360px] mx-auto px-[5%] pt-8 border-t border-[#E5E4E2] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p className="m-0">&copy; {new Date().getFullYear()} Binnemat Pakistan. All Rights Reserved.</p>
        <p className="m-0 font-urdu text-sm font-bold text-[#6F4E37] dark:text-[#C49774]">
          ہر گھر کا سکون — بااعتماد الیکٹرک واٹر ہیٹرز اور ہوم ایپلائینسز
        </p>
      </div>
    </footer>
  );
}
