import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    outDir: path.resolve(__dirname, '../dist'), // output to root/dist
    emptyOutDir: true, // clean dist folder before build
  },

  server: {
    port: 5173, // optional, default is 5173 anyway
  },
});
