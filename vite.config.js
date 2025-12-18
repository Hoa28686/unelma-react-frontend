import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor chunks for better caching and code splitting
          if (id.includes('node_modules')) {
            if (id.includes('@mui/material') || id.includes('@mui/icons-material')) {
              return 'mui-vendor';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'redux-vendor';
            }
            if (id.includes('axios')) {
              return 'utils';
            }
            // Other node_modules
            return 'vendor';
          }
        },
      },
    },
    // Enable minification and tree-shaking
    minify: 'esbuild',
    sourcemap: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Target modern browsers for smaller bundles
    target: 'es2015',
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      'react',
      'react-dom',
      'react-router',
    ],
    // Exclude heavy dependencies from pre-bundling that aren't needed immediately
    exclude: [],
  },
  // Ensure we're using production mode in builds
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  // Server configuration for development
  server: {
    // Note: HMR WebSocket in dev mode prevents bfcache, which is expected
    // Production builds won't have this issue
    hmr: {
      protocol: 'ws',
    },
  },
})
