import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { Phone, Mail, MapPin, MessageSquare, Save } from 'lucide-react';
import { useSiteBranding } from '../../context/SiteBrandingContext';

export default function AdminContactSettingsCard() {
  const { 
    whatsappNumber, 
    supportPhone, 
    supportEmail, 
    storeAddress, 
    updateContactSettings 
  } = useSiteBranding();

  const [whatsapp, setWhatsapp] = useState(whatsappNumber);
  const [phone, setPhone] = useState(supportPhone);
  const [email, setEmail] = useState(supportEmail);
  const [address, setAddress] = useState(storeAddress);
  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!whatsapp) {
      message.error('WhatsApp number is required');
      return;
    }
    setSaving(true);
    try {
      updateContactSettings({ whatsapp, phone, email, address });
      message.success('Store WhatsApp number & contact details updated across entire website!');
    } catch (err) {
      message.error('Failed to update settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl border border-bn-borderLight dark:border-neutral-800 bg-white dark:bg-[#18181B] shadow-sm space-y-5">
      <div className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <h3 className="font-cinzel text-lg font-bold text-neutral-900 dark:text-neutral-100 m-0 flex items-center gap-2">
          <MessageSquare size={18} className="text-bn-gold" />
          <span>Customer Support & WhatsApp Configuration</span>
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 mt-0.5">
          Configuring this updates the floating chat button, header, footer, and checkout consultation links sitewide.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Store WhatsApp Number (Country code + Number, no +)
            </label>
            <Input
              prefix={<Phone size={14} className="text-emerald-500 mr-1.5" />}
              placeholder="e.g. 923212418430"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="rounded-xl h-10 font-mono"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Customer Support Hotline (Display format)
            </label>
            <Input
              prefix={<Phone size={14} className="text-bn-gold mr-1.5" />}
              placeholder="e.g. +92 321 2418430"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Official Support Email
            </label>
            <Input
              prefix={<Mail size={14} className="text-bn-gold mr-1.5" />}
              placeholder="e.g. sales@binnemat.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-10"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Physical Store & Dispatch Address
            </label>
            <Input
              prefix={<MapPin size={14} className="text-bn-gold mr-1.5" />}
              placeholder="Akbar Butt Wala Gala, Hafizabad Road, Gujranwala"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-xl h-10"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            icon={<Save size={14} />}
            className="rounded-xl font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white h-10 px-6 shadow-md"
          >
            Save Contact Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
