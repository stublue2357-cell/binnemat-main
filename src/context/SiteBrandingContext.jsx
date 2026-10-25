import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWpSettings, updateWpSettings, fetchMediaById, uploadMediaToWordPress } from '../services/wooAdminService';
import { APP_CONFIG } from '../config/env';

const DEFAULT_FAVICON_SVG = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23C49A45'/><text x='50%' y='55%' font-family='serif' font-weight='bold' font-size='40' fill='%23FFFFFF' text-anchor='middle' dominant-baseline='middle'>B</text></svg>";

const DEFAULT_ADDRESS = 'Akbar Butt Wala Gala, Hafizabad Road, Gujranwala, Pakistan';
const DEFAULT_WHATSAPP = APP_CONFIG.WHATSAPP_NUMBER || '923212418430';

const SiteBrandingContext = createContext({
  siteLogo: null,
  siteFavicon: null,
  whatsappNumber: DEFAULT_WHATSAPP,
  supportPhone: '+92 321 2418430',
  supportEmail: 'sales@binnemat.com',
  storeAddress: DEFAULT_ADDRESS,
  uploadSiteLogo: async () => {},
  uploadSiteFavicon: async () => {},
  resetSiteLogo: async () => {},
  resetSiteFavicon: async () => {},
  updateContactSettings: () => {},
  getWhatsAppLink: () => '',
  loading: false
});

function applyFaviconToDocument(url) {
  try {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = url || DEFAULT_FAVICON_SVG;
  } catch (e) {}
}

export function SiteBrandingProvider({ children }) {
  const [siteLogo, setSiteLogo] = useState(() => localStorage.getItem('binnemat_custom_logo') || null);
  const [siteFavicon, setSiteFavicon] = useState(() => localStorage.getItem('binnemat_custom_favicon') || null);
  const [whatsappNumber, setWhatsappNumber] = useState(() => localStorage.getItem('binnemat_whatsapp') || DEFAULT_WHATSAPP);
  const [supportPhone, setSupportPhone] = useState(() => localStorage.getItem('binnemat_support_phone') || '+92 321 2418430');
  const [supportEmail, setSupportEmail] = useState(() => localStorage.getItem('binnemat_support_email') || 'sales@binnemat.com');
  const [storeAddress, setStoreAddress] = useState(() => localStorage.getItem('binnemat_store_address') || DEFAULT_ADDRESS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    applyFaviconToDocument(siteFavicon);
  }, [siteFavicon]);

  useEffect(() => {
    let isMounted = true;
    async function syncBackendSettings() {
      // Never probe admin settings for storefront visitors (prevents 401s and IP ban)
      const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.includes('bn-portal');
      const hasWpCreds = localStorage.getItem('binnemat_wp_app_pass') || APP_CONFIG.WP_APP_PASS;
      if (!isAdminRoute || !hasWpCreds) return;

      try {
        const settings = await fetchWpSettings();
        if (!isMounted || !settings || Object.keys(settings).length === 0) return;

        if (settings.site_logo && Number(settings.site_logo) > 1965) {
          const cachedId = localStorage.getItem('binnemat_custom_logo_id');
          if (String(settings.site_logo) !== cachedId) {
            const media = await fetchMediaById(settings.site_logo);
            if (media?.source_url) {
              setSiteLogo(media.source_url);
              localStorage.setItem('binnemat_custom_logo', media.source_url);
              localStorage.setItem('binnemat_custom_logo_id', String(settings.site_logo));
            }
          }
        }

        if (settings.site_icon && Number(settings.site_icon) > 0) {
          const cachedFavId = localStorage.getItem('binnemat_custom_favicon_id');
          if (String(settings.site_icon) !== cachedFavId) {
            const media = await fetchMediaById(settings.site_icon);
            if (media?.source_url) {
              setSiteFavicon(media.source_url);
              localStorage.setItem('binnemat_custom_favicon', media.source_url);
              localStorage.setItem('binnemat_custom_favicon_id', String(settings.site_icon));
            }
          }
        }
      } catch (err) {}
    }
    syncBackendSettings();
    return () => { isMounted = false; };
  }, []);

  const uploadSiteLogo = async (file) => {
    setLoading(true);
    try {
      const media = await uploadMediaToWordPress(file);
      setSiteLogo(media.url);
      localStorage.setItem('binnemat_custom_logo', media.url);
      localStorage.setItem('binnemat_custom_logo_id', String(media.id));
      await updateWpSettings({ site_logo: media.id }).catch(() => {});
      return media.url;
    } finally {
      setLoading(false);
    }
  };

  const uploadSiteFavicon = async (file) => {
    setLoading(true);
    try {
      const media = await uploadMediaToWordPress(file);
      setSiteFavicon(media.url);
      localStorage.setItem('binnemat_custom_favicon', media.url);
      localStorage.setItem('binnemat_custom_favicon_id', String(media.id));
      applyFaviconToDocument(media.url);
      await updateWpSettings({ site_icon: media.id }).catch(() => {});
      return media.url;
    } finally {
      setLoading(false);
    }
  };

  const resetSiteLogo = async () => {
    setSiteLogo(null);
    localStorage.removeItem('binnemat_custom_logo');
    localStorage.removeItem('binnemat_custom_logo_id');
    await updateWpSettings({ site_logo: 0 }).catch(() => {});
  };

  const resetSiteFavicon = async () => {
    setSiteFavicon(null);
    localStorage.removeItem('binnemat_custom_favicon');
    localStorage.removeItem('binnemat_custom_favicon_id');
    applyFaviconToDocument(null);
    await updateWpSettings({ site_icon: 0 }).catch(() => {});
  };

  const updateContactSettings = ({ whatsapp, phone, email, address }) => {
    if (whatsapp) {
      const clean = whatsapp.replace(/[^0-9]/g, '');
      setWhatsappNumber(clean);
      localStorage.setItem('binnemat_whatsapp', clean);
    }
    if (phone) {
      setSupportPhone(phone.trim());
      localStorage.setItem('binnemat_support_phone', phone.trim());
    }
    if (email) {
      setSupportEmail(email.trim());
      localStorage.setItem('binnemat_support_email', email.trim());
    }
    if (address) {
      setStoreAddress(address.trim());
      localStorage.setItem('binnemat_store_address', address.trim());
    }
  };

  const getWhatsAppLink = (customText = '') => {
    const defaultMsg = 'Salam Binnemat, I have an inquiry regarding certified appliances and pricing.';
    const text = encodeURIComponent(customText || defaultMsg);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <SiteBrandingContext.Provider
      value={{
        siteLogo,
        siteFavicon,
        whatsappNumber,
        supportPhone,
        supportEmail,
        storeAddress,
        uploadSiteLogo,
        uploadSiteFavicon,
        resetSiteLogo,
        resetSiteFavicon,
        updateContactSettings,
        getWhatsAppLink,
        loading
      }}
    >
      {children}
    </SiteBrandingContext.Provider>
  );
}

export function useSiteBranding() {
  return useContext(SiteBrandingContext);
}
