import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, CheckCircle2, Sparkles } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const containerRef = useRef(null);

  const reviews = [
    {
      name: "Tariq Mahmood",
      city: "Abbottabad",
      product: "35L Sapphire Storage Geyser",
      img: "/images/superconscious_heater_hero.jpg",
      quote: "Heats to boiling in 15 mins and stays steaming hot all night even during freezing Abbottabad winters. Zero Sui gas headaches."
    },
    {
      name: "Dr. Ayesha Malik",
      city: "Lahore (DHA)",
      product: "8mm Tempered Glass Built-in Hob",
      img: "/images/superconscious_hob_hero.jpg",
      quote: "The heavy cast iron trivets and high-heat Italian burners handle heavy Pakistani karahis effortlessly. Looks stunning on our kitchen island."
    },
    {
      name: "Hamza Rasheed",
      city: "Islamabad",
      product: "30W BLDC Inverter Ceiling Fan",
      img: "/images/superconscious_fan_hero.jpg",
      quote: "Whisper-quiet air throw and slashed our bedroom electricity bill by 65%. Runs seamlessly on our home solar inverter during outages."
    }
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Refresh ScrollTrigger to account for any pinned sections above
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-review-card', 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="max-w-[1360px] mx-auto px-[5%] my-10 sm:my-12 text-slate-900 dark:text-white">
      <div className="text-center mb-10">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block mb-1 font-bold flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-[#6F4E37] dark:text-[#C49774]" />
          <span>AUTHENTIC DOMESTIC EXPERIENCES</span>
        </span>
        <h2 className="font-wix text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight m-0">
          Installed in 25,000+ Homes Across Pakistan
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <div 
            key={idx} 
            className="gsap-review-card glass-apple-card group rounded-3xl overflow-hidden border border-[#E5E4E2] dark:border-white/[0.1] hover:border-[#6F4E37]/50 bg-white/95 dark:bg-[#1A1715]/95 shadow-md hover:shadow-[0_15px_35px_rgba(111,78,55,0.12)] transition-all duration-500 flex flex-col"
          >
            {/* REAL INSTALLATION PHOTO */}
            <div className="h-44 w-full bg-[#F7F6F4] dark:bg-[#12100E] relative overflow-hidden">
              <img
                src={r.img}
                alt={r.product}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <span className="absolute bottom-3 left-3 bg-[#E6EDFD]/90 dark:bg-[#1A1715]/90 backdrop-blur-md text-[#6F4E37] dark:text-[#E6EDFD] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#E5E4E2] dark:border-white/10 shadow-xs">
                {r.product}
              </span>
            </div>

            {/* REVIEW DETAILS */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#6F4E37] text-[#6F4E37] dark:fill-[#C49774] dark:text-[#C49774]" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-6 flex-grow italic">
                "{r.quote}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-xs">
                <div>
                  <strong className="block text-slate-900 dark:text-white font-wix font-bold">{r.name}</strong>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{r.city}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                  <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Verified Owner</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
