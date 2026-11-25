# Privātums un piekrišana

Pārskatīts 25.11.2026. Šī atskaite attiecas uz četru valodu Vercel priekšskatījumu. Publiskā domēna pāreja ir atsevišķs plāna darbs.

## Pārskatītais saturs

- LV, EN, RU un norvēģu Bokmål ir kopīga privātuma politika ar atsevišķu sīkdatņu sadaļu un kopīgiem iestatījumiem.
- RU un NO tekstiem veiktas neatkarīgas valodas un atbilstības pārbaudes. EN, RU un NO saziņas rindkopās precizēti dati, piedāvājuma pieprasījuma nosacījums, pirmslīguma darbības un citu jautājumu izskatīšanas leģitīmā interese.
- Precizētas tiesības atsaukt piekrišanu, atsaukuma ietekme un sūdzības iesniegšanas iespējas.
- Izvēle ir spēkā 180 dienas. Pārlūka localStorage ierakstu izdzēš, konstatējot termiņa beigas atvērtā lapā vai nākamajā apmeklējumā.
- Apstiprinātais banera ievads paliek vispārīgs. Formas priekšskatījuma darbība aprakstīta pie formas.

## Koda darbība

src/tracking-config.mjs sagatavo konfigurāciju. Ģenerators ievieto to katras lapas JSON blokā. Bez rīku ID analītika un reklāma ir atspējotas. Google kartei ir atsevišķa izvēle.

public/tracking.js ielādē konfigurētos ārējos skriptus tikai ar spēkā esošu attiecīgās kategorijas piekrišanu. Google Consent Mode sākuma stāvoklis ir denied. Pirms atļaujas netiek ielādēts Google tags un netiek sūtīti arī bezsīkdatņu mērījumi. Priekšskatījuma notikumi netiek uzkrāti dataLayer un netiek nosūtīti ar atpakaļejošu datumu.

public/app.js pirms notikuma nodošanas pārbauda nosaukumu un fiksētu parametru vērtības. Formas vārds, e-pasts, telefons un ziņas teksts netiek nodoti mērīšanas izsaukumam. form_preview_complete nav ārēji nosūtāms notikums. Reālu generate_lead pievienos, ieviešot un pārbaudot formas servera apstiprinājumu.

Pēc piekrišanas atsaukšanas karte tiek noņemta, pārtrūkst vietnes notikumu nodošana un tiek izdzēstas pieejamās pirmās puses mērījumu sīkdatnes. Ja SDK jau bija ielādēts, lapa pārlādējas, lai izbeigtu tā klausītājus un taimerus. Atteikums tiek saglabāts pirms pārlādes. Ja saglabāšana neizdodas, vecais opt-in ieraksts tiek noņemts. Trešās puses domēna sīkdatnes pārvalda pārlūkā.

Pievienojot rīku vai mainot ID, konfigurācijas revīzija mainās un nepieciešama jauna izvēle. Mainot nolūkus vai pakalpojumu sniedzējus esošā GTM konteinerā, jāatjaunina politikas teksts un konfigurācijas politikas versija. Jaunus rīkus nedrīkst attiecināt uz agrāku piekrišanu.

## Integrāciju pieslēgšana

Publiskie rīku ID tiek nolasīti būvēšanas laikā no Vercel vides mainīgajiem.

| Mainīgais | Nolūks |
|---|---|
| GA4_MEASUREMENT_ID | Tiešs Google Analytics 4 tags |
| META_PIXEL_ID | Tiešs Meta Pixel |
| LINKEDIN_PARTNER_ID | Tiešs LinkedIn Insight Tag |
| GTM_CONTAINER_ID | Tagu pārvaldīšana vienā GTM konteinerā |
| GTM_CONSENT_CATEGORIES | GTM konteinera nolūki, pēc noklusējuma analytics,marketing |

Izvēlas GTM vai tiešus rīku ID. Tas novērš vienu un to pašu tagu dubultu ielādi. Vides mainīgo maiņai nepieciešama jauna būve.

GTM konteiners ar vairākiem deklarētiem nolūkiem šajā sagatavē ielādējas tikai pēc piekrišanas visiem tiem. Ja atļauta tikai viena no abām kategorijām, jauktais GTM konteiners paliek bloķēts. Tieši pieslēgtie GA4 un reklāmas SDK darbojas neatkarīgi pēc savām kategorijām.

Pirms GTM pieslēgšanas jāpārbauda paša konteinera saturs, izsaukšanas noteikumi un katra taga Additional Consent Checks. Vienas kategorijas norādīšana pieļaujama, ja tai tiešām atbilst visi konteinera tagi. Vietnes kods nevar noteikt patvaļīga ārēja konteinera saturu.

Pirms GA4 aktivizēšanas jāpārbauda Enhanced Measurement, īpaši automātiskā formu mijiedarbības uzskaite. Automātisks form_submit nepierāda saņemtu pieteikumu. Par reklāmguvumu izmanto tikai ar servera rezultātu sasaistītu generate_lead. Pārbaudīt arī Google Signals, automātiskas datu vākšanas un datu glabāšanas iestatījumus.

Pirms faktiskas aktivizēšanas jāaktualizē šobrīd plānotajiem rīkiem paredzētā politikas rindkopa, faktiskie saņēmēji, nolūki, sīkdatņu saraksts un termiņi. Pēc pieslēgšanas jāatkārto tīkla, Tag Assistant un GA4 DebugView pārbaudes ar īstajiem kontiem.

## Pārbaudes

- npm run check, npm run test:consent, npm run test:i18n un npm run test:seo.
- Regresiju testi aptver atteikumu, daļēju piekrišanu, termiņa beigas, jaunas revīzijas, aizpildītu pārlūka krātuvi un notikumu bloķēšanu.
- Chrome pārbaudīti noklusējuma stāvoklis, kartes ielāde, atsaukšana, izvēles maiņa starp cilnēm/valodām un 320, 390, 1440 px skati.
- Pārlūka tīkla pārbaudē izmantoti testa ID un pārtverti SDK aizvietotāji. Bez piekrišanas nav ārējo pieprasījumu, analītikas atļauja atver tikai GA4, reklāmas atļauja tikai Meta/LinkedIn. Tas pārbauda vietnes integrācijas kodu. Faktisko pakalpojumu datu saņemšana vēl jāpārbauda pēc kontu pieslēgšanas.

## Vēl apstiprināmais

- Uzņēmuma e-pasta pakalpojumu sniedzējs un saziņas datu glabāšanas kārtība.
- Faktiskie Vercel tehnisko datu glabāšanas iestatījumi vai konkrētie kritēriji. Runtime Logs apskates periods neatspoguļo visu pakalpojuma apstrādi.
- Faktisko pakalpojumu līgumi un piemērojamie datu pārsūtīšanas mehānismi.
- Resend un Turnstile apstrāde pirms īstās formas aktivizēšanas.
- Google kartes sīkdatņu pārbaude palaišanas vidē. Nenokopēt citu uzņēmumu sīkdatņu nosaukumus vai termiņus.

## Izmantotie avoti

Juridiskā pamata, pārredzamības un piekrišanas izvērtēšanai izmantoti pirmavoti.

- [VDAR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/?locale=LV)
- [DVI par privātuma politiku nepilnībām](https://www.dvi.gov.lv/lv/jaunums/dviskaidro-kadas-nepilnibas-visbiezak-noverojam-privatuma-politikas)
- [DVI par sīkdatņu politiku](https://www.dvi.gov.lv/lv/jaunums/dviskaidro-kas-ir-sikdatnu-politika)
- [DVI par piekrišanas atsaukšanu](https://www.dvi.gov.lv/lv/jaunums/dviskaidro-ka-nodrosinat-lietotajiem-iespeju-viegli-atsaukt-piekrisanu-sikdatnem)
- [Google Consent Mode Basic](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Google piekrišanas ieviešana](https://developers.google.com/tag-platform/security/guides/consent)
- [GA4 Enhanced Measurement](https://support.google.com/analytics/answer/9234069)
- [LinkedIn Insight Tag](https://www.linkedin.com/help/lms/answer/a516590)

Valodas un informācijas izkārtojuma piemēri salīdzināti ar faktiskām organizāciju politikām. To pakalpojumu saraksti un datu glabāšanas nosacījumi nav pārņemti.

- [IKEA Latvija](https://www.ikea.com/lv/lv/customer-service/privacy-policy/)
- [Kvik Norvēģija](https://www.kvik.no/terms-and-conditions/informasjonskapsler)
- [Datatilsynet](https://www.datatilsynet.no/om-datatilsynet/datatilsynets-personvernerklaring/)
- [Telenor](https://www.telenor.no/om/personvern/informasjonskapsler/)
