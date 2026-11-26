import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { config, enabledLangs, langPrefix } from './i18n.mjs';
import { sitemap, languageForPath, launchOrigin } from './seo.mjs';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const locations = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const launchXml = await read('docs/migration/sitemap-launch.xml');
const expected = enabledLangs.flatMap(lang => config.pages.en.map(path => `${launchOrigin}${langPrefix(lang)}${path}`)).sort();
assert.deepEqual(locations(launchXml).sort(), expected);
assert.equal(new Set(expected).size, 60);
assert.match(launchXml, /xmlns:xhtml="http:\/\/www.w3.org\/1999\/xhtml"/);
assert.doesNotMatch(launchXml, /404|archive-|<lastmod>|<priority>|<changefreq>/);
for (const block of launchXml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const links = [...block[1].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)];
  assert.deepEqual(links.map(match => match[1]), ['lv', 'en', 'ru', 'no', 'x-default']);
  for (const [, , href] of links) assert.ok(expected.includes(href));
  const url = new URL(locations(block[0])[0]);
  const html = await read(`public${url.pathname}index.html`);
  assert.match(html, /<h1\b/);
  assert.match(html, /noindex/); // Preview remains closed. Launch file is only a candidate.
}
for (const dir of ['public', 'dist']) assert.deepEqual(locations(await read(`${dir}/sitemap.xml`)), []);
const records = [
  { path: '', lang: 'lv', indexable: true },
  { path: '', lang: 'en', indexable: false },
  { path: 'musu-darbi/example', lang: 'lv', indexable: true, reviewOnly: true },
  { path: '404', lang: 'lv', indexable: true, notFound: true }
];
assert.deepEqual(locations(sitemap(records, launchOrigin)), [`${launchOrigin}/`]);
assert.deepEqual(locations(sitemap(records, launchOrigin, { launch: true })), [`${launchOrigin}/`, `${launchOrigin}/en/`]);
assert.throws(() => sitemap(records, 'https://example.com/subdirectory'));
assert.throws(() => sitemap(records, 'https://user:pass@example.com'));
assert.equal(languageForPath('/enough/missing/'), 'lv');
assert.equal(languageForPath('/no/mangler/'), 'no');

const words = { lv: 'Lapa nav atrasta', en: 'Page not found', ru: 'Страница не найдена', no: 'Siden ble ikke funnet' };
for (const lang of enabledLangs) {
  const prefix = langPrefix(lang);
  const html = await read(`public${prefix}/404.html`);
  assert.match(html, new RegExp(`<html lang="${lang}">`));
  assert.ok(html.includes(`<h1>${words[lang]}</h1>`));
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.doesNotMatch(html, /rel="canonical"|<link rel="alternate"|lang-fallback/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  for (const path of ['/', '/pakalpojumi/', '/kontakti/']) assert.ok(html.includes(`href="${prefix}${path}"`));
  if (lang !== 'lv') assert.ok(!html.includes('Iespējams, adrese ir mainījusies'));
  for (const other of enabledLangs.filter(value => value !== lang)) assert.ok(html.includes(`href="${langPrefix(other)}/404.html" hreflang="${other}"`));
  for (const target of [...html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)].map(match => match[1])) {
    if (target.startsWith('//')) continue;
    const info = await stat(new URL(`public${target}`, root));
    if (info.isDirectory()) await stat(new URL(`public${target}index.html`, root));
  }
}

const inventory = JSON.parse(await read('docs/migration/wordpress-pages.json'));
const map = JSON.parse(await read('docs/migration/redirect-map.json'));
assert.equal(map.active, false);
assert.equal(map.records.length, 55);
assert.deepEqual(map.records.map(record => record.oldUrl).sort(), inventory.map(record => record.url).sort());
assert.deepEqual(map.records.map(record => record.wordpressId).sort(), inventory.map(record => record.id).sort());
assert.deepEqual(['keep', 'redirect', 'pending', 'not-found'].map(action => map.records.filter(record => record.action === action).length), [11, 38, 5, 1]);
const destinations = new Set(expected.map(url => new URL(url).pathname));
const sources = new Set(map.records.filter(record => record.action === 'redirect').map(record => decodeURIComponent(record.oldPath)));
for (const record of map.records) {
  assert.equal(record.oldPath, new URL(record.oldUrl).pathname);
  if (record.action === 'not-found') {
    assert.equal(record.statusCode, 404);
    assert.equal(record.target, null);
    continue;
  }
  if (record.action === 'pending') { assert.equal(record.target, null); continue; }
  assert.ok(destinations.has(record.target), `Existing target: ${record.wordpressId}`);
  if (record.language !== 'lv') assert.ok(record.target.startsWith(`/${record.language}/`));
  if (record.action === 'redirect') {
    assert.equal(record.statusCode, 301);
    assert.ok(['proposed', 'approved'].includes(record.decision));
    assert.notEqual(record.target, decodeURIComponent(record.oldPath));
    assert.ok(!sources.has(record.target), `No redirect chain: ${record.oldPath}`);
  }
}
const vercel = JSON.parse(await read('vercel.json'));
const approved = map.records.filter(record => record.decision === 'approved');
const rules = vercel.routes.filter(route => route.status === 301);
assert.equal(rules.length, approved.length);
for (const record of approved) {
  for (const path of [record.oldPath, decodeURIComponent(record.oldPath)]) {
    const matching = rules.filter(route => new RegExp(route.src).test(path));
    assert.deepEqual(matching.map(route => route.headers.Location), [record.target], path);
  }
}
assert.equal(vercel.routes[0].headers['X-Robots-Tag'], 'noindex, nofollow');
assert.equal(vercel.routes[0].continue, true);
const apiRoute = vercel.routes.findIndex(route => route.src === '^/api/contact/?$');
const filesystem = vercel.routes.findIndex(route => route.handle === 'filesystem');
assert.ok(apiRoute > 0 && apiRoute < filesystem, 'Contact API precedes static files and localized 404 fallbacks');
assert.equal(vercel.routes[apiRoute].dest, '/api/contact');
assert.ok(vercel.routes.filter(route => route.dest && route.dest !== '/api/contact').every(route => route.status === 404));
assert.equal(await read('public/robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log('SEO: 60 launch URLs, closed preview, four localized 404 pages and all 55 legacy URLs checked.');
