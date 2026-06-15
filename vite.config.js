import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    base: '/you-vs-you/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon.svg', 'apple-touch-icon.png'],
            manifest: {
                name: 'You vs You',
                short_name: 'You vs You',
                description: 'Tu rutina diaria, minimalista y offline.',
                theme_color: '#7C3AED',
                background_color: '#000000',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/you-vs-you/',
                scope: '/you-vs-you/',
                icons: [
                    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
                    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
                    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
            },
        }),
    ],
});
