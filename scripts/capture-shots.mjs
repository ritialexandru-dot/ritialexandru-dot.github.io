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
 * SHOTS_SET=home takes the home page's screens, SHOTS_SET=more the other
 * pages' (which also starts a migration called "Off LeadDyno" in the demo
 * account and reads a six-line partner file into it), and the default both.
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
const PORTAL_EMAIL = process.env.PORTAL_EMAIL ?? "dana@creators.test";
/** Which captures to take: `home` (the home page's), `more` (the other pages'), or `all`. */
const SET = process.env.SHOTS_SET ?? "all";
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

/**
 * Scrolls so an element sits near the top of the viewport. A clip is cut
 * from what the viewport shows, so a card scrolled merely into view, which
 * Chromium centres, loses everything below the viewport's bottom edge: the
 * Pending table came back three and a half rows tall that way.
 */
async function nearTop(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const box = await locator.boundingBox();
  if (box && box.y > 48) {
    await page.evaluate((by) => window.scrollBy(0, by), box.y - 48);
  }
  // Long enough for a list that fills in after the page has settled to
  // land, so the clip is cut where the card was measured: one coupon-codes
  // capture caught the page's top bar instead when the table arrived late.
  await page.waitForTimeout(700);
}

/** The card a heading sits in: its nearest rounded ancestor. */
function cardOf(locator) {
  return locator.locator("xpath=ancestor::*[contains(@class,'rounded')][1]");
}

/** A card's box, from its top, no taller than `maxHeight`, with a margin. */
async function cardClip(page, title, { pad = 8, maxHeight = Infinity } = {}) {
  await nearTop(page, cardOf(title));
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
  if (SET !== "more") await homeScreens();
  if (SET !== "home") await moreScreens();
  writeFileSync(join(OUT, "sizes.json"), JSON.stringify(taken, null, 2));
} finally {
  await browser.close();
}

async function homeScreens() {
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
}

/** The card around a piece of text, cut to `maxHeight` from its top. */
async function cardByText(page, pattern, options = {}) {
  // A string must match whole: a page's standfirst often repeats a card's
  // title inside a sentence, and that paragraph sits in no card.
  const title = page.locator("main").getByText(pattern, typeof pattern === "string" ? { exact: true } : {}).first();
  if ((await title.count()) === 0) {
    console.warn(`not on the page: ${pattern}`);
    return null;
  }
  return cardClip(page, title, options);
}

/** A table's header and its first `count` rows, as the ledger is cut. */
async function tableClip(page, count) {
  const rows = page.locator("main table tbody tr");
  const n = await rows.count();
  if (n === 0) return null;
  await nearTop(page, page.locator("main table thead").first());
  const header = await page.locator("main table thead").first().boundingBox();
  const last = await rows.nth(Math.min(count - 1, n - 1)).boundingBox();
  return { x: header.x - 8, y: header.y - 8, width: header.width + 16, height: last.y + last.height - header.y + 16 };
}

/** A six-line partner export, as a merchant's old platform might write one. */
function partnerExport() {
  return [
    "email,first_name,last_name,company,country",
    "mia@chen-reviews.example,Mia,Chen,Chen Reviews,US",
    "rio@marsh.example,Rio,Marsh,,GB",
    "dana@lopez-studio.example,Dana,Lopez,Lopez Studio,ES",
    "kai brennan,Kai,Brennan,,IE",
    "tomas@albert-media.example,Tomas,Albert,Albert Media,DE",
    ",,,,",
  ].join("\n") + "\n";
}

/** The screens the pages beyond home show, at 1100 like the home page's cards. */
async function moreScreens() {
  const context = await browser.newContext({
    viewport: { width: 1100, height: 1200 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await signIn(context);
  const take = async (name, box) => {
    if (box) await clip(page, name, box);
  };

  // The overview, the first screen a merchant sees.
  await open(page, "/dashboard/overview");
  await take("overview", { x: 240, y: 72, width: 844, height: 640 });

  // Activation: how far partners get, and who never started.
  await open(page, "/dashboard/activation");
  await take("activation", await cardByText(page, "How far partners get"));
  await take("activation-stalled", await cardByText(page, "Never sent a click", { maxHeight: 420 }));

  // Intelligence: a review finding, the detectors' own record, two
  // opportunities and a risk, each the card the tab draws.
  await open(page, "/dashboard/intelligence");
  await page.getByRole("button", { name: "Reviews", exact: true }).first().click();
  await page.waitForTimeout(1200);
  await take("review-finding", await cardByText(page, /sent \d+ clicks and \d+ sales/));
  await page.getByRole("button", { name: "Opportunities", exact: true }).first().click();
  await page.waitForTimeout(1200);
  await take("opportunity-job", await cardByText(page, /would make a strong/));
  await take("opportunity-growing", await cardByText(page, /is growing fast/));
  await page.getByRole("button", { name: "Risks", exact: true }).first().click();
  await page.waitForTimeout(1200);
  await take("risk-finding", await cardByText(page, /costs more than the work returns/));

  // A programme's page: its plans, how it decides, recruiting, the signup page.
  const programs = await page.evaluate(async () => {
    const response = await fetch(`${location.origin}/api/v1/programs`, { credentials: "include" });
    const body = await response.json();
    return (body.data ?? []).map((row) => ({ id: row.id, name: row.name }));
  });
  const affiliate = programs.find((row) => /affiliate/i.test(row.name)) ?? programs[0];
  if (affiliate) {
    await open(page, `/dashboard/programs/${affiliate.id}`);
    await take("plans", await cardByText(page, "Commission plans", { maxHeight: 480 }));
    await take("attribution-rules", await cardByText(page, "How this program decides", { maxHeight: 456 }));
    await take("recruiting", await cardByText(page, "Partners who bring in partners", { maxHeight: 236 }));
    await take("signup-page", await cardByText(page, "Public signup page", { maxHeight: 208 }));
  }

  // Tracking: the coupon codes beside the links.
  await open(page, "/dashboard/tracking");
  await take("coupon-codes", await cardByText(page, "Coupon codes", { maxHeight: 420 }));

  // Commissions waiting for a decision.
  await open(page, "/dashboard/commissions");
  await page.locator("main select").first().selectOption({ label: "Pending" });
  await page.waitForTimeout(900);
  await take("pending", await tableClip(page, 5));

  // Payouts: the files a merchant pays from.
  await open(page, "/dashboard/payouts");
  await take("payout-files", await cardByText(page, "Files for PayPal and Wise", { maxHeight: 420 }));

  // The pipeline: the open figure and the first three deals.
  await open(page, "/dashboard/opportunities");
  const openPipeline = page.locator("main").getByText("Open pipeline", { exact: true }).first();
  if ((await openPipeline.count()) > 0) {
    const top = await cardOf(openPipeline).boundingBox();
    const rows = page.locator("main table tbody tr");
    const third = await rows.nth(Math.min(2, (await rows.count()) - 1)).boundingBox();
    if (top && third) {
      await take("pipeline", { x: top.x - 8, y: top.y - 8, width: top.width + 16, height: third.y + third.height - top.y + 16 });
    }
  }

  // Migration: the start, the switch, and a file read back.
  await open(page, "/dashboard/migrations");
  await take("migration-start", await cardByText(page, "Start a migration"));
  const switching = page.locator("main").getByText("Switching over", { exact: true }).first();
  const lastCheck = page.locator("main").getByText("Events are arriving from your own backend.").first();
  if ((await switching.count()) > 0 && (await lastCheck.count()) > 0) {
    await nearTop(page, cardOf(switching));
    const top = await cardOf(switching).boundingBox();
    const end = await lastCheck.boundingBox();
    await take("migration-switch", { x: top.x - 8, y: top.y - 8, width: top.width + 16, height: end.y + end.height + 20 - top.y + 8 });
  }
  let project = page.getByRole("link", { name: "Off LeadDyno" }).first();
  if ((await project.count()) === 0) {
    await page.fill("input[name=name]", "Off LeadDyno");
    await page.getByRole("button", { name: "Start", exact: true }).click();
    await page.waitForTimeout(1500);
    await open(page, "/dashboard/migrations");
    project = page.getByRole("link", { name: "Off LeadDyno" }).first();
  }
  if ((await project.count()) > 0) {
    await project.click();
    await page.waitForURL(/\/dashboard\/migrations\/[0-9a-z]{26}$/, { timeout: 30_000 });
    await page.waitForTimeout(800);
    if ((await page.getByText("What we found").count()) === 0 && (await page.locator("input[name=file]").count()) > 0) {
      await page.selectOption("select[name=entity_type]", "partner");
      await page.locator("input[name=file]").setInputFiles({
        name: "partners.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(partnerExport(), "utf8"),
      });
      await page.getByRole("button", { name: "Read it" }).click();
    }
    for (let attempt = 0; attempt < 30; attempt += 1) {
      if ((await page.getByText("What we found").count()) > 0) break;
      await page.waitForTimeout(2000);
      await page.reload({ waitUntil: "networkidle" });
    }
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(OUT, "raw-migration-project.png"), fullPage: true });
    await take("migration-found", await cardByText(page, "What we found"));
    await take("migration-columns", await cardByText(page, "What your partner columns mean", { maxHeight: 400 }));
    await take("migration-adds-up", await cardByText(page, "Does it add up"));
  }

  // Integrations: where a merchant sells, the tracker, the server, the panel.
  await open(page, "/dashboard/integrations");
  await take("integrations", await cardByText(page, "Where do you sell?", { maxHeight: 560 }));
  await take("tracker-snippet", await cardByText(page, "Website tracking", { maxHeight: 420 }));
  await take("server-events", await cardByText(page, "Server events", { maxHeight: 420 }));
  await take("referral-panel", await cardByText(page, "Refer-a-friend panel", { maxHeight: 420 }));
  await context.close();

  // The public guides, signed out.
  const anyone = await browser.newContext({
    viewport: { width: 1100, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const guides = await anyone.newPage();
  await guides.goto(`${WEB}/docs/guides`, { waitUntil: "networkidle" });
  await guides.waitForTimeout(800);
  const h1 = await guides.locator("h1").first().boundingBox();
  const first = await cardOf(guides.getByText("Stripe Payment Links", { exact: true }).first()).boundingBox();
  if (h1 && first) {
    await clip(guides, "guides", { x: first.x - 16, y: h1.y - 24, width: first.width + 32, height: 640 });
  }
  await anyone.close();
}
