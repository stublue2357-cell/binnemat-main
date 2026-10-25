import { APP_CONFIG } from '../config/env';
import { 
  getCachedData, 
  setCachedData, 
  clearApiCache, 
  isCircuitBreakerOpen, 
  tripCircuitBreaker, 
  throttleRequest, 
  deduplicateRequest 
} from './apiShield';

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

/**
 * Build request headers with custom Client identification
 */
function buildHeaders(extra = {}) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Client-Agent': 'Binnemat-React-Client/1.0',
    'X-Requested-With': 'XMLHttpRequest',
    ...extra
  };
  const nonce = getStoredHeader('wc_nonce');
  const cartToken = getStoredHeader('wc_cart_token');
  if (nonce) headers['Nonce'] = nonce;
  if (cartToken) headers['Cart-Token'] = cartToken;
  return headers;
}

/**
 * Fetch wrapper with Exponential Backoff retry strategy
 * - Max 2 retries on 429 or 5xx errors (1000ms, 2000ms)
 * - NEVER retries on 401, 403, or 404 (prevents IP blacklisting)
 */
async function fetchWithRetry(url, fetchOptions, maxRetries = 2) {
  let attempt = 0;

  while (true) {
    try {
      const response = await fetch(url, fetchOptions);

      // Immediately intercept 401 or 403: trip circuit breaker and never loop retry
      if (response.status === 401 || response.status === 403) {
        tripCircuitBreaker(`Server responded with HTTP ${response.status} (Access Denied / Firewall Block)`);
        const err = new Error(`HTTP ${response.status}: Firewall or Authentication Block`);
        err.status = response.status;
        throw err;
      }

      // Intercept 429 Too Many Requests
      if (response.status === 429) {
        tripCircuitBreaker('Server responded with HTTP 429 (Rate Limit Exceeded)');
        if (attempt < maxRetries) {
          attempt++;
          const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
          console.warn(`[API Client] HTTP 429 Rate limit. Backing off for ${backoff}ms (attempt ${attempt}/${maxRetries})...`);
          await new Promise(r => setTimeout(r, backoff));
          continue;
        }
        const err = new Error('HTTP 429: Too Many Requests - Pausing calls to protect IP');
        err.status = 429;
        throw err;
      }

      // Retry on 5xx server errors up to maxRetries
      if (response.status >= 500 && attempt < maxRetries) {
        attempt++;
        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
        console.warn(`[API Client] Server 5xx error. Retrying in ${backoff}ms (attempt ${attempt}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, backoff));
        continue;
      }

      return response;
    } catch (err) {
      if (err.name === 'AbortError' || err.status === 401 || err.status === 403 || err.status === 429) {
        throw err;
      }
      if (attempt < maxRetries) {
        attempt++;
        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
        console.warn(`[API Client] Network failure. Retrying in ${backoff}ms (attempt ${attempt}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, backoff));
        continue;
      }
      throw err;
    }
  }
}

/**
 * Enhanced GET with Cache, Deduplication, AbortController, Throttling & Circuit Breaker
 */
export async function getJson(endpoint, customHeaders = {}, options = {}) {
  const cacheKey = `GET_${endpoint}`;

  // 1. Check client-side memory/session cache first (0 network calls)
  if (!options.skipCache) {
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }
  }

  // 2. Circuit Breaker protection check (stops hammering when server is blocked/cooling down)
  if (isCircuitBreakerOpen()) {
    const staleData = getCachedData(cacheKey);
    if (staleData) return staleData;
    throw new Error('Backend in cooldown to protect your IP from rate-limits. Serving cached/fallback data.');
  }

  // 3. Deduplicate in-flight requests (concurrent calls share 1 network request)
  return deduplicateRequest(cacheKey, async () => {
    await throttleRequest();

    // Use caller's AbortSignal if provided (TanStack Query cancellation), or create timeout signal
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), APP_CONFIG.REQUEST_TIMEOUT_MS);

    let signalToUse = timeoutController.signal;
    if (options.signal) {
      // If caller aborts, abort our controller
      options.signal.addEventListener('abort', () => timeoutController.abort());
    }

    try {
      const url = `${APP_CONFIG.WP_API_URL}${endpoint}`;
      const response = await fetchWithRetry(url, {
        signal: signalToUse,
        headers: buildHeaders(customHeaders)
      });

      clearTimeout(timeoutId);
      extractHeaders(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      const cachedFallback = getCachedData(cacheKey);
      if (cachedFallback) {
        return cachedFallback;
      }
      throw error;
    }
  });
}

/**
 * Enhanced POST with Circuit Breaker Protection, AbortController & Cache Invalidation
 */
export async function postJson(endpoint, body = {}, customHeaders = {}, options = {}) {
  if (isCircuitBreakerOpen()) {
    throw new Error('Backend in cooldown to protect your IP from rate-limits. Please retry shortly.');
  }

  await throttleRequest();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.REQUEST_TIMEOUT_MS);

  if (options.signal) {
    options.signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const url = `${APP_CONFIG.WP_API_URL}${endpoint}`;
    const response = await fetchWithRetry(url, {
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

    const data = await response.json();
    clearApiCache(); // Invalidate stale read caches
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Enhanced DELETE with Circuit Breaker Protection
 */
export async function deleteJson(endpoint, customHeaders = {}, options = {}) {
  if (isCircuitBreakerOpen()) {
    throw new Error('Backend in cooldown to protect your IP from rate-limits.');
  }

  await throttleRequest();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.REQUEST_TIMEOUT_MS);

  if (options.signal) {
    options.signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const url = `${APP_CONFIG.WP_API_URL}${endpoint}`;
    const response = await fetchWithRetry(url, {
      method: 'DELETE',
      signal: controller.signal,
      headers: buildHeaders(customHeaders)
    });

    clearTimeout(timeoutId);
    extractHeaders(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    clearApiCache();
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
