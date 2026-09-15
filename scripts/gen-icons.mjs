// Generates the PWA icon set (PNG) with no external dependencies.
// Run: node scripts/gen-icons.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'icons');

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([length, typeBuf, data, crc]);
}

function encodePng(size, rgba) {
  const stride = size * 4 + 1;
  const raw = Buffer.alloc(stride * size);
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0; // filter: none
    rgba.copy(raw, y * stride + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** Draws the Royal Palace icon: a three-tier Khmer roof in gold on deep ocean blue. */
function drawIcon(size, scale) {
  const px = Buffer.alloc(size * size * 4);
  const set = (x, y, [r, g, b]) => {
    const i = (y * size + x) * 4;
    px[i] = r;
    px[i + 1] = g;
    px[i + 2] = b;
    px[i + 3] = 255;
  };

  // Vertical gradient background (must cover the full square for maskable icons).
  for (let y = 0; y < size; y++) {
    const t = y / (size - 1);
    const colour = [
      Math.round(11 + (6 - 11) * t),
      Math.round(58 + (40 - 58) * t),
      Math.round(92 + (66 - 92) * t),
    ];
    for (let x = 0; x < size; x++) set(x, y, colour);
  }

  const inner = size * scale;
  const ox = (size - inner) / 2;
  const oy = (size - inner) / 2;
  const toX = (u) => ox + u * inner;
  const toY = (v) => oy + v * inner;

  const rect = (x0, y0, x1, y1, colour) => {
    for (let y = Math.max(0, Math.floor(toY(y0))); y <= Math.min(size - 1, Math.ceil(toY(y1))); y++) {
      for (let x = Math.max(0, Math.floor(toX(x0))); x <= Math.min(size - 1, Math.ceil(toX(x1))); x++) {
        set(x, y, colour);
      }
    }
  };

  const triangle = (ax, ay, bx, by, cx, cy, colour) => {
    const minX = Math.floor(toX(Math.min(ax, bx, cx)));
    const maxX = Math.ceil(toX(Math.max(ax, bx, cx)));
    const minY = Math.floor(toY(Math.min(ay, by, cy)));
    const maxY = Math.ceil(toY(Math.max(ay, by, cy)));
    for (let y = Math.max(0, minY); y <= Math.min(size - 1, maxY); y++) {
      for (let x = Math.max(0, minX); x <= Math.min(size - 1, maxX); x++) {
        const u = (x + 0.5 - ox) / inner;
        const v = (y + 0.5 - oy) / inner;
        const d1 = (u - bx) * (ay - by) - (ax - bx) * (v - by);
        const d2 = (u - cx) * (by - cy) - (bx - cx) * (v - cy);
        const d3 = (u - ax) * (cy - ay) - (cx - ax) * (v - ay);
        const neg = d1 < 0 || d2 < 0 || d3 < 0;
        const pos = d1 > 0 || d2 > 0 || d3 > 0;
        if (!(neg && pos)) set(x, y, colour);
      }
    }
  };

  const GOLD = [226, 182, 88];
  const GOLD_DARK = [193, 141, 54];
  const GOLD_LIGHT = [244, 219, 152];

  // Finial + spire
  rect(0.487, 0.06, 0.513, 0.2, GOLD_LIGHT);
  // Tier 3 (top roof)
  triangle(0.36, 0.3, 0.64, 0.3, 0.5, 0.12, GOLD_LIGHT);
  // Tier 2
  triangle(0.29, 0.47, 0.71, 0.47, 0.5, 0.27, GOLD);
  // Tier 1 (bottom roof)
  triangle(0.2, 0.64, 0.8, 0.64, 0.5, 0.41, GOLD_DARK);
  // Body / gallery wall
  rect(0.28, 0.64, 0.72, 0.76, GOLD);
  // Column row
  rect(0.24, 0.76, 0.76, 0.81, GOLD_LIGHT);
  // Base plinth
  rect(0.17, 0.81, 0.83, 0.88, GOLD_DARK);

  return px;
}

const targets = [
  { file: 'icon-192.png', size: 192, scale: 0.9 },
  { file: 'icon-512.png', size: 512, scale: 0.9 },
  { file: 'icon-maskable-512.png', size: 512, scale: 0.68 },
  { file: 'apple-touch-icon.png', size: 180, scale: 0.9 },
];

mkdirSync(OUT_DIR, { recursive: true });
for (const { file, size, scale } of targets) {
  const png = encodePng(size, drawIcon(size, scale));
  writeFileSync(join(OUT_DIR, file), png);
  console.log(`generated public/icons/${file} (${size}x${size}, ${png.length} bytes)`);
}
