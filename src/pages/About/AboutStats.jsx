import React from 'react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function AboutStats() {
  const metrics = [
    { value: "25,000+", label: "Pakistani Households", desc: "Equipped with certified climate appliances" },
    { value: "65%", label: "Average Energy Saved", desc: "Via 30W BLDC fans & precision thermostats" },
    { value: "50+ Cities", label: "Nationwide Coverage", desc: "Zero-damage express delivery across Pakistan" }
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden mb-14 border border-bn-borderLight dark:border-neutral-800 shadow-xl bg-neutral-950">
      {/* BACKGROUND LIFESTYLE IMAGE */}
      <div className="h-64 sm:h-52 w-full relative">
        <img
          src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/lifestyle-home.jpg"
          alt="Luxury Home Interior"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
          }}
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm" />
      </div>

      {/* METRICS OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-center">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-3">
              <strong className="block font-cinzel text-3xl sm:text-4xl font-black text-bn-goldLight mb-1 drop-shadow">
                {m.value}
              </strong>
              <h3 className="text-sm font-bold text-white mb-0.5">
                {m.label}
              </h3>
              <p className="text-xs text-neutral-400 m-0 font-light">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
