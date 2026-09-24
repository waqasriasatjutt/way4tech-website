/**
 * /toolseo/* -> SEO Tools app on devcynx (repo waqasriasatjutt/seo-tools).
 *
 * The app lives on its own origin; this keeps it on way4tech.com so the team
 * has one address and the session cookie stays first-party. Everything is
 * passed through untouched: method, body, cookies, redirects.
 */
const ORIGIN = 'https://seotool.way4tech.com';

export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const upstream = new Request(ORIGIN + url.pathname + url.search, request);
  const res = await fetch(upstream, { redirect: 'manual' });
  const out = new Response(res.body, res);
  out.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return out;
};
