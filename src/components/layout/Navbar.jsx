import React, { useState } from 'react';
import { Drawer } from 'antd';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { ShoppingBag, Menu, Sparkles, MessageCircle, X, Sun, Moon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSiteBranding } from '../../context/SiteBrandingContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ logoSrc }) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState?.location?.pathname || '/';
  const { totalCount, openCart } = useCart();
  const { whatsappNumber } = useSiteBranding();
  const { isDarkMode, toggleTheme } = useTheme();
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
    <>
      {/* FLOATING TOP-CENTER PILL NAVBAR (LUXURY LIGHT & DARK EDITION) */}
      <header className="fixed top-4 md:top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[1080px] pointer-events-auto transition-all duration-300">
        <nav className="glass-apple bg-white/85 dark:bg-[#111018]/90 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.1] rounded-full px-4 sm:px-6 py-2.5 shadow-[0_12px_40px_rgba(115,34,242,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center justify-between">
          {/* BRAND LOGO / SACRED GEOMETRY MARK */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer group text-left p-0"
            aria-label="Binnemat Home"
          >
            {/* Glowing Torus Glyph */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6F4E37] to-[#8C6547] flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(111,78,55,0.3)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#111018] flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#6F4E37] animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-wix font-extrabold text-lg tracking-tight text-slate-900 dark:text-white lowercase leading-none">
                binnemat
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#C49774] uppercase mt-0.5 font-bold">
                Thermal &bull; Inverter
              </span>
            </div>
          </button>

          {/* DESKTOP PILL LINKS */}
          <div className="hidden lg:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] p-1 rounded-full border border-black/[0.04] dark:border-white/[0.06]">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer border-none ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#6F4E37]/15 to-[#8C6547]/15 text-[#6F4E37] dark:text-[#E5E4E2] font-bold border border-[#6F4E37]/30 shadow-sm'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* RIGHT ACTION CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* THEME TOGGLE BUTTON (LIGHT / DARK SWITCHER) */}
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/[0.03] dark:bg-white/[0.08] hover:bg-black/[0.06] dark:hover:bg-white/[0.14] border border-black/[0.06] dark:border-white/[0.1] text-slate-700 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-center shadow-sm hover:scale-105 active:scale-95"
            >
              {isDarkMode ? (
                <Sun size={15} className="text-amber-400 animate-pulse" />
              ) : (
                <Moon size={15} className="text-[#6F4E37]" />
              )}
            </button>

            {/* CART BADGE BUTTON */}
            <button
              onClick={openCart}
              aria-label="View Shopping Cart"
              className="relative px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.08] hover:bg-black/[0.06] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-white/[0.1] text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <ShoppingBag size={14} className="text-[#6F4E37] dark:text-[#C49774]" />
              <span className="hidden sm:inline text-slate-700 dark:text-slate-200">Cart</span>
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] text-white text-[10px] font-black flex items-center justify-center shadow-[0_0_8px_rgba(111,78,55,0.4)]">
                {totalCount}
              </span>
            </button>

            {/* WHATSAPP ACTION BUTTON */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Salam%20Binnemat,%20I%20would%20like%20to%20explore%20your%20premium%20appliances`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 text-white font-bold text-xs tracking-wide transition-all shadow-[0_4px_18px_rgba(111,78,55,0.35)] no-underline cursor-pointer"
            >
              <MessageCircle size={13} />
              <span>WhatsApp</span>
            </a>

            {/* MOBILE HAMBURGER TOGGLE */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 text-slate-800 dark:text-slate-200 bg-black/[0.03] dark:bg-white/[0.08] rounded-full border border-black/[0.06] dark:border-white/[0.1] cursor-pointer"
              aria-label="Open Mobile Menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE LUXURY LIGHT & DARK DRAWER */}
      <Drawer
        placement="top"
        height="100vh"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        closable={false}
        className="!p-0"
        styles={{ body: { backgroundColor: isDarkMode ? '#110F0E' : '#FAF9F7', padding: '24px' } }}
      >
        <div className="flex flex-col h-full justify-between text-slate-900 dark:text-white">
          <div>
            {/* TOP BAR IN DRAWER */}
            <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6F4E37] to-[#8C6547] flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#110F0E] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-[#6F4E37]" />
                  </div>
                </div>
                <span className="font-wix font-extrabold text-xl lowercase text-slate-900 dark:text-white">binnemat</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile Drawer Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  className="w-9 h-9 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-slate-700 dark:text-slate-200 border-none cursor-pointer"
                >
                  {isDarkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-[#6F4E37]" />}
                </button>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white border-none cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* DRAWER LINKS */}
            <div className="flex flex-col gap-4 py-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left text-2xl font-wix font-bold py-2 bg-transparent border-none cursor-pointer transition-colors ${
                    isActive(item.path)
                      ? 'text-[#6F4E37] dark:text-[#C49774]'
                      : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* BOTTOM DRAWER ACTIONS */}
          <div className="flex flex-col gap-3 pb-6">
            <button
              onClick={() => {
                setMobileDrawerOpen(false);
                openCart();
              }}
              className="w-full py-3.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={16} className="text-[#6F4E37] dark:text-[#C49774]" />
              <span>Shopping Cart ({totalCount})</span>
            </button>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] text-white font-bold text-sm flex items-center justify-center gap-2 no-underline text-center shadow-[0_4px_20px_rgba(111,78,55,0.35)]"
            >
              <MessageCircle size={16} />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </Drawer>
    </>
  );
}
