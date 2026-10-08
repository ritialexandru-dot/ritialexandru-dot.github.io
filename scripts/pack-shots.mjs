/**
 * Turns the capture's PNGs (device scale 2) into the WebP files the site
 * serves: `name.webp` at the crop's CSS size for 1x screens and `name@2x.webp`
 * at the full capture for 2x, so each screen downloads the one it can show.
 *
 *   node scripts/pack-shots.mjs /tmp/shots
 */
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const from = process.argv[2];
if (!from || !existsSync(join(from, "sizes.json"))) {
  console.error("usage: node scripts/pack-shots.mjs <directory written by capture-shots.mjs>");
  process.exit(1);
}

const sizes = JSON.parse(readFileSync(join(from, "sizes.json"), "utf8"));
const to = join(process.cwd(), "public", "shots");
mkdirSync(to, { recursive: true });

const report = {};

for (const name of readdirSync(from)) {
  if (!name.endsWith(".png") || name.startsWith("raw-")) continue;
  const base = name.replace(/\.png$/, "");
  const source = sharp(join(from, name));
  const meta = await source.metadata();
  const css = sizes[base] ?? { width: Math.round(meta.width / 2), height: Math.round(meta.height / 2) };

  const twoX = await sharp(join(from, name)).webp({ quality: 78, effort: 6 }).toBuffer();
  const oneX = await sharp(join(from, name))
    .resize({ width: css.width, height: css.height, fit: "fill", kernel: "lanczos3" })
    .webp({ quality: 84, effort: 6 })
    .toBuffer();

  writeFileSync(join(to, `${base}@2x.webp`), twoX);
  writeFileSync(join(to, `${base}.webp`), oneX);
  report[base] = { ...css, oneX: oneX.length, twoX: twoX.length };
  console.log(
    `${base}: ${css.width}×${css.height}  1x ${Math.round(oneX.length / 1024)} KB  2x ${Math.round(twoX.length / 1024)} KB`,
  );
}

writeFileSync(join(to, "sizes.json"), JSON.stringify(report, null, 2));
