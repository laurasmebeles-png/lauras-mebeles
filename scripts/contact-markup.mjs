import { contactCopy } from '../lib/contact-content.mjs';
import { publicContactConfig } from '../lib/contact-config.mjs';

const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);

export function contactMarkup(html, lang, env = process.env) {
  const privateTest = env.VERCEL_ENV === 'preview' && env.CONTACT_ENABLED === 'true';
  const testNote = contactCopy[lang].ui.privateTestNotice;
  if (privateTest && html.includes('id="privacy-contact"')) {
    html = html.replace(/(<h2 id="privacy-contact">[^<]*<\/h2>)/, '$1<p>' + esc(testNote) + '</p>');
  }
  if (!html.includes('id="lead-form"')) return html;
  const config = publicContactConfig(env);
  const ui = contactCopy[lang].ui;
  const settings = JSON.stringify({ ...config, language:lang, ui }).replaceAll('<','\\u003c');
  html = html.replace(/<form id="lead-form" class="lead-form"(?: method="post")?>/,'<form id="lead-form" class="lead-form" method="post" action="/api/contact/" aria-describedby="form-fine">')
    .replace(/<p class="form-demo">[\s\S]*?<\/p>/,config.enabled ? (privateTest ? `<p class="form-demo">${esc(testNote)}</p>` : '') : `<p class="form-demo"><span class="dot"></span>${esc(ui.previewNote)}</p>`)
    .replace(/(<label for="email">)[\s\S]*?(<\/label>)/,`$1<span id="email-label-text">${esc(ui.emailLabel)}</span> <span id="email-required">*</span><span id="email-optional" class="optional" hidden>${esc(ui.optional)}</span>$2`)
    .replace(/(id="phone"[^>]*?)pattern="[^"]*"/,'$1pattern="[+0-9 ().-]{7,25}"')
    .replace(/(id="phone"[^>]*?)title="[^"]*"/,`$1title="${esc(ui.invalidPhone)}"`)
    .replace(/<button class="button" type="submit"(?: data-preview-submit disabled)?>[\s\S]*?<\/button><p class="form-fine">[\s\S]*?<\/p>/,match => {
      const icon = match.match(/<span aria-hidden="true">[\s\S]*?<\/span>/)?.[0] || '';
      return `<div class="form-honeypot" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div><div id="contact-security"></div><button class="button" type="submit" disabled><span id="contact-submit-text">${esc(ui.submit)}</span> ${icon}</button><p id="form-fine" class="form-fine">${esc(ui.fine)}</p><noscript><p class="form-fine">${esc(ui.unavailable)}</p></noscript>`;
    });
  for (const field of ['name','email','phone','furniture','message']) {
    const re = new RegExp(`(<(?:input|select|textarea) id="${field}"[^>]*)(>)`);
    html = html.replace(re,`$1 aria-describedby="${field}-error"$2`);
    const end = field === 'furniture' ? '</select>' : field === 'message' ? '</textarea>' : null;
    if (end) {
      const start = html.indexOf(`id="${field}"`);
      const at = html.indexOf(end,start) + end.length;
      html = html.slice(0,at) + `<p id="${field}-error" class="form-field-error" hidden></p>` + html.slice(at);
    } else html = html.replace(new RegExp(`(<input id="${field}"[^>]*>)`),`$1<p id="${field}-error" class="form-field-error" hidden></p>`);
  }
  return html.replace('</head>',`<script>window.LAURAS_CONTACT=${settings};</script><script src="/contact.js" defer></script></head>`);
}
