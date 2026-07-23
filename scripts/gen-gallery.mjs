import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('public/gallery', { recursive: true });

const labels = [
  'Royal Palace of Cambodia',
  'Throne Hall',
  'Silver Pagoda',
  'Royal Buildings',
  'Khmer Architecture',
  'Palace Courtyard',
  'Golden Spire',
  'Riverside Gate',
  'Royal Gardens',
];

// A stylised, tiered Khmer-style roof silhouette.
const roof = (cx, baseY, w, color) => {
  const hw = w / 2;
  return `
    <g fill="${color}">
      <path d="M ${cx - hw} ${baseY}
               Q ${cx} ${baseY - w * 0.55} ${cx + hw} ${baseY}
               L ${cx + hw * 0.78} ${baseY}
               Q ${cx} ${baseY - w * 0.34} ${cx - hw * 0.78} ${baseY} Z" />
      <path d="M ${cx - hw * 0.62} ${baseY - w * 0.42}
               Q ${cx} ${baseY - w * 0.95} ${cx + hw * 0.62} ${baseY - w * 0.42}
               L ${cx + hw * 0.46} ${baseY - w * 0.42}
               Q ${cx} ${baseY - w * 0.66} ${cx - hw * 0.46} ${baseY - w * 0.42} Z" />
      <rect x="${cx - 4}" y="${baseY - w * 0.95}" width="8" height="${w * 0.5}" />
    </g>`;
};

const W = 1200;
const H = 900;

for (let i = 0; i < 9; i++) {
  const hue = 44 + i * 2; // gold-ish
  const top = `hsl(${hue} 55% 62%)`;
  const mid = `hsl(${hue} 48% 46%)`;
  const bot = `hsl(2 52% 32%)`;
  const silhouette = `hsl(20 45% 20%)`;

  // three tiered roofs across the scene
  const roofs = [
    roof(600, 620, 360, silhouette),
    roof(360, 560, 220, silhouette),
    roof(840, 560, 220, silhouette),
  ].join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${labels[i]}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${top}"/>
      <stop offset="0.55" stop-color="${mid}"/>
      <stop offset="1" stop-color="${bot}"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.7" cy="0.28" r="0.5">
      <stop offset="0" stop-color="#fff7e0" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fff7e0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#sun)"/>
  <g opacity="0.92">
    ${roofs}
    <rect x="180" y="640" width="840" height="180" fill="${silhouette}" opacity="0.85"/>
    <rect x="180" y="640" width="840" height="14" fill="#d4af37" opacity="0.8"/>
  </g>
  <text x="40" y="${H - 40}" font-family="Segoe UI, Noto Sans, sans-serif" font-size="34" font-weight="700" fill="#fbf8f1" opacity="0.95">${labels[i]}</text>
  <text x="${W - 120}" y="70" font-family="Segoe UI, sans-serif" font-size="28" fill="#fbf8f1" opacity="0.8">${i + 1} / 9</text>
</svg>`;

  writeFileSync(`public/gallery/royal-palace-of-cambodia-${i + 1}.svg`, svg, 'utf8');
}

console.log('Generated 9 gallery SVGs.');
