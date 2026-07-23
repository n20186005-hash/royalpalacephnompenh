import km from './km.json';
import en from './en.json';
import zh from './zh.json';

// Royal Palace of Cambodia guide: Khmer (default), English, Chinese.
export const defaultLang = 'km';
export const languagesList = ['km', 'en', 'zh'] as const;
export const languages: Record<string, string> = {
  km: 'ខ្មែរ',
  en: 'English',
  zh: '中文',
};

const ui: Record<string, any> = { km, en, zh };

export function getLangFromUrl(url: URL): string {
  const seg = url.pathname.split('/')[1];
  const lang = seg || defaultLang;
  return (languagesList as readonly string[]).includes(lang) ? lang : defaultLang;
}

export function getI18n(url: URL) {
  const lang = getLangFromUrl(url);
  return { lang, messages: ui[lang] };
}

// Canonical alternates. Update baseUrl in src/config.ts to the real domain.
export function buildAlternates(slug = '') {
  const base = 'https://royalpalacephnompenh.com';
  const make = (l: string) => `${base}/${l}${slug ? '/' + slug : ''}`;
  return {
    km: make('km'),
    en: make('en'),
    zh: make('zh'),
    xDefault: make('km'),
  };
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  if (lang === 'km') return 'km';
  return 'en';
}
