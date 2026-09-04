/**
 * Depth content for /modules/<slug>/.
 *
 * The module pages rendered ~180 words each: one sentence of `short`, six
 * feature bullets and a five-step deployment list that was identical on all 39
 * of them. Thirty-nine near-identical pages is what Google's scaled-content
 * guidance is written about, and none of them could rank for the queries they
 * target.
 *
 * Content lives in one JSON file per module rather than in this file so that it
 * can be written and reviewed per module without every change touching a single
 * 300 KB source. JSON rather than TypeScript because these files are generated:
 * a stray apostrophe in prose breaks a .ts literal at build time, while a bad
 * JSON file is caught by the validator before the build runs.
 *
 * A module with no JSON file simply renders the original short page, so the
 * section is never half-broken while the set is being filled in.
 */

export interface DepthSection {
  title: string;
  body: string;
}

export interface DepthFaq {
  q: string;
  a: string;
}

/** A country-specific note. `country` must match a COUNTRIES slug in site.ts. */
export interface DepthRegional {
  country: string;
  note: string;
}

export interface ModuleDepth {
  slug: string;
  /** Optional hand-written meta description. Falls back to the tagline. */
  metaDescription?: string;
  /** 2-3 paragraphs. Plain text, one paragraph per array entry. */
  intro: string[];
  /** Who this module is actually for, and who it is not for. */
  whoFor: string[];
  /** What it does, in real operational detail. */
  capabilities: DepthSection[];
  /** How it is configured on a real project - the part competitors omit. */
  setup: DepthSection[];
  /** Where implementations go wrong. This is the differentiating content. */
  pitfalls: DepthSection[];
  /** Other Odoo modules or third-party systems it depends on or pairs with. */
  worksWith: string[];
  /** Country-specific considerations. Drives the per-country relevance. */
  regional: DepthRegional[];
  faqs: DepthFaq[];
}

const files = import.meta.glob<{ default: ModuleDepth }>('./module-depth/*.json', {
  eager: true,
});

export const MODULE_DEPTH: Record<string, ModuleDepth> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => {
    const slug = path.replace(/^.*\//, '').replace(/\.json$/, '');
    // The filename is authoritative: it is what the route is built from, so a
    // `slug` typo inside the JSON cannot silently orphan the content.
    return [slug, { ...(mod.default ?? (mod as unknown as ModuleDepth)), slug }];
  })
);

export function moduleDepth(slug: string): ModuleDepth | undefined {
  return MODULE_DEPTH[slug];
}
