# Pāradresāciju karte, 2026-11-24

Statuss: sagatavots pārejas projekts, **nav aktivizēts**. Avots ir 55 WordPress lapu inventārs. Mašīnlasāmais avots: [redirect-map.json](redirect-map.json). Šo dokumentu ģenerē `node scripts/migration-map.mjs`.

Pašreizējā struktūra ir LV, EN, RU un NO. EN/RU mērķi izmanto faktiskos ceļus, piemēram, `/en/virtuves/` un `/ru/virtuves/`. Saglabājam garo atsauksmju URL. RU atmešanas priekšlikums vairs nav spēkā. NO nav vecu adrešu šajā WordPress inventārā.

Saglabāti visi 55 avota ieraksti: 11 nemainīti URL, 24 pāradresāciju kandidāti un 20 neatrisināti lēmumi. `301 kandidāts` nenozīmē aktivizētu vai klienta apstiprinātu pāradresāciju. Nav pārbaudīti GSC meklējumu/indeksēšanas dati; veikala un publikāciju lapas nedrīkst automātiski apvienot tikai tādēļ, ka ir tehniski iespējams redirect.

## LV

| WordPress ID | Vecais ceļš | Rīcība | Jaunais ceļš vai kandidāts | Piezīme |
|---|---|---|---|---|
| 11 | `/sakums/` | 301 kandidāts | / | Sākumlapas dublikāts. Vēl nav aktivizēta. |
| 111 | `/vannasistabas-mebeles/` | Saglabājam | /vannasistabas-mebeles/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 113 | `/skapji/` | Saglabājam | /skapji/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 115 | `/sekcijas/` | Saglabājam | /sekcijas/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 117 | `/koridora-iekartas/` | Saglabājam | /koridora-iekartas/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 119 | `/citas-mebeles/` | Saglabājam | /citas-mebeles/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 121 | `/pakalpojumi/` | Saglabājam | /pakalpojumi/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 123 | `/partneri/` | 301 kandidāts | /par-mums/ | Partneru sadaļa ir lapā Par mums. Vēl nav aktivizēta. |
| 125 | `/kontakti/` | Saglabājam | /kontakti/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 149 | `/` | Saglabājam | / | Adrese saglabāta pašreizējā lapas struktūrā. |
| 267 | `/veikals/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 719 | `/virtuves-iekarta-stils-un-dizains/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās publikācijas lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 726 | `/virtuves-iekartas-apdare-un-pedejie-pieskarieni/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās publikācijas lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 730 | `/virtuves-iekartas-komplektacijafurnitura-un-tehniskie-risinajumi/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās publikācijas lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 733 | `/virtuves-mebeles/` | 301 kandidāts | /virtuves/ | Virtuvju piedāvājums pašreizējā virtuvju lapā. Vēl nav aktivizēta. |
| 736 | `/virtuves-iekarta-iebuveta-vai-brivi-stavosa/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās publikācijas lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 739 | `/virtuves-mebeles-moderni-risinajumi/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās publikācijas lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 742 | `/publikacijas-virtuves-mebeles/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās publikācijas lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 770 | `/privatuma-politika/` | Saglabājam | /privatuma-politika/ | Esošajā adresē sagatavota aktualizēta privātuma informācija. Pirms palaišanas jāpārbauda atbilstība faktiskajām integrācijām. |
| 1188 | `/virtuves-mebeles-veikals/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1247 | `/virtuves-iekartas-komplekts-mini/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1251 | `/virtuves-iekartas-komplekts-no1/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1254 | `/virtuves-iekartas-komplekts-no2/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1258 | `/virtuves-iekartas-komplekts-no3/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1262 | `/virtuves-iekartas-komplekts-standarts-mini/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1266 | `/virtuves-mebeles-galds-un-kresli/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1271 | `/virtuves-mebeles-iebuvetais-modulis/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1275 | `/virtuves-mebeles-komplekts-premium/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1279 | `/virtuves-mebeles-komplekts-standarts/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1283 | `/virtuves-mebeles-komplekts-standarts-maxi/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1287 | `/virtuves-mebeles-standarta-komplekts/` | Jāizlemj | /virtuves/ (priekšlikums) | Vecās veikala/komplektu lapas saturu un GSC datus izvērtēt pirms apvienošanas vai saglabāšanas. Virtuvju lapa ir tikai kandidāts. |
| 1736 | `/atsauksmes/` | 301 kandidāts | /virtuves-mebeles-atsauksmes-virtuves-iekartas/ | Saglabājam pašreizējo garo atsauksmju adresi; īsā ir vecs dublikāts. Vēl nav aktivizēta. |
| 1740 | `/virtuves-mebeles-atsauksmes-virtuves-iekartas/` | Saglabājam | /virtuves-mebeles-atsauksmes-virtuves-iekartas/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 2641 | `/virtuves/` | Saglabājam | /virtuves/ | Adrese saglabāta pašreizējā lapas struktūrā. |
| 2647 | `/test/` | Jāizlemj | Nav apstiprināts | Tukša testa lapa. Apstiprināt 410 vai citu rīcību; nepāradresēt automātiski uz nesaistītu saturu. |

## EN

| WordPress ID | Vecais ceļš | Rīcība | Jaunais ceļš vai kandidāts | Piezīme |
|---|---|---|---|---|
| 534 | `/en/other-furniture/` | 301 kandidāts | /en/citas-mebeles/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 538 | `/en/contacts/` | 301 kandidāts | /en/kontakti/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 541 | `/en/corridors/` | 301 kandidāts | /en/koridora-iekartas/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 550 | `/en/partners/` | 301 kandidāts | /en/par-mums/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 555 | `/en/home/` | 301 kandidāts | /en/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 560 | `/en/cabinets/` | 301 kandidāts | /en/skapji/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 564 | `/en/tv-cupboards/` | 301 kandidāts | /en/sekcijas/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 568 | `/en/bathroom-furniture/` | 301 kandidāts | /en/vannasistabas-mebeles/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 572 | `/en/kitchens/` | 301 kandidāts | /en/virtuves/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 598 | `/en/furniture/` | 301 kandidāts | /en/pakalpojumi/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |

## RU

| WordPress ID | Vecais ceļš | Rīcība | Jaunais ceļš vai kandidāts | Piezīme |
|---|---|---|---|---|
| 612 | `/ru/hачало/` | 301 kandidāts | /ru/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 616 | `/ru/kухня/` | 301 kandidāts | /ru/virtuves/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 673 | `/ru/ванная-мебель/` | 301 kandidāts | /ru/vannasistabas-mebeles/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 678 | `/ru/шкафы/` | 301 kandidāts | /ru/skapji/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 682 | `/ru/секционный/` | 301 kandidāts | /ru/sekcijas/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 686 | `/ru/коридорное-оборудование/` | 301 kandidāts | /ru/koridora-iekartas/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 690 | `/ru/офисная-и-мебель/` | 301 kandidāts | /ru/citas-mebeles/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 695 | `/ru/партнёры/` | 301 kandidāts | /ru/par-mums/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 698 | `/ru/контакты/` | 301 kandidāts | /ru/kontakti/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |
| 710 | `/ru/услуги/` | 301 kandidāts | /ru/pakalpojumi/ | Tā paša satura attiecīgās valodas pašreizējā adrese. Vēl nav aktivizēta. |

## Pirms aktivizēšanas

- Izvērtēt veikala/komplektu un publikāciju saturu, GSC datus un precizēt galamērķus. Privātuma politiku pirms palaišanas pārbaudīt pret faktiskajām integrācijām. `/test/` rīcību apstiprināt atsevišķi.
- JSON saglabā precīzo vecā URL procentkodējumu un jaukto alfabētu `hачало`/`kухня`; tos nepārrakstīt kā citus URL. Aktivizēšanas posmā pārbaudīt Unicode un procentkodētus pieprasījumus uz hostinga.
- Pārbaudīt variantus ar/bez beigu slīpsvītras un vaicājuma parametriem. Mērķim jāatgriež 200, jābūt pareizajā valodā, bez pašpāradresācijām, cikliem vai liekām ķēdēm.
- Vercel 301 norādīt ar `statusCode: 301`. `permanent: true` noklusēti ir 308, nevis 301. Šajā darbā `vercel.json` migrācijas redirects netiek pievienoti.
- Atsevišķi izvērtēt vecos `/wp-content/uploads/` attēlu URL pēc atbilstības jaunajiem failiem un pieejamā GSC trafika. Neuzskatīt visu veco attēlu pazušanu par automātiski pieņemamu. 55 lapu karte nav 834 pielikumu pilna migrācija.
