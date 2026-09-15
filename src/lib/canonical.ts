/**
 * Canonical URL rules for royalpalacephnompenh.com:
 *
 *   1. https only, on the non-www host
 *      http://www.royalpalacephnompenh.com/en  ->  https://royalpalacephnompenh.com/en/
 *   2. every page URL ends with a trailing slash
 *      /en, /zh, /km  ->  /en/, /zh/, /km/
 *
 * Deliberately free of Astro imports and of any module-level state so the rules
 * stay pure and can be exercised directly in a Node test.
 */

// Files (photo.jpg, sitemap.xml, sw.js, manifest.webmanifest, ...) must never
// gain a trailing slash.
const HAS_FILE_EXTENSION = /\.[a-z0-9]{2,6}$/i;

/**
 * Returns the absolute URL a request must be 301-redirected to, or `null` when
 * the request is already canonical. `canonicalBase` is the site origin the
 * request has to live on (e.g. https://royalpalacephnompenh.com).
 */
export function canonicalRedirectTarget(requestUrl: string, canonicalBase: string): string | null {
  const url = new URL(requestUrl);
  const canonicalHost = new URL(canonicalBase).host.toLowerCase();
  const host = url.hostname.toLowerCase();
  const isProduction = host === canonicalHost || host === `www.${canonicalHost}`;

  // Collapse accidental double slashes, then add the canonical trailing slash.
  let pathname = url.pathname.replace(/\/{2,}/g, '/');
  if (pathname.length > 1 && !pathname.endsWith('/') && !HAS_FILE_EXTENSION.test(pathname)) {
    pathname = `${pathname}/`;
  }

  const wrongHost = isProduction && (host !== canonicalHost || url.protocol !== 'https:');
  if (!wrongHost && pathname === url.pathname) return null;

  const target = new URL(url.toString());
  if (isProduction) {
    target.protocol = 'https:';
    target.host = canonicalHost;
  }
  target.pathname = pathname;
  return target.toString();
}
