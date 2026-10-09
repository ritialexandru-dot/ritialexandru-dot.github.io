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

## Page: `/product/intelligence/`

Copy: 9 October 2026, from the I, AN and M facts, in the home page's shape.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `needs-you` | Dashboard › Intelligence, Needs you tab, at 1440 | 9 Oct 2026 |
| `needs-you-card`, `opportunity-growing` | A Needs you recommendation; an Opportunities card, "is growing fast" | 9 Oct 2026 |
| `confirm-raise` | A raise pressed once: the confirmation and its cost | 9 Oct 2026 |
| `score-breakdown` | A partner's "Why this score" card | 9 Oct 2026 |
| `opportunity-job` | Opportunities, "would make a strong affiliate" | 9 Oct 2026 |
| `activation` | Dashboard › Analysis › Activation, "How far partners get" | 9 Oct 2026 |
| `review-finding`, `risk-finding` | Intelligence › Reviews, "sent 844 clicks and 2 sales"; Risks, "costs more than the work returns" | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| Every partner scored overnight; the Needs you list ranks what it costs you to ignore, with evidence, and leaves the decision | Hero, final band | I1, I4, I5 |
| Activate, contact, consider a raise, review; evidence on every card; beside it Opportunities, Reviews, Quality vs risk, Risks, Results | The list | I4 |
| "Not now" holds for 30 days, then returns if still true | The list, final checks | I7 |
| A raise or a tier move needs a person's yes on the figures; the cost at the current run rate is shown; no partner above 50%, no bonus above $1,000; the cap holds where money is written | Money needs a yes | I5 |
| Seven questions: performance (a percentile), potential (not current revenue), momentum, engagement, relationship health, economic efficiency, risk; one overall number only orders a list | Scoring | I1 |
| Every factor shows weight, value, points and a sentence of evidence; weights are configuration | Scoring | I2 |
| A click onboards, a sale activates, silence makes dormant; the nightly pass never puts anyone into applicant or rejected; no automation may reject; who gets in is the merchant's call | Lifecycle | I3 |
| A partner good at a job they have not been offered is pointed out | Lifecycle | I4 (the Opportunities tab, shown) |
| The funnel names where partners stall, who is stuck, and the median days between stages | Activation | AN4 |
| The one who never started gets the one nudge Autopilot may send alone | Activation, Autopilot | I9 |
| Risk findings say "Review recommended" with evidence, never "fraud"; no apply button on a risk finding | Reviews | I6 |
| "Nothing here withholds anybody's money. A review is a look, and the decision stays with you." | Reviews, quoted | §3 (the Reviews tab's own copy), I6 |
| Autopilot is "Prepare, and ask me" by default and can be switched off; on its own it may only send the activation nudge, within 25 actions a day, 2 emails per partner a week, a 14-day cooldown and quiet hours; a pause switch; no fully autonomous mode | Autopilot | I9 |
| The Results tab: what happened in the 30 days after acting; "never proof that acting caused them" | Results | AN6 |
| No machine learning; deterministic rules; every reason readable and disputable; the answer is recorded | Close | I8, AN6 (the "Worth showing you?" record on the Results tab, shown in exploration) |

## Page: `/product/tracking/`

Copy: 9 October 2026, from the T and A facts.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `attribution`, `attribution-touches` | A conversion's "The decision" and "Every touch considered" cards | 9 Oct 2026 |
| `tracking`, `coupon-codes` | Dashboard › Programme › Tracking: the links table and the coupon codes table | 9 Oct 2026 |
| `integrations` | Dashboard › Setup › Integrations, "Where do you sell?" | 9 Oct 2026 |
| `attribution-rules` | A programme's "How this program decides" card | 9 Oct 2026 |
| `guides` | The public "Where Refficks works" page, signed out | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| Links and codes for partners; one script tag or none; a stored decision for every sale | Hero, final band | T1, T2, A5, A2 |
| Tracking links with sub-ids, deep links and QR codes | Links and codes | PO5 |
| A coupon code attributes a sale with no click at all | Links and codes | T1 |
| Codes become real discounts in Stripe, Shopify, BigCommerce and WooCommerce; pause on disconnect, return on reconnect | Links and codes | T7 |
| One script tag claims the referral first-party; Stripe through client_reference_id or a visitor id with no script; the beacon refuses revenue; secret keys server-side | On your site | T2, A5, T3 |
| The publishable key can record visits and identify customers and cannot read anything | On your site | T3 |
| No-code installs: the Shopify app, the Refficks WordPress plugin, the BigCommerce app, a Tag Manager template | On your site | T6 |
| A browser may report an order, never who earns or how much; unsigned orders wait for a person | On your site, Precisely | T3 |
| Last-touch by default or first-touch; a 30-day window unless set otherwise, 60 for referral; whether a code beats a click and whether a customer stays with the first partner are settings in words | The rules | A1 |
| A merchant's correction outranks a server's statement, which outranks a click; click and ?ref= level, the more recent wins; both outrank a coupon, which outranks an import | The rules, Precisely | A1 |
| Before changing a rule, what it would have done to up to 1,000 past sales; nothing written | The rules | A6 |
| Every attribution stored with every touch, which were eligible, which won, which lost and why, and a confidence score | Never silently | A2 |
| "Why this conversion was attributed" on screen, including sales attributed to nobody, recorded rather than dropped | Never silently | A3 |
| Corrections supersede, never overwrite | Never silently | A4 |
| A sale credited to nobody moves to a partner if the buyer is identified within 24 hours, with a reason, a History entry and "Credited later"; a person can credit one by hand with a note | Never silently | A7 |
| No raw IP; salted hashes; a store order's buyer IP replaced with its hash | Privacy | T4 |
| Global Privacy Control writes nothing, not even a cookie; consent is waited for; Do Not Track alone is not read | Privacy | T4 |
| A declined shopper is credited through a code with no visitor, buyer, IP hash, country or device recorded | Privacy | T8 |
| Fifty-two public guides, readable without an account; each says what it cannot do first; none walked live yet and each says so | Guides | T9 |
| Duplicates are structurally impossible to process twice; a retried webhook or double-submitted event resolves to the original | Developer | T5 |
| The tracker as pasted, at go.refficks.com | Developer | T2, D4 (the API host) |

## Page: `/product/commissions/`

Copy: 9 October 2026, from the C and P facts, with M3 and AI3 where money is refused.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `ledger` | Dashboard › Money › Commissions, filtered to Reversed | 9 Oct 2026 |
| `plans` | A programme's "Commission plans" card | 9 Oct 2026 |
| `pending` | Commissions filtered to Pending, with Approve and Reject | 9 Oct 2026 |
| `recruiting` | A programme's "Partners who bring in partners" card | 9 Oct 2026 |
| `payouts` | Dashboard › Money › Payouts, "Ready to pay" | 9 Oct 2026 |
| `payout-files` | Payouts, "Files for PayPal and Wise" | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| A plan says what it pays; the ledger keeps the sum behind every entry; a refund beside the sale it undoes; nothing recalculated; paying is a preview, a decision and a file | Hero, final band | C1, C2, C3, P1, P2 |
| Percentage or flat; once or every renewal for a set number of months or for as long as the customer pays; conditions and a priority; a lower rate when a code was used; limited to collections, products, variants or SKUs on Shopify and BigCommerce; a partner's own rate | Plans | C1 |
| The highest-priority plan whose conditions match wins | Plans | C1 (the screen's own line, shown) |
| "20% of USD 299.00"; a refund writes a reversal beside the original; history never edited | The ledger | C2, C3 |
| Integer minor units plus a currency; every total per currency; nothing adds euros to dollars | The ledger | C4 |
| A correction supersedes and the old entry stays | The ledger, Precisely | C3, A4, D3 |
| Approve singly or in bulk, or a plan approves after a holding period; waits for a person when a review is open, the sale was only reported by a browser or an unsigned provider, the partner is suspended or the workspace is read-only; partners see the same arithmetic | Approval | C5 |
| A recruiter earns a share on top; the recruit's own commission never reduced; for as long as the merchant chooses; two tiers at most | Recruiting | C6 |
| For a set number of months, on the recruit's first sales, or for as long as both stay; shares already earned keep their rate | Recruiting | C6 (the card's own options, shown) |
| The preview shows who is owed, who cannot be paid and why, before anything is committed | Payouts | P1 |
| A batch built in one transaction and approved by a person; each payout marked paid with a reference; a returned payment recorded | Payouts | P2 |
| A general CSV, PayPal's Payouts upload or Wise's batch template; PayPal from the merchant's own balance; the layouts not yet uploaded to a real account | Paying | P2, P3 |
| A payout in neither file is paid from the general file | Paying | P2 (the card's own line, shown) |
| No timer moves money; a PayPal payout, a store credit, a gift certificate on a named button, one press each | Refusals | P3 |
| Payout details encrypted, never shown, each disclosure recorded | Refusals | P4 |
| Automations can email, tag, move a partner along or ask; never approve, pay or reverse | Refusals | M3 |
| The AI can summarise a payout run and cannot approve, reverse or pay | Refusals | AI2, AI3 |
| W-9, W-8BEN, W-8BEN-E in the portal; a 1099-NEC year with an audited export, filed by the merchant; UK and EU self-billed invoices; DAC7 not built | Tax | P5 |

## Page: `/product/portal/`

Copy: 9 October 2026, from the PO and M facts and R1, CR1, AM1, B1.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `portal`, `portal-links`, `portal-commissions` | The partner portal's overview, Your links and Your commission pages on a 390px phone, as a demo creator-affiliate | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| One sign-in across every merchant; clicks, sales, commission, payouts, statements, links, codes and assets; built for phones | Hero, The portal, final band | PO1 |
| The same arithmetic the merchant sees | Hero, Raise a query | C5 |
| On the merchant's domain, in their logo and colours | Hero, Your domain | PO6 |
| Partners keep their own contact and payout details; the merchant sees that the record changed, not the bank details | The portal | PO2 |
| Programme email off in one click and no sign-in, or one kind at a time; emails about their own money still arrive | The portal | PO3 |
| Links with sub-ids, deep links and QR codes; a Refer page; collaborations and gifts; missions, points and rewards; leads and deals; training, messages and notices | By role | PO5 |
| A query changes no money; the merchant sees likely matching sales and answers with an outcome in words | Raise a query | PO4 |
| HTTPS issued automatically; logo, colours and wording | Your domain | PO6 |
| A public signup page partners apply through; applicants wait for review or are approved by a programme set that way | Your domain | I3 (who gets in), PO6 (the signup page) |
| An opt-in directory: only partners who published a card and said merchants may invite them | Your domain | PO7 |
| Nineteen emails on day one; any can be overridden | Communications | M1 |
| Templates substituted, never compiled | Communications | M2 |
| Every send recorded | Communications | M4 |
| Outreach from the merchant's own address, stopped on an answer, an application or an unsubscribe; each list records why | Communications | M5 |
| Newsletters, announcements and two-way messages from the merchant's verified domain | Communications | M6 |
| Signed outbound webhooks; a Zapier app whose key cannot approve applicants, change earnings or record a sale | Communications | M7 |
| Automations fire on 42 kinds of event or a schedule and may do six things; never money | Automations | M3 |
| Five programme types on by default; switch off the ones not run | Programmes | L3 |
| Referral: a panel on the site; rewards for referrer and/or friend; on sign-up, trial, subscription, paid invoice or order; new customers only by default; milestones 1 to 50 | Programmes | R1 |
| Creator: briefs, deliverables, review with revisions, usage-rights windows with expiry warnings, gifts, fees and bonuses in the collaboration's currency, reports | Programmes | CR1 |
| Ambassador: missions with a review queue, a points ledger, rewards and redemptions including store credit, tiers, a leaderboard, a content library, training | Programmes | AM1 |
| Agency and B2B: leads, deal registration with protection windows, sourced and influenced kept apart, tiers; revenue only when money arrives | Programmes | B1 |

## Page: `/developers/`

Copy: 9 October 2026, for the technical evaluator (prompt §6).

### Screens shown

None. The two code samples are written out: the tracker as the product's Integrations screen prints it, with the production host, and a `POST /api/v1/events` with the `Idempotency-Key` header, as the same screen's "Server events" card prints it.

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| One script tag; one idempotent POST with an Idempotency-Key; a retry after a timeout is always safe | Hero, final band | T2, T5 |
| OpenAPI 3.1; idempotent by the database; append-only history | Hero reassurances | D4, T5, D3 |
| The same event twice with the same key is recorded once; a retried webhook or double-submitted event resolves to the original; a unique index, not check-then-write; the second send answers 200 with status duplicate | Idempotency | T5 |
| The publishable key records visits and identifies customers, cannot read, refuses revenue; money comes from the server with the secret key or a signing provider | Idempotency | T3 |
| integration_event → event → attribution → commission_entry; never updated or deleted; a correction is a new row; the audit log records who, what, when, before and after | The data model | D3 |
| Every touch considered, which won, which lost and why, and the confidence | The data model | A2 |
| "20% of USD 299.00"; nothing recomputed to be explained; a refund is a new row | The data model | C2, C3 |
| Attribution never silently changed | The data model | A4 |
| Isolation is a tested property: every resource carries a test | Security | D2 |
| No merchant Stripe key; OAuth first, least scope, own key, never shown back | Security | D8 |
| Roles, TOTP two-factor with recovery codes, OIDC single sign-on | Security | D9 |
| The Server API: partners, programmes, enrolments, links, codes, read-only commissions and payouts, webhook subscriptions; no endpoint that approves or pays | Build on | D10 |
| Signed outbound webhooks; the Zapier app's key cannot approve, change earnings or record a sale | Build on | M7 |
| Claude and ChatGPT over MCP read what the role may read and save drafts; no tool approves, reverses, pays, reattributes, suspends or sends | Build on | D11, AI3 |
| The whole account as CSV in one archive, every download recorded | Build on | D6 |
| OpenAPI 3.1, 454 paths, the whole Server API; the live API at go.refficks.com; no public address for the document yet | OpenAPI | D4 |
| Laravel 13, PHP 8.4, MySQL 8.4, Redis 7, Next.js 16, React 19, Caddy; hosted by Refficks, nothing to install | The stack | D5, D1 |

## Page: `/migrate/`

Copy: 9 October 2026, from G1 to G7. The honest section (G5) is a band of its own.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `migration-found`, `migration-adds-up` | A migration ("Off LeadDyno", CSV) after a six-line partner file was read: "What we found" and "Does it add up", naming line 7 | 9 Oct 2026 |
| `migration-start`, `migration-columns` | Dashboard › Setup › Migration, "Start a migration"; the project's "What your partner columns mean" | 9 Oct 2026 |
| `migration-switch` | Migration, "Switching over" with the "Before you switch" checklist | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| Reads the export or the account and shows what is in it before import; the bad line named; nothing until you say so | Hero, final band | G1, G2, G3 |
| A spreadsheet with a header row, a LeadDyno export as downloaded, or Rewardful or FirstPromoter by key; columns recognised as they come; the key deleted at cutover or after 60 days; the connectors have not read a real account | Any export | G1 |
| Guessed columns are marked and saving the mapping imports nothing | Any export | G2 (the screen's own line, shown) |
| How many rows, how many can be imported, which cannot and why; one bad row never loses the file; each failed line named | Read back first | G2, G3 |
| Re-importing never duplicates; a partner already here left alone or only empty fields filled | Read back first | G3 |
| Imported partners are ordinary partners | Read back first | G4 |
| For each old status, you say what it means; paid history labelled as theirs, never payable; what is owed as an opening balance, its own entry type, pending approval; why | The honest section | G5 |
| The shadow run: records what it would have paid, pays none, compares the last 28 days partner by partner every morning | The shadow run | G6 |
| Exactly one system pays; a sale belongs to whichever side of cutover its money changed hands on; a warning if a partner's earnings drop | The shadow run | G7 |
| A sale is judged by when it happened, not when Refficks heard of it | The shadow run | G7 (the screen's own line, shown) |
| Start on day one of the trial; reading changes nothing | The shadow run | G2, O3 |

## Page: `/faq/`

Copy: 9 October 2026. The pricing question waits for billing (O3 to O5; §6 Pricing).

### Screens shown

None.

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| Hosted in Romania, in the EU, with Orange Romania; no cloud file bucket; nothing to install | Your data | O2, D1 |
| The whole account as CSV in one archive; every download recorded | Your data | D6 |
| Deleted 90 days after closing, connections revoked; visits and clicks two years except decided touches, correspondence two years, legal records seven; erasure on request | Your data | D7 |
| No raw IP; salted hashes; buyer IP replaced with its hash; GPC writes nothing | Your data | T4 |
| Isolation is a tested property | Your data | D2 |
| A file for PayPal, Wise or the bank, or PayPal from own balance; a person's press, once; no timer, automation or AI | Money | P2, P3 |
| An automation's six things; never money | Money | M3 |
| A reversal beside the original; history never edited | Money | C3 |
| Payout details encrypted, never shown; leave only in the file or to PayPal, recorded | Money | P4 |
| The AI provably never sees bank details, phone numbers, customer names or emails | Money | AI4 |
| No tools, no write path; connected apps read and draft; nothing approves, reverses, pays, reattributes, suspends or sends | Money | AI3 |
| Paid history labelled as the old platform's; owed as an opening balance pending approval; each status mapped | Switching | G5 |
| Never duplicates; left alone or empty fields filled; one bad row never loses the file | Switching | G3 |
| Exactly one system pays; the shadow run pays nothing; the cutover moment decides | Switching | G6, G7 |
| 30 days, everything included, no card until you subscribe, one trial per email | What it is | O3 |
| Five programme types on by default; reseller is a B2B partner on a revenue share | What it is | L3 |
| No machine learning; deterministic rules | What it is | I8 |
| Hosted only, at app.refficks.com | What it is | D1, L4 (said as what is offered, never as a self-hosting mention) |
| Early; only Stripe, Shopify, WooCommerce, Zapier, Claude and ChatGPT have met the real service, partly; the rest from documentation and stand-ins; Paddle not built; Slack, YouTube checks, AppsFlyer and billing switched off | What it is | L1, L8, L2, L10 |
| In no app directory; installed by hand | What it is | L9, T6 |

## Page: `/stores/`

Copy: 9 October 2026, from the stores row of §2.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `coupon-codes` | Dashboard › Programme › Tracking, "Coupon codes" | 9 Oct 2026 |
| `integrations` | Dashboard › Setup › Integrations, "Where do you sell?" | 9 Oct 2026 |
| `ledger` | Commissions filtered to Reversed | 9 Oct 2026 |
| `needs-you-card`, `activation-stalled` | A Needs you recommendation; Activation, "Never sent a click" | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| A typed code credits the right partner; a refund takes commission back by itself; every morning, who is worth your time | Hero, final band | T1, C3, I4 |
| Every partner has a code the day they join, the same one in their link | Hero caption | T1 (the Tracking screen's own line, shown) |
| Works with Shopify, WooCommerce, BigCommerce, Stripe, Squarespace Commerce, Wix Stores, Ecwid, Shift4Shop; most built from documentation and being tested on live accounts | Works with | L2, T9 (the four store guides), L8 |
| Codes become Stripe promotion codes, Shopify discounts, BigCommerce coupon promotions, WooCommerce coupons; pause and return with the connection | Codes | T7 |
| A coupon credits with no click | Codes | T1 |
| The Shopify app, the WordPress plugin, the BigCommerce app | Codes | T6 |
| A reversal beside the original; "20% of USD 299.00"; never an edit | Refunds | C3, C2 |
| A sale only a browser reported waits for a person | Refunds | C5, T3 |
| Scored overnight; the list ranks who to act on with evidence; the three kinds named | Needs you | I1, I4, AN4 |
| The one nudge Autopilot may send alone | Needs you | I9 |
| Who is stuck where; the median days to a first sale | Needs you | AN4 |

## Page: `/saas/`

Copy: 9 October 2026, from the SaaS row of §2.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `plans` | A programme's "Commission plans" card | 9 Oct 2026 |
| `ledger` | Commissions filtered to Reversed | 9 Oct 2026 |
| `pipeline` | Dashboard › Introductions › Pipeline | 9 Oct 2026 |
| `payouts` | Payouts, "Ready to pay" | 9 Oct 2026 |
| `needs-you-card`, `confirm-raise` | A Needs you recommendation; a raise pressed once | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| Pay on every renewal for as long as you say; a refund or cancellation reversed beside the original; deals stay with their partner until the invoice pays | Hero, final band | C1, C3, B1 |
| 10% of each sale, recurring for the customer's lifetime, approved 45 days after the sale | Hero caption | C1, C5 (the plan shown) |
| Works with Stripe, Chargebee, Recurly, RevenueCat and the API; most from documentation, being tested live | Works with | L2, L8 |
| Percentage or flat; once or recurring for months or for life; a lower rate with a code | Recurring | C1 |
| Stripe credits through a visitor id with no JavaScript; connects as a platform, no key held | Recurring | A5 |
| Every renewal keeps paying the partner who won the subscription | Recurring | A1 (the programme's "Renewals stay with whoever won the subscription" setting, shown in exploration), C1 |
| A reversal beside the entry it undoes; the sum stored; yen stay yen; per currency; history never edited | Refunds and cancellations | C3, C2, C4 |
| Leads, deal registration with protection windows, sourced and influenced apart, revenue only when money arrives, a won deal is a decision | Deals | B1 |
| The preview before anything is committed; a batch in one transaction approved by a person; CSV, PayPal, Wise; PayPal from own balance; marked paid with a reference | Payouts | P1, P2, P3 |
| Scored overnight; the list ranks and shows evidence; a raise confirmed on the number with its cost; "Not now" 30 days | Needs you | I1, I4, I5, I7 |

## Page: `/creators/`

Copy: 9 October 2026, from the creators row of §2.

### Screens shown

| Screenshot | Screen | Captured |
|---|---|---|
| `guides` | The public "Where Refficks works" page | 9 Oct 2026 |
| `integrations` | Dashboard › Setup › Integrations, "Where do you sell?" | 9 Oct 2026 |
| `coupon-codes` | Tracking, "Coupon codes" | 9 Oct 2026 |
| `portal-commissions` | The portal's Your commission page on a phone | 9 Oct 2026 |
| `needs-you-card` | A Needs you recommendation | 9 Oct 2026 |

### Claims

| Claim | Where | Fact IDs |
|---|---|---|
| A guide per platform; paste an address and a snippet; every sale arrives with the partner who sent it | Hero, final band | T9, A2 |
| Each guide says what to paste where, what it credits and what it does not | Hero caption | T9 |
| Works with Kajabi, Thinkific, Teachable, ThriveCart, SamCart, Gumroad, ClickFunnels, Stripe Payment Links; most from documentation, being tested live | Works with | L2, T9, L8 |
| Fifty-two guides, readable without an account; checkouts, site builders, forms and booking, analytics; each says what it cannot do; checks what Refficks has seen; none walked live and each says so | Guides | T9 |
| Those seven platforms report each payment; a platform that signs nothing has each commission wait for approval | Guides | L2, C5 |
| A coupon credits with no click; every partner has a code the day they join | Codes | T1 |
| Deep links and QR codes | Codes | PO5 |
| Every sale stored with its reasoning | Codes | A2 |
| A portal built for a phone with clicks, sales, commission and payouts, every entry showing how it was worked out; one sign-in across merchants | Partners | PO1, C5 |
| A query changes no money | Partners | PO4 |
| Payout details kept by the partner and never seen by anyone | Partners | PO2, P4 |
| Scored overnight; ranked with evidence; the three kinds; "Not now" 30 days | Needs you | I1, I4, I7 |
