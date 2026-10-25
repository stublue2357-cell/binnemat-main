import React, { useState } from 'react';
import { message } from 'antd';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    message.success('Welcome to the Binnemat VIP Circle!');
    setEmail('');
  };

  return (
    <section className="relative px-4 sm:px-6 max-w-4xl mx-auto my-10 text-slate-900 dark:text-white">
      <div className="glass-apple-card relative rounded-3xl p-8 sm:p-12 border border-[#E5E4E2] dark:border-white/[0.12] bg-white/95 dark:bg-[#161311]/95 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(111,78,55,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center">
        {/* Subtle Warm Mocha & Platinum Backlight (No washed-out foggy grey cloud in dark mode) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[radial-gradient(ellipse_at_top,_rgba(111,78,55,0.12)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(111,78,55,0.25)_0%,_transparent_70%)] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6EDFD] dark:bg-[#1A1614] border border-[#E5E4E2] dark:border-white/[0.12] text-[#6F4E37] dark:text-[#E5E4E2] text-xs font-mono uppercase tracking-widest mb-4 font-bold shadow-xs">
          <Sparkles size={13} className="text-[#6F4E37] dark:text-[#C49774]" />
          <span>Official Updates &amp; Alerts</span>
        </div>

        <h2 className="font-wix font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white mb-3 tracking-tight">
          Never Miss Factory Inlets &amp; Drops.
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-8 font-normal leading-relaxed">
          Pre-winter geyser drops, seasonal BLDC energy blueprints, and certified manufacturer warranty updates.
        </p>

        {/* REFINED INPUT CAPSULE */}
        <form onSubmit={handleSubmit} className="flex items-center justify-between p-1.5 rounded-full bg-[#F7F6F4] dark:bg-[#0A0908] border border-[#E5E4E2] dark:border-white/[0.15] backdrop-blur-2xl max-w-md mx-auto shadow-sm focus-within:border-[#6F4E37] focus-within:ring-2 focus-within:ring-[#6F4E37]/20 transition-all">
          <input 
            type="email" 
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent border-none outline-none px-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 flex-grow font-wix"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-110 text-white font-bold text-xs tracking-wide transition-all shadow-[0_4px_16px_rgba(111,78,55,0.35)] flex items-center gap-1.5 cursor-pointer border-none flex-shrink-0"
          >
            <span>Subscribe</span>
            <ArrowUpRight size={14} />
          </button>
        </form>

        <div className="flex items-center justify-center gap-6 mt-6 text-[11px] text-slate-500 dark:text-slate-400 font-mono font-medium">
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-[#6F4E37] dark:text-[#C49774]" /> Zero spam
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-[#6F4E37] dark:text-[#C49774]" /> Official warranty alerts
          </span>
        </div>
      </div>
    </section>
  );
}
