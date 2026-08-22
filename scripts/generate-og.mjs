/**
 * generate-og.mjs
 *
 * One-off generator for public/og.png, the 1200x630 Open Graph / Twitter card
 * image referenced by src/layouts/Base.astro on every page.
 *
 * The output PNG is committed to the repo. This script is NOT part of the Astro
 * build and its two dependencies are deliberately NOT in package.json, so the
 * site keeps building with its existing dependency set.
 *
 * To regenerate:
 *
 *   mkdir /tmp/ogbuild && cd /tmp/ogbuild
 *   npm init -y && npm install satori @resvg/resvg-js
 *   OG_DEPS=/tmp/ogbuild node /path/to/repo/scripts/generate-og.mjs
 *
 * On Windows PowerShell:
 *
 *   $env:OG_DEPS = "C:\tmp\ogbuild"; node .\scripts\generate-og.mjs
 *
 * OG_DEPS points at the throwaway folder holding node_modules. If it is unset,
 * the current working directory is used. Inter is downloaded from jsDelivr and
 * cached outside the repo; if the network is unavailable the script falls back
 * to a heavy system font.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '..');
const OUT_FILE = join(REPO_ROOT, 'public', 'og.png');

const WIDTH = 1200;
const HEIGHT = 630;
const MAX_BYTES = 500 * 1024;

/* Brand tokens, kept in sync with tailwind.config.mjs */
const BRAND = {
  purple500: '#875A7B', // brand-500, light end of bg-odoo-gradient
  purple700: '#5C3D54', // brand-700, dark end of bg-odoo-gradient
  ink900: '#1a1230', // ink-900
  teal: '#00A09D', // accent-400
};

/* ------------------------------------------------------------------ deps -- */

const depsDir = resolve(process.env.OG_DEPS || process.cwd());
const req = createRequire(join(depsDir, 'package.json'));

let satori;
let Resvg;
try {
  const mod = await import(pathToFileURL(req.resolve('satori')).href);
  satori = mod.default?.default ?? mod.default ?? mod;
  ({ Resvg } = req('@resvg/resvg-js'));
} catch (err) {
  console.error(`Could not load satori / @resvg/resvg-js from ${depsDir}`);
  console.error('Install them in a throwaway folder and set OG_DEPS to it.');
  console.error(String(err?.message || err));
  process.exit(1);
}

/* ----------------------------------------------------------------- fonts -- */

const FONT_VERSION = '5.0.16';
const FONT_CACHE = resolve(
  process.env.OG_FONT_CACHE || join(os.tmpdir(), 'way4tech-og-fonts')
);

/* Heavy system faces, used only when the download fails. */
const SYSTEM_FALLBACKS = {
  800: [
    'C:/Windows/Fonts/seguibl.ttf',
    'C:/Windows/Fonts/arialbd.ttf',
    '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  ],
  600: [
    'C:/Windows/Fonts/seguisb.ttf',
    'C:/Windows/Fonts/arialbd.ttf',
    '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  ],
};

async function loadInter(weight) {
  const name = `inter-latin-${weight}-normal.woff`;
  const cached = join(FONT_CACHE, name);
  if (existsSync(cached)) return readFileSync(cached);

  const url = `https://cdn.jsdelivr.net/npm/@fontsource/inter@${FONT_VERSION}/files/${name}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(FONT_CACHE, { recursive: true });
  writeFileSync(cached, buf);
  return buf;
}

async function loadFace(weight) {
  try {
    const data = await loadInter(weight);
    return { name: 'Inter', data, weight, style: 'normal' };
  } catch (err) {
    console.warn(`Inter ${weight} unavailable (${err.message}); trying a system font.`);
    for (const candidate of SYSTEM_FALLBACKS[weight]) {
      if (existsSync(candidate)) {
        console.warn(`Using fallback face ${candidate}`);
        return { name: 'Inter', data: readFileSync(candidate), weight, style: 'normal' };
      }
    }
    throw new Error(`No font available for weight ${weight}`);
  }
}

const fonts = [await loadFace(800), await loadFace(600)];

/* ----------------------------------------------------------- hexagon mark -- */

/* Same hexagon geometry as public/favicon.svg, inverted to white so it reads
   against the purple background. Rasterised first so satori only has to place
   a bitmap, which keeps the final SVG free of nested vector images. */
const hexSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 64 64">
  <path d="M32 2 L60 17 L60 47 L32 62 L4 47 L4 17 Z" fill="#ffffff"/>
  <circle cx="56" cy="14" r="5" fill="${BRAND.teal}"/>
</svg>`;

const hexPng = new Resvg(hexSvg, { fitTo: { mode: 'width', value: 192 } })
  .render()
  .asPng();
const hexDataUri = `data:image/png;base64,${hexPng.toString('base64')}`;

/* ---------------------------------------------------------------- layout -- */

const el = (type, props, ...children) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
});

const tree = el(
  'div',
  {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: WIDTH,
      height: HEIGHT,
      padding: '76px 84px',
      fontFamily: 'Inter',
      backgroundColor: BRAND.purple700,
      backgroundImage: `linear-gradient(135deg, ${BRAND.purple500} 0%, ${BRAND.purple700} 52%, ${BRAND.ink900} 100%)`,
    },
  },
  /* accent ring, bleeding off the top right corner clear of all text */
  el('div', {
    style: {
      position: 'absolute',
      display: 'flex',
      right: -170,
      top: -200,
      width: 440,
      height: 440,
      borderRadius: 220,
      border: `14px solid rgba(0,160,157,0.32)`,
    },
  }),
  /* logo lockup */
  el(
    'div',
    { style: { display: 'flex', alignItems: 'center' } },
    el(
      'div',
      {
        style: {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 96,
          height: 96,
        },
      },
      el('img', {
        src: hexDataUri,
        width: 96,
        height: 96,
        style: { position: 'absolute', top: 0, left: 0 },
      }),
      el(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: -1,
            color: BRAND.purple700,
          },
        },
        'W4'
      )
    ),
    el(
      'div',
      {
        style: {
          display: 'flex',
          marginLeft: 28,
          fontSize: 46,
          fontWeight: 800,
          letterSpacing: 2,
          color: '#ffffff',
        },
      },
      'WAY4TECH'
    )
  ),
  /* headline */
  el(
    'div',
    { style: { display: 'flex', maxWidth: 1000 } },
    el(
      'div',
      {
        style: {
          display: 'flex',
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 1.16,
          letterSpacing: -1.5,
          color: '#ffffff',
        },
      },
      'Odoo implementation, customization and support'
    )
  ),
  /* footer */
  el(
    'div',
    { style: { display: 'flex', alignItems: 'center' } },
    el('div', {
      style: {
        display: 'flex',
        width: 72,
        height: 8,
        borderRadius: 4,
        backgroundColor: BRAND.teal,
      },
    }),
    el(
      'div',
      {
        style: {
          display: 'flex',
          marginLeft: 26,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 0.5,
          color: 'rgba(255,255,255,0.9)',
        },
      },
      'way4tech.com'
    )
  )
);

/* ----------------------------------------------------------------- render -- */

const svg = await satori(tree, { width: WIDTH, height: HEIGHT, fonts });

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: WIDTH },
  background: BRAND.purple700,
})
  .render()
  .asPng();

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, png);

/* ----------------------------------------------------------------- verify -- */

const bytes = readFileSync(OUT_FILE);
const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const problems = [];

if (!bytes.subarray(0, 8).equals(signature)) problems.push('bad PNG signature');
if (bytes.subarray(12, 16).toString('latin1') !== 'IHDR') problems.push('no IHDR chunk');

const w = bytes.readUInt32BE(16);
const h = bytes.readUInt32BE(20);
if (w !== WIDTH || h !== HEIGHT) problems.push(`size is ${w}x${h}, expected ${WIDTH}x${HEIGHT}`);
if (bytes.length > MAX_BYTES) problems.push(`${bytes.length} bytes exceeds ${MAX_BYTES}`);

console.log(`wrote ${OUT_FILE}`);
console.log(`  signature ${bytes.subarray(0, 8).toString('hex')}`);
console.log(`  dimensions ${w}x${h}`);
console.log(`  size ${(bytes.length / 1024).toFixed(1)} KB`);

if (problems.length) {
  console.error('FAILED: ' + problems.join('; '));
  process.exit(1);
}
console.log('  ok');
