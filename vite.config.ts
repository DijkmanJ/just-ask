import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self' https://*.zoom.us; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.zoom.us; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.zoom.us; connect-src 'self' https://*.zoom.us",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
}) 