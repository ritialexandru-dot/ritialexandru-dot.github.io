#!/usr/bin/env python3
"""
Bundles the whole site into ONE self-contained .html file for preview.

This is a preview tool, not a deployable artifact. It inlines the stylesheet
and script, concatenates every page's <main>, and adds a hash router so the
nav works offline or anywhere a single file can be opened.

    python3 _src/make-preview.py [output.html]

The real site is the generated .html files at the repo root; this bundle is
derived from them, so build first.
"""
import os, re, sys, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "refficks-preview.html")

def read(*p):
    with open(os.path.join(*p), encoding="utf-8") as fh:
        return fh.read()

ROUTES = ["/", "/product/intelligence/", "/product/tracking/", "/product/commissions/",
          "/product/portal/", "/developers/", "/migrate/", "/early-access/",
          "/roadmap/", "/faq/", "/privacy/", "/terms/"]

def page_file(route):
    return "index.html" if route == "/" else os.path.join(route.strip("/"), "index.html")

def rewrite_links(markup, route):
    """Site-absolute hrefs become hash routes; in-page anchors keep their route."""
    def sub(m):
        href = m.group(1)
        if href.startswith("/"):
            return 'href="#%s"' % href
        if href.startswith("#") and href != "#main":
            return 'href="#%s%s"' % (route, href)
        return m.group(0)
    return re.sub(r'href="([^"]+)"', sub, markup)

header = rewrite_links(read(ROOT, "_src/partials/header.html"), "/")
footer = rewrite_links(read(ROOT, "_src/partials/footer.html"), "/")
css = read(ROOT, "assets/css/site.css")
js = read(ROOT, "assets/js/site.js")

panels, titles = [], {}
for route in ROUTES:
    src = read(ROOT, page_file(route))
    titles[route] = html.unescape(re.search(r"<title>(.*?)</title>", src, re.S).group(1))
    body = re.search(r'<main id="main">(.*)</main>', src, re.S).group(1)
    panels.append('<div class="pv-page" data-route="%s" hidden>%s</div>'
                  % (route, rewrite_links(body, route)))

nav_titles = ",".join('"%s":%s' % (r, __import__("json").dumps(t)) for r, t in titles.items())

out = f"""<title>Refficks Marketing Site</title>
<style>
{css}

/* ---- Preview chrome. Not part of the deployed site. ---- */
.pv-bar {{
  background: var(--ink); color: #fff;
  font: 500 13px/1.5 var(--font); letter-spacing: -0.005em;
}}
.pv-bar__in {{
  max-width: var(--maxw); margin-inline: auto; padding: 10px 24px;
  display: flex; gap: 8px 18px; align-items: baseline; flex-wrap: wrap;
}}
.pv-bar b {{ font-weight: 620; }}
.pv-bar span {{ color: #9AA1AC; }}
.pv-bar code {{
  background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.16);
  color: #C8CDD5; font-size: 12px;
}}
.pv-page[hidden] {{ display: none; }}
</style>

<div class="pv-bar">
  <div class="pv-bar__in">
    <b>Preview bundle</b>
    <span>All 12 pages of refficks.com in one file. Navigation, layout and copy are the real site.</span>
    <span>Deployed, it is <code>index.html</code> plus one folder per page.</span>
  </div>
</div>

<a class="skip" href="#main" data-skip>Skip to content</a>
{header}
<main id="main" tabindex="-1">
{''.join(panels)}
</main>
{footer}

<script>
(function () {{
  "use strict";
  var TITLES = {{{nav_titles}}};
  var pages = document.querySelectorAll(".pv-page");
  var navLinks = document.querySelectorAll("[data-path]");

  function parse() {{
    var h = location.hash.slice(1);
    if (!h || h.charAt(0) !== "/") return {{ route: "/", anchor: "" }};
    var i = h.indexOf("#");
    return i === -1 ? {{ route: h, anchor: "" }}
                    : {{ route: h.slice(0, i), anchor: h.slice(i + 1) }};
  }}

  function show() {{
    var r = parse(), matched = false;
    for (var i = 0; i < pages.length; i++) {{
      var on = pages[i].getAttribute("data-route") === r.route;
      pages[i].hidden = !on;
      if (on) matched = true;
    }}
    if (!matched) {{ pages[0].hidden = false; r.route = "/"; }}

    for (var j = 0; j < navLinks.length; j++) {{
      var path = navLinks[j].getAttribute("data-path");
      if (path === r.route) navLinks[j].setAttribute("aria-current", "page");
      else navLinks[j].removeAttribute("aria-current");
    }}
    document.title = TITLES[r.route] || "Refficks Marketing Site";

    var mnav = document.querySelector("[data-mnav]");
    if (mnav) mnav.setAttribute("data-open", "false");
    var burger = document.querySelector("[data-burger]");
    if (burger) burger.setAttribute("aria-expanded", "false");

    if (r.anchor) {{
      var el = document.getElementById(r.anchor);
      if (el) {{ el.scrollIntoView(); return; }}
    }}
    window.scrollTo(0, 0);
  }}

  window.addEventListener("hashchange", show);
  show();

  var skip = document.querySelector("[data-skip]");
  if (skip) skip.addEventListener("click", function (e) {{
    e.preventDefault();
    document.getElementById("main").focus();
  }});
}})();
</script>

<script>
{js}
</script>
"""

# The artifact wrapper supplies <head>, so this file cannot carry its own
# <meta charset>. Escaping every non-ASCII character makes it charset-proof.
# (assets/css and assets/js are pure ASCII, so this is safe to apply wholesale.)
out = out.encode("ascii", "xmlcharrefreplace").decode("ascii")

with open(OUT, "w", encoding="ascii") as fh:
    fh.write(out)
print("%s  %.1f KB  (%d pages)" % (OUT, len(out) / 1024, len(ROUTES)))
