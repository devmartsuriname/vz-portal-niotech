import * as React from 'react';

export function assertSingleReact() {
  if (typeof window !== 'undefined') {
    const v = React.version;
    // Expose for quick inspection in console
    // If multiple versions appear across reloads/HMR, we'll see it here
    (window as any).__REACT_DIAG__ = { reactVersion: v, react: React };
    console.info('[DIAG] React version:', v);
  }
}
