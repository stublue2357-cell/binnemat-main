import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Input, Button, Select, message } from 'antd';
import { MessageSquare } from 'lucide-react';
import { APP_CONFIG } from '../../config/env';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const formRef = useRef(null);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

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
    <div ref={formRef} className="glass-apple-card p-5 sm:p-10 rounded-3xl border border-[#E5E4E2] dark:border-white/10 shadow-sm relative overflow-hidden">
      <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-2">
        INQUIRY &amp; SIZING ASSISTANCE
      </span>
      <h2 className="font-wix text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
        Request Appliance Consultation
      </h2>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
        Submit your details and our team will reach out with genuine pricing, geyser capacity sizing, and technical advice.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Full Name *</label>
          <Input 
            placeholder="e.g. Tariq Mahmood"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="rounded-xl h-11 border-[#E5E4E2] dark:border-white/10"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp / Phone *</label>
            <Input 
              placeholder="0321 0000000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="rounded-xl h-11 border-[#E5E4E2] dark:border-white/10"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">City in Pakistan</label>
            <Input 
              placeholder="e.g. Lahore / Karachi"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="rounded-xl h-11 border-[#E5E4E2] dark:border-white/10"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Appliance of Interest</label>
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
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Household Requirements or Notes</label>
          <Input.TextArea 
            rows={3}
            placeholder="e.g. 35L geyser for family bathroom or 4-burner glass hob for kitchen installation."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="rounded-xl border-[#E5E4E2] dark:border-white/10"
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          icon={<MessageSquare size={16} />}
          size="large"
          className="w-full rounded-full h-12 font-bold bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 border-none text-white shadow-md flex items-center justify-center gap-2 mt-2"
        >
          Send Inquiry via WhatsApp
        </Button>
      </form>
    </div>
  );
}
