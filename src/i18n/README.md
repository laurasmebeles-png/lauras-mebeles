# Valodas

Latviešu teksts paliek avotā (`src/*`, `scripts/generate-pages.mjs`, `public/app.js`). Citas valodas ir vārdnīcas `src/i18n/<kods>.json`:
atslēga = latviešu teksta fragments, vērtība = tulkojums. Tukša vērtība `""` = vēl netulkots (lapā paliek latviešu teksts).

## Kā pievienot valodu
1. `npm run i18n:extract` ģenerē lapas un papildina visas vārdnīcas ar jaunajiem fragmentiem (`""`).
2. Aizpilda `src/i18n/<kods>.json` (piem. `en.json`).
3. Ieslēdz valodu `src/i18n/config.json` laukā `enabled` (piem. `["lv","en"]`). Laukā `pages.<kods>` norāda apstiprināto pamatlapu ceļus. EN, RU un NO ieslēgtas visas 14 pamatlapas. `pageTrees.en`, `pageTrees.ru` un `pageTrees.no` ar `["/musu-darbi/"]` ieslēdz arī galerijas 174 ģenerētās projektu apakšlapas.
4. `npm run build`. Lapas parādās `public/<kods>/...`, parādās valodu pārslēdzējs un `hreflang`.

## Ko tulko
- Visi lapu teksti, `alt`, `title`, `aria-label`, `placeholder`, meta apraksti.
- Projektu virsraksti un apraksti (`projects.js`), kalkulatora izvēles (`calc-config.json`).
- `public/app.js` virknes ar `T('...')`.
- Atsauksmes citā valodā izmanto pilnu tulkojumu no `reviews.<kods>.json` pēc oriģinālās atsauksmes ID. `src/reviews.native.json` papildina kopu ar EN/RU oriģināliem un nosaka to `originalLanguage`, `displayLanguages` un sākumlapas `featured` atlasi. Oriģināla valodā izmanto pašu tekstu bez tulkojuma marķējuma. Saglabā oriģinālo teikumu secību un klienta izteiksmi; SEO pārfrāzēšana uz tām neattiecas. Oriģinālo `src/reviews.json` nemaina.

## Svarīgi
- Ja latviešu teksts mainās, vecā atslēga paliek "neizmantota"; palaid `npm run i18n:extract` un pārtulko jauno fragmentu.
- Adreses (slugi) paliek latviešu valodā, tikai pievieno prefiksu `/en/`, `/ru/`, `/no/`.
- Frāzes ar iekšējo formatējumu (piem. `<em>`) tiek dalītas fragmentos; tulko katru fragmentu atsevišķi.
- Sākumlapas H1 ir marķēts ar `data-i18n-key="home.hero.title"`, lai to tulkotu kā veselumu. Vārdnīcas rindas pārtraukums saglabā esošo vizuālo dalījumu; starp daļām paliek atstarpe arī mobilajā skatā.
- Valodu pārslēdzējs un `hreflang` rāda tikai konkrētajai lapai pieejamās valodas. Saites uz vēl netulkotām LV lapām paliek LV adresē un rāda LV marķējumu. RU paskaidrojums ir krieviski. Ģenerators un build iztīra iepriekšējo rezultātu, lai nepaliktu atslēgtas EN lapas.
- `content/en/pending-translations.json` satur pārējo lapu redakcionālos melnrakstus un netiek ielādēts publiskajā ģeneratorā. EN `projects.js` iekļauj tikai ieslēgtajās lapās izmantotos projektus.
- Apstiprinot nākamo lapu, tās fragmentus pārceļ no `pending-translations.json` uz `en.json`. Pievieno arī metadatus, attēlu un vadības aprakstus un izmantoto projektu pilnos dialogu tekstus. `npm run test:i18n` pārbauda visas ieslēgtās EN, RU un NO lapas, to tulkojumu pārklājumu, struktūru, attēlus, saites un projektu tekstu atbilstību.
- Kontaktformas paziņojumi un izvēlētā cenu piemēra konteksts tiek ielādēti no EN vārdnīcas arī JavaScript. Lauku piemērus (`placeholder`) lokalizē arī tad, ja tie izskatās pēc e-pasta adreses; īstās e-pasta adreses un `mailto` saites saglabā.
- Galerijas numerācijas, foto skaita un attēlu vadības virknes ir EN vārdnīcā kopā ar projektu nosaukumiem. Pievienojot vai pārnumurējot projektus, jāpapildina attiecīgie tulkojumi. `npm run test:i18n` pārbauda arī visas galerijas indeksā izmantotās projektu lapas, to metadatus, attēlu aprakstus un iekšējās saites.
