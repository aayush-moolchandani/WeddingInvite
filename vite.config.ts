import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.HEIC', '**/*.jpeg', '**/*.jpg'],
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
        },
      },
    },
    // Reduce bundle size
    minify: 'esbuild',
    // Enable compression
    sourcemap: false,
    // Optimize assets
    assetsInlineLimit: 4096,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
  // Dev server optimizations
  server: {
    fs: {
      strict: false,
    },
  },
})
