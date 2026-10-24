import React from 'react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function ValueSection() {
  const cards = [
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-instant.jpg',
      tag: 'FASTHEAT TECHNOLOGY',
      title: 'Endless 3-Sec Hot Water',
      desc: 'Automatic digital heating without Sui gas pressure drops.'
    },
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/craftsmanship.jpg',
      tag: 'ITALIAN ENGINEERING',
      title: 'Solid Brass & 8mm Glass',
      desc: 'Built to withstand heavy Pakistani cookware and extreme heat.'
    },
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bldc-fan.jpg',
      tag: 'ENERGY REVOLUTION',
      title: '30W Whisper-Quiet Core',
      desc: 'Cuts fan bills by 65% and runs 3x longer on UPS / Solar.'
    }
  ];

  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, idx) => (
          <div 
            key={idx}
            className="glass-panel luxury-card rounded-3xl overflow-hidden border-2 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold/50 bg-white/80 dark:bg-[#18181B]/85 shadow-md flex flex-col group"
          >
            <div className="h-52 bg-neutral-900 overflow-hidden relative">
              <img
                src={c.img}
                alt={c.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <span className="absolute top-3 left-3 bg-neutral-950/85 text-bn-goldLight text-[10px] font-black px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                {c.tag}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 m-0 mb-1 group-hover:text-bn-gold transition-colors">
                {c.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed">
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
