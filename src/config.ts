export const siteConfig = {
  name: 'Royal Palace of Cambodia Guide',
  baseUrl: 'https://royalpalacephnompenh.com',
  slug: 'royal-palace-of-cambodia',
  locales: ['km', 'en', 'zh'] as const,
  // Google Maps embed iframe for the Royal Palace of Cambodia (Phnom Penh).
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.8323002158654!2d104.9286718122353!3d11.563876988589499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0xf8f1809319cea6df!2z6YeR6L65546L5a6r!5e0!3m2!1szh-CN!2sus!4v1784818707285!5m2!1szh-CN!2sus',
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
