/**
 * BINNEMAT API SHIELD & ANTI-BLOCK PROTECTION SYSTEM
 * 
 * Protects WooCommerce and WordPress backend from:
 * 1. IP Ban / Cloudflare / ModSecurity 403 blocks due to rapid API calls.
 * 2. Unnecessary redundant network requests (In-memory + SessionStorage TTL Cache).
 * 3. In-flight request deduplication (prevents parallel burst hammering).
 * 4. Circuit Breaker: Automatically trips if server returns 401/403/429, halting all outbound
 *    requests for a cooldown period to protect the client's IP from being blacklisted.
 */

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache for product and category data
const COOLDOWN_DURATION_MS = 5 * 60 * 1000; // 5 minutes cooldown if 401, 403, or 429 encountered
const MIN_REQUEST_INTERVAL_MS = 150; // Minimum 150ms gap between network calls to prevent burst rate limits

// In-memory cache
const memoryCache = new Map();
// In-flight active promises for deduplication
const inFlightRequests = new Map();
let lastRequestTimestamp = 0;

/**
 * Check if the Circuit Breaker is active (preventing outbound calls to protect IP)
 */
export function isCircuitBreakerOpen() {
  try {
    const tripUntil = sessionStorage.getItem('bn_api_circuit_trip_until');
    if (!tripUntil) return false;
    const until = Number(tripUntil);
    if (Date.now() < until) {
      const remainingSec = Math.ceil((until - Date.now()) / 1000);
      console.warn(`[API Shield] Circuit breaker active. Halting backend requests for ${remainingSec}s to protect IP.`);
      return true;
    }
    // Cooldown expired
    sessionStorage.removeItem('bn_api_circuit_trip_until');
    return false;
  } catch (e) {
    return false;
  }
}

export function tripCircuitBreaker(reason = 'Rate limit or firewall block', durationMs = COOLDOWN_DURATION_MS) {
  try {
    const until = Date.now() + durationMs;
    sessionStorage.setItem('bn_api_circuit_trip_until', String(until));
    console.error(`[API Shield] 🚨 Circuit Breaker TRIPPED: ${reason}. All backend calls paused for ${durationMs / 1000}s to prevent permanent IP ban.`);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('binnemat:circuit-breaker-tripped', {
        detail: { reason, durationMs, until }
      }));
    }
  } catch (e) {
    // Ignore storage issues
  }
}

/**
 * Reset the circuit breaker manually (e.g. from admin panel)
 */
export function resetCircuitBreaker() {
  try {
    sessionStorage.removeItem('bn_api_circuit_trip_until');
    memoryCache.clear();
    console.log('[API Shield] Circuit breaker and cache reset successfully.');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('binnemat:circuit-breaker-reset'));
    }
  } catch (e) {}
}

/**
 * Get cached data if valid and not expired
 */
export function getCachedData(cacheKey) {
  // 1. Check memory cache
  const memItem = memoryCache.get(cacheKey);
  if (memItem && Date.now() < memItem.expiry) {
    return memItem.data;
  }

  // 2. Check sessionStorage
  try {
    const raw = sessionStorage.getItem(`bn_cache_${cacheKey}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Date.now() < parsed.expiry) {
        // Hydrate memory cache
        memoryCache.set(cacheKey, parsed);
        return parsed.data;
      }
      sessionStorage.removeItem(`bn_cache_${cacheKey}`);
    }
  } catch (e) {}

  return null;
}

/**
 * Save data to cache with TTL
 */
export function setCachedData(cacheKey, data, ttlMs = CACHE_TTL_MS) {
  if (!data) return;
  const item = {
    data,
    expiry: Date.now() + ttlMs,
    timestamp: Date.now()
  };

  memoryCache.set(cacheKey, item);

  try {
    sessionStorage.setItem(`bn_cache_${cacheKey}`, JSON.stringify(item));
  } catch (e) {
    // Quota exceeded, clear older entries
    try {
      sessionStorage.clear();
    } catch (ignore) {}
  }
}

/**
 * Clear all cache entries
 */
export function clearApiCache() {
  memoryCache.clear();
  try {
    Object.keys(sessionStorage).forEach(k => {
      if (k.startsWith('bn_cache_')) {
        sessionStorage.removeItem(k);
      }
    });
  } catch (e) {}
}

/**
 * Throttle requests to prevent sudden bursts of parallel calls
 */
export async function throttleRequest() {
  const now = Date.now();
  const diff = now - lastRequestTimestamp;
  if (diff < MIN_REQUEST_INTERVAL_MS) {
    const delay = MIN_REQUEST_INTERVAL_MS - diff;
    await new Promise(res => setTimeout(res, delay));
  }
  lastRequestTimestamp = Date.now();
}

/**
 * Execute request with deduplication
 */
export async function deduplicateRequest(key, requestFn) {
  if (inFlightRequests.has(key)) {
    // Reuse existing inflight promise
    return inFlightRequests.get(key);
  }

  const promise = requestFn().finally(() => {
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, promise);
  return promise;
}
