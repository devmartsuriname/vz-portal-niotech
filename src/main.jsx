// Deploy 2025-10-27T14:45:33Z - Aggressive cache invalidation v3
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './Routes/Routes.jsx';
import { AuthProvider } from '@/integrations/supabase/auth';
import ErrorBoundary from './components/common/ErrorBoundary';
import { assertSingleReact } from '@/utils/assertSingleReact';
import { attachGlobalErrorListeners } from '@/utils/diag/errors';
import { attachPerfProbe } from '@/utils/diag/perf';
import "slick-carousel/slick/slick.css";
// Bootstrap icons moved to AdminLayout (admin-only)
import './assets/a11y.css';
import './assets/main.css';
import './assets/wizard.css';

// Run diagnostics
assertSingleReact();
attachGlobalErrorListeners();
attachPerfProbe();

// Build timestamp for cache busting
console.log('[VZ Portal] Build:', '2025-10-27T14:45:33Z');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const AppTree = (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

const root = document.getElementById('root');

createRoot(root).render(
  import.meta.env.DEV ? AppTree : <StrictMode>{AppTree}</StrictMode>
);

// Blank screen detector (production only)
if (!import.meta.env.DEV) {
  setTimeout(() => {
    if (!root.hasChildNodes() || root.innerHTML.trim() === '') {
      console.error('[VZ Portal] Blank screen detected. Try hard refresh (Ctrl+Shift+R). If issue persists, check Network tab for 404s.');
    }
  }, 2000);
}
