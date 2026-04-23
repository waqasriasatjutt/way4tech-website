/**
 * POST /api/lead
 * Accepts the website contact / quote form and pushes a crm.lead into Odoo.
 * Runs at the Cloudflare edge — Odoo credentials never touch the browser.
 *
 * Required env vars (set in Cloudflare Pages > Settings > Environment variables):
 *   ODOO_URL       e.g. https://portal.way4tech.com
 *   ODOO_DB        e.g. portal.way4tech.com
 *   ODOO_USER      e.g. website_api
 *   ODOO_PASSWORD  the API user password
 *   LEAD_SALESPERSON_ID (optional) — Odoo res.users id to assign leads to
 *   LEAD_TEAM_ID        (optional) — crm.team id to route to
 */

interface Env {
  ODOO_URL: string;
  ODOO_DB: string;
  ODOO_USER: string;
  ODOO_PASSWORD: string;
  LEAD_SALESPERSON_ID?: string;
  LEAD_TEAM_ID?: string;
}

interface LeadInput {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: string;
  product?: string;
  website?: string;
  country?: string;
  _hp?: string; // honeypot
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });

async function odooCall(
  env: Env,
  path: string,
  params: Record<string, unknown>,
  cookie?: string,
): Promise<{ data: any; cookie?: string }> {
  const resp = await fetch(`${env.ODOO_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params }),
  });
  const data = await resp.json<any>();
  if (data.error) throw new Error(`Odoo error: ${data.error.data?.message || data.error.message}`);
  const setCookie = resp.headers.get('set-cookie');
  return { data: data.result, cookie: setCookie || cookie };
}

export const onRequestOptions: PagesFunction<Env> = () =>
  new Response(null, { status: 204, headers: CORS });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: LeadInput;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  if (body._hp) return json({ ok: true });

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const message = (body.message || '').trim();
  if (!name || !email || !message) {
    return json({ ok: false, error: 'Name, email, and message are required.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Invalid email.' }, 400);
  }

  if (!env.ODOO_URL || !env.ODOO_DB || !env.ODOO_USER || !env.ODOO_PASSWORD) {
    return json({ ok: false, error: 'Server not configured.' }, 500);
  }

  try {
    const { cookie } = await odooCall(env, '/web/session/authenticate', {
      db: env.ODOO_DB,
      login: env.ODOO_USER,
      password: env.ODOO_PASSWORD,
    });

    const descLines = [
      body.service ? `Need: ${body.service}` : '',
      body.product ? `Product: ${body.product}` : '',
      body.country ? `Country: ${body.country}` : '',
      body.source ? `Source: ${body.source}` : '',
      body.website ? `Website: ${body.website}` : '',
      '',
      message,
    ].filter(Boolean);

    const leadTitle = body.service
      ? `${body.service} — ${body.company || name}`
      : body.product
      ? `Product inquiry: ${body.product} — ${body.company || name}`
      : `Contact — ${body.company || name}`;

    const vals: Record<string, unknown> = {
      name: leadTitle,
      contact_name: name,
      partner_name: body.company || '',
      email_from: email,
      phone: body.phone || '',
      description: descLines.join('\n'),
      type: 'opportunity',
      tag_ids: [],
    };
    if (env.LEAD_SALESPERSON_ID) vals.user_id = Number(env.LEAD_SALESPERSON_ID);
    if (env.LEAD_TEAM_ID) vals.team_id = Number(env.LEAD_TEAM_ID);

    const { data: leadId, cookie: c2 } = await odooCall(
      env,
      '/web/dataset/call_kw',
      {
        model: 'crm.lead',
        method: 'create',
        args: [vals],
        kwargs: {},
      },
      cookie,
    );

    const chatter =
      `Website form submission\n` +
      `\n` +
      `Name: ${name}\n` +
      (body.company ? `Company: ${body.company}\n` : '') +
      `Email: ${email}\n` +
      (body.phone ? `Phone: ${body.phone}\n` : '') +
      (body.service ? `Service: ${body.service}\n` : '') +
      (body.product ? `Product: ${body.product}\n` : '') +
      (body.country ? `Country: ${body.country}\n` : '') +
      (body.source ? `Source page: ${body.source}\n` : '') +
      (body.website ? `Submitted from: ${body.website}\n` : '') +
      `\n` +
      `Message:\n` +
      message;

    await odooCall(
      env,
      '/web/dataset/call_kw',
      {
        model: 'crm.lead',
        method: 'message_post',
        args: [[leadId]],
        kwargs: {
          body: chatter,
          message_type: 'comment',
          subtype_xmlid: 'mail.mt_comment',
        },
      },
      c2,
    ).catch(() => {});

    return json({ ok: true, id: leadId });
  } catch (e: any) {
    return json({ ok: false, error: e.message || 'Unknown error' }, 502);
  }
};
