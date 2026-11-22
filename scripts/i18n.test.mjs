import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import {config, decode, hasLanguagePage, languagesForPage, prefixLinks, translateHtml, walkHtml} from './i18n.mjs';

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
const dict = JSON.parse(await read('src/i18n/en.json'));
const projectData = JSON.parse((await read('public/en/projects.js')).replace('window.LAURAS_PROJECTS = ', '').replace(/;\s*$/, ''));
const usedProjectIds = new Set();
const neutral = new Set(['Lauras mēbeles', 'ANNO 2008', 'Matīsa iela 78A, Rīga, LV-1009', '© 2026 Lauras mēbeles', 'Language', 'LV', 'EN']);
assert.deepEqual(Object.keys(englishReviews).sort(), sourceReviews.map(r => r.id).sort());
const plain = html => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
for (const page of config.pages.en) {
  const path = page.slice(1);
  const en = await read(`public/en/${path}index.html`);
  const lv = await read(`public/${path}index.html`);
  assert.match(en, /<html lang="en">/);
  assert.match(en, /hreflang="en"/);
  assert.match(lv, /hreflang="en"/);
  assert.equal([...en.matchAll(/<h1\b/g)].length, 1);
  const sections = html => [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(sections(en), sections(lv));
  const main = html => html.split('<main id="saturs">')[1].split('</main>')[0];
  const structure = html => [...main(html).matchAll(/<(section|article|div|h[1-6]|img|figure|details|summary|button)\b([^>]*)>/g)]
    .map(([, tag, attrs]) => [tag, ...['class', 'id', 'src', 'width', 'height', 'data-project'].map(attr => attrs.match(new RegExp(`(?:^|\\s)${attr}="([^"]*)"`))?.[1] || '')]);
  assert.deepEqual(structure(en), structure(lv), `Layout and imagery: ${page}`);
  // Atsauksmes izmanto atsevišķo pilno tulkojumu; marķētais H1 tulkojas kā veselums.
  walkHtml(lv.replace(/<article class="review-card"[\s\S]*?<\/article>/g, '').replace(/<h1\b[^>]*data-i18n-key="[^"]+"[\s\S]*?<\/h1>/g, ''), key => {
    assert.ok(dict[key] || neutral.has(key), `Missing EN text or attribute: ${page} ${key}`);
    return key;
  });
  for (const [, id] of en.matchAll(/data-project="([^"]+)"/g)) {
    usedProjectIds.add(id);
    assert.ok(projectData.some(p => p.id === id), `Project data present: ${id}`);
  }
  for (const [article] of en.matchAll(/<article class="kcase">[\s\S]*?<\/article>/g)) {
    const id = article.match(/data-project="([^"]+)"/)[1];
    const copy = plain(article.split('<div class="kcase-text">')[1].replace(/<summary>[\s\S]*?<\/summary>/, ''));
    assert.equal(copy, projectData.find(p => p.id === id).description, `Card and dialog: ${id}`);
  }
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
  const directories = config.pages.en.filter(path => path !== '/').map(path => path.replaceAll('/', ''));
  assert.deepEqual((await readdir(new URL(`../${root}/en/`, import.meta.url))).sort(), ['index.html', 'projects.js', ...directories].sort());
}
assert.deepEqual(projectData.map(p => p.id).sort(), [...usedProjectIds].sort());
assert.doesNotMatch(await read('public/kontakti/index.html'), /hreflang="en"/);
console.log(`${config.pages.en.length} EN lapas: maršruti, saites, visi tulkojumi, struktūra, attēli, projektu dialogi un atsauksmes pārbaudīti.`);
