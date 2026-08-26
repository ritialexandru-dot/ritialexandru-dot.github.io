# SCREENSHOTS.md

Every product screen on this site is currently a **hand-built HTML/CSS rendering**,
not a photograph of the running app. This file says which real capture replaces
which rendering, and how to swap it.

## Why the site shipped this way

The build prompt (§8) says to capture ten screenshots from a running Refficks
stack before building. The site was built without access to that stack, so each
screen was reconstructed in the product's own design tokens using **only the
microcopy the fact sheet supplies verbatim** — "Ranked by what it costs you to
ignore. Every one shows its evidence.", "Approved 29 days ago and has not sent a
single click.", "Review recommended", "No earlier period to compare", "Not part
of the Refficks ledger." No metric was invented that the fact sheet does not
support, and every figure is internally consistent (see the last section of
`claims.md`).

These are §8 "purpose-drawn" assets, not fake photographs: there is no browser
chrome, no window shadow pretending to be a screen capture, and every rendering
carries a **Demo data** chip — which stays accurate after the swap, because the
real captures come from `php artisan refficks:demo` too.

They are also better than images in three ways worth keeping in mind before you
replace them: they are a few KB of markup rather than a few hundred KB of PNG,
they reflow at 390px instead of shrinking to illegibility, and a screen reader
reads the actual table rather than an alt attribute. **Consider replacing only
the hero shots** (2, 3, 5, 6, 7, 8, 9, 10) and leaving the supporting renderings
as markup.

## How to capture

```sh
# In the Refficks repo, with the stack running
php artisan refficks:demo          # six partners, four months, built through the real pipeline
# sign in with the printed credentials
```

Capture at **1440×1100, light theme**, except shot 9 (390px wide). Crop rather
than shrink — the screenshot must be legible at a glance (§8).

## How to swap one in

1. Save the capture to `assets/img/screens/<name>.png` (create the folder).
2. In the matching `_src/pages/*.html`, find the `<!-- SHOT n · … -->` comment.
   The alt text you need is written in that comment already.
3. Replace the `<div class="ui">…</div>` block that follows it with:

   ```html
   <img src="/assets/img/screens/<name>.png" width="1440" height="1100"
        loading="lazy" decoding="async"
        alt="<the alt text from the comment>">
   ```

   Use `loading="eager"` and `fetchpriority="high"` for a hero image above the
   fold; `loading="lazy"` for everything else. Keep the surrounding `<figure>`
   and its `<figcaption>` — the caption carries the benefit claim and is audited
   in `claims.md`.
4. Leave the `<!-- SHOT n -->` comment in place so the mapping stays traceable.
5. Run `python3 _src/build.py`.

Compress before committing (`oxipng -o 4`, or `cwebp` with a PNG fallback).
The performance budget is LCP < 2.0s on mid-range mobile (§9).

## The slots

Ten numbered shots come from §8. Lettered variants are additional screens this
site needed; capture them the same way.

| Shot | Screen to capture | Used on | Hero? |
| --- | --- | --- | --- |
| **1** | Dashboard overview, charts populated | `/product/commissions/` | |
| 1b | Dashboard of a brand-new programme — must show "No data yet" and "No earlier period to compare" | `/product/commissions/` | |
| **2** | **Actions screen** with recommendation cards + evidence | `/` (hero), `/product/intelligence/` (hero) | ✔ |
| 2b | Actions screen, collapsed queue view | `/` | |
| 2c | Actions screen showing a dismissed recommendation | `/product/intelligence/` | |
| **3** | Activation funnel with a named stall | `/`, `/product/intelligence/` | |
| **4** | Partner profile score breakdown — "Why this score" | `/`, `/product/intelligence/` | |
| 4b | The confirm-a-raise dialog (I5), showing the run-rate cost | `/` | |
| 4c | Partner lifecycle stages, or the partner list grouped by stage | `/product/intelligence/` | |
| **5** | Attribution Debugger on a contested sale — "2 partners had a live claim" | `/product/tracking/` (hero) | ✔ |
| 5b | Programme attribution settings: window + source priority | `/product/tracking/` | |
| 5c | The unattributed sales view | `/product/tracking/` | |
| **6** | Commission ledger: an entry and its reversal side by side | `/product/commissions/` (hero) | ✔ |
| 6b | Commission plans list | `/product/commissions/` | |
| **7** | Payout preview showing who cannot be paid and why | `/product/commissions/` | |
| **8** | Import preview naming a bad line | `/migrate/` (hero) | ✔ |
| 8b | Partner profile with imported historical totals — must show "Not part of the Refficks ledger." | `/migrate/` | |
| **9** | Partner portal at **390px** (the page frames it in a phone) | `/product/portal/` (hero) | ✔ |
| 9b | Automations list in the merchant dashboard | `/product/portal/` | |
| **10** | Assistant panel **with the "Written by AI" label visible** — the label is the point | `/product/intelligence/` | |

`/developers/`, `/roadmap/`, `/early-access/`, `/faq/`, `/privacy/` and `/terms/`
have no screenshot slots. Their visuals are code blocks and the append-only chain
diagram, which are real content rather than stand-ins.

## Alt text

Every slot's comment already contains alt text describing **what the screen
actually shows**, per §8 — "Actions screen listing three recommendations ranked
by priority, each with an evidence panel and a Not now button", never "product
screenshot". If your capture differs from the rendering it replaces, rewrite the
alt text to match what you actually captured.

## Open-graph images

`assets/img/og-*.png` (1200×630) are generated, not captured. To regenerate after
changing a page's `ogtitle`:

```sh
# _src/og-template.html is the card; see the generator snippet in README.md
```

§9 asks for OG images built from each page's lead screenshot. These currently use
a designed card carrying the page title plus a cropped Actions panel. Once real
captures exist, compositing the page's own hero into the right-hand panel of
`_src/og-template.html` is a one-file change.
