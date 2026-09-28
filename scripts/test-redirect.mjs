// Standalone test for the redirect logic (no Astro imports needed)
// Tests the canonical.ts rules + middleware behaviour simulation.

const HAS_FILE_EXTENSION = /\.[a-z0-9]{2,6}$/i;

function canonicalRedirectTarget(requestUrl, canonicalBase) {
  const url = new URL(requestUrl);
  const canonicalHost = new URL(canonicalBase).host.toLowerCase();
  const host = url.hostname.toLowerCase();
  const isProduction = host === canonicalHost || host === `www.${canonicalHost}`;

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

const defaultLang = 'km';
const languagesList = ['km', 'en', 'zh'];
const base = 'https://royalpalacephnompenh.com';

function middlewareRedirect(requestUrl) {
  let target = canonicalRedirectTarget(requestUrl, base);
  const url = target ? new URL(target) : new URL(requestUrl);

  if (HAS_FILE_EXTENSION.test(url.pathname)) {
    return target;
  }

  const firstSeg = url.pathname.split('/')[1];
  const hasLangPrefix = languagesList.includes(firstSeg);

  if (url.pathname === '/' || !hasLangPrefix) {
    const newPath = url.pathname === '/'
      ? `/${defaultLang}/`
      : `/${defaultLang}${url.pathname}`;
    url.pathname = newPath;
    target = url.toString();
  }

  return target;
}

// ---- Test cases ----
const cases = [
  // === These should NOT redirect (already canonical) ===
  { in: 'https://royalpalacephnompenh.com/km/',           expect: null,          label: 'canonical km home' },
  { in: 'https://royalpalacephnompenh.com/en/',           expect: null,          label: 'canonical en home' },
  { in: 'https://royalpalacephnompenh.com/zh/',           expect: null,          label: 'canonical zh home' },
  { in: 'https://royalpalacephnompenh.com/en/privacy-policy/',  expect: null,    label: 'canonical en privacy' },
  { in: 'http://localhost:4321/km/',                      expect: null,          label: 'localhost dev (no host change)' },

  // === Root → /km/ in ONE hop (the loop fix) ===
  { in: 'https://royalpalacephnompenh.com/',              expect: 'https://royalpalacephnompenh.com/km/',            label: 'root → /km/' },
  { in: 'http://royalpalacephnompenh.com/',               expect: 'https://royalpalacephnompenh.com/km/',            label: 'http root → https /km/' },
  { in: 'https://www.royalpalacephnompenh.com/',          expect: 'https://royalpalacephnompenh.com/km/',            label: 'www root → non-www /km/  (THE LOOP CASE)' },
  { in: 'http://www.royalpalacephnompenh.com/',           expect: 'https://royalpalacephnompenh.com/km/',            label: 'http www root → https non-www /km/' },

  // === Missing trailing slash → fixed in one hop ===
  { in: 'https://royalpalacephnompenh.com/km',            expect: 'https://royalpalacephnompenh.com/km/',            label: '/km → /km/' },
  { in: 'https://www.royalpalacephnompenh.com/km',        expect: 'https://royalpalacephnompenh.com/km/',            label: 'www /km → non-www /km/' },
  { in: 'https://royalpalacephnompenh.com/en',            expect: 'https://royalpalacephnompenh.com/en/',            label: '/en → /en/' },

  // === www → non-www with locale (one hop) ===
  { in: 'https://www.royalpalacephnompenh.com/km/',       expect: 'https://royalpalacephnompenh.com/km/',            label: 'www /km/ → non-www /km/  (THE OTHER LOOP CASE)' },
  { in: 'https://www.royalpalacephnompenh.com/en/',       expect: 'https://royalpalacephnompenh.com/en/',            label: 'www /en/ → non-www /en/' },
  { in: 'http://www.royalpalacephnompenh.com/zh/',        expect: 'https://royalpalacephnompenh.com/zh/',            label: 'http www /zh/ → https non-www /zh/' },

  // === Legal sub-pages with www → one hop ===
  { in: 'https://www.royalpalacephnompenh.com/en/privacy-policy',  expect: 'https://royalpalacephnompenh.com/en/privacy-policy/',  label: 'www en privacy (no slash) → canonical' },

  // === Static files must NOT gain a trailing slash ===
  { in: 'https://royalpalacephnompenh.com/sitemap.xml',   expect: null,          label: 'sitemap.xml (no slash added)' },
  { in: 'https://royalpalacephnompenh.com/robots.txt',    expect: null,          label: 'robots.txt (no slash added)' },
  { in: 'https://royalpalacephnompenh.com/gallery/royal-palace-of-cambodia-1.jpg', expect: null, label: 'image jpg (no slash added)' },
];

let pass = 0, fail = 0;
for (const c of cases) {
  const got = middlewareRedirect(c.in);
  const ok = got === c.expect;
  if (ok) {
    pass++;
    console.log(`  ✓ ${c.label}`);
  } else {
    fail++;
    console.log(`  ✗ ${c.label}`);
    console.log(`      in:      ${c.in}`);
    console.log(`      expect:  ${c.expect ?? '(no redirect)'}`);
    console.log(`      got:     ${got ?? '(no redirect)'}`);
  }
}

console.log(`\nResult: ${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
