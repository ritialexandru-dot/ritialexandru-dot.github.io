/**
 * Captures the product screenshots the site shows, from a running Refficks
 * stack with the demo account built (prompt §8: real screens, light theme,
 * cropped rather than shrunk).
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
 * and the 1x file is a clean halving. The hero is cropped from a 1440px
 * viewport and shown at the site's full column; a card shown beside text is
 * captured at 1100px, where the product draws it about 800px wide, so it is
 * legible at the 7/12 column without shrinking. The partner portal is
 * captured on a 390px phone.
 */
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const WEB = process.env.E2E_WEB ?? "http://localhost:3000";
const OUT = process.env.SHOTS_OUT ?? join(process.cwd(), ".shots");
const EMAIL = process.env.DEMO_EMAIL ?? "demo@refficks.test";
const PASSWORD = process.env.DEMO_PASSWORD ?? "demo-partner-growth-2026";
const PORTAL_EMAIL = process.env.PORTAL_EMAIL ?? "dana@advocates.test";
const PORTAL_PASSWORD = process.env.PORTAL_PASSWORD ?? "demo-partner-portal-2026";

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

/** The card a heading sits in: its nearest rounded ancestor. */
function cardOf(locator) {
  return locator.locator("xpath=ancestor::*[contains(@class,'rounded')][1]");
}

/** A card's box, from its top, no taller than `maxHeight`, with a margin. */
async function cardClip(page, title, { pad = 8, maxHeight = Infinity } = {}) {
  await title.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const box = await cardOf(title).boundingBox();
  if (!box) throw new Error("card not found around its title");
  return {
    x: box.x - pad,
    y: box.y - pad,
    width: box.width + pad * 2,
    height: Math.min(box.height, maxHeight) + pad * 2,
  };
}

async function signIn(context, path = "/login", email = EMAIL, password = PASSWORD) {
  const page = await context.newPage();
  await page.addInitScript(() => {
    try {
      localStorage.setItem("refficks:theme", "light");
    } catch {}
  });
  await page.goto(`${WEB}${path}`, { waitUntil: "networkidle" });
  if (page.url().includes("/login")) {
    await page.fill("input[name=email]", email);
    await page.fill("input[name=password]", password);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await page.waitForURL((url) => !url.pathname.endsWith("/login"), { timeout: 30_000 });
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
  // The hero, at the prompt's 1440 wide: the Intelligence title, the Today
  // card, the tabs and the first recommendation whole.
  const wide = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await signIn(wide);
  await open(page, "/dashboard/intelligence");
  await page.screenshot({ path: join(OUT, "raw-intelligence.png") });
  await clip(page, "needs-you", { x: CONTENT_LEFT, y: 72, width: CONTENT_RIGHT - CONTENT_LEFT, height: 600 });

  // A partner's "Why this score" card, kept for the product pages.
  const partners = await page.evaluate(async () => {
    const response = await fetch(`${location.origin}/api/v1/partners?per_page=50`, { credentials: "include" });
    const body = await response.json();
    return (body.data ?? []).map((row) => row.id);
  });
  for (const id of partners) {
    await open(page, `/dashboard/partners/${id}`);
    const heading = page.getByText("Why this score", { exact: true }).first();
    if ((await heading.count()) === 0) continue;
    const text = await cardOf(heading).innerText().catch(() => "");
    if (!/of \d+/.test(text)) continue;
    await clip(page, "score-breakdown", await cardClip(page, heading, { pad: 0 }));
    break;
  }
  await wide.close();

  // Cards shown beside text, at 1100 so the product draws them about 800px wide.
  const narrow = await browser.newContext({
    viewport: { width: 1100, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const card = await signIn(narrow);

  await open(card, "/dashboard/intelligence");
  // The first recommendation: the Today card repeats its title, so the one
  // wanted is the title whose card has a Not now button.
  let firstTitle = null;
  for (const candidate of await card.locator("main").getByText(/^Send .+ their link$/).all()) {
    const text = await cardOf(candidate).innerText().catch(() => "");
    if (/Not now/.test(text)) {
      firstTitle = candidate;
      break;
    }
  }
  if (firstTitle) await clip(card, "needs-you-card", await cardClip(card, firstTitle));
  else console.warn("no recommendation card on the Needs you list");

  // A raise, pressed once: the exact number, what it costs, and Not now.
  const raise = card.getByRole("button", { name: /^Raise .+ to .+/ }).first();
  if ((await raise.count()) > 0) {
    const raiseTitle = card.locator("main").getByText(/^Raise .+ from .+ to .+/).first();
    await raiseTitle.scrollIntoViewIfNeeded();
    await raise.click();
    await card.waitForTimeout(400);
    await clip(card, "confirm-raise", await cardClip(card, raiseTitle));
  }

  // Tracking: the links table, its first rows.
  await open(card, "/dashboard/tracking");
  const linksTitle = card.getByText("Tracking links", { exact: true }).first();
  await clip(card, "tracking", await cardClip(card, linksTitle, { maxHeight: 400 }));

  // Attribution: a conversion whose decision names another partner's claim,
  // or the first with a decision; "The decision" through "Every touch considered".
  const conversions = await card.evaluate(async () => {
    const response = await fetch(`${location.origin}/api/v1/conversions?per_page=100`, { credentials: "include" });
    const body = await response.json();
    return (body.data ?? []).map((row) => row.id);
  });
  let chosen = null;
  for (const id of conversions) {
    await open(card, `/dashboard/conversions/${id}`);
    const text = await card.locator("main").innerText().catch(() => "");
    if (/other partner|below full/i.test(text)) {
      chosen = id;
      break;
    }
    if (chosen === null && /The decision/.test(text)) chosen = id;
  }
  if (chosen) {
    await open(card, `/dashboard/conversions/${chosen}`);
    const decision = card.getByText("The decision", { exact: true }).first();
    const touches = card.getByText("Every touch considered", { exact: true }).first();
    await decision.scrollIntoViewIfNeeded();
    await card.waitForTimeout(300);
    const top = await cardOf(decision).boundingBox();
    const bottom = await cardOf(touches).boundingBox();
    if (top && bottom) {
      const y = top.y - 8;
      await clip(card, "attribution", {
        x: top.x - 8,
        y,
        width: top.width + 16,
        height: Math.min(bottom.y + bottom.height + 8 - y, 700),
      });
    }
    console.log(`attribution from conversion ${chosen}`);
  }

  // Commissions: rows that show the arithmetic and a reversal, where the list has them.
  await open(card, "/dashboard/commissions");
  let ledgerDone = false;
  for (let pageNo = 1; pageNo <= 8 && !ledgerDone; pageNo += 1) {
    const rows = await card.locator("main table tbody tr").all();
    let first = -1;
    for (let i = 0; i < rows.length; i += 1) {
      const text = await rows[i].innerText().catch(() => "");
      if (/% of/.test(text)) {
        first = i;
        break;
      }
    }
    if (first >= 0) {
      const last = Math.min(first + 5, rows.length - 1);
      await rows[first].scrollIntoViewIfNeeded();
      await card.waitForTimeout(300);
      const a = await rows[first].boundingBox();
      const b = await rows[last].boundingBox();
      const header = await card.locator("main table thead").first().boundingBox();
      const start = header && a.y - header.y < 480 ? header : a;
      await clip(card, "ledger", {
        x: a.x - 8,
        y: start.y - 8,
        width: a.width + 16,
        height: b.y + b.height - start.y + 16,
      });
      ledgerDone = true;
      break;
    }
    const next = card.getByRole("button", { name: "Next", exact: true });
    if ((await next.count()) === 0 || (await next.isDisabled())) break;
    await next.click();
    await card.waitForTimeout(900);
  }
  if (!ledgerDone) console.warn("no commission row showing its arithmetic was found");

  // Payouts: the Ready to pay card, who is left out and why.
  await open(card, "/dashboard/payouts");
  const readyTitle = card.getByText("Ready to pay", { exact: true }).first();
  await clip(card, "payouts", await cardClip(card, readyTitle, { maxHeight: 520 }));
  await narrow.close();

  // The partner portal, on a phone.
  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    colorScheme: "light",
    isMobile: true,
    hasTouch: true,
  });
  const portal = await signIn(phone, "/portal/login", PORTAL_EMAIL, PORTAL_PASSWORD);
  await open(portal, "/portal/dashboard");
  await portal.screenshot({ path: join(OUT, "portal.png") });
  taken.portal = { width: 390, height: 844 };
  console.log("portal.png  390×844 css px");
  await phone.close();

  writeFileSync(join(OUT, "sizes.json"), JSON.stringify(taken, null, 2));
} finally {
  await browser.close();
}
