# Izstrādes plāns pēc 03.11.2026 audita

Pamats: Lailas iedotais audits (komits 566e126). Gala foto vēl nav saņemti, tāpēc A–C posmi strādā ar pagaidu bildēm. Katra posma beigās: build, 390 un 1440 px pārbaude, komits, Sync.

## A. Ātrie izkārtojuma labojumi (sākam tūlīt)
1. Flīžu teksts: baltā josla zem foto, tumšs teksts (sākumlapas 6 flīzes, vēlāk arī pakalpojumu pārskats).
2. Atsauksmju kartītes: baltas kartītes, pēdiņu zīme, autora rinda (sākumlapā un atsauksmju lapā). Tukšos Google/Facebook filtrus paslēpt, skaitītāja tekstu izlabot.
3. Sākumlapa: poga "Citas mēbeles" kļūst par "Visi mēbeļu veidi"; statistikas josla bez rindkopām (ikona, skaitlis, nosaukums), "Google vērtējums 5,0 ★"; hero 1. kadrs ar virtuvi redzamu telefonā; izceltā projekta teksts 1-2 teikumi; process/kontakti flīzes atsaucas uz pareizajām vietām (`/par-mums/#process`); kontaktu flīze kļūst par teksta kartīti.
4. Kājene: logo saite uz `/`, pievienot Cenas un Par mums (privātuma politika vēlāk). Kontaktu lapā viens bloks ar vienu virsrakstu.

## B. Struktūra un kategoriju lapas
5. Pakalpojumu pārskats (`/pakalpojumi/`): 6 kategorijas vienādā režģī (3 kolonnas datorā, 1 telefonā), viens attēls, nosaukums, viens teikums.
6. Virtuves lapas paraugs: hero, īss ievads, darbu izlase, konkrēts informācijas bloks (mazas un stūra virtuves), cenas virziens, viena poga. Saite "Atvērt fotogaleriju" tikai tad, ja galerijā ir vairāk bilžu.
7. Pārējās 5 kategorijas pēc paraugs, katrai atšķirīgs konkrēts bloks (skapjiem durvju veidi, priekšnamam sēdvietas, vannas istabai izmēri/santehnika, viesistabai TV zonas, citām neparastie risinājumi). Bez izdomātiem materiāliem vai garantijām.

## C. Galerija un cenas
8. Vienota galerija `/musu-darbi/`: foto režģis bez obligātiem parakstiem, kategoriju filtri, 18-24 sīktēli sākumā, "Ielādēt vēl" ar parastām saitēm uz nākamajām lapām, lielais skats ar iepriekšējo/nākamo, filtra un ritināšanas vietas saglabāšana. Izlase kategorijās un pilnā galerija izmanto vienu datu avotu (`src/catalog.mjs`).
9. Izceltais projekts "Virtuve siltos toņos" pievienots katalogam; "Apskatīt šo projektu" atver abas bildes lielajā skatā.
10. Cenu lapa: H1 "Mēbeļu cenas", faktori, vieta 2-3 cenu piemēriem (tukša, līdz klients apstiprina), cenu BUJ, viena poga uz kontaktiem. Konfiguratoru no plūsmas izņemt (saglabāt failos).
11. Par mums: process pēc vērtību blokiem, pirms partneriem; kompakti partneri un eksports.

## D. Pēc klienta foto saņemšanas (Laila atlasa)
12. Vienotais foto un projektu saraksts ar izcelsmi un klienta apstiprinājumu. Projekti grupēti tikai tur, kur piederība zināma (esošais `triage/groups.html` pipeline atkārtoti izmantojams).
13. Hero, kategoriju vāki, izlases, galerija, alt teksti, ekrāna izmēru varianti (webp), projektu fakti tikai pārbaudīti.
14. Pastāvīgas adreses atlasītiem projektiem (modālis + atsevišķa lapa ar to pašu saturu, atpakaļ poga un tieša ielāde). Tikai pēc tam, kad zināms, cik projektu tiek aprakstīti.

## E. Palaišanas gatavība
15. Kontaktforma pa īstam (Resend + Turnstile, `api/contact.js`), pēc tam uzmetuma norādes tiek noņemtas.
16. GA4 un piekrišana: notikumi arī jaunajiem elementiem; veiksmīgs pieteikums tikai pēc servera apstiprinājuma.
17. SEO: pāradresācijas, valodu lēmums, sitemap, breadcrumb/uzņēmuma dati, OG attēli pa kategorijām, ātrums (otrā hero kadra lazy ielāde).
18. Palaišana: noņemt noindex, `SITE_URL`, Vercel Pro, pārbaude GSC/GA4. Pēc tam uzraudzība.

## Jāsaņem no klienta (bloķē tikai D un daļu E)
Jaunākie oriģinālfoto, darbnīcas/komandas foto, apstiprināti projektu fakti, cenu piemēri un atjaunotājs, "30+" vs "kopš 2008", galvenais tālrunis, Google profils, valodu lēmums, stylefoto.lv foto tiesības.

## Progress
- A posms izdarīts (03.11.2026): flīzes ar baltu joslu, atsauksmju kartītes, "Visi mēbeļu veidi", īsa statistika ("5,0 ★ Google vērtējums"), kontaktu teksta flīze, process uz `/par-mums/#process`, kājene (logo uz `/`, 5 saites), Kontakti ar vienu H1, atsauksmju lapā noņemti tukšie filtri.
- Nav izdarīts no A: hero pirmā kadra mobilā izgriezuma gala pārbaude; "30+" vs "kopš 2008" (gaida klientu).
