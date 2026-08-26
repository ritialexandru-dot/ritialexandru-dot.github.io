# refficks.com

The marketing site for **Refficks**, a Partner Growth OS. Plain static HTML and
CSS, served by GitHub Pages straight from this repository. No CI, no runtime
build, no JavaScript framework.

## Reading order for anyone picking this up

| File | What it is |
| --- | --- |
| [`claims.md`](claims.md) | Every factual claim on the site, mapped to its fact-sheet ID. **Read this before editing copy.** |
| [`SCREENSHOTS.md`](SCREENSHOTS.md) | Which real product capture replaces which hand-built screen rendering, and how to swap one in. |
| `_src/` | The sources. Everything at the repo root except this README is generated from here. |

## Editing

Pages live in `_src/pages/`. Each file is a short key/value header, a `---`
line, and the page body:

```
path: /migrate/
title: Migrate from LeadDyno or a spreadsheet — Refficks
ogtitle: Bring your partners in minutes. We read the export as it downloads.
desc: Upload a CSV or a LeadDyno affiliates export unedited…
---
<section class="wrap hero"> … </section>
```

The nav, footer and `<head>` live once, in `_src/partials/` and `_src/layout.html`.

After any edit:

```sh
python3 _src/build.py
```

That writes the `.html` files at the repo root and regenerates `sitemap.xml`.
Commit the generated files — GitHub Pages serves them directly. The build has no
dependencies beyond Python 3.

To preview locally:

```sh
python3 -m http.server 8099    # then open http://127.0.0.1:8099/
```

### Changing the domain

`SITE_ORIGIN` at the top of `_src/build.py` is the only place the production
origin appears. It feeds canonical URLs, OG URLs and the sitemap.

### Regenerating the social images

`assets/img/og-*.png` are generated from `_src/og-template.html`:

```sh
npm i playwright && node _src/make-og.js
```

## Deploying to refficks.com

The site currently deploys to `ritialexandru-dot.github.io`. To move it to the
apex domain:

1. `git mv CNAME.example CNAME` and push. (The file already contains
   `refficks.com`.)
2. At your DNS provider, point the apex at GitHub Pages —
   four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`, and a `CNAME` for `www` to `ritialexandru-dot.github.io`.
3. In repository Settings → Pages, confirm the custom domain and tick **Enforce
   HTTPS** once the certificate is issued.

Do step 1 **after** the DNS records exist. A `CNAME` file with no matching DNS
makes `ritialexandru-dot.github.io` redirect to a domain that does not resolve.

`app.refficks.com` is the product and `go.refficks.com` is tracking; this site
never serves from either.

## Before launch

Four things need real values. All four are marked with `TODO(owner)` comments in
`_src/`, and listed in the "Needs owner verification" section of `claims.md`.

- [ ] **`/early-access/` form** — `action` is `https://REPLACE-WITH-YOUR-FORM-ENDPOINT`.
      The form is otherwise complete. Do not ship it pointing at the placeholder.
- [ ] **Footer source-repository link** — no URL was invented; the slot is a comment
      in `_src/partials/footer.html`.
- [ ] **Contact address** on `/privacy/` and `/terms/`, which currently say
      "the address published in the repository".
- [ ] **Verify the tracker snippet and API auth header** on `/developers/` against
      the running product and the OpenAPI spec. The shapes follow the fact sheet;
      the exact identifiers were not available when the page was written.

Also worth doing:

- [ ] `/privacy/` and `/terms/` are plain-language drafts and say so in a visible
      callout. Have counsel review or replace them.
- [ ] Swap in real product screenshots — see [`SCREENSHOTS.md`](SCREENSHOTS.md).

## House rules this site follows

Kept here so they survive the next person editing a headline.

- **Every factual claim traces to a fact-sheet ID.** No ID, no sentence. Log it
  in `claims.md` when you add one.
- **No invented metrics or mock data.** Numbers across the site are internally
  consistent and reconcile — the checks are at the bottom of `claims.md`.
- **No testimonials, customer logos, user counts, fake urgency, invented
  pricing, claims about competitors, or stock photography.** Ever.
- **Voice:** plain, specific, lightly dry. Numbers over adjectives. Sentence-case
  headings, no full stops on headlines, no exclamation marks. Never
  "revolutionary", "supercharge", "unleash", "seamless", "blazing".
- **The two-readers rule:** each major section carries one plain sentence for the
  operator and, where it earns its place, one `Precisely:` line for the developer.
- **One primary CTA:** "Start free", identical wording, same destination, above
  the fold and at the end of every page.
- **Design tokens are the product's** and are not to be altered: ink `#14161A`,
  secondary `#4A5058`, muted `#767D88`, surfaces `#FFFFFF` / `#F6F7F9`, accent
  `#4338CA` (hover `#3730A3`, soft `#EEF2FF`). One accent, used for CTAs and
  links only — never decoration. `tabular-nums` on every figure.
  `--muted` is 4.15:1 on white, so it is used only at ≥18.5px; smaller text uses
  `--secondary` at 8.1:1.
- **Light theme only.** Dark mode is complete or absent, and it is absent.
- **Motion** is a restrained fade-and-rise on scroll, disabled under
  `prefers-reduced-motion`, and never applied to data.
- **No third-party requests.** System font stack, no CDN, no analytics. If
  analytics are added they must be cookieless and privacy-first — the product
  never stores a raw IP, and the marketing site should not either.
