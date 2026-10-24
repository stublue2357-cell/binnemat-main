import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Tariq Mahmood",
      city: "Abbottabad",
      product: "35L Sapphire Storage Geyser",
      img: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bathroom-install.jpg",
      quote: "Heats to boiling in 15 mins and stays steaming hot all night even during freezing Abbottabad winters. Zero Sui gas headaches."
    },
    {
      name: "Dr. Ayesha Malik",
      city: "Lahore (DHA)",
      product: "8mm Tempered Glass Built-in Hob",
      img: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/kitchen-install.jpg",
      quote: "The heavy cast iron trivets and high-heat Italian burners handle heavy Pakistani karahis effortlessly. Looks stunning on our island."
    },
    {
      name: "Hamza Rasheed",
      city: "Islamabad",
      product: "30W BLDC Inverter Ceiling Fan",
      img: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bldc-fan.jpg",
      quote: "Whisper-quiet air throw and slashed our bedroom electricity bill by 65%. Runs seamlessly on our home solar inverter."
    }
  ];

  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-16">
      <div className="text-center mb-8">
        <span className="text-xs font-black tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block mb-1">
          REAL PAKISTANI HOMES
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 m-0">
          Installed & Loved Across Pakistan
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <div 
            key={idx} 
            className="group rounded-3xl overflow-hidden border border-bn-borderLight dark:border-neutral-800 bg-white dark:bg-[#18181B] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* REAL INSTALLATION PHOTO */}
            <div className="h-44 w-full bg-neutral-900 relative overflow-hidden">
              <img
                src={r.img}
                alt={r.product}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <span className="absolute bottom-3 left-3 bg-neutral-950/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10">
                {r.product}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-grow">
              {/* 5 STARS */}
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic m-0 mb-4 flex-grow font-light">
                "{r.quote}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <div>
                  <strong className="block text-neutral-900 dark:text-neutral-100 font-bold">{r.name}</strong>
                  <span className="text-[11px] text-neutral-400 font-light">{r.city}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={11} /> Verified Buyer
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
