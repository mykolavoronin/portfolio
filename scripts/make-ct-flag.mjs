import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="107" viewBox="0 0 9 6">
  <rect width="9" height="6" fill="#FCDD09"/>
  <rect y="0.6667" width="9" height="0.6667" fill="#DA121A"/>
  <rect y="2" width="9" height="0.6667" fill="#DA121A"/>
  <rect y="3.3333" width="9" height="0.6667" fill="#DA121A"/>
  <rect y="4.6667" width="9" height="0.6667" fill="#DA121A"/>
</svg>`;

const dest = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/flags/ct.png");
await sharp(Buffer.from(svg)).png().toFile(dest);
console.log("wrote catalonia flag");
