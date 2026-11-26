import lv from '../content/contact/lv.json' with { type: 'json' };
import en from '../content/contact/en.json' with { type: 'json' };
import ru from '../content/contact/ru.json' with { type: 'json' };
import no from '../content/contact/no.json' with { type: 'json' };

export const contactCopy = { lv, en, ru, no };
export const contactLanguages = Object.keys(contactCopy);
export const contactLanguage = value => contactLanguages.includes(value) ? value : 'lv';

export const furnitureLabels = {
  '': 'Vēlos pārrunāt iespējas', virtuve: 'Virtuve', skapis: 'Skapis vai garderobe',
  prieksnams: 'Priekšnama mēbeles', vannasistaba: 'Vannas istabas mēbeles',
  viesistaba: 'Viesistabas mēbeles', citas: 'Citas mēbeles'
};
export const priceExampleLabels = {
  taisna: 'Taisna virtuve gar vienu sienu', 'gaisa-l-veida': 'Gaiša L veida virtuve',
  'egger-l-veida': 'L veida virtuve ar EGGER apdari',
  'vitrina-l-veida': 'L veida virtuve ar izgaismotu vitrīnu', 'ar-salu': 'Virtuve ar salu'
};

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
const languageNames = { lv:'Latviešu', en:'Angļu', ru:'Krievu', no:'Norvēģu Bokmål' };

function emailDocument(lang, title, body) {
  return `<!doctype html><html lang="${lang === 'no' ? 'nb' : lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head><body style="margin:0;background:#f7f5f2;color:#292827;font-family:Arial,Helvetica,sans-serif;line-height:1.65"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#fff;border-top:4px solid #b12632"><tr><td style="padding:24px;font-size:20px;font-weight:bold">LAURAS MĒBELES</td></tr><tr><td style="padding:0 24px 24px;overflow-wrap:anywhere">${body}</td></tr></table></td></tr></table></body></html>`;
}

export function customerEmail(language, replyTo) {
  const lang = contactLanguage(language);
  const c = contactCopy[lang].email;
  // Deliberately do not reflect user-entered names, messages or links in an
  // automatic email to an unverified address.
  const paragraphs = [c.greeting, c.thanks, c.received, c.reply, c.signoff];
  const text = [...paragraphs, replyTo, c.automatic].join('\n\n');
  const body = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')
    + `<p><a href="mailto:${escapeHtml(replyTo)}" style="color:#b12632">${escapeHtml(replyTo)}</a></p>`
    + `<p style="font-size:12px;color:#65615d">${escapeHtml(c.automatic)}</p>`;
  return { subject:c.subject, text, html:emailDocument(lang, c.subject, body) };
}

export function businessEmail(data, sourceUrl) {
  const rows = [
    ['Pieteikuma ID', data.submissionId],
    ['Lapas valoda', `${languageNames[data.language]} (${data.language})`],
    ['Vārds', data.name], ['Vēlamā saziņa', data.contactMethod === 'phone' ? 'Pa tālruni' : 'E-pastā'],
    ['E-pasts', data.email || 'Nav norādīts'], ['Tālrunis', data.phone || 'Nav norādīts'],
    ['Mēbeļu kategorija', furnitureLabels[data.furniture]],
    ['Cenu piemērs', priceExampleLabels[data.priceExample] || 'Nav izvēlēts'],
    ['Papildu konteksts', data.context || 'Nav norādīts'],
    ['Ziņa', data.message || 'Nav norādīta'], ['Avota lapa', sourceUrl]
  ];
  const subject = `Jauns pieteikums (${data.language.toUpperCase()}) | Lauras mēbeles`;
  const text = rows.map(([label,value]) => `${label}:\n${value}`).join('\n\n');
  const body = `<h1 style="font-size:24px">Jauns mājaslapas pieteikums</h1>` + rows.map(([label,value]) => `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replaceAll('\n','<br>')}</p>`).join('');
  return { subject, text, html:emailDocument('lv', subject, body) };
}
