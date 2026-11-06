/**
 * /tracker/tenants.json -> pairing-code prefix to Odoo address, read by the
 * Work Tracker desktop agent on first run.
 *
 * Client tenants are handed out only to the agent (it sends X-WT-Agent), so a
 * browser or crawler sees just the public Way4Tech entry and no client name.
 */
const PUBLIC: Record<string, string> = {
  W4T: 'https://portal.way4tech.com',
};
const CLIENTS: Record<string, string> = {
  DEVC: 'https://portal.devcynx.com',
};

export const onRequest: PagesFunction = async ({ request }) => {
  const agent = request.headers.has('X-WT-Agent');
  const body = agent ? { ...CLIENTS, ...PUBLIC } : PUBLIC;
  return new Response(JSON.stringify(body, null, 1), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
};
