import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readFileSync, readdirSync } from 'node:fs';

// Pulled out of the data file so the sitemap can state when the country
// research was last reviewed instead of when the build happened to run.
const COUNTRY_REVIEWED = (() => {
  try {
    const src = readFileSync(new URL('./src/data/country-detail.ts', import.meta.url), 'utf8');
    const m = src.match(/COUNTRY_DETAIL_REVIEWED\s*=\s*'(\d{4}-\d{2}-\d{2})'/);
    return m ? new Date(`${m[1]}T00:00:00Z`) : null;
  } catch { return null; }
})();

// Fallback timestamp for pages with no better source.
//
// Every URL used to carry this one value. It is defensible (the site IS rebuilt
// in full each deploy) but it destroys the signal: a nightly cron rebuild
// restamps all 598 URLs as freshly modified, so Google learns the field means
// nothing here and a page that genuinely changed gets no priority. Where a real
// date exists it is used instead.
const BUILD_TIME = new Date();

// Blog posts declare their own date in frontmatter. Read once at config time
// rather than per URL. Deliberately not derived from git: the deploy workflow
// uses actions/checkout at its default shallow depth, so per-file commit dates
// are not available in CI, and file mtimes there are all checkout time.
const BLOG_DATES = (() => {
  const out = new Map();
  const dir = new URL('./src/content/blog/', import.meta.url);
  let names = [];
  try { names = readdirSync(dir); } catch { return out; }
  for (const name of names) {
    if (!name.endsWith('.mdx') && !name.endsWith('.md')) continue;
    try {
      const head = readFileSync(new URL(name, dir), 'utf8').slice(0, 800);
      const m = head.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})/m);
      if (m) out.set(name.replace(/\.mdx?$/, ''), new Date(`${m[1]}T00:00:00Z`));
    } catch { /* a post without a readable date just falls back */ }
  }
  return out;
})();

/** The most honest last-modified date we can state for a URL. */
function lastmodFor(pathname) {
  const seg = pathname.replace(/^\/|\/$/g, '').split('/');
  if (seg[0] === 'blog' && seg[1]) {
    const d = BLOG_DATES.get(seg[1]);
    if (d) return d;
  }
  // Country research carries an explicit review date, and it is the date that
  // actually matters to a reader judging whether the compliance detail is current.
  if (seg[0] === 'countries' && COUNTRY_REVIEWED) return COUNTRY_REVIEWED;
  return BUILD_TIME;
}

// Pages that must never appear in the sitemap, with and without the
// trailing slash and the .html form.
const SITEMAP_EXCLUDED = new Set(['/404', '/404/', '/404.html']);

// Per-section crawl hints. `index` is the section landing page, `child` is
// everything below it. Numbers are written out in full rather than derived,
// because 0.8 + 0.1 is not 0.9 in floating point.
const SECTION_HINTS = {
  countries: {
    index: { priority: 1.0, changefreq: 'monthly' },
    child: { priority: 0.9, changefreq: 'monthly' },
  },
  services: {
    index: { priority: 1.0, changefreq: 'monthly' },
    child: { priority: 0.9, changefreq: 'monthly' },
  },
  solutions: {
    index: { priority: 1.0, changefreq: 'monthly' },
    child: { priority: 0.9, changefreq: 'monthly' },
  },
  modules: {
    index: { priority: 0.9, changefreq: 'monthly' },
    child: { priority: 0.8, changefreq: 'monthly' },
  },
  products: {
    index: { priority: 0.9, changefreq: 'monthly' },
    child: { priority: 0.8, changefreq: 'monthly' },
  },
  integrations: {
    index: { priority: 0.9, changefreq: 'monthly' },
    child: { priority: 0.8, changefreq: 'monthly' },
  },
  industries: {
    index: { priority: 0.9, changefreq: 'monthly' },
    child: { priority: 0.8, changefreq: 'monthly' },
  },
  blog: {
    index: { priority: 0.8, changefreq: 'weekly' },
    child: { priority: 0.7, changefreq: 'weekly' },
  },
  'case-studies': {
    index: { priority: 0.8, changefreq: 'weekly' },
    child: { priority: 0.7, changefreq: 'weekly' },
  },
};

const HOME_HINT = { priority: 1.0, changefreq: 'weekly' };
const DEFAULT_HINT = { priority: 0.6, changefreq: 'monthly' };

/** Pathname of an absolute sitemap URL, falling back to the raw value. */
function pathnameOf(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return String(url);
  }
}

/** changefreq and priority for a single sitemap URL. */
function crawlHint(url) {
  const segments = pathnameOf(url).split('/').filter(Boolean);
  if (segments.length === 0) return HOME_HINT;

  const section = Object.hasOwn(SECTION_HINTS, segments[0])
    ? SECTION_HINTS[segments[0]]
    : null;
  if (!section) return DEFAULT_HINT;

  return segments.length === 1 ? section.index : section.child;
}

export default defineConfig({
  site: 'https://way4tech.com',
  // Every internal link in this repo is written with a trailing slash and the
  // live site 308-redirects the bare form, so make the config say the same.
  // Build output stays directory-format, so sitemap <loc> values keep their
  // trailing slash and the homepage stays https://way4tech.com/.
  trailingSlash: 'always',
  integrations: [
    // applyBaseStyles is off because src/styles/global.css already declares
    // @tailwind base/components/utilities itself. Left on, the integration
    // injects a SECOND sheet with the same content: the build emitted two
    // stylesheets and every page loaded both, 51.6 KB of render-blocking CSS
    // whose 639 rules were all present in the other one.
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // Also stamps <lastmod> on the sitemap-index entries.
      lastmod: BUILD_TIME,
      filter: (page) => !SITEMAP_EXCLUDED.has(pathnameOf(page)),
      serialize: (item) => ({
        ...item,
        lastmod: lastmodFor(pathnameOf(item.url)).toISOString(),
        ...crawlHint(item.url),
      }),
    }),
    mdx(),
  ],
  compressHTML: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
});
