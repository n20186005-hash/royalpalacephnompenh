// Compress gallery JPGs in place (same filenames, no deletion).
// Limits size so Cloudflare Pages (25 MiB/file) accepts them and pages load fast.
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'public', 'gallery');
const MAX_EDGE = 1600;
const QUALITY = 82;

const files = (await readdir(dir)).filter((f) => /-(\d+)\.jpg$/i.test(f)).sort((a, b) => {
  const na = parseInt(a.match(/-(\d+)\.jpg$/i)[1], 10);
  const nb = parseInt(b.match(/-(\d+)\.jpg$/i)[1], 10);
  return na - nb;
});

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const path = join(dir, file);
  const before = (await stat(path)).size;
  const img = sharp(path);
  const meta = await img.metadata();
  const resize =
    meta.width > MAX_EDGE || meta.height > MAX_EDGE
      ? { width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true }
      : undefined;
  await img
    .rotate()
    .resize(resize)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(path + '.tmp');
  await (await import('node:fs/promises')).rename(path + '.tmp', path);

  const after = (await stat(path)).size;
  totalBefore += before;
  totalAfter += after;
  console.log(
    `${file.padEnd(38)} ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB`
  );
}

console.log(
  `\nTotal: ${(totalBefore / 1e6).toFixed(2)}MB -> ${(totalAfter / 1e6).toFixed(2)}MB ` +
    `(saved ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`
);
