# Valodu plāns un pirmā EN atslēgvārdu pārbaude

Datums: 22.11.2026. Statuss: saskaņotie lokalizācijas principi, pirmais Latvijas EN datu nolasījums un turpmākās izpētes priekšlikums. Šis nav pabeigts visu valodu vai eksporta tirgu pētījums.

Turpinājumā pabeigta EN/RU/NO izpēte pašreizējās struktūras formulējumu izvēlei: [secinājumi un lietošana](2026-11-22/secinajumi-un-lietosana.md), [visu lapu formulējumu karte](2026-11-22/lapu-formulejumu-karte.md). Tur ir 555 frāžu un valstu novērojumi un jaunākais gatavības statuss. Šis fails saglabā pirmā izpētes posma saturu un sākotnējās 62 frāzes.

## Signes norādītais virziens

- Papildus LV plānotas EN, RU un NO versijas. Iepriekšējais jautājums par RU izslēgšanu vairs nav aktuālais darba virziens.
- Sākam ar EN atslēgvārdu izpēti klientiem Latvijā. Eksporta tirgus pētām atsevišķi.
- Visās valodās saglabājam lapu struktūru, sadaļu galvenās domas, tēzes un apstiprinātos uzņēmuma faktus.
- Tulkojums var atkāpties no 1:1: drīkst pārfrāzēt, izvēlēties citus atbilstošus vārdus un atsevišķos gadījumos mainīt teikumu secību. Iemesls var būt dabiska valoda, gramatika, stils vai izpētē pamatota Google un AI atrodamība.
- Šī brīvība neatļauj pievienot jaunus pakalpojumus, solījumus vai nepārbaudītus faktus. Ja vajadzīga jauna sadaļa vai cita lapu struktūra, to izvirza atsevišķam lēmumam.
- Eksporta izpētes virziens ir Eiropa, īpaši Ziemeļvalstis. Precīza valstu prioritāšu secība vēl nav apstiprināta.

## Eksporta valstis lapas pašreizējā avotā

Jaunās sākumlapas un “Par mums” bloks izmanto vienoto `exportCountries` sarakstu failā `scripts/generate-pages.mjs`: Vācija, Austrija, Nīderlande, Lielbritānija, Norvēģija, Somija, Beļģija, Zviedrija, Igaunija, Luksemburga un Ungārija.

Šis ir vietnes pašreizējais eksporta pieredzes saraksts. Tas pats par sevi nenosaka katras valsts pārdošanas prioritāti vai visus pašreizējos piegādes nosacījumus. Saraksts pārbaudīts projekta avotā. Publiskās WordPress vietnes nolasījums šajā sesijā neizdevās, tāpēc tas nav apgalvojums par pašlaik publiskotās vecās vietnes saturu.

Darba priekšlikums nākamajai izpētei:

1. Norvēģija, jo plānota atsevišķa norvēģu versija.
2. Zviedrija un Somija kā pārējās lapā nosauktās Ziemeļvalstis. Katrai atsevišķi nošķirt EN frāzes un vietējās valodas frāzes.
3. Pārējās saraksta valstis pēc biznesa prioritātes precizēšanas. Lielbritānijas datiem jābūt atsevišķiem no Latvijas datiem.

Dānija nav pašreizējā sarakstā. To var vēlāk pētīt kā tirgus iespēju, taču nepievieno uzņēmuma eksporta pieredzes faktu sarakstam.

## Pārbaudītā piekļuve un metode

22.11.2026. pārlūkā atvērts Kristapa Google Ads konts un Keyword Planner. Piekļuve pārbaudīta līdz atslēgvārdu rezultātiem. Pastāvīga API piekļuve nav izveidota.

Veikti divi atšķirīgi soļi:

1. **Discover new keywords:** Latvija, English, Google, Last 12 months, Exclude adult ideas, bez domēna filtra. Ievadītas 10 virtuves frāzes: `custom kitchens`, `bespoke kitchens`, `fitted kitchens`, `made to measure kitchens`, `kitchen furniture`, `kitchen cabinets`, `custom kitchen cabinets`, `kitchens Riga`, `kitchens Latvia`, `kitchen cost`. Rīks piedāvāja 4824 idejas, tostarp arī piedāvājumam neatbilstošas ēdamgaldu un krēslu tēmas. Visu šo ideju atlase nav pabeigta.
2. **Get search volume and forecasts / Saved keywords / historical metrics:** ievadītas 62 iepriekš sagatavotas frāzes visām sešām mēbeļu kategorijām, cenām un zīmolam. Teritorija Latvija, tīkls Google, periods **01.11.2025.–31.10.2026.** Vēsturisko datu skatā valodas kontrole rāda **All languages** un nav maināma. Tālākā tabula ir šī skata nolasījums, nevis English valodas filtra eksports.

62 angliski formulētas frāzes nav 62 atsevišķas auditorijas. Vēsturiskajos datos ietilpst arī tuvie varianti. Zīmola frāze `lauras mebeles` pati par sevi nav angļu valodas pieprasījuma pierādījums. Dati neizolē cilvēkus pēc viņu dzimtās valodas.

Pārlūkā saglabājās plāns ar rīka sākotnējo nosaukumu “Plan from Nov 22, 2026, 8 AM, GMT+02:00”. Reklāmas kampaņa netika izveidota.

**Avotu ierobežojums:** virtuves ideju CSV lejupielādes mēģinājums nonāca Chrome bloķētā lejupielādes lapā. CSV fails netika iegūts. Tādēļ šeit saglabāts tieši tabulas UI nolasījums, nevis oriģināls CSV eksports. Nolasītas un saskaitītas visas 62 vēsturiskās tabulas rindas abās lapās.

## Kā interpretējam datus

- Skaitļi ir vidējo mēneša meklējumu **intervāli**, nevis precīzi apjomi. `100–1K` tabulā izrakstīts kā `100–1000`.
- `0–10` nav pierādījums pilnīgai intereses neesamībai.
- `Nav datu` nozīmē, ka UI apjoma vietā bija domuzīme. To nepārveidojam par nulli.
- Līdzīgu frāžu intervālus nesummējam. Vienāds intervāls nedod pamatu vienu frāzi pasludināt par populārāku.
- Keyword Planner reklāmdevēju konkurence nav SEO grūtības rādītājs. Tā šeit netiek izmantota satura prioritāšu noteikšanai.
- Netiek mērīts ChatGPT, Claude vai citu AI sistēmu jautājumu apjoms.
- Šis ir sākotnējās frāžu izlases pārbaudes posms. Pilnai izpētei vēl jāpaplašina idejas pārējām kategorijām un jāpārbauda meklējumu nolūki pa frāžu grupām.

## Pirmais frāžu nolasījums

Avots visām rindām: Google Ads Keyword Planner vēsturisko datu UI, Latvija, Google, All languages, 01.11.2025.–31.10.2026., nolasīts 22.11.2026. Burtu reģistrs normalizēts tā, kā rīks rāda rezultātus.

| Frāze | Vidējie meklējumi mēnesī, intervāls |
|---|---|
| bathroom cabinets | 10–100 |
| bathroom furniture | 10–100 |
| bathroom vanity | 10–100 |
| bespoke bathroom vanity | 0–10 |
| bespoke furniture | 10–100 |
| bespoke home office furniture | 0–10 |
| bespoke kitchens | 10–100 |
| bespoke living room furniture | 0–10 |
| bespoke wardrobes | 10–100 |
| built in closets | 10–100 |
| built in hallway storage | 10–100 |
| built in storage | 10–100 |
| built in tv units | 10–100 |
| built in wardrobes | 10–100 |
| custom bathroom cabinets | 10–100 |
| custom closets | 10–100 |
| custom furniture | 10–100 |
| custom furniture cost | 10–100 |
| custom furniture latvia | Nav datu |
| custom furniture prices | 10–100 |
| custom furniture riga | Nav datu |
| custom hallway furniture | Nav datu |
| custom kitchen cabinets | 10–100 |
| custom kitchen cost | 10–100 |
| custom kitchen price | 10–100 |
| custom kitchens | 10–100 |
| custom shelving | 10–100 |
| custom tv units | 0–10 |
| custom wardrobes | 10–100 |
| fitted furniture | 0–10 |
| fitted kitchens | 10–100 |
| fitted wardrobes | 10–100 |
| fitted wardrobes cost | 10–100 |
| furniture makers riga | Nav datu |
| furniture manufacturers latvia | Nav datu |
| hallway furniture | 10–100 |
| hallway storage | 10–100 |
| kitchen cabinets | 10–100 |
| kitchen cost | 10–100 |
| kitchen design | 100–1000 |
| kitchen furniture | 10–100 |
| kitchen island | 10–100 |
| kitchen price calculator | 0–10 |
| kitchen prices | 10–100 |
| kitchens latvia | Nav datu |
| kitchens riga | Nav datu |
| l shaped kitchen | 10–100 |
| lauras furniture | 10–100 |
| lauras mebeles | 100–1000 |
| lauras mebeles reviews | Nav datu |
| living room furniture | 10–100 |
| made to measure bathroom furniture | Nav datu |
| made to measure furniture | 0–10 |
| made to measure kitchens | 0–10 |
| made to measure wardrobes | 0–10 |
| media wall | 10–100 |
| sliding door wardrobes | 10–100 |
| small kitchen design | 10–100 |
| tv units | 10–100 |
| walk in wardrobe | 10–100 |
| wardrobes latvia | Nav datu |
| wardrobes riga | Nav datu |

## Terminoloģijas un satura darba karte

Šī ir redakcionāla darba atlase, nevis galīgie virsraksti. Pašreizējās adreses tabulā norāda uz LV satura avotiem, nevis apstiprina jaunos EN URL.

| Pašreizējā lapa | EN terminoloģijas virziens | Kā saglabājam galveno domu |
|---|---|---|
| `/` | custom furniture; custom kitchens | Individuāli izgatavotas mēbeles, virtuves kā galvenā specializācija, pārējās kategorijas saglabātas. |
| `/pakalpojumi/` | custom furniture; kitchens; wardrobes | Tas pats kategoriju pārskats un saites. |
| `/virtuves/` | custom kitchens; kitchen cabinets; bespoke kitchens | Galvenā tēma ir pasūtījuma virtuve. Plašo `kitchen design` lieto projektēšanas kontekstā, nepārvēršot lapu par atsevišķu dizaina pakalpojumu. |
| `/skapji/` | built-in wardrobes; fitted wardrobes; custom wardrobes | Saglabā skapjus un garderobes vienā esošajā lapā; walk-in wardrobes un sliding doors atbilstošajās sadaļās. |
| `/koridora-iekartas/` | hallway furniture; hallway storage; built-in storage | Uzsver pielāgošanu priekšnamam. Burtisks `corridor equipment` neder. |
| `/vannasistabas-mebeles/` | bathroom furniture; custom bathroom cabinets; bathroom vanity | Saglabā mēbeles pēc izmēra un reālos projektus. Plašā frāze nedrīkst radīt gatavu preču veikala iespaidu. |
| `/sekcijas/` | living room furniture; built-in TV units; custom shelving | Konkrēti TV un glabāšanas risinājumi. `Media wall` lieto tikai tad, ja attiecīgie projekti atbilst šīs frāzes nozīmei. |
| `/citas-mebeles/` | custom furniture; built-in storage | Konkrētos risinājumus nosauc pēc reālajiem darbiem. Izpētē ievadīta biroja frāze vēl neapstiprina atsevišķu piedāvājumu. |
| `/cenas/` | custom kitchen cost; kitchen prices; custom furniture prices | Saglabā aktuālo LV cenas skaidrojumu, piemērus un to nosacījumus. `Price calculator` lieto tikai tad, ja attiecīgā funkcija tiešām aprēķina cenu. |
| `/musu-darbi/` | our work; furniture projects | Tā pati darbu galerija, kategorijas un projektu fakti. |
| `/iedvesmai/` | kitchen before and after; kitchen inspiration | Saglabā pirms un pēc salīdzinājumus. Šo divu frāžu apjomi šajā izlasē nav pārbaudīti. |
| `/par-mums/` | about Lauras mēbeles; furniture made in Riga | Tie paši uzņēmuma fakti, ražotne, partneri un eksporta pieredze. |
| Atsauksmju lapa | Lauras mēbeles reviews | Saglabā zīmolu un atsauksmju avotus. Tulkojumu marķē; atsauksmju oriģinālu nepārraksta. |
| `/kontakti/` | contact; request a quote | Saglabā to pašu saziņas mērķi un nosacījumus. |

EN tekstā lietotu saprotamu Eiropas auditorijai piemērotu britu angļu valodu. `Custom` un `bespoke` nedrīkst vienkārši sakraut vienā virsrakstā. `Made-to-measure` paliek dabisks skaidrojošs formulējums arī ar mazāku izmērīto intervālu. Mērķis ir skaidri izteikt piedāvājumu, izmantojot vairākus atbilstošus sinonīmus vajadzīgajās vietās.

`Lauras furniture` intervāls nav pamats zīmola pārdēvēšanai vai pieņēmumam, ka visi šie meklējumi attiecas uz šo uzņēmumu.

## Meklēšanas rezultātu sākotnējā pārbaude

22.11.2026. veikti divi ārējās tīmekļa meklēšanas pieprasījumi: `custom kitchens Riga Latvia fitted wardrobes bespoke furniture` un `"custom bathroom cabinets" Latvia "hallway"`. Šī nav kontrolēta Google Latvija pozīciju pārbaude.

Ražotāju EN lapās redzama terminoloģija, kas atbalsta darba karti:

- [Mmanufactory](https://www.mmanufactory.eu/en/) lieto custom furniture, custom kitchens un fitted wardrobes.
- [Rifo](https://rifo.lv/en/) lieto custom furniture un atsevišķi nosauc kitchens un wardrobes. Tas ir terminoloģijas piemērs, nevis pierādījums par frāzes apjomu vai mūsu vietnes nākotnes pozīcijām.
- [Veikals Lux](https://www.veikalslux.lv/en/kitchen-furniture) EN lapā lieto custom kitchen furniture un built-in wardrobes.

Konkurentu cenas, termiņi, garantijas un pakalpojumu nosacījumi netiek pārņemti. Šis nelielais rezultātu paraugs vēl nenoslēdz katras frāžu grupas nolūka pārbaudi.

## Izpētes un lokalizācijas secība

1. **EN / Latvija:** paplašināt idejas skapjiem un pārējām kategorijām; pārbaudīt lokālo vārdu secības variantus, piemēram, furniture Riga un kitchen furniture Riga; nodalīt ražotāju, gatavo preču un iedvesmas nolūku. Iegūt oriģinālos eksportus, kad pieejama lejupielāde. Pēc tam pabeigt frāžu piesaisti esošajiem satura blokiem.
2. **EN / eksports:** katru izvēlēto valsti mērīt atsevišķi ar tiem pašiem pamatprincipiem un salīdzināmu datu periodu. EN pieprasījums Norvēģijā nav norvēģu valodas pieprasījuma aizvietotājs. Nepieņemt visa pasaules vai Eiropas apjomu par uzņēmumam pieejamu tirgu.
3. **RU:** sākumā Latvija, ja netiek noteikta cita auditorija. Jauna krievu frāžu atlase; nepārtulkot EN frāžu sarakstu un nepārnest tā apjomus. RU valoda pati par sevi nenozīmē Krievijas tirgu.
4. **NO:** Norvēģija, atsevišķa norvēģu terminoloģijas un nolūku izpēte. Sākotnējais valodas variants: Bokmål, kas atbilst pašreizējam `nb_NO` konfigurācijas ierakstam. Tekstu pirms publicēšanas pārskata valodas pratējs.
5. Katrai lapai izveidot karti: saglabājamā LV doma, galvenā frāze, papildfrāzes, vieta esošajā sadaļā, lokalizētais virsraksts un teksts, title/description, attēlu alt un terminoloģijas pamatojums. Funkcionālajām lapām nav mākslīgi jāizgudro lieli atslēgvārdu apjomi.
6. Pārtulkot pilnas saturiskas vienības. Esošais `src/i18n` risinājums dalās LV teksta fragmentos, tostarp pie formatējuma. Pirms ievades pārbaudīt, vai tas ļauj vajadzīgo dabisko frāzējumu un teikumu secību. Vajadzīgo atbalstu plānot atsevišķi; mehāniska fragmentu aizpildīšana nav lokalizācijas kvalitātes pārbaude.
7. Pirms valodas ieslēgšanas pārbaudīt arī izvēlnes, formas, kļūdas, kalkulatoru, projektu datus, pieejamības tekstus un metadatus. Tukšās vārdnīcas šobrīd pieļauj LV teksta palikšanu, tāpēc nepilnu valodu nepublicē.
8. URL nosaukumi, canonical, savstarpēji hreflang, sitemap un veco EN/RU adrešu pāradresācijas ir atsevišķa ieviešanas pārbaude. Pašreizējais risinājums lieto valodas prefiksu un LV slugu. Ja vēlamies lokalizēt slugus, vispirms sagatavojam URL karti; adreses šajā izpētē nav mainītas.

## Google un AI atrodamība

Lokalizācijā prioritāte ir precīzs un dabisks teksts, saprotami virsraksti, konkrēti projektu piemēri un pircēja jautājumu atbildes esošajās sadaļās. Google norāda, ka SEO pamati turpina attiekties arī uz tā ģeneratīvās meklēšanas funkcijām. Šī vadlīnija nesniedz garantiju redzamībai citās AI sistēmās. Atsevišķa “AI atslēgvārdu apjomu” tabula no Keyword Planner datiem netiek veidota.

Metodes avoti:

- [Google: Use Keyword Planner](https://support.google.com/google-ads/answer/7337243?hl=en).
- [Google: atslēgvārdu apjomi un rādītāji](https://support.google.com/google-ads/answer/3022575?hl=en).
- [Google: ģeneratīvās meklēšanas optimizācijas vadlīnijas](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Pabeigts šajā sesijā un atlikušais

Pabeigts: piekļuves pārbaude, virtuves ideju pirmais pieprasījums, 62 frāžu vēsturisko intervālu nolasījums Latvijai, sākotnējā terminoloģijas karte un kopīgais valodu darba plāns.

Atlikušais: pilna ideju atlase un oriģinālie eksporti, papildu lokālie un kategoriju varianti, nolūku pārbaude pa grupām, eksporta valstu atsevišķi dati, RU/NO izpēte un paši lokalizētie teksti. Valodu kods, dizains un publiskā vietne šajā sesijā nav mainīti.
