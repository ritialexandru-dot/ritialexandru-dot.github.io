import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

/**
 * A static site, built to files and served from GitHub Pages at the apex
 * (website prompt §9). Astro writes plain HTML with no runtime, so the page
 * ships the two small scripts the menus need and nothing else. Every route is
 * written as `route/index.html`, which is how Pages serves directories, and
 * the addresses carry a trailing slash to match.
 */
export default defineConfig({
  site: "https://refficks.com",
  trailingSlash: "always",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
