import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://royalpalacephnompenh.com',
  // Hybrid mode so middleware.ts runs on Cloudflare Pages (static output would
  // ignore middleware entirely, leading to Astro's default "Redirecting…"
  // intermediate page on every i18n redirect).
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'km',
    locales: ['km', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: true,
      // Do NOT let Astro generate its own meta-refresh redirect pages.
      // All redirects (root → /km/, www → non-www, trailing slash) are
      // handled by middleware.ts as clean 301s with no intermediate page.
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
