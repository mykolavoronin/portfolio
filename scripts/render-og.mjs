/**
 * Rasterize theme-aware Open Graph / share / apple-touch stills.
 * Run: npm run og:render
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const chrome =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const portraits = join(root, "scripts", "og", "portraits");
const tmp = join(root, "scripts", "og", ".tmp");
const publicDir = join(root, "public");

mkdirSync(tmp, { recursive: true });

const template = readFileSync(join(root, "scripts", "og", "template.html"), "utf8");

function photo(slug) {
  return pathToFileURL(join(portraits, `${slug}.png`)).href;
}

function htmlFor({ kind, theme, slug, extraClass = "" }) {
  const src = photo(slug);
  const bodies = {
    site: `<div class="site ${extraClass}">
      <div class="site-photo"><img src="${src}" alt="" /></div>
      <div class="site-copy">
        <p class="mark">mv</p>
        <h1 class="name">Mykola Voronin</h1>
        <p class="meta">Student · Barcelona</p>
        <p class="url">mykolavoronin.com</p>
      </div>
    </div>`,
    card: `<div class="card-wrap">
      <article class="card">
        <div class="card-photo"><img src="${src}" alt="" /></div>
        <h1 class="name">Mykola Voronin</h1>
        <p class="meta">Student · Barcelona</p>
        <p class="url">mykolavoronin.com/card</p>
      </article>
    </div>`,
    square: `<div class="square">
      <img src="${src}" alt="" />
      <h1 class="name">Mykola Voronin</h1>
      <p class="meta">Student · Barcelona</p>
    </div>`,
    icon: `<div class="icon"><img src="${src}" alt="" /></div>`,
  };
  return template
    .replace("__KIND__", kind)
    .replace("__THEME__", theme)
    .replace("__BODY__", bodies[kind]);
}

function sizeFor(kind) {
  if (kind === "icon") return { w: 512, h: 512 };
  if (kind === "square") return { w: 1200, h: 1200 };
  return { w: 1200, h: 630 };
}

function shot(html, outPng, kind) {
  const { w, h } = sizeFor(kind);
  const htmlPath = join(tmp, `${kind}-${Date.now()}-${Math.random().toString(16).slice(2)}.html`);
  writeFileSync(htmlPath, html);
  const url = pathToFileURL(htmlPath).href;
  const raw = join(tmp, "shot.png");
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--window-size=${w},${h}`,
      "--force-device-scale-factor=2",
      "--virtual-time-budget=4000",
      `--screenshot=${raw}`,
      url,
    ],
    { stdio: "ignore" },
  );
  return sharp(raw).resize(w, h).png({ compressionLevel: 9 }).toFile(outPng);
}

const jobs = [
  { kind: "site", theme: "light", slug: "default", out: join(publicDir, "og-image-light.png") },
  { kind: "site", theme: "dark", slug: "default", out: join(publicDir, "og-image-dark.png") },
  { kind: "card", theme: "light", slug: "default", out: join(publicDir, "og-card-light.png") },
  { kind: "card", theme: "dark", slug: "default", out: join(publicDir, "og-card-dark.png") },
  { kind: "square", theme: "light", slug: "default", out: join(publicDir, "og-square.png") },
  { kind: "icon", theme: "light", slug: "default", out: join(publicDir, "apple-touch-icon.png") },
];

if (!existsSync(chrome)) {
  console.error("Chrome not found at", chrome);
  process.exit(1);
}

for (const job of jobs) {
  const html = htmlFor(job);
  await shot(html, job.out, job.kind);
  console.log("wrote", job.out.replace(root, ""));
}

await sharp(join(publicDir, "og-image-light.png"))
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(publicDir, "og-image.jpg"));
console.log("wrote /public/og-image.jpg");
