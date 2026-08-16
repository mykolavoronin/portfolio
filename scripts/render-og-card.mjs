/**
 * @deprecated Use `scripts/render-og.mjs` (`npm run og:render`).
 * Rasterize theme-aware card OG SVGs → PNG (1200×630).
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const theme of ["light", "dark"]) {
  const svg = readFileSync(join(root, "public", `og-card-${theme}.svg`));
  const out = join(root, "public", `og-card-${theme}.png`);
  await sharp(svg, { density: 144 }).resize(1200, 630).png().toFile(out);
  console.log(`wrote ${out}`);
}
