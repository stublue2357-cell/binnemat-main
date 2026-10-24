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
            <ShoppingBag size={20} className="text-bn-goldDark dark:text-bn-gold" />
            <span className="font-cinzel text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Shopping Cart ({totalCount})
            </span>
          </div>
        }
        placement="right"
        onClose={closeCart}
        open={isCartOpen}
        width={420}
        styles={{ body: { padding: '16px', display: 'flex', flexDirection: 'column' } }}
      >
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center my-auto text-center py-12">
            <div className="w-16 h-16 rounded-full bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center mb-4">
              <ShoppingBag size={30} />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              Your Cart is Empty
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mb-6">
              Browse our winter electric geysers or 30W BLDC inverter fans to add appliances.
            </p>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <Button
                type="primary"
                onClick={() => {
                  closeCart();
                  if (onNavigateCategory) onNavigateCategory('winter-collection');
                }}
                className="rounded-full font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white h-10"
              >
                Explore Winter Geysers
              </Button>
              <Button
                onClick={() => {
                  closeCart();
                  if (onNavigateCategory) onNavigateCategory('summer-collection');
                }}
                className="rounded-full font-bold h-10"
              >
                Explore BLDC Fans
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-grow justify-between h-full">
            {/* ITEMS LIST */}
            <div className="overflow-y-auto space-y-3.5 pr-1 flex-grow">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-bn-borderLight dark:border-bn-borderDark items-center"
                >
                  {/* THUMBNAIL */}
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-neutral-900 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden border border-neutral-200 dark:border-neutral-700">
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
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate mb-1">
                      {item.name}
                    </h4>
                    <span className="text-xs font-black text-bn-goldDark dark:text-bn-goldLight block mb-2">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>

                    {/* QUANTITY STEPPER */}
                    <div className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-600 rounded-lg px-2 py-0.5 bg-white dark:bg-neutral-800">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-0 bg-transparent border-none cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-bn-gold"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold px-1.5 min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-0 bg-transparent border-none cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-bn-gold"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="p-1.5 text-neutral-400 hover:text-red-500 bg-transparent border-none cursor-pointer rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* DRAWER FOOTER */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-neutral-600 dark:text-neutral-400">Subtotal:</span>
                <span className="font-black text-lg text-neutral-900 dark:text-neutral-100">
                  {formattedSubtotal}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-bn-gold/10 text-xs flex items-center gap-2 text-bn-goldDark dark:text-bn-goldLight font-semibold">
                <ShieldCheck size={16} />
                <span>100% Brand-Sealed with Stamped Warranty</span>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRight size={16} />}
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full rounded-full h-11 font-bold bg-gradient-to-r from-bn-gold to-bn-goldDark border-none text-white shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  size="large"
                  icon={<MessageSquare size={16} />}
                  onClick={handleQuickWhatsApp}
                  className="w-full rounded-full h-11 font-bold border-bn-borderLight dark:border-bn-borderDark text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2"
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
