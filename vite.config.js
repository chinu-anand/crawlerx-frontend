import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  // Use env.VITE_API_URL or fallback to a default
  const apiUrl = env.VITE_API_URL || 'http://localhost:8080'
  
  return {
    plugins: [tailwindcss(), react()],
    server: {
      proxy: {
        '/api/v1': {
          target: apiUrl,
          changeOrigin: true,
          ws: true,
        },
        "/crawl": {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/crawl/, '/api/v1/crawl')
        },
        "/jobs": {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/jobs/, '/api/v1/jobs')
        },
        "/status": {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/status/, '/api/v1/status')
        },
        "/ws": {
          target: apiUrl,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ws/, '/api/v1/ws')
        }
      }
    }
  }
})
