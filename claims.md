# claims.md

Every factual claim on refficks.com, mapped to its fact-sheet ID.

The rule (build prompt §1): if a claim has no ID, it may not be made. This file
exists so the whole site can be audited in one sitting. When the fact sheet
changes, change this file first and the pages second.

**How to read it.** Claims are grouped by page in site order. Voice, framing and
transitional copy are not claims and are not listed — only sentences that assert
something about what Refficks does, does not do, or is.

Two sections at the end matter as much as the tables:
[Needs owner verification](#needs-owner-verification) and
[Deliberate non-claims](#deliberate-non-claims-l1l7).

---

## Conventions used site-wide

| Claim | Fact ID |
| --- | --- |
| "Early access" eyebrow, present on the home page above the fold | L1 |
| "Self-hosted. Your data. No credit card." — the reassurance line under every primary CTA | D1, L4, §6 |
| "Start free" → `https://app.refficks.com/register`, identical wording everywhere | §6, §7 |
| "Sign in" → `https://app.refficks.com/login` | §6 |
| "Demo data" chip on every UI rendering | §8 (all screens come from `php artisan refficks:demo`) |
| Footer: "No cookies, no trackers, nothing to consent to" | §9, T4 |
| Every figure uses `tabular-nums` | §8 |

**The demo cast.** Six partners, matching the demo dataset's six (§8): Ravi Anand,
Nadia Okonjo, Tom Berger, Elena Vasquez, Priya Shah, Marcus Lin. Figures are
internally consistent across every page — see
[Internal consistency](#internal-consistency-of-the-demo-figures).

---

## `/` Home

| Claim | Fact ID |
| --- | --- |
| H1 "Affiliate dashboards report. Refficks recommends." | §2 hero candidate 1 |
| Subhead: category sentence + "the part no dashboard does… shows its evidence" | §2 subhead pattern; T\*, A\*, C\*, P\*, I4 |
| "Ranked by what it costs you to ignore. Every one shows its evidence." (verbatim) | §3, I4 |
| "Approved 29 days ago and has not sent a single click." (verbatim) | §3, I4 |
| Recommendations are ranked by priority with structured evidence on each | I4 |
| "Review recommended" used in place of any fraud wording | I6 |
| A risk finding has no apply button | I6 |
| "Not now" button on every recommendation | I7 |
| Callout: "'Not now' means not tomorrow morning either" | I7 |
| Evidence cites the programme median to first click | AN4 |
| "Most tools watch the last three inches" + the three problem lines | §2 thesis |
| Eight-stage journey diagram (Discover → … → Retain) | §2 |
| Funnel: signed up / clicked / sold, with medians and the partners stuck | AN4 |
| "Medians, not means" | AN4 |
| Beat 1 Precisely: deterministic rules, not ML; weights are configuration, not code | I8, I2 |
| "At stake" reads **Unknown** where there is no run rate to lose | AN5 |
| Beat 2: every score shows factor, weight, value, points, evidence | I2 |
| Beat 2 Precisely: attribution decisions store full reasoning + confidence | A2 |
| Score is a percentile rank inside your programme, not a grade | I1 |
| Potential is deliberately not a function of current revenue | I1 |
| Beat 3: financial changes need explicit confirmation naming the numbers | I5 |
| Confirm dialog shows cost per month at the current run rate | I5 |
| Beat 3 Precisely: an automation may send an email, add a tag, enrol in a campaign; never money | M3 |
| Refusal 1 — a refund writes a reversal beside the original; history is never edited | C3 |
| Refusal 1 Precisely — events, attributions, commission entries, audit logs are append-only; corrections supersede | D3, A4 |
| Refusal 2 — the AI cannot approve, reverse or suspend anything; structurally, not by policy; no tools, no DB access, no write path | AI3 |
| Refusal 3 — Refficks never moves money; a person can always say no | P3 |
| Refusal 3 — builds the batch, names who cannot be paid, exports a bank CSV | P1, P2 |
| Refusal 4 — "no data yet" not "$0.00"; "no earlier period to compare" not "+100%" | AN5 |
| Developer band — retries are free, duplicates structurally impossible, DB-enforced idempotency | T5 |
| Developer band Precisely — integer minor units + ISO currency, no floats, no silent conversion | C4 |
| curl example: `Idempotency-Key` header, `amount: 29900`, `currency: "USD"` | T5, C4 |
| Migration strip — "We read the export as it downloads" | G1 |

## `/product/intelligence/`

| Claim | Fact ID |
| --- | --- |
| H1 "Who needs my attention today, why, and what should I do?" | §2, §6, I4 |
| Actions screen (as home) | I4, I6, I7, §3 |
| Four recommendation kinds: activate, contact, consider a raise, review | I4 |
| Evidence is structured, not prose | I4 |
| A dismissed recommendation is not re-raised the next morning | I7 |
| A situation that returns months later is raised again | I7 |
| The dismissal records who made it and when | I7, D3 |
| Score / potential / risk, scored nightly | I1 |
| Score is a percentile rank in *your* programme | I1 |
| Potential is deliberately not a function of current revenue | I1 |
| Every factor shows weight, value, points and one sentence of evidence | I2 |
| Weights are configuration, not code | I2 |
| Lifecycle: a click onboards, a sale activates, silence makes dormant | I3 |
| Refficks never sets applicant or rejected — a human decision | I3 |
| Funnel names who is stuck; medians not means | AN4 |
| AI: optional, off by default, switchable off per organization | AI1 |
| AI summarises a partner, explains a recommendation *and argues against it*, drafts outreach you edit | AI2 |
| AI cannot approve, reverse or suspend — no tools, no DB access, no write path | AI3 |
| Payout details never reach the model; there is a test asserting their absence | AI4 |
| Everything it writes is labelled "Written by AI", with the model named | AI5 |
| Every interaction, including failures, is recorded | AI5 |
| Partner text reaches the model as data in a delimited record; responses validated against a fixed shape | AI6 |
| Closing: "No machine learning. Every recommendation shows reasoning you can disagree with." | I8 |
| Financial recommendations require confirmation naming the numbers, with the run-rate cost | I5 |

## `/product/tracking/`

| Claim | Fact ID |
| --- | --- |
| H1 "Which partner earned this sale, and can you prove it?" | A2, A3 |
| Every decision stores every touch considered, eligibility, winner, loser, why, confidence | A2 |
| The Attribution Debugger shows that reasoning on screen | A3 |
| Partners get tracking links and coupon codes | T1 |
| A coupon attributes a sale even when no click happened | T1 |
| Two-line first-party JavaScript snippet | T2 |
| Server events over a REST API with API keys | T2 |
| Stripe attribution via `client_reference_id`, no JavaScript required | A5 |
| Publishable keys identify customers but can never report revenue; secret keys server-side | T3 |
| Last-touch across a configurable window, default 30 days | A1 |
| Windows are per-programme | A1 |
| Source priority: API > link > direct > coupon > import | A1 |
| Sales attributed to nobody are recorded as exactly that, not dropped | A3 |
| The debugger works on unattributed sales too | A3 |
| Refficks never stores a raw IP address; salted hashes; Do Not Track respected by default | T4 |
| Duplicates structurally impossible; DB-enforced idempotency; retried webhook resolves to the original | T5 |
| Attribution is never silently changed; corrections supersede | A4 |

## `/product/commissions/`

| Claim | Fact ID |
| --- | --- |
| H1 / lede: every entry stores the arithmetic — "20% of USD 299.00" | C2 |
| Nothing is recomputed in order to be explained | C2 |
| A refund writes a reversal beside the original; the original is unchanged | C3 |
| History is never edited: not a commission, not an attribution, not a raw event | C3 |
| Percentage, fixed or tiered; one-time or recurring with optional duration | C1 |
| Conditions and priorities; per-partner custom plans for deliberate exceptions | C1 |
| Money is integer minor units + ISO currency; never floats, never silent conversion | C4 |
| Merchants approve commission explicitly, singly or in bulk | C5 |
| Partners see the same arithmetic for their own earnings | C5 |
| Payout preview: who is owed, who cannot be paid, exactly why, before anything is committed | P1 |
| Reasons shown: "No payout details", "Below the USD 50.00 minimum" | P1 |
| Batches built in one transaction, exported as bank-usable CSV, approved by a person, marked paid with a reference | P2 |
| Refficks never moves money; a person can always say no | P3 |
| Payout details encrypted at rest and write-only; never displayed back, including to the partner | P4 |
| An automation cannot touch money | M3 |
| Dashboard and reports: revenue, commission, clicks, conversions over selectable periods, league tables, day-by-day charts including quiet days | AN1 |
| Closed days from nightly rollups; today computed live from the same arithmetic; the total does not move when the day closes | AN2 |
| Days close in the organization's timezone, not the server's | AN3 |
| "No data yet" instead of "$0.00"; "No earlier period to compare" instead of "+100%" | AN5 |

## `/product/portal/`

| Claim | Fact ID |
| --- | --- |
| Partners get their own portal, separate sign-in, built for phones | PO1 |
| Showing clicks, sales, commission ledger, links and marketing assets | PO1 |
| A partner can only read their own records | PO1, D2 |
| The portal renders the same stored arithmetic the merchant sees | C2, C5 |
| Partners maintain their own contact and payout details | PO2 |
| Merchants see that the record changed, not the bank details | PO2, P4 |
| Payout details encrypted at rest and write-only | P4 |
| One-click unsubscribe with no sign-in; money emails still arrive | PO3 |
| Eight default emails work on day one; merchants override any of them | M1 |
| Merchant templates are substituted, never compiled; copy is never handed to a template engine | M2 |
| Automations fire on real events: partner approved, first sale, gone dormant | M3 |
| Automations may do exactly three things; cannot touch money, ever | M3 |
| Every send is recorded, so "did they get the email?" has an answer | M4 |

## `/developers/`

| Claim | Fact ID |
| --- | --- |
| H1 "From `docker compose up` to first attributed commission in an afternoon" | D1, §6 |
| Two-line tracker, first-party | T2 |
| Publishable key can identify a customer, never report revenue | T3 |
| `POST /api/v1/events` with an `Idempotency-Key` header | T2, T5 |
| `amount` is integer minor units, `currency` an ISO code, everywhere | C4 |
| Retries are free; duplicates structurally impossible; enforced by the database | T5 |
| Chain: `integration_event → event → attribution → commission_entry` | D3, §6 |
| All four are append-only | D3 |
| Audit log records who did what, when, with before/after values | D3 |
| Attribution reasoning is stored at decision time, not recomputed | A2 |
| Commission entries store their own arithmetic | C2 |
| Multi-tenant isolation is a *tested* property; every resource carries a test | D2 |
| Self-hosted with Docker Compose; DNS to signed-in in under an hour; HTTPS automatic | D1 |
| 2 vCPU / 4 GB comfortable | §6 |
| Complete OpenAPI specification in the repo, 90 paths | D4 |
| Laravel + MySQL + Redis API; Next.js dashboard and portal | D5 |
| "0 raw IPs stored — salted hashes only" stat | T4 |

## `/migrate/`

| Claim | Fact ID |
| --- | --- |
| CSV or LeadDyno affiliates export, as downloaded; column names recognised as they come | G1 |
| The file is read back before import: rows read, rows importable, which lines cannot and why | G2 |
| Nothing happens until you say so | G2 |
| One bad row never loses the file; the report names each failed line | G3 |
| Re-importing never duplicates anyone | G3 |
| Never overwrites existing records unless explicitly asked | G3 |
| Imported partners are ordinary partners: same audit trail, same welcome automation | G4 |
| Historical totals imported as that platform's reported figures, labelled on the partner | G5 |
| "Not part of the Refficks ledger." (verbatim) | §3, G5 |
| Never written into the Refficks ledger, which only holds money it can explain | G5 |
| Framed as the honest trade it is, not buried | G5, §6 |
| The competitor is named only as the source of a file format; no claim is made about their product | §5.5 |

## `/early-access/`

| Claim | Fact ID |
| --- | --- |
| Self-hosted today; no hosted version | L4 |
| No date promised for a hosted version | L4 |
| Interest form is a single email field, no other questions | §6 |
| Docker Compose, under an hour, HTTPS automatic | D1 |
| 2 vCPU / 4 GB comfortable | §6 |
| No pricing page, because there is no hosted plan to price | §6 Pricing rule, L4 |
| No customer logos; early product | L7, L1 |
| No uptime commitment | L7 |

## `/roadmap/`

| Claim | Fact ID |
| --- | --- |
| Framing: three states — shipping, architecture only, not built | L1–L7 |
| Shipping: tracking and attribution | T1–T5, A1–A5 |
| Shipping: commissions and payouts | C1–C5, P1–P4 |
| Shipping: partner intelligence | I1–I8 |
| Shipping: partner portal and communications | PO1–PO3, M1–M4 |
| Shipping: analytics and reporting | AN1–AN5 |
| Shipping: migration and import | G1–G5 |
| Shipping: optional AI assistance | AI1–AI6 |
| Shipping: self-hosted deployment | D1–D5 |
| Referral / creator / ambassador / agency / reseller are architecture, not features; not sold | L3 |
| Stripe is the payment integration today, plus the generic API and JS | L2 |
| Paddle and others planned, not present; no date | L2, L4 |
| No hosted version | L4 |
| Refficks holds no compliance certifications — **no certification is named** | L5 |
| Real practices described instead: tested isolation, append-only records, no raw IPs, encrypted write-only payout details | D2, D3, T4, P4 |
| A license has not been chosen; "self-hosted", never "open source" | L6 |
| No uptime SLA, no named customers, no usage statistics | L7 |
| Nothing on the page carries a date | L4 |

## `/faq/`

Every answer is drawn from the tables above. Question → fact IDs:

| Question | Fact ID |
| --- | --- |
| Who owns the data? | D1, D2 |
| Does the AI see bank details? | AI4, AI3, AI1 |
| Can an automation pay someone? | M3, P3, P1, P2 |
| What happens to my LeadDyno history? | G5, C2 |
| Do you store IPs? | T4, §9 |
| What is not built yet? | L2, L3, L4 |
| What does it cost? | §6 Pricing rule, L4 |
| Is it open source? | L6 |
| Do you have compliance certifications? | L5, D2, D3, T4, P4 |
| Who else is using it? | L7, L1, §8 (demo dataset) |
| What happens when a customer refunds? | C3, C2, A4 |
| What if I send the same event twice? | T5 |
| Can I credit an affiliate with no click? | T1, A5 |
| How long does it take to set up? | D1, D5, D4 |

## `/privacy/` and `/terms/`

Both are marked "Review with counsel before publishing" in a visible callout, per §6.

| Claim | Fact ID |
| --- | --- |
| No cookies, no trackers, no consent banner needed | §9 |
| No third-party web fonts (system font stack) | §9 (build decision, see README) |
| Analytics, if added, will be cookieless and privacy-first | §9 |
| The product never stores a raw IP and respects Do Not Track | T4 |
| Self-hosted: your data is in your database, Refficks has no copy | D1 |
| Screens on this site come from a demonstration dataset | §8 |
| No license chosen; self-hosted, not open source | L6 |
| No uptime commitment | L7 |
| Roadmap states three states, no dates | L4 |
| Refficks never moves money | P3 |

---

## Needs owner verification

Four items are faithful to the fact sheet in **shape** but contain identifiers the
fact sheet does not supply. Verify each against the running product before launch.

| Where | What to check |
| --- | --- |
| `/developers/`, home | Tracker snippet: `https://go.refficks.com/t.js` and `refficks("init", "pk_live_…")`. The *shape* is T2 + T3 + §9 (`go.` is tracking). The exact filename and function name are not in the fact sheet. |
| `/developers/`, home | `Authorization: Bearer $REFFICKS_SECRET_KEY`. T2 says "API keys"; the exact scheme should be read off the OpenAPI spec (D4). |
| `/developers/` | `git clone <your-refficks-repository>` — deliberately a shell placeholder. `./setup-production.sh` is named in §6. |
| `/developers/` | The isolation-test code block is captioned "Illustrative shape" in the page itself. D2 guarantees the property, not these three test names. |

Three links and one form need real destinations:

| Where | What is missing |
| --- | --- |
| Footer, "Build with it" | A public source-repository link. Marked with an HTML comment in `_src/partials/footer.html`; no URL was invented. |
| `/early-access/` | The form's `action` is `https://REPLACE-WITH-YOUR-FORM-ENDPOINT`. **Do not ship without changing this.** |
| `/privacy/`, `/terms/` | A real contact address. Both currently say "the address published in the repository". |
| Site-wide | `CNAME.example` holds `refficks.com`. Rename to `CNAME` and point DNS when ready — see README. |

---

## Deliberate non-claims (L1–L7)

Things a marketing site would normally say, absent here on purpose:

- **No testimonials, no invented people, no stock photography.** (§5.1, §5.7)
- **No customer logos, no "trusted by", no user counts, no revenue counters.** (§5.2, L7)
- **No countdown timers, no "spots left", no exit popups.** (§5.3)
- **No pricing.** There is no hosted plan to price. (§5.4, §6)
- **No claims about competitors.** LeadDyno appears only as a file format the
  importer reads. (§5.5)
- **"AI-powered" is never a headline.** The AI section sells AI3–AI6, the
  guarantees. (§5.6)
- **No certification is named**, not even as an aspiration. (L5)
- **"Open source" never appears** as a description of Refficks. (L6)
- **No uptime figure, no SLA.** (L7)
- **No dates anywhere on the roadmap.** (L4)
- **Referral, creator, ambassador, agency and reseller are never sold** — they
  appear once, on the roadmap, labelled architecture. (L3)
- **No banned words** (§3): revolutionary, supercharge, unleash, seamless,
  blazing. **No exclamation marks** anywhere on the site.

---

## Internal consistency of the demo figures

Numbers recur across pages and are arithmetically consistent, so a reader who
checks them finds them checking out:

| Figure | Where it appears | Check |
| --- | --- | --- |
| `order_10492` = USD 299.00 | home curl, `/developers/`, tracking debugger, commissions ledger, portal | `amount: 29900` minor units = USD 299.00 (C4) |
| 20% of USD 299.00 = USD 59.80 | commissions ledger, portal | ✔ |
| Entry #4471 and its reversal #4488 | commissions ledger, portal | reversal is `−USD 59.80`, original untouched (C3) |
| Nadia: USD 8,240.00/mo at 15% → 20% | home, intelligence, commissions | 15% = 1,236.00; 20% = 1,648.00; delta = **412.00/mo** (I5) |
| Nadia's payable USD 1,648.00 | payout preview | equals the 20% figure above |
| Payout preview payable total | commissions | 1,648.00 + 892.40 = **2,540.40** ✔ |
| Payout "cannot be paid" total | commissions | 118.00 + 38.00 = **156.00** ✔ |
| Tom Berger USD 1,015.00 | home Actions queue, payout preview | at stake = held, commission not approved |
| Score factor points | home, intelligence | 28.2 + 21.5 + 20.0 + 14.1 + 10.2 = **94.0** ✔ |
| Funnel 6 / 4 / 2 | home, intelligence | matches the demo's six partners (§8) |
| Dashboard revenue USD 24,180.00 | commissions | the 31 daily chart bars sum to 1,612 units × USD 15 = **24,180.00** ✔ |
| Dashboard commission USD 3,627.00 | commissions | 15.0% of 24,180.00 ✔ |
