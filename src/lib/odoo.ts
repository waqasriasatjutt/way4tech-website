/**
 * Build-time Odoo fetcher for blog posts.
 * Reads blog.post (website_published=true) via JSON-RPC and returns
 * normalized posts for Astro to render as static pages.
 *
 * Env vars (set locally in .env and in CI):
 *   ODOO_URL       e.g. https://portal.way4tech.com
 *   ODOO_DB        e.g. portal.way4tech.com
 *   ODOO_USER      read-only user (website_api is fine — has Sales access + portal)
 *   ODOO_PASSWORD  password
 *
 * If env vars are missing or Odoo is unreachable, returns [] so the build
 * does not crash — MDX posts will still show.
 */

export interface OdooBlogPost {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  teaser?: string;
  contentHtml: string;
  author: string;
  tags: string[];
  blogName?: string;
  postDate: Date;
  writeDate: Date;
}

function slugify(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
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

export async function fetchOdooBlogPosts(): Promise<OdooBlogPost[]> {
  const url = process.env.ODOO_URL;
  const db = process.env.ODOO_DB;
  const user = process.env.ODOO_USER;
  const pass = process.env.ODOO_PASSWORD;
  if (!url || !db || !user || !pass) {
    console.warn('[odoo] env vars missing — skipping Odoo blog fetch');
    return [];
  }
  try {
    const auth = await rpc(url, '/web/session/authenticate', { db, login: user, password: pass });
    const cookie = auth.cookie;
    if (!auth.result?.uid) throw new Error('Auth failed');

    const posts = await rpc(
      url,
      '/web/dataset/call_kw',
      {
        model: 'blog.post',
        method: 'search_read',
        args: [
          [['website_published', '=', true]],
          ['id', 'name', 'subtitle', 'teaser', 'content', 'author_id', 'blog_id', 'post_date', 'published_date', 'write_date', 'tag_ids'],
        ],
        kwargs: { order: 'post_date desc, id desc', limit: 200 },
      },
      cookie,
    );

    const raw: any[] = posts.result || [];
    const tagIds = Array.from(new Set(raw.flatMap(p => p.tag_ids || [])));
    let tagMap: Record<number, string> = {};
    if (tagIds.length) {
      const tags = await rpc(
        url,
        '/web/dataset/call_kw',
        { model: 'blog.tag', method: 'read', args: [tagIds, ['id', 'name']], kwargs: {} },
        cookie,
      );
      tagMap = Object.fromEntries((tags.result as any[]).map(t => [t.id, t.name]));
    }

    return raw.map(p => {
      const title = p.name || '(untitled)';
      const slug = slugify(title) || `post-${p.id}`;
      const author = Array.isArray(p.author_id) ? p.author_id[1] : 'Way4Tech';
      const blogName = Array.isArray(p.blog_id) ? p.blog_id[1] : undefined;
      const date = p.post_date || p.published_date || p.write_date;
      return {
        id: p.id,
        slug: `${slug}-${p.id}`,
        title,
        subtitle: p.subtitle || undefined,
        teaser: p.teaser || undefined,
        contentHtml: p.content || '',
        author,
        tags: (p.tag_ids || []).map((id: number) => tagMap[id]).filter(Boolean),
        blogName,
        postDate: date ? new Date(date.replace(' ', 'T') + 'Z') : new Date(),
        writeDate: p.write_date ? new Date(p.write_date.replace(' ', 'T') + 'Z') : new Date(),
      };
    });
  } catch (err: any) {
    console.warn('[odoo] blog fetch failed — falling back to MDX only:', err.message);
    return [];
  }
}
