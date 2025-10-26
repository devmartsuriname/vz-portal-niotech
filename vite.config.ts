import { defineConfig } from "vite";
import reactSWC from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const reactPlugin = reactSWC();
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      reactPlugin,
      mode === 'development' && componentTagger(),
      mode === 'production' && viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024, // Only compress files > 1KB
      }),
      mode === 'production' && viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
      }),
      mode === 'production' && visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // CRITICAL: Force all React imports to resolve to same instance
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
        'react/jsx-dev-runtime': path.resolve(__dirname, './node_modules/react/jsx-dev-runtime'),
        // Ensure a single React Query instance
        '@tanstack/react-query': path.resolve(__dirname, './node_modules/@tanstack/react-query'),
      },
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', '@tanstack/react-query'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', '@tanstack/react-query'],
      // Force re-optimization on server restart
      force: mode === 'development',
      // Prevent Vite from pre-bundling React in separate chunks
      esbuildOptions: {
        target: 'esnext',
      },
    },
    build: {
      cssCodeSplit: true, // Split CSS per route for better isolation
      rollupOptions: {
        output: {
          // Enhanced vendor bundles for granular caching and lazy loading
          manualChunks: (id) => {
            // Core React bundle (rarely changes) - broader pattern to catch all React imports
            if (id.includes('node_modules/react') && !id.includes('node_modules/react-')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            // Router bundle - keep separate but ensure it doesn't duplicate React
            if (id.includes('node_modules/react-router-dom') || 
                id.includes('node_modules/react-router')) {
              return 'vendor-router';
            }
            // React Query (admin-heavy)
            if (id.includes('node_modules/@tanstack/react-query')) {
              return 'vendor-query';
            }
            // Admin-only: Bootstrap (deferred loading)
            if (id.includes('node_modules/react-bootstrap') || 
                id.includes('node_modules/bootstrap')) {
              return 'admin-bootstrap';
            }
            // Admin-only: Charts (lazy loaded)
            if (id.includes('node_modules/apexcharts') || 
                id.includes('node_modules/react-apexcharts')) {
              return 'admin-charts';
            }
            // Admin-only: Radix UI components
            if (id.includes('node_modules/@radix-ui')) {
              return 'admin-ui';
            }
            // Public-facing: Slick carousel
            if (id.includes('node_modules/react-slick') || 
                id.includes('node_modules/slick-carousel')) {
              return 'public-ui';
            }
            // Supabase client
            if (id.includes('node_modules/@supabase')) {
              return 'vendor-supabase';
            }
          },
          // Separate CSS for admin routes
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.includes('admin') || assetInfo.name?.includes('style')) {
              return 'assets/admin/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    }
  };
});
