import { useQuery } from '@tanstack/react-query';
import { 
  fetchLiveCategories, 
  fetchProductsByCategory, 
  fetchProductBySlug,
  fetchProductsByIds 
} from '../services/wooService';
import {
  fetchAdminOrders,
  fetchAdminProducts,
  fetchAdminCategories,
  fetchWpSettings
} from '../services/wooAdminService';

const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes (prevents refetching existing data on component re-mounts)
const DEFAULT_GC_TIME = 15 * 60 * 1000;   // 15 minutes cache retention
const ADMIN_STALE_TIME = 2 * 60 * 1000;   // 2 minutes for admin dashboard tabs
const ADMIN_GC_TIME = 10 * 60 * 1000;     // 10 minutes cache retention for admin

/**
 * Hook to fetch and cache all categories with TanStack Query
 */
export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: ({ signal }) => fetchLiveCategories({ signal }),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME
  });
}

/**
 * Hook to fetch and cache products by category slug with TanStack Query
 * Aborts pending request if category slug changes rapidly (fast clicks)
 */
export function useProductsByCategoryQuery(categorySlug = 'all') {
  return useQuery({
    queryKey: ['products', categorySlug || 'all'],
    queryFn: ({ signal }) => fetchProductsByCategory(categorySlug, { signal }),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME
  });
}

/**
 * Hook to fetch and cache single product by slug
 */
export function useProductBySlugQuery(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: ({ signal }) => fetchProductBySlug(slug, { signal }),
    enabled: Boolean(slug),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME
  });
}

/**
 * Single Request Batching Hook:
 * Queries multiple products by IDs in 1 single REST request: /products?include=1,2,3,4
 * Avoids loop/map API spamming!
 */
export function useBatchProductsQuery(ids = []) {
  const sortedKey = [...ids].sort().join(',');
  return useQuery({
    queryKey: ['products-batch', sortedKey],
    queryFn: ({ signal }) => fetchProductsByIds(ids, { signal }),
    enabled: Boolean(ids && ids.length > 0),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME
  });
}

/**
 * Hook to fetch and cache Admin Orders with TanStack Query
 * Automatically supports AbortController signal and deduplication across admin tabs
 */
export function useAdminOrdersQuery(status = '') {
  return useQuery({
    queryKey: ['admin-orders', status || 'all'],
    queryFn: ({ signal }) => fetchAdminOrders(status === 'all' ? '' : status, { signal }),
    staleTime: ADMIN_STALE_TIME,
    gcTime: ADMIN_GC_TIME
  });
}

/**
 * Hook to fetch and cache Admin Products with TanStack Query
 */
export function useAdminProductsQuery(perPage = 50) {
  return useQuery({
    queryKey: ['admin-products', perPage],
    queryFn: ({ signal }) => fetchAdminProducts(perPage, { signal }),
    staleTime: ADMIN_STALE_TIME,
    gcTime: ADMIN_GC_TIME
  });
}

/**
 * Hook to fetch and cache Admin Categories with TanStack Query
 */
export function useAdminCategoriesQuery() {
  return useQuery({
    queryKey: ['admin-categories'],
    queryFn: ({ signal }) => fetchAdminCategories({ signal }),
    staleTime: ADMIN_STALE_TIME,
    gcTime: ADMIN_GC_TIME
  });
}

/**
 * Hook to fetch and cache WordPress Settings with TanStack Query
 */
export function useAdminSettingsQuery() {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: ({ signal }) => fetchWpSettings({ signal }),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME
  });
}

