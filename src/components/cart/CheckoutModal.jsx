import React, { useState } from 'react';
import { Modal, Input, Button, Radio, message } from 'antd';
import { CheckCircle, MessageSquare, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { APP_CONFIG } from '../../config/env';
import { submitLiveWcCheckout } from '../../services/wooCartService';

export default function CheckoutModal({ open, onClose }) {
  const { cartItems, subtotal, formattedSubtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    payment: 'cod',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const generateWhatsAppUrl = (refId) => {
    let text = `*Salam Binnemat! New Order Placed*\n`;
    text += `*Order Ref:* ${refId}\n\n`;
    text += `*Items:*\n`;
    cartItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    text += `\n*Total Payable:* ${formattedSubtotal}\n`;
    text += `*Customer:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    text += `*City:* ${formData.city || 'Pakistan'}\n`;
    text += `*Address:* ${formData.address}\n`;
    text += `*Payment:* ${formData.payment === 'cod' ? 'Cash on Delivery (COD)' : 'Direct Bank Transfer (IBFT)'}\n`;
    if (formData.notes) text += `*Notes:* ${formData.notes}\n`;

    return `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      message.error('Please enter name, phone, and complete delivery address.');
      return;
    }

    setSubmitting(true);
    const orderRef = `BN-${Math.floor(100000 + Math.random() * 900000)}`;

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '') || 'customer';
    const wcPayload = {
      billing_address: {
        first_name: formData.name,
        last_name: '.',
        phone: formData.phone,
        email: cleanPhone + '@binnemat.com',
        city: formData.city || 'Pakistan',
        address_1: formData.address,
        postcode: '54000',
        state: 'PB',
        country: 'PK'
      },
      shipping_address: {
        first_name: formData.name,
        last_name: '.',
        phone: formData.phone,
        city: formData.city || 'Pakistan',
        address_1: formData.address,
        postcode: '54000',
        state: 'PB',
        country: 'PK'
      },
      customer_note: formData.notes,
      payment_method: formData.payment === 'cod' ? 'cod' : 'bacs'
    };
    const res = await submitLiveWcCheckout(wcPayload);

    const finalRef = res.success ? `WC-${res.orderId}` : orderRef;

    setCompletedOrder({
      refId: finalRef,
      whatsAppUrl: generateWhatsAppUrl(finalRef)
    });
    setSubmitting(false);
    clearCart();
  };

  const handleFinish = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="checkout-modal"
    >
      {completedOrder ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 text-[#6F4E37] dark:text-[#E6EDFD] border border-[#E5E4E2] dark:border-white/10 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle size={32} />
          </div>
          <h2 className="font-wix text-2xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
            Order Successfully Placed!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Your order reference is <strong className="text-[#6F4E37] dark:text-[#E6EDFD] font-mono">{completedOrder.refId}</strong>. Our dispatch department has received your booking.
          </p>

          <div className="p-4 rounded-2xl glass-apple-card border border-[#E5E4E2] dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 max-w-sm mx-auto text-left space-y-1.5 shadow-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Customer:</span>
              <strong className="text-slate-900 dark:text-white">{formData.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">City:</span>
              <strong className="text-slate-900 dark:text-white">{formData.city || 'Standard Logistics'}</strong>
            </div>
            <div className="flex justify-between border-t border-[#E5E4E2] dark:border-white/10 pt-1.5 mt-1">
              <span className="text-slate-500">Total:</span>
              <strong className="text-[#6F4E37] dark:text-[#E6EDFD] font-mono font-bold">{formattedSubtotal}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={completedOrder.whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 text-white font-bold text-xs shadow-md no-underline"
            >
              <MessageSquare size={16} />
              <span>Send Receipt on WhatsApp</span>
            </a>
            <Button
              onClick={handleFinish}
              className="rounded-full h-11 px-6 font-semibold border-[#E5E4E2] dark:border-white/10 text-slate-700 dark:text-slate-200"
            >
              Done & Return to Store
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-2">
          <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1">
            EXPRESS CHECKOUT &bull; COD
          </span>
          <h2 className="font-wix text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Delivery &amp; Payment Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
              <Input
                placeholder="e.g. Tariq Mahmood"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="rounded-xl h-10 border-[#E5E4E2] dark:border-white/10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp / Phone *</label>
                <Input
                  placeholder="0321 0000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="rounded-xl h-10 border-[#E5E4E2] dark:border-white/10"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">City *</label>
                <Input
                  placeholder="Lahore / Rawalpindi / Karachi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="rounded-xl h-10 border-[#E5E4E2] dark:border-white/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Complete Street Address *</label>
              <Input.TextArea
                rows={2}
                placeholder="House #, Street, Phase / Block, Area"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="rounded-xl border-[#E5E4E2] dark:border-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
              <Radio.Group
                value={formData.payment}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"
              >
                <Radio.Button value="cod" className="rounded-xl text-center font-bold text-xs py-1.5 h-auto">
                  Cash on Delivery (COD)
                </Radio.Button>
                <Radio.Button value="ibft" className="rounded-xl text-center font-bold text-xs py-1.5 h-auto">
                  Bank Transfer (IBFT)
                </Radio.Button>
              </Radio.Group>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E6EDFD]/60 dark:bg-white/[0.04] border border-[#E5E4E2] dark:border-white/10 flex justify-between items-center text-xs shadow-sm">
              <div>
                <span className="text-slate-500 block">Total Payable:</span>
                <strong className="text-base text-[#6F4E37] dark:text-[#E6EDFD] font-mono font-extrabold">
                  {formattedSubtotal}
                </strong>
              </div>
              <div className="text-right text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ Free Doorstep Delivery
              </div>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="w-full rounded-full h-12 font-bold bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 border-none text-white shadow-md text-sm mt-2"
            >
              Confirm &amp; Book Order
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
