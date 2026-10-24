import React from 'react';
import { APP_CONFIG } from '../../config/env';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function ManifestoSection() {
  return (
    <section className="max-w-[1360px] mx-auto px-[5%] mb-16">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-bn-gold/30">
        {/* BACKGROUND LIFESTYLE SHOT */}
        <div className="h-64 sm:h-72 w-full relative">
          <img
            src="https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/lifestyle-home.jpg"
            alt="Har Ghar Ka Sukoon Interior"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/75 to-neutral-950/90 backdrop-blur-[2px]" />
        </div>

        {/* CENTER CALLIGRAPHY & MINIMAL COPY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
          <span className="text-[11px] font-black tracking-widest uppercase text-bn-goldLight block mb-1">
            OUR SACRED PROMISE
          </span>
          <div className="font-urdu text-4xl sm:text-5xl md:text-6xl text-white my-2 font-bold leading-relaxed drop-shadow-lg">
            {APP_CONFIG.SLOGAN_URDU}
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md m-0 leading-relaxed font-light">
            Bringing enduring quiet, warmth, and culinary safety into Pakistani homes.
          </p>
        </div>
      </div>
    </section>
  );
}
