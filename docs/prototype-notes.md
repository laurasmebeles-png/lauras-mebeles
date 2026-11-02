# Vietnes struktūras uzmetums 03

Atjaunots 30.10.2026. Lokāls dizaina un pieteikšanās ceļa prototips.

## Saikne ar paraugu un izpēti

No https://leadframe.dev/web/laurasmebeles/ izmantots struktūras virziens: liels īsta projekta foto, mēbeļu kategorijas, realizētie darbi, sadarbības process, cenu sadaļa, atsauksme, biežākie jautājumi un forma. Mūsu sākumlapā cenas sadaļa novietota uzreiz aiz darbiem, lai interese par piemēru ātri pārietu sarunā par izmaksām.

Saglabāts esošais Lauras mēbeļu logo. Pēc Signes atgriezeniskās saites: gaišs vēsi bēšs #F7F5F2 un #EEEBE6, grafīts #292827, sarkans #B12632. Mēreni 8–18 px noapaļojumi, Avenir Next/Segoe UI fontu saime ar izteiktākiem virsrakstiem un vienotas SVG bultas. Hero foto aizpilda visu sekciju; 3,5 sekunžu attālināšanās sākas pēc attēla ielādes. Samazinātas kustības režīmā animācija izslēgta.

No izpētes: skaidrs H1 par virtuvēm un iebūvējamajām mēbelēm pēc pasūtījuma; virtuves un skapji kā divas lielās kategorijas; priekšnama, vannas istabas, viesistabas un citas mēbeles paliek redzamas. Cena, procesa skaidrība un jautājumi palīdz sagatavoties pieteikumam. Precīzi keyword apjomi netiek izgudroti.

Parauga projektu skaits, pieredzes skaitļi, vērtējumi un solījumi nav pārņemti. Pirms/pēc vai 3D salīdzinājums nav veidots, jo nav pieejama pārbaudīta atbilstošu attēlu pāra. Google atsauksmju integrācija gaida īsto profilu; esošā atsauksme ir marķēta kā avots no uzņēmuma lapas.

## Kas darbojas

- Responsīva sākumlapa un mobilā izvēlne; tastatūras fokuss, izlaides saite, kustību samazināšanas atbalsts.
- Sešu kategoriju izvēle aizved uz formu un iestata kategoriju.
- Galerijas filtri ar atturīgu parādīšanos un projektu dialogs. Pēc 30.10. piezīmēm no dialoga noņemta atsevišķa projekta piesaistīšanas poga; zem galerijas ir kopīgs CTA uz vispārīgo formu.
- Konfigurators: kategorija, garums, prioritāte. Parametri tiek pārnesti uz formu, neaizstājot ierakstīto ziņu.
- Forma ar izvēli e-pasts/tālrunis, nepieciešamo lauku pārbaudi un skaidru lokāla izmēģinājuma rezultātu.
- Lokāls notikumu žurnāls lapas kājenē. Notikumi glabājas tikai cilnes atmiņā, tiek zaudēti pēc pārlādes. Nav ārējo mērīšanas pieprasījumu vai sīkdatņu.

## Mērīšanas statuss

Lokāli pārbaudīti: gallery_filter, project_view, configurator_start, configurator_complete, form_start, form_preview_complete. Sagatavoti arī cta_click, category_select, phone_click, email_click, faq_open; sasaistes ir public/app.js.

Atļauto parametru saraksts ietver tikai fiksētas sadaļas/kategorijas/projektu ID. Vārds, e-pasts, tālrunis un ziņas teksts netiek nodoti dataLayer. Tas ir pamats tālākai integrācijai, nevis pilna GA4 ieviešana. generate_lead jāizsūta tikai pēc servera apstiprinātas pieteikuma pieņemšanas. Pirms palaišanas nepieciešama atsevišķa GA4/piekrišanas un deduplikācijas pārbaude.

## Pārbaudes

- JavaScript sintakses pārbaude un statisko failu sagatavošana.
- Lokālais serveris atgriež sākumlapu un statiskos resursus, publicē tikai public/ saturu un piesaistīts 127.0.0.1.
- Chrome: galerijas filtrs, projekta dialogs, izvēle formā, konfiguratora izvēle un 3,5 m pārnese, lietotāja teksta saglabāšana, e-pasta un tālruņa varianti, formas izmēģinājuma paziņojums.
- Datora un 390/360 px mobilais izkārtojums. Mobilajā pārbaudē nav horizontālas pārplūdes; attēli ielādējas.
- Notikumu žurnāls pārbaudīts: nav ievadītā testa vārda, e-pasta, tālruņa vai ziņas.

Ekrānattēli atrodas preview/. Nav veikts pilns pieejamības, pārlūku vai veiktspējas audits.

## Vēl nav gatavs publiskai palaišanai

Atsevišķās pakalpojumu lapas, EN versija, CMS, privātuma informācija, apstiprinātās cenu formulas un gala projektu apraksti. Servera formas apstrāde, Resend, Turnstile, pielikumi, GA4, GSC un Google atsauksmes. SEO migrācija: pilns URL inventārs, pāradresācijas, canonical, hreflang, sitemap, strukturētie dati, indeksēšanas iestatījumi. Ja tiek veidots llms.txt, tā saturs jāsaskaņo ar īsto publisko saturu; tas negarantē atrodamību AI atbildēs.

Pirms publiskas palaišanas jāizņem demonstrācijas paziņojumi un lokālais notikumu žurnāls, jāaizstāj formas darbība ar pārbaudītu servera plūsmu un jāmaina noindex/robots. Šajā posmā nekas netiek publicēts un DNS netiek mainīts.

## Piezīmes turpmākajai versijai

Pievienots lietotājas izvēlētais nolaižamās gultas projekta pāris. Jaunie Facebook hero kandidāti šajā versijā vēl nav iegūti. Pilnais 30.10. ideju dokuments saglabāts atsevišķi; demo cenu kalkulators, visu kategoriju projektu arhīvs, vairākfoto projekti, materiālu/detaļu foto bloki, partneri/valstis, sociālo tīklu atsauksmes un pakalpojumu apakšlapas ir turpmākās ieviešanas darbi. Šī piezīmju saglabāšana nav apliecinājums, ka tie jau ieviesti.

## Uzmetuma 02 pārbaude — 30.10.2026.

Pārbaudīts 1440 × 900, 390 × 844 un 360 × 800 izkārtojums. Nav horizontālas pārplūdes vai neielādētu attēlu. Galerijas filtrs un dialogs darbojas pēc projekta piesaistes pogas noņemšanas. Mobilā izvēlne aizveras pēc CTA izvēles un forma redzama zem fiksētās galvenes. Hero attēlam pēc ielādes aktivizējas hero-reveal animācija; CSS ietver reduced-motion izņēmumu (OS iestatījuma pārslēgšana šajā pārbaudē netika veikta). Sintakses un statisko failu sagatavošanas pārbaudes izturētas. Ekrānattēli: preview/desktop-v2.jpg un preview/mobile-v2.jpg.


## Struktūras izmaiņas pēc Signes apstiprinājuma — 30.10.2026.

Izveidotas 12 apakšlapas un kopīga navigācija ar Pakalpojumu apakšizvēlni. Sešu kategoriju saturs un desmit atlasītie projekti glabājas vienuviet. Virtuvēm atlasīti seši projekti; nolaižamās gultas projekts pieder arī citām mēbelēm. Pārējās kategorijās pagaidām pa vienam projektam. Diviem projektiem ir vairāki foto ar pāršķiršanu dialogā. Projektu grupēšana ir sākotnējā vizuālā atlase; gala aprakstus apstiprina klients.

Pakalpojumu saites uz kopīgo galeriju nodod validētu kategorijas filtru. Galerijā filtru var mainīt; tas saglabājas adresē un pēc pārlādes. Cenas piedāvājuma saites ved uz kopīgo kontaktlapu. Sākumlapas un cenu lapas veidnēs izmanto to pašu formas uzvedību un saturu.

No lietotājas iesniegtā WordPress XML pārnestas sešas īstās atsauksmes; saglabāts oriģinālais teksts, normalizētas atstarpes. Autoru amati netiek publicēti, jo to aktualitāte nav pārbaudīta. Atsauksmes netiek marķētas kā Google vai Facebook atsauksmes. Avotu filtri parāda skaidru nepievienotu datu statusu. Nav automātiskas sinhronizācijas, platformu vērtējumu vai izdomātu zvaigžņu.

Pārbaudītas visas 13 lapas un 30 iekšējās lapu/resursu adreses; katrai lapai ir viens H1, nav bojātu iekšējo enkuru. Pārlūkā pārbaudīts ceļš Pakalpojumi → Virtuves → filtrēta galerija, foto pāršķiršana, cits galerijas filtrs, atsauksmju izvēršana un avoti, mobilā izvēlne → Skapji → kontaktforma. Formas izmēģinājums nedod kļūdainu nosūtīšanas apstiprinājumu. Publicēšana, e-pasti un pilnā SEO migrācija šajā darbā nav veikti.

## 01.11.2026: vieglāks vizuālais izpildījums

Pēc Signe apstiprinātā salīdzinājuma ar Leadframe paraugu saīsināts sākumlapas hero virsraksts un ievads. Noņemts papildu foto sauklis, otrā hero darbība kļuvusi par vienkāršu saiti. Virsrakstiem izmantots 500 svars, pogām noņemtas ēnas, saglabāti mēreni noapaļojumi. Pakalpojumu un projektu foto palielināti; noņemtas atkārtotas kartīšu instrukcijas un saīsināti sadaļu ievadi. Atsauksmēm vieglāks izkārtojums ar atdalošām līnijām. Saglabāts logo, vēsi gaišais pamats un sarkanās CTA. Esošie projektu foto pagaidām paliek; Facebook ekrānattēli nav izmantoti hero.

Pārbaudes: npm run build un npm run check veiksmīgi; pārlūkā pārbaudīta sākumlapa datora 1440 px un telefona 360 px platumā, kā arī pāreja no pakalpojumu kartītes uz virtuvju lapu un tās mobilais izkārtojums. Pārbaudītajos skatos nav horizontālas pārplūdes; sākumlapai nav pārlūka kļūdu. Priekšskatījums: preview-refined-hero.jpg. Viss joprojām ir lokāls uzmetums.

01.11. atsauksmju izkārtojums: no individuālajām mājaslapas atsauksmju kartītēm noņemts avota uzraksts un saite. Oriģinālās avotu adreses saglabātas src/reviews.json. Atsauksmju lapā pievienota viena kopīga saite uz uzņēmuma Facebook profilu; Google CTA pagaidām nav vajadzīgs. Pieslēdzot ārējo atsauksmju avotus, to marķējumu pielāgo izvēlētā risinājuma prasībām.
