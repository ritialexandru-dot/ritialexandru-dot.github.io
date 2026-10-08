/**
 * The voice rules the site must not break (website prompt §3 and §5), read
 * off the source rather than remembered: the banned words, exclamation marks
 * in copy, and the claims the honest limits forbid (self-hosting, open
 * source, certifications, "tested", "certified", "listed", "partnered").
 *
 * It scans the strings in src/ (TSX text, string literals and the copy
 * tables), so a sentence is checked where it is written. A word that is
 * genuinely part of a product quote or a provider's name can be allowed by
 * writing "voice: allow" in a comment on the line before it.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "src");

const BANNED_WORDS = [
  "revolutionary",
  "supercharge",
  "unleash",
  "seamless",
  "blazing",
  "innovative",
  "cutting-edge",
  "AI-powered",
  "self-host",
  "open source",
  "open-source",
  "SOC 2",
  "ISO 27001",
  "certified",
  "partnered",
  "trusted by",
];

/** Words the limits (L8, L9) allow only in a sentence that says the opposite; flagged for a look. */
const WATCH_WORDS = ["tested on", "tested with", "listed in", "listed on"];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (/\.(astro|tsx|ts|mdx?)$/.test(name)) files.push(path);
  }
  return files;
}

let problems = 0;

for (const file of walk(ROOT)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    const previous = lines[index - 1] ?? "";
    if (/voice: allow/.test(previous) || /voice: allow/.test(line)) return;
    // Code and comments are not copy: skip import lines and comment-only lines.
    if (/^\s*(import|\/\/|\/\*|\*)/.test(line)) return;

    for (const word of BANNED_WORDS) {
      if (line.toLowerCase().includes(word.toLowerCase())) {
        console.error(`${file}:${index + 1}: banned word "${word}"`);
        problems += 1;
      }
    }
    for (const word of WATCH_WORDS) {
      if (line.toLowerCase().includes(word)) {
        console.error(
          `${file}:${index + 1}: "${word}" — the limits allow "works with", never tested or listed (L8, L9)`,
        );
        problems += 1;
      }
    }
    // An exclamation mark inside quoted text or JSX text. `!==` and `!x` are code.
    if (/[A-Za-z0-9.,)]!(?![=])/.test(line) && !/!\(/.test(line)) {
      console.error(`${file}:${index + 1}: exclamation mark in copy`);
      problems += 1;
    }
  });
}

if (problems > 0) {
  console.error(`\n${problems} voice problem${problems === 1 ? "" : "s"}.`);
  process.exit(1);
}

console.log("Voice: no banned words, no exclamation marks, no forbidden claims.");
