import { defineMiddleware } from 'astro:middleware';
import { canonicalRedirectTarget } from './lib/canonical';
import { resolveBaseUrl } from './config';
import { defaultLang } from './i18n/ui';

// Files (photo.jpg, sitemap.xml, sw.js, manifest.webmanifest, ...) must never
// gain a language prefix or a trailing slash. Covers up to 12-char extensions
// so newer formats like .webmanifest, .avif, .webp2, .map are covered.
const HAS_FILE_EXTENSION = /\.[a-z0-9]{2,12}$/i;

/**
 * 301-redirects every non-canonical URL (www host, http, missing trailing
 * slash, legacy "/km/…" prefix) to its canonical form in ONE hop.
 *
 * Order matters:
 *   1. canonicalRedirectTarget() fixes host, protocol, trailing slash and
 *      returns the absolute target URL, or null when already canonical.
 *   2. The default locale (km) lives at the root "/", so any explicit
 *      "/km/…" request is stripped back to "/…". Non-default locales (en/zh)
 *      and prefix-less default-locale paths are left untouched.
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

  // The default locale is served WITHOUT a prefix. If a request still uses
  // the legacy "/km/…" form, strip it back to the canonical root-based path.
  if (firstSeg === defaultLang) {
    const rest = url.pathname.split('/').slice(2).filter(Boolean).join('/');
    url.pathname = rest ? `/${rest}/` : '/';
    target = url.toString();
  }

  return target ? context.redirect(target, 301) : next();
});
