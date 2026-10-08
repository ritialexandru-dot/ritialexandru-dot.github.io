/**
 * Captures the product screenshots the site shows, from a running Refficks
 * stack with the demo account built (prompt §8: real screens, light theme,
 * 1440 wide, cropped rather than shrunk).
 *
 * Needs the product's three processes up (apps/api `artisan serve` on 8000,
 * the queue worker, apps/web `next dev` on 3000), `php artisan refficks:demo`
 * run, and Playwright reachable: either installed here, or named by
 * PLAYWRIGHT_DIR (a directory holding playwright's `index.mjs`), with the
 * browser named by E2E_CHROMIUM or found under PLAYWRIGHT_BROWSERS_PATH.
 *
 *   SHOTS_OUT=/tmp/shots node scripts/capture-shots.mjs
 *   node scripts/pack-shots.mjs /tmp/shots       # then, into public/shots
 *
 * Every crop is taken at device scale 2, so the packed 2x file is pixel-exact
 * and the 1x file is a clean halving. Wide screens (the hero, the funnel) are
 * cropped from a 1440px viewport and shown at the site's full column; a card
 * shown beside text is captured at 1100px, where the product draws it about
 * 800px wide, so it is legible at the 7/12 column without shrinking.
 */
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const WEB = process.env.E2E_WEB ?? "http://localhost:3000";
const OUT = process.env.SHOTS_OUT ?? join(process.cwd(), ".shots");
const EMAIL = process.env.DEMO_EMAIL ?? "demo@refficks.test";
const PASSWORD = process.env.DEMO_PASSWORD ?? "demo-partner-growth-2026";

/** Where the product's content column sits at 1440: right of the rail and its page padding. */
const CONTENT_LEFT = 240;
const CONTENT_RIGHT = 1416;

mkdirSync(OUT, { recursive: true });

async function loadPlaywright() {
  if (process.env.PLAYWRIGHT_DIR) {
    const module = await import(pathToFileURL(join(process.env.PLAYWRIGHT_DIR, "index.mjs")).href);
    return module.chromium ? module : module.default;
  }
  const module = await import("playwright");
  return module.chromium ? module : module.default;
}

/** The product's own trick: the image has a different Chromium revision than Playwright asks for. */
function installedChromium() {
  if (process.env.E2E_CHROMIUM) return process.env.E2E_CHROMIUM;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!root) return undefined;
  const found = readdirSync(root)
    .filter((name) => name.startsWith("chromium-"))
    .sort((a, b) => Number(b.slice(9)) - Number(a.slice(9)))[0];
  return found ? join(root, found, "chrome-linux", "chrome") : undefined;
}

const taken = {};

async function clip(page, name, box) {
  await page.screenshot({ path: join(OUT, `${name}.png`), clip: box });
  taken[name] = { width: Math.round(box.width), height: Math.round(box.height) };
  console.log(`${name}.png  ${Math.round(box.width)}×${Math.round(box.height)} css px`);
}

/** The whole card a title sits in: its nearest rounded ancestor, with a small margin. */
async function cardClip(page, title, { pad = 8 } = {}) {
  await title.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const card = title.locator("xpath=ancestor::*[contains(@class,'rounded')][1]");
  const box = await card.boundingBox();
  if (!box) throw new Error("card not found around its title");
  return {
    x: box.x - pad,
    y: box.y - pad,
    width: box.width + pad * 2,
    height: box.height + pad * 2,
  };
}

async function signIn(context) {
  const page = await context.newPage();
  await page.addInitScript(() => {
    try {
      localStorage.setItem("refficks:theme", "light");
    } catch {}
  });
  await page.goto(`${WEB}/login`, { waitUntil: "networkidle" });
  if (page.url().includes("/login")) {
    await page.fill("input[name=email]", EMAIL);
    await page.fill("input[name=password]", PASSWORD);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30_000 });
  }
  return page;
}

async function open(page, path) {
  await page.goto(`${WEB}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
}

const { chromium } = await loadPlaywright();
const executablePath = installedChromium();
const browser = await chromium.launch(executablePath ? { executablePath } : {});

try {
  // Wide screens, at the prompt's 1440×1100.
  const wide = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await signIn(wide);

  await open(page, "/dashboard/intelligence");
  await page.screenshot({ path: join(OUT, "raw-intelligence.png") });
  // The title, the Today card, the tabs, the first recommendation whole and
  // the second one's opening: the list is the point, so the second card
  // shows it is a list.
  await clip(page, "needs-you", {
    x: CONTENT_LEFT,
    y: 72,
    width: CONTENT_RIGHT - CONTENT_LEFT,
    height: 728,
  });

  await open(page, "/dashboard/activation");
  await page.screenshot({ path: join(OUT, "raw-activation.png") });
  // The funnel, the step times, and the two named stalls with their first rows.
  await clip(page, "activation-funnel", {
    x: CONTENT_LEFT,
    y: 72,
    width: CONTENT_RIGHT - CONTENT_LEFT,
    height: 690,
  });

  // A partner's "Why this score" card: the first partner whose card has factors.
  const partners = await page.evaluate(async () => {
    const response = await fetch(`${location.origin}/api/v1/partners?per_page=50`, {
      credentials: "include",
    });
    const body = await response.json();
    return (body.data ?? []).map((row) => ({ id: row.id, name: row.name ?? row.display_name }));
  });
  let scored = false;
  for (const partner of partners) {
    await open(page, `/dashboard/partners/${partner.id}`);
    const heading = page.getByText("Why this score", { exact: true }).first();
    if ((await heading.count()) === 0) continue;
    const card = heading.locator("xpath=ancestor::*[contains(@class,'rounded')][1]");
    const text = await card.innerText().catch(() => "");
    if (!/of \d+/.test(text)) continue;
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const box = await card.boundingBox();
    await clip(page, "score-breakdown", box);
    console.log(`score breakdown from ${partner.name}`);
    scored = true;
    break;
  }
  if (!scored) console.warn("no partner showed a score breakdown with factors");
  await wide.close();

  // Cards shown beside text, at 1100 so the product draws them about 800px wide.
  const narrow = await browser.newContext({
    viewport: { width: 1100, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const card = await signIn(narrow);
  await open(card, "/dashboard/intelligence");
  await card.screenshot({ path: join(OUT, "raw-intelligence-1100.png") });

  // The first recommendation on the list, whole: the Today card repeats the
  // top item's title, so the title wanted is the one whose card has a Not now.
  let firstTitle = null;
  for (const candidate of await card.locator("main").getByText(/^Send .+ their link$/).all()) {
    const text = await candidate
      .locator("xpath=ancestor::*[contains(@class,'rounded')][1]")
      .innerText()
      .catch(() => "");
    if (/Not now/.test(text)) {
      firstTitle = candidate;
      break;
    }
  }
  if (!firstTitle) throw new Error("no recommendation card on the Needs you list");
  await clip(card, "needs-you-card", await cardClip(card, firstTitle));

  // A raise, pressed once: the exact number, what it costs, and Not now.
  const raise = card.getByRole("button", { name: /^Raise .+ to .+/ }).first();
  if ((await raise.count()) > 0) {
    const raiseTitle = card.locator("main").getByText(/^Raise .+ from .+ to .+/).first();
    await raiseTitle.scrollIntoViewIfNeeded();
    await raise.click();
    await card.waitForTimeout(400);
    await card.screenshot({ path: join(OUT, "raw-confirm-raise.png") });
    await clip(card, "confirm-raise", await cardClip(card, raiseTitle));
  } else {
    console.warn("no raise on the Needs you list to confirm");
  }
  await narrow.close();

  writeFileSync(join(OUT, "sizes.json"), JSON.stringify(taken, null, 2));
} finally {
  await browser.close();
}
