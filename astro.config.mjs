import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://royalpalacephnompenh.com',
  // In Astro 5 `output: 'hybrid'` was removed; `static` now behaves the same
  // way — pages are prerendered but the Cloudflare worker still runs
  // middleware.ts (for www → apex, http → https and /km/ → / normalisation).
  // Per-page `export const prerender = false` opts a route into on-demand SSR.
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'km',
    locales: ['km', 'en', 'zh'],
    routing: {
      // The default locale (km) is served directly at the root "/", so
      // https://royalpalacephnompenh.com lands on the home page with no
      // intermediate redirect to /km/. Only en/ and zh/ carry a prefix.
      prefixDefaultLocale: false,
      // Do NOT let Astro generate its own meta-refresh redirect pages.
      // All redirects (www → non-www, http → https, trailing slash, the
      // legacy /km/… → /… form) are handled by middleware.ts as clean 301s.
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
