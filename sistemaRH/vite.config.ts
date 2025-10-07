import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 49176,
    strictPort: true,
  },
  server: {
    port: 49176,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:49176",
  },
})
