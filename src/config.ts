export const siteConfig = {
  name: 'Royal Palace of Cambodia Guide',
  baseUrl: 'https://royalpalacephnompenh.com',
  slug: 'royal-palace-of-cambodia',
  locales: ['km', 'en', 'zh'] as const,
};

export const ogLocale: Record<string, string> = {
  km: 'km_KH',
  en: 'en_US',
  zh: 'zh_CN',
};
