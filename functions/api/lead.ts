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
  /** The phrase from the call to action the visitor clicked, when it was not one of the
   *  dropdown's own options. More specific than `service`, so it is kept alongside it. */
  service_context?: string;
  message?: string;
  source?: string;
  product?: string;
  website?: string;
  country?: string;
  country_code?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  _hp?: string; // honeypot
}

/** Mutable session holder so every lookup reuses (and refreshes) one Odoo cookie. */
interface Session {
  cookie?: string;
}

/* Absolute, because these URLs are read inside emails where a relative path is meaningless.
   The apex is canonical: www and the pages.dev preview both redirect or noindex to it. */
const SITE_ORIGIN = 'https://way4tech.com';

/** Plain text into an Odoo HTML field, keeping the line breaks and neutralising markup.
 *
 * crm.lead.description and mail.message.body are HTML. Newlines were being posted raw, so
 * Odoo collapsed them and every lead read as one run-on paragraph with the metadata and the
 * customer's own words colliding on a single line. Anything tag-shaped in the message was
 * also being swallowed by the sanitiser rather than shown. */
function toHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped
    .split('\n')
    .map((line) => `<p style="margin:0">${line || '&nbsp;'}</p>`)
    .join('');
}

/** Arabic-Indic (٠-٩) and Extended Arabic-Indic (۰-۹) digits to ASCII.
 *
 * JavaScript's \d matches neither, so a number typed in Arabic numerals counted as zero
 * digits and was rejected as too short. The /ar/ tree is written for exactly those visitors. */
function normaliseDigits(v: string): string {
  return v.replace(/[٠-٩۰-۹]/g, (c) => {
    const code = c.charCodeAt(0);
    const base = code >= 0x06F0 ? 0x06F0 : 0x0660;
    return String(code - base);
  });
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
type UtmKey = (typeof UTM_KEYS)[number];

/** Site country titles that res.country spells differently. Tried only after the plain name misses. */
const COUNTRY_ALIASES: Record<string, string[]> = {
  turkey: ['Türkiye', 'Turkiye'],
  uae: ['United Arab Emirates'],
  ksa: ['Saudi Arabia'],
  usa: ['United States'],
  uk: ['United Kingdom'],
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
  // Odoo does not always answer with JSON. A restart, a 502 from the proxy or a maintenance
  // page returns HTML, and calling resp.json() on that threw a SyntaxError which the handler
  // below passed straight to the browser, so the visitor read
  // `Unexpected token '<', "<html>..." is not valid JSON` and their enquiry was dropped.
  // Seen live: Odoo was restarting and a real submission came back 502.
  let data: any;
  try {
    data = await resp.json<any>();
  } catch {
    const err = new Error(`Odoo did not return JSON (HTTP ${resp.status})`);
    (err as any).odooUnavailable = true;
    throw err;
  }
  if (data.error) {
    const err = new Error(`Odoo error: ${data.error.data?.message || data.error.message}`);
    // Odoo answered and rolled the transaction back, so a retry cannot duplicate a record.
    (err as any).odooError = true;
    throw err;
  }
  const setCookie = resp.headers.get('set-cookie');
  return { data: data.result, cookie: setCookie || cookie };
}

/** search_read through the same call_kw helper, keeping the session cookie fresh. */
async function searchRead(
  env: Env,
  session: Session,
  model: string,
  domain: unknown[],
  fields: string[],
  limit: number,
): Promise<any[]> {
  const { data, cookie } = await odooCall(
    env,
    '/web/dataset/call_kw',
    { model, method: 'search_read', args: [domain, fields], kwargs: { limit } },
    session.cookie,
  );
  session.cookie = cookie;
  return Array.isArray(data) ? data : [];
}

/** Trim, drop newlines and cap a free-text value before it becomes a record name. */
function tidy(value: unknown, max = 120): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/**
 * Site country titles are marketing labels ("Saudi Arabia (KSA)") while res.country holds
 * plain names. Drop any parenthetical suffix and collapse the whitespace, then match on
 * name, then on a known alias, then on the 2-letter code. No match leaves country_id unset.
 */
function normaliseCountry(raw: unknown): string {
  return tidy(raw, 80).replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
}

async function resolveCountryId(
  env: Env,
  session: Session,
  rawCountry: unknown,
  rawCode: unknown,
): Promise<number | null> {
  const clean = normaliseCountry(rawCountry);
  const explicitCode = tidy(rawCode, 8).toUpperCase();
  const code = /^[A-Z]{2}$/.test(explicitCode)
    ? explicitCode
    : /^[A-Za-z]{2}$/.test(clean)
    ? clean.toUpperCase()
    : '';

  const domains: unknown[][] = [];
  if (clean) domains.push([['name', '=ilike', clean]]);
  for (const alias of COUNTRY_ALIASES[clean.toLowerCase()] || []) {
    domains.push([['name', '=ilike', alias]]);
  }
  if (code) domains.push([['code', '=', code]]);

  for (const domain of domains) {
    try {
      const rows = await searchRead(env, session, 'res.country', domain, ['id'], 1);
      if (rows.length && rows[0].id) return rows[0].id;
    } catch {
      // try the next domain; a country miss must never cost us the lead
    }
  }

  // Loose match only when it is unambiguous, so we never file a lead under the wrong market.
  if (clean.length >= 5) {
    try {
      const rows = await searchRead(env, session, 'res.country', [['name', 'ilike', clean]], ['id'], 2);
      if (rows.length === 1 && rows[0].id) return rows[0].id;
    } catch {
      // fall through
    }
  }
  return null;
}

/** Look a record up by name and create it only if missing. Returns null if both fail. */
async function findOrCreateByName(
  env: Env,
  session: Session,
  model: string,
  rawName: string,
): Promise<number | null> {
  const name = tidy(rawName, 100);
  if (!name) return null;
  const domain = [['name', '=ilike', name]];

  try {
    const rows = await searchRead(env, session, model, domain, ['id'], 1);
    if (rows.length && rows[0].id) return rows[0].id;
  } catch {
    // fall through to create
  }

  try {
    const { data, cookie } = await odooCall(
      env,
      '/web/dataset/call_kw',
      { model, method: 'create', args: [{ name }], kwargs: {} },
      session.cookie,
    );
    session.cookie = cookie;
    if (typeof data === 'number') return data;
    if (Array.isArray(data) && typeof data[0] === 'number') return data[0];
  } catch {
    // A unique-name constraint means it now exists, so read it back once.
    try {
      const rows = await searchRead(env, session, model, domain, ['id'], 1);
      if (rows.length && rows[0].id) return rows[0].id;
    } catch {
      // give up on the tag, keep the lead
    }
  }
  return null;
}

/** "countries/saudi-arabia" or "/services/erp/" both reduce to the section slug. */
function sourceSection(raw: unknown): string {
  const first = tidy(raw, 120).replace(/^\/+/, '').split(/[/?#]/)[0] || '';
  return first.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
}

/** UTM values off the body, falling back to the query string of the submitted page URL. */
function collectUtm(body: LeadInput): Partial<Record<UtmKey, string>> {
  const out: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const v = tidy(body[key]);
    if (v) out[key] = v;
  }
  if (body.website) {
    try {
      const qs = new URL(body.website).searchParams;
      for (const key of UTM_KEYS) {
        if (out[key]) continue;
        const v = tidy(qs.get(key));
        if (v) out[key] = v;
      }
    } catch {
      // not a parseable URL, ignore
    }
  }
  return out;
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
  const phone = normaliseDigits((body.phone || '').trim());
  if (!name || !email || !message) {
    return json({ ok: false, error: 'Name, email, and message are required.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Invalid email.' }, 400);
  }

  // Phone was optional and 18 of the first 41 leads arrived without one, so nearly half
  // could only be answered by email. Email is the channel that lands in a spam folder and
  // gets no reply, which is the whole reason those leads went cold.
  //
  // Checked here as well as in the browser: the field is only a required attribute on the
  // form, and anything posting straight to this endpoint would skip it.
  if (!phone) {
    return json({ ok: false, error: 'A phone or WhatsApp number is required.' }, 400);
  }
  if ((phone.match(/\d/g) || []).length < 7) {
    return json({ ok: false, error: 'That phone number looks too short. Please include the country code.' }, 400);
  }
  // The country code is not optional formatting here. A lead that arrives as 9925938505 or
  // 03024009117 cannot be dialled or opened in WhatsApp from another country, and the team
  // answering these sits in a different one from most of the people submitting. Leads have
  // already come in that way and could only be answered by email.
  if (!/^(\+|00)/.test(phone.replace(/[\s()-]/g, ''))) {
    return json({
      ok: false,
      error: 'Please include your country code, starting with + (for example +971 50 123 4567). We need it to reach you on WhatsApp.',
    }, 400);
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
    const session: Session = { cookie };

    const utm = collectUtm(body);
    const utmLines = UTM_KEYS.filter((k) => utm[k]).map((k) => `${k}: ${utm[k]}`);

    const descLines = [
      body.service ? `Need: ${body.service}` : '',
      body.service_context ? `Came from: ${body.service_context}` : '',
      body.product ? `Product: ${body.product}` : '',
      body.country ? `Country: ${body.country}` : '',
      body.source ? `Source: ${body.source}` : '',
      body.website ? `Website: ${body.website}` : '',
      body.landing_page ? `Landing page: ${body.landing_page}` : '',
      body.referrer ? `Referrer: ${body.referrer}` : '',
      ...utmLines,
      '',
      message,
    ].filter(Boolean);

    const leadTitle = body.service
      ? `${body.service} — ${body.company || name}`
      : body.product
      ? `Product inquiry: ${body.product} — ${body.company || name}`
      : `Contact — ${body.company || name}`;

    // The Odoo automation "Website enquiry acknowledgement" fires on this tag, and only on
    // this tag, so the acknowledgement mail never goes to a lead that arrived by inbound
    // email or to the sales spam that reaches the same CRM.
    //
    // Resolved before the payload is built and carried in `vals` rather than in `extra`
    // below, because `extra` is dropped wholesale on retry. A retried lead that lost this
    // tag would be created silently and the customer would never be greeted.
    let enquiryTagId: number | null = null;
    try {
      enquiryTagId = await findOrCreateByName(env, session, 'crm.tag', 'Website Enquiry');
    } catch {
      // The lead matters more than the acknowledgement. Carry on without it.
    }

    const vals: Record<string, unknown> = {
      name: leadTitle,
      contact_name: tidy(name, 120),
      partner_name: tidy(body.company, 120),
      email_from: email,
      phone,
      description: toHtml(descLines.join('\n')),
      type: 'opportunity',
      tag_ids: enquiryTagId ? [[6, 0, [enquiryTagId]]] : [],
    };
    if (env.LEAD_SALESPERSON_ID) vals.user_id = Number(env.LEAD_SALESPERSON_ID);
    if (env.LEAD_TEAM_ID) vals.team_id = Number(env.LEAD_TEAM_ID);

    // Everything below is reporting metadata. It is resolved before the create so a bad
    // lookup drops the field instead of the lead, and it is dropped wholesale on retry.
    const extra: Record<string, unknown> = {};

    // The acknowledgement and every later reply quote the enquiry back to the customer, and
    // an internal record id means nothing to them. `description` cannot be used for that: it
    // mixes the visitor's words with referrer, landing page and utm lines that should never
    // be shown to them, with no reliable separator. These two custom fields on crm.lead keep
    // the customer-visible part on its own.
    //
    // Deliberately in `extra` rather than `vals`: if the fields are ever missing the create
    // still succeeds on retry, and both mail templates fall back to the lead name and simply
    // omit the quoted block.
    if (body.service) extra.x_enquiry_service = tidy(body.service, 120);
    extra.x_enquiry_message = message.slice(0, 4000);

    // The page on this site that answers what they asked about. Both mails link to it, which
    // gives somebody waiting for a reply something useful to read and brings them back here.
    // Keyed on the exact option values in the contact form's service select.
    const SERVICE_PAGE: Record<string, string> = {
      'New Odoo implementation': '/services/odoo-implementation/',
      'Custom module / customization': '/services/odoo-customization/',
      'Odoo support / maintenance': '/services/odoo-support/',
      'Hire Odoo developer': '/services/hire-odoo-developer/',
      'Migration / upgrade': '/services/odoo-migration/',
      'Integration with existing systems': '/services/odoo-integration/',
      'Product inquiry (specific module)': '/products/',
      'Other / consultation': '/services/',
    };
    const key = body.service ? body.service.trim() : '';
    const page = Object.prototype.hasOwnProperty.call(SERVICE_PAGE, key)
      ? SERVICE_PAGE[key]
      : undefined;
    if (page) extra.x_enquiry_url = `${SITE_ORIGIN}${page}`;

    let countryId: number | null = null;
    try {
      if (body.country || body.country_code) {
        countryId = await resolveCountryId(env, session, body.country, body.country_code);
        if (countryId) extra.country_id = countryId;
      }

      // Seeded with the enquiry tag because this is a 6,0 replace, not an add. Leaving it
      // out here would strip the tag the acknowledgement automation triggers on for every
      // lead that also carries a country or section tag, which is most of them.
      const tagIds: number[] = enquiryTagId ? [enquiryTagId] : [];
      const countryLabel = normaliseCountry(body.country);
      if (countryLabel) {
        const id = await findOrCreateByName(env, session, 'crm.tag', `country:${countryLabel}`);
        if (id) tagIds.push(id);
      }
      const section = sourceSection(body.source);
      if (section) {
        const id = await findOrCreateByName(env, session, 'crm.tag', `web:${section}`);
        if (id) tagIds.push(id);
      }
      if (tagIds.length) extra.tag_ids = [[6, 0, tagIds]];

      // crm.lead inherits utm.mixin, so source_id / medium_id / campaign_id are native.
      // utm_term and utm_content have no native field and stay in the description only.
      if (utm.utm_source) {
        const id = await findOrCreateByName(env, session, 'utm.source', utm.utm_source);
        if (id) extra.source_id = id;
      }
      if (utm.utm_medium) {
        const id = await findOrCreateByName(env, session, 'utm.medium', utm.utm_medium);
        if (id) extra.medium_id = id;
      }
      if (utm.utm_campaign) {
        const id = await findOrCreateByName(env, session, 'utm.campaign', utm.utm_campaign);
        if (id) extra.campaign_id = id;
      }
    } catch {
      // keep whatever resolved, carry on with the create
    }

    const createLead = (payload: Record<string, unknown>) =>
      odooCall(
        env,
        '/web/dataset/call_kw',
        { model: 'crm.lead', method: 'create', args: [payload], kwargs: {} },
        session.cookie,
      );

    let leadId: any;
    let c2: string | undefined;
    try {
      ({ data: leadId, cookie: c2 } = await createLead({ ...vals, ...extra }));
    } catch (e: any) {
      // Last resort: if the metadata is what Odoo rejected, still file the lead without it.
      if (!e?.odooError || !Object.keys(extra).length) throw e;
      ({ data: leadId, cookie: c2 } = await createLead(vals));
    }

    const chatter =
      `Website form submission\n` +
      `\n` +
      `Name: ${name}\n` +
      (body.company ? `Company: ${body.company}\n` : '') +
      `Email: ${email}\n` +
      `Phone / WhatsApp: ${phone}\n` +
      (body.service ? `Service: ${body.service}\n` : '') +
      (body.product ? `Product: ${body.product}\n` : '') +
      (body.country ? `Country: ${body.country}\n` : '') +
      (body.country && !countryId ? `Country not matched in Odoo\n` : '') +
      (body.source ? `Source page: ${body.source}\n` : '') +
      (body.website ? `Submitted from: ${body.website}\n` : '') +
      (utmLines.length ? utmLines.join('\n') + '\n' : '') +
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
          body: toHtml(chatter),
          message_type: 'comment',
          // mt_note, not mt_comment. This block is internal: it carries the source page, the
          // submitted-from URL with its query string, the referrer and the utm values, which
          // the comment at the top of the extra block says must never reach the customer.
          //
          // It was harmless while nobody outside the company followed the lead. The Odoo
          // automation that subscribes the enquirer so chatter replies reach them now makes
          // every follower a Discussions subscriber, and Odoo mails mt_comment messages to
          // followers, so this note would have been emailed to the visitor on every single
          // submission. mt_note is internal and generates no notification at all.
          //
          // message_type stays 'comment': 'comment' + mt_note is exactly what the Log note
          // button in the web UI posts.
          subtype_xmlid: 'mail.mt_note',
        },
      },
      c2 || session.cookie,
    ).catch(() => {});

    return json({ ok: true, id: leadId });
  } catch (e: any) {
    // The visitor was being shown raw internals: Odoo tracebacks, JSON parser errors and
    // 'Server not configured.' all rendered verbatim on the contact page. None of that means
    // anything to them and some of it describes our infrastructure. Give them something they
    // can act on, and keep the detail in the logs where it is useful.
    console.error('lead endpoint failed:', e && e.message, e && e.stack);
    return json({
      ok: false,
      error:
        'We could not save your enquiry just now. Please message us on WhatsApp at ' +
        '+92 315 411 4748 or email info@way4tech.com and we will pick it up straight away.',
    }, 502);
  }
};
