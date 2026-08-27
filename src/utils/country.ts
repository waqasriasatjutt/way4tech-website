/*
 * Country matching and ranking helpers.
 *
 * This logic started in the frontmatter of /countries/[slug].astro and was then
 * copied by hand into /services/[slug]/[country].astro. Two more cross routes are
 * planned, so it lives here instead.
 *
 * Astro hoists getStaticPaths out of component scope: a const declared in page
 * frontmatter is invisible inside it. An import is visible. That is the main reason
 * this module exists, and the reason new cross routes should import from here rather
 * than re-declare.
 *
 * Nothing in this file asserts a fact. It only decides ordering, grouping and badge
 * colour. Every printed claim comes from country-detail.ts and is rendered verbatim.
 */

import { COUNTRIES, PRODUCTS, CASE_STUDIES } from '~/data/site';
import type { CountryProvider, OdooSupport } from '~/data/country-detail';

export type CountryRec = (typeof COUNTRIES)[number];
export type ProductRec = (typeof PRODUCTS)[number];
export type CaseRec = (typeof CASE_STUDIES)[number];

/* ── Name aliases, derived from the title string only ──────────────
   'Saudi Arabia (KSA)' -> ['saudi arabia', 'ksa', 'sa']
   'United Arab Emirates' -> ['united arab emirates', 'uae']
   Used to match case studies, which store a short country label. */
export function aliasesOf(title: string): string[] {
  const paren = title.match(/\(([^)]+)\)/);
  const base = title.replace(/\s*\([^)]*\)\s*/, ' ').trim();
  const words = base.split(/\s+/);
  const out = [base];
  if (paren) out.push(paren[1]);
  if (words.length > 1) out.push(words.map(w => w[0]).join('').toUpperCase());
  return out.map(a => a.toLowerCase());
}

/* 'Saudi Arabia (KSA)' -> 'Saudi Arabia'. The parenthetical is a search alias,
   not part of the country name in running prose. */
export function plainNameOf(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*/, ' ').trim();
}

/* Region grouping is used only to order case studies and the country
   list in the sidebar. It is never printed as a claim. */
export const REGION_OF: Record<string, string> = {
  'saudi-arabia': 'gulf', 'uae': 'gulf', 'qatar': 'gulf', 'kuwait': 'gulf', 'oman': 'gulf', 'bahrain': 'gulf',
  'egypt': 'me', 'jordan': 'me', 'turkey': 'me',
  'pakistan': 'sasia', 'india': 'sasia', 'bangladesh': 'sasia',
  'united-kingdom': 'eu', 'germany': 'eu', 'france': 'eu',
  'united-states': 'na', 'canada': 'na',
  'australia': 'apac',
};

export function regionOf(slug: string): string {
  return REGION_OF[slug] || '';
}

/* ── Deterministic rotation so the filler tail differs page to page ──
   Bound to one country index, so call sites stay rotIdx(i, len, step). */
export function makeRotIdx(countryIndex: number): (i: number, len: number, step: number) => number {
  return (i: number, len: number, step: number) => (i + countryIndex * step) % len;
}

export function countryIndexOf(slug: string): number {
  return Math.max(0, COUNTRIES.findIndex((c: CountryRec) => c.slug === slug));
}

/* ── Themes, read off the highlights a country already carries ─────
   No new facts are introduced here. These only decide which existing
   services, products and modules get linked first. */
export interface CountryThemes {
  einvoicing: boolean;
  tax: boolean;
  payroll: boolean;
  pos: boolean;
  bilingual: boolean;
}

export function themesOf(country: CountryRec): CountryThemes {
  const hay = `${country.title} ${country.tagline} ${country.highlights.join(' ')}`.toLowerCase();
  const hasText = (...needles: string[]) => needles.some(n => hay.includes(n));
  const hasToken = (...tokens: string[]) => tokens.some(t => new RegExp(`\\b${t}\\b`, 'i').test(hay));

  return {
    einvoicing: hasText('e-invoic', 'fatoorah', 'e-fatura', 'arşiv', 'mushak', 'irn', 'e-way', 'peppol', 'fec file'),
    tax: hasToken('vat', 'gst', 'hst', 'pst', 'kdv', 'tax', 'bas', 'gobd', 'skr03', 'skr04', 'elster', 'mtd', 'avalara', 'taxjar'),
    payroll: hasText('payroll', 'social security', 'social insurance', 'labor law', 'gosi', 'eobi', 'provident fund', 'sessi', 'pifss', 'pasi', 'nosi', 'sgk', 'wps', 'gratuity', 'pension', 'superannuation', 'lohn', 'dsn') || hasToken('sio', 'ssc', 'esi', 'esic', 'cpp', 'stp', 'rti'),
    pos: hasToken('pos'),
    bilingual: hasText('arabic', 'bilingual', 'rtl', 'urdu', 'bangla', 'english'),
  };
}

/* ── Products: scored against the highlight words of the country ──── */
const STOP = new Set([
  'with', 'from', 'that', 'this', 'your', 'their', 'into', 'odoo', 'tracking', 'management',
  'system', 'file', 'files', 'compliance', 'reporting', 'filing', 'filings', 'templates',
  'layouts', 'interfaces', 'ready', 'phase', 'auto', 'generation', 'first', 'real',
]);

export function countryTokensOf(country: CountryRec): string[] {
  return Array.from(new Set(
    country.highlights.join(' ').toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/[\s-]+/)
      .filter((w: string) => w.length >= 4 && !STOP.has(w)),
  ));
}

export function namesCountry(text: string, names: string[]): boolean {
  return names.some(a => a.length >= 3 && new RegExp(`\\b${a}\\b`, 'i').test(text));
}

/* Bound to one country so call sites stay productScore(p). */
export function makeProductScore(country: CountryRec, themes: CountryThemes): (p: ProductRec) => number {
  const aliasList = aliasesOf(country.title);
  const countryTokens = countryTokensOf(country);

  return function productScore(p: ProductRec): number {
    const t = `${p.title} ${p.tagline} ${p.short} ${p.category}`.toLowerCase();
    /* A module named for another country never belongs on this page. */
    const foreign = COUNTRIES.some((c: CountryRec) => c.slug !== country.slug && namesCountry(t, aliasesOf(c.title)));
    if (foreign) return -100;
    let score = 0;
    if (namesCountry(t, aliasList)) score += 40;
    for (const tok of countryTokens) if (t.includes(tok)) score += 6;
    if (themes.payroll && p.category === 'HRMS') score += 8;
    if (themes.pos && p.category === 'POS') score += 8;
    return score;
  };
}

/* Score every product, then walk the pool capping any one category at 3 so 18
   pages do not all show the same HRMS block. */
export function selectCountryProducts(
  country: CountryRec,
  themes: CountryThemes,
  countryIndex: number,
  limit = 6,
  categoryCap = 3,
): ProductRec[] {
  const rotIdx = makeRotIdx(countryIndex);
  const productScore = makeProductScore(country, themes);

  const productPool = PRODUCTS
    .map((p: ProductRec, i: number) => ({ p, i, score: productScore(p) }))
    .sort((a, b) => b.score - a.score || rotIdx(a.i, PRODUCTS.length, 7) - rotIdx(b.i, PRODUCTS.length, 7));

  const picked: ProductRec[] = [];
  const catSeen: Record<string, number> = {};
  for (const x of productPool) {
    const c = x.p.category;
    if ((catSeen[c] || 0) >= categoryCap) continue;
    picked.push(x.p);
    catSeen[c] = (catSeen[c] || 0) + 1;
    if (picked.length === limit) break;
  }
  return picked;
}

/* ── Case studies: exact country first, then same region ─────────── */
export function slugForCountryName(name: string): string {
  const n = name.trim().toLowerCase();
  const hit = COUNTRIES.find((c: CountryRec) => aliasesOf(c.title).includes(n));
  return hit ? hit.slug : '';
}

/* Bound to one country so call sites stay caseRank(cs). */
export function makeCaseRank(country: CountryRec): (cs: CaseRec) => number {
  const myRegion = regionOf(country.slug);
  return function caseRank(cs: CaseRec): number {
    const s = slugForCountryName(cs.country);
    if (s && s === country.slug) return 0;
    if (s && myRegion && REGION_OF[s] === myRegion) return 1;
    return 2;
  };
}

/* ── Provider filters ──────────────────────────────────────────────
   native = ships with Odoo. nonNative = a paid connector, a community
   module, or a build, which is the part quotes usually miss. */
export const native = (list: CountryProvider[] | undefined): CountryProvider[] =>
  (list || []).filter(p => p.support === 'native');

export const nonNative = (list: CountryProvider[] | undefined): CountryProvider[] =>
  (list || []).filter(p => p.support !== 'native');

/* ── Support badge colours ─────────────────────────────────────────
   Colour reads as cost to the buyer: shipped with Odoo, community
   module, paid connector, build. */
export const SUPPORT_CLASS: Record<OdooSupport, string> = {
  native: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  oca_or_community: 'bg-ink-100 text-ink-700 ring-ink-300',
  third_party_paid: 'bg-amber-50 text-amber-800 ring-amber-200',
  custom_build: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export const supportClass = (s: OdooSupport): string => SUPPORT_CLASS[s] || SUPPORT_CLASS.custom_build;

/* The service-crossed-with-market route was hand-copied and drifted three tokens
   off the map above: emerald-800 not emerald-700, ring-ink-200 not ring-ink-300,
   rose-800 not rose-700. Kept verbatim so that route renders unchanged. Collapsing
   the two palettes is a design decision, not a refactor, so it is left alone. */
export const SUPPORT_CLASS_CROSS: Record<OdooSupport, string> = {
  native: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  oca_or_community: 'bg-ink-100 text-ink-700 ring-ink-200',
  third_party_paid: 'bg-amber-50 text-amber-800 ring-amber-200',
  custom_build: 'bg-rose-50 text-rose-800 ring-rose-200',
};

export const supportClassCross = (s: OdooSupport): string =>
  SUPPORT_CLASS_CROSS[s] || SUPPORT_CLASS_CROSS.custom_build;
