import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://aman-portfolio-3v4p.vercel.app/',
        changeOrigin: true,
      },
    },
  },
})