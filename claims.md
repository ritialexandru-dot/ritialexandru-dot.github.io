# Claims

Every factual claim the site makes, with the fact-sheet ID it rests on
(website prompt §1 and §4). A claim with no ID is not made. `npm run
check:claims` fails when a page has no section here, when a cited ID is not
on the fact sheet, or when a row is left without one.

The fact sheet describes the code on `main`. Before publishing, every screen a
page shows or quotes must answer on app.refficks.com on the day (§1's time
rule); the screens each page shows are listed with its section.

## Page: `/`

Copy: `refficks-homepage-copy.md`, draft 1 of 8 October 2026.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `needs-you` | Dashboard › Intelligence, Needs you tab | 8 Oct 2026, from `refficks:demo`, light theme, 1440 wide |
| `needs-you-card` | The first recommendation on the same list, at 1100 wide | 8 Oct 2026 |
| `activation-funnel` | Dashboard › Analysis › Activation | 8 Oct 2026 |
| `score-breakdown` | A partner's profile, the "Why this score" card | 8 Oct 2026 |
| `confirm-raise` | Needs you, a raise pressed once (confirmation and cost) | 8 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| Tracking, attribution, commissions and payouts for affiliate, referral, creator, ambassador and B2B programmes | Hero subhead | L3, T1, A1, C1, P1 |
| Every morning it names the partners you're wasting, shows its evidence, leaves the decision to you | Hero subhead, final band | I4, I2, I5 |
| 30 days free; no card needed; your data, out any time | Hero, header, final band | O3, D6 |
| "Ranked by what it costs you to ignore. Every one shows its evidence." | Hero caption | I4 (verbatim, the Needs you tab) |
| The reason in one sentence with its figures; ordered by cost to ignore; "Not now" holds 30 days | Hero callouts | I2, I4, I7 |
| Most software watches click, conversion, commission; the leak is earlier | The leak | AN4, I3, I4 |
| The eight-stage journey, modelled and watched | The leak, diagram | I3, AN4 |
| Activation funnel names where partners stall, who is stuck, median days | The leak, funnel caption | AN4 |
| Stages earned from behaviour; nightly pass never moves anyone into applicant or rejected | The leak, Precisely | I3 |
| The eight product sentences and where each is shown | In its own words | L1, L7, I4, A3, C2, AN5, I6, AN6, AI5 (quoted strings verified in app source, 8 Oct) |
| Every partner scored nightly; seven factors; percentile not grade; potential not revenue; weights are configuration | A morning, step 1 | I1, I2 |
| Every recommendation carries its evidence; deterministic rules; no score for a partner with no history | A morning, step 2 | I2, I8 |
| Financial recommendations need confirmation of the number and show the run-rate cost; "Not now" 30 days; risk findings have no apply button | A morning, step 3 | I5, I7, I6 |
| Caps: never above 50%, no bonus above $1,000; Autopilot defaults, limits, no fully autonomous mode | A morning, step 3, Precisely | I5, I9 |
| Links and codes; a code credits without a click; one script tag; no-code installs; Stripe without JavaScript | The chain, Tracking | T1, T2, T6, A5 |
| Publishable key records visits and identifies customers, cannot read, refuses revenue; secret keys server-side | The chain, Tracking, Precisely | T3 |
| Last-touch or first-touch across the window; every decision stored with its reasoning; a sale nobody earned recorded as such | The chain, Attribution | A1, A2, A3 |
| 30 days, 60 for referral; corrections supersede; preview against up to 1,000 past sales | The chain, Attribution, Precisely | A1, A4, A6 |
| Percentage or flat, once or recurring; every entry stores its arithmetic; refunds reverse beside the original | The chain, Commissions | C1, C2, C3 |
| Integer minor units plus ISO currency; per-currency totals | The chain, Commissions, Precisely | C4 |
| Payout preview shows who is owed and who cannot be paid and why; a file or PayPal from own balance; one press per decision | The chain, Payouts | P1, P2, P3 |
| Payout details encrypted, never shown; each disclosure recorded | The chain, Payouts, Precisely | P4 |
| One sign-in across merchants, built for phones, same arithmetic | The chain, Portal | PO1 |
| Own domain with automatic HTTPS, logo, colours, wording | The chain, Portal, Precisely | PO6 |
| Stores: codes become real discounts; a code alone credits; refunds reverse by themselves | Three ways in | T7, T1, C3 |
| SaaS: recurring commission; refund or cancellation reverses beside the original; deals linked when money arrives | Three ways in | C1, C3, B1 |
| Creators: a guide per platform, paste an address and a snippet; a partner's code credits them; partners see what they earned | Three ways in | T9, T1, PO1, C2 |
| Works with the named platforms plus the API; most built from documentation and being tested on live accounts | Three ways in, closing line | L2, L8 |
| Four kinds of wasted partner, each with what the screen says | Find the partners you're wasting | I4, I3, I5, AN4, I9 |
| "Approved 29 days ago and has not sent a single click." | Find the partners, first card | I4 (verified in `ActivationInsights.php`) |
| Nothing on the list changes earnings until confirmed; no automation, timer or AI can act on it | Find the partners, closing | M3, AI3, P3, I5 |
| Upload an export, any spreadsheet, or read Rewardful or FirstPromoter by key; read back before import; nothing until you say; one bad row never loses the file; re-import never duplicates | Switching | G1, G2, G3 |
| Paid history labelled as the old platform's, never payable here; what is owed as an opening balance pending approval | Switching, the honest part | G5 |
| Shadow run compares the last 28 days each morning; exactly one system pays; warns if earnings drop | Switching, shadow run | G6, G7 |
| Hosted in the EU, in Romania; nothing to install beyond a script tag or store app | Where your data lives | O2, D1 |
| Whole account as CSV in one archive; every download recorded | Where your data lives | D6 |
| No raw IP stored; salted hashes; GPC writes nothing; tracker waits for consent | Where your data lives | T4 |
| Tenant isolation is a tested property | Where your data lives | D2 |
| Append-only events, attributions, entries, audit logs; before and after values | Where your data lives | D3 |
| No merchant Stripe key held; OAuth with least scope, own key, never shown back | Where your data lives | D8 |
| Roles, two-factor with recovery codes, single sign-on | Where your data lives | D9 |
| Partners and customers can be erased; closed account deleted after 90 days; connections revoked | Where your data lives | D7 |
| One script tag; one idempotent POST; the snippet and the event shape | Developer | T2, T5 (snippet from `tracker-snippet.tsx`, event shape from `openapi.yaml`) |
| Second send answers 200 with `"status": "duplicate"`; different payload 409; idempotency is a unique index | Developer | T5 (`api.md` §5) |
| `integration_event → event → attribution → commission_entry`, append-only | Developer | D3, A2, C2 |
| OpenAPI 3.1 with 454 paths; Server API with no endpoint that approves or pays; signed webhooks; MCP server for Claude and ChatGPT; the stack | Developer | D4, D10, M7, D11, D5 |
| 30 days free, everything included, no card until you subscribe, one trial per email | Before you start | O3 |
| It is early; every screen on this page is real; what has not met a real provider says so | Before you start | L1, L8 |
| Export, erasure, deletion after 90 days | Before you start | D6, D7 |
| Support address and the legal sender | Footer | O1 |
| No cookies on this site | Footer | no fact needed: a property of this site, not the product (§9, analytics) |

### Not on the page, by rule

- No price and no pricing link until billing is live (O4, O5; §6 Pricing).
- No privacy or terms link until counsel approves the texts (§6 Legal pages).
- No testimonial, logo, count or certification (§5; L5, L7).
