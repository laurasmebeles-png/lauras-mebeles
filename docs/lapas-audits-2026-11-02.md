# Lapas audits (2026-11-02)
Pārbaudīts: 13 lapas, 1440 px un 390 px platumā (uzbūvēta versija ar komitu 1413370), automātiska krāsu/fontu skenēšana + ekrānuzņēmumu apskate.

## Kas kārtībā
- Oranžu toņu CSS vairs nav. Akcents ir ķieģeļsarkans (#8f3b2e). Tumšajā cenu sadaļā terakota (#dd8f78), tas ir ar nolūku.
- Fonti visur Karla un EB Garamond (izņēmums: zvaigznītes simbols skaitļu joslā).
- Nevienā lapā, ne darbvirsmā, ne telefonā, nav horizontālas ritināšanas.

## Neatbilst jaunajam izkārtojumam (pēc svarīguma)
1. Kategoriju lapas (virtuves u.c.) joprojām vecais izkārtojums: teksts + maza bilde labajā pusē, telefonā bilde zemu. Vajag lielu bildi uzreiz un īsu ievadu.
2. Divas pogu "valodas": jaunā (kvadrātveida, lielie burti) un vecā (ķieģeļsarkana, noapaļota, ar bultiņu) galvenē un visās apakšlapās.
3. Noapaļojumi: jaunajām flīzēm 2 px, projektu kartītēm un paneļiem 14 px.
4. Izvēlne: "Pakalpojumi" nav ar lielajiem burtiem kā pārējie; "Atsauksmes" izvēlnē, bet ne galvenajā plānā.
5. Kājene: "Struktūras uzmetums 03 · LV", "Uzmetuma notikumu pārbaude", tikai 3 saites (nav Cenas, Par mums, Privātuma politika).
6. Uzmetuma teksti jānoņem pirms palaišanas: Kontakti ("Lokāls uzmetums...", poga "Izmēģināt pieteikumu"), Cenas ("Uzmetums: likmes vēl jāsaskaņo").
7. Cenas lapā palikusi numerācija "03 / Parunāsim par izmaksām" (sākumlapā tādas sadaļas vairs nav).
8. /virtuves/ un /musu-darbi/: 6-10 līdzīgas kartītes ar veco aprakstu un virsrakstiem; aizstās vienotā galerija.
9. Atkārtotas "Iepatikās kāds risinājums?" joslas apakšlapās; vajag vienu CTA piemērotā vietā.
10. Sākumlapa: atstarpe starp rindkopām projekta sadaļā trūkst; liela tukša vieta zem atsauksmēm; "Ko mēs izgatavojam" centrēts, atsauksmju virsraksts pa kreisi; flīžu uzraksti telefonā uz rosīgām bildes vietām (vajag spēcīgāku ēnojumu).
11. Flīzes "Kontakti" un "Cenas" bildes nesaistās ar saturu.
12. Saturs: "Kopš 2008" (Par mums, meta apraksts) pret "30+ gadu pieredze".

## Tehniskais parāds
- styles.css ~550 rindu ar slāņiem (vecais hero, "values" sticky, pill stili); nākotnē sakopt.
- ~12 gandrīz vienādi bēšie toņi; savest līdz 4-5 mainīgajiem.
- Vecais URL /virtuves-mebeles-atsauksmes-virtuves-iekartas/ jāsaskaņo ar pāradresāciju karti.

## Nav pārbaudīts
Safari/iPhone, tastatūras fokuss, formāls kontrasta mērījums, ielādes ātrums.

## Labots (2026-11-02, pēc audita)
Kategoriju lapas ar lielu hero bildi; vienota kvadrātveida pogu valoda un noapaļojumi 2 px; izvēlne lielie burti; kājene sakopta (5 saites, bez uzmetuma tekstiem); cenu numerācija noņemta; dublētās CTA joslas noņemtas no kategoriju lapām; atstarpe projekta sadaļā; stiprāks flīžu ēnojums.
Palicis: atsauksmju virsraksta līdzināšana, tukšums zem atsauksmēm, flīžu bildes Cenas/Kontakti, "Kopš 2008" vs "30+ gadu", uzmetuma teksti formās.
