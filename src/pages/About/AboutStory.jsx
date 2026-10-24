import React from 'react';
import { APP_CONFIG } from '../../config/env';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function AboutStory() {
  const showcase = [
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bathroom-install.jpg',
      tag: 'WINTER SANCTUARY',
      title: 'Instant Warmth & 24h Heat Retention',
      desc: 'Sapphire enamel tanks and Italian Incoloy 840 heating elements keep water piping hot even through peak winter gas shutdowns.'
    },
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/kitchen-install.jpg',
      tag: 'CULINARY MASTERY',
      title: '8mm Tempered Glass & Brass Flame',
      desc: 'Shatterproof thermal glass with heavy cast iron pan trivets, designed for heavy karahi cooking and high-pressure LPG or Sui gas.'
    }
  ];

  return (
    <div className="mb-14 space-y-8">
      {/* MINIMAL INTRO WITH GOLD URDU SLOGAN */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-neutral-100/60 dark:bg-[#18181B]/70 border border-bn-borderLight dark:border-neutral-800">
        <div className="max-w-xl">
          <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
            THE PHILOSOPHY
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 m-0 mb-2">
            Appliances Built for the Real Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 m-0 leading-relaxed font-light">
            We reject fragile appliances. Every Binnemat unit is engineered to endure hard bore water, wide-voltage fluctuations, and gas load-shedding.
          </p>
        </div>

        <div className="text-center px-6 py-4 rounded-2xl bg-white dark:bg-neutral-900 border border-bn-gold/30 shadow-sm shrink-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-bn-goldDark dark:text-bn-goldLight block">
            OUR PROMISE
          </span>
          <div className="font-urdu text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-100 my-1 font-bold">
            {APP_CONFIG.SLOGAN_URDU}
          </div>
          <span className="text-[11px] text-neutral-400">Peace, Quiet & Reliability</span>
        </div>
      </div>

      {/* 2 LARGE REALISTIC INSTALLATION PHOTO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showcase.map((item, idx) => (
          <div
            key={idx}
            className="group rounded-3xl overflow-hidden border border-bn-borderLight dark:border-neutral-800 bg-white dark:bg-[#18181B] shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-neutral-900">
              <img
                src={item.img}
                alt={item.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md text-bn-goldLight text-[11px] font-black px-3 py-1 rounded-full border border-white/10 tracking-wider">
                {item.tag}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-cinzel text-lg font-bold text-neutral-900 dark:text-neutral-100 m-0 mb-2 group-hover:text-bn-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
