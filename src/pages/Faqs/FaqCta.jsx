import React from 'react';
import { Button } from 'antd';
import { PhoneCall } from 'lucide-react';
import { APP_CONFIG } from '../../config/env';

export default function FaqCta() {
  return (
    <div className="mt-12 text-center glass-panel p-8 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80">
      <h3 className="font-cinzel text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Still Have Specific Questions?
      </h3>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-6">
        Our customer support team is on standby to assist with room BTU calculations, genuine warranty verification, and bulk orders.
      </p>
      <Button
        type="primary"
        icon={<PhoneCall size={16} />}
        href={APP_CONFIG.DEVELOPER_WHATSAPP}
        target="_blank"
        className="rounded-full h-11 px-7 font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white shadow-md"
      >
        Ask on WhatsApp (+92 321 2418430)
      </Button>
    </div>
  );
}
