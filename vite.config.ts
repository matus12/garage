import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://84.47.36.56:7226',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/data/, '/'),
      },
    },
  },
})
