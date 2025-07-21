import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { qrcode } from 'vite-plugin-qrcode'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), qrcode()],
  base: "/AuraFlow",
  server: {
    host: true,
    port: 5173
  }
})
