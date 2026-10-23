/**
 * The claims file is the site's audit trail (website prompt §1): every page
 * has a section in claims.md, and every fact ID it cites is one the fact
 * sheet defines. The check cannot read a sentence's truth; it makes sure a
 * page cannot ship without its claims being written down against the sheet.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const CLAIMS = join(ROOT, "claims.md");

if (!existsSync(CLAIMS)) {
  console.error("claims.md is missing.");
  process.exit(1);
}

const claims = readFileSync(CLAIMS, "utf8");

/** Every ID the fact sheet (website prompt §4) defines, by group. */
const FACT_IDS = new Set([
  ...range("T", 9),
  ...range("A", 7),
  ...range("C", 6),
  ...range("P", 5),
  ...range("PO", 7),
  ...range("M", 7),
  ...range("AN", 6),
  ...range("I", 9),
  ...range("AI", 7),
  "R1",
  "CR1",
  "AM1",
  "B1",
  ...range("D", 11),
  ...range("O", 5),
  ...range("G", 7),
  ...range("L", 10),
]);

function range(prefix, count) {
  return Array.from({ length: count }, (_, index) => `${prefix}${index + 1}`);
}

function pages(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) pages(path, found);
    else if (/\.astro$/.test(name) && !name.startsWith("404")) found.push(path);
  }
  return found;
}

let problems = 0;

// 1. Every page has a section, named by its route.
for (const page of pages(join(ROOT, "src", "pages"))) {
  const route =
    "/" +
    relative(join(ROOT, "src", "pages"), page)
      .replace(/index\.astro$/, "").replace(/\.astro$/, "/")
      .replace(/\\/g, "/")
      .replace(/\/$/, "");
  const heading = new RegExp(`^## Page: \`${route === "/" ? "/" : route + "/"}\``, "m");
  if (!heading.test(claims)) {
    console.error(`claims.md has no section for the page at ${route || "/"}`);
    problems += 1;
  }
}

// 2. Every fact ID cited exists.
const cited = new Set(claims.match(/\b(?:T|A|C|P|PO|M|AN|I|AI|D|O|G|L|R|CR|AM|B)\d{1,2}\b/g) ?? []);
for (const id of cited) {
  if (!FACT_IDS.has(id)) {
    console.error(`claims.md cites ${id}, which the fact sheet does not define`);
    problems += 1;
  }
}

// 3. No claim row is left without an ID. Only the tables headed "Claim" are
//    claims; a page's table of screens is a record, not a claim.
let inClaims = false;
for (const line of claims.split("\n")) {
  if (/^\| Claim \|/.test(line)) {
    inClaims = true;
    continue;
  }
  if (!/^\|/.test(line)) {
    inClaims = false;
    continue;
  }
  if (!inClaims || /^\|\s*-+/.test(line)) continue;

  const cells = line.split("|").map((cell) => cell.trim());
  const ids = cells[cells.length - 2] ?? "";
  if (!/\b[A-Z]{1,2}\d{1,2}\b/.test(ids) && !/no fact needed/i.test(ids)) {
    console.error(`claims.md row without a fact ID: ${line.slice(0, 80)}…`);
    problems += 1;
  }
}

if (problems > 0) {
  console.error(`\n${problems} claims problem${problems === 1 ? "" : "s"}.`);
  process.exit(1);
}

console.log(`Claims: every page has a section and every cited ID (${cited.size}) is on the fact sheet.`);
