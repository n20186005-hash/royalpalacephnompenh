import pt from './pt.json';
import en from './en.json';
import zh from './zh.json';

export const defaultLang = 'pt';
export const languagesList = ['pt', 'en', 'zh'] as const;

export const languages: Record<string, string> = {
  pt: 'Português',
  en: 'English',
  zh: '中文',
};

const ui: Record<string, any> = { pt, en, zh };

export function getLangFromUrl(url: URL): string {
  const seg = url.pathname.split('/').filter(Boolean);
  const lang = seg[0];
  return (languagesList as readonly string[]).includes(lang) ? lang : defaultLang;
}

export function getI18n(url: URL) {
  const lang = getLangFromUrl(url);
  const messages = ui[lang];
  const t = (key: string): string => {
    const found = key
      .split('.')
      .reduce<any>((o, i) => (o == null ? undefined : o[i]), messages);
    return found ?? '';
  };
  return { lang, messages, t };
}

export function buildAlternates(path = ''): Record<string, string> {
  const base = 'https://faromarina.com';
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const mk = (l: string) => `${base}/${l}${clean ? '/' + clean : ''}`;
  return {
    pt: mk('pt'),
    en: mk('en'),
    zh: mk('zh'),
    xDefault: mk('pt'),
  };
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  if (lang === 'pt') return 'pt-PT';
  return lang;
}
