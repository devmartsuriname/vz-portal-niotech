/**
 * Lazy import wrapper with automatic retry on failure
 * Helps prevent blank screens from stale chunk cache mismatches
 */
export function lazyRetry<T>(
  importFn: () => Promise<T>,
  retries = 1
): Promise<T> {
  return importFn().catch((error) => {
    if (retries > 0) {
      // Add cache-busting query parameter and retry
      const cacheBust = `?v=${Date.now()}`;
      console.warn('[lazyRetry] Chunk load failed, retrying with cache bust...', error);
      
      // For dynamic imports, we can't directly add query params,
      // so we force a page reload which will fetch fresh chunks
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          window.location.reload();
          reject(error);
        }, 100);
      });
    }
    throw error;
  });
}
