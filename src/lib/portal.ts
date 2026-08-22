/**
 * Build-time content overrides from portal.way4tech.com.
 *
 * Any page authored in Odoo (websites.portal.page, host way4tech.com) wins over
 * the static Astro page. If Odoo is unreachable, or no site record exists, or a
 * page is not authored there, the static content stands and the build is silent.
 * Publishing in Odoo fires the existing /api/rebuild webhook, same as the blog.
 */

const HOST = 'way4tech.com';
const API = process.env.PORTAL_API_URL || process.env.ODOO_URL || 'https://portal.way4tech.com';
const TIMEOUT = 10000;

export interface PortalOverride {
  id: number;
  title?: string;
  metaTitle?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  schema?: unknown;
  htmlBody?: string;
  cssBody?: string;
  updatedAt?: string;
}

/** Both "/x" and "x/" normalise to "/x/" so lookups match Astro pathnames. */
function normalise(p: string): string {
  let s = (p || '/').trim();
  if (!s.startsWith('/')) s = '/' + s;
  if (!s.endsWith('/')) s += '/';
  return s.replace(/\/{2,}/g, '/');
}

async function getJson(url: string): Promise<any | null> {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function load(): Promise<Map<string, PortalOverride>> {
  const out = new Map<string, PortalOverride>();

  // One cheap call. A missing site record returns 404, so nothing else runs.
  const index = await getJson(`${API}/wp/api/sitemap?host=${encodeURIComponent(HOST)}&format=json`);
  const urls: any[] = (index && index.ok && Array.isArray(index.urls)) ? index.urls : [];
  const slugs = urls.filter(u => u && u.type === 'page' && typeof u.loc === 'string').map(u => u.loc);
  if (!slugs.length) return out;

  const fetched = await Promise.all(
    slugs.map(slug => getJson(`${API}/wp/api/page?host=${encodeURIComponent(HOST)}&slug=${encodeURIComponent(slug)}`)),
  );

  fetched.forEach((res, i) => {
    const p = res && res.ok && res.page;
    if (!p) return;
    const meta = p.meta || {};
    out.set(normalise(p.slug || slugs[i]), {
      id: p.id,
      title: p.title || undefined,
      metaTitle: meta.title || undefined,
      description: meta.description || undefined,
      canonical: meta.canonical || undefined,
      noindex: meta.noindex === true,
      ogTitle: meta.og_title || undefined,
      ogDescription: meta.og_description || undefined,
      schema: p.schema || undefined,
      htmlBody: p.editor_mode === 'visual' ? (p.html_body || '') : '',
      cssBody: p.editor_mode === 'visual' ? (p.css_body || '') : '',
      updatedAt: p.published_at || undefined,
    });
  });

  if (out.size) console.log(`[portal] ${out.size} page override(s) loaded from Odoo`);
  return out;
}

let cache: Promise<Map<string, PortalOverride>> | null = null;

/** Memoised: one fetch per build, not one per page. */
export function getPortalOverrides(): Promise<Map<string, PortalOverride>> {
  if (!cache) cache = load();
  return cache;
}

export async function portalOverride(path: string): Promise<PortalOverride | undefined> {
  return (await getPortalOverrides()).get(normalise(path));
}
