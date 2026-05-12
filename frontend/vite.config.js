import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5173,

    allowedHosts: [
      'zippy-wisdom-production-af40.up.railway.app'
    ],

    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  preview: {
    allowedHosts: [
      'zippy-wisdom-production-af40.up.railway.app'
    ]
  }
})