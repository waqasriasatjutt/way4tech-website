/*
 * RSS 2.0 feed for the blog.
 *
 * The blog has run for months with no feed at all, so there was no way to
 * follow it without visiting the site: no reader, no Feedly, no aggregator,
 * and nothing for the Odoo community sites that syndicate partner writing.
 *
 * Written by hand rather than with @astrojs/rss to avoid adding a dependency
 * for forty lines of XML. The posts come from the same fetcher the blog pages
 * use, so a post cannot appear in one and not the other.
 */
import type { APIRoute } from 'astro';
import { SITE } from '~/data/site';
import { fetchOdooBlogPosts } from '~/lib/odoo';

/** Escape the five characters that are not legal as XML text or in an attribute. */
const xml = (s: string) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/* A CDATA section ends at the first "]]>", so a post containing one would
   otherwise break the feed. Splitting it across two sections is the standard
   escape and keeps the characters intact for the reader. */
const cdata = (s: string) => `<![CDATA[${String(s ?? '').replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

export const GET: APIRoute = async () => {
  const posts = await fetchOdooBlogPosts();

  /* Newest first. The fetcher's order is the blog page's editorial order, which
     is not necessarily by date, and a feed read out of date order shows up in a
     reader as old posts arriving as new. */
  const items = [...posts].sort((a, b) => b.postDate.getTime() - a.postDate.getTime());

  const self = new URL('/rss.xml', SITE.url).toString();
  const newest = items[0]?.writeDate ?? new Date(0);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xml(`${SITE.name} blog`)}</title>
    <link>${xml(new URL('/blog/', SITE.url).toString())}</link>
    <description>${xml('Odoo implementation, customisation and localisation, written from real builds.')}</description>
    <language>en</language>
    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>
    <atom:link href="${xml(self)}" rel="self" type="application/rss+xml" />
${items
  .map((p) => {
    const url = new URL(`/blog/${p.slug}/`, SITE.url).toString();
    return `    <item>
      <title>${xml(p.title)}</title>
      <link>${xml(url)}</link>
      <guid isPermaLink="true">${xml(url)}</guid>
      <pubDate>${p.postDate.toUTCString()}</pubDate>
      <dc:creator>${xml(p.author || SITE.name)}</dc:creator>
      <description>${cdata(p.description)}</description>
${p.tags.map((t) => `      <category>${xml(t)}</category>`).join('\n')}
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
