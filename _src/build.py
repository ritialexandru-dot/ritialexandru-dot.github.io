#!/usr/bin/env python3
"""
Assembles the static site from _src/ into plain HTML at the repository root.

There is no runtime build: GitHub Pages serves the generated .html files
directly. This script exists only so the nav, footer and <head> live in one
place. Run `python3 _src/build.py` after editing anything under _src/.
"""
import os, re, sys, html

# The production origin. Canonical URLs, OG URLs and sitemap.xml all use it.
# Change this one line if the site is served from a different domain.
SITE_ORIGIN = "https://refficks.com"

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "_src")

def read(*parts):
    with open(os.path.join(*parts), encoding="utf-8") as fh:
        return fh.read()

LAYOUT = read(SRC, "layout.html")
HEADER = read(SRC, "partials", "header.html")
FOOTER = read(SRC, "partials", "footer.html")

def parse(text):
    """Split `key: value` front matter from the body on the first `---` line."""
    head, _, body = text.partition("\n---\n")
    meta = {}
    for line in head.strip().splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        key, _, value = line.partition(":")
        meta[key.strip().lower()] = value.strip()
    return meta, body.strip()

def mark_current(header, path):
    """Add aria-current to the nav link matching this page."""
    out = header.replace('data-path="%s"' % path, 'data-path="%s" aria-current="page"' % path)
    if path.startswith("/product/"):
        out = out.replace(
            '<button type="button" aria-expanded="false">Product',
            '<button type="button" aria-expanded="false" data-section="current">Product')
    return out

def out_path(path):
    if path == "/":
        return os.path.join(ROOT, "index.html")
    return os.path.join(ROOT, path.strip("/"), "index.html")

pages, errors = [], []
for name in sorted(os.listdir(os.path.join(SRC, "pages"))):
    if not name.endswith(".html"):
        continue
    meta, body = parse(read(SRC, "pages", name))
    for required in ("path", "title", "desc"):
        if not meta.get(required):
            errors.append("%s: missing `%s`" % (name, required))
    if errors:
        continue

    path = meta["path"]
    slug = "-home" if path == "/" else "-" + path.strip("/").replace("/", "-")

    page = (LAYOUT
        .replace("{{TITLE}}", html.escape(meta["title"], quote=True))
        .replace("{{DESC}}", html.escape(meta["desc"], quote=True))
        .replace("{{OGTITLE}}", html.escape(meta.get("ogtitle", meta["title"]), quote=True))
        .replace("{{OGSLUG}}", slug)
        .replace("{{ORIGIN}}", SITE_ORIGIN)
        .replace("{{PATH}}", path)
        .replace("{{HEADER}}", mark_current(HEADER, path))
        .replace("{{FOOTER}}", FOOTER)
        .replace("{{BODY}}", body))

    target = out_path(path)
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, "w", encoding="utf-8") as fh:
        fh.write(page)
    pages.append((path, os.path.relpath(target, ROOT), len(page)))

if errors:
    for err in errors:
        print("error: " + err, file=sys.stderr)
    sys.exit(1)

# sitemap.xml, generated from the pages that actually exist
urls = "\n".join(
    "  <url><loc>%s%s</loc></url>" % (SITE_ORIGIN, path) for path, _, _ in pages)
with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as fh:
    fh.write('<?xml version="1.0" encoding="UTF-8"?>\n'
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
             + urls + "\n</urlset>\n")

for path, target, size in pages:
    print("%-28s -> %-34s %6.1f KB" % (path, target, size / 1024))
print("%d pages, sitemap.xml written" % len(pages))
