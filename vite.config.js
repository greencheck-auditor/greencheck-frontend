import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // ← ✅ caminho direto, sem "path"
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    allowedHosts: 'all'
  }
})
