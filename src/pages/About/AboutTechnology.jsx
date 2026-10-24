import React from 'react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function AboutTechnology() {
  const techCards = [
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-storage.jpg',
      badge: '850°C FUSION',
      title: 'Sapphire Enamel Tanks',
      desc: 'Corrosion-proof vitreous enamel protects against high-TDS hard water for 10+ years.'
    },
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-instant.jpg',
      badge: '3-SEC FASTHEAT',
      title: '9kW Instant Flow Engine',
      desc: 'On-demand tankless hot water with digital LED touch screen and zero gas dependency.'
    },
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/glass-hob.jpg',
      badge: '8MM TEMPERED',
      title: 'Shatterproof Glass Hobs',
      desc: 'High-heat thermal resistance with heavy cast iron trivets for Pakistani karahi cooking.'
    },
    {
      img: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bldc-fan.jpg',
      badge: '30W SINE-WAVE',
      title: 'BLDC Inverter Motors',
      desc: 'Pure copper coils slashing electricity bills by 65%, running whisper-silent on UPS/Solar.'
    }
  ];

  return (
    <div className="mb-14">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
          ENGINEERING BENCHMARKS
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 m-0">
          Precision Technology
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {techCards.map((t, idx) => (
          <div 
            key={idx} 
            className="group rounded-3xl overflow-hidden border border-bn-borderLight dark:border-neutral-800 bg-white dark:bg-[#18181B] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <div className="h-44 w-full bg-neutral-900 relative overflow-hidden">
              <img
                src={t.img}
                alt={t.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-bn-goldLight text-[10px] font-black px-2.5 py-0.5 rounded-full border border-white/10">
                {t.badge}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-cinzel text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-bn-gold transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed font-light">
                {t.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
