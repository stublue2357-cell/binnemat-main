import React, { useState } from 'react';
import { Button } from 'antd';
import { MessageSquare, ShieldCheck, Truck, Clock, ShoppingBag, Plus, Minus } from 'lucide-react';
import { getWhatsAppOrderUrl, APP_CONFIG } from '../../config/env';
import { useCart } from '../../context/CartContext';

export default function ProductInfo({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const formattedPrice = product?.formatted_price || "Rs. 24,800";

  const handleWhatsAppOrder = () => {
    window.open(getWhatsAppOrderUrl(product?.name || "Appliance", formattedPrice), '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col">
      {/* CATEGORY & CODE */}
      <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight mb-1 block">
        {product?.category?.replace('-', ' ').toUpperCase() || 'OFFICIAL APPLIANCE'}
      </span>

      {/* TITLE */}
      <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 leading-snug mb-3">
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
      <div className="mb-6 p-4 rounded-2xl bg-bn-gold/10 dark:bg-bn-gold/15 border border-bn-gold/25 inline-flex items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-black text-bn-goldDark dark:text-bn-goldLight">
          {formattedPrice}
        </span>
        <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
          • Inclusive of All Taxes & Delivery Prep
        </span>
      </div>

      {/* SHORT DESCRIPTION */}
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-6">
        {product?.description || "Official brand-sealed heavy-duty appliance. Built for Pakistan's climate with official manufacturer warranty card stamped upon delivery."}
      </p>

      {/* QUANTITY & ACTIONS */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Quantity:</span>
          <div className="inline-flex items-center gap-3 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-1.5 bg-white dark:bg-neutral-800">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 bg-transparent border-none cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-bn-gold"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-bold min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 bg-transparent border-none cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-bn-gold"
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
            className="rounded-full h-13 px-8 font-bold text-sm bg-gradient-to-r from-bn-gold to-bn-goldDark border-none text-white shadow-md hover:shadow-xl flex items-center justify-center gap-2"
          >
            Add to Shopping Cart
          </Button>

          <Button
            size="large"
            icon={<MessageSquare size={18} />}
            onClick={handleWhatsAppOrder}
            className="rounded-full h-13 px-6 font-bold text-sm border-bn-borderLight dark:border-bn-borderDark text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2"
          >
            Instant WhatsApp Order
          </Button>
        </div>
      </div>

      {/* FAST TRUST BADGES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-bn-borderLight dark:border-bn-borderDark text-xs text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-bn-gold" />
          <span>Brand Sealed Unit</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck size={18} className="text-bn-gold" />
          <span>Safe Nationwide Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-bn-gold" />
          <span>24/7 WhatsApp Hotline</span>
        </div>
      </div>
    </div>
  );
}
