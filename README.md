# Lauras mēbeles

Jaunās mājaslapas darba projekts. Mērķis ir piesaistīt kvalitatīvus pasūtījumu un konsultāciju pieteikumus, saglabāt zīmola atpazīstamību un uzlabot atrodamību.

## Pašreizējais posms

Lokāli palaižams struktūras uzmetums ar sākumlapu un 12 apakšlapām ir gatavs. Saglabāts esošais logo, izmantotas klienta vietnes reālo darbu fotogrāfijas un gaišs vēsi bēšs/grafīta pamats ar sarkaniem akcentiem. Sadaļu virziens ņemts no Leadframe parauga un pielāgots mūsu saturam un atslēgvārdu izpētei.

Darbojas mobilā izvēlne, galerijas filtri, projektu atvēršana, vispārīga pieteikšanās, parametru konfigurators un kontaktformas lokālā pārbaude. Forma vēl nesūta e-pastus, konfigurators nerēķina EUR. Analytics notikumi tiek pārbaudīti tikai lokāli; GA4 nav pieslēgts. Šī nav publiskai palaišanai gatava vietne.

## Palaist savā datorā

Nepieciešams Node.js 20 vai jaunāks. Nav nepieciešama pakotņu instalēšana.

1. VS Code izvēlies **File → Open Folder** un atver šo `lauras-mebeles` mapi.
2. Atver **Terminal → New Terminal**.
3. Ieraksti `npm run dev`.
4. Atver **http://127.0.0.1:4173/**.

Pēc satura vai veidņu labošanas izpildi `npm run generate` un pārlādē pārlūku. CSS un app.js izmaiņām pietiek ar pārlādi. Apturēt serveri: **Ctrl+C**. Ja ports jau aizņemts, lapas priekšskatījums, iespējams, jau darbojas; alternatīva: `PORT=4174 npm run dev`.

VS Code ir pievienots arī uzdevums **Terminal → Run Task → Atvērt Lauras mēbeļu lokālo lapu**.

`npm run check` pārbauda JavaScript sintaksi. `npm run build` sagatavo statiskos failus `dist/`. Uzmetuma versijai ir `noindex` un robots aizliegums; tos maina tikai apzinātā palaišanas posmā.

## Kur kas atrodas

| Mape / fails | Saturs |
|---|---|
| `docs/project-brief.md` | Norunātais virziens un atvērtie jautājumi |
| `docs/site-map.md` | Lapu struktūra, adreses un satura prioritātes |
| `docs/homepage-content-plan.md` | Sākumlapas sadaļu secība, pogu mērķi, foto un precizējamie fakti |
| `docs/research/` | Keyword Planner izpēte un oriģinālie eksporti |
| `docs/research/valodas-un-en-izpete-2026-11-22.md` | EN/RU/NO lokalizācijas plāns un pirmā EN frāžu pārbaude Latvijai |
| `docs/research/2026-11-22/secinajumi-un-lietosana.md` | Pabeigtā EN/RU/NO formulējumu izpēte, 555 frāžu un valstu novērojumi un lapu karte |
| `content/lv/` | Latviešu lapu satura sagataves |
| `content/en/` | Apstiprinātie visu 14 EN pamatlapu teksti un to statusi |
| `content/ru/` | Visu 14 RU pamatlapu teksti, 12 atsauksmes un galerijas projektu saskarne |
| `content/no/` | Visu 14 NO pamatlapu teksti, 12 atsauksmes un galerijas projektu saskarne |
| `assets/originals/` | Darba foto un logo oriģināli, kas paliek lokāli |
| `public/images/` | Publicēšanai sagatavotie attēli |
| `src/home.html` | Sākumlapas avots un koplietoto sadaļu sagatave |
| `src/catalog.mjs` | Pakalpojumu saturs un vienota projektu/foto datu bāze |
| `src/reviews.json` | Sākotnējās 12 īstās LV atsauksmes |
| `src/reviews.native.json` | Jaunie EN/RU oriģināli, valodu ierobežojumi un sākumlapas atlase |
| `scripts/generate-pages.mjs` | Kopīgās navigācijas un lapu veidnes |
| `public/**/index.html` | Ģenerētais rezultāts; tieši nelabot |
| `public/styles.css` | Krāsas, izkārtojums, mobilā versija |
| `public/app.js` | Galerija, konfigurators, forma, lokālo notikumu pārbaude |
| `scripts/` | Lokālā palaišana un statisko failu sagatavošana |
| `docs/prototype-notes.md` | Uzmetuma apjoms, pārbaudes un atlikušie darbi |
| `docs/asset-sources.md` | Foto un logo izcelsme |

## Tuvākie darbi

1. Izvērtēt sākumlapas dizainu, saturu un pieteikšanās ceļu.
2. Papildināt katru pakalpojumu ar 5–6 atlasītiem projektiem. Virtuvēm jau ir seši; pārējām kategorijām pagaidām pa vienam.
3. Precizēt projektu materiālus un aprakstus, saņemt lielākas izšķirtspējas logo oriģinālu.
4. Saskaņot cenas aprēķina noteikumus, pieteikumu saņēmējus un CMS vajadzību.
5. Pieslēgt servera formas apstrādi, Resend, Turnstile, piekrišanas risinājumu un GA4; pēc tam pārbaudīt reālu pieteikuma saņemšanu.
6. Sagatavot klienta GitHub/Vercel kontus, valodu versijas, SEO migrāciju un palaišanas pārbaudes.

30.10. piezīmes precizē: saturu uzturēs izstrādātāja; atsevišķs klienta administrēšanas panelis sākumā nav vajadzīgs. Jaunās prasības saglabātas docs/dizaina-un-projektu-piezimes-2026-10-30.md; WordPress inventārs ir docs/migration/.

## Darbs VS Code

Sākumlapas pamats ir `src/home.html`, pakalpojumi un projekti — `src/catalog.mjs`, atsauksmes — `src/reviews.json`. Kopīgās lapu veidnes ir `scripts/generate-pages.mjs`. Dizainu labo `public/styles.css`, darbības — `public/app.js`. Pēc satura izmaiņām izpildi `npm run generate`. `public/index.html`, apakšlapu HTML un `public/projects.js` tiek ģenerēti; tieši labojumi tajos pārrakstīsies. `content/lv/` paliek satura plānošanas faili. Nav jāinstalē papildu pakotnes.

Oriģinālie attēli un īstās piekļuves atslēgas Git repozitorijā netiek iekļautas. Attēlu oriģināliem vajadzīga atsevišķa rezerves kopija; publicēšanai sagatavotās versijas glabājam `public/images/`.

Izpētes kopsavilkums ir arī [Notion](https://app.notion.com/p/408f611175e98109a5abfa2558b5b02a).

## Priekšskatījums (Vercel)

NO Bokmål priekšskatījumā ieslēgtas visas 14 pamatlapas un 174 galerijas projektu lapas ar pārbaudītajiem tekstiem, metadatiem, kopīgo saskarni, 41 projekta dialogu un 12 pilnām atsauksmēm. Signe apstiprinājusi ievietošanu pēc neatkarīgām valodas un faktu/izpētes pārbaudēm. Iekšējās saites paliek NO, pārslēdzējs saglabā konkrēto lapu arī galerijā. [NO teksti un pārbaudes](content/no/README.md), [pārējo lapu teksti](content/no/parejo-lapu-teksti.md). Forma joprojām ir izmēģinājums bez e-pastu sūtīšanas.

RU priekšskatījumā ieslēgtas visas 14 pamatlapas un 174 galerijas projektu lapas. Iekļauti pamatteksti, metadati, alt/aria, kopīgā saskarne, 41 izmantotā projekta dialogs, 12 pilnas tulkotās atsauksmes un viens RU oriģināls. Signe apstiprinājusi publicēšanu pēc neatkarīgām valodas, faktu un izpētes pārbaudēm. Galvenās iekšējās saites paliek RU versijā; pārslēdzējs saglabā konkrēto lapu arī galerijas projektos. [RU teksti un pārbaudes](content/ru/parejo-lapu-teksti.md). Forma joprojām ir izmēģinājums bez e-pastu sūtīšanas.

EN priekšskatījumā ieslēgtas visas 14 pamatlapas un 174 galerijā izmantotās projektu lapas. Signe apstiprinājusi tekstus, tostarp cenu piemēru pogu “Get a quote for a similar kitchen” un EN jautājumu/atbildi par piegādi un montāžu ārpus Latvijas. LV/EN pārslēdzējs pieejams arī projektu lapās un saglabā pašreizējo lapu. [Teksti un statusi](content/en/parejo-lapu-melnraksti.md). Atsauksmju oriģināli un pilnie tulkojumi saglabāti bez pārfrāzēšanas. Formai joprojām ir tikai izmēģinājuma darbība bez e-pastu sūtīšanas. Cenu piemēri izmanto pašreizējā LV priekšskatījuma summas un specifikācijas; klienta apstiprinājums publiskai palaišanai vēl jāpārbauda.

Vercel iestatījumi ir `vercel.json`: build `npm run build`, izvade `dist/`, visām atbildēm `X-Robots-Tag: noindex, nofollow`. Pirms īstās palaišanas šo galveni un `robots.txt` aizliegumu izņem (PLAN.md, 8. punkts). Priekšskatījuma saite: https://lauras-mebeles.vercel.app/ (Vercel Hobby, GitHub repo laurasmebeles-png/lauras-mebeles; katrs `git push` uz `main` to atjaunina).

Canonical un OG adreses ģenerē `scripts/generate-pages.mjs` no vides mainīgā `SITE_URL`; ja tā nav, izmanto Vercel produkcijas adresi, lokāli `http://127.0.0.1:4173`. Katras lapas title un description ir `save(...)` izsaukumos tajā pašā failā.

23.11.2026. Sākumlapas atsauksmju atlase pielāgota valodai: EN izceltas trīs jaunās EN oriģinālās atsauksmes, RU pirmā ir jaunais RU oriģināls. Tās pievienotas tikai savas valodas atsauksmju lapai (EN 15, RU 13); LV un NO paliek 12 līdzšinējie ieraksti. [Atlase un avotu pārbaude](docs/reviews-by-language.md).

## Tehniskā SEO sagatave, 23.11.2026.

Build ģenerē public/sitemap.xml un četru valodu 404.html. Tā kā priekšskatījums ir noindex, aktīvais sitemap satur 0 URL. Lokālā palaišanas XML sagatave ar 60 pamatlapām ir docs/migration/sitemap-launch.xml. Karte docs/migration/redirect-map.json aptver visus 55 vecos WordPress URL. MD pārģenerē ar node scripts/migration-map.mjs. Migrācijas pāradresācijas ir sagatavotas saskaņošanai.

Pēc build: npm run test:seo pārbauda sitemap, karti un HTTP 404 valodas/statusus (palaiž īslaicīgu lokālo serveri). npm run test:i18n turpina pārbaudīt pamatlapu un projektu tulkojumus. [Statuss un palaišanas soļi](docs/seo-preview.md).

## Privātums un sīkdatnes, 24.11.2026

Priekšskatījumā privātuma politikas darba redakcija ir `/privatuma-politika/` un tās EN/RU/NO versijās. Avoti ir `src/privacy.html`, `src/cookie-settings.html` un valodu vārdnīcas. Kājenes saite atver sīkdatņu iestatījumus jebkurā lapā. `public/cookie-settings.js` ielādē Google karti pēc atļaujas. Pārlūks atceras izvēli līdz 180 dienām katrā vietnes adresē. Atsaukšana noņem karti.

Šobrīd iestatījumi aptver Google karti. Aktīvā datu apstrāde un glabāšanai piemērojamie nosacījumi jāprecizē pirms palaišanas kopā ar formas un analītikas pieslēgšanu. Pārbaudes ir [palaišanas plānā](PLAN.md). Politikas pamatojumam izmantotas [DVI sīkdatņu vadlīnijas](https://www.dvi.gov.lv/lv/sikdatnes-un-privatuma-politika) un [VDAR 7., 13. un 77. pants](https://eur-lex.europa.eu/eli/reg/2016/679/oj).
