import React, { useState } from 'react';
import { Input, Button, Select, message } from 'antd';
import { MessageSquare } from 'lucide-react';
import { APP_CONFIG } from '../../config/env';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    category: 'electric-geyser',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      message.error('Please enter your name and contact phone number.');
      return;
    }

    const text = encodeURIComponent(
      `Salam Binnemat! My name is ${formData.name} from ${formData.city || 'Pakistan'}. I am inquiring about ${formData.category}: ${formData.message}`
    );
    window.open(`https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${text}`, '_blank');
    message.success('Connecting you directly with a Binnemat appliance specialist on WhatsApp...');
  };

  return (
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 shadow-sm">
      <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-2">
        INQUIRY & SIZING ASSISTANCE
      </span>
      <h2 className="font-cinzel text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Request Appliance Consultation
      </h2>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
        Submit your details and our team will reach out with genuine pricing, geyser capacity sizing, and technical advice.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">Your Full Name *</label>
          <Input 
            placeholder="e.g. Tariq Mahmood"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="rounded-xl h-11"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">WhatsApp / Phone *</label>
            <Input 
              placeholder="0321 0000000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="rounded-xl h-11"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">City in Pakistan</label>
            <Input 
              placeholder="e.g. Lahore / Karachi"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="rounded-xl h-11"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">Appliance of Interest</label>
          <Select 
            value={formData.category}
            onChange={(val) => setFormData({ ...formData, category: val })}
            className="w-full h-11"
            options={[
              { value: 'electric-geyser', label: 'Electric Geysers (Instant & Storage 35L-50L)' },
              { value: 'bldc-fan', label: '30W BLDC Inverter Ceiling Fans' },
              { value: 'cooking-hob', label: '8mm Tempered Glass Built-in Hobs' },
              { value: 'kitchen-hood', label: 'Kitchen Ventilation & Range Hoods' }
            ]}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">Household Requirements or Notes</label>
          <Input.TextArea 
            rows={3}
            placeholder="e.g. 35L geyser for family bathroom or 4-burner glass hob for kitchen installation."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="rounded-xl"
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          icon={<MessageSquare size={16} />}
          size="large"
          className="w-full rounded-full h-12 font-bold bg-gradient-to-r from-bn-gold to-bn-goldDark border-none text-white shadow-md flex items-center justify-center gap-2 mt-2"
        >
          Send Inquiry via WhatsApp
        </Button>
      </form>
    </div>
  );
}
