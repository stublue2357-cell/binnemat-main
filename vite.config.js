import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api-wc-v3': {
        target: 'https://api.binnemat.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-wc-v3/, '/wp-json/wc/v3'),
        secure: false,
      },
      '/api-wc': {
        target: 'https://api.binnemat.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-wc/, '/wp-json/wc/store/v1'),
        secure: false,
      },
      '/api-wp-v2': {
        target: 'https://api.binnemat.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-wp-v2/, '/wp-json/wp/v2'),
        secure: false,
      }
    }
  }
});
