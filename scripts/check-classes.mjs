/**
 * Two rules the design system needs held in source, since a class that
 * emits nothing looks fine in the browser:
 *
 * - type sizes come from the named scale in src/styles/global.css, never a
 *   pixel or rem literal (a px literal ignores the reader's own font-size
 *   setting, WCAG 1.4.4);
 * - colours come from the semantic tokens, never Tailwind's palette or a hex
 *   literal in a class. The palette is removed in global.css, so
 *   `text-gray-500` would emit nothing and look like a missing colour.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "src");

const RULES = [
  {
    pattern: /\btext-\[[0-9.]+(px|rem|em)\]/g,
    message: "an arbitrary type size; use a role from the scale (text-display-xl … text-label)",
  },
  {
    pattern:
      /\b(bg|text|border|from|to|via|ring|fill|stroke|outline|decoration)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(-[0-9]{2,3})?\b/g,
    message: "a palette colour; use a semantic token (bg-canvas, text-ink, border-border, …)",
  },
  {
    pattern: /\b(bg|text|border|ring|outline)-\[#[0-9a-fA-F]{3,8}\]/g,
    message: "a hex literal in a class; add a token to src/styles/global.css",
  },
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (/\.(astro|ts|tsx|mdx?)$/.test(name)) files.push(path);
  }
  return files;
}

let problems = 0;

for (const file of walk(ROOT)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    for (const rule of RULES) {
      const hit = line.match(rule.pattern);
      if (hit) {
        console.error(`${file}:${index + 1}: ${hit[0]} is ${rule.message}`);
        problems += 1;
      }
    }
  });
}

if (problems > 0) {
  console.error(`\n${problems} class problem${problems === 1 ? "" : "s"}.`);
  process.exit(1);
}

console.log("Classes: every size is from the scale and every colour is a token.");
