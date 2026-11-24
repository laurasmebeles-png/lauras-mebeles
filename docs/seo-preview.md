# Tehniskā SEO sagatave, 23.11.2026.

Dzīvais domēns un DNS nav mainīti. Priekšskatījums paliek ar HTML/HTTP noindex un robots.txt pārmeklēšanas aizliegumu. Šis darbs nav publiskās indeksēšanas ieslēgšana.

## Sitemap

- `scripts/seo.mjs` ģenerē XML no faktiski ģenerēto lapu ierakstiem.
- `public/sitemap.xml`, ko build pārkopē uz dist, pašlaik satur **0 URL**: priekšskatījumā nav indeksējamu lapu. Tukšais fails nav iesniedzams Search Console.
- `docs/migration/sitemap-launch.xml` ir palaišanas sagatave ar 60 URL, pa 15 pamatlapām katrā no LV/EN/RU/NO. Domēns ir paredzētais `https://laurasmebeles.lv`. Fails atrodas ārpus public/dist.
- Katrā ierakstā ir savstarpējās valodu un x-default alternatīvas. Nav 404, numurēto galerijas detaļu, filtru parametru, neesošās privātuma lapas vai izdomātu lastmod datumu.
- Priekšskatījuma robots.txt nemainās un nereklamē palaišanas sagatavi.

Palaišanā jāsalāgo trīs lietas: HTML indeksēšanas norādes, Vercel HTTP noindex galvenes un robots.txt. Pēc šo noteikumu apzinātas maiņas, īstā SITE_URL iestatīšanas un gala URL pārbaudes build jāģenerē sitemap faktiskajām indeksējamajām lapām. Sagatavi nedrīkst vienkārši iesniegt, kamēr uz domēna vēl darbojas vecā vietne. Ja vēlāk izveido privātuma lapas vai apstiprinātas projektu lapas, saraksts jāatjaunina. Priekšskatījumiem noindex jāsaglabā.

## Vecās adreses

Avots `docs/migration/wordpress-pages.json`: 55 lapas. Mašīnlasāmā karte `docs/migration/redirect-map.json` un ar `node scripts/migration-map.mjs` ģenerētais Markdown nodala:

- 10 URL, kas paliek pašreizējā adresē;
- 24 neaktivizētus 301 kandidātus, ar faktiskiem EN/RU mērķiem;
- 21 neatrisinātu lēmumu: 13 veikala/komplektu lapas, 6 publikācijas, privātums un testa lapa.

Šajā posmā Vercel migrācijas pāradresācijas ir sagatavotas saskaņošanai. GSC dati un veco lapu satura nozīme vēl jāizvērtē. Lokālajā privātuma politikas redakcijā saglabāta esošā adrese `/privatuma-politika/`. Atsevišķs darbs ir veco mediju URL atbilstības audits. Vercel `statusCode: 301` atšķiras no `permanent: true`, kas pēc noklusējuma dod 308.

## 404

Avots ir kopīgais ģenerators un vārdnīcas. Rezultāts ir `/404.html`, `/en/404.html`, `/ru/404.html`, `/no/404.html`. Pašas error adreses un neesoši URL atgriež HTTP 404, nevis 200 vai pāradresāciju uz sākumlapu. Pastāvīgas satura lapas un resursi tiek apkalpoti pirms fallback. Valoda seko URL prefiksam; piemēram, `/enough/` ir LV, `/en/missing/` ir EN.

Katrai valodai ir atbilstoša galvene/kājene, H1, paskaidrojums, sākumlapas un mēbeļu pogas un kontaktu saite. Noindex paliek vienmēr; canonical un HTML alternate norādes kļūdas lapā netiek ģenerētas. Valodu pārslēdzējs piedāvā tās pašas 404 skatu citā valodā. Nav jaunu servera funkciju vai bibliotēku.

## Pārbaudes

1. `npm run test:i18n` veic pilno build un esošo lapu tulkojumu/struktūras pārbaudes.
2. `npm run test:seo` pēc build pārbauda 60 URL kopu un alternatīvas, priekšskatījuma noindex, 55 veco URL pārklājumu, valodu mērķus un HTTP statusus lokālajā serverī.
3. `npm run check` pārbauda JavaScript sintaksi.
4. Pārlūkā pārbauda datoru/telefonu, pogas un valodu maiņu. Pēc push atsevišķi pārbauda Vercel HTTP statusus, jo lokālais serveris nevar apliecināt hostinga maršrutēšanu.

Avoti: [Google sitemap norādes](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Vercel maršrutēšana un statusu iestatījumi](https://vercel.com/docs/project-configuration/vercel-json).

23.11.2026. Vercel gala pārbaude veiksmīga: LV/EN/RU/NO neesoši un dziļi galerijas URL un tiešie error faili atgriež 404 ar pareizo valodu un HTTP noindex, HEAD bez satura. Esošās pamatlapas 200, beigu slīpsvītras normalizācija 308 saglabā query, resursi 200, sitemap XML 0 URL un robots Disallow saglabāti. Vecajam /en/kitchens/ nav aktivizēts migrācijas redirect. Noindex HTTP galvene ir pirmajā zemā līmeņa routes noteikumā ar continue:true.
