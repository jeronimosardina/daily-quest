import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['journalImage.png'],
      manifest: {
        name: 'Real Life RPG',
        short_name: 'RPG Life',
        description: 'Gamificá tu vida con quests, XP y recompensas',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'journalImage.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'journalImage.png',
            sizes: '192x192',
            type: 'image/png',
          }
        ]
      }
    })
  ]
});
