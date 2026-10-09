/**
 * The product screenshots the site shows, captured from the running product
 * by `scripts/capture-shots.mjs` and packed by `scripts/pack-shots.mjs`
 * (prompt §8: real screens, light theme, cropped rather than shrunk).
 * Captured 9 October 2026 from the demo account; the home page's set at
 * 1440 and 1100, the other pages' at 1100 (SHOTS_SET=more), the portal on a
 * 390px phone.
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
  portalCommissions: shot(
    "portal-commissions",
    390,
    844,
    "The partner portal's Your commission page on a phone: every entry shows how it was worked out, then awaiting approval $555.35, approved, paid $299.50, what the partner sold themselves, and a share from a partner they brought in.",
  ),
  overview: shot(
    "overview",
    844,
    640,
    "The Overview screen: partner revenue, commission with the amount clawed back, sales and clicks for the last 30 days, each against the period before; a query waiting; and partner-attributed revenue day by day, including the quiet days.",
  ),
  activation: shot(
    "activation",
    464,
    367,
    "The Activation screen's How far partners get card: signed up 66, sent a click 28, made a sale 25, earned commission 40, how many stop at each step, and the line 38 partners have never sent a click.",
  ),
  activationStalled: shot(
    "activation-stalled",
    412,
    436,
    "The Never sent a click list: approved partners who were given a link and have done nothing, the longest-waiting first, each with their score.",
  ),
  reviewFinding: shot(
    "review-finding",
    828,
    165,
    "A review finding: Teodor Marek sent 844 clicks and 2 sales, marked One finding and Open, with the evidence, 844 clicks that converted at 0.24% against 2.18% for the rest of the programme, and what that usually means.",
  ),
  opportunityJob: shot(
    "opportunity-job",
    828,
    239,
    "An opportunity: Grace Mbeki would make a strong affiliate, marked Could do another job. Measured as creator today; under affiliate weights they would rank 91 on 4 sales. The figures, the suggested step, and Not now.",
  ),
  opportunityGrowing: shot(
    "opportunity-growing",
    828,
    239,
    "An opportunity: Ingrid Halvorsen is growing fast, marked Accelerating. Momentum 89 out of 100, revenue +204% against the previous window, the figures behind it, and the suggestion to ask what is working.",
  ),
  riskFinding: shot(
    "risk-finding",
    828,
    281,
    "A risk finding: Grace Mbeki costs more than the work returns, marked Costing more than it returns. 56.5% of what they brought in went back out to them, the figures, and Review what Grace Mbeki is paid per piece.",
  ),
  plans: shot(
    "plans",
    828,
    460,
    "A programme's Commission plans: Standard affiliate, 20% of each sale; Flat fee per sale, $40.00; Every renewal, 10% of each sale for the customer's lifetime; each with how it is approved and its priority.",
  ),
  attributionRules: shot(
    "attribution-rules",
    828,
    472,
    "A programme's How this program decides card: a touch counts for 30 days; last touch or first touch when two partners are in the window; a click beats a code, or a code beats a click, each explained in a sentence.",
  ),
  recruiting: shot(
    "recruiting",
    828,
    252,
    "The Partners who bring in partners card: paying 10% of what each recruited partner earns for 12 months, on top of the recruit's own commission, one level only.",
  ),
  couponCodes: shot(
    "coupon-codes",
    828,
    436,
    "The Coupon codes table on the Tracking screen, for customers who never click anything: each partner's code, such as GRACE-MBEKI, the partner, the provider and its status.",
  ),
  pending: shot(
    "pending",
    826,
    498,
    "The commission ledger filtered to Pending: five entries, each with the partner, how it was worked out, the amount, and Approve and Reject buttons.",
  ),
  payoutFiles: shot(
    "payout-files",
    828,
    415,
    "The Files for PayPal and Wise card: a PayPal file in USD and a Wise file, built from the approved payouts, each with a download button, and one payout in neither file, paid by bank transfer from the general file.",
  ),
  pipeline: shot(
    "pipeline",
    828,
    543,
    "The Pipeline screen: open pipeline $215,000.00 by stage, then the deals table with the partner who sourced each deal, the pipeline amount and the close date, and the note that none of it is revenue until an invoice is paid.",
  ),
  migrationStart: shot(
    "migration-start",
    828,
    304,
    "The Start a migration card: a name, Off LeadDyno, and where the programme is now, CSV or spreadsheet, with the note that it works with anything that has a header row.",
  ),
  migrationSwitch: shot(
    "migration-switch",
    828,
    489,
    "The Switching over card: Refficks pays your partners, a sale is judged by when it happened, and the Before you switch checklist: your partners are in Refficks, the import adds up, money still owed is decided, events are arriving.",
  ),
  migrationFound: shot(
    "migration-found",
    828,
    215,
    "The What we found card after a file is read: Partners 5, and of 6 rows read, 5 look fine and 1 cannot be imported. None of it is in the account yet.",
  ),
  migrationColumns: shot(
    "migration-columns",
    828,
    416,
    "The What your partner columns mean card: each column of the file, email, first_name, last_name, company, marked Guessed, with sample values and the field it becomes.",
  ),
  migrationAddsUp: shot(
    "migration-adds-up",
    828,
    719,
    "The Does it add up card: 6 in the file, 0 here; 1 could not be read, 5 not imported yet; then a line-by-line table ending with line 7, Could not be read, This row is empty.",
  ),
  integrations: shot(
    "integrations",
    828,
    576,
    "The Where do you sell? list on the Integrations screen: Stripe Payment Links, Buy Button, Pricing Table and promotion codes, SamCart, Squarespace Commerce, each with what it reports and a You sell here or Open the guide button.",
  ),
  guides: shot(
    "guides",
    704,
    640,
    "The public Where Refficks works page: Checkouts and billing, with a guide each for Stripe Payment Links, Stripe Buy Button, Stripe Pricing Table, Stripe promotion codes, SamCart and Squarespace Commerce.",
  ),
} as const;
