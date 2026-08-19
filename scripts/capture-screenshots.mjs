/**
 * Capture project-site stills for the portfolio.
 * Clean profile, no extensions. Consent / ads / widgets never load.
 *
 * Run: npm run screenshots
 */
import { createRequire } from "node:module";
import { mkdirSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src", "assets", "projects");

const CHROME =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const targets = [
  { file: "kucherov.webp", url: "https://kucherov.studio/" },
  { file: "ekabalance.webp", url: "https://www.ekabalance.com/" },
  { file: "agenyz.webp", url: "https://www.agenyz.es/" },
  { file: "masaje.webp", url: "https://masaje.barcelona/" },
];

/** Reject the banner, then remove the zero-size max-z reopen host. */
async function dismissChrome(page) {
  const clicked = await page.evaluate(() => {
    const rejectExact = [
      "reject all",
      "reject",
      "decline",
      "deny",
      "rechazar",
      "rebutjar",
      "rechazar no esenciales",
      "solo necesarias",
      "only necessary",
      "necessary only",
    ];
    const nodes = Array.from(document.querySelectorAll("button"));
    const label = (el) => (el.textContent || "").trim().toLowerCase();
    const match =
      nodes.find((el) => rejectExact.includes(label(el))) ||
      nodes.find((el) => rejectExact.some((want) => label(el).includes(want) && label(el).length < 40));
    if (!match) return "";
    try {
      match.click();
      return label(match);
    } catch {
      return "";
    }
  });

  if (clicked) {
    console.log("  rejected:", clicked);
    await new Promise((r) => setTimeout(r, 1800));
  } else {
    console.log("  no reject button");
    await new Promise((r) => setTimeout(r, 400));
  }

  await page.evaluate(() => {
    const hide = (el) => {
      if (!(el instanceof HTMLElement)) return;
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("visibility", "hidden", "important");
      el.remove();
    };

    for (const el of document.querySelectorAll("html > div, body > div")) {
      if (!(el instanceof HTMLElement)) continue;
      const z = parseInt(getComputedStyle(el).zIndex, 10);
      if (z >= 2147483000) hide(el);
    }

    const probe = document.elementFromPoint(window.innerWidth - 28, window.innerHeight - 28);
    if (probe instanceof HTMLElement && probe !== document.body && probe !== document.documentElement) {
      const r = probe.getBoundingClientRect();
      const z = parseInt(getComputedStyle(probe).zIndex, 10) || 0;
      if ((r.width <= 4 && r.height <= 4) || z >= 2147483000) hide(probe);
    }
  });
}

async function main() {
  let puppeteer;
  try {
    puppeteer = require("puppeteer-core");
  } catch {
    puppeteer = require("puppeteer");
  }

  if (!existsSync(CHROME) && !process.env.CHROME_PATH) {
    console.error("Chrome not found at", CHROME);
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  const profile = mkdtempSync(join(tmpdir(), "portfolio-shot-"));

  const browser = await puppeteer.launch({
    executablePath: existsSync(CHROME) ? CHROME : undefined,
    headless: "new",
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--font-render-hinting=none",
      "--disable-extensions",
      "--disable-component-extensions-with-background-pages",
      "--disable-default-apps",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
    ],
  });

  try {
    for (const t of targets) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(90_000);
      await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      );
      console.log("Capturing", t.url, "→", t.file);
      try {
        await page.goto(t.url, { waitUntil: "networkidle2", timeout: 90_000 });
        await page.evaluate(() => document.fonts?.ready).catch(() => {});
        await new Promise((r) => setTimeout(r, 1600));
        await dismissChrome(page);

        const png = await page.screenshot({
          type: "png",
          captureBeyondViewport: false,
        });
        const dest = join(outDir, t.file);
        await sharp(png).resize({ width: 1440, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
        console.log("  ok");
      } catch (err) {
        console.error("  failed:", err.message);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
