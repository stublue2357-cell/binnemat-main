import React, { useRef, useState } from 'react';
import { Button, Tag, message } from 'antd';
import { Image, UploadCloud, RotateCcw, Sparkles } from 'lucide-react';
import { useSiteBranding } from '../../context/SiteBrandingContext';
import Logo from '../../components/common/Logo';

export default function AdminBrandingCard() {
  const { 
    siteLogo, 
    siteFavicon, 
    uploadSiteLogo, 
    uploadSiteFavicon, 
    resetSiteLogo, 
    resetSiteFavicon 
  } = useSiteBranding();

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const handleLogoFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await uploadSiteLogo(file);
      message.success('New logo uploaded to WordPress & set live on Header/Footer!');
    } catch (err) {
      message.error('Failed to upload logo: ' + err.message);
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const handleFaviconFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFavicon(true);
    try {
      const url = await uploadSiteFavicon(file);
      message.success('New favicon uploaded to WordPress & set live on browser tab!');
    } catch (err) {
      message.error('Failed to upload favicon: ' + err.message);
    } finally {
      setUploadingFavicon(false);
      if (faviconInputRef.current) faviconInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 rounded-3xl border border-bn-borderLight dark:border-neutral-800 bg-white dark:bg-[#18181B] shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-cinzel text-lg font-bold text-neutral-900 dark:text-neutral-100 m-0 flex items-center gap-2">
            <Sparkles size={18} className="text-bn-gold" />
            <span>Store Branding & Identity (Logo & Favicon)</span>
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 mt-0.5">
            Images uploaded here save directly to WordPress Media Library and display live.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. SITE LOGO */}
        <div className="p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <Image size={14} className="text-bn-gold" />
              <span>Header & Footer Logo</span>
            </span>
            <Tag color={siteLogo ? 'gold' : 'blue'}>
              {siteLogo ? 'CUSTOM LOGO' : 'DEFAULT TEXT'}
            </Tag>
          </div>

          <div className="h-20 rounded-xl bg-white dark:bg-black/40 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-3 overflow-hidden">
            <Logo logoSrc={siteLogo} />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="file"
              ref={logoInputRef}
              onChange={handleLogoFile}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="primary"
              size="small"
              icon={<UploadCloud size={13} />}
              loading={uploadingLogo}
              onClick={() => logoInputRef.current?.click()}
              className="rounded-lg font-semibold bg-bn-gold hover:bg-bn-goldDark border-none text-white text-xs h-8 flex-1"
            >
              Upload New Logo
            </Button>
            {siteLogo && (
              <Button
                size="small"
                icon={<RotateCcw size={12} />}
                onClick={resetSiteLogo}
                className="rounded-lg text-xs h-8 text-neutral-500"
              >
                Reset Default
              </Button>
            )}
          </div>
          <span className="text-[10px] text-neutral-400 block font-light">
            If no image uploaded, default luxury typography logo displays automatically.
          </span>
        </div>

        {/* 2. SITE FAVICON */}
        <div className="p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <Sparkles size={14} className="text-bn-gold" />
              <span>Browser Tab Favicon</span>
            </span>
            <Tag color={siteFavicon ? 'gold' : 'blue'}>
              {siteFavicon ? 'CUSTOM FAVICON' : 'DEFAULT GOLD B'}
            </Tag>
          </div>

          <div className="h-20 rounded-xl bg-white dark:bg-black/40 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-3">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <img
                src={siteFavicon || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23C49A45'/><text x='50%' y='55%' font-family='serif' font-weight='bold' font-size='40' fill='%23FFFFFF' text-anchor='middle' dominant-baseline='middle'>B</text></svg>"}
                alt="Favicon"
                className="w-5 h-5 rounded object-contain"
              />
              <span className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
                Binnemat | Appliances
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="file"
              ref={faviconInputRef}
              onChange={handleFaviconFile}
              accept="image/png,image/x-icon,image/svg+xml,image/jpeg"
              className="hidden"
            />
            <Button
              type="primary"
              size="small"
              icon={<UploadCloud size={13} />}
              loading={uploadingFavicon}
              onClick={() => faviconInputRef.current?.click()}
              className="rounded-lg font-semibold bg-bn-gold hover:bg-bn-goldDark border-none text-white text-xs h-8 flex-1"
            >
              Upload Favicon
            </Button>
            {siteFavicon && (
              <Button
                size="small"
                icon={<RotateCcw size={12} />}
                onClick={resetSiteFavicon}
                className="rounded-lg text-xs h-8 text-neutral-500"
              >
                Reset Default
              </Button>
            )}
          </div>
          <span className="text-[10px] text-neutral-400 block font-light">
            Updates browser tab icon instantly and saves in WordPress site_icon.
          </span>
        </div>
      </div>
    </div>
  );
}
