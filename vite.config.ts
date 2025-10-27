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
        onwarn(warning, warn) {
          // Log warnings related to circular dependencies or duplicate modules
          if (warning.code === 'CIRCULAR_DEPENDENCY' || 
              warning.code === 'DUPLICATE_IMPORT') {
            console.error('⚠️ Rollup Warning:', warning);
          }
          warn(warning);
        },
        output: {
          // Enhanced vendor bundles - CRITICAL: All React-dependent libs in ONE chunk
          manualChunks: (id) => {
            // CRITICAL: React + ALL React-dependent libraries MUST be in vendor-react
            // This prevents duplicate React instances that cause createContext errors
            if (id.includes('/node_modules/react/') || 
                id.includes('/node_modules/react-dom/') ||
                id.includes('/scheduler/') ||
                id.includes('node_modules/@tanstack/react-query') ||
                id.includes('node_modules/react-bootstrap') ||
                id.includes('node_modules/@radix-ui') ||
                id.includes('node_modules/react-slick') ||
                id.includes('node_modules/react-apexcharts')) {
              return 'vendor-react';
            }
            
            // Non-React dependencies can have separate chunks
            if (id.includes('node_modules/bootstrap/dist')) {
              return 'vendor-bootstrap-css';
            }
            
            if (id.includes('node_modules/apexcharts') && !id.includes('react-apexcharts')) {
              return 'vendor-charts-core';
            }
            
            if (id.includes('node_modules/slick-carousel')) {
              return 'vendor-slick-css';
            }
            
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
