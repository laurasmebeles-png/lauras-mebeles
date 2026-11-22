# Norvēģu Bokmål teksti

22.11.2026. Pirmais ieviešanas posms: sākumlapa un virtuvju lapa pēc pašreizējās LV struktūras. Formulējumi sagatavoti dabiskā Bokmål, izmantojot saglabāto atslēgvārdu izpēti. Pēc Signes apstiprinājuma ieslēgtas /no/ un /no/virtuves/.

| Fails | Saturs |
|---|---|
| [Sākumlapa](sakumlapa.md) | Deviņas pašreizējās sadaļas, metadati un trīs pilnas atsauksmes |
| [Virtuves](virtuves.md) | Ievads, seši projekti, mazas un stūra virtuves, praktiskās izvēles un cenas faktori |
| reviews.draft.json | Trīs apstiprināto pilno tulkojumu kopija pēc ID; ģenerators izmanto src/i18n/reviews.no.json |
| pending-translations.json | Tukša sagatave nākamajiem tekstiem. Apstiprinātie 211 fragmenti pārnesti uz src/i18n/no.json. |

## Valoda un meklējumu nolūks

Lietojam Bokmål. Pamatfrāzes ir «møbler på mål» jeb mēbeles pēc izmēra un «skreddersydde kjøkken» jeb individuāli pielāgotas virtuves. Vārdus loka atbilstoši teikumam, nevis mehāniski atkārto ievadītā meklējuma formā. «Små kjøkken», «hjørnekjøkken», «kjøkkenfronter», «benkeplate» un «halvøy» lieto tajās pašās esošajās sadaļās un īstajos projektos. Pussala nekļūst par salu.

Ražotne paliek Rīgā. Īsā sākumlapas faktu josla ir «Eget verksted» / «Laget i Riga». Tas nozīmē pašu darbnīcu un izgatavošanu Rīgā. Pilnajā ražotnes sadaļā saglabāts paskaidrojums par mēbeļu detaļām, biroju, ekspozīciju un noliktavām vienuviet. Nav pievienota Norvēģijas adrese, fiksētas eksporta piegādes izmaksas vai vietēja norvēģu ražošana.

Izpētes avoti: [lapu formulējumu karte](../../docs/research/2026-11-22/lapu-formulejumu-karte.md), [strukturētā karte](../../docs/research/2026-11-22/page-keyword-map.json) ar nb un [Norvēģijas dati](../../docs/research/2026-11-22/nb-NO-ui.json). «Møbler på mål», «skreddersydde møbler», «skreddersydd kjøkken» un «måltilpasset kjøkken» katrai nolasīts 10–100 intervāls. Intervāli nav precīzi apjomi un nav summējami. Atsevišķu garo frāžu datu neesamība nav nulle. Nav izmērīti pilnu virsrakstu vai AI vaicājumu apjomi.

## Saglabātie fakti un atsauksmes

Saglabāti 2008. gads, 4 600+ virtuves, visi 11 eksporta valstu nosaukumi, pašreizējie foto, seši virtuves un trīs sākumlapas pirms/pēc projekti ar astoņiem unikāliem ID. Vienam projektam avotā nav pilna apraksta, tāds netiek izdomāts. Virtuves piedāvājumā paliek projektēšana, piegāde un montāža, sadzīves tehnika atsevišķi. Materiālu toņi un raksti nav pārvērsti īstu materiālu apgalvojumos.

Atsauksmes tulkotas tieši no src/reviews.json. Trīs pilnie citāti saglabā autora izteiksmi, faktus un teikumu secību (6, 6 un 12), un ir marķēti «Oversatt fra latvisk». Autori, avoti, vērtējumi un oriģinālie dati nav mainīti. Melnrakstos atsauksmes nav SEO pārrakstītas.

## Pārbaudes statuss

Pamattekstus sagatavojis viens AI apakšaģents, valodu neatkarīgi pārbaudījis otrs, faktus, struktūru un Keyword Planner atbilstību trešais. Atsauksmēm izmantots atsevišķs autors un neatkarīga salīdzināšana ar oriģināliem. Iestrādāti precizējumi par darba virsmas vietu, rokturiem/iebūvēto tehniku un vitrīnas stikla durvīm. Pelēkās virtuves īsais nosaukums ir «Mattgrått kjøkken med halvøy». Kopā pārbaudīti 211 teksta, metadatu, attēlu un saskarnes fragmenti. Faktiskā gala versija pēc labojumiem atkārtoti nolasīta; atlikušus obligātus valodas vai satura labojumus pārbaudītāji nekonstatēja. Automātiskajā satura pārklājuma pārbaudē trūkstošu fragmentu nav. Visu sešu virtuves kartīšu apraksti precīzi saliekas pilnajos dialoga tekstos. Pilnās trīs atsauksmes MD un JSON sakrīt.

Aktīvajā src/i18n/no.json ievietoti pārbaudītie 211 fragmenti. Valodu konfigurācijā ieslēgtas tikai /no/ un /no/virtuves/; projektu dati aptver astoņus izmantotos ierakstus. Pārējās saites ved uz LV ar norvēģisku norādi «Tilgjengelig på latvisk». Sākumlapas H1 tikai pārvietots rindas pārtraukums, vārdus saglabājot: «Kjøkken og andre» / «møbler på mål».

Pārlūkā pārbaudīti 1440/1400, 1280/1024 un 390/360 px skati. Augšējā Kontakt oss poga ir vienā rindā. Šaurākos datora logos līdz 1399 px NO izmanto esošā veida izvēršamo izvēlni, saglabājot logo un visas saites. Galerijas pogai telefonā pielāgotas atstarpes, lai teksts ietilptu vienā rindā bez fonta samazināšanas. Pārbaudīta mobilā kategoriju izvēlne, NO/EN pārslēgšana tajā pašā virtuves lapā, projekta foto 1 / 3 → 2 / 3, pirms/pēc slīdnis 50 → 51 un foto apzīmējumi Før/Etter 1 / 4 → 2 / 4, kā arī pilnas atsauksmes izvēršana. Horizontālas pārplūdes un konsoles kļūdu nav.

Automātiskās pārbaudes aptver EN/RU katrai 14 + 174 un NO abas lapas: struktūra/foto, metadati, saites, lang/hreflang, tulkojumu pārklājums, pilnās atsauksmes un projektu dialogi. Priekšskatījuma noindex saglabāts. Jaunās formas, privātuma, piekrišanas un palaišanas tehniskie darbi paliek PLAN.md.
