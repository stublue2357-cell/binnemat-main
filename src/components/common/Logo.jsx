import React, { useState } from 'react';
import { useSiteBranding } from '../../context/SiteBrandingContext';
import { APP_CONFIG } from '../../config/env';

export default function Logo({ logoSrc, onClick }) {
  const { siteLogo } = useSiteBranding();
  const [imgError, setImgError] = useState(false);

  // If prop passed use it, otherwise use context siteLogo
  const effectiveLogo = logoSrc !== undefined && logoSrc !== null ? logoSrc : siteLogo;

  if (effectiveLogo && !imgError) {
    return (
      <div onClick={onClick} className="cursor-pointer flex items-center">
        <img
          src={effectiveLogo}
          alt={APP_CONFIG.APP_NAME}
          className="h-9 md:h-11 w-auto max-w-[180px] object-contain transition-transform duration-300 hover:scale-105"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div onClick={onClick} className="cursor-pointer flex items-center gap-2.5 select-none group text-left">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6F4E37] to-[#8C6547] flex items-center justify-center p-0.5 shadow-[0_0_12px_rgba(111,78,55,0.25)] group-hover:scale-105 transition-transform">
        <div className="w-full h-full rounded-full bg-white dark:bg-[#111018] flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#6F4E37] animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-wix font-extrabold text-xl tracking-tight text-slate-900 dark:text-white lowercase leading-none">
          binnemat
        </span>
        <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#C49774] uppercase mt-0.5 font-bold">
          Thermal &bull; Inverter
        </span>
      </div>
    </div>
  );
}
