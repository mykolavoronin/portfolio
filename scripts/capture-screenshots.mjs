/**
 * Capture full-page-ish viewport screenshots of portfolio project sites.
 * Uses system Chrome via puppeteer-core.
 *
 * Run: node scripts/capture-screenshots.mjs
 */
import { createRequire } from "node:module";
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src", "assets", "projects");

const CHROME =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const targets = [
  { file: "kucherov.png", url: "https://kucherov.studio/" },
  { file: "ekabalance.png", url: "https://ekabalance.com/" },
  { file: "eka-vip.png", url: "https://vip.ekabalance.com/" },
  { file: "eka-business.png", url: "https://business.ekabalance.com/" },
  { file: "agenyz.png", url: "https://agenyz.es/" },
  { file: "masaje.png", url: "https://masaje.barcelona/" },
];

async function main() {
  // Prefer puppeteer-core (no bundled chromium)
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
    ],
  });

  try {
    for (const t of targets) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(90_000);
      console.log("Capturing", t.url, "→", t.file);
      try {
        await page.goto(t.url, { waitUntil: "networkidle2", timeout: 90_000 });
        // Let fonts / hero images settle
        await new Promise((r) => setTimeout(r, 2800));
        // Hide common cookie banners if present
        await page.evaluate(() => {
          const selectors = [
            '[id*="cookie" i]',
            '[class*="cookie" i]',
            '[id*="consent" i]',
            '[class*="consent" i]',
            '[aria-label*="cookie" i]',
          ];
          for (const sel of selectors) {
            document.querySelectorAll(sel).forEach((el) => {
              const text = (el.textContent || "").toLowerCase();
              if (
                text.includes("cookie") ||
                text.includes("consent") ||
                text.includes("gdpr")
              ) {
                el.style.setProperty("display", "none", "important");
              }
            });
          }
        });
        await page.screenshot({
          path: join(outDir, t.file),
          type: "png",
          captureBeyondViewport: false,
        });
        console.log("  ok");
      } catch (err) {
        console.error("  failed:", err.message);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
