import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://royalpalacephnompenh.com',
  // The site is static by default; the three guide pages opt into on-demand
  // rendering (see src/pages/[lang]/index.astro) so the live forecast is
  // fetched per request and cached at the edge.
  output: 'static',
  adapter: cloudflare({
    // Only prerendered pages go through the image pipeline; the guide pages
    // stay on-demand and serve the photos as static files.
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'km',
    locales: ['km', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
