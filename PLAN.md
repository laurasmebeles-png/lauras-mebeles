# Lauras mēbeles: izstrādes plāns līdz palaišanai

Sākotnējais plāns 02.11.2026., pēdējais precizējums 22.11.2026. Šis fails ir darba saraksts nākamajām sesijām. Katru punktu dari atsevišķā sesijā, sāc ar "Uztaisi N. punktu no PLAN.md". Pirms darba izlasi AGENTS.md un README.md. Komunikācija ar Signi latviski.

## Valodu plāna precizējums, 22.11.2026.

Signe norāda, ka plānotas EN, RU un NO versijas. Sākam ar EN atslēgvārdu izpēti Latvijai; eksportu pētām atsevišķi, ar Eiropu un īpaši Ziemeļvalstīm kā izpētes prioritātes virzienu. Saglabājam lapu struktūru un tēzes, bet drīkstam pielāgot formulējumus valodai un izpētē pamatotai atrodamībai. Šis precizējums aizstāj zemākā sākotnējā jautājuma pieņēmumu par RU nesaglabāšanu. Plāns, eksporta valstu avots un pirmie 62 EN frāžu novērojumi: [valodu izpēte](docs/research/valodas-un-en-izpete-2026-11-22.md).

Turpinājums tajā pašā datumā: [formulējumu izpētes secinājumi](docs/research/2026-11-22/secinajumi-un-lietosana.md) un [lapu formulējumu karte](docs/research/2026-11-22/lapu-formulejumu-karte.md) ir sagatavoti EN/RU/NO tekstu rakstīšanai. Pārbaudītas 111 EN rindas Latvijā, 90 RU Latvijā, 90 norvēģu Norvēģijā un 24 EN frāzes katrā no 11 eksporta valstīm. Saglabāti UI nolasījumi ar intervāliem, kopā 555 novērojumi.

Signe apstiprinājusi visu 14 EN pamatlapu tekstus. Tās un galerijas 174 projektu lapas ieslēgtas ar `/en/` prefiksu, saglabājot pašreizējo struktūru. [Teksti un statusi](content/en/parejo-lapu-melnraksti.md). Pēdējie labojumi: cenu pogai “Get a quote for a similar kitchen”; EN BUJ pielāgots ārvalstu auditorijai ar jautājumu par piegādi un montāžu ārpus Latvijas. “Citas mēbeles” plānošanas blokā pēc Signes lūguma abās valodās izņemts piemērs par virtuvi un nolaižamu gultu. Atsauksmju oriģināli un tulkojumi saglabāti cieši pēc oriģināla. EN un RU priekšskatījuma apjoms pabeigts; NO tulkojumi un migrācijas ieviešana vēl priekšā. Cenu piemēru klienta apstiprinājums publiskai palaišanai vēl jāpārbauda.

## Daudzvalodu tehniskais statuss, 22.11.2026.

Pārbaudītas 14 pamatlapas un 174 projektu lapas katrā no LV/EN/RU versijām. Ir lokalizēts title, meta description, viens H1, HTML lang, pašas lapas canonical, savstarpēji LV/EN/x-default hreflang un Open Graph metadati. Priekšskatījumā canonical/hreflang izmanto Vercel adresi; publiskā domēna pāreja vēl nav veikta. Visā priekšskatījumā saglabāts noindex un robots aizliegums. sitemap.xml, strukturētie dati un pāradresācijas vēl nav ieviestas.

Turpmākajos 2., 6., 7. un 8. punktos jāņem vērā:

- DNS un Vercel projekts ir kopīgs visām valodām. LV ir saknē, EN zem /en/, RU zem /ru/; norvēģu versijai paredzēts /no/, kad saturs gatavs. Saglabāt esošos e-pasta DNS ierakstus. Valodām nav vajadzīga atsevišķa domēna vai Resend verifikācija.
- Kontaktformai viena API plūsma. Kopā ar pieteikumu nosūtīt serverī pārbaudītu valodas kodu un lapas kontekstu; nepamatot valodu uz valsti vai pārlūka valodu. Lokalizēt validāciju, ielādes, kļūdu un veiksmes paziņojumus, Turnstile un iespējamo klienta apstiprinājuma e-pastu. Uzņēmuma saņemtajā e-pastā norādīt pieteikuma valodu. Reālā sūtīšana vēl nav ieviesta.
- GA4 vienā īpašumā un vienā tīmekļa datu plūsmā. Kopīgi notikumu nosaukumi, papildu page_language parametrs no lapas valodas un vienots lapas identifikators valodu salīdzināšanai. Reģistrēt page_language kā pielāgotu dimensiju. GA4 noklusējuma language ir pārlūka iestatījums. generate_lead tikai pēc servera apstiprinātas pieņemšanas, bez formas personas datiem analītikā. GA4 vēl nav pieslēgts.
- Piekrišanas saskarne un privātuma informācija katrā publicētajā valodā. Piekrišanas izvēle saglabājas, mainot valodu. Pārbaudīt formas un analītiku katrā valodā, priekšskatījuma testus nodalot no publiskajiem datiem.
- Pirms palaišanas SITE_URL iestatīt uz https://laurasmebeles.lv, pārģenerēt un pārbaudīt canonical, hreflang un OG. Katras valodas canonical norāda uz sevi. Hreflang pievienot tikai publicētajām versijām; kopīgajai angļu versijai izmantot en. Izveidot sitemap ar indeksējamām lapām un pieslēgt to Search Console. Numurētās galerijas projektu lapas pašlaik ir pārskatīšanai ar noindex; to indeksēšanu neieslēgt automātiski kopā ar pamatlapām.
- Pāradresāciju karte jāsalīdzina ar faktiskajiem jaunajiem ceļiem. Piemēram, jaunā virtuvju EN lapa ir /en/virtuves/, nevis vēsturiskajā projektā minētā /en/kitchens/. Vecais priekšlikums par RU atmešanu nav spēkā. Publiskajai versijai atcelt indeksēšanas aizliegumus, saglabājot tos priekšskatījumiem.

Šī sadaļa precizē zemākā vēsturiskā darba saraksta statusu, bet neapliecina DNS, Resend, GA4 vai publiskās migrācijas ieviešanu.

## Atgādinājumi un pārbaudes pirms palaišanas

Signe lūdz darba gaitā atgādināt par aizmirstiem darbiem. Sākot kontaktformas, DNS, analītikas vai palaišanas darbus, pārskatīt šo sarakstu un norādīt attiecīgajā posmā aktuālo. Atgādinājumi paredzēti projekta sarunās, nevis kā ieplānoti paziņojumi. Atzīmēt punktu par izpildītu tikai pēc ieviešanas un pārbaudes.

- [ ] Vienots sitemap.xml visām publicētajām valodām, katra indeksējamā valodas URL atsevišķi. Ģenerēt build laikā, neiekļaut melnrakstus un noindex projektu lapas. Norādīt sitemap adresi robots.txt un iesniegt Search Console. Atsevišķi valodu sitemap nav vajadzīgi pašreizējam apjomam.
- [ ] Robots.txt pārmeklēšanas atļaujas un noindex HTML/HTTP norādes pārbaudīt atsevišķi. Robots.txt un sitemap ir dažādi faili; robots pārmeklēšanas aizliegums neaizstāj noindex. Publiskās pamatlapas atvērt indeksēšanai, priekšskatījumus un pārskatāmās projektu lapas saglabāt ar noindex.
- [ ] Pēc SITE_URL nomaiņas pārbaudīt īstā domēna canonical, savstarpējos hreflang un sociālo saišu metadatus katrā publicētajā valodā. Pievienot tikai gatavas valodu versijas.
- [ ] Pabeigt un pārbaudīt veco URL pāradresācijas, arī vecajām EN/RU adresēm. Pievienot pārbaudāmus uzņēmuma un navigācijas strukturētos datus.
- [ ] Verificēt Resend sūtītāja domēnu, ieviest servera validāciju un botu aizsardzību. Saglabāt esošā e-pasta DNS ierakstus un pārbaudīt piegādi pēc domēna pārslēgšanas.
- [ ] Katrā valodā pārbaudīt formas validāciju, ielādes stāvokli, servera kļūdu, atkārtotu mēģinājumu un veiksmīgu nosūtīšanu ar reālu saņemtu e-pastu. E-pastā uzņēmumam redzama pieteikuma valoda un avota lapa. Ja ievieš klienta apstiprinājuma e-pastu, arī tas lokalizēts.
- [ ] Pieslēgt GA4 un page_language dimensiju; pārbaudīt notikumus katrā valodā DebugView. generate_lead tikai pēc servera apstiprinātas pieņemšanas, bez dubultas uzskaites un personas datiem. Priekšskatījuma/testa dati nodalīti.
- [ ] Publicēt privātuma informāciju un piekrišanas saskarni katrā publicētajā valodā; piekrišanas izvēle saglabājas starp valodām. Turnstile paziņojumi atbilst lapas valodai.
- [ ] Pēc jauno tehnisko funkciju ieviešanas veikt visu valodu gala pārbaudi telefonā un datorā: jaunie teksti, pogu un virsrakstu aplaušana, tiešās saites uz apakšlapām un projektu lapām, valodu pārslēdzējs, kļūdu paziņojumi un 404 lapa.
- [ ] Pirms publiskas palaišanas apstiprināt cenu piemēru summas un specifikācijas ar klientu visām valodām. EN teksta apstiprinājums neaizstāj šo faktu apstiprinājumu.

## Valodu darbu turpinājums

- EN apstiprinātā satura apjoms ir pabeigts, pending-translations.json ir tukšs. Nav atlikušu neapstiprinātu EN lapu tekstu, kas bloķētu nākamās valodas sagatavošanu. Terminoloģija: custom kitchens, custom furniture un made-to-measure; bespoke nepievienot. Virsraksta paying for aplaušana izlabota priekšskatījumā. Pēc Signes apstiprinājuma tikai sākumlapas faktu joslā īsais pāris “Our own workshop” / “Made in Riga”; ražotnes sadaļas pilnais nosaukums saglabāts.
- EN vēlāk jāpapildina ar jauno kopīgo funkciju tekstiem (reāla forma, privātums, piekrišana, 404) un jāpārbauda pēc integrācijām. Tie ir nākamā tehniskā posma darbi, nevis nepabeigts esošo lapu tulkojums.
- Signe 22.11.2026. apstiprinājusi RU kā nākamo valodu. Sagatavoti sākumlapas un virtuves lapas melnraksti content/ru/ ar metadatiem un trim pilnām sākumlapas atsauksmēm. Pēc neatkarīgas valodas un satura/atslēgvārdu pārbaudes labojumi iestrādāti un atkārtoti pārbaudīti. Signe apstiprinājusi to ievietošanu: RU priekšskatījumā ieslēgtas /ru/ un /ru/virtuves/ ar kopīgās saskarnes, metadatu, attēlu aprakstu un projektu dialogu tulkojumiem. Pēc turpinājuma apstiprinātas un ieslēgtas arī piecas pārējās mēbeļu kategorijas, kopā septiņas RU pamatlapas. Norvēģu Bokmål paredzēta pēc RU; izpēte abām valodām jau sagatavota un bez jauna pamatojuma nav jāatkārto viss keyword research.
- Pārējo piecu mēbeļu lapu RU teksti sagatavoti content/ru/skapji.md, koridora-iekartas.md, vannasistabas-mebeles.md, sekcijas.md un citas-mebeles.md. Abas neatkarīgās pārbaudes un atkārtotā nolasīšana pabeigta, labojumi iestrādāti. Pārskats latviski: content/ru/parejo-mebelu-teksti.md. Pēc Signes apstiprinājuma visas piecas adreses ieslēgtas RU priekšskatījumā. Saglabāta struktūra, fakti un atslēgvārdu fokuss; pārtulkoti metadati, alt/aria un 25 jaunu unikālo projektu dialogi. Visas piecas lapas pārbaudītas 1440, 390 un 360 px skatos; virsraksti un pogas ietilpst, telefonā galeriju pogas ir vienā rindā. Pēc Signes turpmākās norādes sagatavotas, neatkarīgi pārbaudītas un ieslēgtas arī atlikušās septiņas pamatlapas un galerijas 174 projektu lapas. Visām jaunajām lapām saglabāta struktūra un atslēgvārdu fokuss; garie virsraksti/pogas pārbaudīti datorā un telefonā. Kopā RU 14 pamatlapas + 174 projektu lapas, 12 pilni atsauksmju tulkojumi. Teksti un pārbaudes: content/ru/parejo-lapu-teksti.md.
- Signe krievu valodu saprot ierobežoti un lūdz izmantot apakšaģentus gramatikas, stila, dabiskuma un Keyword Planner atbilstības pārbaudei. Turpmākajos RU tekstos saglabāt atsevišķu valodas un faktu/atslēgvārdu pārbaudi; būtiskās izvēles izskaidrot Signei latviski, neprasot viņai pašai pārbaudīt krievu gramatiku. Pārbaudes rezultāti un ierobežojumi fiksēti content/ru/README.md.
- NO Bokmål sagatavoti sākumlapas un virtuvju pilnie teksti content/no/sakumlapa.md un virtuves.md, 211 precīzu fragmentu sagatave un trīs pilnas atsauksmes. Veikta atsevišķa valodas un faktu/izpētes pārbaude, labojumi iestrādāti. Saglabāta esošā struktūra, projekti, fakti un frāžu fokuss. Signe apstiprinājusi ievietošanu: ieslēgtas /no/ un /no/virtuves/ ar metadatiem, UI/alt/aria, astoņu projektu dialogiem un trīs pilnām atsauksmēm. Pārbaudīti datora/telefona skati, izvēlne, valodu pārslēgšana, foto dialogs, pirms/pēc un atsauksmes. Nākamais solis ir pārējo piecu mēbeļu kategoriju NO teksti; pārējās 12 NO pamatlapas un galerijas apakšlapas vēl nav ieslēgtas. Izpēte nav jāatkārto bez jaunas vajadzības.
- Katrai nākamajai valodai vispirms sākumlapas un virtuvju teksti Signes apskatei, pēc stila saskaņošanas pārējās lapas. Saglabāt struktūru, sadaļu domas, faktus un atslēgvārdu fokusu. Atsauksmes tulkot cieši pēc oriģināla, nepārkārtojot vai SEO nolūkā nepārfrāzējot. Priekšskatījumā ieslēgt tikai apstiprināto saturu.

## Konteksts īsumā

- Pamats paliek esošais: statisks HTML/CSS/JS, ģenerēts ar scripts/generate-pages.mjs, bez framework. Nepārej uz Next.js vai CMS.
- Vienīgā servera daļa būs viena Vercel funkcija kontaktformai (api/contact.js).
- Hostings: GitHub + Vercel. E-pasti: Resend. Botu aizsardzība: Cloudflare Turnstile. Analītika: GA4 ar piekrišanu.
- Esošā vietne ir WordPress + Elementor + Yoast, 55 publicētas lapas (LV/EN/RU). Pilns inventārs: docs/migration/wordpress-inventory.md. Pāradresāciju projekts: docs/migration/redirect-map.md.
- Tikai esošajai sākumlapai ir Yoast title/description; pārējām lapām nav, tātad nav ko pārnest.

## Atvērtie jautājumi klientam (nebloķē 1. līdz 3. punktu)

1. Valodu apjoms izlemts: LV + EN + RU + norvēģu Bokmål. LV/EN/RU priekšskatījuma satura apjoms gatavs. Nākamā valoda ir norvēģu Bokmål. RU saglabāšana vairs nav atvērts jautājums.
2. Fotogrāfijas (e-pasta melnraksts jau sagatavots Kristapa vārdā).
3. Kalkulatora likmes, vai vienošanās, ka kalkulators paliek bez cenām.
4. Atsauksmes: piekrīt manuāli uzturētām kartītēm ar Google/Facebook atsauksmju pārkopēšanu?
5. Vai Google Search Console esošajam domēnam ir pieslēgta? Ja jā, piekļuve.
6. Vecie "komplektu" un "veikala" URL (2020. g.): vai tiem vēl ir nozīme, vai var pāradresēt uz /virtuves/.

## Darbu secība

### 1. Repozitorijs un Vercel priekšskatījums (IZPILDĪTS 02.11.2026)

Pārbaudīts: 13 lapas atbild 200 ar `X-Robots-Tag: noindex, nofollow`, visi attēli ielādējas. Pamata title, description, canonical un OG tagi katrai lapai pievienoti (ģenerators scripts/generate-pages.mjs, OG attēls public/images/og-default.jpg). Atlikušais: Vercel Pro pirms publiskas palaišanas.

Mērķis: klientam nosūtāma saite, pēc tam katrs labojums uzreiz redzams.

- Pirmais git commit (git ir inicializēts, bet commit vēl nav). assets/originals/ paliek ārpus git (jau .gitignore).
- GitHub repo (privāts) Signes kontā, vēlāk nodod klientam.
- Vercel projekts: Build Command `npm run build`, Output Directory `dist`. Pārbaudi, ka `dist/` pēc build satur visas 13 lapas un images/.
- Visām priekšskatījuma versijām `noindex` un robots Disallow (jau ir uzmetumā; palaišanas brīdī to izņem tikai production).
- Pamata `<title>`, `<meta name="description">`, OG tagi katrai lapai no scripts/generate-pages.mjs. Sākumlapai var ņemt par pamatu esošo Yoast tekstu: title "Virtuves mēbeles: idejas un risinājumi | Lauras mēbeles", description "Mūsu specializācija ir virtuves mēbeles pēc pasūtījuma. Projektēšana un ražošana uz vietas." (pielāgot).
- Rezultāts: Vercel preview URL README.md sadaļā "Priekšskatījums".

### 2. Kontaktforma pa īstam

- `api/contact.js` (Vercel Node funkcija): pieņem POST JSON, validē (vārds, e-pasts vai tālrunis, kategorija, ziņa), pārbauda Turnstile tokenu, sūta e-pastu ar Resend uz info@laurasmebeles.lv (testā uz Signes adresi), atbild JSON.
- Vides mainīgie Vercel: RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_TO, CONTACT_FROM. Lokāli .env (jau .gitignore). .env.example ar tukšām vērtībām.
- Resend: verificēt sūtītāja domēnu (SPF/DKIM DNS ieraksti; tos jāpieliek klienta DNS). Līdz tam sūtīt no Resend testa domēna.
- Formā (public/app.js): ielādes stāvoklis, veiksmes/kļūdas ziņa, poga "Nosūtīt" (nevis "Izmēģināt pieteikumu"), piezīmju par uzmetumu izņemšana. Rate limit funkcijā (vienkāršs, pēc IP) un honeypot lauks.
- Pārbaude: reāls pieteikums nonāk e-pastā. Tikai tad README un AGENTS.md var teikt, ka forma strādā.

### 3. Sakārtošana pirms klienta apskates

- "kopš 2008. gada" sākumlapā atkārtojas trīs reizes (hero, priekšrocības, "Par mums"); atstāt divās.
- Izņemt "Uzmetums:" un "Lokāls uzmetums" piezīmes no cenu un kontaktu sadaļām (pēc 2. punkta).
- Pievienot /privatuma-politika/ lapu (esošajai vietnei tā ir un jāsaglabā URL). Saturs jāpārraksta jaunajai vietnei: kontaktforma, Resend, GA4 sīkdatnes, Turnstile.
- Kājenē: Facebook https://www.facebook.com/LaurasMebeles/ un Instagram (abi no WordPress eksporta, pārbaudīt, ka profili dzīvi).
- Pārbaudīt platekrāna (1440+) un mobilo skatu visās 13 lapās; piefiksēt kļūdas docs/prototype-notes.md.
- Hero foto nomainīt, kad klients atsūta oriģinālu.

### 4. Attēli un fotogalerija (pēc klienta foto saņemšanas)

- Signes Google Drive ir liels foto arhīvs no vecās WordPress vietnes. Pirms klienta jaunajiem foto: pārskatīt, atlasīt kvalitatīvos (vecos un nekvalitatīvos neņemt), izņemt dublikātus un sagrupēt pa kategorijām. Mērķis: katrai kategorijai vismaz 3 labi foto (tad virtuvju kolāžas principu var attiecināt uz citām kategorijām) un katrs foto sākumlapā tikai vienu reizi.

- Attēlu konveijers: oriģināli assets/originals/, skripts, kas ģenerē WebP 800/1600 uz public/images/ (sharp var instalēt kā devDependency, vai Node 20 + squoosh). Lazy loading, width/height atribūti, alt teksti no src/catalog.mjs.
- /musu-darbi/ galerija ar kategoriju filtriem jau ir; papildināt ar lightbox šķirstīšanu un "ielādēt vēl" lielam attēlu skaitam.
- Pakalpojumu lapās 5 līdz 6 projekti katrai kategorijai; saite uz galeriju ar attiecīgo filtru.
- "Pirms un pēc": salīdzināšanas slīdnis vienādiem rakursiem, divas apzīmētas bildes atšķirīgiem.

### 5. Atsauksmes un "Par mums"

- Atsauksmes paliek manuāli uzturētas src/reviews.json kartītes (bez trešās puses moduļa): autors, teksts, avots (mājaslapa / Google / Facebook), "Lasīt vairāk". Google/Facebook atsauksmes pārkopē ar klienta piekrišanu.
- /par-mums/ ar reāliem komandas un darbnīcas foto un klienta apstiprinātiem faktiem. Nekādu izdomātu skaitļu.

### 6. SEO migrācija

- Pāradresāciju karte: docs/migration/redirect-map.md. Pēc klienta un Signes apstiprinājuma pārnest uz vercel.json `redirects` (301). Pārbaudīt katru veco URL pēc palaišanas.
- sitemap.xml ģenerēt build laikā no lapu saraksta; robots.txt production versijā atļauj indeksēt un norāda sitemap.
- Strukturētie dati: LocalBusiness (vai FurnitureStore) ar adresi Matīsa iela 78a, Rīga, tālruni, darba laiku; BreadcrumbList apakšlapām; FAQPage sākumlapas BUJ blokam.
- Canonical un hreflang lv/en/ru/x-default jau ieviesti. Pirms palaišanas pārbaudīt tos uz īstā domēna; NO pievienot, kad attiecīgās lapas gatavas.
- Pārbaude ar Lighthouse (mobilais) katrai lapu grupai; mērķis 90+ Performance un SEO.

### 7. GA4 un piekrišana

- Piekrišanas josla pirms GA4 ielādes (ES prasība). Vienkāršs savs risinājums ar localStorage vai viegls bezmaksas CMP; Google Consent Mode v2 ar default denied.
- GA4 caur GTM vai tieši gtag. Notikumi: cta_click (ar vietu), phone_click, email_click, form_start, form_submit (tikai pēc veiksmīgas atbildes no api/contact), gallery_open, calculator_step, calculator_submit.
- Notikums skaitās ieviests tikai pēc pārbaudes GA4 DebugView.

### 8. Palaišana un nodošana

- Pirms palaišanas: Vercel vides mainīgais `SITE_URL=https://laurasmebeles.lv` (tad canonical un OG adreses ģenerējas uz īsto domēnu; līdz tam tās rāda Vercel adresi). Izņemt noindex, robots atļauj, sitemap pieejams, redirects vercel.json, forma pārbaudīta uz info@laurasmebeles.lv, GA4 strādā, privātuma politika publicēta.
- Domēns laurasmebeles.lv Vercel projektā; DNS pārslēgt A/CNAME, nemainot MX/SPF/DKIM e-pastam. Pārbaudīt e-pasta piegādi pēc pārslēgšanas.
- GSC: jaunā versija tajā pašā īpašumā, iesniegt sitemap, pēc nedēļas pārbaudīt Coverage un 404.
- Nodošana: GitHub repo, Vercel projekts, Resend, Turnstile konti uz klienta vārda vai ar klientu kā īpašnieku. Pieejas dokumentēt atsevišķi, ne git.
- Esošo WordPress vietni atstāt pieejamu rezervei vismaz mēnesi (citā hostā vai eksportā).

### 9. Pēc palaišanas

- Pirmās 2 nedēļas: GSC 404 pārskats, pieteikumu kvalitāte, GA4 notikumi.
- EN apstiprinātā satura versija jau gatava. Turpināt norvēģu Bokmål versiju; "Padomi" sadaļa no vecajām 2020. g. publikācijām un kalkulators ar reālām likmēm paliek atsevišķi turpmāki darbi.
