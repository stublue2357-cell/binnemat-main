import React from 'react';
import { Sparkles } from 'lucide-react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function AboutHero() {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-bn-borderLight dark:border-neutral-800 bg-neutral-950">
      {/* BACKGROUND STUDIO HERO PHOTOGRAPHY */}
      <div className="h-[380px] sm:h-[460px] w-full relative">
        <img
          src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/studio-collection.jpg"
          alt="Binnemat Flagship Appliance Collection"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
          }}
          className="w-full h-full object-cover object-center"
        />
        {/* CINEMATIC GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
      </div>

      {/* FLOATING MINIMAL COPY */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-6 sm:p-12 text-white">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bn-gold/20 border border-bn-gold/40 text-bn-goldLight text-xs font-black uppercase tracking-widest mb-3 backdrop-blur-md">
          <Sparkles size={13} className="text-amber-400" />
          <span>BINNEMAT APPLIANCES</span>
        </span>
        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black max-w-3xl leading-tight m-0 text-white drop-shadow-lg">
          Crafted for Comfort. <br />
          <span className="gold-gradient-text">Built for Endurance.</span>
        </h1>
        <p className="text-xs sm:text-base text-neutral-300 max-w-xl mt-3 leading-relaxed font-light drop-shadow">
          Ultra-efficient electric water heaters, 8mm glass hobs, and 30W inverter fans engineered for Pakistani living.
        </p>
      </div>
    </div>
  );
}
