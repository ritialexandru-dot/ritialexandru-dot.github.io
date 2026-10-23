/**
 * The built pages, read against the Content-Security-Policy the server sends
 * with them (the product repository's docs/operations/nginx/refficks-sites.conf):
 *
 *   script-src 'self' https://static.cloudflareinsights.com
 *   style-src 'self'; img-src 'self'; font-src 'self'
 *
 * So a page may carry no script, style or event handler written into it, and
 * may load a script only from this site or Cloudflare's analytics beacon.
 * Anything else would be refused by the browser without a word on the page:
 * the menus would stop opening, or the analytics would count nothing. This
 * reads dist/, so it runs after `npm run build`.
 *
 * Plausible, the analytics fallback, loads from plausible.io, which the
 * policy does not allow. Switching it on means adding plausible.io to the
 * server's script-src and connect-src first, and to SCRIPT_HOSTS here.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = join(process.cwd(), "dist");
const SCRIPT_HOSTS = ["static.cloudflareinsights.com"];

function pages(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) pages(path, files);
    else if (name.endsWith(".html")) files.push(path);
  }
  return files;
}

let found;
try {
  found = pages(DIST);
} catch {
  console.error("No dist/ to read: run `npm run build` first.");
  process.exit(1);
}
if (found.length === 0) {
  console.error("dist/ has no pages: run `npm run build` first.");
  process.exit(1);
}

const problems = [];

for (const file of found) {
  const html = readFileSync(file, "utf8");
  const page = relative(DIST, file);

  for (const [, attributes, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const src = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
    if (src === undefined) {
      // Structured data is data, never run, and the policy has no say over it.
      if (/type\s*=\s*["']application\/ld\+json["']/i.test(attributes)) continue;
      problems.push(`${page}: a script written into the page (${body.trim().slice(0, 60)}…)`);
      continue;
    }
    if (/^https?:\/\//i.test(src) || src.startsWith("//")) {
      const host = new URL(src, "https://refficks.com").host;
      if (!SCRIPT_HOSTS.includes(host)) problems.push(`${page}: a script from ${host}`);
    }
  }

  if (/<style\b/i.test(html)) problems.push(`${page}: a <style> written into the page`);
  if (/\sstyle\s*=\s*["']/i.test(html)) problems.push(`${page}: a style="" attribute`);
  for (const [handler] of html.matchAll(/\son[a-z]+\s*=\s*["']/gi)) {
    problems.push(`${page}: an event handler attribute (${handler.trim()})`);
  }
  if (/href\s*=\s*["']\s*javascript:/i.test(html)) problems.push(`${page}: a javascript: link`);
  for (const [, href] of html.matchAll(/<link\b[^>]*rel\s*=\s*["']stylesheet["'][^>]*href\s*=\s*["']([^"']+)["']/gi)) {
    if (/^https?:\/\//i.test(href) || href.startsWith("//")) problems.push(`${page}: a stylesheet from ${href}`);
  }
}

if (problems.length > 0) {
  console.error(`The server's Content-Security-Policy would refuse ${problems.length} thing(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`${found.length} pages hold to the server's Content-Security-Policy.`);
