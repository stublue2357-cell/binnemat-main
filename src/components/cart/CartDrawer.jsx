import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';
import { APP_CONFIG } from '../../config/env';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer({ onNavigateCategory }) {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    totalCount, 
    formattedSubtotal 
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleQuickWhatsApp = () => {
    let text = `*Salam Binnemat! I want to order from my cart:*\n\n`;
    cartItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    text += `\n*Subtotal Payable:* ${formattedSubtotal}\n`;
    text += `Please confirm stock and dispatch schedule.`;
    window.open(`https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <Drawer
        title={
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6F4E37] to-[#8C6547] flex items-center justify-center text-white shadow-sm">
              <ShoppingBag size={15} />
            </div>
            <span className="font-wix text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shopping Bag ({totalCount})
            </span>
          </div>
        }
        placement="right"
        onClose={closeCart}
        open={isCartOpen}
        width={420}
        styles={{ body: { padding: '20px', display: 'flex', flexDirection: 'column' } }}
      >
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center my-auto text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 text-[#6F4E37] dark:text-[#E6EDFD] flex items-center justify-center mb-4 shadow-sm border border-[#E5E4E2] dark:border-white/10">
              <ShoppingBag size={28} />
            </div>
            <h3 className="font-wix text-lg font-bold text-slate-900 dark:text-white mb-1">
              Your Bag is Empty
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
              Browse our winter electric geysers or 30W BLDC inverter fans to add luxury appliances.
            </p>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <Button
                type="primary"
                onClick={() => {
                  closeCart();
                  if (onNavigateCategory) onNavigateCategory('winter-collection');
                }}
                className="rounded-full font-bold bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 border-none text-white h-11 shadow-sm"
              >
                Explore Winter Geysers
              </Button>
              <Button
                onClick={() => {
                  closeCart();
                  if (onNavigateCategory) onNavigateCategory('summer-collection');
                }}
                className="rounded-full font-bold h-11 border-[#E5E4E2] dark:border-white/10 text-slate-700 dark:text-slate-200"
              >
                Explore BLDC Fans
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-grow justify-between h-full">
            {/* ITEMS LIST */}
            <div className="overflow-y-auto space-y-3 pr-1 flex-grow">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl glass-apple-card border border-[#E5E4E2] dark:border-white/10 items-center shadow-sm"
                >
                  {/* THUMBNAIL */}
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-[#151419] p-1 flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#E5E4E2] dark:border-white/10">
                    <img
                      src={item.image || SAFE_SVG_PLACEHOLDER}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                      }}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-grow min-w-0">
                    <h4 className="font-wix text-xs font-bold text-slate-900 dark:text-white truncate mb-1">
                      {item.name}
                    </h4>
                    <span className="text-xs font-extrabold text-[#6F4E37] dark:text-[#E6EDFD] block mb-2 font-mono">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>

                    {/* QUANTITY STEPPER */}
                    <div className="inline-flex items-center gap-2 border border-[#E5E4E2] dark:border-white/10 rounded-full px-2.5 py-0.5 bg-white dark:bg-white/[0.06]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-0 bg-transparent border-none cursor-pointer text-slate-600 dark:text-slate-300 hover:text-[#6F4E37]"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-xs font-bold px-1 min-w-[14px] text-center text-slate-800 dark:text-slate-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-0 bg-transparent border-none cursor-pointer text-slate-600 dark:text-slate-300 hover:text-[#6F4E37]"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="p-1.5 text-slate-400 hover:text-red-500 bg-transparent border-none cursor-pointer rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* DRAWER FOOTER */}
            <div className="pt-4 border-t border-[#E5E4E2] dark:border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Subtotal:</span>
                <span className="font-mono font-extrabold text-lg text-slate-900 dark:text-white">
                  {formattedSubtotal}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#E6EDFD] dark:bg-[#6F4E37]/15 border border-[#E5E4E2] dark:border-white/10 text-xs flex items-center gap-2 text-[#6F4E37] dark:text-[#E6EDFD] font-semibold">
                <ShieldCheck size={16} />
                <span>100% Brand-Sealed with Stamped Warranty</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRight size={15} />}
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full rounded-full h-11 font-bold bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 border-none text-white shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  size="large"
                  icon={<MessageSquare size={15} />}
                  onClick={handleQuickWhatsApp}
                  className="w-full rounded-full h-11 font-bold border-[#E5E4E2] dark:border-white/10 text-slate-800 dark:text-slate-200 hover:text-[#6F4E37] flex items-center justify-center gap-2"
                >
                  Quick WhatsApp Order
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        open={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </>
  );
}
