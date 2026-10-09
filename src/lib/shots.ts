/**
 * The product screenshots the site shows, captured from the running product
 * by `scripts/capture-shots.mjs` and packed by `scripts/pack-shots.mjs`
 * (prompt §8: real screens, light theme, cropped rather than shrunk).
 * Captured 9 October 2026 from the demo account.
 *
 * Each carries its CSS size so the page does not move when it arrives, and
 * alt text that says what the screen shows rather than "product screenshot".
 * Re-run the capture, and check these against what app.refficks.com serves,
 * before a release (§1's time rule).
 */
export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

function shot(name: string, width: number, height: number, alt: string): Shot {
  return { src: `/shots/${name}.webp`, width, height, alt };
}

export const SHOTS = {
  needsYou: shot(
    "needs-you",
    1176,
    600,
    "Intelligence screen, Needs you tab: today's count of opportunities, risks and items waiting, then the first recommendation, Send Ana Petrova their link, with its evidence, Approved 39 days ago and has not sent a single click, the figures behind it, and Do it and Not now buttons.",
  ),
  needsYouCard: shot(
    "needs-you-card",
    828,
    239,
    "One recommendation from the Needs you list: Send Ana Petrova their link, with the evidence sentence, the figures days since approval 39, clicks all time 0 and threshold days 14, the suggested step, and Do it and Not now buttons.",
  ),
  confirmRaise: shot(
    "confirm-raise",
    828,
    239,
    "A recommendation to raise Priya Sundaram from 20% to 25%, the revenue figures behind it, the confirm button Yes, change what they earn, the sentence Costs about $570.58 more per period at their current rate, and Not now.",
  ),
  scoreBreakdown: shot(
    "score-breakdown",
    566,
    678,
    "A partner's Why this score card: seven scores side by side, and under Performance each factor with its points out of the weight, a bar, and a sentence of evidence.",
  ),
  tracking: shot(
    "tracking",
    828,
    416,
    "The Tracking links table: each link's path, its partner, the destination, clicks and a 30-day window, with a Copy link button on every row.",
  ),
  attribution: shot(
    "attribution",
    828,
    175,
    "The decision card on a conversion, marked 95% confidence: the only touch within the attribution window was a tracking link, method Last Touch, source Tracking link, window applied 30 days.",
  ),
  attributionTouches: shot(
    "attribution-touches",
    828,
    207,
    "The Every touch considered card: a link click marked Selected and Eligible, arrived through a tracking link, within the attribution window, with the claim's expiry date.",
  ),
  ledger: shot(
    "ledger",
    826,
    438,
    "The commission ledger filtered to reversals: a row reading Reversed because the sale was refunded, minus $99.83, beside the original entry 20% of USD 499.17, $99.83, each with a Why? link.",
  ),
  payouts: shot(
    "payouts",
    828,
    536,
    "The Ready to pay card on the Payouts screen: the amount to be paid, the number of partners, the minimum, then partners listed with who cannot be paid and why, such as No payout details on file.",
  ),
  portal: shot(
    "portal",
    390,
    844,
    "The partner portal on a phone: Hello, Dana Lopez, your partnership with Northwind Software, a notice from the merchant, and the partner's clicks, sales, conversion rate and earnings for the last 30 days.",
  ),
  portalLinks: shot(
    "portal-links",
    390,
    844,
    "The partner portal's Your links page on a phone: three tracking links with their click counts, Copy and QR code buttons, and a form to make a link to any page.",
  ),
} as const;
