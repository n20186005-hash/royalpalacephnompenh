import fs from 'fs';
const langs = ['km', 'en', 'zh'];
const data = langs.map(l => JSON.parse(fs.readFileSync('src/i18n/' + l + '.json', 'utf8')));
function walk(o, p, lang) {
  for (const k in o) {
    const np = p ? p + '.' + k : k;
    const v = o[k];
    if (v && typeof v === 'object') {
      if (Array.isArray(v)) {
        if (v.length === 0) console.log('[EMPTY ARRAY]', lang, np);
        v.forEach((it, i) => {
          if (typeof it === 'string') { if (!it.trim()) console.log('[EMPTY]', lang, np + '[' + i + ']'); }
          else if (it && typeof it === 'object') walk(it, np + '[' + i + ']', lang);
        });
      } else walk(v, np, lang);
    } else if (typeof v === 'string') {
      if (!v.trim()) console.log('[EMPTY]', lang, np);
    }
  }
}
langs.forEach((lang, idx) => walk(data[idx], '', lang));
// cross-lang empty: if one lang filled but another empty
function flatEmpty(o, p=''){let r=[];for(const k in o){const np=p?p+'.'+k:k;const v=o[k];if(v&&typeof v==='object'){if(Array.isArray(v))v.forEach((it,i)=>{if(typeof it==='string'){if(!it.trim())r.push(np+'['+i+']');}else if(it&&typeof it==='object')r=r.concat(flatEmpty(it,np+'['+i+']'));});else r=r.concat(flatEmpty(v,np));}else if(typeof v==='string'){if(!v.trim())r.push(np);}}return r;}
const empties = langs.map(l => new Set(flatEmpty(data[langs.indexOf(l)])));
for(let i=0;i<langs.length;i++)for(let j=0;j<langs.length;j++){if(i===j)continue;const a=[...empties[i]].filter(k=>!empties[j].has(k));if(a.length)console.log('['+langs[i]+' empty but '+langs[j]+' has]',a.slice(0,10).join(', '));}
console.log('empty scan done');
