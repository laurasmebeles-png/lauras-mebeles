// Valodu slānis. Latviešu teksts paliek avotā (src/*, scripts/generate-pages.mjs).
// Citas valodas = vārdnīca src/i18n/<kods>.json, kur atslēga ir latviešu teksta fragments, vērtība ir tulkojums.
// Tukša vērtība ("") nozīmē "vēl netulkots" un lapā paliek latviešu teksts.
import { readFile, writeFile } from 'node:fs/promises';

const cfgUrl = new URL('../src/i18n/config.json', import.meta.url);
export const config = JSON.parse(await readFile(cfgUrl, 'utf8'));
export const defaultLang = config.default;
export const enabledLangs = config.enabled;
export const langPrefix = lang => (lang === defaultLang ? '' : `/${lang}`);

export async function loadDicts() {
  const dicts = {};
  for (const lang of Object.keys(config.languages)) {
    if (lang === defaultLang) continue;
    try { dicts[lang] = JSON.parse(await readFile(new URL(`../src/i18n/${lang}.json`, import.meta.url), 'utf8')); }
    catch { dicts[lang] = {}; }
  }
  return dicts;
}

const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };
export const decode = s => s.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, m => ENT[m]);
export const encode = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const hasLetters = s => /\p{L}/u.test(s);
const looksTranslatable = s => hasLetters(s) && !/^[\w.+-]+@[\w.-]+\.\w+$/.test(s) && !/^https?:\/\//.test(s);

// Visi tulkojamie fragmenti HTML virknē: callback(fragments) -> aizstājējs
// kind: 'text' | 'attr'
const TAG_ATTRS = ['alt', 'title', 'aria-label', 'placeholder'];
const META_RE = /<meta\s[^>]*(?:name="description"|property="og:(?:title|description|image:alt)")[^>]*>/;
const JSON_FIELDS = new Set(['label', 'desc', 'note', 'includes', 'hint', 'title', 'description', 'labels']);

function mapJson(value, fn, key) {
  if (typeof value === 'string') return JSON_FIELDS.has(key) ? fn(value) : value;
  if (Array.isArray(value)) return value.map(v => mapJson(v, fn, key));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapJson(v, fn, k)]));
  return value;
}

export function mapProjects(projects, fn) {
  return projects.map(p => mapJson(p, fn, ''));
}

// Apstaigā HTML un katram fragmentam izsauc fn(teksts) -> jauns teksts. Atgriež jauno HTML.
export function walkHtml(html, fn) {
  const parts = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]+>)/);
  const sub = (raw, mode) => {
    const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    const core = raw.trim();
    if (!core) return raw;
    const key = decode(core).replace(/\s+/g, ' ');
    if (!looksTranslatable(key)) return raw;
    const out = fn(key, mode);
    return out === key ? raw : lead + encode(out) + trail;
  };
  return parts.map(part => {
    if (part.startsWith('<script')) {
      const m = part.match(/^(<script[^>]*type="application\/json"[^>]*>)([\s\S]*)(<\/script>)$/);
      if (m) {
        let data; try { data = JSON.parse(m[2]); } catch { return part; }
        return m[1] + JSON.stringify(mapJson(data, s => fn(s, 'json'))).replace(/</g, '\\u003c') + m[3];
      }
      return part;
    }
    if (part.startsWith('<style') || part.startsWith('<!--')) return part;
    if (part.startsWith('<')) {
      let tag = part;
      for (const a of TAG_ATTRS) tag = tag.replace(new RegExp(`(\\s${a}=")([^"]*)(")`, 'g'), (_, p, v, q) => p + sub(v, 'attr') + q);
      if (META_RE.test(tag)) tag = tag.replace(/(\scontent=")([^"]*)(")/, (_, p, v, q) => p + sub(v, 'attr') + q);
      return tag;
    }
    return sub(part, 'text');
  }).join('');
}

// Iekšējās saites uz /<lang>/..., resursi (ar paplašinājumu) paliek
export function prefixLinks(html, lang) {
  const pre = langPrefix(lang);
  if (!pre) return html;
  return html.replace(/<[^>]+>/g, tag => {
    if (/\shreflang=/.test(tag)) return tag; // valodu pārslēdzēja saites netiek pārrakstītas
    return tag.replace(/(\s(?:href|action)=")(\/[^"]*)(")/g, (m, a, url, q) => {
      if (url.startsWith('//')) return m;
      const pathPart = url.split(/[?#]/)[0];
      if (/\.[a-z0-9]+$/i.test(pathPart.split('/').pop())) return m;
      return a + pre + url + q;
    });
  });
}

export function translateHtml(html, dict, lang) {
  const used = new Set();
  const out = walkHtml(html, (key) => {
    const t = dict[key];
    if (t) { used.add(key); return t; }
    return key;
  });
  return prefixLinks(out, lang);
}

export async function writeDict(lang, dict) {
  const sorted = Object.fromEntries(Object.entries(dict));
  await writeFile(new URL(`../src/i18n/${lang}.json`, import.meta.url), JSON.stringify(sorted, null, 2) + '\n');
}
