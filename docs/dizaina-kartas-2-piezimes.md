# Dizaina kārta 2: ieteikumi un statuss (02.11.2026)

Avots: Claude Design ieteikumi par "amatieriskuma" sajūtu. Skaitļi ieteikumā neatbilda mūsu CSS (piemēram, H2 mums ir līdz 50px, nevis ~90px; teksta svars jau ir 400, nevis Light), tāpēc katrs punkts ir pārbaudīts pret reālajiem izmēriem 1440px platumā.

| # | Ieteikums | Statuss | Piezīme |
|---|---|---|---|
| 1 | Tumšāks, lasāmāks pamatteksts, mazāka rindstarpa | Izdarīts | --muted #696561 uz #5a5650 (kontrasts 5,3 uz 6,7:1); intro #4a4741 (8,5:1); rindstarpa 1,8 uz 1,55 līdz 1,65. Svars jau bija 400. |
| 2 | Virsraksta un teksta izmēru starpība | Izdarīts citādi | H2 nesamazinām (tas jau ir 50px). Intro palielināts no 14px uz 16 līdz 18px. |
| 3 | Tukšums sekcijas galvenē | Izdarīts | Grid 7/5, labā kolonna visās sekcijās sākas vienā vietā un balstās uz virsraksta pēdējo rindu. Mobilajā zem virsraksta. |
| 4 | Sekciju ritms, viena vai divas atšķirīgas | Gaida | Piem., process uz tumša fona. |
| 5 | Divi gandrīz vienādi bēši toņi | Gaida | #f7f5f2 un #eeebe6. Jāizlemj: viens fons vai skaidri atšķirīgs. |
| 6 | Numuru čipi un 14 līdz 18px noapaļojumi | Gaida | Klients apstiprināja "mērenus noapaļojumus"; samazināt uz 4 līdz 8px ir saderīgi. |
| 7 | Ikonas | Gaida | Aizstāt ar faktiem, kas apstiprināti (piem., "kopš 2008. gada"). Nevar lietot izdomātus skaitļus ("100%"). |
| 8 | Atstarpes un viena kreisā mala | Gaida | "Par mums" sekcijai kreisā mala ir 117px pret 72px citām. |
| 9 | Tipogrāfijas sīkumi (text-wrap, vienāds max-width) | Gaida | |

## Pakalpojumu bloks (02.11.2026)

"Ko mēs izgatavojam" vairs nav seši vienādi kartiņu bloki ar lielām bildēm (tie dublēja "Realizētie projekti"). Tagad:
- Virtuves (galvenais virziens) ir lielā kartiņa ar 3 foto kolāžu; foto izvēlēti tā, lai nesakristu ar sākumlapas hero un "Realizētie projekti" foto (`featuredCollage` scripts/generate-pages.mjs).
- Pārējās piecas kategorijas ir teksta saraksts (nosaukums, viens teikums, bultiņa), bez bildēm.
- Bloks aizņem ~565px (iepriekš ~950px+); mobilajā kolāža augšā, saraksts zem tās.
- Noteikums: sākumlapā katrs foto parādās vienu reizi. Pašlaik pārējām kategorijām ir pa vienam foto, tāpēc tām kolāžas nav; kad būs 3+ foto, kolāžu var pievienot tāpat kā virtuvēm.
- Izmaiņa attiecas arī uz /pakalpojumi/, jo abas lapas lieto vienu `categoryCards()`.

## "Par mums" un sākumlapa (02.11.2026)

- Sākumlapā izņemta sadaļa "05 / Lauras mēbeles, Risinājumi, kas pielāgojas telpai". Tā bija pirmais bloks no lapas "Par mums", kas bija nokopēts atsevišķi un bez pārējiem vērtību punktiem; tā dublēja augšējo joslu un galerijas projektu. "kopš 2008. gada" sākumlapā tagad parādās divreiz (hero un josla).
- /par-mums/ pārbūvēta: 4 numurēti vērtību punkti (pielāgoti risinājumi, kvalitāte un materiāli, uzmanība detaļām, pieredze un darbnīca). Platā ekrānā labajā pusē viena sticky bilde, kas mainās ritinot (IntersectionObserver, `public/app.js`; reduced-motion respektēts). Mobilajā katram punktam sava 260px bilde. Pieredzes punktam bildes nav, tur liels gads "2008".
- Trūkst: komandas un darbnīcas foto. Kad tie būs, pieredzes punktam var pievienot bildi (`values` masīvs scripts/generate-pages.mjs).

## Cenu lapas ievads
Virsraksts + liels teksts nomainīts ar sarakstu "Kas veido mēbeļu cenu?" (izmēri, materiāli, aprīkojums, piegāde un montāža) un CTA joslu; zem tā paliek kalkulators. Teksts balstīts tikai uz esošajiem faktiem no vietnes.

## Vienoti apakšlapu ievadi
Visām apakšlapām (page-intro, kategoriju hero, cenas) vienots h1 izmērs clamp(34-54px), ievada teksts 16-18px ar tumšāku krāsu, vienādas atstarpes (48px augšā, 56px apakšā; mobilajā 32/40).

## Siltā paleti un serifs
Palete nomainīta uz siltu (krēms #f6f2ec, smilšu #efe8de, brūngans tumšais #231f1b, bronzas akcents #9a6a38 vietā sarkanajam). Virsraksti: Lora (lokāli public/fonts). Pogu formas nemainītas (pill noraidītas). Pievienota skaitļu josla sākumlapā un sadarbības partneri + eksporta valstis lapā Par mums (dati no esošās laurasmebeles.lv; "30+" jāapstiprina pret "kopš 2008").

## Apvienota josla
Skaitļu josla un trīs ieguvumu rindiņa apvienotas vienā joslā ar ikonām (30+, 11 200+, 4 200+, 5 ★ Google). Ceturtā kolonna: "5 ★ Vērtējums Google" - vērtējums no Laila, JĀPĀRBAUDA pret īstajiem Google/Facebook rādītājiem pirms publicēšanas.

## Process
Procesa sadaļa paplašināta uz 6 soļiem (konsultācija, uzmērīšana, 3D projekts, tāme un līgums, ražošana, montāža) pēc klienta piemēra un vecā vietnes teksta. Aprakstos nav termiņu vai garantiju.

## Par mums labojumi
Virsraksts, CTA un eksporta virsraksts nomainīti; ritināmā bilžu sadaļa aizstāta ar pamīšus teksta/attēla blokiem bez numerācijas; detaļu teksts vispārināts; partneriem ikonas, eksporta valstīm SVG karodziņi (public/flags, flag-icons, MIT).

## Sākumlapas vienkāršošana (2026-11-02)
- Sākumlapa: hero, skaitļu josla, kategorijas, darbi, īss cenu bloks (saite uz /cenas/), īss process (6 soļi, saite uz Par mums), atsauksmes, kontakti.
- Noņemts: kalkulators no sākumlapas (paliek /cenas/), dublētais `project-cta`, BUJ (pārcelts uz /cenas/).
- Nākamais: kategorijām katrai sava bilde, vienota "Mūsu darbi" galerija ar filtriem, cenu piemēri, bilžu atlase pēc gaismas/toņiem.
