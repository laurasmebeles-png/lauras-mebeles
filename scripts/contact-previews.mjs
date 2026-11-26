import { mkdir,writeFile } from 'node:fs/promises';
import path from 'node:path';
import { contactCopy,customerEmail,businessEmail } from '../lib/contact-content.mjs';

const directory = path.resolve(process.argv[2] || '/private/tmp/lauras-contact-previews');
await mkdir(directory,{ recursive:true });
const names = { lv:'Latviski',en:'English',ru:'Русский',no:'Norsk bokmål' };
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let sections = '', allText = 'Lauras mēbeles | Kontaktformas un e-pastu teksti\nSagatave, 24.11.2026. Reāla nosūtīšana vēl nav aktivizēta.\n';
for (const [lang,copy] of Object.entries(contactCopy)) {
  const customer = customerEmail(lang,'info@laurasmebeles.lv');
  const business = businessEmail({ submissionId:'00000000-0000-4000-8000-000000000001',language:lang,
    name:'Pārbaudes klients',contactMethod:'email',email:'client@example.com',phone:'',furniture:'virtuve',
    priceExample:'',context:'',message:'Šis ir mākslīgs pieteikums e-pasta izkārtojuma pārbaudei.'
  },`https://laurasmebeles.lv/${lang === 'lv' ? '' : `${lang}/`}kontakti/`);
  for (const [kind,email] of [['customer',customer],['business',business]]) {
    await writeFile(path.join(directory,`${lang}-${kind}.html`),email.html);
    await writeFile(path.join(directory,`${lang}-${kind}.txt`),`Temats: ${email.subject}\nReply-To: info@laurasmebeles.lv\n\n${email.text}\n`);
  }
  const messages = Object.entries(copy.ui).map(([key,value]) => `<dt>${key}</dt><dd>${esc(value)}</dd>`).join('');
  sections += `<section><h2>${names[lang]}</h2><p><a href="${lang}-customer.html">Klienta e-pasts</a> · <a href="${lang}-business.html">Uzņēmuma e-pasts</a></p><p><strong>${esc(customer.subject)}</strong></p><pre>${esc(customer.text)}</pre><details><summary>Visi formas paziņojumi</summary><dl>${messages}</dl></details></section>`;
  allText += `\n\n${names[lang].toUpperCase()}\n\nKLIENTA SAŅEMŠANAS APSTIPRINĀJUMS\nTemats: ${customer.subject}\nReply-To: info@laurasmebeles.lv\n\n${customer.text}\n\nFORMAS PAZIŅOJUMI\n` + Object.entries(copy.ui).map(([key,value]) => `${key}: ${value}`).join('\n');
}
await writeFile(path.join(directory,'index.html'),`<!doctype html><html lang="lv"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kontaktformas un e-pastu priekšskatījumi</title><style>body{max-width:1000px;margin:36px auto;padding:0 20px;font:16px/1.6 system-ui;color:#292827;background:#f7f5f2}section{background:white;border-top:3px solid #b12632;margin:32px 0;padding:24px}a{color:#9d2430}pre{white-space:pre-wrap;font:inherit}dt{font-weight:bold;margin-top:16px}dd{margin:0;overflow-wrap:anywhere}summary{cursor:pointer}</style><h1>Kontaktformas un e-pastu priekšskatījumi</h1><p>Lokāla sagatave. Nekas netiek nosūtīts. Uzņēmuma e-pasts ir latviski ar klienta valodu un avota lapu; klienta apstiprinājums ir viņa izvēlētajā lapas valodā.</p>${sections}</html>`);
await writeFile(path.join(directory,'visi-teksti.txt'),allText+'\n');
console.log(directory);
