export const siteConfig = {
  name: 'Faro Marina Guide',
  baseUrl: 'https://faromarina.com',
  slug: 'faro-marina',
  locales: ['pt', 'en', 'zh'] as const,
};

export const ogLocale: Record<string, string> = {
  pt: 'pt_PT',
  en: 'en_US',
  zh: 'zh_CN',
};
