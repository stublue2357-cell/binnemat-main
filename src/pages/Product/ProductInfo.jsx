import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from 'antd';
import { MessageSquare, ShieldCheck, Truck, Clock, ShoppingBag, Plus, Minus } from 'lucide-react';
import { getWhatsAppOrderUrl, APP_CONFIG } from '../../config/env';
import { useCart } from '../../context/CartContext';

export default function ProductInfo({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const infoRef = useRef(null);

  useEffect(() => {
    const el = infoRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
      );
    }, el);

    return () => ctx.revert();
  }, [product?.id]);

  const formattedPrice = product?.formatted_price || "Rs. 24,800";

  const handleWhatsAppOrder = () => {
    window.open(getWhatsAppOrderUrl(product?.name || "Appliance", formattedPrice), '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div ref={infoRef} className="flex flex-col">
      {/* CATEGORY & CODE */}
      <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] mb-1 block">
        {product?.category?.replace('-', ' ').toUpperCase() || 'OFFICIAL APPLIANCE'}
      </span>

      {/* TITLE */}
      <h1 className="font-wix text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 leading-snug mb-3">
        {product?.name}
      </h1>

      {/* RATING & REVIEWS */}
      <div className="flex items-center gap-2 mb-4 text-xs font-semibold">
        <span className="text-amber-500 tracking-wider">★★★★★</span>
        <span className="text-neutral-600 dark:text-neutral-400">
          5.0 (Verified Pakistan Customers)
        </span>
      </div>

      {/* PRICE */}
      <div className="mb-6 p-4 rounded-2xl bg-[#E6EDFD] dark:bg-[#6F4E37]/15 border border-[#E5E4E2] dark:border-[#6F4E37]/30 inline-flex items-baseline gap-3 shadow-xs">
        <span className="text-2xl sm:text-3xl font-black text-[#6F4E37] dark:text-[#E6EDFD]">
          {formattedPrice}
        </span>
        <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
          • Inclusive of All Taxes &amp; Delivery Prep
        </span>
      </div>

      {/* SHORT DESCRIPTION */}
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-6 font-normal">
        {product?.description || "Official brand-sealed heavy-duty appliance. Built for Pakistan's climate with official manufacturer warranty card stamped upon delivery."}
      </p>

      {/* QUANTITY & ACTIONS */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Quantity:</span>
          <div className="inline-flex items-center gap-3 border border-[#E5E4E2] dark:border-white/10 rounded-xl px-3 py-1.5 bg-white dark:bg-[#1A1715]">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 bg-transparent border-none cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-[#6F4E37]"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-bold min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 bg-transparent border-none cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-[#6F4E37]"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="primary"
            size="large"
            icon={<ShoppingBag size={18} />}
            onClick={handleAddToCart}
            className="rounded-full h-13 px-8 font-bold text-sm bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 border-none text-white shadow-[0_4px_16px_rgba(111,78,55,0.35)] flex items-center justify-center gap-2"
          >
            Add to Shopping Cart
          </Button>

          <Button
            size="large"
            icon={<MessageSquare size={18} />}
            onClick={handleWhatsAppOrder}
            className="rounded-full h-13 px-6 font-bold text-sm border-[#E5E4E2] dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:border-[#6F4E37] flex items-center justify-center gap-2"
          >
            Instant WhatsApp Order
          </Button>
        </div>
      </div>

      {/* FAST TRUST BADGES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E5E4E2] dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#6F4E37] dark:text-[#C49774]" />
          <span>Brand Sealed Unit</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck size={18} className="text-[#6F4E37] dark:text-[#C49774]" />
          <span>Safe Nationwide Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[#6F4E37] dark:text-[#C49774]" />
          <span>24/7 WhatsApp Hotline</span>
        </div>
      </div>
    </div>
  );
}
