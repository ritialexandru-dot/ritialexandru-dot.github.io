import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

/**
 * A static site, built to files and served at the apex by the nginx on
 * Refficks's own server, beside the blog at /blog/ (website prompt §9; the
 * product repository's docs/operations/nginx). Astro writes plain HTML with
 * no runtime, so the page ships the two small scripts the menus need and
 * nothing else. Every route is written as `route/index.html`, and the
 * addresses carry a trailing slash to match.
 *
 * `assetsInlineLimit: 0` keeps those scripts in files of their own. Vite
 * would otherwise write a script this small into each page, and the server's
 * Content-Security-Policy allows only the site's own files (and Cloudflare's
 * analytics beacon), so an inline script would simply not run and the menus
 * would stop opening. `npm run check:policy` reads the built pages for it.
 */
export default defineConfig({
  site: "https://refficks.com",
  trailingSlash: "always",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
