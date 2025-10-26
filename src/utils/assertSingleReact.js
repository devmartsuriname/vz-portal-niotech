// Diagnostic utility to detect duplicate React instances
// This prevents the "Cannot read properties of null (reading 'useState')" error

export const assertSingleReact = () => {
  if (typeof window === 'undefined') return;

  // Generate a unique instance ID for this React load
  const instanceId = Math.random().toString(36).substring(7);
  
  if (!window.__REACT_DIAG__) {
    window.__REACT_DIAG__ = {
      instanceId,
      count: 1,
      loadedAt: new Date().toISOString()
    };
    console.log('[React Diag] ✅ Single React instance detected:', instanceId);
  } else {
    window.__REACT_DIAG__.count += 1;
    console.error(
      '[React Diag] ⚠️ DUPLICATE REACT INSTANCE DETECTED!',
      '\nOriginal:', window.__REACT_DIAG__.instanceId,
      '\nNew:', instanceId,
      '\nTotal instances:', window.__REACT_DIAG__.count
    );
    
    // Don't throw in production, just warn
    if (import.meta.env.DEV) {
      console.warn('Multiple React instances can cause hooks to fail. Check your bundle configuration.');
    }
  }
};
