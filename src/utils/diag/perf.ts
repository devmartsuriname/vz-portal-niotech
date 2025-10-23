/**
 * Performance diagnostic utilities
 * Gated by VITE_DIAG_LOGS=true
 */

export function attachPerfProbe() {
  if (import.meta.env.VITE_DIAG_LOGS !== 'true') return;

  if (typeof window === 'undefined') return;

  // Expose perf data globally for inspection
  (window as any).__PERF__ = {};

  try {
    // Navigation timing
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const nav = navEntries[0] as PerformanceNavigationTiming;
      (window as any).__PERF__.navigation = {
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.fetchStart),
        loadComplete: Math.round(nav.loadEventEnd - nav.fetchStart),
        domInteractive: Math.round(nav.domInteractive - nav.fetchStart),
      };
    }

    // Memory (Chrome only)
    if ('memory' in performance) {
      const mem = (performance as any).memory;
      (window as any).__PERF__.memory = {
        usedJSHeapSizeMB: Math.round(mem.usedJSHeapSize / 1048576),
        totalJSHeapSizeMB: Math.round(mem.totalJSHeapSize / 1048576),
        jsHeapSizeLimitMB: Math.round(mem.jsHeapSizeLimit / 1048576),
      };
      console.info('[PERF] Memory:', (window as any).__PERF__.memory);
    }

    // Web Vitals via PerformanceObserver
    if ('PerformanceObserver' in window) {
      try {
        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              (window as any).__PERF__.fcp = Math.round(entry.startTime);
              console.info('[PERF] FCP:', entry.startTime.toFixed(0), 'ms');
            }
          });
        });
        fcpObserver.observe({ type: 'paint', buffered: true });

        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          (window as any).__PERF__.lcp = Math.round(lastEntry.startTime);
          console.info('[PERF] LCP:', lastEntry.startTime.toFixed(0), 'ms');
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // Observer API not fully supported
      }
    }

    // Log navigation timing
    if ((window as any).__PERF__.navigation) {
      console.info('[PERF] Navigation:', (window as any).__PERF__.navigation);
    }
  } catch (error) {
    console.warn('[PERF] Failed to collect performance data:', error);
  }
}
