export const siteConfig = {
  name: 'Royal Palace of Cambodia Guide',
  baseUrl: 'https://royalpalacephnompenh.com',
  slug: 'royal-palace-of-cambodia',
  locales: ['km', 'en', 'zh'] as const,
};

// Resolve the canonical base URL. Prefer an explicit environment override
// (CURRENT_SITE_DOMAIN) so a single build can target the live domain without
// hard-coding it; otherwise fall back to the static value above.
export function resolveBaseUrl(): string {
  const fromEnv =
    (typeof process !== 'undefined' && process.env && process.env.CURRENT_SITE_DOMAIN) ||
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.CURRENT_SITE_DOMAIN) ||
    '';
  const trimmed = String(fromEnv).trim().replace(/\/+$/, '');
  return trimmed ? trimmed : siteConfig.baseUrl;
}

export const ogLocale: Record<string, string> = {
  km: 'km_KH',
  en: 'en_US',
  zh: 'zh_CN',
};
