// @ts-check
import { defineConfig } from 'astro/config';
import pwa from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
    site: 'https://claumigue.github.io',
    base: '/fragmentacion/',
    output: 'static',
    integrations: [
        pwa({
            registerType: 'autoUpdate',
            manifest: false, // Usamos tu public/site.webmanifest manual
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
            },
        })
    ],
});