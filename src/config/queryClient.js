import { QueryClient } from '@tanstack/react-query';
import { isCircuitBreakerOpen, tripCircuitBreaker } from '../services/apiShield';

/**
 * Global TanStack Query Configuration
 * Configured with:
 * - 5 minutes default staleTime (prevents refetching existing data on component re-mounts)
 * - 15 minutes garbage collection (gcTime)
 * - Exponential backoff retry logic (max 2 retries for 429/5xx, never on 401/403/404)
 * - Global 403/429 circuit breaker pause interception
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 15 * 60 * 1000,    // 15 minutes
      refetchOnWindowFocus: false, // Never hit server on window focus
      refetchOnMount: false,       // Reuse cached data if within staleTime
      refetchOnReconnect: false,   // Avoid sudden connection reconnect burst
      retry: (failureCount, error) => {
        const status = error?.status || error?.statusCode;
        // Never retry client auth or firewall blocks (avoids aggressive looping and IP ban)
        if (status === 401 || status === 403 || status === 404) {
          if (status === 403) {
            tripCircuitBreaker('Global 403 Forbidden - Firewall blocked request');
          }
          return false;
        }

        if (status === 429) {
          tripCircuitBreaker('Global 429 Rate Limit - Too Many Requests');
          return false;
        }

        // Circuit breaker check
        if (isCircuitBreakerOpen()) {
          return false;
        }

        // Max 2 retries for temporary 5xx network glitches
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => {
        // Exponential backoff: 1000ms, 2000ms
        return Math.min(1000 * Math.pow(2, attemptIndex), 4000);
      }
    },
    mutations: {
      retry: 0 // Do not retry mutations to prevent duplicate orders or updates
    }
  }
});
