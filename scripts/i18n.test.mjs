import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import {decode, hasLanguagePage, languagesForPage, prefixLinks, translateHtml} from './i18n.mjs';

assert.equal(hasLanguagePage('en', 'virtuves'), true);
assert.equal(hasLanguagePage('en', '/kontakti/'), false);
assert.deepEqual(languagesForPage('/'), ['lv', 'en']);
assert.deepEqual(languagesForPage('/kontakti/'), ['lv']);
const links = prefixLinks('<a href="/virtuves/?x=1#darbi">Kitchens</a><a href="/kontakti/#pieteikums">Contact</a><a href="/images/a.webp">Photo</a><a href="/" hreflang="lv">LV</a>', 'en');
assert.match(links, /href="\/en\/virtuves\/\?x=1#darbi"/);
assert.match(links, /href="\/kontakti\/#pieteikums" hreflang="lv"/);
assert.match(links, /class="lang-fallback"/);
assert.match(links, /href="\/images\/a.webp"/);
assert.match(links, /href="\/" hreflang="lv"/);
const heading = translateHtml('<h1 data-i18n-key="home.hero.title">LV<span class="nk-hero-break"><br></span> title</h1>', {'home.hero.title': 'Custom kitchens\nand furniture'}, 'en');
assert.equal(heading.replace(/<[^>]*>/g, ''), 'Custom kitchens and furniture');

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const englishReviews = JSON.parse(await read('src/i18n/reviews.en.json'));
const sourceReviews = JSON.parse(await read('src/reviews.json'));
assert.deepEqual(Object.keys(englishReviews).sort(), sourceReviews.map(r => r.id).sort());
const plain = html => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
for (const path of ['', 'virtuves/']) {
  const en = await read(`public/en/${path}index.html`);
  const lv = await read(`public/${path}index.html`);
  assert.match(en, /<html lang="en">/);
  assert.match(en, /hreflang="en"/);
  assert.match(lv, /hreflang="en"/);
  assert.equal([...en.matchAll(/<h1\b/g)].length, 1);
  const sections = html => [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(sections(en), sections(lv));
  for (const [, id, card] of en.matchAll(/<article class="review-card" data-review-id="([^"]+)"([\s\S]*?)<\/article>/g)) {
    const quote = card.match(/<blockquote>([\s\S]*?)<\/blockquote>/)[1]
      .replace(/<span class="rm-dots"[^>]*>[\s\S]*?<\/span>/g, '')
      .replace(/<button[^>]*>[\s\S]*?<\/button>/g, '');
    assert.equal(plain(quote), englishReviews[id]);
    assert.match(card, /Translated from Latvian/);
    assert.ok(card.includes(sourceReviews.find(r => r.id === id).author));
  }
  for (const [, target] of en.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    if (target.startsWith('//')) continue;
    const destination = new URL('../public' + target, import.meta.url);
    const info = await stat(destination);
    if (info.isDirectory()) await stat(new URL('index.html', destination.href.replace(/\/?$/, '/')));
  }
}
for (const root of ['public', 'dist']) {
  assert.deepEqual((await readdir(new URL(`../${root}/en/`, import.meta.url))).sort(), ['index.html', 'projects.js', 'virtuves']);
}
assert.doesNotMatch(await read('public/kontakti/index.html'), /hreflang="en"/);
console.log('EN maršruti, saites, struktūra, H1 atstarpes un atsauksmju pilnais teksts pārbaudīti.');
