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
| `content/lv/` | Latviešu lapu satura sagataves |
| `content/en/` | Vieta vēlākai angļu versijai |
| `assets/originals/` | Darba foto un logo oriģināli, kas paliek lokāli |
| `public/images/` | Publicēšanai sagatavotie attēli |
| `src/home.html` | Sākumlapas avots un koplietoto sadaļu sagatave |
| `src/catalog.mjs` | Pakalpojumu saturs un vienota projektu/foto datu bāze |
| `src/reviews.json` | No WordPress eksportētās īstās atsauksmes |
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

Vercel iestatījumi ir `vercel.json`: build `npm run build`, izvade `dist/`, visām atbildēm `X-Robots-Tag: noindex, nofollow`. Pirms īstās palaišanas šo galveni un `robots.txt` aizliegumu izņem (PLAN.md, 8. punkts). Priekšskatījuma saite: vēl nav izveidota.
