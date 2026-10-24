import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    message.success('Thank you for joining the Binnemat Circle!');
    setEmail('');
  };

  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-14">
      <div className="relative rounded-3xl overflow-hidden border border-bn-borderLight dark:border-neutral-800 shadow-xl bg-neutral-950">
        {/* BACKGROUND STUDIO IMAGE */}
        <div className="h-64 sm:h-72 w-full relative">
          <img
            src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/studio-collection.jpg"
            alt="Binnemat Collection"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
            }}
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm" />
        </div>

        {/* CONTENT OVERLAY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bn-gold/20 border border-bn-gold/40 text-bn-goldLight text-[10px] font-black uppercase tracking-widest mb-2 backdrop-blur-md">
            <Sparkles size={11} className="text-amber-400" />
            <span>VIP APPLIANCE CIRCLE</span>
          </span>

          <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white m-0 mb-2 drop-shadow">
            Priority Access & Seasonal Savings
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-md m-0 mb-5 leading-relaxed font-light drop-shadow">
            Pre-winter geyser discounts, BLDC energy guides, and factory warranty updates.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
            <Input 
              type="email" 
              placeholder="Enter your email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-full h-11 px-5 bg-white/10 border-white/20 text-white placeholder-neutral-400 focus:border-bn-gold backdrop-blur-md"
            />
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<ArrowRight size={15} />}
              className="rounded-full h-11 px-7 font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white shadow-lg flex items-center justify-center gap-1.5"
            >
              Join Circle
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
