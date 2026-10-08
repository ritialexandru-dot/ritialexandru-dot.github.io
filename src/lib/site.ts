/**
 * Every address the site sends people to, written down once.
 *
 * `app.` is the product and `go.` is the API and the tracker; the site itself
 * lives at the apex (website prompt §9). The three product links are the same
 * words and the same destination on every page, by rule (§7).
 */
export const SITE = {
  name: "Refficks",
  url: "https://refficks.com",
  description:
    "Tracking, attribution, commissions and payouts for affiliate, referral, creator, ambassador and B2B partner programmes. Every morning it names the partners you're wasting, shows its evidence, and leaves the decision to you.",
  supportEmail: "support@refficks.com",
  legalName: "Refficks SRL, Romania",
} as const;

export const APP = {
  signIn: "https://app.refficks.com/login",
  partnerSignIn: "https://app.refficks.com/portal/login",
  register: "https://app.refficks.com/register",
  guides: "https://app.refficks.com/docs/guides",
  // The OpenAPI document has no public address yet; the developers page carries
  // the reference until it does.
  apiReference: "/developers/",
} as const;

/** The primary call to action: the same words everywhere (O3). */
export const CTA = {
  label: "Start free",
  under: "No card needed",
  reassurance: "30 days free. Your data, out any time.",
} as const;

export type NavLink = { href: string; label: string; description?: string };

/** The four product pages, in the order the Product menu lists them. */
export const PRODUCT_PAGES: NavLink[] = [
  {
    href: "/product/tracking/",
    label: "Tracking and attribution",
    description: "Links, codes, one script tag, and every decision stored with its reasoning.",
  },
  {
    href: "/product/commissions/",
    label: "Commissions and payouts",
    description: "Every entry stores its arithmetic. Money moves only when a person presses.",
  },
  {
    href: "/product/intelligence/",
    label: "Partner intelligence",
    description: "Every morning, the partners who need you, ranked, with the evidence.",
  },
  {
    href: "/product/portal/",
    label: "Partner portal and communications",
    description: "One sign-in for every programme a partner works with, built for a phone.",
  },
];

export const PRIMARY_NAV: NavLink[] = [
  { href: "/developers/", label: "Developers" },
  { href: "/migrate/", label: "Migrate" },
  { href: "/faq/", label: "FAQ" },
];

/** The three audience pages (prompt §2). */
export const AUDIENCE_PAGES: NavLink[] = [
  { href: "/stores/", label: "For stores" },
  { href: "/saas/", label: "For SaaS" },
  { href: "/creators/", label: "For creators" },
];
