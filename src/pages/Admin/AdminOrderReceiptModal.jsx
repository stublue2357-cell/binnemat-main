import React from 'react';
import { Modal, Button } from 'antd';
import { Printer, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSiteBranding } from '../../context/SiteBrandingContext';

export default function AdminOrderReceiptModal({ open, onClose, order }) {
  const { storeAddress, whatsappNumber, supportEmail } = useSiteBranding();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const getEmailReceiptUrl = () => {
    const email = order.billing?.email || '';
    const name = `${order.billing?.first_name || ''} ${order.billing?.last_name || ''}`.trim();
    const subject = encodeURIComponent(`Official Binnemat Order Receipt & Warranty Slip - Order #${order.id}`);
    
    const itemsText = (order.line_items || [])
      .map((item, idx) => `${idx + 1}. ${item.name} x ${item.quantity} = Rs. ${Number(item.total).toLocaleString()}`)
      .join('\n');

    const body = encodeURIComponent(
`Salam ${name},

Thank you for choosing Binnemat Certified Home Appliances! Here is your official order receipt and warranty registration:

========================================
BINNEMAT APPLIANCES — OFFICIAL RECEIPT
========================================
Order ID: #${order.id}
Date: ${new Date(order.date_created).toLocaleDateString()}
Status: ${order.status?.toUpperCase()}
Payment Method: Cash on Delivery (COD) / Direct Transfer

CUSTOMER DETAILS:
Name: ${name}
Phone: ${order.billing?.phone}
Address: ${order.billing?.address_1}, ${order.billing?.city}

ORDERED APPLIANCES:
${itemsText}

TOTAL AMOUNT: Rs. ${Number(order.total || 0).toLocaleString()}

WARRANTY CONFIRMATION:
- Sapphire Enamel Geysers: 10 Years Inner Tank Warranty
- BLDC Fans: 2 Years Official PCB Replacement
- Built-in Glass Hobs: 1 Year Burner & Glass Warranty

DISPATCH & SHOWROOM:
${storeAddress}
WhatsApp: +${whatsappNumber} | Email: ${supportEmail}
========================================
Thank you for your business!`
    );

    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={680}
      centered
      title={
        <div className="flex items-center justify-between pr-6">
          <span className="font-cinzel font-bold text-base">Order Receipt & Warranty Certificate</span>
          <span className="text-xs text-neutral-400 font-mono">Invoice #{order.id}</span>
        </div>
      }
    >
      <div id="printable-receipt" className="p-6 bg-white dark:bg-[#121214] rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-5 text-xs text-neutral-800 dark:text-neutral-200">
        {/* INVOICE HEADER */}
        <div className="flex justify-between items-start border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div>
            <h2 className="font-cinzel text-xl font-black text-neutral-900 dark:text-neutral-100 m-0">
              BINNEMAT<span className="text-bn-gold">.</span>
            </h2>
            <span className="font-urdu text-xs font-bold text-bn-goldDark dark:text-bn-gold block">
              ہر گھر کا سکون — Premium Appliances
            </span>
            <p className="text-[11px] text-neutral-500 m-0 mt-1">{storeAddress}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-bn-gold block">INVOICE</span>
            <strong className="text-base font-cinzel font-black block">#{order.id}</strong>
            <span className="text-[11px] text-neutral-400 block">{new Date(order.date_created).toLocaleString()}</span>
          </div>
        </div>

        {/* CUSTOMER & ORDER INFO */}
        <div className="grid grid-cols-2 gap-4 bg-neutral-50 dark:bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
          <div>
            <strong className="block text-neutral-500 text-[10px] uppercase mb-1">Billed & Shipped To:</strong>
            <p className="font-bold text-neutral-900 dark:text-neutral-100 m-0">
              {order.billing?.first_name} {order.billing?.last_name}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 m-0 font-mono">{order.billing?.phone}</p>
            <p className="text-neutral-600 dark:text-neutral-400 m-0">{order.billing?.address_1}, {order.billing?.city}</p>
          </div>
          <div className="text-right">
            <strong className="block text-neutral-500 text-[10px] uppercase mb-1">Status & Terms:</strong>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              {order.status}
            </span>
            <p className="text-neutral-500 text-[11px] m-0 mt-1">Payment: Cash on Delivery (COD)</p>
          </div>
        </div>

        {/* LINE ITEMS TABLE */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 text-[10px] uppercase">
              <th className="py-2">Item Description</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
            {order.line_items?.map((item) => (
              <tr key={item.id} className="py-2">
                <td className="py-2 font-medium">{item.name}</td>
                <td className="py-2 text-center font-mono">{item.quantity}</td>
                <td className="py-2 text-right font-mono font-bold">Rs. {Number(item.total).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-neutral-900 dark:border-neutral-100 font-bold">
              <td colSpan={2} className="pt-3 text-right uppercase text-xs">Total Payable:</td>
              <td className="pt-3 text-right font-cinzel text-base text-bn-goldDark dark:text-bn-gold">
                Rs. {Number(order.total || 0).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* OFFICIAL WARRANTY BADGE */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center gap-3">
          <ShieldCheck size={24} className="text-amber-600 shrink-0" />
          <div className="text-[11px] leading-tight text-amber-900 dark:text-amber-200">
            <strong>Certified Genuine Product Warranty Stamped</strong>
            <p className="m-0 mt-0.5 font-light">Present this invoice along with your warranty card for claims. Free technical support at +{whatsappNumber}.</p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-2.5 pt-4">
        {order.billing?.email && (
          <Button
            href={getEmailReceiptUrl()}
            icon={<Mail size={14} />}
            className="rounded-xl font-bold h-10 px-4 text-xs"
          >
            Send Email Receipt
          </Button>
        )}
        <Button
          type="primary"
          onClick={handlePrint}
          icon={<Printer size={14} />}
          className="rounded-xl font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white h-10 px-5 text-xs shadow-md"
        >
          Print Invoice / PDF
        </Button>
      </div>
    </Modal>
  );
}
