import * as React from 'react';

export function assertSingleReact() {
  if (typeof window !== 'undefined') {
    const v = React.version;
    const reactInstanceId = Math.random().toString(36).substr(2, 9);
    
    // Track all React instances loaded
    if (!(window as any).__REACT_INSTANCES__) {
      (window as any).__REACT_INSTANCES__ = [];
    }
    
    const instances = (window as any).__REACT_INSTANCES__;
    instances.push({ version: v, id: reactInstanceId, timestamp: Date.now() });
    
    // Expose for inspection
    (window as any).__REACT_DIAG__ = { 
      reactVersion: v, 
      instanceId: reactInstanceId,
      totalInstances: instances.length,
      instances,
      react: React
    };
    
    // Only log in dev when VITE_DIAG_LOGS is explicitly enabled
    const shouldLog = import.meta.env.DEV && import.meta.env.VITE_DIAG_LOGS === 'true';
    
    if (shouldLog) {
      console.info('[DIAG] React version:', v, '| Instance ID:', reactInstanceId);
      console.info('[DIAG] Total React instances loaded:', instances.length);
    }
    
    // ⚠️ ALWAYS ALERT if multiple instances detected (critical error)
    if (instances.length > 1) {
      console.error('🚨 MULTIPLE REACT INSTANCES DETECTED:', instances);
      
      // CRITICAL: Throw in dev to prevent silent hook failures
      if (import.meta.env.DEV) {
        throw new Error('CRITICAL: Duplicate React instance detected. Fix bundle splitting config.');
      }
    }
  }
}
