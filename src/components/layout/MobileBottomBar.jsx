import React from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Home, LayoutGrid, ShoppingBag, MessageCircle, PhoneCall } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSiteBranding } from '../../context/SiteBrandingContext';

export default function MobileBottomBar() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState?.location?.pathname || '/';
  const { totalCount, openCart } = useCart();
  const { whatsappNumber, supportPhone } = useSiteBranding();

  const isHome = currentPath === '/';
  const isCategories = currentPath.startsWith('/categories') || currentPath.startsWith('/category');

  const handleNav = (path) => {
    navigate({ to: path });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-apple bg-white/94 dark:bg-[#12100E]/94 backdrop-blur-2xl border-t border-black/[0.08] dark:border-white/[0.1] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.7)] px-2 pt-1.5 pb-2 transition-all duration-300"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center text-center">
        {/* 1. HOME */}
        <button
          onClick={() => handleNav('/')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-xl transition-all cursor-pointer border-none bg-transparent ${
            isHome
              ? 'text-[#6F4E37] dark:text-[#E5E4E2] font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-label="Home"
        >
          <Home size={19} className={isHome ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
          <span className="text-[10px] tracking-tight leading-none font-wix">Home</span>
        </button>

        {/* 2. CATEGORIES */}
        <button
          onClick={() => handleNav('/categories')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-xl transition-all cursor-pointer border-none bg-transparent ${
            isCategories
              ? 'text-[#6F4E37] dark:text-[#E5E4E2] font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-label="Categories"
        >
          <LayoutGrid size={19} className={isCategories ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
          <span className="text-[10px] tracking-tight leading-none font-wix">Catalog</span>
        </button>

        {/* 3. CART (WITH LIVE BADGE) */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-xl transition-all cursor-pointer border-none bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white relative"
          aria-label="Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag size={19} className="stroke-[1.8]" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] text-white text-[9px] font-black flex items-center justify-center shadow-sm">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight leading-none font-wix">Cart</span>
        </button>

        {/* 4. WHATSAPP INSTANT CONSULTATION */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Salam%20Binnemat,%20I%20am%20browsing%20appliances%20and%20need%20quick%20assistance.`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-xl transition-all cursor-pointer no-underline text-emerald-600 dark:text-emerald-400 hover:brightness-110"
          aria-label="WhatsApp Helpline"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/15 dark:bg-emerald-400/20 flex items-center justify-center">
            <MessageCircle size={15} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-[10px] tracking-tight leading-none font-wix font-bold">WhatsApp</span>
        </a>

        {/* 5. DIRECT CALL */}
        <a
          href={`tel:${supportPhone}`}
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-xl transition-all cursor-pointer no-underline text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          aria-label="Call Helpline"
        >
          <PhoneCall size={18} className="stroke-[1.8]" />
          <span className="text-[10px] tracking-tight leading-none font-wix">Call</span>
        </a>
      </div>
    </aside>
  );
}
