import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

const server = spawn(process.execPath, ['scripts/dev.mjs'], { cwd: new URL('../', import.meta.url), env: { ...process.env, PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe'] });
let log = '';
try {
  const base = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Preview server did not start: ' + log)), 10000);
    const finish = (error, value) => { clearTimeout(timer); error ? reject(error) : resolve(value); };
    server.on('error', error => finish(error));
    server.on('exit', code => finish(Error(`Server exited (${code}): ${log}`)));
    server.stderr.on('data', chunk => { log += chunk; });
    server.stdout.on('data', chunk => { log += chunk; const url = log.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0]; if (url) finish(null, url); });
  });
  const cases = [['/missing-page/', 'lv'], ['/en/missing-page/', 'en'], ['/ru/несуществующая/', 'ru'], ['/no/mangler/side/', 'no'], ['/enough/missing/', 'lv'], ['/no/missing.css', 'no'], ['/no/%ZZ', 'no']];
  for (const [path, lang] of cases) {
    const result = await fetch(base + path);
    assert.equal(result.status, 404, path);
    assert.match(result.headers.get('content-type'), /text\/html/);
    assert.match(result.headers.get('x-robots-tag'), /noindex/);
    const html = await result.text();
    assert.ok(html.includes(`<html lang="${lang}">`), path);
  }
  for (const prefix of ['', '/en', '/ru', '/no']) {
    assert.equal((await fetch(base + prefix + '/404.html')).status, 404);
    const head = await fetch(base + prefix + '/missing/', { method: 'HEAD' });
    assert.equal(head.status, 404);
    assert.equal(await head.text(), '');
    assert.equal((await fetch(base + prefix + '/virtuves/')).status, 200);
    const privacy = await fetch(base + prefix + '/privatuma-politika/');
    assert.equal(privacy.status, 200);
    assert.match(privacy.headers.get('x-robots-tag'), /noindex/);
    const privacyHtml = await privacy.text();
    assert.match(privacyHtml, /id="sikdatnes"/);
    assert.ok(privacyHtml.includes(`href="${prefix}/privatuma-politika/#sikdatnes" data-cookie-open`), prefix);
    const home = await (await fetch(base + prefix + '/')).text();
    for (const html of [home, privacyHtml]) {
      assert.match(html, /data-cookie-banner hidden/);
      assert.match(html, /id="cookie-settings"/);
      assert.match(html, /src="\/cookie-settings\.js"/);
      assert.match(html, /id="cookie-maps"[^>]*name="maps"/);
      assert.match(html, /id="cookie-analytics"[^>]*disabled/);
      assert.match(html, /id="cookie-marketing"[^>]*disabled/);
    }
    const contact = await (await fetch(base + prefix + '/kontakti/')).text();
    assert.match(contact, /id="karte" data-cookie-map/);
    assert.ok(contact.includes(`href="${prefix}/privatuma-politika/#sikdatnes" data-cookie-open`), prefix);
    assert.match(contact, /<template data-cookie-map-template>[\s\S]*?\sdata-src="https:\/\/maps\.google\.com\/maps\?/);
    assert.doesNotMatch(contact, /<iframe[^>]*\ssrc=/);
    assert.match(contact, /<form id="lead-form"[^>]*method="post"/);
    assert.match(contact, /<button class="button" type="submit" disabled><span id="contact-submit-text">/);
    assert.ok(contact.includes('action="/api/contact/"'));
    assert.ok(contact.includes('src="/contact.js"'));
  }
  const map = JSON.parse(await readFile(new URL('../docs/migration/redirect-map.json', import.meta.url), 'utf8'));
  for (const { oldPath, target, language } of map.records.filter(record => record.decision === 'approved')) {
    const variants = new Set([oldPath, oldPath.slice(0, -1), decodeURIComponent(oldPath),
      oldPath.replace(/%[0-9a-f]{2}/gi, escape => escape.toLowerCase()), oldPath + '?lang=' + language]);
    for (const source of variants) {
      const response = await fetch(base + source, { redirect: 'manual' });
      assert.equal(response.status, 301, source);
      assert.equal(response.headers.get('location'), target, source);
    }
    const destination = await fetch(base + target, { redirect: 'manual' });
    assert.equal(destination.status, 200, target);
    assert.ok((await destination.text()).includes(`<html lang="${language}">`), target);
  }
  assert.equal((await fetch(base + '/test/')).status, 404);
  const xml = await fetch(base + '/sitemap.xml');
  assert.equal(xml.status, 200);
  assert.match(xml.headers.get('content-type'), /application\/xml/);
  assert.equal((await fetch(base + '/styles.css')).status, 200);
  assert.equal((await fetch(base + '/cookie-settings.js')).status, 200);
  assert.equal((await fetch(base + '/en/missing/', { method: 'POST' })).status, 405);
  const contact = await fetch(base + '/api/contact',{ method:'POST',headers:{ 'Content-Type':'application/json' },body:'{}' });
  assert.equal(contact.status,503);
  assert.deepEqual(await contact.json(),{ ok:false,code:'unavailable' });
  assert.equal((await fetch(base + '/api/contact')).status,405);
  console.log('HTTP: localized missing paths return 404, HEAD is empty, existing pages/assets remain available.');
} finally {
  const exited = once(server, 'exit');
  if (server.exitCode === null) { server.kill(); await exited; }
}
