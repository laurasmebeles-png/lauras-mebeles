# Krievu valodas teksti

Sākumlapas un virtuves lapas teksti sagatavoti 22.11.2026. pēc Signes norādes. Signe apstiprinājusi to ievietošanu priekšskatījumā. Ieslēgtas septiņas RU pamatlapas: /ru/, /ru/virtuves/, /ru/skapji/, /ru/koridora-iekartas/, /ru/vannasistabas-mebeles/, /ru/sekcijas/ un /ru/citas-mebeles/; teksti ir src/i18n/ru.json, pilnie atsauksmju tulkojumi src/i18n/reviews.ru.json. Pārējās RU lapas vēl nav ieslēgtas.

| Fails | Saturs | Statuss |
|---|---|---|
| sakumlapa.md | Pašreizējās sākumlapas deviņi satura bloki, metadati, trīs pilnas atsauksmes | Apstiprināts un ievietots priekšskatījumā |
| virtuves.md | Ievads, seši projekti, mazo/stūra virtuvju un praktisko izvēļu bloki, metadati | Apstiprināts un ievietots priekšskatījumā |
| reviews.draft.json | Trīs sākumlapas atsauksmju pilni tulkojumi pēc oriģinālā ID | Apstiprinātā teksta kopija; ģenerators izmanto src/i18n/reviews.ru.json |
| skapji.md | Skapji un garderobes, astoņi projekti, praktiskās izvēles, metadati | Apstiprināts un ievietots priekšskatījumā |
| koridora-iekartas.md | Priekšnama mēbeles, četri projekti, praktiskās izvēles, metadati | Apstiprināts un ievietots priekšskatījumā |
| vannasistabas-mebeles.md | Vannas istabas mēbeles, četri projekti, pasūtīšanas ierobežojums, metadati | Apstiprināts un ievietots priekšskatījumā |
| sekcijas.md | Viesistabas mēbeles, pieci projekti, praktiskās izvēles, metadati | Apstiprināts un ievietots priekšskatījumā |
| citas-mebeles.md | Citas mēbeles, seši projekti, praktiskās izvēles, metadati | Apstiprināts un ievietots priekšskatījumā |

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

Pirmajām divām RU lapām pārtulkota kopīgā navigācija, kājene, dialogi, pieejamības apraksti, attēlu alt un runtime vadības teksti. Valodu pārslēdzējs un hreflang rāda RU septiņās apstiprinātajās pamatlapās. Saites uz vēl netulkotām lapām saglabā LV adresi ar LV norādi un krievu paskaidrojumu. RU projektu dati aptver septiņās lapās izmantotos 33 unikālos ierakstus. Kirilicai pievienoti tā paša EB Garamond fonta faili.

Pēc Signes pēdējās izvēles kontaktblokā saglabāts sākotnējais pārbaudītais teikums: «Для начала достаточно идеи. Расскажите нам о ней, и мы вместе продумаем, как её воплотить.» Variants ar «что вы задумали» netiek izmantots.

Veiksmīgi npm run check un npm run test:i18n: 14 EN pamatlapas, 174 EN projektu lapas un 7 RU lapas, tekstu pārklājums, struktūra, attēli, saites, hreflang, pilnās atsauksmes un projektu kartīšu/dialogu atbilstība. Lokāli pārbaudīts datora un mobilais izkārtojums, atsauksmes izvēršana, pirms/pēc slīdnis, projekta dialoga 1 / 4 uz 2 / 4 pāršķiršana, mobilā izvēlne un EN/RU pārslēgšana virtuvju lapā. Priekšskatījuma noindex saglabāts. Reālā forma, privātums, piekrišana un citi palaišanas darbi paliek PLAN.md kontrolsarakstā. Tālāk gatavojamas pārējo RU lapu sagataves ar tādu pašu neatkarīgu valodas un faktu pārbaudi.

Signes maketa precizējums: tikai sākumlapas faktu joslas ražotnes blokā īsais variants «Собственный цех» / «Детали делаем в Риге», pēc atsevišķas RU valodas pārbaudes. Ražotnes sadaļas mazais virsraksts paliek «Собственное производство в Риге».

Augšējās navigācijas CTA pēc Signes norādes saīsināts uz «Связаться», lai poga paliktu vienā rindā. Sākumlapas galvenās sadaļas «Связаться с нами» un pilnais kontaktu aicinājums saglabāti.

Navigācijā pēc Signes gala izvēles lietots «Вдохновение», saglabājot iedvesmas nozīmi. Piemēri pārbaudīti Дятьково (https://dyatkovo.ru/articles/) un Nolte Küchen (https://nolte-kuechen.ru/) lapās. Sadaļu virsraksti un sākumlapas mazais uzraksts saglabāti. Kartīšu LV marķējums izvietots stūrī ārpus teksta plūsmas, lai tas neveidotu papildu rindu un nepalielinātu cenu kartītes balto joslu.

RU augšējā josla pārbaudīta ar gala nosaukumu «Вдохновение». Līdz 1100 px platumam izmanto esošo izvēršamās izvēlnes principu, lai šaurā skatā saites neaplūztu un nesaspiestu logo. LV/EN izvēlnes robežas nemainītas.


## Piecu pārējo mēbeļu lapu ieviešana

22.11.2026. Signe lūgusi turpināt ar pārējām mēbeļu kategorijām un izmantot neatkarīgus apakšaģentus valodas un izpētes atbilstības pārbaudei. Pilnie teksti ir augstāk norādītajos piecos failos; pārskats Signei latviski ir parejo-mebelu-teksti.md. Pēc pārbaudēm Signe apstiprinājusi visu piecu lapu ievietošanu priekšskatījumā un Vercel atjaunināšanu. Aktīvas septiņas RU pamatlapas.

Visās piecās lapās saglabāti faktiskās LV versijas bloki, projektu secība un pilnie apraksti, galeriju aicinājumi, trīs praktiskie punkti un konkrētās kategorijas cenas faktori. Projektu skaits pa lapām: 8, 4, 4, 5 un 6. Krēmkrāsas skapja un zaļās tumbiņas kopīgie apraksti abās attiecīgajās lapās ir identiski. Vannas istabas pasūtīšanas ierobežojums saglabāts atsevišķi ievadā un meta aprakstā. Izņemtais virtuves/nolaižamās gultas piemērs nav atjaunots; nav pievienoti neesoši projekti izpētes sinonīmu dēļ.

Neatkarīgā satura/Keyword Planner pārbaude pabeigta pirms un pēc valodas redakcijas. Neatkarīgā RU valodas pārbaude aptvēra gramatiku, dabiskumu, profesionālu stilu, mēbeļu terminoloģiju un īsus galeriju pogu tekstus. Precizēts priekšnama projektu H2, lai nesolītu visas telpas iekārtošanu, vannas glabāšanas un santehnikas formulējumi, kā arī kioska/kafejnīcas teikumi. Pēc faktiskās gala versijas atkārtotas nolasīšanas abi pārbaudītāji neatrada atlikušas būtiskas neatbilstības. Atsauksmes un iepriekš apstiprinātie RU publiskie teksti šajā posmā nav mainīti.

Vārdnīcā pārnesti visi apstiprinātie bloki, pilnie projektu dialogi, metadati un alt/aria. Neatkarīgā integrācijas pārbaude salīdzināja visus 52 pamatteksta blokus un 25 jaunos unikālos projektus ar apstiprinātajiem failiem. Visas piecas lapas pārbaudītas 1440 × 900, 390 × 844 un 360 × 800 skatā: nav horizontālas pārplūdes vai apgrieztu virsrakstu/pogu. Galeriju pogām telefonā pielāgotas atstarpes, saglabājot fonta izmēru un tekstu. Jauno H1 nedalāmās atstarpes un līdzsvarota rindu aplaušana tur kopā «на заказ» un «и гардеробные». Pārbaudīta mobilā izvēlne, EN/RU pārslēgšana tajā pašā kategorijā, projekta dialoga 1 / 4 → 2 / 4 pāršķiršana un apraksta izvēršana. Virtuvju plānošanas mazais virsraksts saglabāts ar atsevišķu kontekstu.
