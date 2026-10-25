import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';
import { ShieldCheck } from 'lucide-react';

export default function ProductGallery({ images, badge, name }) {
  const imageList = images && images.length > 0 ? images : [{ src: SAFE_SVG_PLACEHOLDER }];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
      );
    }, el);

    return () => ctx.revert();
  }, [name]);

  const currentSrc = imageList[activeImageIndex]?.src || SAFE_SVG_PLACEHOLDER;

  return (
    <div ref={galleryRef} className="flex flex-col gap-4">
      {/* MAIN VIEWPORT WITH LUXURY SHADOW & BADGE */}
      <div className="glass-apple-card rounded-3xl border border-[#E5E4E2] dark:border-white/10 bg-[#F7F6F4] dark:bg-[#12100E] p-2 h-[380px] sm:h-[460px] flex items-center justify-center relative overflow-hidden shadow-xl group">
        <span className="absolute top-4 left-4 z-10 bg-[#E6EDFD]/95 dark:bg-[#1A1715]/95 text-[#6F4E37] dark:text-[#E6EDFD] border border-[#E5E4E2] dark:border-white/10 text-xs font-mono font-bold px-3.5 py-1 rounded-full shadow-md backdrop-blur-md">
          {badge || "100% BRAND SEALED"}
        </span>

        <span className="absolute bottom-4 right-4 z-10 bg-white/90 dark:bg-[#1A1715]/90 text-slate-800 dark:text-slate-200 border border-[#E5E4E2] dark:border-white/10 text-[11px] font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 backdrop-blur-md">
          <ShieldCheck size={14} className="text-[#6F4E37] dark:text-[#C49774]" />
          <span>Official Warranty Stamped</span>
        </span>

        <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-transparent">
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
              className={`w-20 h-20 rounded-xl overflow-hidden p-1 border-2 transition-all bg-[#F7F6F4] dark:bg-[#1A1715] cursor-pointer flex-shrink-0 ${
                activeImageIndex === idx
                  ? 'border-[#6F4E37] shadow-md scale-105'
                  : 'border-[#E5E4E2] dark:border-white/10 opacity-70 hover:opacity-100'
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
