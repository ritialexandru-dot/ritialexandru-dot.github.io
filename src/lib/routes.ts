/**
 * Only the pages that exist. The site map in the prompt (§6) also names
 * pricing, privacy and terms; each is added here the day it is built, so a
 * crawler is never sent to a route that answers 404.
 */
export const ROUTES: Array<{ path: string; changeFrequency: "weekly" | "monthly" }> = [
  { path: "/", changeFrequency: "weekly" },
  { path: "/stores/", changeFrequency: "monthly" },
  { path: "/saas/", changeFrequency: "monthly" },
  { path: "/creators/", changeFrequency: "monthly" },
  { path: "/product/tracking/", changeFrequency: "monthly" },
  { path: "/product/commissions/", changeFrequency: "monthly" },
  { path: "/product/intelligence/", changeFrequency: "monthly" },
  { path: "/product/portal/", changeFrequency: "monthly" },
  { path: "/developers/", changeFrequency: "monthly" },
  { path: "/migrate/", changeFrequency: "monthly" },
  { path: "/faq/", changeFrequency: "monthly" },
];
