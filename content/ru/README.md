# Krievu valodas teksti

Sākumlapas un virtuves lapas teksti sagatavoti 22.11.2026. pēc Signes norādes. Signe apstiprinājusi to ievietošanu priekšskatījumā. Ieslēgtas /ru/ un /ru/virtuves/; teksti ir src/i18n/ru.json, pilnie atsauksmju tulkojumi src/i18n/reviews.ru.json. Pārējās RU lapas vēl nav ieslēgtas.

| Fails | Saturs | Statuss |
|---|---|---|
| sakumlapa.md | Pašreizējās sākumlapas deviņi satura bloki, metadati, trīs pilnas atsauksmes | Apstiprināts un ievietots priekšskatījumā |
| virtuves.md | Ievads, seši projekti, mazo/stūra virtuvju un praktisko izvēļu bloki, metadati | Apstiprināts un ievietots priekšskatījumā |
| reviews.draft.json | Trīs sākumlapas atsauksmju pilni tulkojumi pēc oriģinālā ID | Apstiprinātā teksta kopija; ģenerators izmanto src/i18n/reviews.ru.json |

## Saglabājamais virziens

Struktūras un faktu avots ir pašreizējās LV lapas, scripts/generate-pages.mjs, src/catalog.mjs un src/reviews.json. Vēsturiskās content/lv sagataves neaizstāj aktuālo lapu struktūru. Angļu apstiprinātie teksti palīdz ievērot norunāto stilu, bet RU nav mehānisks tulkojums no EN.

Rakstām dabiski, ar konkrētu nozīmi. Pamatfrāzes ir мебель на заказ sākumlapai un кухни на заказ virtuvēm. Papildu termini lietojami atbilstošajos esošajos blokos, nevis visi vienā rindkopā. Izpētes avoti: docs/research/2026-11-22/ru-LV-ui.json un lapu-formulejumu-karte.md. Dati attiecas uz Latviju; intervāli nav precīzs meklējumu skaits, pilni teikumi un metadati nav atsevišķi mērīti.

Atsauksmes tulko tieši no LV, saglabājot teikumu secību, autora izteiksmi un faktus. Nemaina src/reviews.json datus, autorus vai vērtējumus. Norāde publiskajam tulkojumam: Перевод с латышского. Ja turpmāk tulko pārējās atsauksmes, papildina pēc oriģinālajiem ID, nevis atkārtoti pārtulko šīs trīs no EN.

## Veiktās pārbaudes

Signe norādījusi, ka pati krievu valodu saprot ierobežoti, tāpēc sagatavošanā izmantota atsevišķa atsauksmju tulkošanas apakšaģenta palīdzība un divi neatkarīgi pārbaudes apakšaģenti:

- RU valodas pārbaude: gramatika, stils, dabiskums, terminoloģija, pogas un virsraksti. Pēc labojumiem veikta atkārtota abu lapu un atsauksmju nolasīšana.
- Satura un atslēgvārdu pārbaude: atbilstība faktiskajai LV struktūrai, saglabātajiem Keyword Planner datiem, projektu secībai un faktiem. Pēc valodas redakcijas atkārtoti pārbaudīta faktu nemainība.

Pēc labojumiem nav atrastas atlikušas būtiskas neatbilstības. Precizēti glabāšanas vietu un izmaksu formulējumi, vitrīnu un lameļu apdares nosaukumi, kā arī rievotā stikla projekta nosaukums. Materiālu raksts vai tonis nav pasniegts kā īsts koks, misiņš vai akmens. Daces atsauksmē divas dzīvesvietas nav pārvērstas par ēkas tipu vai pasūtījumu reižu skaitu. Saglabāti 2008. gads, 4 600+, visi 11 valstu nosaukumi, kontakti un projektēšanas/piegādes/montāžas iekļāvums. Atsauksmēs saglabāta attiecīgi 6, 6 un 12 teikumu secība.

Pārbaudes ir AI apakšaģentu redakcija. Tās nav cilvēka dzimtās valodas redaktora apstiprinājums vai klienta piekrišana faktu izmaiņām.

## Ieviešanas turpinājums

Pirmajām divām RU lapām pārtulkota kopīgā navigācija, kājene, dialogi, pieejamības apraksti, attēlu alt un runtime vadības teksti. Valodu pārslēdzējs un hreflang rāda RU tikai šajās divās lapās. Saites uz vēl netulkotām lapām saglabā LV adresi ar LV norādi un krievu paskaidrojumu. RU projekti ir tikai abās lapās izmantotie astoņi ieraksti. Kirilicai pievienoti tā paša EB Garamond fonta faili.

Pēc Signes pēdējās izvēles kontaktblokā saglabāts sākotnējais pārbaudītais teikums: «Для начала достаточно идеи. Расскажите нам о ней, и мы вместе продумаем, как её воплотить.» Variants ar «что вы задумали» netiek izmantots.

Veiksmīgi npm run check un npm run test:i18n: 14 EN pamatlapas, 174 EN projektu lapas un 2 RU lapas, tekstu pārklājums, struktūra, attēli, saites, hreflang, pilnās atsauksmes un projektu kartīšu/dialogu atbilstība. Lokāli pārbaudīts datora un mobilais izkārtojums, atsauksmes izvēršana, pirms/pēc slīdnis, projekta dialoga 1 / 4 uz 2 / 4 pāršķiršana, mobilā izvēlne un EN/RU pārslēgšana virtuvju lapā. Priekšskatījuma noindex saglabāts. Reālā forma, privātums, piekrišana un citi palaišanas darbi paliek PLAN.md kontrolsarakstā. Tālāk gatavojamas pārējo RU lapu sagataves ar tādu pašu neatkarīgu valodas un faktu pārbaudi.

Signes maketa precizējums: tikai sākumlapas faktu joslas ražotnes blokā īsais variants «Собственный цех» / «Детали делаем в Риге», pēc atsevišķas RU valodas pārbaudes. Ražotnes sadaļas mazais virsraksts paliek «Собственное производство в Риге».

Augšējās navigācijas CTA pēc Signes norādes saīsināts uz «Связаться», lai poga paliktu vienā rindā. Sākumlapas galvenās sadaļas «Связаться с нами» un pilnais kontaktu aicinājums saglabāti.

Navigācijā «Для вдохновения» saīsināts uz «Идеи» pēc RU valodas pārbaudes. Sadaļu virsraksti un sākumlapas mazais uzraksts saglabāti. Kartīšu LV marķējums izvietots stūrī ārpus teksta plūsmas, lai tas neveidotu papildu rindu un nepalielinātu cenu kartītes balto joslu.
