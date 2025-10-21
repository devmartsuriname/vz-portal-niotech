import { defineConfig } from "vite";
import reactBabel from "@vitejs/plugin-react";
import reactSwc from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const reactPlugin = mode === "development" ? reactBabel() : reactSwc();
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [reactPlugin].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        react: path.resolve(__dirname, "node_modules/react/index.js"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom/index.js"),
        "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime.js"),
        "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules/react/jsx-dev-runtime.js"),
      },
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      force: true,
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
