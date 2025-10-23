import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './Routes/Routes.jsx';
import { AuthProvider } from '@/integrations/supabase/auth';
import ErrorBoundary from './components/common/ErrorBoundary';
import { assertSingleReact } from '@/utils/assertSingleReact';
import "slick-carousel/slick/slick.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';
import './assets/wizard.css';

// Run diagnostic to ensure single React instance
assertSingleReact();

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
