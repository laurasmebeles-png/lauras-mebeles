import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { categories, projects } from '../src/catalog.mjs';
const root = new URL('../', import.meta.url);
const source = await readFile(new URL('src/home.html', root), 'utf8');
const reviews = JSON.parse(await readFile(new URL('src/reviews.json',root),'utf8'));
// Kanoniskā adrese: SITE_URL (palaišanai: https://laurasmebeles.lv), citādi Vercel produkcijas adrese, citādi lokāli.
const siteUrl = (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://127.0.0.1:4173')).replace(/\/+$/,'');
const siteName = 'Lauras mēbeles';
const ogImage = { path:'/images/og-default.jpg', width:1200, height:630, alt:'Gaiša virtuve ar ēdamzonu un dzīvojamo telpu' };
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const arrow = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const reviewPath = '/virtuves-mebeles-atsauksmes-virtuves-iekartas/';
const section = id => { const start=source.indexOf(`<section id="${id}"`); const end=source.indexOf('</section>',start)+10; if(start<0) throw Error(`Missing section ${id}`); return source.slice(start,end); };
const head = source.slice(0, source.indexOf('<body>'));
const top = source.match(/<div class="topline">[\s\S]*?<\/div>/)[0];
const header = `<a class="skip" href="#saturs">Pāriet uz saturu</a>${top}
<header class="header"><a href="/" class="brand" aria-label="Lauras mēbeles, sākums"><img src="/images/logo.png" alt="Lauras mēbeles" width="171" height="68"></a>
<button class="menu-toggle" aria-label="Atvērt izvēlni" aria-expanded="false" aria-controls="navigation">Izvēlne <span aria-hidden="true">☰</span></button>
<nav id="navigation" aria-label="Galvenā navigācija"><details class="service-menu"><summary>Pakalpojumi</summary><div class="service-submenu"><a href="/pakalpojumi/">Visi pakalpojumi</a>${categories.map(c=>`<a href="/${c.path}/">${esc(c.label)}</a>`).join('')}</div></details><a href="/musu-darbi/">Mūsu darbi</a><a href="/cenas/">Cenas</a><a href="/par-mums/">Par mums</a><a href="${reviewPath}">Atsauksmes</a><a href="/kontakti/">Kontakti</a><a class="button button-small" href="/kontakti/#pieteikums" data-event="cta_click" data-location="header">Saņemt cenas piedāvājumu ${arrow}</a></nav></header>`;
const footer = source.match(/<footer>[\s\S]*?<\/footer>/)[0].replace('href="#mebeles"','href="/pakalpojumi/"').replace('>Mēbeles</a>','>Pakalpojumi</a>').replace('href="#darbi"','href="/musu-darbi/"').replace('href="#pieteikums"','href="/kontakti/#pieteikums"').replace('Dizaina uzmetums 02','Struktūras uzmetums 03');
const dialog = `<dialog id="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Aizvērt projektu">×</button><img id="dialog-image" alt="" width="1600" height="1067"><div class="photo-controls"><button type="button" id="photo-prev" aria-label="Iepriekšējais foto">←</button><p id="photo-count" aria-live="polite"></p><button type="button" id="photo-next" aria-label="Nākamais foto">→</button></div><div class="dialog-body"><p class="eyebrow">Lauras mēbeļu projekts</p><h2 id="dialog-title"></h2><p id="dialog-description"></p></div></dialog>`;
const cta = (title='Iepatikās kāds risinājums?') => `<aside class="project-cta"><div><h2>${esc(title)}</h2><p>Pārrunāsim, kas būtu piemērots jūsu mājām.</p></div><a class="button" href="/kontakti/#pieteikums" data-event="cta_click" data-location="gallery">Saņemt cenas piedāvājumu ${arrow}</a></aside>`;
const crumbs = label => `<p class="breadcrumbs"><a href="/">Sākums</a><span>/</span>${esc(label)}</p>`;
const pageIntro = (label,title,text) => `<section class="section page-intro">${crumbs(label)}<p class="eyebrow">${esc(label)}</p><h1>${esc(title)}</h1><p>${esc(text)}</p></section>`;
const card = p => `<article class="project" data-category="${p.categories.join(' ')}"><button class="project-open" data-project="${p.id}" aria-label="Atvērt projektu: ${esc(p.title)}"><img src="/images/${p.photos[0]}" alt="${esc(p.title)}" width="800" height="600" loading="lazy"><span class="project-zoom" aria-hidden="true">${arrow}</span>${p.photos.length>1?`<span class="photo-badge">${p.photos.length} foto</span>`:''}</button><div class="project-caption"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></div></article>`;
const grid = list => `<div class="projects-grid uniform-grid">${list.map(card).join('')}</div>`;
// Pakalpojumu bloks: virtuves ir galvenais virziens (kolāža), pārējās kategorijas ir saraksts.
// Kolāžas foto izvēlēti tā, lai tie nesakristu ar sākumlapas hero un "Realizētie projekti" foto.
// Kad citai kategorijai būs 3+ foto, tai var pievienot kolāžu tāpat.
const featuredCategory = 'virtuve';
const featuredCollage = ['sala','gaisa','kompakta'];
const categoryCards = () => {
  const feat = categories.find(c=>c.id===featuredCategory);
  const shots = featuredCollage.map(id=>projects.find(p=>p.id===id)).map(p=>({src:p.photos[0],alt:p.title}));
  const rest = categories.filter(c=>c!==feat);
  const collage = shots.map((s,i)=>`<img src="/images/${s.src}" alt="${esc(s.alt)}" width="800" height="${i===0?1000:600}" loading="lazy">`).join('');
  const rows = rest.map(c=>`<li><a href="/${c.path}/" data-event="category_select" data-category="${c.id}"><div class="service-row-text"><h3>${esc(c.label)}</h3><p>${esc(c.short)}</p></div>${arrow}</a></li>`).join('');
  return `<div class="services-layout"><a class="service-feature" href="/${feat.path}/" data-event="category_select" data-category="${feat.id}"><div class="collage">${collage}</div><div class="service-feature-copy"><h3>${esc(feat.label)} ${arrow}</h3><p>${esc(feat.short)}</p></div></a><ul class="service-rows">${rows}</ul></div>`;
};
const reviewCard = r => { const text = r.text.replace(/[\u2013\u2014]/g, '-'); const cut = text.indexOf('. ',160); const excerpt = cut>0?text.slice(0,cut+1):text; const rest=cut>0?text.slice(cut+2):''; return `<article class="review-card" data-review-source="${r.source}"><h3>${esc(r.author)}</h3><blockquote><p>${esc(excerpt)}</p>${rest?`<details><summary>Lasīt vairāk</summary><p>${esc(rest)}</p></details>`:''}</blockquote></article>`; };
const reviewGrid = list => `<div class="review-grid">${list.map(reviewCard).join('')}</div>`;
const homeServices = `<section id="mebeles" class="section"><div class="section-heading"><div><p class="eyebrow">01 / Pakalpojumi</p><h2>Ko mēs izgatavojam?</h2></div><p>No virtuves līdz garderobei. Mēbeles, kas iederas jūsu mājās.</p></div>${categoryCards()}</section>`;
const homeProjects = `<section id="darbi" class="section projects-section"><div class="section-heading"><div><p class="eyebrow">02 / Realizētie projekti</p><h2>Iedvesma jūsu mājām.</h2></div><p>Virtuves, skapji un pārdomāti risinājumi īstās mājās.</p></div>${grid(['peleka','skapis','prieksnams'].map(id=>projects.find(p=>p.id===id)))}<div class="gallery-bottom"><a class="text-link" href="/musu-darbi/">Visi mūsu darbi ${arrow}</a></div>${cta()}</section>`;
const homeReviews = `<section id="atsauksmes" class="section"><div class="section-heading"><div><p class="eyebrow">Klientu pieredze</p><h2>Par rezultātu<br>stāsta klienti.</h2></div><a class="text-link" href="${reviewPath}">Visas atsauksmes ${arrow}</a></div>${reviewGrid([reviews[0],reviews[2],reviews[5]])}</section>`;
let home = source.slice(source.indexOf('<main id="saturs">')+18,source.indexOf('</main>'));
home=home.replace(section('mebeles'),homeServices).replace(section('darbi'),homeProjects);
home=home.replace(/<section class="testimonial[\s\S]*?<\/section>/,homeReviews);
const statsBand=`<section class="stats-band" aria-label="Lauras mēbeles skaitļos"><dl>${[['30+','Gadu pieredze','Izgatavojam virtuves, skapjus un citas mēbeles pēc pasūtījuma.',`<path d="M3 10a9 9 0 1 1 2.8 8.5M3 4v6h6"/><path d="M12 7v5l3 2"/>`],['11 200+','Realizēti projekti','Katru risinājumu pielāgojam jūsu telpas izmēriem un ikdienas vajadzībām.',`<path d="M3 21V8l9-5 9 5v13H3Z"/><path d="M8 21v-8h8v8M7 9h.01M12 9h.01M17 9h.01M8 17h8"/>`],['4 200+','Izgatavotas virtuves','Palīdzam izvēlēties materiālus, izgatavojam mēbeles un uzstādām tās jūsu mājās.',`<path d="M3 3v18h18v-5H8V3H3Z"/><path d="M3 7h2M3 11h2M3 15h2M7 21v-2M11 21v-2M15 21v-2m-3-7 1-4 6-6 3 3-6 6-4 1Zm5-8 3 3"/>`],['98%','Iesaka mūs Facebook','Un 5 zvaigžņu vērtējums Google atsauksmēs.',`<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/>`]].map(([n,l,d,i])=>`<div><svg class="stat-icon" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${i}</svg><dt>${n}</dt><dd><strong>${l}</strong><span>${d}</span></dd></div>`).join('')}</dl></section>`;
home=home.replace(/(<section class="hero"[\s\S]*?<\/section>)/,`$1${statsBand}`);
home=home.replaceAll('href="#pieteikums"','href="/kontakti/#pieteikums"');
await save('', 'Lauras mēbeles | virtuves un iebūvējamās mēbeles',home,'Virtuves, skapji un citas mēbeles pēc pasūtījuma. Projektējam un izgatavojam Latvijā kopš 2008. gada. Apskatiet darbus un pieprasiet cenas piedāvājumu.');
await save('pakalpojumi','Pakalpojumi | Lauras mēbeles',pageIntro('Pakalpojumi','Mēbeles katrai telpai.','Virtuves, skapji un citas mēbeles pēc pasūtījuma. Pielāgotas telpai, vajadzībām un jūsu gaumei.')+`<section class="section section-tight">${categoryCards()}${cta('Sāksim ar jūsu ieceri.')}</section>`,'Virtuves, skapji, priekšnama, vannas istabas un viesistabas mēbeles pēc pasūtījuma. Pielāgojam telpai, vajadzībām un jūsu gaumei.');
for (const c of categories) {
  const selected=projects.filter(p=>p.categories.includes(c.id)).slice(0,6);
  const body=`<section class="service-hero"><div>${crumbs(c.label)}<a class="eyebrow" href="/pakalpojumi/">Pakalpojumi</a><h1>${esc(c.title)}</h1><p>${esc(c.intro)}</p><div class="hero-actions"><a class="button" href="/kontakti/#pieteikums">Saņemt cenas piedāvājumu ${arrow}</a><a class="text-link" href="#projekti">Apskatīt darbus</a></div></div><img src="/images/${c.image}" alt="${esc(c.label)}, realizēts piemērs" width="1000" height="800" fetchpriority="high"></section>
  <section id="projekti" class="section projects-section"><div class="section-heading"><div><p class="eyebrow">${esc(c.label)} / Mūsu darbi</p><h2>Realizētie projekti</h2></div><p>Katrs projekts sākas ar citu telpu un savu ieceri.</p></div>${grid(selected)}<div class="gallery-bottom"><a class="text-link" href="/musu-darbi/?kategorija=${c.id}">Vairāk darbu šajā kategorijā ${arrow}</a></div>${cta()}</section>
  <section class="section"><div class="section-heading"><div><p class="eyebrow">Pirms pirmās sarunas</p><h2>Ko pārrunāsim?</h2></div></div><div class="steps">${c.considerations.map(([title,text],i)=>`<article><span class="step-number">0${i+1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div><div class="service-price"><h3>No kā veidojas cena?</h3><p>Mēbeļu izmēri, materiāli un aprīkojums veido katra projekta izmaksas. Sazinieties, lai pārrunātu savu budžetu un risinājuma iespējas.</p><a class="text-link" href="/cenas/">Vairāk par cenu ${arrow}</a></div></section>`;
  await save(c.path,`${c.title} | Lauras mēbeles`,body,c.intro);
}
await save('musu-darbi','Mūsu darbi | Lauras mēbeles',pageIntro('Mūsu darbi','Īstas mājas. Īsti projekti.','Virtuves, skapji un citas mēbeles mūsu klientu mājās.')+`<section class="section section-tight"><div class="filters" role="group" aria-label="Atlasīt projektus"><button data-filter="all" class="active" aria-pressed="true">Visi darbi</button>${categories.map(c=>`<button data-filter="${c.id}" aria-pressed="false">${esc(c.label)}</button>`).join('')}</div><p id="gallery-count" class="gallery-note" aria-live="polite">${projects.length} projekti atlasē.</p>${grid(projects)}${cta()}</section>`,'Realizēti virtuvju, skapju un citu mēbeļu projekti klientu mājās. Šķirstiet pēc kategorijas un smelieties idejas savai telpai.');
// "Par mums": vērtību punkti ar bildi, kas mainās ritinot (platā ekrānā); mobilajā katram punktam sava bilde.
// Punktam bez foto (pieredze) labajā pusē rāda lielu gadu skaitli. Komandas un darbnīcas foto vēl jāiegūst no klienta.
const values=[
  {n:'01',title:'Pielāgoti risinājumi',text:'Katru mēbeli veidojam konkrētai telpai un ikdienas vajadzībām. Piemēram, virtuve, vieta mantām un nolaižama gulta vienā telpā.',img:'gulta-atverta.webp',alt:'Virtuve un atvērta nolaižamā gulta vienā telpā',w:1400,h:1050},
  {n:'02',title:'Kvalitāte un materiāli',text:'Fasādes, virsmas un detaļas veido kopējo iespaidu. Materiālus izvēlamies sarunā par jūsu vēlmēm, lietošanu un budžetu.',img:'materiali-b.webp',alt:'Gaiša virtuve ar rakstainu salas virsmu',w:800,h:1000},
  {n:'03',title:'Uzmanība detaļām',text:'Tumšie akcenti, plaukts un darba zona veido vienotu risinājumu. Mazās nianses ikdienā ir tās, kas jūtamas visvairāk.',img:'detala.webp',alt:'Virtuves izlietne un tumšs krāns tuvplānā',w:800,h:1000},
  {n:'04',title:'Pieredze un darbnīca',text:'Kopš 2008. gada izgatavojam mēbeles dažādām telpām. Projektējam un izgatavojam savā darbnīcā.',figure:'2008'}
];
const valuesBlock=`<section class="section values-section"><div class="values-layout"><div class="values-visual" aria-hidden="true"><div class="values-frame">${values.map((v,i)=>v.img?`<img data-value="${v.n}"${i===0?' class="active"':''} src="/images/${v.img}" alt="" width="${v.w}" height="${v.h}" ${i===0?'':'loading="lazy"'}>`:`<div class="values-figure" data-value="${v.n}"><span>${v.figure}</span></div>`).join('')}</div></div><ol class="values-list">${values.map((v,i)=>`<li class="value${i===0?' active':''}" data-value="${v.n}"><span class="value-num">${v.n}</span><h2>${esc(v.title)}</h2><p>${esc(v.text)}</p>${v.img?`<img class="value-photo" src="/images/${v.img}" alt="${esc(v.alt)}" width="${v.w}" height="${v.h}" loading="lazy">`:''}</li>`).join('')}</ol></div></section>`;
const aboutProcess=`<section class="section"><div class="section-heading"><div><p class="eyebrow">Kā mēs strādājam</p><h2>No sarunas<br>līdz montāžai.</h2></div><p>Izrunājam ieceri, saskaņojam risinājumu un vienojamies par izgatavošanu un uzstādīšanu.</p></div>${section('process').match(/<div class="steps">[\s\S]*<\/div>/)[0]}${cta('Pastāstiet, ko vēlaties atrisināt.')}</section>`;
const partners=[['Ilze Svence','Dizainere'],['Vita Purcēna','Dizainere un mēbeļu projektētāja'],['Veikals Electrolux','Sadarbības partneris'],['HOOLIGAN Bubble tea & coffee','Sadarbības partneris'],['Tison Bygg & Snickeri AB','Sadarbības partneris Zviedrijā'],['R.A.S.A. Co','Sadarbības partneris'],['SIA "Prenta"','Sadarbības partneris']];
const exportCountries=['Vācija','Austrija','Nīderlande','Lielbritānija','Norvēģija','Somija','Beļģija','Zviedrija','Igaunija','Luksemburga'];
const partnersBlock=`<section class="section partners-section"><div class="section-heading"><div><p class="eyebrow">Sadarbība</p><h2>Ar ko<br>strādājam kopā.</h2></div><p>Mēbeles veidojam kopā ar dizaineriem un uzņēmumiem, kuri mums uzticas.</p></div><ul class="partner-list">${partners.map(([n,r])=>`<li><h3>${esc(n)}</h3><p>${esc(r)}</p></li>`).join('')}</ul><div class="export-row"><h3>Virtuves izgatavotas arī ārpus Latvijas</h3><ul>${exportCountries.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></div></section>`;
await save('par-mums','Par mums | Lauras mēbeles',pageIntro('Par mums','Mēbeles veidojam ap jūsu dzīvi.','Kopš 2008. gada izgatavojam virtuves, skapjus un citas mēbeles pēc pasūtījuma. Mūsu pieeju vislabāk parāda īsti risinājumi.')+valuesBlock+partnersBlock+aboutProcess,'Kopš 2008. gada izgatavojam virtuves, skapjus un citas mēbeles pēc pasūtījuma. Projektējam un ražojam savā darbnīcā, mēbeles pielāgojam jūsu telpai.');
const priceFactors = [
  ['Izmēri un apjoms','Jo garāka un augstāka mēbele, jo vairāk materiālu un darba tajā ir.'],
  ['Materiāli un detaļas','Fasādes, darba virsma, furnitūra un rokturi atšķiras gan izskatā, gan cenā.'],
  ['Aprīkojums un tehnika','Iebūvējamā tehnika un papildu risinājumi glabāšanai maina projekta apjomu.'],
  ['Piegāde un montāža','Piedāvājumā precizējam, kas ir iekļauts un kas nepieciešams jūsu telpā.']
];
const pricingIntro = `<section class="section page-intro price-intro">${crumbs('Cenas')}<div class="price-intro-grid"><div><p class="eyebrow">Cenas</p><h1>Kas veido mēbeļu cenu?</h1><p class="price-intro-lead">Katra mēbele ir individuāla, tāpēc precīzu cenu nosaka pēc ieceres un izmēru precizēšanas.</p></div><ol class="price-factors">${priceFactors.map(([t,d],i)=>`<li><span class="factor-num">0${i+1}</span><div><h2>${esc(t)}</h2><p>${esc(d)}</p></div></li>`).join('')}</ol></div><aside class="price-intro-cta"><p>Pastāstiet par savu ieceri, un sagatavosim piedāvājumu.</p><a class="button" href="/kontakti/#pieteikums" data-event="cta_click" data-location="price_intro">Saņemt cenas piedāvājumu ${arrow}</a></aside></section>`;
await save('cenas','Mēbeļu cenas | Lauras mēbeles',pricingIntro+section('cenas')+section('pieteikums'),'No kā veidojas mēbeļu cena? Izmēri, materiāli, aprīkojums, piegāde un montāža ietekmē izmaksas. Izvēlieties sākuma parametrus un pieprasiet piedāvājumu.');
await save('kontakti','Kontakti un cenas piedāvājums | Lauras mēbeles',pageIntro('Kontakti','Pastāstiet par savu ieceri.','Pēc pieteikuma saņemšanas sazināsimies un precizēsim nepieciešamo risinājumu. Varat arī piezvanīt vai uzrakstīt e-pastu.')+section('pieteikums'),'Pastāstiet par savu mēbeļu ieceri. Lauras mēbeles, Matīsa iela 78a, Rīga. Tālrunis +371 2914 2364, e-pasts info@laurasmebeles.lv.');
const reviewsBody=pageIntro('Atsauksmes','Pieredze, ar ko dalās klienti.','Par sadarbību, mēbelēm un rezultātu mūsu klientu vārdiem.')+`<section class="section section-tight"><div class="filters" role="group" aria-label="Atlasīt atsauksmju avotu"><button data-review-filter="all" aria-pressed="true" class="active">Visas</button><button data-review-filter="website" aria-pressed="false">Mājaslapas atsauksmes</button><button data-review-filter="google" aria-pressed="false">Google</button><button data-review-filter="facebook" aria-pressed="false">Facebook</button></div><p id="review-count" class="gallery-note" aria-live="polite">6 atsauksmes no esošās mājaslapas.</p>${reviewGrid(reviews)}<div id="review-empty" class="review-empty" hidden><h2 id="review-empty-title"></h2><p>Šī avota atsauksmes vēl nav pievienotas lokālajam uzmetumam. Avota pārbaude un ielāde ir nākamais integrācijas solis.</p></div><div class="gallery-bottom"><a href="https://www.facebook.com/LaurasMebeles/" target="_blank" rel="noopener" class="text-link">Apskatiet mūs arī Facebook ${arrow}</a></div>${cta('Arī jūsu iecere var kļūt par nākamo darbu.')}</section>`;
await save('virtuves-mebeles-atsauksmes-virtuves-iekartas','Klientu atsauksmes | Lauras mēbeles',reviewsBody,'Klientu atsauksmes par Lauras mēbeļu virtuvēm, skapjiem un citām mēbelēm pēc pasūtījuma: sadarbība, kvalitāte un rezultāts.');
await writeFile(new URL('public/projects.js',root),`window.LAURAS_PROJECTS = ${JSON.stringify(projects)};\n`);
console.log('Sagatavota sākumlapa un 12 apakšlapas no kopīga satura un projektu datiem.');

async function save(path,title,body,description='Lauras mēbeles. Virtuves, skapji un citas mēbeles pēc pasūtījuma. Apskatiet projektus un piesakiet savu ieceri.') {
  const folder=new URL(`public/${path?path+'/':''}`,root);await mkdir(folder,{recursive:true});
  const pageUrl=`${siteUrl}/${path?path+'/':''}`;
  const social=[
    `<link rel="canonical" href="${pageUrl}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="lv_LV">`,
    `<meta property="og:site_name" content="${siteName}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${pageUrl}">`,
    `<meta property="og:image" content="${siteUrl}${ogImage.path}">`,
    `<meta property="og:image:width" content="${ogImage.width}">`,
    `<meta property="og:image:height" content="${ogImage.height}">`,
    `<meta property="og:image:alt" content="${esc(ogImage.alt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`
  ].join('\n  ');
  const pageHead=head.replace(/<title>.*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(description)}">\n  ${social}`).replace('<script src="/app.js"','<script src="/projects.js" defer></script>\n  <script src="/app.js"');
  await writeFile(new URL('index.html',folder),`${pageHead}<body>${header}<main id="saturs">${body}</main>${footer}${dialog}</body></html>`);
}
