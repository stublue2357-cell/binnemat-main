import { getJson } from './apiClient';
import { 
  MOCK_CATEGORIES, 
  MOCK_WINTER_PRODUCTS, 
  MOCK_SUMMER_PRODUCTS, 
  MOCK_STOVES_HOBS,
  SAFE_SVG_PLACEHOLDER 
} from './mockData';

export function formatPriceString(prices) {
  if (!prices) return "Rs. 24,500";
  if (typeof prices === 'number') return `Rs. ${prices.toLocaleString()}`;
  if (typeof prices === 'string') return prices;
  const sym = prices.currency_symbol || "Rs.";
  const minor = prices.currency_minor_unit !== undefined ? prices.currency_minor_unit : 2;
  const raw = Number(prices.price);
  if (isNaN(raw)) return "Rs. 24,500";
  return `${sym} ${(raw / Math.pow(10, minor)).toLocaleString()}`;
}

export function normalizeWcProduct(raw) {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    price: raw.prices?.price,
    formatted_price: formatPriceString(raw.prices),
    badge: raw.on_sale ? "SALE" : "ORIGINAL",
    category: raw.categories?.[0]?.slug || "general",
    subCategory: raw.subCategory || "general",
    rating: 5,
    images: (raw.images && raw.images.length > 0) ? raw.images : [{ src: SAFE_SVG_PLACEHOLDER }],
    specs: raw.specs || null,
    description: raw.description ? raw.description.replace(/<[^>]+>/g, '') : null
  };
}

/**
 * Fetch Categories from WooCommerce Store API
 * Cached for 5-10 minutes with circuit breaker and AbortController
 */
export async function fetchLiveCategories(options = {}) {
  try {
    const data = await getJson('/products/categories?per_page=12', {}, options);
    if (Array.isArray(data) && data.length > 0) {
      console.log("Data from backend - Categories:", data);
      return data.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count || 0,
        image: cat.images?.[0]?.src || SAFE_SVG_PLACEHOLDER,
        desc: cat.description || "Official brand-sealed appliances."
      }));
    }
  } catch (error) {
    // If request was aborted by navigation, propagate abort
    if (error.name === 'AbortError') throw error;
  }
  console.warn("Backend unavailable / empty - showing mock data (Categories)");
  return MOCK_CATEGORIES;
}

/**
 * Fetch Products by Category from WooCommerce Store API
 */
export async function fetchProductsByCategory(categorySlug, options = {}) {
  const allMock = [...MOCK_WINTER_PRODUCTS, ...MOCK_SUMMER_PRODUCTS, ...MOCK_STOVES_HOBS];

  try {
    const endpoint = (categorySlug && categorySlug !== 'all') 
      ? `/products?per_page=20&category=${categorySlug}` 
      : `/products?per_page=30`;
    const data = await getJson(endpoint, {}, options);

    if (Array.isArray(data) && data.length > 0) {
      console.log(`Data from backend - Products (${categorySlug || 'all'}):`, data);
      const normalized = data.map(normalizeWcProduct);
      if (categorySlug && categorySlug !== 'all') {
        const filtered = normalized.filter(p => p.category === categorySlug);
        return filtered.length > 0 ? filtered : normalized;
      }
      return normalized;
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error;
  }

  console.warn(`Backend unavailable / empty - showing mock data for: ${categorySlug || 'all'}`);
  if (!categorySlug || categorySlug === 'all') return allMock;
  if (categorySlug === 'winter-collection') return MOCK_WINTER_PRODUCTS;
  if (categorySlug === 'summer-collection') return MOCK_SUMMER_PRODUCTS;
  if (categorySlug === 'stoves-hobs' || categorySlug === 'kitchen-appliances') return MOCK_STOVES_HOBS;
  
  const matched = allMock.filter(p => p.category === categorySlug);
  return matched.length > 0 ? matched : allMock;
}

/**
 * Single Request Batching: Fetch multiple products by IDs in 1 single API call
 * Instead of firing separate requests inside loops or map(), batches IDs: /products?include=1,2,3,4
 */
export async function fetchProductsByIds(ids = [], options = {}) {
  if (!ids || ids.length === 0) return [];
  const cleanIds = Array.from(new Set(ids.map(Number).filter(Boolean)));
  if (cleanIds.length === 0) return [];

  try {
    const endpoint = `/products?include=${cleanIds.join(',')}&per_page=${cleanIds.length}`;
    const data = await getJson(endpoint, {}, options);
    if (Array.isArray(data) && data.length > 0) {
      return data.map(normalizeWcProduct);
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error;
  }

  const allMock = [...MOCK_WINTER_PRODUCTS, ...MOCK_SUMMER_PRODUCTS, ...MOCK_STOVES_HOBS];
  return allMock.filter(p => cleanIds.includes(p.id));
}

/**
 * Fetch a single product by slug
 */
export async function fetchProductBySlug(slug, options = {}) {
  const allMock = [...MOCK_WINTER_PRODUCTS, ...MOCK_SUMMER_PRODUCTS, ...MOCK_STOVES_HOBS];
  try {
    const data = await getJson(`/products?slug=${slug}`, {}, options);
    if (Array.isArray(data) && data.length > 0) {
      console.log("Data from backend - Single Product:", data[0]);
      return normalizeWcProduct(data[0]);
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error;
  }
  console.warn(`Backend unavailable / empty - showing mock product for: ${slug}`);
  const found = allMock.find(p => p.slug === slug);
  return found || allMock[0];
}

export async function fetchLiveProductsBySlug(categorySlug, options = {}) {
  return fetchProductsByCategory(categorySlug, options);
}
