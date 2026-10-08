import type { APIRoute } from "astro";
import { ROUTES } from "@/lib/routes";
import { SITE } from "@/lib/site";

/** Written at build time, from the list of routes that exist. */
export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(
    (route) =>
      `  <url>\n    <loc>${SITE.url}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changeFrequency}</changefreq>\n  </url>`,
  ).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
