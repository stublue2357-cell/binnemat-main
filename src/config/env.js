// Application Environment Configuration (12-Factor App)
function resolveWpApiUrl() {
  const envUrl = import.meta.env.VITE_WP_API_URL || 'https://1301029.us21.myftpupload.com/wp-json/wc/store/v1';
  if (import.meta.env.DEV) {
    return '/api-wc';
  }
  return envUrl.replace(/([^:])\/\//g, '$1/');
}

function resolveWcV3ApiUrl() {
  const envUrl = import.meta.env.VITE_WC_V3_URL || 'https://1301029.us21.myftpupload.com/wp-json/wc/v3';
  if (import.meta.env.DEV) {
    return '/api-wc-v3';
  }
  return envUrl.replace(/([^:])\/\//g, '$1/');
}

export const APP_CONFIG = Object.freeze({
  WP_API_URL: resolveWpApiUrl(),
  WC_V3_API_URL: resolveWcV3ApiUrl(),
  WC_CONSUMER_KEY: import.meta.env.VITE_WC_CONSUMER_KEY || '',
  WC_CONSUMER_SECRET: import.meta.env.VITE_WC_CONSUMER_SECRET || '',
  ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD || '',
  ADMIN_PATH: import.meta.env.VITE_ADMIN_PATH || '/bn-portal-2026',
  WP_USER: import.meta.env.VITE_WP_USER || '',
  WP_APP_PASS: import.meta.env.VITE_WP_APP_PASS || '',
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || '923212418430',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Binnemat',
  SLOGAN_URDU: import.meta.env.VITE_APP_SLOGAN_URDU || 'ہر گھر کا سکون',
  DEVELOPER_NAME: 'Awais Ahmad',
  DEVELOPER_PHONE: '+92 321 2418430',
  DEVELOPER_WHATSAPP: 'https://wa.me/923212418430',
  REQUEST_TIMEOUT_MS: 10000
});

export function getWhatsAppOrderUrl(productName, price) {
  const message = encodeURIComponent(
    `Salam Binnemat, I want to order this appliance: ${productName} (${price}). Please confirm stock and delivery timeline.`
  );
  return `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${message}`;
}
