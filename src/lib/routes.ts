/**
 * Only the pages that exist. The site map in the prompt (§6) names ten more;
 * each is added here the day it is built, so a crawler is never sent to a
 * route that answers 404.
 */
export const ROUTES: Array<{ path: string; changeFrequency: "weekly" | "monthly" }> = [
  { path: "/", changeFrequency: "weekly" },
];
