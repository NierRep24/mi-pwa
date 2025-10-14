import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi PWA Escolar',
        short_name: 'PWA',
        description: 'Aplicación progresiva hecha con React y Vite',
        theme_color: '#0ea5e9',
      },
    }),
  ],
})
