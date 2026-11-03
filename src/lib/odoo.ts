/**
 * Build-time Odoo fetcher for blog posts.
 *
 * The Odoo portal is the only source of the blog: every post on /blog/ is a
 * blog.post in the "Way4Tech" blog (website_published=true), written, edited,
 * unpublished and deleted from portal.way4tech.com. Odoo calls /api/rebuild on
 * each of those changes and the site is rebuilt with the new content.
 *
 * Env vars (set locally in .env and in CI):
 *   ODOO_URL       e.g. https://portal.way4tech.com
 *   ODOO_DB        e.g. portal.way4tech.com
 *   ODOO_USER      any user that can read published posts
 *   ODOO_PASSWORD  password
 *   ODOO_BLOG_ID   blog.blog id, default 1 ("Way4Tech")
 *
 * A failed fetch FAILS THE BUILD. It used to fall back to an empty list, which
 * was harmless while the posts lived in the repo; now it would deploy a site
 * with every post gone and all of their URLs 404. A failed build leaves the
 * last good deploy live instead. Locally, missing env vars only warn so the
 * rest of the site can still be worked on.
 */

import { mkdirSync, writeFileSync } from 'node:fs';

export interface OdooBlogPost {
  id: number;
  slug: string;
  title: string;
  /* The <title>; the H1 keeps the full headline. */
  metaTitle?: string;
  description: string;
  subtitle?: string;
  contentHtml: string;
  author: string;
  tags: string[];
  postDate: Date;
  writeDate: Date;
}

/* Where the sitemap reads each post's last-modified date (astro.config.mjs).
   Written here because the sitemap is generated after the pages, in a context
   that cannot call Odoo itself. */
export const BLOG_DATES_FILE = 'node_modules/.cache/way4tech/blog-dates.json';

const MIN_WORDS = 300;

function slugify(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function odooDate(value: string | false): Date | null {
  return value ? new Date(value.replace(' ', 'T') + 'Z') : null;
}

async function rpc(url: string, path: string, params: unknown, cookie?: string): Promise<{ result: any; cookie?: string }> {
  const r = await fetch(`${url}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params }),
  });
  const data: any = await r.json();
  if (data.error) throw new Error(`Odoo error ${path}: ${data.error.data?.message || data.error.message}`);
  return { result: data.result, cookie: r.headers.get('set-cookie') || cookie };
}

/* A post below the floor is a test or an unfinished draft that was published
   by mistake: it is left out and named in the build log. */
function longEnough(p: any): boolean {
  const words = String(p.content || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < MIN_WORDS) {
    console.warn(`[odoo] skipping blog.post ${p.id} "${p.name}": ${words} words, under ${MIN_WORDS}`);
    return false;
  }
  return true;
}

/* Images and files inserted with the Odoo editor are served by the portal, and
   their src is site-relative. */
function absolutize(html: string, base: string): string {
  return html.replace(/(\s(?:src|href|srcset)=")\/(web|website)\//g, `$1${base}/$2/`);
}

async function load(): Promise<OdooBlogPost[]> {
  const url = (process.env.ODOO_URL || '').replace(/\/+$/, '');
  const db = process.env.ODOO_DB;
  const user = process.env.ODOO_USER;
  const pass = process.env.ODOO_PASSWORD;
  const blogId = Number(process.env.ODOO_BLOG_ID || 1);
  if (!url || !db || !user || !pass) {
    if (process.env.CI) throw new Error('[odoo] ODOO_* env vars missing: refusing to build a site without its blog');
    console.warn('[odoo] env vars missing - building locally with no blog posts');
    return [];
  }

  const auth = await rpc(url, '/web/session/authenticate', { db, login: user, password: pass });
  if (!auth.result?.uid) throw new Error('[odoo] authentication failed');
  const cookie = auth.cookie;

  const { result: raw } = await rpc(
    url,
    '/web/dataset/call_kw',
    {
      model: 'blog.post',
      method: 'search_read',
      args: [
        [['website_published', '=', true], ['blog_id', '=', blogId]],
        ['id', 'name', 'subtitle', 'seo_name', 'website_meta_title', 'website_meta_description',
         'teaser', 'content', 'author_id', 'post_date', 'published_date', 'write_date', 'tag_ids'],
      ],
      kwargs: { order: 'post_date desc, id desc', limit: 1000 },
    },
    cookie,
  );
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error('[odoo] no published posts returned: refusing to deploy an empty blog');
  }

  const tagIds = Array.from(new Set(raw.flatMap((p: any) => p.tag_ids || [])));
  let tagMap: Record<number, string> = {};
  if (tagIds.length) {
    const { result: tags } = await rpc(
      url,
      '/web/dataset/call_kw',
      { model: 'blog.tag', method: 'read', args: [tagIds, ['id', 'name']], kwargs: {} },
      cookie,
    );
    tagMap = Object.fromEntries((tags as any[]).map(t => [t.id, t.name]));
  }

  const seen = new Map<string, number>();
  const posts = raw.filter(longEnough).map((p: any): OdooBlogPost => {
    const title = p.name || '(untitled)';
    /* seo_name is the URL the editor sets in Odoo (Promote > Optimize SEO).
       Without one, the title plus the id keeps the URL unique. */
    const slug = slugify(p.seo_name || '') || `${slugify(title) || 'post'}-${p.id}`;
    if (seen.has(slug)) {
      throw new Error(`[odoo] blog.post ${seen.get(slug)} and ${p.id} share the URL /blog/${slug}/`);
    }
    seen.set(slug, p.id);
    const postDate = odooDate(p.post_date) || odooDate(p.published_date) || odooDate(p.write_date) || new Date();
    return {
      id: p.id,
      slug,
      title,
      metaTitle: p.website_meta_title || undefined,
      description: (p.website_meta_description || p.teaser || p.subtitle || title).trim(),
      subtitle: p.subtitle || undefined,
      contentHtml: absolutize(p.content || '', url),
      author: Array.isArray(p.author_id) ? p.author_id[1] : 'Way4Tech',
      tags: (p.tag_ids || []).map((id: number) => tagMap[id]).filter(Boolean),
      postDate,
      writeDate: odooDate(p.write_date) || postDate,
    };
  });

  mkdirSync('node_modules/.cache/way4tech', { recursive: true });
  writeFileSync(
    BLOG_DATES_FILE,
    JSON.stringify(Object.fromEntries(posts.map(p => [p.slug, p.writeDate.toISOString()]))),
  );
  return posts;
}

let cached: Promise<OdooBlogPost[]> | null = null;

/** Every published post, fetched once per build however many pages ask. */
export function fetchOdooBlogPosts(): Promise<OdooBlogPost[]> {
  return (cached ??= load());
}
