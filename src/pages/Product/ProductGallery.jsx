import React, { useState } from 'react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';
import { ShieldCheck } from 'lucide-react';

export default function ProductGallery({ images, badge, name }) {
  const imageList = images && images.length > 0 ? images : [{ src: SAFE_SVG_PLACEHOLDER }];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentSrc = imageList[activeImageIndex]?.src || SAFE_SVG_PLACEHOLDER;

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN VIEWPORT WITH LUXURY SHADOW & BADGE */}
      <div className="glass-panel luxury-card rounded-3xl border-2 border-bn-borderLight dark:border-bn-borderDark bg-neutral-900 p-2 h-[380px] sm:h-[460px] flex items-center justify-center relative overflow-hidden shadow-xl group">
        <span className="absolute top-4 left-4 z-10 bg-neutral-950/90 text-bn-goldLight border border-bn-gold/40 text-xs font-black px-3.5 py-1 rounded-full shadow-md backdrop-blur-md">
          {badge || "100% BRAND SEALED"}
        </span>

        <span className="absolute bottom-4 right-4 z-10 bg-neutral-950/85 text-white border border-white/10 text-[11px] font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 backdrop-blur-md">
          <ShieldCheck size={14} className="text-bn-gold" />
          <span>Official Warranty Stamped</span>
        </span>

        <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-neutral-900">
          <img
            src={currentSrc}
            alt={name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* THUMBNAILS STRIP */}
      {imageList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`w-20 h-20 rounded-xl overflow-hidden p-1 border-2 transition-all bg-neutral-900 cursor-pointer flex-shrink-0 ${
                activeImageIndex === idx
                  ? 'border-bn-gold shadow-md scale-105'
                  : 'border-bn-borderLight dark:border-bn-borderDark opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.src}
                alt={`${name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
