# Claims

Every factual claim the site makes, with the fact-sheet ID it rests on
(website prompt §1 and §4). A claim with no ID is not made. `npm run
check:claims` fails when a page has no section here, when a cited ID is not
on the fact sheet, or when a row is left without one.

The fact sheet describes the code on `main`. Before publishing, every screen a
page shows or quotes must answer on app.refficks.com on the day (§1's time
rule); the screens each page shows are listed with its section.

## Page: `/`

Copy: draft 2 of 9 October 2026, written from the fact sheet after the
owner's note that draft 1 read as clunky and too technical, and shaped like
the category's own sites: short headings, one sentence, three checks, a real
screen beside each.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `needs-you` | Dashboard › Intelligence, Needs you tab, at 1440 | 9 Oct 2026, from `refficks:demo`, light theme |
| `needs-you-card` | The first recommendation on the same list, at 1100 | 9 Oct 2026 |
| `confirm-raise` | A raise pressed once: the confirmation and its cost | 9 Oct 2026 |
| `tracking` | Dashboard › Programme › Tracking, the links table | 9 Oct 2026 |
| `attribution`, `attribution-touches` | A conversion's "The decision" and "Every touch considered" cards | 9 Oct 2026 |
| `ledger` | Dashboard › Money › Commissions, filtered to Reversed | 9 Oct 2026 |
| `payouts` | Dashboard › Money › Payouts, the Ready to pay card | 9 Oct 2026 |
| `portal` | The partner portal's overview on a 390px phone, as a demo affiliate | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| For affiliate, referral, creator, ambassador and B2B programmes | Hero eyebrow | L3 |
| Tracking, attribution, commissions and payouts in one place | Hero | T1, A1, C1, P1 |
| Every morning, the partners who need you, with the evidence, and the decision left to you | Hero, final band | I4, I2, I5 |
| 30 days free; no card needed; your data, out any time | Hero, header, final band | O3, D6 |
| The Needs you list is ranked by what it costs you to ignore, with evidence on every line | Hero caption | I4 |
| Works with Stripe, Shopify, WooCommerce, BigCommerce, Chargebee, Recurly, RevenueCat, Kajabi, Thinkific, Teachable, ThriveCart, SamCart, Gumroad, ClickFunnels, and the API; most built from documentation and being tested on live accounts | Works with | L2, L8 |
| Stores: codes become real discounts; a code alone credits; refunds reverse by themselves | Built for how you sell | T7, T1, C3 |
| SaaS: recurring commission; refund or cancellation reverses beside the original; deals link back to the partner | Built for how you sell | C1, C3, B1 |
| Creators: a guide per platform, paste an address and a snippet; a partner's code credits them; partners see what they earned | Built for how you sell | T9, T1, PO1 |
| Every partner scored overnight; recommendations raised: activate, contact, consider a raise | Partner intelligence | I1, I4 |
| Ranked by what it costs to ignore; every recommendation shows its evidence | Partner intelligence | I4, I2 |
| A raise needs a yes on the exact number and shows its cost | Partner intelligence | I5 |
| "Not now" holds for 30 days, then returns if still true | Partner intelligence | I7 |
| Four kinds of wasted partner, found nightly, each with its reasoning | Find the partners you're wasting | I4, I3, AN4, I5 |
| The activation nudge is the one thing Autopilot may send on its own | Find the partners, first card | I9 |
| The median days other partners took to a first sale | Find the partners, second card | AN4 |
| When a partner went dormant and what they used to send | Find the partners, third card | I3, I4 |
| The suggested raise and its cost at the current run rate | Find the partners, fourth card | I5 |
| Nothing changes what anybody earns until confirmed; no automation, timer or AI can act on it | Find the partners, closing | I5, M3, AI3, P3 |
| Links and coupon codes; a code credits without a click; one script tag; no-code installs; Stripe with no JavaScript | Tracking | T1, T2, T6, A5 |
| Last-touch or first-touch; every touch stored with which won, which lost and why; a confidence score | Attribution | A1, A2 |
| A sale nobody earned is recorded, not dropped; corrections supersede, never overwrite | Attribution | A3, A4 |
| Percentage or flat, once or recurring; every entry stores its arithmetic, "20% of USD 299.00" | Commissions | C1, C2 |
| A refund writes a reversal beside the original | Commissions | C3 |
| Yen stay yen; every total is per currency | Commissions | C4 |
| Preview shows who is owed, who cannot be paid and why, before anything is committed | Payouts | P1 |
| A file to pay from, or PayPal from the merchant's own balance; one press per decision, never twice | Payouts | P2, P3 |
| Payout details encrypted and never shown to anyone | Payouts | P4 |
| One sign-in across merchants, built for a phone; clicks, sales, payouts, statements; the same arithmetic | Partner portal | PO1, C5 |
| On the merchant's own domain, in their logo and colours | Partner portal | PO6 |
| History is never edited: commissions, attributions and raw events; a correction is a new line | Built to be trusted with money | C3, A4, D3 |
| Money moves only when a person presses: payout, store credit, gift certificate, one press each, no timer | Built to be trusted with money | P3 |
| Automations can email, tag, move a partner along or ask you; never approve, pay or reverse | Built to be trusted with money | M3 |
| The AI explains and drafts; cannot approve, pay or suspend; never sees bank details | Built to be trusted with money | AI2, AI3, AI4 |
| Connect Stripe, Shopify, WooCommerce or BigCommerce, or one script tag | Three steps | A5, T6, T2 |
| A percentage or a flat amount, once or on every renewal | Three steps | C1 |
| Partners get links, codes and a portal; a sale arrives with its reasoning | Three steps | T1, PO1, A2 |
| Hosted in the EU, in Romania; nothing to install beyond a script tag or a store app | Your data stays yours | O2, D1 |
| Whole account as CSV in one archive; every download recorded | Your data stays yours | D6 |
| No raw IP; salted hashes; Global Privacy Control writes nothing | Your data stays yours | T4 |
| Tenant isolation is a tested property | Your data stays yours | D2 |
| Roles, two-factor with recovery codes, single sign-on | Your data stays yours | D9 |
| Partners and customers can be erased; closed accounts deleted after 90 days | Your data stays yours | D7 |
| Reads an export or an account and shows what is in it before anything is imported; nothing happens until you say so | Migration strip | G1, G2 |
| One script tag; an idempotent POST; the second send answers 200 with status duplicate; idempotency is a unique index | Developer | T2, T5 |
| OpenAPI 3.1; a Server API with no endpoint that approves or pays; signed webhooks; an MCP server for Claude and ChatGPT | Developer | D4, D10, M7, D11 |
| 30 days free, everything included, no card until you subscribe, one trial per email | FAQ | O3 |
| Hosted in the EU, in Romania; CSV export, every download recorded | FAQ | O2, D6 |
| The AI provably never sees bank details; no connected app hands them over | FAQ | AI4 |
| An automation can email, tag, move a partner along or raise something; it cannot touch money | FAQ | M3 |
| A file for PayPal, Wise or the bank, or PayPal from own balance; each needs a person's press, once | FAQ | P2, P3 |
| Paid history labelled as the old platform's, never payable; owed amounts as an opening balance pending approval | FAQ | G5 |
| Early product; beyond Stripe, Shopify, WooCommerce and Zapier, integrations have not met the real provider and say so; Paddle is not built | FAQ | L1, L8, L2 |
| Support address and the legal sender | Footer | O1 |
| No cookies on this site | Footer | no fact needed: a property of this site, not the product (§9, analytics) |

### Not on the page, by rule

- No price and no pricing link until billing is live (O4, O5; §6 Pricing).
- No privacy or terms link until counsel approves the texts (§6 Legal pages).
- No testimonial, logo, count or certification (§5; L5, L7).
