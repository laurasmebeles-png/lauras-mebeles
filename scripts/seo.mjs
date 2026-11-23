import { enabledLangs, langPrefix, languagesForPage } from './i18n.mjs';

export const launchOrigin = 'https://laurasmebeles.lv';
const xml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export function sitemap(records, origin, { launch = false } = {}) {
  const base = new URL(origin);
  if (!['http:', 'https:'].includes(base.protocol) || base.pathname !== '/' || base.search || base.hash || base.username || base.password) throw Error('Sitemap requires a site origin');
  const paths = new Set(records.filter(record => !record.reviewOnly && !record.notFound && (launch || record.indexable)).map(record => record.path));
  const entries = [];
  for (const path of [...paths].sort()) {
    const available = languagesForPage(path).filter(lang => records.some(record => record.path === path && record.lang === lang && !record.reviewOnly && !record.notFound && (launch || record.indexable)));
    const url = lang => `${base.origin}${langPrefix(lang)}/${path ? path + '/' : ''}`;
    for (const lang of available) {
      const alternates = available.length > 1 ? [...available.map(other => `    <xhtml:link rel="alternate" hreflang="${other}" href="${xml(url(other))}"/>`), ...(available.includes('lv') ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(url('lv'))}"/>`] : [])] : [];
      entries.push(`  <url>\n    <loc>${xml(url(lang))}</loc>${alternates.length ? '\n' + alternates.join('\n') : ''}\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.length ? '\n' + entries.join('\n') : ''}\n</urlset>\n`;
}

export function languageForPath(pathname) {
  const first = pathname.split('/')[1];
  return enabledLangs.includes(first) ? first : 'lv';
}
