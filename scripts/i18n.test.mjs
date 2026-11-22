import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import {config, decode, hasLanguagePage, languagesForPage, prefixLinks, translateHtml, walkHtml} from './i18n.mjs';

assert.equal(hasLanguagePage('en', 'virtuves'), true);
assert.equal(hasLanguagePage('en', '/kontakti/'), true);
assert.equal(hasLanguagePage('en', '/cenas/'), true);
assert.equal(hasLanguagePage('en', '/musu-darbi/k11/'), true);
assert.equal(hasLanguagePage('en', '/musu-darbi-other/'), false);
assert.equal(hasLanguagePage('ru', '/'), true);
assert.equal(hasLanguagePage('ru', '/virtuves/'), true);
assert.equal(hasLanguagePage('ru', '/kontakti/'), true);
assert.equal(hasLanguagePage('ru', '/musu-darbi/k11/'), true);
for (const path of ['/skapji/', '/koridora-iekartas/', '/vannasistabas-mebeles/', '/sekcijas/', '/citas-mebeles/']) {
  assert.equal(hasLanguagePage('ru', path), true);
  assert.deepEqual(languagesForPage(path), ['lv', 'en', 'ru']);
}
assert.deepEqual(languagesForPage('/'), ['lv', 'en', 'ru', 'no']);
assert.deepEqual(languagesForPage('/virtuves/'), ['lv', 'en', 'ru', 'no']);
assert.equal(hasLanguagePage('no', '/kontakti/'), false);
assert.equal(hasLanguagePage('no', '/musu-darbi/k11/'), false);
for (const path of config.pages.en.filter(path => !['/', '/virtuves/'].includes(path))) assert.deepEqual(languagesForPage(path), ['lv', 'en', 'ru']);
const links = prefixLinks('<a href="/virtuves/?x=1#darbi">Kitchens</a><a href="/kontakti/#pieteikums">Contact</a><a href="/cenas/">Prices</a><a href="/nepievienota/">Unavailable</a><a href="/images/a.webp">Photo</a><a href="/" hreflang="lv">LV</a>', 'en');
assert.match(links, /href="\/en\/virtuves\/\?x=1#darbi"/);
assert.match(links, /href="\/en\/kontakti\/#pieteikums"/);
assert.match(links, /href="\/en\/cenas\/"/);
assert.match(links, /href="\/nepievienota\/" hreflang="lv"/);
assert.match(links, /class="lang-fallback"/);
assert.match(links, /href="\/images\/a.webp"/);
assert.match(links, /href="\/" hreflang="lv"/);
const heading = translateHtml('<h1 data-i18n-key="home.hero.title">LV<span class="nk-hero-break"><br></span> title</h1>', {'home.hero.title': 'Custom kitchens\nand furniture'}, 'en');
assert.equal(heading.replace(/<[^>]*>/g, ''), 'Custom kitchens and furniture');
const emailExample = translateHtml('<input placeholder="vards@epasts.lv"><a href="mailto:info@laurasmebeles.lv">info@laurasmebeles.lv</a>', {'vards@epasts.lv':'name@example.com'}, 'en');
assert.match(emailExample, /placeholder="name@example.com"/);
assert.match(emailExample, /href="mailto:info@laurasmebeles.lv">info@laurasmebeles.lv<\/a>/);
const russianLinks = translateHtml('<a href="/virtuves/">Virtuves</a><a href="/kontakti/#pieteikums">Kontakti</a><a href="/nepievienota/">Cita lapa</a>', {'Virtuves':'Кухни','Kontakti':'Контакты','Pieejams latviešu valodā':'Доступно на латышском','latviešu valodā':'на латышском'}, 'ru');
assert.match(russianLinks, /href="\/ru\/virtuves\/"/);
assert.match(russianLinks, /href="\/ru\/kontakti\/#pieteikums"/);
assert.match(russianLinks, /href="\/nepievienota\/" hreflang="lv" title="Доступно на латышском"/);
assert.match(russianLinks, /aria-label="на латышском"/);

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const sourceReviews = JSON.parse(await read('src/reviews.json'));
const neutral = new Set(['Lauras mēbeles', 'ANNO 2008', 'Matīsa iela 78A, Rīga, LV-1009', '© 2026 Lauras mēbeles', 'Language', 'LV', 'EN', 'RU', 'NO', 'Ilze Svence', 'Vita Purcēna', 'HOOLIGAN Bubble tea & coffee', 'Tison Bygg & Snickeri AB', 'R.A.S.A. Co', 'SIA “Lauras mēbeles”']);
const plain = html => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const galleryPaths = [...(await read('public/musu-darbi/index.html')).matchAll(/href="(\/musu-darbi\/[^"/]+\/)"/g)].map(m => m[1]);
const checkedTargets = new Set();
for (const lang of ['en', 'ru', 'no']) {
const translatedReviews = JSON.parse(await read(`src/i18n/reviews.${lang}.json`));
const dict = JSON.parse(await read(`src/i18n/${lang}.json`));
const projectData = JSON.parse((await read(`public/${lang}/projects.js`)).replace('window.LAURAS_PROJECTS = ', '').replace(/;\s*$/, ''));
const usedProjectIds = new Set();
const usedReviewIds = new Set();
const pages = [...config.pages[lang], ...galleryPaths.filter(path => hasLanguagePage(lang, path))];
if (lang !== 'no') assert.deepEqual(Object.keys(translatedReviews).sort(), sourceReviews.map(r => r.id).sort());
for (const page of pages) {
  const path = page.slice(1);
  const en = await read(`public/${lang}/${path}index.html`);
  const lv = await read(`public/${path}index.html`);
  assert.ok(en.includes(`<html lang="${lang}">`));
  assert.ok(en.includes(`hreflang="${lang}"`));
  assert.ok(lv.includes(`hreflang="${lang}"`));
  if (lang === 'no') {
    assert.match(en, /title="Tilgjengelig på latvisk"/);
    assert.doesNotMatch(en, /Available in Latvian|in Latvian/);
  } else assert.doesNotMatch(en, /class="lang-fallback"/);
  assert.match(en, /<meta name="robots" content="noindex,/);
  assert.ok(en.includes(`<link rel="canonical" href="${en.match(/<meta property="og:url" content="([^"]+)"/)[1]}">`));
  for (const alternate of ['lv', 'en', 'ru', 'no']) {
    assert.equal(en.includes(`<link rel="alternate" hreflang="${alternate}"`), languagesForPage(page).includes(alternate));
  }
  if (lang === 'ru' && page === '/vannasistabas-mebeles/') {
    assert.match(en, /сейчас мы изготавливаем мебель для ванной только вместе с другой мебелью для дома/);
    assert.match(en.match(/<meta name="description" content="([^"]*)"/)[1], /Сейчас изготавливаем только вместе с другой мебелью для дома/);
  }
  assert.equal([...en.matchAll(/<h1\b/g)].length, 1);
  const sections = html => [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(sections(en), sections(lv));
  const main = html => html.split('<main id="saturs">')[1].split('</main>')[0];
  const structure = html => [...main(html).matchAll(/<(section|article|div|h[1-6]|img|figure|details|summary|button)\b([^>]*)>/g)]
    .map(([, tag, attrs]) => [tag, ...['class', 'id', 'src', 'width', 'height', 'data-project'].map(attr => attrs.match(new RegExp(`(?:^|\\s)${attr}="([^"]*)"`))?.[1] || '')]);
  assert.deepEqual(structure(en), structure(lv), `Layout and imagery: ${page}`);
  // Atsauksmes izmanto atsevišķo pilno tulkojumu; marķētais H1 tulkojas kā veselums.
  walkHtml(lv.replace(/<article class="review-card"[\s\S]*?<\/article>/g, '').replace(/<h1\b[^>]*data-i18n-key="[^"]+"[\s\S]*?<\/h1>/g, ''), key => {
    assert.ok(dict[key] || neutral.has(key), `Missing ${lang.toUpperCase()} text or attribute: ${page} ${key}`);
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
    usedReviewIds.add(id);
    const quote = card.match(/<blockquote>([\s\S]*?)<\/blockquote>/)[1]
      .replace(/<span class="rm-dots"[^>]*>[\s\S]*?<\/span>/g, '')
      .replace(/<button[^>]*>[\s\S]*?<\/button>/g, '');
    assert.equal(plain(quote), translatedReviews[id]);
    assert.ok(card.includes(dict['Tulkots no latviešu valodas']));
    assert.ok(card.includes(sourceReviews.find(r => r.id === id).author));
  }
  for (const [, target] of en.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    if (target.startsWith('//') || checkedTargets.has(target)) continue;
    const destination = new URL('../public' + target, import.meta.url);
    const info = await stat(destination);
    if (info.isDirectory()) await stat(new URL('index.html', destination.href.replace(/\/?$/, '/')));
    checkedTargets.add(target);
  }
}
for (const root of ['public', 'dist']) {
  const directories = config.pages[lang].filter(path => path !== '/').map(path => path.replaceAll('/', ''));
  assert.deepEqual((await readdir(new URL(`../${root}/${lang}/`, import.meta.url))).sort(), ['index.html', 'projects.js', ...directories].sort());
  if (hasLanguagePage(lang, '/musu-darbi/')) assert.deepEqual((await readdir(new URL(`../${root}/${lang}/musu-darbi/`, import.meta.url))).sort(), ['index.html', ...galleryPaths.map(path => path.split('/')[2])].sort());
}
assert.deepEqual(projectData.map(p => p.id).sort(), [...usedProjectIds].sort());
assert.deepEqual(Object.keys(translatedReviews).sort(), [...usedReviewIds].sort());
console.log(`${lang.toUpperCase()}: ${config.pages[lang].length} pamatlapas un ${pages.length-config.pages[lang].length} projektu lapas pārbaudītas.`);
}
assert.match(await read('public/kontakti/index.html'), /hreflang="en"/);
assert.match(await read('public/cenas/index.html'), /hreflang="en"/);
console.log('Maršruti, saites, tulkojumi, struktūra, attēli, dialogi, metadati un atsauksmes pārbaudīti.');
