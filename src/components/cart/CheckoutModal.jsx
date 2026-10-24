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
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle size={36} />
          </div>
          <h2 className="font-cinzel text-2xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
            Order Successfully Placed!
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
            Your order reference is <strong className="text-bn-goldDark dark:text-bn-goldLight">{completedOrder.refId}</strong>. Our dispatch department has received your booking.
          </p>

          <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 max-w-sm mx-auto text-left space-y-1">
            <div className="flex justify-between">
              <span>Customer:</span>
              <strong>{formData.name}</strong>
            </div>
            <div className="flex justify-between">
              <span>City:</span>
              <strong>{formData.city || 'Standard Logistics'}</strong>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <strong className="text-bn-goldDark dark:text-bn-goldLight">{formattedSubtotal}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={completedOrder.whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md no-underline"
            >
              <MessageSquare size={16} />
              <span>Send Receipt on WhatsApp</span>
            </a>
            <Button
              onClick={handleFinish}
              className="rounded-full h-11 px-6 font-semibold"
            >
              Done & Return to Store
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-2">
          <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
            EXPRESS CHECKOUT &bull; COD
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Delivery & Payment Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">Full Name *</label>
              <Input
                placeholder="e.g. Tariq Mahmood"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="rounded-xl h-10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">WhatsApp / Phone *</label>
                <Input
                  placeholder="0321 0000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="rounded-xl h-10"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">City *</label>
                <Input
                  placeholder="Lahore / Rawalpindi / Karachi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="rounded-xl h-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">Complete Street Address *</label>
              <Input.TextArea
                rows={2}
                placeholder="House #, Street, Phase / Block, Area"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">Payment Method</label>
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

            <div className="p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 flex justify-between items-center text-xs">
              <div>
                <span className="text-neutral-500 block">Total Payable:</span>
                <strong className="text-base text-bn-goldDark dark:text-bn-goldLight font-black">
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
              className="w-full rounded-full h-12 font-bold bg-gradient-to-r from-bn-gold to-bn-goldDark border-none text-white shadow-md text-sm mt-2"
            >
              Confirm & Book Order
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
