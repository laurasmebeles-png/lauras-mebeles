# Pāradresāciju karte (projekts, 02.11.2026)

Statuss: PRIEKŠLIKUMS. Pirms ieviešanas vercel.json jāapstiprina Signei un klientam, īpaši sadaļas "Vecās virtuves publikācijas" un "Veikals un komplekti".

Avots: WordPress eksports 30.10.2026 (55 publicētas lapas) un dzīvā Yoast vietnes karte https://laurasmebeles.lv/page-sitemap.xml (54 URL, pārbaudīts 02.11.2026). Abi saraksti sakrīt; vietnes kartē nav tikai /sakums/. Eksportā nav rakstu (post) vai WooCommerce produktu, tikai lapas. Yoast meta ir tikai sākumlapai.

Nav pārbaudīts: kuri URL saņem trafiku vai ir Google indeksā. Ja ir GSC piekļuve, pirms apstiprināšanas paskatīties Performance pa lapām par pēdējiem 12 mēnešiem.

## A. Paliek tajā pašā adresē (nav jāpāradresē)

| Esošais URL | Jaunajā vietnē |
|---|---|
| / | / |
| /virtuves/ | /virtuves/ |
| /skapji/ | /skapji/ |
| /koridora-iekartas/ | /koridora-iekartas/ |
| /vannasistabas-mebeles/ | /vannasistabas-mebeles/ |
| /sekcijas/ | /sekcijas/ |
| /citas-mebeles/ | /citas-mebeles/ |
| /pakalpojumi/ | /pakalpojumi/ |
| /kontakti/ | /kontakti/ |
| /virtuves-mebeles-atsauksmes-virtuves-iekartas/ | skat. B, jautājums par /atsauksmes/ |
| /privatuma-politika/ | /privatuma-politika/ (lapa uzmetumā vēl jāizveido) |

## B. Pāradresācijas 301 (LV)

| Esošais URL | Uz | Piezīme |
|---|---|---|
| /sakums/ | / | Dublikāts, nav vietnes kartē |
| /atsauksmes/ | atsauksmju lapa | Ir divas atsauksmju lapas. Ieteikums: par galveno padarīt īso /atsauksmes/ un garo URL 301 uz to. Uzmetumā pašlaik ir garais URL; ja paliek garais, tad otrādi. Jāizlemj. |
| /partneri/ | /par-mums/ | Partneru saraksts netiek pārņemts bez klienta apstiprinājuma |
| /virtuves-mebeles/ | /virtuves/ | 2020. g. lapa |
| /test/ | / | Tukša testa lapa; var arī 410 |

## C. Veikals un komplekti (2020. g.), ieteikums 301 uz /virtuves/

Ja klients saka, ka komplektiem ir sava nozīme vai cenas, alternatīva ir /cenas/.

| Esošais URL | Uz |
|---|---|
| /veikals/ | /virtuves/ |
| /virtuves-mebeles-veikals/ | /virtuves/ |
| /virtuves-iekartas-komplekts-mini/ | /virtuves/ |
| /virtuves-iekartas-komplekts-no1/ | /virtuves/ |
| /virtuves-iekartas-komplekts-no2/ | /virtuves/ |
| /virtuves-iekartas-komplekts-no3/ | /virtuves/ |
| /virtuves-iekartas-komplekts-standarts-mini/ | /virtuves/ |
| /virtuves-mebeles-galds-un-kresli/ | /virtuves/ |
| /virtuves-mebeles-iebuvetais-modulis/ | /virtuves/ |
| /virtuves-mebeles-komplekts-premium/ | /virtuves/ |
| /virtuves-mebeles-komplekts-standarts/ | /virtuves/ |
| /virtuves-mebeles-komplekts-standarts-maxi/ | /virtuves/ |
| /virtuves-mebeles-standarta-komplekts/ | /virtuves/ |

## D. Vecās virtuves publikācijas (2020. g.)

Sešas teksta lapas par virtuvēm (stils un dizains, apdare, komplektācija un furnitūra, iebūvēta vai brīvi stāvoša, moderni risinājumi, publikāciju saraksts). Tās var dot SEO vērtību frāzēm "virtuves iekārtas" un "virtuves mēbeles".

Ieteikums divos soļos: palaišanā 301 uz /virtuves/; pēc palaišanas, ja GSC rāda, ka tās saņēma trafiku, pārrakstīt kā "Padomi" sadaļu ar tiem pašiem URL vai jauniem URL un 301 uz tiem.

| Esošais URL | Uz (1. solis) |
|---|---|
| /virtuves-iekarta-stils-un-dizains/ | /virtuves/ |
| /virtuves-iekartas-apdare-un-pedejie-pieskarieni/ | /virtuves/ |
| /virtuves-iekartas-komplektacijafurnitura-un-tehniskie-risinajumi/ | /virtuves/ |
| /virtuves-iekarta-iebuveta-vai-brivi-stavosa/ | /virtuves/ |
| /virtuves-mebeles-moderni-risinajumi/ | /virtuves/ |
| /publikacijas-virtuves-mebeles/ | /virtuves/ |

## E. Angļu valodas lapas

Ja EN versija tiek palaista, kreisā kolonna 301 uz jauno EN adresi (vidējā kolonna, priekšlikums). Ja EN netiek palaista, 301 uz LV lapu (labā kolonna).

| Esošais URL | Jaunais EN URL | Bez EN: uz LV |
|---|---|---|
| /en/home/ | /en/ | / |
| /en/kitchens/ | /en/kitchens/ | /virtuves/ |
| /en/cabinets/ | /en/wardrobes/ | /skapji/ |
| /en/corridors/ | /en/hallway-furniture/ | /koridora-iekartas/ |
| /en/bathroom-furniture/ | /en/bathroom-furniture/ | /vannasistabas-mebeles/ |
| /en/tv-cupboards/ | /en/living-room-furniture/ | /sekcijas/ |
| /en/other-furniture/ | /en/other-furniture/ | /citas-mebeles/ |
| /en/furniture/ | /en/services/ | /pakalpojumi/ |
| /en/partners/ | /en/about/ | /par-mums/ |
| /en/contacts/ | /en/contact/ | /kontakti/ |

## F. Krievu valodas lapas

Ieteikums: RU nesaglabāt, 301 uz LV lapu. Ja klients uzstāj uz RU, tad tāda pati shēma kā EN.

| Esošais URL (dekodēts) | Uz LV |
|---|---|
| /ru/hачало/ | / |
| /ru/kухня/ | /virtuves/ |
| /ru/шкафы/ | /skapji/ |
| /ru/коридорное-оборудование/ | /koridora-iekartas/ |
| /ru/ванная-мебель/ | /vannasistabas-mebeles/ |
| /ru/секционный/ | /sekcijas/ |
| /ru/офисная-и-мебель/ | /citas-mebeles/ |
| /ru/услуги/ | /pakalpojumi/ |
| /ru/партнёры/ | /par-mums/ |
| /ru/контакты/ | /kontakti/ |

vercel.json ierakstos RU ceļi jāraksta procentkodētā formā tieši tā, kā tie ir docs/migration/wordpress-pages.json.

## G. Attēli

834 pielikumu ieraksti (wp-content/uploads/...). Attēlu URL netiek pāradresēti; pēc palaišanas tie atgriezīs 404, kas attēliem ir pieņemami. Ja GSC rāda attēlu trafiku konkrētiem failiem, var apsvērt atsevišķas pāradresācijas.

## Ieviešana

vercel.json formāts:

```json
{
  "redirects": [
    { "source": "/sakums", "destination": "/", "permanent": true },
    { "source": "/sakums/", "destination": "/", "permanent": true }
  ]
}
```

Vercel `source` ir bez slīpsvītras beigās; ierakstīt abus variantus vai izmantot `trailingSlash` iestatījumu projektā un vienu formu. Pēc palaišanas pārbaudīt visus 55 URL ar curl (statuss 301 un pareizs Location).
