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

export async function fetchLiveCategories() {
  try {
    const data = await getJson('/products/categories?per_page=12');
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
    // Isolated network error
  }
  console.warn("Backend unavailable / empty - showing mock data (Categories)");
  return MOCK_CATEGORIES;
}

export async function fetchProductsByCategory(categorySlug) {
  const allMock = [...MOCK_WINTER_PRODUCTS, ...MOCK_SUMMER_PRODUCTS, ...MOCK_STOVES_HOBS];

  try {
    const endpoint = (categorySlug && categorySlug !== 'all') 
      ? `/products?per_page=20&category=${categorySlug}` 
      : `/products?per_page=30`;
    const data = await getJson(endpoint);

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
    // Isolated network error
  }

  console.warn(`Backend unavailable / empty - showing mock data for: ${categorySlug || 'all'}`);
  if (!categorySlug || categorySlug === 'all') return allMock;
  if (categorySlug === 'winter-collection') return MOCK_WINTER_PRODUCTS;
  if (categorySlug === 'summer-collection') return MOCK_SUMMER_PRODUCTS;
  if (categorySlug === 'stoves-hobs' || categorySlug === 'kitchen-appliances') return MOCK_STOVES_HOBS;
  
  const matched = allMock.filter(p => p.category === categorySlug);
  return matched.length > 0 ? matched : allMock;
}

export async function fetchProductBySlug(slug) {
  const allMock = [...MOCK_WINTER_PRODUCTS, ...MOCK_SUMMER_PRODUCTS, ...MOCK_STOVES_HOBS];
  try {
    const data = await getJson(`/products?slug=${slug}`);
    if (Array.isArray(data) && data.length > 0) {
      console.log("Data from backend - Single Product:", data[0]);
      return normalizeWcProduct(data[0]);
    }
  } catch (error) {
    // Isolated network error
  }
  console.warn(`Backend unavailable / empty - showing mock product for: ${slug}`);
  const found = allMock.find(p => p.slug === slug);
  return found || allMock[0];
}

export async function fetchLiveProductsBySlug(categorySlug) {
  return fetchProductsByCategory(categorySlug);
}
