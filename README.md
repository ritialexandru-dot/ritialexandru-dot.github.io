# refficks.com

The marketing site for Refficks, built to `docs/website-prompt.md` in the
product repository and the Refficks design kit. A static Astro site with
Tailwind 4, served at the apex by Refficks's own nginx, beside the blog.

```
src/pages/          one file per route, plus the sitemap
src/layouts/        Base.astro: the head, the header, the footer
src/components/     site/ (chrome and the shared sections), home/ (the home page's own), ui/ (primitives)
src/styles/         global.css holds every design token
src/lib/            the addresses the site links to, the routes, and the screenshots it shows
public/shots/       product screenshots, packed as WebP at 1x and 2x
public/og/          link-preview images
public/fonts/       Figtree, self-hosted
scripts/            the screenshot capture, pack and link-preview render, and the checks CI runs
claims.md           every claim on the site, against the fact sheet
```

## The shape of the pages

The home page follows the shape the category's own sites use (Rewardful,
FirstPromoter, Tolt, LeadDyno, ReferralCandy and the rest, read 9 October
2026): a short headline and one sentence over a real product screen, the
platforms it works with, who it is for, one feature block per capability
with a label, a heading, a sentence, three checks and the screen beside it,
a trust section, three steps, questions, and a closing band. What those sites
do with testimonials, logos and counts, this site does with the product's own
screens, because there are no customers to quote yet (website prompt §5, §7).

The ten other pages (§6's site map, less pricing, privacy and terms) keep
that shape: `PageHero` over the page's lead screen, `Feature` blocks, a
`CardGrid` where a list of facts reads better than prose, the product's own
sentences in a `Quote`, and the same closing band. The audience pages open
with their own `WorksWith` row. A "Precisely:" line under a feature is the
one sentence for the developer the operator forwards the page to (§2).

## Why Astro

The website prompt allows Astro or a Next.js static export and sets a budget
of under 100 KB of JavaScript. The page was first built as a Next.js export
and measured 140 KB gzipped on the home page, all of it React's runtime for
two menus. The same components, moved to Astro, ship one script of about
1 KB. Nothing about the design changed in the move: the tokens, the classes,
the copy and the screenshots are the same files.

## Working on it

```bash
npm ci
npm run dev                 # http://localhost:4321
npm run verify              # astro check, then the three checks below
npm run check:classes       # no palette colours, no px type sizes
npm run check:claims        # every page has a claims section; every ID exists
npm run check:voice         # no banned words, no exclamation marks, no forbidden claims
npm run build               # writes dist/
npm run check:policy        # dist/ against the server's Content-Security-Policy
```

Design tokens come from the kit's `css/refficks-tokens.css` and are declared
once in `src/styles/global.css`; components use the semantic names
(`bg-canvas`, `text-ink`, `border-border`, `bg-action`) and never a primitive
or Tailwind's own palette, which is removed. Type sizes are the named scale
there, in rem.

## Screenshots

Every image is a real product screen (prompt §8). To capture them again:

1. Run the product stack (API on 8000, the queue worker, web on 3000) and
   `php artisan refficks:demo`.
2. With Playwright available (installed here, or `PLAYWRIGHT_DIR` pointing at
   a copy, and `PLAYWRIGHT_BROWSERS_PATH` or `E2E_CHROMIUM` naming Chromium):

   ```bash
   SHOTS_OUT=/tmp/shots node scripts/capture-shots.mjs      # SHOTS_SET=home or more for one set
   node scripts/pack-shots.mjs /tmp/shots
   node scripts/make-og.mjs home "Affiliate dashboards report. Refficks recommends." shots/needs-you@2x.webp
   ```

   The `more` set starts a migration called "Off LeadDyno" in the demo
   account and reads a six-line partner file into it, so the migrate page can
   show a file read back with its bad line named. Each page's link-preview
   image is one `make-og.mjs` line; the headline, the screen and the line
   under it are in the page's `og*` props.

3. Check the sizes in `src/lib/shots.ts` against `public/shots/sizes.json`.

Before a release, check each screen listed in `claims.md` answers on
app.refficks.com (§1's time rule).

## Publishing

The site is served at `refficks.com` by the nginx on Refficks's own server,
beside the blog at `/blog/` and the help center at `help.refficks.com` (the
owner's choice of 23 October). Every address the site does not have goes on to
`app.refficks.com`, as the bare domain always did, so `refficks.com/terms` and
older links still land.

The product repository builds and serves all three, and says how:
`docs/operations/publishing-the-sites.md` there, with the nginx config in
`docs/operations/nginx/refficks-sites.conf` and
`scripts/ops/build-sites.sh`, which runs `npm ci`, `npm run build` and
`npm run check:policy` here and copies `dist/` into place. Nothing publishes
on a push; `.github/workflows/check.yml` builds and checks every push and
pull request.

`npm run check:policy` reads the built pages against the server's
Content-Security-Policy, which allows only the site's own files and
Cloudflare's analytics beacon: no script, style or event handler written
into a page, and no script from another host. `astro.config.mjs` keeps
Astro's small scripts in files of their own for that reason. A new external
script needs the server's policy changed in the same change.

### Analytics

Cookieless, and off unless the build is given a token. Set one of the two as
an environment variable when building (`build-sites.sh` passes it through):

- **`PUBLIC_CF_BEACON_TOKEN`: Cloudflare Web Analytics**, the owner's choice
  of 19 October. In Cloudflare, Web Analytics › Add a site, enter
  `refficks.com` (the site is not proxied through Cloudflare), and copy the
  token from the snippet it shows: the value of `"token"` in
  `data-cf-beacon`, letters and digits only. The token is public, it ships in
  every page. A value with anything else in it stops the build. Cloudflare
  counts visits (an arrival from another site or a typed address) and page
  views, not people, keeps no query strings, and has no campaign breakdown.
- **`PUBLIC_PLAUSIBLE_DOMAIN`: Plausible**, the fallback the launch plan
  names if Cloudflare's numbers prove too thin (about US$9 a month). It counts
  unique visitors with a daily identifier and breaks visits down by campaign.
  The server's policy does not allow plausible.io yet, so `check:policy`
  refuses a build with it until the policy and the check both name it.

With neither set, no analytics script is sent. Either way the footer's "No
cookies on this site" stays true. A change reaches the site at the next
build.
