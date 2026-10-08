/**
 * The link-preview image for a page, built from its lead screenshot (prompt
 * §9): the mark, the headline, and the screen, on forest, at 1200×630.
 *
 *   node scripts/make-og.mjs home "Affiliate dashboards report. Refficks recommends." shots/needs-you@2x.webp
 *
 * Rendered with the same Playwright the capture uses (PLAYWRIGHT_DIR,
 * PLAYWRIGHT_BROWSERS_PATH or E2E_CHROMIUM as there), from an HTML string
 * that loads the site's own font file, and written to public/og/<name>.png.
 */
import { readFileSync, readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [name, headline, shot] = process.argv.slice(2);
if (!name || !headline || !shot) {
  console.error('usage: node scripts/make-og.mjs <name> "<headline>" <public path of the screenshot>');
  process.exit(1);
}

async function loadPlaywright() {
  if (process.env.PLAYWRIGHT_DIR) {
    const module = await import(pathToFileURL(join(process.env.PLAYWRIGHT_DIR, "index.mjs")).href);
    return module.chromium ? module : module.default;
  }
  const module = await import("playwright");
  return module.chromium ? module : module.default;
}

function installedChromium() {
  if (process.env.E2E_CHROMIUM) return process.env.E2E_CHROMIUM;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!root) return undefined;
  const found = readdirSync(root)
    .filter((entry) => entry.startsWith("chromium-"))
    .sort((a, b) => Number(b.slice(9)) - Number(a.slice(9)))[0];
  return found ? join(root, found, "chrome-linux", "chrome") : undefined;
}

const font = readFileSync(join(process.cwd(), "public/fonts/Figtree-Variable.woff2")).toString("base64");
const image = readFileSync(join(process.cwd(), "public", shot)).toString("base64");
const mark =
  '<svg viewBox="28 28 344 344" width="56" height="56"><path fill="#56D66B" fill-rule="evenodd" d="M33 28L111 28A83 83 0 1 1 28 111L28 33A5 5 0 0 1 33 28ZM91.8 111A19.2 19.2 0 1 0 130.2 111A19.2 19.2 0 1 0 91.8 111ZM372 33L372 111A83 83 0 1 1 289 28L367 28A5 5 0 0 1 372 33ZM269.8 111A19.2 19.2 0 1 0 308.2 111A19.2 19.2 0 1 0 269.8 111ZM189 372L111 372A83 83 0 1 1 194 289L194 367A5 5 0 0 1 189 372ZM206 367L206 289A83 83 0 1 1 289 372L211 372A5 5 0 0 1 206 367ZM203.05 171.42L225.05 197.42A4 4 0 0 1 225.36 202.17L203.36 236.17A4 4 0 0 1 196.64 236.17L174.64 202.17A4 4 0 0 1 174.95 197.42L196.95 171.42A4 4 0 0 1 203.05 171.42Z"/></svg>';

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Figtree; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 300 900; }
html, body { margin: 0; }
body { width: 1200px; height: 630px; background: #12291F; color: #F2F8F5; font-family: Figtree, sans-serif; overflow: hidden; position: relative; }
.text { position: absolute; left: 64px; top: 64px; width: 560px; }
.brand { display: flex; align-items: center; gap: 14px; font-weight: 600; font-size: 28px; letter-spacing: -0.01em; }
h1 { margin: 48px 0 0; font-weight: 700; font-size: 52px; line-height: 1.08; letter-spacing: -0.025em; text-wrap: balance; }
p { margin: 24px 0 0; font-size: 22px; line-height: 1.4; color: #BED4C9; }
.shot { position: absolute; left: 680px; top: 96px; width: 760px; border: 1px solid #355948; border-radius: 12px; overflow: hidden; background: #fff; }
.shot img { display: block; width: 100%; }
</style></head><body>
<div class="text"><div class="brand">${mark}<span>Refficks</span></div><h1>${headline}</h1><p>Every morning: the partners you're wasting, the evidence, and the decision left to you.</p></div>
<div class="shot"><img src="data:image/webp;base64,${image}"></div>
</body></html>`;

const { chromium } = await loadPlaywright();
const executablePath = installedChromium();
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
mkdirSync(join(process.cwd(), "public", "og"), { recursive: true });
const out = join(process.cwd(), "public", "og", `${name}.png`);
await page.screenshot({ path: out, type: "png" });
await browser.close();
console.log(`wrote ${out}`);
