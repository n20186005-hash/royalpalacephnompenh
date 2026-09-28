import { defineMiddleware } from 'astro:middleware';
import { canonicalRedirectTarget } from './lib/canonical';
import { resolveBaseUrl } from './config';
import { defaultLang, languagesList } from './i18n/ui';

// Files (photo.jpg, sitemap.xml, sw.js, manifest.webmanifest, ...) must never
// gain a language prefix or a trailing slash. Covers up to 12-char extensions
// so newer formats like .webmanifest, .avif, .webp2, .map are covered.
const HAS_FILE_EXTENSION = /\.[a-z0-9]{2,12}$/i;

/**
 * 301-redirects every non-canonical URL (www host, http, missing trailing
 * slash, missing language prefix) to its canonical form in ONE hop.
 *
 * Order matters:
 *   1. canonicalRedirectTarget() fixes host, protocol, trailing slash
 *      and returns the absolute target URL, or null when already canonical.
 *   2. If after step 1 the path is still root "/" or missing a locale prefix
 *      AND the URL does not point to a static file, prepend the default
 *      language "/km/" so the visitor lands directly on the home page.
 *
 * All redirect logic lives here so _redirects and meta-refresh pages do not
 * fight this middleware (which used to cause redirect loops on www → non-www
 * bounces).
 */
export const onRequest = defineMiddleware((context, next) => {
  const base = resolveBaseUrl();
  let target = canonicalRedirectTarget(context.request.url, base);
  const url = target ? new URL(target) : new URL(context.request.url);

  if (HAS_FILE_EXTENSION.test(url.pathname)) {
    return target ? context.redirect(target, 301) : next();
  }

  const firstSeg = url.pathname.split('/')[1];
  const hasLangPrefix = (languagesList as readonly string[]).includes(firstSeg);

  if (url.pathname === '/' || !hasLangPrefix) {
    const newPath = url.pathname === '/'
      ? `/${defaultLang}/`
      : `/${defaultLang}${url.pathname}`;
    url.pathname = newPath;
    target = url.toString();
  }

  return target ? context.redirect(target, 301) : next();
});
