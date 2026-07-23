import fs from 'fs';
const langs = ['km', 'en', 'zh'];
const data = langs.map(l => JSON.parse(fs.readFileSync('src/i18n/' + l + '.json', 'utf8')));
const hasKhmer = s => /[ក-៟]/.test(s);
const hasCJK = s => /[一-鿿]/.test(s);
function check(s, p, lang) {
  if (lang === 'zh' && hasKhmer(s)) console.log('[zh has Khmer]', p, '=>', s.slice(0, 50));
  if (lang === 'km' && hasCJK(s)) console.log('[km has CJK]', p, '=>', s.slice(0, 50));
  if (lang === 'en' && (hasCJK(s) || hasKhmer(s))) console.log('[en has CJK/Khmer]', p, '=>', s.slice(0, 50));
}
function walk(o, p, lang) {
  for (const k in o) {
    const np = p ? p + '.' + k : k;
    const v = o[k];
    if (v && typeof v === 'object') {
      if (Array.isArray(v)) v.forEach((it, i) => {
        if (typeof it === 'string') check(it, np + '[' + i + ']', lang);
        else if (it && typeof it === 'object') walk(it, np + '[' + i + ']', lang);
      });
      else walk(v, np, lang);
    } else if (typeof v === 'string') check(v, np, lang);
  }
}
langs.forEach((lang, idx) => walk(data[idx], '', lang));
console.log('confusion scan done');
