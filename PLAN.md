# Lauras mēbeles: izstrādes plāns līdz palaišanai

Atjaunots 02.11.2026. Šis fails ir darba saraksts nākamajām sesijām. Katru punktu dari atsevišķā sesijā, sāc ar "Uztaisi N. punktu no PLAN.md". Pirms darba izlasi AGENTS.md un README.md. Komunikācija ar Signi latviski.

## Konteksts īsumā

- Pamats paliek esošais: statisks HTML/CSS/JS, ģenerēts ar scripts/generate-pages.mjs, bez framework. Nepārej uz Next.js vai CMS.
- Vienīgā servera daļa būs viena Vercel funkcija kontaktformai (api/contact.js).
- Hostings: GitHub + Vercel. E-pasti: Resend. Botu aizsardzība: Cloudflare Turnstile. Analītika: GA4 ar piekrišanu.
- Esošā vietne ir WordPress + Elementor + Yoast, 55 publicētas lapas (LV/EN/RU). Pilns inventārs: docs/migration/wordpress-inventory.md. Pāradresāciju projekts: docs/migration/redirect-map.md.
- Tikai esošajai sākumlapai ir Yoast title/description; pārējām lapām nav, tātad nav ko pārnest.

## Atvērtie jautājumi klientam (nebloķē 1. līdz 3. punktu)

1. Valodas: tikai LV, vai LV + EN? RU ieteikums: nesaglabāt, ja klients neuzstāj.
2. Fotogrāfijas (e-pasta melnraksts jau sagatavots Kristapa vārdā).
3. Kalkulatora likmes, vai vienošanās, ka kalkulators paliek bez cenām.
4. Atsauksmes: piekrīt manuāli uzturētām kartītēm ar Google/Facebook atsauksmju pārkopēšanu?
5. Vai Google Search Console esošajam domēnam ir pieslēgta? Ja jā, piekļuve.
6. Vecie "komplektu" un "veikala" URL (2020. g.): vai tiem vēl ir nozīme, vai var pāradresēt uz /virtuves/.

## Darbu secība

### 1. Repozitorijs un Vercel priekšskatījums

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
- Canonical katrai lapai; ja būs EN, hreflang lv/en/x-default.
- Pārbaude ar Lighthouse (mobilais) katrai lapu grupai; mērķis 90+ Performance un SEO.

### 7. GA4 un piekrišana

- Piekrišanas josla pirms GA4 ielādes (ES prasība). Vienkāršs savs risinājums ar localStorage vai viegls bezmaksas CMP; Google Consent Mode v2 ar default denied.
- GA4 caur GTM vai tieši gtag. Notikumi: cta_click (ar vietu), phone_click, email_click, form_start, form_submit (tikai pēc veiksmīgas atbildes no api/contact), gallery_open, calculator_step, calculator_submit.
- Notikums skaitās ieviests tikai pēc pārbaudes GA4 DebugView.

### 8. Palaišana un nodošana

- Pirms palaišanas: izņemt noindex, robots atļauj, sitemap pieejams, redirects vercel.json, forma pārbaudīta uz info@laurasmebeles.lv, GA4 strādā, privātuma politika publicēta.
- Domēns laurasmebeles.lv Vercel projektā; DNS pārslēgt A/CNAME, nemainot MX/SPF/DKIM e-pastam. Pārbaudīt e-pasta piegādi pēc pārslēgšanas.
- GSC: jaunā versija tajā pašā īpašumā, iesniegt sitemap, pēc nedēļas pārbaudīt Coverage un 404.
- Nodošana: GitHub repo, Vercel projekts, Resend, Turnstile konti uz klienta vārda vai ar klientu kā īpašnieku. Pieejas dokumentēt atsevišķi, ne git.
- Esošo WordPress vietni atstāt pieejamu rezervei vismaz mēnesi (citā hostā vai eksportā).

### 9. Pēc palaišanas

- Pirmās 2 nedēļas: GSC 404 pārskats, pieteikumu kvalitāte, GA4 notikumi.
- Pēc vajadzības: EN versija, "Padomi" sadaļa no vecajām 2020. g. publikācijām, kalkulators ar reālām likmēm.
