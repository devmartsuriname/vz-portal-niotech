import { defineConfig } from "vite";
import reactSWC from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  };
});
