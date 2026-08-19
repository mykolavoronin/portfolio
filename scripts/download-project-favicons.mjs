import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/brands");
const SIZE = 128;

async function downloadBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// 1. Kucherov Studio
try {
  console.log("Fetching Kucherov favicon...");
  const buf = await downloadBuffer("https://kucherov.studio/favicon-ks.png");
  await sharp(buf)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, "kucherov.png"));
  console.log("✓ Saved kucherov.png");
} catch (e) {
  console.error("Kucherov failed:", e.message);
}

// 2. EKA Balance
try {
  console.log("Fetching EKA Balance favicon...");
  let buf;
  try {
    buf = await downloadBuffer("https://ekabalance.com/apple-icon.png");
  } catch {
    buf = await downloadBuffer("https://ekabalance.com/icon.png");
  }
  await sharp(buf)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, "eka-favicon.png"));
  console.log("✓ Saved eka-favicon.png");
} catch (e) {
  console.error("EKA Balance failed:", e.message);
}

// 3. Agenyz
try {
  console.log("Fetching Agenyz favicon...");
  const buf = await downloadBuffer("https://agenyz.es/icon.svg");
  await sharp(buf)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, "agenyz.png"));
  console.log("✓ Saved agenyz.png");
} catch (e) {
  console.error("Agenyz failed:", e.message);
}

// 4. Masaje Barcelona
try {
  console.log("Fetching Masaje Barcelona favicon...");
  let buf;
  try {
    buf = await downloadBuffer("https://masaje.barcelona/apple-icon.png");
  } catch {
    buf = await downloadBuffer("https://masaje.barcelona/icon.png");
  }
  await sharp(buf)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, "masaje.png"));
  console.log("✓ Saved masaje.png");
} catch (e) {
  console.error("Masaje Barcelona failed:", e.message);
}

console.log("All project favicons processed.");
