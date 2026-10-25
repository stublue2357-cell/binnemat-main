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
  const allCategorySlugs = (raw.categories || []).map(c => c.slug?.toLowerCase());
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    price: raw.prices?.price,
    formatted_price: formatPriceString(raw.prices),
    badge: raw.on_sale ? "SALE" : (raw.badge || "FLAGSHIP"),
    category: raw.categories?.[0]?.slug || "general",
    categorySlugs: allCategorySlugs,
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
        const target = categorySlug.toLowerCase();
        const filtered = normalized.filter(p => 
          p.category?.toLowerCase() === target || 
          p.categorySlugs?.includes(target) ||
          p.categorySlugs?.some(s => s.includes('main'))
        );
        return filtered.length > 0 ? filtered : normalized;
      }
      return normalized;
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error;
  }

  console.warn(`Backend unavailable / empty - showing mock data for: ${categorySlug || 'all'}`);
  if (categorySlug === 'main-products' || categorySlug === 'main') {
    return [
      {
        id: 101,
        name: "FastHeat™ Aura H1 Smart Electric Geyser",
        slug: "binnemat-sapphire-35l-geyser",
        price: 36500,
        formatted_price: "Rs. 36,500",
        badge: "WINTER WARMTH • 3-SEC FLOW",
        category: "main-products",
        subCategory: "storage-geysers",
        rating: 5,
        images: [{ src: "/images/superconscious_heater_hero.jpg" }],
        description: "Digital heating with diamond sapphire enamel core and Italian Incoloy 840 element. 24-hour heat retention with ELCB safety shock breaker.",
        specs: { "Heat Retention": "24 Hours", "Heating Element": "Incoloy 840 Hard-Water", "Shock Protection": "ELCB Built-in Breaker", "Warranty": "7-Year Tank Warranty" }
      },
      {
        id: 103,
        name: "Aeria 30W BLDC Aerodynamic Inverter Fan",
        slug: "binnemat-aeria-30w-bldc-fan",
        price: 14800,
        formatted_price: "Rs. 14,800",
        badge: "SUMMER BREEZE • 30W INVERTER",
        category: "main-products",
        subCategory: "bldc-ceiling-fans",
        rating: 5,
        images: [{ src: "/images/superconscious_fan_hero.jpg" }],
        description: "Whisper-quiet BLDC motor with aerodynamic aerofoil blades. Direct 12V solar and UPS support, slashes electric bills by 65%.",
        specs: { "Power Consumption": "30W Ultra-Low", "Electricity Saved": "+65% Reduction", "Noise Level": "Whisper Silent <28dB", "Motor": "100% Pure Copper High-Torque" }
      },
      {
        id: 104,
        name: "Ignis Italian Beveled Built-in Hob 3-Burner",
        slug: "binnemat-ignis-italian-hob",
        price: 28500,
        formatted_price: "Rs. 28,500",
        badge: "CULINARY PRECISION • 8MM GLASS",
        category: "main-products",
        subCategory: "built-in-hobs",
        rating: 5,
        images: [{ src: "/images/superconscious_hob_hero.jpg" }],
        description: "8mm tempered thermal-shock glass with heavy cast iron trivets and Spanish auto flame-failure safety cutoff valves.",
        specs: { "Thermal Output": "4.8 kW High Power", "Burners": "Pure Italian Brass Crowns", "Safety": "Auto Flame-Failure Cutoff", "Glass": "8mm Beveled Tempered Glass" }
      }
    ];
  }
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
