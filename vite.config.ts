import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import gitCommit from 'git-current-commit';

export default defineConfig({
  define: {
    __COMMIT__: JSON.stringify(gitCommit.sync()),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: 'PWL',
        name: 'Password Lense',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#1c304a',
        background_color: '#ffffff',
      },
      workbox: {
        globPatterns: [
          'icon-*.png',
          '**/**.{js,css,html,ico,webmanifest}',
          'assets/*.woff?(2)',
        ],
      },
    }),
  ],
});
