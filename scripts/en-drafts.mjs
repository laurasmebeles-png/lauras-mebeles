// Izveido izskatāmus EN melnrakstus no aktuālo LV lapu struktūras.
// pending-translations.json netiek izmantots publisko lapu ģenerēšanā.
import fs from 'node:fs';
import {walkHtml,encode,decode,hasLanguagePage} from './i18n.mjs';
const read=path=>JSON.parse(fs.readFileSync(path,'utf8'));
const dict={...read('src/i18n/en.json'),...read('content/en/pending-translations.json')};
const reviews=read('src/i18n/reviews.en.json');
const sourceReviews=new Map(read('src/reviews.json').map(r=>[r.id,r]));
const plan=read('docs/research/2026-11-22/page-keyword-map.json').pages.filter(p=>!['home','kitchens'].includes(p.id));
const neutral=new Set(['Matīsa iela 78A, Rīga, LV-1009','Ilze Svence','Vita Purcēna','HOOLIGAN Bubble tea & coffee','Tison Bygg & Snickeri AB','R.A.S.A. Co','SIA “Lauras mēbeles”','Google','Facebook','G','f']);
const missing=new Set();
const pages=plan.map(page=>{
  let html=fs.readFileSync('public'+page.lv_path+'index.html','utf8').split(/<main[^>]*>/)[1].split('</main>')[0];
  // Galerijas attēli, atlases numuri un to secība paliek tie paši; tos nedublē teksta melnrakstā.
  html=html.replace(/<div class="gallery-projects"[^>]*>[\s\S]*?<\/div>/g,'<p>[Galerijas attēli un projektu atlases numuri paliek pašreizējā secībā.]</p>');
  html=html.replace(/<article class="review-card" data-review-id="([^"]+)"[\s\S]*?<\/article>/g,(_,id)=>{
    if(!reviews[id])throw Error('Missing review: '+id);
    const r=sourceReviews.get(id);
    return `<h3>${encode(r.author)}</h3><p>${r.source}${r.rating?' · '+r.rating+'/5':''}. Translated from Latvian.</p><blockquote><p>${encode(reviews[id])}</p></blockquote>`;
  });
  html=walkHtml(html,(key,kind)=>{
    if(kind!=='text')return key;
    if(dict[key])return dict[key];
    if(/^[+]?[0-9]+ foto$/.test(key))return key.replace('foto','photo'+(key==='1 foto'?'':'s'));
    if(key.startsWith('[')||key.endsWith('Translated from Latvian.')||Object.values(reviews).includes(key)||[...sourceReviews.values()].some(r=>r.author===key)||neutral.has(key))return key;
    missing.add(key);return key;
  });
  return {...page,html};
});
if(missing.size)throw Error('Missing draft text translations:\n'+[...missing].join('\n'));
const strip=s=>decode(s.replace(/<[^>]+>/g,'')).replace(/[ \t]+/g,' ').trim();
function markdown(html){
  return decode(html
    .replace(/<(svg|script|style)\b[\s\S]*?<\/\1>/g,'')
    .replace(/<p class="breadcrumbs">([\s\S]*?)<\/p>/g,(_,s)=>'\n\n'+strip(s).replaceAll('/',' / ')+'\n\n')
    .replace(/<blockquote>([\s\S]*?)<\/blockquote>/g,(_,s)=>'\n\n> '+strip(s)+'\n\n')
    .replace(/<h([1-6])[^>]*>/g,(_,n)=>'\n\n'+'#'.repeat(Math.min(Number(n)+1,4))+' ')
    .replace(/<br\s*\/?\s*>/g,' ')
    .replace(/<(?:p|li|label|option)\b[^>]*>/g,'\n\n')
    .replace(/<\/(?:p|article|section|li|div|form|select|label|option|video|figcaption|h[1-6])>/g,'\n\n')
    .replace(/<\/(?:a|button|summary)>/g,'\n\n')
    .replace(/<\/span><span class="ba-tag ba-tag-after">/g,'</span> / <span class="ba-tag ba-tag-after">')
    .replace(/<\/strong>/g,' ')
    .replace(/<[^>]+>/g,''))
    .replace(/[ \t]+/g,' ').replace(/ *\n */g,'\n').replace(/\n{3,}/g,'\n\n').trim();
}
const index=['# EN lapu teksti un melnraksti','',
  '22.11.2026. Stila redakcija v2. Pie katras lapas norādīts, vai tās teksts ir ievietots priekšskatījumā vai vēl izskatāms. Saglabāta pašreizējo LV lapu satura secība un projektu atlase. Atsauksmes tulkotas cieši pēc oriģināla, bez SEO pārrakstīšanas.',''];
for(const page of pages){
  const approved=hasLanguagePage('en',page.lv_path);
  const name=page.lv_path.split('/').filter(Boolean).join('-')+'.md';
  const note=page.id==='prices'?'\nCenu pārbaudes piezīme: summas un komplektācijas pārceltas no pašreizējā LV priekšskatījuma. Šis tulkojums nav jauns klienta cenu apstiprinājums. Pirms EN cenu lapas ievietošanas jāsalāgo tās ar saskaņotajām cenām.\n':'';
  const meta=['---',`status: ${approved?'Signes apstiprināts teksts, ievietots EN priekšskatījumā':'redakcionāls melnraksts v2 pēc stila pārskata, Signes izskatīšanai'}`,'updated: 2026-11-22',`source_path: ${page.lv_path}`,`title: ${page.en.title}`,`description: ${page.en.description}`,'---','',
    `SEO fokuss: ${[page.en.primary,...page.en.secondary].filter(Boolean).join('; ')||'zīmola vai funkcionāls nolūks'}.`,'',
    'Sadaļas un projekti seko pašreizējās LV lapas secībai. Atslēgvārdu saraksts un redaktores piezīmes nav lapā ievietojams teksts.',note,'',markdown(page.html),''].join('\n');
  fs.writeFileSync('content/en/'+name,meta);
  index.push(`- [${page.en.title.split(' | ')[0]}](${name}) (${page.lv_path}). ${approved?'Apstiprināts, ievietots EN priekšskatījumā.':'Melnraksts izskatīšanai.'}`);
}
fs.writeFileSync('content/en/parejo-lapu-melnraksti.md',index.join('\n')+'\n');
console.log(`Atjaunoti ${pages.length} lapu teksti un to statusu rādītājs.`);
