import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const map = JSON.parse(await readFile(new URL('docs/migration/redirect-map.json', root), 'utf8'));
const labels = { keep: 'Saglabājam', redirect: '301 kandidāts', pending: 'Jāizlemj' };
const escape = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
let text = `# Pāradresāciju karte, ${map.updated}\n\n`;
text += 'Statuss: sagatavots pārejas projekts, **nav aktivizēts**. Avots ir 55 WordPress lapu inventārs. Mašīnlasāmais avots: [redirect-map.json](redirect-map.json). Šo dokumentu ģenerē `node scripts/migration-map.mjs`.\n\n';
text += 'Pašreizējā struktūra ir LV, EN, RU un NO. EN/RU mērķi izmanto faktiskos ceļus, piemēram, `/en/virtuves/` un `/ru/virtuves/`. Saglabājam garo atsauksmju URL. RU atmešanas priekšlikums vairs nav spēkā. NO nav vecu adrešu šajā WordPress inventārā.\n\n';
const count = action => map.records.filter(record => record.action === action).length;
text += `Saglabāti visi ${map.records.length} avota ieraksti: ${count('keep')} nemainīti URL, ${count('redirect')} pāradresāciju kandidāti un ${count('pending')} neatrisināti lēmumi. \`301 kandidāts\` nenozīmē aktivizētu vai klienta apstiprinātu pāradresāciju. Nav pārbaudīti GSC meklējumu/indeksēšanas dati; veikala un publikāciju lapas nedrīkst automātiski apvienot tikai tādēļ, ka ir tehniski iespējams redirect.\n\n`;
for (const lang of ['lv', 'en', 'ru']) {
  text += `## ${lang.toUpperCase()}\n\n| WordPress ID | Vecais ceļš | Rīcība | Jaunais ceļš vai kandidāts | Piezīme |\n|---|---|---|---|---|\n`;
  for (const record of map.records.filter(record => record.language === lang)) {
    const target = record.target || (record.suggestedTarget ? `${record.suggestedTarget} (priekšlikums)` : 'Nav apstiprināts');
    text += `| ${record.wordpressId} | \`${escape(decodeURIComponent(record.oldPath))}\` | ${labels[record.action]} | ${escape(target)} | ${escape(record.reason)} |\n`;
  }
  text += '\n';
}
text += '## Pirms aktivizēšanas\n\n';
text += '- Izvērtēt veikala/komplektu un publikāciju saturu, GSC datus un precizēt galamērķus. Privātuma politiku pirms palaišanas pārbaudīt pret faktiskajām integrācijām. `/test/` rīcību apstiprināt atsevišķi.\n';
text += '- JSON saglabā precīzo vecā URL procentkodējumu un jaukto alfabētu `hачало`/`kухня`; tos nepārrakstīt kā citus URL. Aktivizēšanas posmā pārbaudīt Unicode un procentkodētus pieprasījumus uz hostinga.\n';
text += '- Pārbaudīt variantus ar/bez beigu slīpsvītras un vaicājuma parametriem. Mērķim jāatgriež 200, jābūt pareizajā valodā, bez pašpāradresācijām, cikliem vai liekām ķēdēm.\n';
text += '- Vercel 301 norādīt ar `statusCode: 301`. `permanent: true` noklusēti ir 308, nevis 301. Šajā darbā `vercel.json` migrācijas redirects netiek pievienoti.\n';
text += '- Atsevišķi izvērtēt vecos `/wp-content/uploads/` attēlu URL pēc atbilstības jaunajiem failiem un pieejamā GSC trafika. Neuzskatīt visu veco attēlu pazušanu par automātiski pieņemamu. 55 lapu karte nav 834 pielikumu pilna migrācija.\n';
await writeFile(new URL('docs/migration/redirect-map.md', root), text);
console.log('Aktualizēta 55 veco lapu pārejas karte. Pāradresācijas nav aktivizētas.');
