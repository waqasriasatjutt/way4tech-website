/*
 * Tells Bing, Yandex and the other IndexNow engines which URLs changed, right after
 * a deploy, instead of waiting weeks for a crawl. No account and no API key from a
 * search engine is needed: ownership is proved by a key file served from the site
 * root, which lives in public/ and is deployed with everything else.
 *
 * Google does not take part in IndexNow. Google still needs Search Console.
 *
 * Run after `astro build`, from the repo root:
 *   node scripts/indexnow.mjs
 *
 * Never fails the build. A search engine being down is not a reason to block a deploy.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const HOST = 'way4tech.com';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const SITEMAP = resolve('dist/sitemap-0.xml');
const BATCH = 10000; // IndexNow caps a submission at 10,000 URLs

function readKey() {
  const fromEnv = (process.env.INDEXNOW_KEY || '').trim();
  if (fromEnv) return fromEnv;
  try {
    return readFileSync(resolve('.indexnow-key'), 'utf8').trim();
  } catch {
    return '';
  }
}

function readUrls() {
  let xml;
  try {
    xml = readFileSync(SITEMAP, 'utf8');
  } catch {
    console.warn('[indexnow] no dist/sitemap-0.xml, run the build first. Skipping.');
    return [];
  }
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => m[1].trim())
    .filter(u => u.startsWith(`https://${HOST}/`));
}

const key = readKey();
if (!key) {
  console.warn('[indexnow] no key found, skipping. Expected .indexnow-key or INDEXNOW_KEY.');
  process.exit(0);
}

const urls = readUrls();
if (urls.length === 0) {
  console.warn('[indexnow] no URLs to submit, skipping.');
  process.exit(0);
}

for (let i = 0; i < urls.length; i += BATCH) {
  const chunk = urls.slice(i, i + BATCH);
  const body = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList: chunk,
  };
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20000),
    });
    // 200 accepted, 202 accepted but key still being validated. Both are fine.
    console.log(`[indexnow] submitted ${chunk.length} URLs, HTTP ${res.status}`);
    if (res.status >= 400) {
      console.warn('[indexnow] response body:', (await res.text()).slice(0, 300));
    }
  } catch (err) {
    console.warn('[indexnow] submission failed, continuing:', err?.message || err);
  }
}
