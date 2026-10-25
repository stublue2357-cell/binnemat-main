import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutTechnology() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-tech-header',
        { y: 15, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
      gsap.fromTo('.gsap-tech-card',
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

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
    <div ref={containerRef} className="mb-14">
      <div className="gsap-tech-header text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1">
          ENGINEERING BENCHMARKS
        </span>
        <h2 className="font-wix text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 m-0">
          Precision Technology
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {techCards.map((t, idx) => (
          <div 
            key={idx} 
            className="gsap-tech-card glass-apple-card group rounded-3xl overflow-hidden border border-[#E5E4E2] dark:border-white/10 bg-white/95 dark:bg-[#161311]/95 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <div className="h-44 w-full bg-[#F7F6F4] dark:bg-[#12100E] relative overflow-hidden">
              <img
                src={t.img}
                alt={t.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <span className="absolute top-3 left-3 bg-[#E6EDFD]/90 dark:bg-[#1A1715]/90 backdrop-blur-md text-[#6F4E37] dark:text-[#E6EDFD] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#E5E4E2] dark:border-white/10 shadow-xs">
                {t.badge}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-wix text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-[#6F4E37] dark:group-hover:text-[#C49774] transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 leading-relaxed font-normal">
                {t.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
