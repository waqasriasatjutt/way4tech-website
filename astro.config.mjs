import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('./', import.meta.url));

// Pulled out of the data file so the sitemap can state when the country
// research was last reviewed instead of when the build happened to run.
// Only used when git history is unavailable.
const COUNTRY_REVIEWED = (() => {
  try {
    const src = readFileSync(new URL('./src/data/country-detail.ts', import.meta.url), 'utf8');
    const m = src.match(/COUNTRY_DETAIL_REVIEWED\s*=\s*'(\d{4}-\d{2}-\d{2})'/);
    return m ? new Date(`${m[1]}T00:00:00Z`) : null;
  } catch { return null; }
})();

// Fallback timestamp for pages with no better source.
//
// Every URL used to carry this one value, so a nightly rebuild restamped the
// whole site as freshly modified and Google learned the field means nothing.
const BUILD_TIME = new Date();

// Blog posts declare their own date in frontmatter. Fallback only.
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

/*
 * Last commit date per tracked file, read from git once at config time.
 *
 * lastmod for a URL is the newest commit touching the template that renders it
 * or the data file its content comes from (see sourcesFor). Layout, header and
 * footer are deliberately left out: a footer tweak is not a change to 600 pages.
 *
 * Needs full history. The deploy workflow checks out with fetch-depth: 0; if
 * the clone is shallow, or git is missing, this map is empty and every URL
 * falls back to the old rules (blog frontmatter date, country review date,
 * build time) rather than stamping one wrong date everywhere.
 */
const GIT_DATES = (() => {
  const out = new Map();
  try {
    const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: ROOT, encoding: 'utf8' }).trim();
    if (shallow === 'true') {
      console.warn('[sitemap] shallow clone: lastmod falls back to frontmatter/review/build dates');
      return out;
    }
    const log = execFileSync('git', ['log', '--format=%x00%cI', '--name-only', '--no-renames', '--', 'src'], {
      cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024,
    });
    let current = null;
    for (const line of log.split('\n')) {
      if (line.startsWith('\0')) { current = new Date(line.slice(1).trim()); continue; }
      const f = line.trim();
      // git log is newest first, so the first date seen for a file is its last change.
      if (f && current && !out.has(f)) out.set(f, current);
    }
  } catch (e) {
    console.warn('[sitemap] git unavailable, lastmod falls back:', e.message);
  }
  return out;
})();

/** Newest commit among files equal to, or under, each given repo path. */
function gitDateOf(paths) {
  let best = null;
  for (const p of paths) {
    if (!p) continue;
    const exact = GIT_DATES.get(p);
    if (exact && (!best || exact > best)) best = exact;
    if (p.endsWith('/')) {
      for (const [f, d] of GIT_DATES) if (f.startsWith(p) && (!best || d > best)) best = d;
    }
  }
  return best;
}

const has = (p) => existsSync(ROOT + p);

/** Section-wide data files: what the pages of a section are built from. */
const SECTION_DATA = {
  countries: ['src/data/country-detail.ts'],
  services: ['src/data/services-detail.ts'],
  products: ['src/data/modules-catalog.ts', 'src/data/module-media.ts'],
  modules: ['src/data/module-depth.ts'],
  solutions: ['src/data/solution-depth.ts'],
  industries: ['src/data/industries-detail.ts', 'src/data/industries/'],
  integrations: ['src/data/integrations-detail.ts'],
  compare: ['src/data/comparisons.ts'],
  ar: ['src/data/ar-content.ts'],
  tr: ['src/data/tr-content.ts'],
  'windows-apps': ['src/data/windows-apps.ts', 'src/data/windows-apps-release.json'],
  learn: ['src/data/owl-course.ts'],
};

/** The repo files whose last change is the last change of this URL. */
function sourcesFor(pathname) {
  const seg = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  const [a, b, c] = seg;
  const data = SECTION_DATA[a] || [];
  if (seg.length === 0) return ['src/pages/index.astro', 'src/data/site.ts'];
  if (a === 'blog' && b) return [`src/content/blog/${b}.mdx`, `src/content/blog/${b}.md`];
  if (a === 'blog') return ['src/pages/blog/index.astro', 'src/content/blog/'];
  if (a === 'odoo-guides' && b) return [`src/content/guides/${b}.mdx`, 'src/pages/odoo-guides/[slug].astro'];
  if (a === 'odoo-guides') return ['src/pages/odoo-guides/index.astro', 'src/content/guides/'];
  if (a === 'learn' && b === 'odoo-owl' && c) return [`src/content/course/${c}.mdx`];
  if (a === 'learn' && b === 'odoo-owl') return ['src/pages/learn/odoo-owl/index.astro', 'src/content/course/', ...data];
  if (a === 'author') return [`src/pages/author/${b}.astro`, 'src/data/modules-catalog.ts', 'src/content/blog/'];
  if (a === 'case-studies') return ['src/pages/case-studies/index.astro', 'src/data/site.ts'];
  if (a === 'countries' && b && c === 'cost') return ['src/pages/countries/[slug]/cost.astro', ...data];
  if (a === 'countries' && b && c) return ['src/pages/countries/[slug]/[topic].astro', ...data];
  if (a === 'countries' && b) return ['src/pages/countries/[slug].astro', ...data];
  if (a === 'services' && b && c) return ['src/pages/services/[slug]/[country].astro', ...data, 'src/data/country-detail.ts'];
  if (a === 'modules' && b) return ['src/pages/modules/[slug].astro', `src/data/module-depth/${b}.json`, ...data];
  if (a === 'solutions' && b) return ['src/pages/solutions/[slug].astro', `src/data/solution-depth/${b}.json`, ...data];
  if (a === 'tr' && b === 'turkey') return ['src/pages/tr/turkey.astro', ...data];
  if (a === 'tr' && b) return ['src/pages/tr/[topic].astro', ...data];
  if (a && b && has(`src/pages/${a}/[slug].astro`)) return [`src/pages/${a}/[slug].astro`, ...data];
  // Section index or a standalone page.
  for (const p of [`src/pages/${seg.join('/')}.astro`, `src/pages/${seg.join('/')}/index.astro`]) {
    if (has(p)) return [p, ...data];
  }
  // A single-segment Windows app page (/tracker/, /bridge/ ...).
  if (seg.length === 1) return ['src/pages/[winapp]/index.astro', ...SECTION_DATA['windows-apps']];
  return [];
}

/** The most honest last-modified date we can state for a URL. */
function lastmodFor(pathname) {
  const fromGit = gitDateOf(sourcesFor(pathname));
  if (fromGit) return fromGit;
  const seg = pathname.replace(/^\/|\/$/g, '').split('/');
  if (seg[0] === 'blog' && seg[1]) {
    const d = BLOG_DATES.get(seg[1]);
    if (d) return d;
  }
  if (seg[0] === 'countries' && COUNTRY_REVIEWED) return COUNTRY_REVIEWED;
  return BUILD_TIME;
}

/*
 * Index policy. /services/<service>/<country>/ and /countries/<country>/<topic>/
 * pages are noindex,follow except the topic pages listed in
 * src/data/index-policy.json; the same file drives the robots meta in those
 * templates, so the sitemap and the pages cannot disagree.
 */
const INDEXABLE_TOPICS = (() => {
  try {
    const j = JSON.parse(readFileSync(new URL('./src/data/index-policy.json', import.meta.url), 'utf8'));
    return new Set(j.indexableCountryTopics || []);
  } catch {
    return new Set();
  }
})();

function isNoindexed(pathname) {
  const seg = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  if (seg[0] === 'services' && seg.length === 3) return true;
  if (seg[0] === 'countries' && seg.length === 3) return !INDEXABLE_TOPICS.has(`${seg[1]}/${seg[2]}`);
  return false;
}


// Pages that must never appear in the sitemap, with and without the
// trailing slash and the .html form.
const SITEMAP_EXCLUDED = new Set(['/404', '/404/', '/404.html']);

// A /solutions/<slug>/ page that has an /industries/<slug>/ twin declares that
// twin canonical (see src/pages/solutions/[slug].astro). Submitting a URL that
// canonicalises elsewhere spends crawl budget to be told to look somewhere
// else, so those twins are kept out of the sitemap. The condition is read from
// the same two sources the page uses, rather than listed here, so adding an
// industry cannot leave a stale slug behind.
const CANONICALISED_SOLUTIONS = (() => {
  try {
    const read = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');

    const site = read('./src/data/site.ts');
    const industriesBlock = (site.match(/export const INDUSTRIES[\s\S]*?^\];/m) || [''])[0];
    const industrySlugs = new Set(
      [...industriesBlock.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]),
    );

    // INDUSTRY_DETAIL is spread together from these four sources.
    const detailSlugs = new Set(
      [
        './src/data/industries-detail.ts',
        './src/data/industries/services.ts',
        './src/data/industries/trade.ts',
        './src/data/industries/professional.ts',
      ].flatMap((f) => [...read(f).matchAll(/^  '([a-z0-9-]+)':/gm)].map((m) => m[1])),
    );

    return new Set(
      [...industrySlugs].filter((s) => detailSlugs.has(s)).map((s) => `/solutions/${s}/`),
    );
  } catch {
    return new Set();
  }
})();


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
  'windows-apps': {
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
  'odoo-guides': {
    index: { priority: 0.8, changefreq: 'monthly' },
    child: { priority: 0.8, changefreq: 'monthly' },
  },
  blog: {
    index: { priority: 0.8, changefreq: 'weekly' },
    child: { priority: 0.7, changefreq: 'weekly' },
  },
  'case-studies': {
    index: { priority: 0.8, changefreq: 'monthly' },
    child: { priority: 0.7, changefreq: 'monthly' },
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
      filter: (page) =>
        !SITEMAP_EXCLUDED.has(pathnameOf(page)) &&
        !CANONICALISED_SOLUTIONS.has(pathnameOf(page)) &&
        !isNoindexed(pathnameOf(page)),
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
