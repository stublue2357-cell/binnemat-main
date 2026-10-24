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
    <div onClick={onClick} className="cursor-pointer flex flex-col select-none">
      <span className="font-cinzel text-2xl font-black tracking-wider text-neutral-900 dark:text-neutral-100 leading-none">
        {APP_CONFIG.APP_NAME.toUpperCase()}<span className="text-bn-gold">.</span>
      </span>
      <span className="font-urdu text-xs font-bold text-bn-goldDark dark:text-bn-goldLight mt-1 text-right">
        {APP_CONFIG.SLOGAN_URDU}
      </span>
    </div>
  );
}
