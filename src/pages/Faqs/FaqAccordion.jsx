import React, { useState } from 'react';
import { Collapse } from 'antd';

export default function FaqAccordion() {
  const [activeTab, setActiveTab] = useState('all');

  const faqData = [
    {
      key: '1',
      category: 'warranty',
      label: 'Are all appliances brand sealed with official company warranty?',
      children: 'Yes, 100%. Binnemat is an authorized distributor. All products (Electric Geysers, Built-in Hobs, and BLDC Fans) arrive in genuine factory-sealed packaging with official company warranty cards stamped upon delivery.'
    },
    {
      key: '2',
      category: 'warranty',
      label: 'How do I claim a geyser tank or fan motor warranty if needed?',
      children: 'Every unit comes with an official nationwide manufacturer warranty. You can either call the brand helpline printed on your stamped warranty card or message our WhatsApp team (+92 321 2418430), and we will coordinate an authorized technician visit to your home.'
    },
    {
      key: '3',
      category: 'delivery',
      label: 'What is the delivery timeline across Lahore and other cities in Pakistan?',
      children: 'Deliveries within Lahore, Rawalpindi/Islamabad, and Multan are usually completed within 24 to 48 hours. For other cities and regional hubs across Pakistan, transit takes 2 to 4 business days via specialized insured logistics.'
    },
    {
      key: '4',
      category: 'delivery',
      label: 'How do you ensure fragile 8mm glass hobs and heavy geysers arrive safely?',
      children: 'We utilize reinforced wooden crating and high-density polystyrene shock absorbers handled exclusively by trained freight staff. In the rare event of transit damage, we provide 100% free immediate doorstep replacement.'
    },
    {
      key: '5',
      category: 'payment',
      label: 'Is Cash on Delivery (COD) available for heavy appliances?',
      children: 'Yes! Cash on Delivery is available in all major cities across Pakistan. For custom outstation routes, a nominal freight advance may be requested with the remaining balance due upon doorstep delivery.'
    },
    {
      key: '6',
      category: 'payment',
      label: 'What payment methods do you accept?',
      children: 'We accept Cash on Delivery (COD), Direct Online Bank Transfer (IBFT) to our verified corporate bank account, and Visa/Mastercard.'
    },
    {
      key: '7',
      category: 'returns',
      label: 'What is your refund and return policy?',
      children: 'If a delivered unit arrives defective, damaged, or differing from the ordered model, we provide a hassle-free 7-day return and replacement guarantee provided the unit is uninstalled in its original box packaging.'
    }
  ];

  const filteredFaqs = activeTab === 'all' 
    ? faqData 
    : faqData.filter(f => f.category === activeTab);

  return (
    <div className="space-y-6">
      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'warranty', label: 'Official Warranty' },
          { id: 'delivery', label: 'Shipping & Delivery' },
          { id: 'payment', label: 'Payment & COD' },
          { id: 'returns', label: 'Return Policy' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
              activeTab === tab.id
                ? 'bg-bn-gold text-white border-bn-gold shadow-sm'
                : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACCORDION */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-sm">
        <Collapse
          items={filteredFaqs}
          defaultActiveKey={['1']}
          bordered={false}
          className="bg-transparent text-sm"
        />
      </div>
    </div>
  );
}
