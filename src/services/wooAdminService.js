import { APP_CONFIG } from '../config/env';

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
  } catch (e) {
    // Ignore
  }
}

function getAuthHeaders() {
  const { key, secret } = getAdminCredentials();
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (key && secret) {
    const token = btoa(`${key}:${secret}`);
    headers['Authorization'] = `Basic ${token}`;
  }

  return headers;
}

async function requestV3(endpoint, method = 'GET', body = null) {
  const { key, secret } = getAdminCredentials();
  
  // Attach credentials via query parameters so proxies/CDN cannot strip them
  let fullUrl = `${APP_CONFIG.WC_V3_API_URL}${endpoint}`;
  if (key && secret) {
    const sep = fullUrl.includes('?') ? '&' : '?';
    fullUrl += `${sep}consumer_key=${encodeURIComponent(key)}&consumer_secret=${encodeURIComponent(secret)}`;
  }

  const options = {
    method,
    headers: getAuthHeaders()
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, options);
  if (!response.ok) {
    const errorText = await response.text();
    let errorMsg = `HTTP ${response.status}`;
    if (errorText.includes('secureservercdn2.net') || errorText.includes('Attention Required!') || errorText.includes('Cloudflare')) {
      errorMsg = 'Cloudflare/GoDaddy Firewall blocked this request (HTTP 403). The staging domain CDN is blocking REST API calls.';
    } else {
      try {
        const parsed = JSON.parse(errorText);
        if (parsed.message) errorMsg = parsed.message;
      } catch (e) {}
    }
    throw new Error(errorMsg);
  }

  return await response.json();
}

export async function fetchAdminOrders(status = '') {
  const query = status ? `?per_page=50&status=${status}` : '?per_page=50';
  return await requestV3(`/orders${query}`, 'GET');
}

export async function updateOrderStatus(orderId, newStatus) {
  return await requestV3(`/orders/${orderId}`, 'PUT', { status: newStatus });
}

export async function fetchAdminProducts(perPage = 50) {
  return await requestV3(`/products?per_page=${perPage}`, 'GET');
}

export async function createAdminProduct(productData) {
  return await requestV3('/products', 'POST', productData);
}

export async function updateAdminProduct(productId, productData) {
  return await requestV3(`/products/${productId}`, 'PUT', productData);
}

export async function deleteAdminProduct(productId) {
  return await requestV3(`/products/${productId}?force=true`, 'DELETE');
}

export async function updateAdminCategory(categoryId, categoryData) {
  return await requestV3(`/products/categories/${categoryId}`, 'PUT', categoryData);
}

export async function fetchAdminCategories() {
  return await requestV3('/products/categories?per_page=50', 'GET');
}

export async function createAdminCategory(categoryData) {
  return await requestV3('/products/categories', 'POST', categoryData);
}

export async function uploadMediaToWordPress(file) {
  const wpUser = localStorage.getItem('binnemat_wp_user') || APP_CONFIG.WP_USER || '';
  const wpPass = localStorage.getItem('binnemat_wp_app_pass') || APP_CONFIG.WP_APP_PASS || '';
  const endpoint = '/api-wp-v2/media';

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const headers = {
    'Content-Disposition': `attachment; filename="${cleanName}"`,
    'Content-Type': file.type || 'image/jpeg'
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
    body: file
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

export async function fetchWpSettings() {
  const wpUser = localStorage.getItem('binnemat_wp_user') || APP_CONFIG.WP_USER || '';
  const wpPass = localStorage.getItem('binnemat_wp_app_pass') || APP_CONFIG.WP_APP_PASS || '';
  const endpoint = '/api-wp-v2/settings';
  const headers = { 'Accept': 'application/json' };
  if (wpPass) headers['Authorization'] = 'Basic ' + btoa(`${wpUser}:${wpPass.replace(/\s+/g, '')}`);
  const res = await fetch(endpoint, { headers });
  if (!res.ok) throw new Error(`Failed to fetch settings: ${res.status}`);
  return await res.json();
}

export async function updateWpSettings(settingsData) {
  const wpUser = localStorage.getItem('binnemat_wp_user') || APP_CONFIG.WP_USER || '';
  const wpPass = localStorage.getItem('binnemat_wp_app_pass') || APP_CONFIG.WP_APP_PASS || '';
  const endpoint = '/api-wp-v2/settings';
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  if (wpPass) headers['Authorization'] = 'Basic ' + btoa(`${wpUser}:${wpPass.replace(/\s+/g, '')}`);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(settingsData)
  });
  if (!res.ok) throw new Error(`Failed to update settings: ${res.status}`);
  return await res.json();
}

export async function fetchMediaById(id) {
  const endpoint = `/api-wp-v2/media/${id}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Failed to fetch media #${id}`);
  return await res.json();
}
