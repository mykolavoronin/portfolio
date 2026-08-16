/**
 * Crisp 128px Mriya mark — swallow on the Ukrainian field.
 * Flat print, reads at 36px. Not an official school lockup.
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets", "brands", "mriya.png");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="tile">
      <rect width="128" height="128" rx="28"/>
    </clipPath>
  </defs>
  <g clip-path="url(#tile)">
    <rect width="128" height="64" fill="#005BBB"/>
    <rect y="64" width="128" height="64" fill="#FFD500"/>
    <path
      fill="#F7F5F2"
      d="M22 62c18-6 34-4 48 8 6 5 14 8 22 8-8 3-16 3-24 1-4 10-7 18-8 28-2-10-7-18-14-24-12-9-20-14-24-21z"
    />
    <path
      fill="#F7F5F2"
      d="M70 56c8-10 18-16 30-18-8 8-12 16-13 24-7-1-13-3-17-6z"
    />
    <circle cx="92" cy="52" r="2.4" fill="#1A1816"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log("wrote", out);
