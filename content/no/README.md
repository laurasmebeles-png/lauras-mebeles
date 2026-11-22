# Norvēģu Bokmål teksti

22.11.2026. Pirmais ieviešanas posms: sākumlapa un virtuvju lapa pēc pašreizējās LV struktūras. Formulējumi sagatavoti dabiskā Bokmål, izmantojot saglabāto atslēgvārdu izpēti. Pēc Signes apstiprinājuma sākotnēji ieslēgtas /no/ un /no/virtuves/, tagad arī visas piecas pārējās mēbeļu kategorijas. Tagad ieslēgtas visas 14 NO pamatlapas un 174 galerijas projektu lapas.

| Fails | Saturs |
|---|---|
| [Sākumlapa](sakumlapa.md) | Deviņas pašreizējās sadaļas, metadati un trīs pilnas atsauksmes |
| [Virtuves](virtuves.md) | Ievads, seši projekti, mazas un stūra virtuves, praktiskās izvēles un cenas faktori |
| reviews.draft.json | Visu 12 aktīvo pilno tulkojumu kopija pēc ID. Ģenerators izmanto src/i18n/reviews.no.json; iepriekšējie trīs tulkojumi precīzi saglabāti. |
| [Piecu mēbeļu lapu teksti](parejo-mebelu-teksti.md) | Skapju, priekšnama, vannas istabas, viesistabas un citu mēbeļu apstiprinātie priekšskatījuma teksti |
| [Pārējo lapu teksti](parejo-lapu-teksti.md) | Septiņu pārējo pamatlapu un galerijas saskarnes apstiprinātie priekšskatījuma teksti |
| pending-translations.json | Tukša nākamo tulkojumu sagatave. Visi 1588 apstiprinātie fragmenti pārnesti uz aktīvo no.json. Publiskais ģenerators šo failu neizmanto. |

## Valoda un meklējumu nolūks

Lietojam Bokmål. Pamatfrāzes ir «møbler på mål» jeb mēbeles pēc izmēra un «skreddersydde kjøkken» jeb individuāli pielāgotas virtuves. Vārdus loka atbilstoši teikumam, nevis mehāniski atkārto ievadītā meklējuma formā. «Små kjøkken», «hjørnekjøkken», «kjøkkenfronter», «benkeplate» un «halvøy» lieto tajās pašās esošajās sadaļās un īstajos projektos. Pussala nekļūst par salu.

Ražotne paliek Rīgā. Īsā sākumlapas faktu josla ir «Eget verksted» / «Laget i Riga». Tas nozīmē pašu darbnīcu un izgatavošanu Rīgā. Pilnajā ražotnes sadaļā saglabāts paskaidrojums par mēbeļu detaļām, biroju, ekspozīciju un noliktavām vienuviet. Nav pievienota Norvēģijas adrese, fiksētas eksporta piegādes izmaksas vai vietēja norvēģu ražošana.

Izpētes avoti: [lapu formulējumu karte](../../docs/research/2026-11-22/lapu-formulejumu-karte.md), [strukturētā karte](../../docs/research/2026-11-22/page-keyword-map.json) ar nb un [Norvēģijas dati](../../docs/research/2026-11-22/nb-NO-ui.json). «Møbler på mål», «skreddersydde møbler», «skreddersydd kjøkken» un «måltilpasset kjøkken» katrai nolasīts 10–100 intervāls. Intervāli nav precīzi apjomi un nav summējami. Atsevišķu garo frāžu datu neesamība nav nulle. Nav izmērīti pilnu virsrakstu vai AI vaicājumu apjomi.

## Saglabātie fakti un atsauksmes

Saglabāti 2008. gads, 4 600+ virtuves, visi 11 eksporta valstu nosaukumi, pašreizējie foto, seši virtuves un trīs sākumlapas pirms/pēc projekti ar astoņiem unikāliem ID. Vienam projektam avotā nav pilna apraksta, tāds netiek izdomāts. Virtuves piedāvājumā paliek projektēšana, piegāde un montāža, sadzīves tehnika atsevišķi. Materiālu toņi un raksti nav pārvērsti īstu materiālu apgalvojumos.

Atsauksmes tulkotas tieši no src/reviews.json. Trīs pilnie citāti saglabā autora izteiksmi, faktus un teikumu secību (6, 6 un 12), un ir marķēti «Oversatt fra latvisk». Autori, avoti, vērtējumi un oriģinālie dati nav mainīti. Melnrakstos atsauksmes nav SEO pārrakstītas.

## Pārbaudes statuss

Pamattekstus sagatavojis viens AI apakšaģents, valodu neatkarīgi pārbaudījis otrs, faktus, struktūru un Keyword Planner atbilstību trešais. Atsauksmēm izmantots atsevišķs autors un neatkarīga salīdzināšana ar oriģināliem. Iestrādāti precizējumi par darba virsmas vietu, rokturiem/iebūvēto tehniku un vitrīnas stikla durvīm. Pelēkās virtuves īsais nosaukums ir «Mattgrått kjøkken med halvøy». Kopā pārbaudīti 211 teksta, metadatu, attēlu un saskarnes fragmenti. Faktiskā gala versija pēc labojumiem atkārtoti nolasīta; atlikušus obligātus valodas vai satura labojumus pārbaudītāji nekonstatēja. Automātiskajā satura pārklājuma pārbaudē trūkstošu fragmentu nav. Visu sešu virtuves kartīšu apraksti precīzi saliekas pilnajos dialoga tekstos. Pilnās trīs atsauksmes MD un JSON sakrīt.

Pirmajā posmā aktīvajā src/i18n/no.json ievietoti pārbaudītie 211 fragmenti, ieslēgtas /no/ un /no/virtuves/ un astoņi izmantotie projektu ieraksti. Pārējās saites ved uz LV ar norvēģisku norādi «Tilgjengelig på latvisk». Sākumlapas H1 tikai pārvietots rindas pārtraukums, vārdus saglabājot: «Kjøkken og andre» / «møbler på mål».

Pārlūkā pārbaudīti 1440/1400, 1280/1024 un 390/360 px skati. Augšējā Kontakt oss poga ir vienā rindā. Šaurākos datora logos līdz 1399 px NO izmanto esošā veida izvēršamo izvēlni, saglabājot logo un visas saites. Galerijas pogai telefonā pielāgotas atstarpes, lai teksts ietilptu vienā rindā bez fonta samazināšanas. Pārbaudīta mobilā kategoriju izvēlne, NO/EN pārslēgšana tajā pašā virtuves lapā, projekta foto 1 / 3 → 2 / 3, pirms/pēc slīdnis 50 → 51 un foto apzīmējumi Før/Etter 1 / 4 → 2 / 4, kā arī pilnas atsauksmes izvēršana. Horizontālas pārplūdes un konsoles kļūdu nav.

Automātiskās pārbaudes aptver EN/RU katrai 14 + 174 un NO 14 + 174 lapas: struktūra/foto, metadati, saites, lang/hreflang, tulkojumu pārklājums, pilnās atsauksmes un projektu dialogi. Priekšskatījuma noindex saglabāts. Jaunās formas, privātuma, piekrišanas un palaišanas tehniskie darbi paliek PLAN.md.


## Piecu pārējo mēbeļu lapu teksti

Pēc Signes lūguma sagatavoti skapju, priekšnama, vannas istabas, viesistabas un citu mēbeļu Bokmål teksti. Saglabāti attiecīgi 8, 4, 4, 5 un 6 projektu izvietojumi, kopā 25 unikāli projekti, struktūra, galvenās domas un atslēgvārdu fokuss. Vannas mēbeļu pašreizējais izgatavošanas ierobežojums skaidri paliek ievadā un meta aprakstā. Virtuves cenu iekļāvumi nav pārnesti uz citu kategoriju cenu blokiem, un izņemtais virtuves/nolaižamās gultas piemērs nav atjaunots.

Abi autori savstarpēji pārbaudīja otras daļas Bokmål valodu, trešais apakšaģents neatkarīgi pārbaudīja visus faktus, struktūru un saglabātās izpētes pielietojumu. Pēc precizējumiem gala faili atkārtoti nolasīti. Automātiski pārbaudīts visu 205 jauno fragmentu pārklājums, visu piecu lapu metadati un pamatbloki, projektu secība un pilno/sadalīto aprakstu atbilstība, kopīgo projektu vienādība un konfliktu neesamība ar aktīvo vārdnīcu.

Pēc Signes apstiprinājuma visi 205 fragmenti ievietoti src/i18n/no.json un piecas NO adreses ieslēgtas. Neatkarīgais gala integrācijas audits neatbilstības neatrada. Kopā septiņas lapas, 33 unikāli projekti un trīs nemainītas pilnās atsauksmes. Nākamajā posmā pēc Signes apstiprinājuma ieslēgtas arī pārējās septiņas pamatlapas un galerijas apakšlapas. Pilnie teksti un latviskais pārskats: parejo-mebelu-teksti.md.


## Pārējo septiņu lapu sagatave

Sagatavoti visu atlikušo septiņu pamatlapu teksti, metadati un pieejamības/saskarnes fragmenti, galerijas projektu lapu modeļi un deviņi vēl netulkotie pilnie citāti. Pēc neatkarīgas valodas un faktu/izpētes redakcijas precizēti 3D procesa formulējumi, dažu galerijas nosaukumu plūdums un koka toņa atšķirība no materiāla. Gala MD/JSON atkārtoti nolasīti. [Pilnais pārskats un pārbaudes](parejo-lapu-teksti.md).

Pārbaudīta 1588 papildfragmentu sagatave: septiņas pamatlapas, 174 galerijā saistītās projektu lapas, 41 unikāls izmantotais dialoga ieraksts un 12 pilni citāti. Trīs esošie citāti un iepriekšējās apstiprinātās NO vārdnīcas vērtības precīzi saglabātas. Piegādes BUJ ārvalstu auditorijai balstīts apstiprinātajā EN pieredzes formulējumā bez jauniem piegādes vai cenas solījumiem. Pēc Signes apstiprinājuma visas lapas ieslēgtas; pārbaudīti faktiskie virsraksti, pogas, forma un galerija datorā/telefonā. Visi 1588 fragmenti ir aktīvajā vārdnīcā, visas 12 pilnās atsauksmes aktīvajā reviews.no.json. Neatkarīgais ģenerēto lapu gala audits neatbilstības neatrada.


## Pilnā NO priekšskatījuma pārbaude

Visas septiņas jaunās lapas pārlūkā pārbaudītas 1440, 390 un 360 px platumā, cenas arī 1024 px. Horizontālas pārplūdes un apgrieztu virsrakstu/pogu nav. NO Par mums/cenu H1 un cenu piemēra pogai pievienots text-wrap:balance, nemainot tekstus vai fontus. Pārbaudīta cenas piemēra pāreja uz NO formu un konteksta noņemšana, formas izmēģinājuma rezultāts, galerijas 18 → 36 izvēršana un Garderober filtrs, projekta foto 1 / 2 → 2 / 2 un EN/NO maiņa tajā pašā projekta lapā, pilna atsauksme un jaunā zaļās virtuves pirms/pēc slīdnis 50 → 51 ar foto Før 1 / 3 → Etter 2 / 3. Forma joprojām nesūta e-pastus; noindex saglabāts.
