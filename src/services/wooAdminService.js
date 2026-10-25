import { APP_CONFIG } from '../config/env';
import { 
  isCircuitBreakerOpen, 
  tripCircuitBreaker, 
  throttleRequest, 
  getCachedData, 
  setCachedData, 
  clearApiCache 
} from './apiShield';

function getAdminCredentials() {
  try {
    const localKey = localStorage.getItem('binnemat_admin_ck');
    const localSecret = localStorage.getItem('binnemat_admin_cs');
    if (localKey && localSecret) {
      return { key: localKey.trim(), secret: localSecret.trim() };
    }
  } catch (e) {
    // Ignore storage errors
  }

  const envKey = APP_CONFIG.WC_CONSUMER_KEY;
  const envSecret = APP_CONFIG.WC_CONSUMER_SECRET;
  if (envKey && envSecret) {
    return { key: envKey.trim(), secret: envSecret.trim() };
  }

  return { key: '', secret: '' };
}

export function hasAdminCredentials() {
  const { key, secret } = getAdminCredentials();
  return Boolean(key && secret);
}

export function saveAdminCredentials(key, secret) {
  try {
    localStorage.setItem('binnemat_admin_ck', key.trim());
    localStorage.setItem('binnemat_admin_cs', secret.trim());
    return true;
  } catch (e) {
    return false;
  }
}

export function clearAdminCredentials() {
  try {
    localStorage.removeItem('binnemat_admin_ck');
    localStorage.removeItem('binnemat_admin_cs');
  } catch (e) {}
}

/**
 * Build authentication and custom User-Agent headers
 */
function getAuthHeaders() {
  const { key, secret } = getAdminCredentials();
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Client-Agent': 'Binnemat-React-Client/1.0',
    'X-Requested-With': 'XMLHttpRequest'
  };

  if (key && secret) {
    const token = btoa(`${key}:${secret}`);
    headers['Authorization'] = `Basic ${token}`;
  }

  return headers;
}

/**
 * Robust request wrapper for WooCommerce REST API v3
 * - Supports AbortController (signal)
 * - Rate-limit (429) & 5xx retry with Exponential Backoff (1s, 2s, max 2)
 * - Circuit breaker protection on 401/403/429
 * - Client-side caching and throttling
 */
async function requestV3(endpoint, method = 'GET', body = null, options = {}) {
  const cacheKey = `V3_${endpoint}`;

  // 1. Check cache first for GET requests
  if (method === 'GET' && !options.skipCache) {
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
  }

  // 2. Protect IP with Circuit Breaker
  if (isCircuitBreakerOpen()) {
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    throw new Error('Server rate-limiting or firewall cooldown active. Please wait 5 minutes.');
  }

  // 3. Smooth out bursts with micro-throttling
  await throttleRequest();

  const { key, secret } = getAdminCredentials();
  
  // Attach credentials via query parameters so proxies/CDN cannot strip them
  let fullUrl = `${APP_CONFIG.WC_V3_API_URL}${endpoint}`;
  if (key && secret) {
    const sep = fullUrl.includes('?') ? '&' : '?';
    fullUrl += `${sep}consumer_key=${encodeURIComponent(key)}&consumer_secret=${encodeURIComponent(secret)}`;
  }

  const fetchOptions = {
    method,
    headers: getAuthHeaders(),
    signal: options.signal
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    fetchOptions.body = JSON.stringify(body);
  }

  let attempt = 0;
  const maxRetries = 2;

  while (true) {
    try {
      const response = await fetch(fullUrl, fetchOptions);

      // Handle 401 or 403: trip circuit breaker and never loop retry
      if (response.status === 401 || response.status === 403) {
        tripCircuitBreaker(`Admin API HTTP ${response.status} (Access Denied / Security Block)`);
        const err = new Error(`HTTP ${response.status}: Server security firewall restricted this request. Cooldown active.`);
        err.status = response.status;
        throw err;
      }

      // Handle 429 Too Many Requests with Exponential Backoff
      if (response.status === 429) {
        tripCircuitBreaker('Admin API HTTP 429: Too Many Requests');
        if (attempt < maxRetries) {
          attempt++;
          const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
          console.warn(`[v3 API] Rate limited (429). Retrying in ${backoff}ms (attempt ${attempt}/${maxRetries})...`);
          await new Promise(r => setTimeout(r, backoff));
          continue;
        }
        const err = new Error('HTTP 429: Rate limit reached. Requests paused to protect server.');
        err.status = 429;
        throw err;
      }

      // Retry on 5xx server errors up to maxRetries
      if (response.status >= 500 && attempt < maxRetries) {
        attempt++;
        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
        console.warn(`[v3 API] Server 5xx. Retrying in ${backoff}ms (attempt ${attempt}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, backoff));
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        let errorMsg = `HTTP ${response.status}`;
        try {
          const parsed = JSON.parse(errorText);
          if (parsed.message) errorMsg = parsed.message;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (method === 'GET') {
        setCachedData(cacheKey, data, 2 * 60 * 1000); // 2 minutes for admin GET
      } else {
        clearApiCache(); // Invalidate stale data on update
      }

      return data;
    } catch (err) {
      if (err.name === 'AbortError' || err.status === 401 || err.status === 403 || err.status === 429) {
        throw err;
      }
      if (attempt < maxRetries) {
        attempt++;
        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
        console.warn(`[v3 API] Network failure. Retrying in ${backoff}ms (attempt ${attempt}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, backoff));
        continue;
      }
      throw err;
    }
  }
}

export async function fetchAdminOrders(status = '', options = {}) {
  const query = status ? `?per_page=50&status=${status}` : '?per_page=50';
  return await requestV3(`/orders${query}`, 'GET', null, options);
}

export async function updateOrderStatus(orderId, newStatus, options = {}) {
  return await requestV3(`/orders/${orderId}`, 'PUT', { status: newStatus }, options);
}

export async function fetchAdminProducts(perPage = 50, options = {}) {
  return await requestV3(`/products?per_page=${perPage}`, 'GET', null, options);
}

export async function createAdminProduct(productData, options = {}) {
  return await requestV3('/products', 'POST', productData, options);
}

export async function updateAdminProduct(productId, productData, options = {}) {
  return await requestV3(`/products/${productId}`, 'PUT', productData, options);
}

export async function deleteAdminProduct(productId, options = {}) {
  return await requestV3(`/products/${productId}?force=true`, 'DELETE', null, options);
}

export async function updateAdminCategory(categoryId, categoryData, options = {}) {
  return await requestV3(`/products/categories/${categoryId}`, 'PUT', categoryData, options);
}

export async function fetchAdminCategories(options = {}) {
  return await requestV3('/products/categories?per_page=50', 'GET', null, options);
}

export async function createAdminCategory(categoryData, options = {}) {
  return await requestV3('/products/categories', 'POST', categoryData, options);
}

export async function uploadMediaToWordPress(file, options = {}) {
  const wpUser = localStorage.getItem('binnemat_wp_user') || APP_CONFIG.WP_USER || '';
  const wpPass = localStorage.getItem('binnemat_wp_app_pass') || APP_CONFIG.WP_APP_PASS || '';
  const endpoint = '/api-wp-v2/media';

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const headers = {
    'Content-Disposition': `attachment; filename="${cleanName}"`,
    'Content-Type': file.type || 'image/jpeg',
    'X-Client-Agent': 'Binnemat-React-Client/1.0',
    'X-Requested-With': 'XMLHttpRequest'
  };

  if (wpPass) {
    headers['Authorization'] = 'Basic ' + btoa(`${wpUser}:${wpPass.replace(/\s+/g, '')}`);
  } else {
    const { key, secret } = getAdminCredentials();
    if (key && secret) {
      headers['Authorization'] = 'Basic ' + btoa(`${key}:${secret}`);
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: file,
    signal: options.signal
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMsg = `Upload failed (${response.status})`;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.message) errorMsg = parsed.message;
    } catch (e) {}
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return {
    id: data.id,
    url: data.source_url || data.guid?.rendered
  };
}

export async function fetchWpSettings(options = {}) {
  const wpUser = localStorage.getItem('binnemat_wp_user') || APP_CONFIG.WP_USER || '';
  const wpPass = localStorage.getItem('binnemat_wp_app_pass') || APP_CONFIG.WP_APP_PASS || '';
  
  // Never fire an unauthenticated request to /wp/v2/settings (WordPress returns 401 and causes IP ban)
  if (!wpPass) {
    return {};
  }

  const cached = getCachedData('WP_SETTINGS');
  if (cached && !options.skipCache) return cached;

  if (isCircuitBreakerOpen()) {
    return {};
  }

  await throttleRequest();

  const endpoint = '/api-wp-v2/settings';
  const headers = { 
    'Accept': 'application/json',
    'X-Client-Agent': 'Binnemat-React-Client/1.0',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Basic ' + btoa(`${wpUser}:${wpPass.replace(/\s+/g, '')}`)
  };
  
  const res = await fetch(endpoint, { headers, signal: options.signal });
  if (res.status === 401 || res.status === 403 || res.status === 429) {
    tripCircuitBreaker(`WP Settings HTTP ${res.status}`);
    return {};
  }
  if (!res.ok) throw new Error(`Failed to fetch settings: ${res.status}`);
  const data = await res.json();
  setCachedData('WP_SETTINGS', data, 10 * 60 * 1000);
  return data;
}

export async function updateWpSettings(settingsData, options = {}) {
  const wpUser = localStorage.getItem('binnemat_wp_user') || APP_CONFIG.WP_USER || '';
  const wpPass = localStorage.getItem('binnemat_wp_app_pass') || APP_CONFIG.WP_APP_PASS || '';
  const endpoint = '/api-wp-v2/settings';
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Agent': 'Binnemat-React-Client/1.0',
    'X-Requested-With': 'XMLHttpRequest'
  };
  if (wpPass) headers['Authorization'] = 'Basic ' + btoa(`${wpUser}:${wpPass.replace(/\s+/g, '')}`);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(settingsData),
    signal: options.signal
  });
  if (!res.ok) throw new Error(`Failed to update settings: ${res.status}`);
  return await res.json();
}

export async function fetchMediaById(id, options = {}) {
  const endpoint = `/api-wp-v2/media/${id}`;
  const res = await fetch(endpoint, { signal: options.signal });
  if (!res.ok) throw new Error(`Failed to fetch media #${id}`);
  return await res.json();
}
