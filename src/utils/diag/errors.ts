/**
 * Global error tracking for diagnostics
 * Gated by VITE_DIAG_LOGS=true
 */

export function attachGlobalErrorListeners() {
  if (import.meta.env.VITE_DIAG_LOGS !== 'true') return;

  if (typeof window === 'undefined') return;

  // Track uncaught errors
  window.addEventListener('error', (event) => {
    console.error('[ERROR]', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack,
    });
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[UNHANDLED REJECTION]', {
      reason: event.reason,
      promise: event.promise,
    });
  });

  console.info('[DIAG] Global error listeners attached');
}
