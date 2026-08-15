/**
 * One-off: shrink oversized source images and convert to WebP.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { statSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const jobs = [
  // Displayed at max 96px CSS (HomePage) / 56px (CardPage) — 384px covers 4x DPI.
  { src: "src/assets/avatar.png", width: 384, quality: 85 },
  // Displayed at max ~184x44 CSS in the footer — 720px covers 4x DPI.
  { src: "src/assets/signature.png", width: 720, quality: 85 },
  // Used full-bleed up to ~680px CSS container (2x) — keep native size, just re-encode.
  { src: "src/assets/projects/agenyz.png", width: 1440, quality: 82 },
  { src: "src/assets/projects/ekabalance.png", width: 1440, quality: 82 },
  { src: "src/assets/projects/kucherov.png", width: 1440, quality: 82 },
  { src: "src/assets/projects/masaje.png", width: 1440, quality: 82 },
];

for (const job of jobs) {
  const srcPath = join(root, job.src);
  const outPath = srcPath.replace(/\.png$/, ".webp");
  const before = statSync(srcPath).size;

  await sharp(srcPath)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(outPath);

  const after = statSync(outPath).size;
  console.log(
    `${job.src} → ${outPath.replace(root, "")}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
  );
  unlinkSync(srcPath);
}
