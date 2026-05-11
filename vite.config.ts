import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'images/*'],
      manifest: {
        name: 'M.Djité Investissements',
        short_name: 'M.Djité',
        description: 'Application privée de pilotage d\'investissements et de projets.',
        theme_color: '#05070B',
        background_color: '#05070B',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/images/md_logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/md_logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
});
