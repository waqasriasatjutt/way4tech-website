/**
 * POST /api/rebuild[?s=SECRET]
 * Called by Odoo when a blog post is created, edited, unpublished or deleted.
 * Dispatches a GitHub Actions workflow that rebuilds and redeploys
 * the site (fresh content from Odoo baked in at build time).
 *
 * Env vars:
 *   GITHUB_TOKEN     PAT with `repo` scope
 *   GITHUB_REPO      e.g. waqasriasatjutt/way4tech-website
 *   REBUILD_SECRET   shared secret with the Odoo automation URL
 */

interface Env {
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
  REBUILD_SECRET: string;
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json', ...CORS } });

export const onRequestOptions: PagesFunction<Env> = () =>
  new Response(null, { status: 204, headers: CORS });

/*
 * Odoo sends its webhooks with a 1 second timeout and hangs up after that. The
 * GitHub call alone can take about a second, and a request the caller abandons
 * may be cancelled before the dispatch goes out. So the dispatch runs in
 * waitUntil and the answer goes back at once; a failure is in the function log.
 */
async function dispatch(env: Env): Promise<void> {
  const r = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'way4tech-rebuild',
    },
    body: JSON.stringify({ event_type: 'odoo-blog-publish' }),
  });
  if (!r.ok) console.error(`rebuild: GitHub returned ${r.status}: ${(await r.text()).slice(0, 200)}`);
}

export const onRequest: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (request.method !== 'POST' && request.method !== 'GET') {
    return json({ ok: false, error: 'Method not allowed' }, 405);
  }
  const url = new URL(request.url);
  const provided = url.searchParams.get('s') || request.headers.get('x-rebuild-secret') || '';
  if (!env.REBUILD_SECRET || provided !== env.REBUILD_SECRET) {
    return json({ ok: false, error: 'Forbidden' }, 403);
  }
  if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) {
    return json({ ok: false, error: 'Server not configured' }, 500);
  }
  waitUntil(dispatch(env).catch(e => console.error('rebuild: dispatch failed:', e?.message || e)));
  return json({ ok: true, queued: true }, 202);
};
