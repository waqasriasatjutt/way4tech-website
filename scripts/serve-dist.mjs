// Minimal static server for dist/, so the built site can be reviewed locally
// before anything is deployed.
//
// `astro preview` refuses to bind in this container (connection refused, no
// output), and the build is plain static HTML anyway, so a dependency-free
// server is both simpler and more predictable. It mirrors how Cloudflare Pages
// serves the site: directory URLs resolve to index.html, unknown paths get the
// real 404 page with a 404 status rather than the homepage.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const ROOT = new URL('../dist/', import.meta.url).pathname;
const PORT = Number(process.env.PORT || 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

async function resolve(pathname) {
  // normalize() collapses any ../ before it can escape dist/.
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  const candidates = clean.endsWith('/')
    ? [join(ROOT, clean, 'index.html')]
    : [join(ROOT, clean), join(ROOT, clean, 'index.html'), join(ROOT, `${clean}.html`)];

  for (const file of candidates) {
    try {
      const s = await stat(file);
      if (s.isFile()) return file;
    } catch { /* try the next shape */ }
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const file = await resolve(pathname);

  if (!file) {
    const notFound = join(ROOT, '404.html');
    try {
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      res.end(await readFile(notFound));
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('404');
    }
    return;
  }

  res.writeHead(200, {
    'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  res.end(await readFile(file));
}).listen(PORT, '0.0.0.0', () => {
  console.log(`serving dist/ on http://localhost:${PORT}`);
});
