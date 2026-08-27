import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// One timestamp for the whole build. The site is rebuilt in full on every
// deploy, so a single build-time <lastmod> is accurate for every URL.
const BUILD_TIME = new Date();

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
        lastmod: BUILD_TIME.toISOString(),
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
