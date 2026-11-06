# Sākotnējā lapu struktūra

Lietotāja kopumā piekritusi šim virzienam. Saglabājam pašreizējās pakalpojumu adreses, kur tas ir iespējams. Šis saraksts neaizstāj pilnu esošās vietnes URL inventāru.

| Lapa | Adrese / statuss | Galvenais uzdevums |
|---|---|---|
| Sākumlapa | `/` | Viss piedāvājums, virtuves kā specializācija, uzticamība un saziņa. |
| Virtuves iekārtas | `/virtuves/` | Virtuves iekārtas un mēbeles pēc pasūtījuma, projekti, cenas faktori un pieteikums. |
| Iedvesmai | `/iedvesmai/` | Atsevišķi skatāmi virtuves projekti pirms un pēc mēbeļu uzstādīšanas. |
| Skapji | `/skapji/` | Iebūvējamie skapji, garderobes, durvju/pildījuma risinājumi un cena. |
| Priekšnama mēbeles | `/koridora-iekartas/` | Telpai pielāgota glabāšana un reāli piemēri. |
| Vannas istabas mēbeles | `/vannasistabas-mebeles/` | Izmēri, materiāli un projekti. |
| Viesistabas mēbeles | `/sekcijas/` | TV sienas, sekcijas un citi reāli risinājumi. |
| Citas mēbeles | `/citas-mebeles/` | Pārējais apstiprinātais piedāvājums. |
| Cena un kalkulators | `/cenas/` — jaunas adreses priekšlikums | Orientieris izmaksām un precīzas tāmes pieteikšana. |
| Projektu apraksti | Jauns satura veids; adreses vēl jānosaka | Foto ar telpas, materiālu un risinājuma skaidrojumu. |
| Atsauksmes | `/virtuves-mebeles-atsauksmes-virtuves-iekartas/` | Esošās atsauksmes un Google atsauksmju avots. |
| Kontakti | `/kontakti/` — jāpārbauda URL inventārā | Kontaktforma, zvans un sarunas pieteikšana. |

Esošās pārējās lapas, valodu versijas un publikācijas jāiekļauj migrācijas inventārā, pirms pieņemt lēmumu par saglabāšanu, apvienošanu vai pāradresāciju.

## Sākumā sadaļas, pēc vajadzības apakšlapas

Mazas virtuves, stūra virtuves, virtuves ar salu, virtuves materiāli un garderobes sākumā var būt pakalpojumu lapu sadaļas un projektu grupas. Atsevišķu lapu veidojam, kad tai ir atšķirīga pircēja vajadzība un pietiekami savi piemēri un informācija.

## Navigācijas darba variants

Mēbeles · Realizētie projekti · Cenas · Par mums · Atsauksmes · Kontakti. Galvenā poga: **Pieteikt konsultāciju**.

“Par mums” sākumā var būt sākumlapas sadaļa. Navigācijas nosaukumi un atsevišķo lapu apjoms vēl jāprecizē satura izstrādē.


## Apstiprinātā struktūra un lokālais izpildījums — 30.10.2026.

Navigācija: Pakalpojumi · Iedvesmai · Mūsu darbi · Cenas · Par mums · Atsauksmes · Kontakti.

- `/pakalpojumi/` — visas sešas kategorijas, apraksti, saites uz to lapām.
- Sešās pakalpojumu lapās saglabātas iepriekš tabulā norādītās adreses. Vienāds karkass: hero un apraksts → atlasītie projekti → pilnā galerija ar kategorijas filtru → vispārīgais pieteikums → praktiskā informācija/cenas faktori.
- `/musu-darbi/` — vienota galerija. `?kategorija=virtuve` (vai citas atļautās kategorijas ID) saglabā sākuma filtru. Viens projekta ieraksts var parādīties pakalpojuma lapā, sākumlapā un galerijā.
- `/iedvesmai/` — atsevišķa lapa ar virtuves projektu salīdzinājumiem pirms un pēc. Virtuvju pakalpojuma lapā šis bloks neatkārtojas; tā paliek veltīta piedāvājumam un atlasītajiem projektiem.
- `/par-mums/` — pielāgoti risinājumi, materiālu/apdares piemēri, uzmanība detaļām, pieredze. Komandas un ražotnes jaunie foto vēl jāiegūst.
- `/cenas/` — cenas skaidrojums un pašreizējais parametru konfigurators bez EUR aprēķina.
- `/virtuves-mebeles-atsauksmes-virtuves-iekartas/` — sešas īstās mājaslapas atsauksmes un avotu filtri. Google/Facebook ieraksti vēl nav importēti; izdrukāti skaidri uzmetuma statusi.
- `/kontakti/` — kontakti un kopīgā vispārīgā forma. Vietne joprojām nesūta e-pastus.

Pakalpojumu lapās mērķis ir 5–6 atlasīti projekti. Pašreiz virtuvēm ir seši, citās kategorijās pa vienam; fotogrāfiju trūkums netiek aizpildīts ar izdomātiem vai dublētiem projektiem. Cenas pie projektiem pievieno tikai pēc klienta apstiprinājuma. WordPress pilnais inventārs joprojām jāizvērtē; jauno apakšlapu izveide nav pilna SEO migrācija.
