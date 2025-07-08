import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api/v1': {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        ws: true,
      },
      "/crawl": {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/crawl/, '/api/v1/crawl')
      },
      "/jobs": {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jobs/, '/api/v1/jobs')
      },
      "/status": {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/status/, '/api/v1/status')
      },
      "/ws": {
        target: import.meta.env.VITE_API_URL,
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, '/api/v1/ws')
      }
    }
  }
})
