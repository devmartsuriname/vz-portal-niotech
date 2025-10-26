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

createRoot(document.getElementById('root')).render(
  import.meta.env.DEV ? AppTree : <StrictMode>{AppTree}</StrictMode>
);
