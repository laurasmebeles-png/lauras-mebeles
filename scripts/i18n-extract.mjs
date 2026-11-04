// Izvelk visus tulkojamos latviešu fragmentus no sagenerētajām LV lapām un papildina vārdnīcas src/i18n/<kods>.json
// Lietošana: npm run generate && npm run i18n:extract
import { readFile, readdir } from 'node:fs/promises';
import { config, defaultLang, walkHtml, mapProjects, loadDicts, writeDict } from './i18n.mjs';

const pub = new URL('../public/', import.meta.url);
const langDirs = new Set(Object.keys(config.languages).filter(l => l !== defaultLang));
const keys = new Map(); // fragments -> lapu skaits
const add = (k, where) => { if (!/\p{L}/u.test(k)) return; if (!keys.has(k)) keys.set(k, new Set()); keys.get(k).add(where); };

async function pages(dir, rel = '') {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    if (!rel && langDirs.has(e.name)) continue;
    const sub = new URL(e.name + '/', dir);
    try { const html = await readFile(new URL('index.html', sub), 'utf8'); walkHtml(html, k => (add(k, rel + e.name), k)); } catch {}
    await pages(sub, rel + e.name + '/');
  }
}
walkHtml(await readFile(new URL('index.html', pub), 'utf8'), k => (add(k, '/'), k));
await pages(pub);

// projektu dati (virsraksti, apraksti, Pirms/Pēc)
const pj = await readFile(new URL('projects.js', pub), 'utf8');
mapProjects(JSON.parse(pj.slice(pj.indexOf('['), pj.lastIndexOf(']') + 1)), k => (add(k, 'projects.js'), k));

// app.js T('...') virknes
const app = await readFile(new URL('app.js', pub), 'utf8');
for (const m of app.matchAll(/\bT\((['`])((?:\\.|(?!\1).)*)\1\)/g)) add(m[2], 'app.js');

const dicts = await loadDicts();
for (const lang of Object.keys(dicts)) {
  const dict = dicts[lang];
  let added = 0;
  for (const k of keys.keys()) if (!(k in dict)) { dict[k] = ''; added++; }
  const unused = Object.keys(dict).filter(k => !keys.has(k));
  const done = Object.values(dict).filter(Boolean).length;
  await writeDict(lang, dict);
  console.log(`${lang}: ${Object.keys(dict).length} fragmenti, tulkoti ${done}, pievienoti jauni ${added}, neizmantoti ${unused.length}`);
}
console.log(`Kopā unikālu latviešu fragmentu: ${keys.size}`);
