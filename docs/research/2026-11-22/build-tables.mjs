import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const maps=read('page-keyword-map.json');
const inputs={en:read('en-LV-ui.json'),ru:read('ru-LV-ui.json'),nb:read('nb-NO-ui.json')};
const exportsData=read('en-export-ui.json');
const ranges=Object.fromEntries(Object.entries(exportsData.range_codes).map(([range,code])=>[code,range]));
const labels={en:'EN / Latvija',ru:'RU / Latvija',nb:'NO / Norvēģija (Bokmål)'};
const normal=s=>s.toLocaleLowerCase().replaceAll('-',' ').replaceAll(/\s+/g,' ').trim();
const indexes=Object.fromEntries(Object.entries(inputs).map(([lang,data])=>{
  const rows=Object.entries(data.groups_by_ui_monthly_range).flatMap(([range,terms])=>terms.map(term=>[normal(term),range]));
  if(rows.length!==data.ui_row_count||new Set(rows.map(r=>r[0])).size!==rows.length)throw Error(`Row count or duplicate failure: ${lang}`);
  return [lang,new Map(rows)];
}));
const entry=(lang,term)=>{
  const value=indexes[lang].get(normal(term));
  if(value===undefined)throw Error(`Untraced term ${lang}: ${term}`);
  return value==='—'?'Nav datu':value.replaceAll(' – ','–').replaceAll('1K','1000').replaceAll('10K','10 000').replaceAll('100K','100 000');
};
const cell=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const lines=['# Lapu formulējumu karte','',
  '22.11.2026. Pētījumā pamatoti priekšlikumi tekstu lokalizācijai. Tie nav ievietoti vietnē. Saglabājam LV satura domu un esošo struktūru. Pilnu teikumu, title un description apjomi nav mērīti.','',
  'Galvenā frāze izvēlēta pēc nozīmes un atbilstības piedāvājumam. Tā var būt ar mazāku intervālu vai bez pieejama apjoma, ja precīzi raksturo pakalpojumu. Funkcionālajām lapām apjoma mērķi neizdomājam.','',
  'Datu periods: 01.11.2025.–31.10.2026. Tīkls Google, teritorijas atsevišķi, vēsturiskā skata valodas iestatījums All languages. Intervāli ietver Google tuvus variantus.',''];
for(const page of maps.pages){
  lines.push(`## ${page.lv_path}`,'',page.meaning_lv,'');
  for(const lang of ['en','ru','nb']){
    const c=page[lang];
    const primary=c.primary?`${c.primary} (${entry(lang,c.primary)})`:'Funkcionāls vai zīmola nolūks, bez izdomāta apjoma';
    const supporting=c.secondary.map(term=>`${term} (${entry(lang,term)})`).join('; ')||'Atbilstoši reālajam saturam, bez atsevišķa frāžu apjoma';
    lines.push(`### ${labels[lang]}`,'',`Galvenā frāze: ${primary}.`,'',`Papildfrāzes: ${supporting}.`,'',
      `- H1 priekšlikums: ${c.h1}`,
      `- Title priekšlikums: ${c.title}`,
      `- Description priekšlikums: ${c.description}`,'');
  }
}
fs.writeFileSync(path.join(root,'lapu-formulejumu-karte.md'),lines.join('\n'));

const comp=['# EN eksporta salīdzinājums','',
  '22.11.2026. Vienādas 24 frāzes katrā no 11 valstīm. Dati nav summēti. Avots: Keyword Planner vēsturisko datu UI, Google, All languages, 01.11.2025.–31.10.2026. NA izrakstīts kā Nav datu. Tie ir intervāli, nevis precīzi apjomi.','',
  'Šis ir EN terminoloģijas salīdzinājums. Vietējo valodu kopējais pieprasījums, tirgus rentabilitāte un uzņēmuma potenciālais trafiks no tā neizriet.','',
  '| Valsts | custom kitchens | bespoke kitchens | fitted kitchens | custom furniture | fitted wardrobes |',
  '|---|---|---|---|---|---|'];
for(const [market,values] of Object.entries(exportsData.markets)){
  if(values.length!==exportsData.keywords.length||values.some(code=>ranges[code]===undefined))throw Error(`Incomplete export data: ${market}`);
  const find=term=>{const code=values[exportsData.keywords.indexOf(term)];return code==='NA'?'Nav datu':ranges[code];};
  comp.push(`| ${exportsData.market_countries[market]} | ${['custom kitchens','bespoke kitchens','fitted kitchens','custom furniture','fitted wardrobes'].map(find).join(' | ')} |`);
}
comp.push('','## Visas pārbaudītās frāzes','');
for(const [market,values] of Object.entries(exportsData.markets)){
  comp.push(`### ${exportsData.market_countries[market]}`,'','| Frāze | Vidējo mēneša meklējumu intervāls |','|---|---|');
  exportsData.keywords.forEach((term,i)=>comp.push(`| ${cell(term)} | ${values[i]==='NA'?'Nav datu':ranges[values[i]]} |`));
  comp.push('');
}
fs.writeFileSync(path.join(root,'en-eksporta-salidzinajums.md'),comp.join('\n'));
const observationCount=Object.values(inputs).reduce((a,d)=>a+d.ui_row_count,0)+Object.values(exportsData.markets).reduce((a,r)=>a+r.length,0);
const all=Object.values(inputs).flatMap(d=>Object.values(d.groups_by_ui_monthly_range).flat());
console.log(JSON.stringify({sourceFiles:4,datasets:3+Object.keys(exportsData.markets).length,observations:observationCount,uniqueInputLabels:new Set(all.map(normal)).size,pages:maps.pages.length,localeBriefs:maps.pages.length*3,primaryAndSecondaryTermsTraced:true,files:['lapu-formulejumu-karte.md','en-eksporta-salidzinajums.md']},null,2));
