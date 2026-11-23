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

05.11. atsauksmju atlase: pievienotas trīs Google un trīs Facebook atsauksmes no Signes iesūtītajiem ekrānattēliem. Tās rādām kopā ar sešām agrākās mājaslapas atsauksmēm; sākumlapā redzama viena kartīte no katra avota. Atkārtotie ieraksti no abām platformām atlasē nav iekļauti. Google kartītēm rāda konkrēto piecu zvaigžņu vērtējumu, Facebook kartītēm norādi “Iesaka Lauras mēbeles”. Saite uz katru atsevišķo atsauksmi nav pievienota, jo ekrānattēlos nebija tiešo adrešu; pilnās lapas apakšā ir saites uz uzņēmuma profiliem. Šis ir manuāls satura atlases variants, nevis tiešraides integrācija.

## 22.11.2026: pirmās divas EN lapas

Signe apstiprinājusi sākumlapas un virtuvju tekstu pielāgojumu. Ieslēgtas `/en/` un `/en/virtuves/`, saglabājot LV sadaļas, to secību, attēlus un projektu atlasi. Pārtulkoti arī metadati, attēlu apraksti, kopīgā navigācija un dialogu vadība. Valodu pārslēdzējs saglabā pašreizējo lapu un ir redzams telefonā. `hreflang` norāda tikai esošās valodu versijas. Saites uz vēl netulkotajām lapām paliek LV un ir marķētas ar LV.

Atsauksmes glabā pilnā apjomā atsevišķā EN failā pēc oriģinālā ID. Saglabāta teikumu secība un izteiksme; oriģinālie LV teksti, autori, vērtējumi un avotu dati nav mainīti. EN kartītēs norādīts, ka atsauksme tulkota no latviešu valodas. Pārējo 12 pamatlapu teksti sagatavoti `content/en/`, bet nav ieslēgti priekšskatījumā.

Pārbaudes: `npm run check`, `npm run test:i18n` (ietver build), melnrakstu ģenerēšana un `git diff --check` veiksmīgi. Automātiski pārbaudītas abu EN lapu iekšējās saites/resursi, sadaļu secība, valodu maršruti un atsauksmju pilnā teksta atbilstība atsevišķajam tulkojumu failam. Pārlūkā pārbaudīts datora un 390 × 844 telefona skats, mobilā izvēlne, LV/EN pārslēdzējs, bilžu maiņas pogas, projektu dialogs un atsauksmju izvēršana. Saglabājas priekšskatījuma noindex un esošie formas/integrāciju ierobežojumi.

Tā paša datuma stila pārskats: pēc Signes apstiprinājuma virtuvju ievads sākas ar “We design custom kitchens to suit your space and the way you cook.” Pārskatīti pārējie uzņēmuma EN teksti, izlaboti vispārīgie un burtiskie formulējumi izvēlētos projektu, plānošanas un uzņēmuma aprakstos. Pārējo lapu melnraksti atjaunoti kā v2; to EN adreses nav ieslēgtas. Atsauksmju LV un EN avoti šajā pārskatā nav mainīti.

Atkārtoti veiksmīgi `npm run check`, `npm run test:i18n`, melnrakstu ģenerēšana un `git diff --check`. Papildus pārbaudīts, ka virtuvju lapas body HTML marķējums sakrīt ar iepriekšējo versiju un visu sešu projektu redzamie/paplašinātie teksti sakrīt ar dialogu pilnajiem aprakstiem. EN sākumlapas rezultāts nav mainījies. Pārlūkā pārbaudīts jaunā virtuvju ievada izkārtojums datora un 390 × 844 telefona skatā.

## 22.11.2026: pārējās piecas mēbeļu kategorijas EN

Pēc Signes apstiprinājuma ieslēgtas `/en/skapji/`, `/en/koridora-iekartas/`, `/en/vannasistabas-mebeles/`, `/en/sekcijas/` un `/en/citas-mebeles/`. Teksti pārnesti no apstiprinātajiem melnrakstiem uz EN vārdnīcu. Saglabāti LV izkārtojumi, sadaļu secība, attēli un projektu atlase. Iztulkoti arī metadati, pieejamības apraksti un 25 šo lapu izmantoto projektu dialogu teksti. EN tagad pieejama sākumlapa un visas sešas mēbeļu kategorijas; atlikušo septiņu pamatlapu EN adreses nav ieslēgtas.

Papildu labojums pēc Signes norādes: “Citas mēbeles” sadaļā “Ko pārrunāsim” abās valodās izņemts tikai piemērs par virtuvi un nolaižamu gultu. Vispārīgā doma par vairāku funkciju apvienošanu un pārējais saturs paliek.

`npm run test:i18n` aptver visas septiņas EN lapas: pārbauda teksta/atribūtu tulkojumu pārklājumu, sadaļu un izkārtojuma marķējumu, attēlus, saites, valodu adreses un kartīšu/dialogu tekstu atbilstību. Pārlūkā pārbaudītas visas piecas jaunās lapas datora un 390 × 844 telefona skatā, nav horizontālas pārplūdes. Pārbaudīts skapja projekta dialogs, foto pāršķiršana, LV/EN pārslēgšana un piemēra izņemšana abās valodās. Atsauksmju avoti un tulkojumi šajā izmaiņā nav mainīti.

## 22.11.2026: mēbeļu pārskats, “Par mums” un kontakti EN

Pēc Signes apstiprinājuma ieslēgtas `/en/pakalpojumi/`, `/en/par-mums/` un `/en/kontakti/`. Pārnesti abi pēdējie precizējumi: pārskata priekšnama kartīte konkrēti nosauc skapjus, sēdvietu un glabāšanu; ražotnes rindkopā lietots “our own workshop in Riga”. Saglabāta esošā struktūra un izvietojums. Iztulkoti metadati, attēlu/video un kartes apraksti, formas vadība, izvēlētā cenu piemēra konteksts un lokālās formas pārbaudes paziņojums. E-pasta lauka piemērs lokalizēts, īstā uzņēmuma e-pasta adrese saglabāta.

`npm run check`, `npm run test:i18n` (desmit EN lapas un build), melnrakstu ģenerēšana un `git diff --check` veiksmīgi. Pārlūkā pārbaudītas trīs lapas 1440 × 900 un 390 × 844 skatā bez horizontālas pārplūdes. Kontaktlapā pārbaudīta pāreja LV → EN un EN → LV, e-pasta/tālruņa lauku maiņa, izvēlētā cenu piemēra noņemšana un formas izmēģinājums ar skaidru angļu paziņojumu, ka pieteikums nav nosūtīts. Ārējā e-pastu piegāde nav pievienota. Atlikušās četras pamatlapas paliek melnrakstos.

## 22.11.2026: atlikušās četras EN pamatlapas un galerijas projekti

Pēc Signes apstiprinājuma ieslēgtas cenu, darbu galerijas, iedvesmas un atsauksmju lapas, kā arī visas 174 galerijas indeksā izmantotās projektu apakšlapas. EN versija tagad aptver visas 14 pamatlapas. Saglabāta struktūra, projektu atlase, numerācija, foto secība un izvietojums. Valodu pārslēdzējs saglabā konkrēto projektu. Papildināti galerijas nosaukumu, foto skaita, metadatu, attēlu aprakstu un vadības tulkojumi. Cenu piemēru pogai “Get a quote for a similar kitchen”; EN BUJ jautājums un atbilde pielāgoti piegādei un montāžai ārpus Latvijas pēc apstiprinātās eksporta pieredzes. LV BUJ teksts nav mainīts. Atsauksmju oriģinālie dati un atsevišķie pilnie EN tulkojumi nav mainīti.

Veiksmīgi `npm run check`, `npm run test:i18n` (14 pamatlapas un 174 projektu lapas, ieskaitot build), tekstu ģenerēšana un `git diff --check`. Automātiski pārbaudītas saites, tulkojumu pārklājums, struktūra, attēli, valodu adreses un pilnie atsauksmju teksti. Pārlūkā pārbaudīti 1440 × 900 un 390 × 844 skati, cenu piemēra pāreja uz EN kontaktformu, ārvalstu BUJ atbilde, galerijas 18 → 36 projektu izvēršana, skapju filtrs, projekta lapa un atgriešanās filtrētajā galerijā, foto skata 1 / 3 → 2 / 3 pāršķiršana, pirms/pēc slīdnis, zaļās virtuves dialogs un atsauksmes izvēršana. Nav mainīti priekšskatījuma noindex vai neieviestās integrācijas.


## 22.11.2026: pirmās divas RU lapas

Pēc Signes apstiprinājuma ieslēgtas /ru/ un /ru/virtuves/. Saglabāts LV makets, sadaļu secība, projekti, attēli un fakti. RU vārdnīcā pievienoti apstiprinātie pamatteksti, metadati, kopīgā navigācija un kājene, alt/pieejamības apraksti, astoņu izmantoto projektu dialogi un runtime vadība. Trīs sākumlapas atsauksmes izmanto pilnus atsevišķus tulkojumus pēc ID; src/reviews.json nav mainīts. Valodu pārslēdzējs un hreflang pievieno RU tikai abās gatavajās lapās. Pārējās saites apzināti ved uz LV lapām ar LV marķējumu un krievu paskaidrojumu. Fontu faili papildināti ar EB Garamond kirilicu.

Pēc valodas un faktu/Planner apakšaģentu pārbaudēm un Signes pēdējās norādes kontaktu aicinājumā paliek «Для начала достаточно идеи. Расскажите нам о ней, и мы вместе продумаем, как её воплотить.» Pamatteksti un pārbaudes saglabāti content/ru/.

Veiksmīgi npm run check, npm run test:i18n un git diff --check. i18n pārbaudes aptver EN 14 pamatlapas un 174 projektu lapas, RU abas lapas, teksta pārklājumu, maketa/attēlu identitāti, saites, valodu pieejamību, canonical/hreflang, pilnās atsauksmes un projektu kartīšu/dialogu tekstu atbilstību. Lokāli pārbaudīti 1440 × 900 un 390 × 844 skati, nav horizontālas pārplūdes vai neielādētu satura attēlu. Pārbaudīta mobilā izvēlne, EN/RU pārslēgšana virtuvju lapā, atsauksmes izvēršana, pirms/pēc slīdņa 50 → 51 un projekta dialoga foto 1 / 4 → 2 / 4. Saglabāts noindex; Resend/GA4 un reālā formas nosūtīšana nav pievienota.


## 22.11.2026: piecas pārējās RU mēbeļu kategorijas

Pēc Signes apstiprinājuma ieslēgtas /ru/skapji/, /ru/koridora-iekartas/, /ru/vannasistabas-mebeles/, /ru/sekcijas/ un /ru/citas-mebeles/. Kopā septiņas RU pamatlapas un 33 unikālu izmantoto projektu dialogi. Pārnesti pārbaudītie teksti, metadati, alt/aria, kartīšu un pilno dialogu apraksti. Saglabāti bloki, faktori, projektu/foto secība un vannas istabas pasūtījuma ierobežojums ievadā un metadatos. Atsauksmes nav mainītas. Pārējās RU lapas un galerijas projektu apakšlapas nav ieslēgtas.

Neatkarīgā integrācijas pārbaude apstiprina visu 52 pamatteksta bloku un 25 jaunu unikālo projektu atbilstību apstiprinātajiem failiem. Visas piecas lapas pārlūkā pārbaudītas 1440 × 900, 390 × 844 un 360 × 800 skatā bez horizontālas pārplūdes vai apgrieztiem virsrakstiem/pogām. RU kategoriju H1 līdzsvarota aplaušana un nedalāmās atstarpes novērš atsevišķi palikušu «заказ» un «и». Galeriju pogām līdz 540 px pielāgotas atstarpes, lai tās ietilptu vienā rindā, nemainot tekstu vai fonta izmēru. Pārbaudīta mobilā navigācija, EN/RU pārslēgšana ar saglabātu kategoriju, projekta dialoga foto 1 / 4 → 2 / 4 un kartītes apraksta izvēršana; konsoles kļūdu nav. Priekšskatījuma noindex un neieviesto integrāciju statuss saglabāts.

Gala pārbaudes: `npm run test:i18n` (EN 14 + 174, RU 7), `npm run check` un `git diff --check` veiksmīgi.


## 22.11.2026: atlikušās septiņas RU pamatlapas un galerija

Pēc Signes norādes sagatavoti, neatkarīgi pārbaudīti un ieslēgti mēbeļu pārskata, Par mums, kontaktu, cenu, iedvesmas, darbu galerijas un atsauksmju RU teksti. RU apjoms tagad ir 14 pamatlapas un 174 galerijas projektu lapas, 41 dialoga projekts un 12 pilnas atsauksmes. Saglabāta struktūra, foto un projektu secība, piecu cenu piemēru summas, izmēri, komplektācijas un sākumcenas nosacījumi, kā arī 13 pirms/pēc projektu atlase. Oriģinālo atsauksmju dati un trīs iepriekš apstiprinātie RU tulkojumi nav mainīti. Saglabāts maketa formas nenosūtīšanas paziņojums un noindex. Resend, GA4 un domēna palaišanas darbi nav pievienoti.

Atsevišķi valodas un faktu/izpētes apakšaģenti pārbaudīja visas septiņas lapas, 12 atsauksmes un galerijas numerācijas/alt modeļus. Pēc labojumiem gala faili atkārtoti nolasīti. RU Par mums un cenu H1 līdzsvarota aplaušana un nedalāmās atstarpes novērš neveiklus rindu dalījumus, nemainot vārdus. Visas septiņas jaunās lapas pārlūkā pārbaudītas 1440 × 900, 390 × 844 un 360 × 800 skatā; cenas papildus 1024 px. Nav horizontālas pārplūdes vai apgrieztu virsrakstu/pogu. Pārbaudīta RU cenu piemēra pāreja uz kontaktformu, izvēlētā konteksta noņemšana un vietējās formas izmēģinājums, galerijas 18 → 36 izvēršana un skapju filtrs, projekta foto 1 / 2 → 2 / 2 un EN/RU pārslēgšana tajā pašā projektā, pilnas atsauksmes izvēršana.

Veiksmīgi npm run test:i18n (EN un RU katrai 14 + 174) un npm run check. Pārbaudīts tekstu pārklājums, struktūra/foto, saites, metadati/hreflang, pilnās atsauksmes un projektu dialogi. Neatkarīgā gala HTML pārbaude apstiprina visas piecas cenas, septiņu jauno lapu metadatus, 13 iedvesmas projektu secību un pilnos dialogus, 12 atsauksmju atbilstību pēc ID un 174 galerijas ierakstus bez LV funkcionālā teksta paliekām. Teksti un detalizētā redakcijas atskaite: content/ru/parejo-lapu-teksti.md.


## 22.11.2026: īsā EN ražotnes norāde faktu joslā

Pēc Signes apstiprinājuma tikai EN sākumlapas joslā zem hero lietots “Our own workshop” / “Made in Riga”. Izmantotas jau esošās konteksta atslēgas home.stats.workshop.title/description; ražotnes sadaļas pilnais uzraksts un citas lapas nav mainītas. Pārbaudīts 1440 × 900 un 390 × 844 skatā: datorā virsraksts vienā rindā, telefonā divās tāpat kā blakus “From start to finish”; pārplūdes nav. npm run test:i18n (EN/RU katrai 14 + 174) un git diff --check veiksmīgi.


## 22.11.2026: pirmie norvēģu Bokmål teksti

Sagatavoti sākumlapas un virtuvju pilnie melnraksti content/no/, 211 teksta/meta/alt/aria/UI fragmenti un trīs pilni atsauksmju tulkojumi. Saglabātas deviņas sākumlapas sadaļas, seši virtuvju projekti, trīs sākumlapas pirms/pēc projekti ar astoņiem unikāliem ID un visi apstiprinātie fakti. Atsevišķi apakšaģenti pārbaudīja idiomātisku Bokmål, struktūru/faktus un izpētes atbilstību; atsauksmes salīdzinātas tieši ar LV, saglabājot 6/6/12 teikumus. Pēc valodas redakcijas labotas darba virsmas vietas un vitrīnas detaļu nozīmes, saglabājot īsus nosaukumus.

Automātiski pārbaudīts pilns fragmentu pārklājums, visu sešu kartīšu sadalīto un pilno dialogu tekstu vienādība un trīs atsauksmju MD/JSON burtiska atbilstība. Aktīvais src/i18n/no.json, valodu konfigurācija un oriģinālās atsauksmes nav mainītas. Šis ir tekstu sagatavošanas posms, NO lapas pārlūkā vēl nav ieslēgtas vai pārbaudītas.


## 22.11.2026: NO sākumlapas un virtuvju priekšskatījums

Pēc Signes apstiprinājuma ieslēgtas tikai /no/ un /no/virtuves/. Pārnesti visi pārbaudītie pamatteksti, metadati, kopīgā saskarne, alt/aria, astoņu projektu dialogi un trīs pilnie atsauksmju tulkojumi. Neatkarīgā gala integrācijas pārbaude apstiprina tekstu, skaitļu, 11 valstu, projektu secības, cenas iekļāvuma un pilno atsauksmju atbilstību. Oriģinālās atsauksmes nav mainītas. Pārējās NO saites rāda LV ar norvēģisku paskaidrojumu, galerijas apakškoks nav ieslēgts. Priekšskatījuma noindex saglabāts.

Abas lapas pārbaudītas datora un 390/360 px telefona skatos bez horizontālas pārplūdes. NO datora izvēlne līdz 1399 px pārslēdzas uz izvēršamo veidu, lai nesaspiestu logo vai saites; no 1400 px pilnajā izvēlnē visi uzraksti un Kontakt oss poga ir vienā rindā. Sākumlapas H1 saglabāti visi vārdi, līdzsvarots tikai rindu dalījums. Galerijas pogai telefonā samazinātas atstarpes bez fonta vai teksta maiņas. Pārbaudīta mobilā izvēlne/kategorijas, NO/EN pārslēgšana virtuvju lapā, foto 1 / 3 → 2 / 3, pirms/pēc slīdnis 50 → 51 ar Før/Etter foto apzīmējumiem un pilnas atsauksmes izvēršana. Konsoles kļūdu nav.

Gala npm run test:i18n (EN/RU katrai 14 + 174, NO 2), npm run check un git diff --check veiksmīgi.

## 22.11.2026: piecu pārējo mēbeļu kategoriju NO priekšskatījums

Pēc Signes apstiprinājuma ieslēgtas /no/skapji/, /no/koridora-iekartas/, /no/vannasistabas-mebeles/, /no/sekcijas/ un /no/citas-mebeles/. 205 pārbaudītie fragmenti pārnesti uz aktīvo vārdnīcu, tulkoti arī metadati, alt/aria un projektu pilnie dialogi. Kopā septiņas NO pamatlapas un 33 unikāli projekti; trīs iepriekšējās pilnās atsauksmes nemainītas. Neatkarīgais integrācijas audits apstiprināja MD/ģenerēto lapu atbilstību, 8/4/4/5/6 projektu secību un vannas mēbeļu izgatavošanas ierobežojumu ievadā un meta aprakstā. Pārējās septiņas NO pamatlapas un galerijas apakškoks vēl nav ieslēgti. Noindex saglabāts.

Visas piecas lapas pārbaudītas 1440 px datorā un 390/360 px telefonā: virsraksti un pogas nepārplūst. NO kategoriju H1 pievienots CSS text-wrap:balance, lai pēdējais vārds nepaliktu viens; apstiprinātie vārdi, struktūra un izvietojums nav mainīti. Mobilajā izvēlnē visas sešas kategorijas ved uz NO bez LV norādes. Pārbaudīta NO/EN pārslēgšana tajā pašā vannas mēbeļu lapā, projekta pilnais dialogs, foto 1 / 2 → 2 / 2 un Les mer izvēršana.

Gala npm run test:i18n (EN/RU katrai 14 + 174, NO 7), npm run check un git diff --check veiksmīgi.


## 22.11.2026: pārējo NO lapu tekstu sagatavošana

Sagatavoti atlikušās septiņas pamatlapas, galerijas 174 saistīto projektu lapu saskarnes modeļi un deviņi jauni pilni atsauksmju tulkojumi. Trīs AI apakšaģenti nodrošināja savstarpēju valodas redakciju un atsevišķu faktu/struktūras/Keyword Planner auditu. Iestrādāti koka toņa un faktūras precizējumi, plūstošāki jauno nosaukumu un 3D procesa formulējumi. Saglabātas cenas EUR, visas komplektācijas, 11 valstis, garantijas robežas un formas nenosūtīšanas fakts. Ārvalstu piegādes BUJ pielāgots pēc iepriekš apstiprinātās EN pieredzes atbildes.

Automātiski pārbaudīta 1588 papildfragmentu sagatave pret aktuālo LV: 7 atlikušās pamatlapas, 174 galerijā saistītās lapas, 41 izmantots projekta ID un visi 12 pilnie citāti MD/JSON. Trūkstošu fragmentu, savstarpēju konfliktu vai apstiprināto NO vērtību pārrakstīšanas nav; pirmie trīs citāti precīzi nemainīti. Pilnie teksti un pārbaudes: content/no/parejo-lapu-teksti.md. Src/i18n/no.json, aktīvās atsauksmes, konfigurācija un public/ nav mainīti. Šajā posmā nav veiktas jauno lapu pārlūka pārbaudes vai Vercel atjaunināšana; tas seko ievietošanas posmā.


## 22.11.2026: pilnais NO priekšskatījums

Pēc Signes apstiprinājuma ieslēgtas atlikušās septiņas NO pamatlapas un 174 galerijas projektu lapas. Pārnesti 1588 apstiprinātie fragmenti, metadati/alt/aria un 12 pilni citāti; pirmie trīs tulkojumi precīzi nemainīti. NO tagad ir 14 pamatlapas, 174 galerijas lapas un 41 izmantots dialoga projekta ID. Neatkarīgais gala ģenerēto lapu audits apstiprina cenas/komplektācijas, apzināto eksporta BUJ lokalizāciju, 13 pirms/pēc projektu secību, pilnos dialogus un 12 atsauksmes. LV fallback nav, valodas pārslēgs saglabā konkrēto lapu. Oriģinālās atsauksmes un apstiprinātie agrākie NO teksti nav pārrakstīti.

Septiņas jaunās lapas pārlūkā pārbaudītas 1440, 390 un 360 px platumā; cenas arī 1024 px. Pārplūdes/apgrieztu pogu nav. Garākiem Par mums/cenu H1 un cenu piemēra pogai līdzsvarots rindu dalījums ar CSS, nemainot vārdus vai fontu. Pārbaudīta cenu piemēra pāreja uz NO kontaktformu, konteksta noņemšana un maketa nenosūtīšanas rezultāts, galerijas 18 → 36 izvēršana un skapju filtrs, projekta foto 1 / 2 → 2 / 2 un EN/NO pārslēgšana, pilnas atsauksmes izvēršana, jaunās zaļās virtuves slīdnis 50 → 51 un Før 1 / 3 → Etter 2 / 3. Apskatītas arī ražotnes, partneru, valstu un noslēguma sadaļas. Konsoles kļūdu nav. Noindex un formas izmēģinājuma statuss saglabāts; DNS, Resend un analītika vēl ir PLAN.md darbi.

Gala npm run test:i18n (EN/RU/NO katrai 14 + 174), npm run check un git diff --check veiksmīgi.


## 23.11.2026: oriģinālvalodas atsauksmes pēc valodas

Pievienotas trīs EN un viena RU oriģinālās atsauksmes no Signes četriem ekrānattēliem. Neatkarīgi pārbaudīti autori, pilnie teksti un faktiskie vērtējumi. Jaunie dati ir src/reviews.native.json ar valodas ierobežojumu un atsevišķu sākumlapas atlasi. EN sākumlapā visi trīs oriģināli; RU sākumlapā Studija Kantilēna pirmā, pēc tam Dace Milberga un Toms Panders tulkojumi. Atsauksmju lapā EN 15, RU 13; LV/NO 12 un to sākumlapas izlase nemainīta. Nav automātisku jauno citātu tulkojumu citām valodām. Esošie 12 LV avoti un EN/RU/NO pilnie tulkojumi precīzi saglabāti.

Ģenerators atlasa kartītes pirms HTML tulkošanas; oriģināla valodā izmanto paša autora tekstu bez tulkojuma norādes. Facebook rekomendācijai nav izdomāta skaitliska atzīme, Google abiem jaunajiem 5/5. Tekošās/relatīvās datumu norādes nav pārvērstas izdomātā datumā. Garie teksti izvēršami, rindkopas saglabā white-space:pre-line. Oriģinālā RU drukas kļūda avotā atstāta. Redakcijas politikas izvērtējums un avoti ir docs/reviews-by-language.md.

Pārbaudīti EN/RU sākumlapu un pilno atsauksmju lapu skati 1440 un 390/360 px, garās EN atsauksmes izvēršana, īstie avotu marķējumi un tulkojuma norāžu neesamība oriģināliem. Pārplūdes nav. npm run test:i18n pārbauda visas valodu lapas, pilnos citātus, atsevišķo sākumlapu secību un jauno atsauksmju neparādīšanos svešās valodās. npm run check veiksmīgs. Norvēģu oriģināls ir PLAN.md atvērts solis; RU BUJ pārmaiņa tikai priekšlikums, aktīvā atbilde nav mainīta.

Gala statiskais build un node scripts/i18n.test.mjs veiksmīgi. Atsevišķi pārbaudīts, ka src/reviews.json un visu trīs valodu atsauksmju tulkojumi ir precīzi nemainīti pret iepriekšējo Git versiju.
