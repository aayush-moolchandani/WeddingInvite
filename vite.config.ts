import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer (only in analyze mode)
    ...(process.env.ANALYZE ? [analyzer({
      analyzerMode: 'static',
      openAnalyzer: false,
    })] : [])
  ],
  assetsInclude: ['**/*.JPG', '**/*.HEIC', '**/*.jpeg', '**/*.jpg'],
  build: {
    // Optimize chunks for better caching and smaller bundles
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create smaller, more specific chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@vercel')) {
              return 'analytics';
            }
            // Group other vendor libraries
            return 'vendor';
          }
          // Group components by feature
          if (id.includes('PhotoGallery') || id.includes('PhotoEditor')) {
            return 'photos';
          }
          if (id.includes('MusicPlayer')) {
            return 'music';
          }
        },
        // Optimize chunk names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/mp3|wav|ogg|aac/i.test(extType || '')) {
            return 'assets/audio/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
    // Aggressive minification and optimization
    minify: 'esbuild',
    sourcemap: false,
    // Optimize assets - inline only very small assets
    assetsInlineLimit: 1024, // Further reduced
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Reduce bundle size
    chunkSizeWarningLimit: 1000,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    // Exclude heavy dependencies from pre-bundling
    exclude: ['@vercel/analytics/react'],
  },
  // Dev server optimizations
  server: {
    fs: {
      strict: false,
    },
  },
  // Enable compression
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
