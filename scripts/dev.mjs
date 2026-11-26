import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { languageForPath } from './seo.mjs';
import contact from '../api/contact.js';

const root = path.resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
  if (new URL(req.url,'http://localhost').pathname === '/api/contact') return contact(req,res);
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end('Method not allowed');
  }
  let requestPath = '/';
  try {
    requestPath = new URL(req.url, 'http://localhost').pathname;
    const pathname = decodeURIComponent(requestPath);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    let target = path.resolve(root, relative);
    if (!target.startsWith(root + path.sep) || relative.split('/').some(p => p.startsWith('.'))) {
      res.writeHead(403); return res.end('Forbidden');
    }
    const info = await stat(target);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(302, { Location: pathname + '/' + new URL(req.url, 'http://localhost').search }); return res.end(); }
      target = path.join(target, 'index.html');
    } else if (!info.isFile()) throw new Error('Not a file');
    const data = await readFile(target);
    res.writeHead(/^\/(?:(?:en|ru|no)\/)?404\.html$/.test(pathname) ? 404 : 200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    const lang = languageForPath(requestPath);
    const fallback = path.join(root, lang === 'lv' ? '' : lang, '404.html');
    try {
      const data = await readFile(fallback);
      res.writeHead(404, { 'Content-Type': mime['.html'] });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : '404');
    }
  }
});
server.on('error', err => { console.error(err.code === 'EADDRINUSE' ? `Ports ${port} ir aizņemts. Izmanto PORT=4174 npm run dev.` : err.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Lauras mēbeles • http://127.0.0.1:${server.address().port}\nLokāls uzmetums. Apturēt: Ctrl+C.`));
