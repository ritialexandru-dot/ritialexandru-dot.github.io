/*
 * Regenerates assets/img/og-*.png (1200x630) from _src/og-template.html,
 * one per page, using each page's <meta property="og:title">.
 *
 *   npm i playwright        # or point executablePath at any Chromium
 *   node _src/make-og.js
 *
 * Run it after changing a page's `ogtitle`, or after editing the card design.
 */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PAGES = [['/','og-home'],['/product/intelligence/','og-product-intelligence'],
  ['/product/tracking/','og-product-tracking'],['/product/commissions/','og-product-commissions'],
  ['/product/portal/','og-product-portal'],['/developers/','og-developers'],['/migrate/','og-migrate'],
  ['/early-access/','og-early-access'],['/roadmap/','og-roadmap'],['/faq/','og-faq'],
  ['/privacy/','og-privacy'],['/terms/','og-terms']];
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  for (const [p, slug] of PAGES) {
    const file = p === '/' ? 'index.html' : path.join(p.replace(/^\/|\/$/g, ''), 'index.html');
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const title = (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1]
      .replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    const page = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.goto('file://' + ROOT + '/_src/og-template.html', { waitUntil: 'networkidle' });
    await page.evaluate(t => {
      const h = document.getElementById('t');
      h.textContent = t;
      if (t.length > 58) h.className = 'xs';
      else if (t.length > 40) h.className = 'sm';
    }, title);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(ROOT, 'assets/img', slug + '.png') });
    await page.close();
    console.log(slug + '  <- ' + title);
  }
  await b.close();
})();
