import { readdirSync, renameSync, existsSync, unlinkSync } from 'node:fs';

const dir = 'public/gallery';
const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.jpg'));

// Sort so '1.jpg' becomes the first renamed asset
files.sort((a, b) => {
  const na = Number(a.replace(/\.jpg$/i, '')) || Infinity;
  const nb = Number(b.replace(/\.jpg$/i, '')) || Infinity;
  if (na !== nb) return na - nb;
  return a.localeCompare(b);
});

// Remove any previously generated SVG placeholders
readdirSync(dir)
  .filter((f) => f.endsWith('.svg'))
  .forEach((f) => unlinkSync(`${dir}/${f}`));

files.forEach((f, i) => {
  const target = `${dir}/royal-palace-of-cambodia-${i + 1}.jpg`;
  if (existsSync(target)) return;
  renameSync(`${dir}/${f}`, target);
  console.log(`${f} -> ${target}`);
});

console.log(`Renamed ${files.length} JPGs.`);
