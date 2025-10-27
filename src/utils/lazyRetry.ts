/**
 * Lazy import wrapper with automatic retry on failure
 * Helps prevent blank screens from stale chunk cache mismatches
 */
export function lazyRetry<T>(
  importFn: () => Promise<T>,
  retries = 2
): Promise<T> {
  return new Promise((resolve, reject) => {
    importFn()
      .then(resolve)
      .catch((error) => {
        if (retries > 0) {
          console.warn(`[lazyRetry] Chunk load failed, retrying... (${retries} attempts left)`, error);
          
          // Wait 500ms and retry the import (allows transient network issues to resolve)
          setTimeout(() => {
            lazyRetry(importFn, retries - 1)
              .then(resolve)
              .catch(reject);
          }, 500);
        } else {
          // After all retries exhausted, show helpful error
          console.error('[lazyRetry] All retry attempts failed. Please refresh the page manually.');
          reject(error);
        }
      });
  });
}
