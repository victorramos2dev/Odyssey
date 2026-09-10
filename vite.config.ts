import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'A Odisseia — Caça ao Tesouro',
        short_name: 'A Odisseia',
        description:
          'Visual novel investigativa: atravesse o mar de Odisseu, responda aos Guardiões e resolva o enigma dos Doze Machados.',
        lang: 'pt-BR',
        theme_color: '#0b1b2b',
        background_color: '#0b1b2b',
        display: 'standalone',
        orientation: 'landscape',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        // Arte é grande demais para precache; entra sob demanda e fica em cache.
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'odyssey-art',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolvePath('./src'),
      '@app': resolvePath('./src/app'),
      '@components': resolvePath('./src/components'),
      '@features': resolvePath('./src/features'),
      '@screens': resolvePath('./src/screens'),
      '@content': resolvePath('./src/content'),
      '@domain': resolvePath('./src/domain'),
      '@services': resolvePath('./src/services'),
      '@hooks': resolvePath('./src/hooks'),
      '@lib': resolvePath('./src/lib'),
      '@styles': resolvePath('./src/styles'),
    },
  },
});
