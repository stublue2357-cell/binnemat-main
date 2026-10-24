import { useSiteBranding } from '../../context/SiteBrandingContext';
﻿import React, { useState } from 'react';
import { Drawer, Tooltip } from 'antd';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Sun, Moon, PhoneCall, Menu, ShoppingBag } from 'lucide-react';
import Logo from '../common/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { APP_CONFIG } from '../../config/env';

export default function Navbar({ logoSrc }) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState?.location?.pathname || '/';
  const { isDarkMode, toggleTheme } = useTheme();
  const { totalCount, openCart } = useCart();
  const { whatsappNumber } = useSiteBranding();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/faqs', label: 'FAQs' }
  ];

  const handleNavClick = (path) => {
    navigate({ to: path });
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#EFE9DD] dark:bg-[#121214] text-neutral-800 dark:text-bn-goldLight px-[5%] py-2 text-xs font-semibold flex justify-between items-center border-b border-bn-borderLight dark:border-white/10 transition-colors">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-bn-gold animate-pulse inline-block" />
          <span>Official Authorized Distributor Pakistan &bull; 100% Brand Sealed Guarantee</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-neutral-600 dark:text-neutral-300">
          <span>Nationwide Express Logistics</span>
          <span>&bull;</span>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="text-bn-goldDark dark:text-bn-goldLight hover:underline font-bold">
            Support: +92 321 2418430
          </a>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav className="glass-panel bg-white/90 dark:bg-[#121214]/90 border-b border-bn-borderLight dark:border-bn-borderDark px-[5%] py-3.5 flex items-center justify-between shadow-sm transition-colors">
        <Logo logoSrc={logoSrc} onClick={() => handleNavClick('/')} />

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`text-sm transition-colors py-1 relative font-semibold bg-transparent border-none cursor-pointer ${
                isActive(item.path)
                  ? 'text-bn-goldDark dark:text-bn-goldLight font-bold' 
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-bn-gold'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-bn-gold rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* THEME TOGGLE */}
          <Tooltip title={isDarkMode ? "Switch to Luxury Light Mode" : "Switch to Obsidian Dark Mode"}>
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="px-3 py-1.5 rounded-full flex items-center gap-2 border border-bn-borderLight dark:border-bn-borderDark bg-white/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-bn-gold transition-all text-xs font-bold cursor-pointer shadow-sm"
            >
              {isDarkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-neutral-700" />}
              <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          </Tooltip>

          {/* SHOPPING CART BUTTON WITH LIVE BADGE */}
          <button
            onClick={openCart}
            aria-label="View Shopping Cart"
            className="relative p-2 rounded-full border border-bn-borderLight dark:border-bn-borderDark bg-white/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-bn-gold transition-all cursor-pointer flex items-center justify-center shadow-sm"
          >
            <ShoppingBag size={18} />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-gradient-to-r from-bn-gold to-bn-goldDark text-white text-[11px] font-black rounded-full flex items-center justify-center px-1 shadow-md border-2 border-white dark:border-[#121214] animate-pulse">
                {totalCount}
              </span>
            )}
          </button>

          {/* WHATSAPP CONSULTATION */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Salam%20Binnemat`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-bn-gold to-bn-goldDark text-white px-4 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 no-underline"
          >
            <PhoneCall size={14} />
            <span>WhatsApp Order</span>
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-1.5 text-neutral-800 dark:text-neutral-200 bg-transparent border-none cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <Drawer
        title="Binnemat Menu"
        placement="right"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
      >
        <div className="flex flex-col gap-4 py-2">
          {/* MOBILE CART SHORTCUT */}
          <button
            onClick={() => {
              setMobileDrawerOpen(false);
              openCart();
            }}
            className="flex items-center justify-between p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 font-bold text-sm cursor-pointer border-none text-neutral-900 dark:text-neutral-100"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-bn-gold" />
              <span>Shopping Cart</span>
            </span>
            <span className="bg-bn-gold text-white text-xs font-black px-2.5 py-0.5 rounded-full">
              {totalCount}
            </span>
          </button>

          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className="text-lg font-bold text-neutral-800 dark:text-neutral-100 cursor-pointer border-b border-neutral-100 dark:border-neutral-800 pb-2"
            >
              {item.label}
            </div>
          ))}

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-bn-gold text-white py-3 rounded-xl font-bold text-sm no-underline"
          >
            <PhoneCall size={16} />
            <span>WhatsApp: +92 321 2418430</span>
          </a>
        </div>
      </Drawer>
    </header>
  );
}
