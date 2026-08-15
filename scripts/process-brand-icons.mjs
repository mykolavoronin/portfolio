import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/brands");
await mkdir(dir, { recursive: true });

const SIZE = 128;

async function toSquare(src, dest, { fit = "cover", background = { r: 255, g: 255, b: 255, alpha: 1 }, flatten = false } = {}) {
  let img = sharp(src);
  if (flatten) img = img.flatten({ background });
  await img
    .resize(SIZE, SIZE, { fit, background, position: "centre" })
    .png({ compressionLevel: 9 })
    .toFile(dest);
}

async function fromSvg(svg, dest) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(dest);
}

await toSquare(path.join(dir, "politecnics-src.png"), path.join(dir, "politecnics.png"));
await toSquare(path.join(dir, "scrimba-src.png"), path.join(dir, "scrimba.png"));
await toSquare(path.join(dir, "animations-g.png"), path.join(dir, "animations-dev.png"), { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });

// Regina crest: favicon is the shield; put it on the site paper color so the black mark reads.
await toSquare(path.join(dir, "regina-src.png"), path.join(dir, "regina-carmeli.png"), {
  fit: "contain",
  flatten: true,
  background: { r: 247, g: 245, b: 242, alpha: 1 },
});

// Crop the KS mark so letters fill the tile (source is a padded 128).
await sharp(path.join(dir, "kucherov-favicon.png"))
  .extract({ left: 18, top: 28, width: 92, height: 72 })
  .resize(SIZE, SIZE, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(dir, "kucherov.png"));

await fromSvg(
  `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${SIZE}" height="${SIZE}" rx="28" fill="#E31C79"/>
    <text x="64" y="78" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="44" font-weight="700" fill="#fff" letter-spacing="-1">IT</text>
  </svg>`,
  path.join(dir, "it-academy.png"),
);

await fromSvg(
  `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
        <stop offset="50%" stop-color="#0057B7"/>
        <stop offset="50%" stop-color="#FFD700"/>
      </linearGradient>
    </defs>
    <rect width="${SIZE}" height="${SIZE}" rx="28" fill="url(#f)"/>
    <text x="64" y="86" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="62" font-weight="600" fill="#fff">M</text>
  </svg>`,
  path.join(dir, "mriya.png"),
);

console.log("wrote brand icons to", dir);
