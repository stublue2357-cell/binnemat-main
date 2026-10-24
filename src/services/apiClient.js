import { APP_CONFIG } from '../config/env';

function getStoredHeader(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function setStoredHeader(key, val) {
  try {
    if (val) localStorage.setItem(key, val);
  } catch (e) {
    // Ignore storage failure
  }
}

function extractHeaders(response) {
  const nonce = response.headers.get('Nonce');
  const cartToken = response.headers.get('Cart-Token');
  if (nonce) setStoredHeader('wc_nonce', nonce);
  if (cartToken) setStoredHeader('wc_cart_token', cartToken);
}

function buildHeaders(extra = {}) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...extra
  };
  const nonce = getStoredHeader('wc_nonce');
  const cartToken = getStoredHeader('wc_cart_token');
  if (nonce) headers['Nonce'] = nonce;
  if (cartToken) headers['Cart-Token'] = cartToken;
  return headers;
}

export async function getJson(endpoint, customHeaders = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.REQUEST_TIMEOUT_MS);

  try {
    const url = `${APP_CONFIG.WP_API_URL}${endpoint}`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: buildHeaders(customHeaders)
    });

    clearTimeout(timeoutId);
    extractHeaders(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function postJson(endpoint, body = {}, customHeaders = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.REQUEST_TIMEOUT_MS);

  try {
    const url = `${APP_CONFIG.WP_API_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: buildHeaders(customHeaders),
      body: JSON.stringify(body)
    });

    clearTimeout(timeoutId);
    extractHeaders(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function deleteJson(endpoint, customHeaders = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.REQUEST_TIMEOUT_MS);

  try {
    const url = `${APP_CONFIG.WP_API_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'DELETE',
      signal: controller.signal,
      headers: buildHeaders(customHeaders)
    });

    clearTimeout(timeoutId);
    extractHeaders(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
