import km from './km.json';
import en from './en.json';
import zh from './zh.json';
import { resolveBaseUrl } from '../config';

// Royal Palace of Cambodia guide: Khmer (default), English, Chinese.
export const defaultLang = 'km';
export const languagesList = ['km', 'en', 'zh'] as const;
export const languages: Record<string, string> = {
  km: 'ខ្មែរ',
  zh: '中',
  en: 'en',
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

// Canonical alternates. Domain is resolved dynamically via resolveBaseUrl().
// Every URL is absolute, HTTPS-only, on the non-www host and ends with a
// trailing slash, so it matches the <link rel="canonical"> tag byte for byte.
export function buildAlternates(slug = '') {
  const base = resolveBaseUrl();
  const clean = slug.replace(/^\/+|\/+$/g, '');
  const make = (l: string) => `${base}/${l}${clean ? '/' + clean : ''}/`;
  return {
    km: make('km'),
    en: make('en'),
    zh: make('zh'),
    // x-default points at the English edition — the broadest audience.
    xDefault: make('en'),
  };
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  if (lang === 'km') return 'km';
  return 'en';
}
